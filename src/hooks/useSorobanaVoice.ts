import { useCallback, useEffect, useRef, useState } from 'react';

const BASE = 'https://mezo2021.github.io/sorobanmind-platform_2026/';

function audioPath(file: string): string {
  return `${BASE}audio/${file}`;
}

export const SOROBANA_AUDIO = {
  greetings: [audioPath('greeting-1.mp3'), audioPath('greeting-2.mp3'), audioPath('greeting-3.mp3')],
  teaching: [audioPath('teaching-1.mp3'), audioPath('teaching-2.mp3'), audioPath('teaching-3.mp3')],
  correct: [audioPath('correct-1.mp3'), audioPath('correct-2.mp3')],
  wrong: [audioPath('wrong-1.mp3'), audioPath('wrong-2.mp3')],
  endLesson: audioPath('end-lesson.mp3'),
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const generationRef = useRef(0);

  useEffect(() => {
    return () => {
      generationRef.current++;
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch { /* ignore */ }
        audioRef.current = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    generationRef.current++;
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch { /* ignore */ }
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const playFiles = useCallback((files: string[], onDone?: () => void) => {
    if (files.length === 0) {
      onDone?.();
      return;
    }

    // ✅ كل استدعاء له رصيده الخاص
    const myGeneration = ++generationRef.current;
    const localQueue = [...files];

    // إيقاف أي صوت سابق
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch { /* ignore */ }
      audioRef.current = null;
    }

    setIsSpeaking(true);

    const playNext = () => {
      // ✅ إن كان هناك استدعاء أحدث، نتوقف
      if (myGeneration !== generationRef.current) return;

      const nextFile = localQueue.shift();
      if (!nextFile) {
        setIsSpeaking(false);
        onDone?.();
        return;
      }

      const audio = new Audio();
      audio.src = nextFile;
      audio.preload = 'auto';
      audioRef.current = audio;

      let advanced = false;
      const advance = () => {
        if (advanced) return;
        advanced = true;
        if (myGeneration !== generationRef.current) return;
        setTimeout(() => {
          if (myGeneration !== generationRef.current) return;
          playNext();
        }, 250);
      };

      audio.onended = advance;
      audio.onerror = advance;

      const timeout = setTimeout(advance, 8000);

      audio
        .play()
        .then(() => clearTimeout(timeout))
        .catch(() => {
          clearTimeout(timeout);
          advance();
        });
    };

    playNext();
  }, []);

  const speak = useCallback((text: string, _mood?: string, onDone?: () => void) => {
    void text;
    onDone?.();
  }, []);

  const speakLesson = useCallback((onDone?: () => void) => {
    playFiles([pickRandom(SOROBANA_AUDIO.greetings)], onDone);
  }, [playFiles]);

  const speakTeaching = useCallback((onDone?: () => void) => {
    playFiles([pickRandom(SOROBANA_AUDIO.teaching)], onDone);
  }, [playFiles]);

  const speakCorrect = useCallback((onDone?: () => void) => {
    playFiles([pickRandom(SOROBANA_AUDIO.correct)], onDone);
  }, [playFiles]);

  const speakWrong = useCallback((onDone?: () => void) => {
    playFiles([pickRandom(SOROBANA_AUDIO.wrong)], onDone);
  }, [playFiles]);

  const speakEndLesson = useCallback((onDone?: () => void) => {
    playFiles([SOROBANA_AUDIO.endLesson], onDone);
  }, [playFiles]);

  const speakFiles = useCallback((files: string[], onDone?: () => void) => {
    playFiles(files, onDone);
  }, [playFiles]);

  return {
    speak, stop, isSpeaking, isSupported,
    speakLesson, speakTeaching, speakCorrect, speakWrong, speakEndLesson, speakFiles,
  };
}

export default useSorobanaVoice;