import { useCallback, useEffect, useRef, useState } from 'react';

const FEMALE_HINTS = [
  'female', 'woman', 'hoda', 'salma', 'zariyah', 'laila',
  'amany', 'amina', 'zeina', 'rana', 'sana', 'mariam',
];

export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const mountedRef = useRef(true);

  // ═══ تحميل الأصوات بشكل متكرر ═══
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        voicesRef.current = v;
        const ar = v.filter((x) => x.lang.toLowerCase().startsWith('ar'));
        console.log('[Sorobana] voices:', v.length, '| arabic:', ar.length,
          ar.map((x) => `${x.name}(${x.lang})`).join(', '));
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // محاولات متكررة لأن Chrome Android يتأخر في تحميل الأصوات
    const timers = [200, 500, 1000, 2000, 3000].map((d) =>
      setTimeout(loadVoices, d)
    );

    return () => {
      timers.forEach(clearTimeout);
      mountedRef.current = false;
    };
  }, []);

  const pickVoice = useCallback((): SpeechSynthesisVoice | null => {
    const all = voicesRef.current.length > 0
      ? voicesRef.current
      : (typeof window !== 'undefined' && 'speechSynthesis' in window
          ? window.speechSynthesis.getVoices()
          : []);
    if (all.length === 0) return null;

    // 1. عربي أنثوي
    const arF = all.find((v) =>
      v.lang.toLowerCase().startsWith('ar') &&
      FEMALE_HINTS.some((h) => v.name.toLowerCase().includes(h))
    );
    if (arF) return arF;

    // 2. أي عربي
    const ar = all.find((v) => v.lang.toLowerCase().startsWith('ar'));
    if (ar) return ar;

    // 3. أي أنثوي
    const f = all.find((v) =>
      FEMALE_HINTS.some((h) => v.name.toLowerCase().includes(h))
    );
    if (f) return f;

    return all[0];
  }, []);

  // ═══ الكلام — نسخة مبسطة ومباشرة (بدون setTimeout) ═══
  const speak = useCallback(
    (text: string, onDone?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('[Sorobana] Not supported');
        onDone?.();
        return;
      }

      const synth = window.speechSynthesis;

      // إيقاف أي كلام سابق
      try { synth.cancel(); } catch { /* ignore */ }

      // إنشاء الكلام
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ar-SA';
      u.pitch = 1.15;
      u.rate = 0.85;
      u.volume = 1;

      const voice = pickVoice();
      if (voice) {
        u.voice = voice;
        console.log('[Sorobana] using voice:', voice.name, voice.lang);
      } else {
        console.warn('[Sorobana] no voice available');
      }

      u.onstart = () => {
        console.log('[Sorobana] started');
        if (mountedRef.current) setIsSpeaking(true);
      };
      u.onend = () => {
        console.log('[Sorobana] ended');
        if (mountedRef.current) setIsSpeaking(false);
        onDone?.();
      };
      u.onerror = (e) => {
        console.error('[Sorobana] error:', e);
        if (mountedRef.current) setIsSpeaking(false);
        onDone?.();
      };

      // ⚠️ استدعاء مباشر — بدون setTimeout — ليعمل في سياق نقرة المستخدم
      try {
        synth.speak(u);
      } catch (e) {
        console.error('[Sorobana] speak throw:', e);
        onDone?.();
      }
    },
    [pickVoice]
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

  return { speak, stop, isSpeaking, isSupported };
}

export default useSorobanaVoice;