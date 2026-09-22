import { useCallback, useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// تقسيم النص إلى جمل قصيرة (أقل من 100 حرف لكل جملة)
// ═══════════════════════════════════════════════════════════════
function splitIntoSentences(text: string): string[] {
  // نقسم على علامات الترقيم الأساسية
  const raw = text
    .split(/([.!?؟؛]+|\n+)/g)
    .reduce<string[]>((acc, part) => {
      if (!part) return acc;
      if (/^[.!?؟؛]+$/.test(part) || /^\n+$/.test(part)) {
        if (acc.length > 0) acc[acc.length - 1] += part;
      } else {
        acc.push(part.trim());
      }
      return acc;
    }, [])
    .filter((s) => s.length > 1);

  // إذا كانت الجملة أطول من 100 حرف، نقسمها على الفواصل
  const result: string[] = [];
  for (const sentence of raw) {
    if (sentence.length <= 100) {
      result.push(sentence);
      continue;
    }
    // نقسم على الفواصل والمسافات
    const chunks = sentence.split(/([،,]|\s+)/);
    let current = '';
    for (const chunk of chunks) {
      if ((current + chunk).length > 95) {
        if (current.trim().length > 0) result.push(current.trim());
        current = chunk;
      } else {
        current += chunk;
      }
    }
    if (current.trim().length > 0) result.push(current.trim());
  }

  return result;
}

// ═══════════════════════════════════════════════════════════════
// بناء رابط Google Translate TTS
// ═══════════════════════════════════════════════════════════════
function buildTtsUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encoded}`;
}

// ═══════════════════════════════════════════════════════════════
// Hook رئيسي
// ═══════════════════════════════════════════════════════════════
export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(true); // دائماً مدعوم
  const cancelledRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mountedRef = useRef(true);
  const queueRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      cancelledRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    queueRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string, _mood?: string, onDone?: () => void) => {
      if (!mountedRef.current) return;

      // إلغاء أي كلام سابق
      cancelledRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // تقسيم النص إلى جمل
      const sentences = splitIntoSentences(text);
      if (sentences.length === 0) {
        onDone?.();
        return;
      }

      queueRef.current = [...sentences];
      setIsSpeaking(true);

      const playNext = () => {
        if (!mountedRef.current || cancelledRef.current) {
          setIsSpeaking(false);
          onDone?.();
          return;
        }

        const nextSentence = queueRef.current.shift();
        if (!nextSentence) {
          setIsSpeaking(false);
          onDone?.();
          return;
        }

        const audio = new Audio(buildTtsUrl(nextSentence));
        audioRef.current = audio;
        audio.preload = 'auto';

        let advanced = false;
        const advance = () => {
          if (advanced) return;
          advanced = true;
          if (!mountedRef.current || cancelledRef.current) {
            setIsSpeaking(false);
            onDone?.();
            return;
          }
          // وقفة صغيرة بين الجمل (250ms) لإحساس طبيعي
          setTimeout(playNext, 250);
        };

        audio.onended = advance;
        audio.onerror = advance;

        // مهلة احتياطية في حال فشل الحدث (5 ثوان لكل جملة)
        const timeout = setTimeout(advance, 5000);

        audio
          .play()
          .then(() => {
            // التشغيل نجح
          })
          .catch((err) => {
            console.warn('[Sorobana TTS] play failed:', err);
            clearTimeout(timeout);
            advance();
          });
      };

      playNext();
    },
    []
  );

  return { speak, stop, isSpeaking, isSupported };
}

export default useSorobanaVoice;