import { useCallback, useEffect, useRef, useState } from 'react';

const FEMALE_HINTS = [
  'female', 'woman', 'hoda', 'salma', 'zariyah', 'laila',
  'amany', 'amina', 'zeina', 'rana', 'sana', 'mariam',
];

export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const findFemaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const arabicVoices = voices.filter((v) => v.lang.startsWith('ar'));
    if (arabicVoices.length === 0) return null;
    const female = arabicVoices.find((v) =>
      FEMALE_HINTS.some((h) => v.name.toLowerCase().includes(h))
    );
    return female || arabicVoices[0];
  }, []);

  const speak = useCallback(
    (text: string, onDone?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        onDone?.();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.pitch = 1.15;
      utterance.rate = 0.85;
      utterance.volume = 1;
      const voice = findFemaleVoice();
      if (voice) utterance.voice = voice;
      utterance.onstart = () => {
        if (mountedRef.current) setIsSpeaking(true);
      };
      utterance.onend = () => {
        if (mountedRef.current) setIsSpeaking(false);
        onDone?.();
      };
      utterance.onerror = () => {
        if (mountedRef.current) setIsSpeaking(false);
        onDone?.();
      };
      window.speechSynthesis.speak(utterance);
    },
    [findFemaleVoice]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { speak, stop, isSpeaking, isSupported };
}

export default useSorobanaVoice;