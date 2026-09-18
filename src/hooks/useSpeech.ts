import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechOptions {
  enabled?: boolean;
  rate?: number;   // 0.1 - 10
  pitch?: number;  // 0 - 2
  volume?: number; // 0 - 1
  lang?: string;   // 'ar-SA'
}

export function useSpeech({
  enabled = true,
  rate = 1.0,
  pitch = 1.1,
  volume = 1,
  lang = 'ar-SA',
}: UseSpeechOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // التحقق من دعم المتصفح
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const supported = 'speechSynthesis' in window;
    setIsSupported(supported);

    if (supported) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // دالة النطق
  const speak = useCallback(
    (text: string, options?: { rate?: number; pitch?: number; lang?: string }) => {
      if (!enabled || !isSupported || !text) return;

      // إيقاف أي نطق سابق
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options?.lang || lang;
      utterance.rate = options?.rate ?? rate;
      utterance.pitch = options?.pitch ?? pitch;
      utterance.volume = volume;

      // اختيار صوت عربي إذا وُجد
      const arabicVoice = voices.find((v) => v.lang.startsWith('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [enabled, isSupported, lang, rate, pitch, volume, voices]
  );

  // إيقاف النطق
  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    hasArabicVoice: voices.some((v) => v.lang.startsWith('ar')),
  };
}

export default useSpeech;
