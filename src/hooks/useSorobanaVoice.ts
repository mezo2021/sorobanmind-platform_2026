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

type DebugListener = (msg: string) => void;
const debugListeners = new Set<DebugListener>();

export function subscribeDebug(listener: DebugListener): () => void {
  debugListeners.add(listener);
  return () => { debugListeners.delete(listener); };
}

function debugLog(msg: string) {
  // eslint-disable-next-line no-console
  console.log('[Sorobana]', msg);
  debugListeners.forEach((l) => l(msg));
}

export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mountedRef = useRef(true);
  const cancelledRef = useRef(false);
  const queueRef = useRef<string[]>([]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelledRef.current = true;
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch { /* ignore */ }
        audioRef.current = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    queueRef.current = [];
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
    if (!mountedRef.current) {
      debugLog('❌ Not mounted — aborting');
      onDone?.();
      return;
    }
    cancelledRef.current = false;
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch { /* ignore */ }
      audioRef.current = null;
    }
    queueRef.current = [...files];
    setIsSpeaking(true);
    debugLog(`▶️ playFiles: ${files.length} file(s)`);

    const playNext = () => {
      if (!mountedRef.current || cancelledRef.current) {
        debugLog('⏹️ Cancelled or unmounted');
        setIsSpeaking(false);
        onDone?.();
        return;
      }
      const nextFile = queueRef.current.shift();
      if (!nextFile) {
        debugLog('✅ All files done');
        setIsSpeaking(false);
        onDone?.();
        return;
      }

      const shortName = nextFile.split('/').pop();
      debugLog(`📂 Loading: ${shortName}`);

      const audio = new Audio();
      audio.src = nextFile;
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

      audio.onplay = () => debugLog(`▶️ PLAY: ${shortName}`);
      audio.onended = () => { debugLog(`✅ ENDED: ${shortName}`); advance(); };
      audio.onerror = () => { debugLog(`❌ ERROR: ${shortName}`); advance(); };

      const timeout = setTimeout(() => {
        debugLog(`⏰ Timeout: ${shortName}`);
        advance();
      }, 8000);

      audio
        .play()
        .then(() => {
          clearTimeout(timeout);
          debugLog(`✅ play() OK: ${shortName}`);
        })
        .catch((err) => {
          clearTimeout(timeout);
          debugLog(`❌ play() FAILED: ${err.name} — ${shortName}`);
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