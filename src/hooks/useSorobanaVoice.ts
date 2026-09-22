import { useCallback, useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// مسار أساسي صحيح للـ GitHub Pages
// ═══════════════════════════════════════════════════════════════
const BASE = import.meta.env.BASE_URL || '/';

function audioPath(file: string): string {
  // BASE = "/sorobanmind-platform_2026/" على GitHub Pages
  return `${BASE}audio/${file}`;
}

// ═══════════════════════════════════════════════════════════════
// مكتبة العبارات الصوتية المحلية
// ═══════════════════════════════════════════════════════════════
export const SOROBANA_AUDIO = {
  greetings: [
    audioPath('greeting-1.mp3'),
    audioPath('greeting-2.mp3'),
    audioPath('greeting-3.mp3'),
  ],
  teaching: [
    audioPath('teaching-1.mp3'),
    audioPath('teaching-2.mp3'),
    audioPath('teaching-3.mp3'),
  ],
  correct: [
    audioPath('correct-1.mp3'),
    audioPath('correct-2.mp3'),
  ],
  wrong: [
    audioPath('wrong-1.mp3'),
    audioPath('wrong-2.mp3'),
  ],
  endLesson: audioPath('end-lesson.mp3'),
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

      console.log('[Sorobana] playing:', nextFile);

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
        .then(() => {
          clearTimeout(timeout);
          console.log('[Sorobana] playing OK');
        })
        .catch((err) => {
          console.warn('[Sorobana] play failed:', err);
          clearTimeout(timeout);
          advance();
        });
    };

    playNext();
  }, []);

  // ═══ الواجهة العامة ═══
  const speak = useCallback(
    (text: string, _mood?: string, onDone?: () => void) => {
      void text;
      playFiles([], onDone);
    },
    [playFiles]
  );

  const speakLesson = useCallback(
    (onDone?: () => void) => {
      playFiles([pickRandom(SOROBANA_AUDIO.greetings)], onDone);
    },
    [playFiles]
  );

  const speakTeaching = useCallback(
    (onDone?: () => void) => {
      playFiles([pickRandom(SOROBANA_AUDIO.teaching)], onDone);
    },
    [playFiles]
  );

  const speakCorrect = useCallback(
    (onDone?: () => void) => {
      playFiles([pickRandom(SOROBANA_AUDIO.correct)], onDone);
    },
    [playFiles]
  );

  const speakWrong = useCallback(
    (onDone?: () => void) => {
      playFiles([pickRandom(SOROBANA_AUDIO.wrong)], onDone);
    },
    [playFiles]
  );

  const speakEndLesson = useCallback(
    (onDone?: () => void) => {
      playFiles([SOROBANA_AUDIO.endLesson], onDone);
    },
    [playFiles]
  );

  const speakFiles = useCallback(
    (files: string[], onDone?: () => void) => {
      playFiles(files, onDone);
    },
    [playFiles]
  );

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    speakLesson,
    speakTeaching,
    speakCorrect,
    speakWrong,
    speakEndLesson,
    speakFiles,
  };
}

export default useSorobanaVoice;