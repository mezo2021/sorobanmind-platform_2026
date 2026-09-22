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

// ═══════════════════════════════════════════════════════════════
// نظام الرسائل التشخيصية
// ═══════════════════════════════════════════════════════════════
type DebugListener = (msg: string) => void;
const debugListeners = new Set<DebugListener>();

export function subscribeDebug(listener: DebugListener): () => void {
  debugListeners.add(listener);
  return () => {
    debugListeners.delete(listener);
  };
}

function debugLog(msg: string) {
  // eslint-disable-next-line no-console
  console.log('[Sorobana]', msg);
  debugListeners.forEach((l) => l(msg));
}

// ═══════════════════════════════════════════════════════════════
// Hook رئيسي
// ═══════════════════════════════════════════════════════════════
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
    debugLog('⏹️ Stopped');
  }, []);

  const playOne = useCallback((url: string) => {
    debugLog(`📂 Loading: ${url.split('/').pop()}`);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio();
    audio.src = url;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    audio.onplay = () => {
      debugLog('▶️ PLAY event fired');
      setIsSpeaking(true);
    };

    audio.onended = () => {
      debugLog('✅ ENDED');
      setIsSpeaking(false);
    };

    audio.onerror = () => {
      debugLog('❌ ERROR loading file');
      setIsSpeaking(false);
    };

    audio.oncanplay = () => {
      debugLog('📥 Can play');
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          debugLog('✅ play() resolved');
        })
        .catch((err: Error) => {
          debugLog(`❌ play() FAILED: ${err.name}`);
        });
    }
  }, []);

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