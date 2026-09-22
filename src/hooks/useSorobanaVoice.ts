import { useCallback, useEffect, useRef, useState } from 'react';

const BASE = 'https://mezo2021.github.io/sorobanmind-platform_2026/';

function audioPath(file: string): string {
  return `${BASE}audio/${file}`;
}

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

export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
  }, []);

  // ═══ تشغيل ملف واحد فقط — بدون queue ═══
  const playOne = useCallback((url: string) => {
    console.log('[Sorobana] playing:', url);

    // إيقاف الصوت القديم
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio();
    audio.src = url;
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.onplay = () => {
      console.log('[Sorobana] PLAY event fired');
      setIsSpeaking(true);
    };

    audio.onended = () => {
      console.log('[Sorobana] ENDED');
      setIsSpeaking(false);
    };

    audio.onerror = () => {
      console.error('[Sorobana] ERROR loading:', url);
      setIsSpeaking(false);
    };

    audio
      .play()
      .then(() => console.log('[Sorobana] play() promise resolved'))
      .catch((err) => {
        console.error('[Sorobana] play() REJECTED:', err);
        setIsSpeaking(false);
      });
  }, []);

  // ═══ الواجهة العامة ═══
  const speak = useCallback((text: string, _mood?: string, onDone?: () => void) => {
    void text;
    void onDone;
  }, []);

  const speakLesson = useCallback(() => {
    playOne(pickRandom(SOROBANA_AUDIO.greetings));
  }, [playOne]);

  const speakTeaching = useCallback(() => {
    playOne(pickRandom(SOROBANA_AUDIO.teaching));
  }, [playOne]);

  const speakCorrect = useCallback(() => {
    playOne(pickRandom(SOROBANA_AUDIO.correct));
  }, [playOne]);

  const speakWrong = useCallback(() => {
    playOne(pickRandom(SOROBANA_AUDIO.wrong));
  }, [playOne]);

  const speakEndLesson = useCallback(() => {
    playOne(SOROBANA_AUDIO.endLesson);
  }, [playOne]);

  const speakFiles = useCallback((files: string[]) => {
    if (files.length > 0) playOne(files[0]);
  }, [playOne]);

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