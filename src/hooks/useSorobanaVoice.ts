import { useCallback, useEffect, useRef, useState } from 'react';

const FEMALE_HINTS = [
  'female', 'woman', 'hoda', 'salma', 'zariyah', 'laila',
  'amany', 'amina', 'zeina', 'rana', 'sana', 'mariam',
];

export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const primedRef = useRef(false);
  const mountedRef = useRef(true);

  // ═══ تحميل الأصوات (مع انتظار voiceschanged) ═══
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
        console.log('[Sorobana] Voices loaded:', v.length);
        console.log('[Sorobana] Arabic voices:', v.filter((x) => x.lang.startsWith('ar')).map((x) => x.name));
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // محاولة إضافية بعد ثانية
    const t = setTimeout(loadVoices, 1000);
    return () => {
      clearTimeout(t);
      mountedRef.current = false;
    };
  }, []);

  // ═══ اختيار أفضل صوت ═══
  const pickVoice = useCallback((): SpeechSynthesisVoice | null => {
    const all = voices.length > 0 ? voices : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);
    if (all.length === 0) return null;

    // 1. صوت عربي أنثوي
    const arabicFemale = all.find((v) =>
      v.lang.startsWith('ar') && FEMALE_HINTS.some((h) => v.name.toLowerCase().includes(h))
    );
    if (arabicFemale) return arabicFemale;

    // 2. أي صوت عربي
    const arabic = all.find((v) => v.lang.startsWith('ar'));
    if (arabic) return arabic;

    // 3. أي صوت أنثوي (أي لغة)
    const anyFemale = all.find((v) => FEMALE_HINTS.some((h) => v.name.toLowerCase().includes(h)));
    if (anyFemale) return anyFemale;

    // 4. الصوت الافتراضي
    return all[0];
  }, [voices]);

  // ═══ التحضير (priming) — مهم لـ Chrome Android ═══
  const prime = useCallback(() => {
    if (primedRef.current) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      u.rate = 1;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
      primedRef.current = true;
      console.log('[Sorobana] Engine primed');
    } catch (e) {
      console.warn('[Sorobana] Prime failed:', e);
    }
  }, []);

  // ═══ الكلام ═══
  const speak = useCallback(
    (text: string, onDone?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('[Sorobana] Speech Synthesis not supported');
        onDone?.();
        return;
      }

      // 1. تحضير المحرك
      prime();

      // 2. إيقاف أي كلام سابق
      try {
        window.speechSynthesis.cancel();
      } catch { /* ignore */ }

      // 3. إنشاء الكلام
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.pitch = 1.15;
      utterance.rate = 0.85;
      utterance.volume = 1;

      const voice = pickVoice();
      if (voice) {
        utterance.voice = voice;
        console.log('[Sorobana] Speaking with voice:', voice.name, voice.lang);
      } else {
        console.warn('[Sorobana] No voice found — using default');
      }

      utterance.onstart = () => {
        console.log('[Sorobana] Started speaking');
        if (mountedRef.current) setIsSpeaking(true);
      };
      utterance.onend = () => {
        console.log('[Sorobana] Finished speaking');
        if (mountedRef.current) setIsSpeaking(false);
        onDone?.();
      };
      utterance.onerror = (e) => {
        console.error('[Sorobana] Speech error:', e);
        if (mountedRef.current) setIsSpeaking(false);
        onDone?.();
      };

      // 4. تشغيل
      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error('[Sorobana] Speak throw:', e);
        onDone?.();
      }
    },
    [pickVoice, prime]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    }
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => { stop(); };
  }, [stop]);

  return { speak, stop, isSpeaking, isSupported, prime, voices };
}

export default useSorobanaVoice;