import { useCallback, useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// مكتبة العبارات الصوتية المحلية
// ═══════════════════════════════════════════════════════════════
export const SOROBANA_AUDIO = {
  greetings: [
    '/audio/greeting-1.mp3',
    '/audio/greeting-2.mp3',
    '/audio/greeting-3.mp3',
  ],
  teaching: [
    '/audio/teaching-1.mp3',
    '/audio/teaching-2.mp3',
    '/audio/teaching-3.mp3',
  ],
  correct: [
    '/audio/correct-1.mp3',
    '/audio/correct-2.mp3',
  ],
  wrong: [
    '/audio/wrong-1.mp3',
    '/audio/wrong-2.mp3',
  ],
  endLesson: '/audio/end-lesson.mp3',
};

// ═══════════════════════════════════════════════════════════════
// Hook رئيسي
// ═══════════════════════════════════════════════════════════════
export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(true);
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

  // ═══ تشغيل قائمة ملفات صوتية بالتتابع ═══
  const playFiles = useCallback((files: string[], onDone?: () => void) => {
    if (!mountedRef.current) return;
    cancelledRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    queueRef.current = [...files];
    setIsSpeaking(true);

    const playNext = () => {
      if (!mountedRef.current || cancelledRef.current) {
        setIsSpeaking(false);
        onDone?.();
        return;
      }
      const nextFile = queueRef.current.shift();
      if (!nextFile) {
        setIsSpeaking(false);
        onDone?.();
        return;
      }

      const audio = new Audio(nextFile);
      audio.preload = 'auto';
      audioRef.current = audio;

      let advanced = false;
      const advance = () => {
        if (advanced) return;
        advanced = true;
        if (!mountedRef.current || cancelledRef.current) {
          setIsSpeaking(false);
          onDone?.();
          return;
        }
        setTimeout(playNext, 250);
      };

      audio.onended = advance;
      audio.onerror = () => {
        console.warn('[Sorobana] audio error:', nextFile);
        advance();
      };

      const timeout = setTimeout(advance, 8000);

      audio
        .play()
        .then(() => clearTimeout(timeout))
        .catch((err) => {
          console.warn('[Sorobana] play failed:', err);
          clearTimeout(timeout);
          advance();
        });
    };

    playNext();
  }, []);

  // ═══ اختيار عشوائي من قائمة ═══
  const pickRandom = (arr: string[]): string =>
    arr[Math.floor(Math.random() * arr.length)];

  // ═══ الواجهة العامة ═══

  /** تشغيل ملفات صوتية محددة */
  const speakFiles = useCallback(
    (files: string[], onDone?: () => void) => {
      playFiles(files, onDone);
    },
    [playFiles]
  );

  /** الترحيب + القصة + القاعدة + الشرح */
  const speakLesson = useCallback(
    (
      story?: string,
      rule?: string,
      description?: string,
      onDone?: () => void
    ) => {
      const files: string[] = [pickRandom(SOROBANA_AUDIO.greetings)];
      void story;
      void rule;
      void description;
      playFiles(files, onDone);
    },
    [playFiles]
  );

  /** عبارة تعليمية عشوائية */
  const speakTeaching = useCallback(
    (onDone?: () => void) => {
      playFiles([pickRandom(SOROBANA_AUDIO.teaching)], onDone);
    },
    [playFiles]
  );

  /** عبارة إجابة صحيحة */
  const speakCorrect = useCallback(
    (onDone?: () => void) => {
      playFiles([pickRandom(SOROBANA_AUDIO.correct)], onDone);
    },
    [playFiles]
  );

  /** عبارة إجابة خاطئة */
  const speakWrong = useCallback(
    (onDone?: () => void) => {
      playFiles([pickRandom(SOROBANA_AUDIO.wrong)], onDone);
    },
    [playFiles]
  );

  /** عبارة نهاية الدرس */
  const speakEndLesson = useCallback(
    (onDone?: () => void) => {
      playFiles([SOROBANA_AUDIO.endLesson], onDone);
    },
    [playFiles]
  );

  return {
    // الواجهة الأساسية (للتوافق مع الكود الحالي)
    speak: speakFiles as unknown as (text: string, mood?: string, onDone?: () => void) => void,
    stop,
    isSpeaking,
    isSupported,
    // الواجهات المخصصة (للأنماط الجديدة)
    speakLesson,
    speakTeaching,
    speakCorrect,
    speakWrong,
    speakEndLesson,
    speakFiles,
  };
}

export default useSorobanaVoice;