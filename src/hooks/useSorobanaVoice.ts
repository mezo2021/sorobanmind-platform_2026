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
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch { /* ignore */ }
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  // ═══ playOne مع onDone callback ═══
  const playOne = useCallback((url: string, onDone?: () => void) => {
    debugLog(`📂 Loading: ${url.split('/').pop()}`);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio();
    audio.src = url;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setIsSpeaking(false);
      onDone?.();
    };

    audio.onplay = () => {
      debugLog('▶️ PLAY event fired');
      setIsSpeaking(true);
    };

    audio.onended = () => {
      debugLog('✅ ENDED');
      finish();
    };

    audio.onerror = () => {
      debugLog('❌ ERROR loading file');
      finish();
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
          finish();
        });
    }
  }, []);

  // ═══ الواجهة العامة ═══
  const speak = useCallback((text: string, _mood?: string, onDone?: () => void) => {
    void text;
    onDone?.();
  }, []);

  const speakLesson = useCallback((onDone?: () => void) => {
    playOne(pickRandom(SOROBANA_AUDIO.greetings), onDone);
  }, [playOne]);

  const speakTeaching = useCallback((onDone?: () => void) => {
    playOne(pickRandom(SOROBANA_AUDIO.teaching), onDone);
  }, [playOne]);

  const speakCorrect = useCallback((onDone?: () => void) => {
    playOne(pickRandom(SOROBANA_AUDIO.correct), onDone);
  }, [playOne]);

  const speakWrong = useCallback((onDone?: () => void) => {
    playOne(pickRandom(SOROBANA_AUDIO.wrong), onDone);
  }, [playOne]);

  const speakEndLesson = useCallback((onDone?: () => void) => {
    playOne(SOROBANA_AUDIO.endLesson, onDone);
  }, [playOne]);

  const speakFiles = useCallback((files: string[], onDone?: () => void) => {
    if (files.length > 0) playOne(files[0], onDone);
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