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

const MAX_DEBUG_LOGS = 40;

function describeMediaError(err: MediaError | null): string {
  if (!err) return 'unknown';
  const codeMap: Record<number, string> = {
    1: 'ABORTED',
    2: 'NETWORK',
    3: 'DECODE',
    4: 'SRC_NOT_SUPPORTED',
  };
  const codeName = codeMap[err.code] || `code=${err.code}`;
  return `${codeName}${err.message ? ` :: ${err.message}` : ''}`;
}

export function useSorobanaVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(true);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const generationRef = useRef(0);
  const mountedRef = useRef(true);
  const timeoutRef = useRef<number | null>(null);

  const log = useCallback((msg: string) => {
    setDebugLogs((prev) => {
      const next = [...prev, msg];
      return next.length > MAX_DEBUG_LOGS ? next.slice(-MAX_DEBUG_LOGS) : next;
    });
  }, []);

  const clearDebugLogs = useCallback(() => setDebugLogs([]), []);

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      generationRef.current++;
      clearPendingTimeout();
      const a = audioRef.current;
      if (a) {
        try {
          a.onended = null;
          a.onerror = null;
          a.pause();
          a.removeAttribute('src');
          a.load();
        } catch { /* ignore */ }
      }
    };
  }, [clearPendingTimeout]);

  const getSharedAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = 'auto';
      // لا نضع crossOrigin — نفس الدومين، لا حاجة له، وقد يُسبب فشل CORS
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  const stop = useCallback(() => {
    generationRef.current++;
    clearPendingTimeout();
    const a = audioRef.current;
    if (a) {
      try {
        a.onended = null;
        a.onerror = null;
        a.pause();
        a.currentTime = 0;
      } catch { /* ignore */ }
    }
    setIsSpeaking(false);
  }, [clearPendingTimeout]);

  const playFiles = useCallback((files: string[], onDone?: () => void) => {
    if (files.length === 0) {
      onDone?.();
      return;
    }
    if (!mountedRef.current) {
      onDone?.();
      return;
    }

    const audio = getSharedAudio();
    const myGeneration = ++generationRef.current;
    const localQueue = [...files];

    log(`▶ CALL playFiles (${files.length})`);

    clearPendingTimeout();
    try {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
    } catch { /* ignore */ }

    setIsSpeaking(true);

    const playNext = () => {
      if (myGeneration !== generationRef.current || !mountedRef.current) return;
      const nextFile = localQueue.shift();
      if (!nextFile) {
        log('🏁 QUEUE empty → onDone');
        setIsSpeaking(false);
        onDone?.();
        return;
      }

      const filename = nextFile.split('/').pop() || nextFile;
      audio.src = nextFile;
      log(`📁 Loading: ${filename}`);

      // إعادة التحميل الصريحة
      try { audio.load(); } catch { /* ignore */ }

      let advanced = false;
      const advance = () => {
        if (advanced) return;
        advanced = true;
        clearPendingTimeout();
        if (myGeneration !== generationRef.current || !mountedRef.current) return;
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null;
          if (myGeneration !== generationRef.current || !mountedRef.current) return;
          playNext();
        }, 250);
      };

      audio.onended = () => { log('✔ ENDED'); advance(); };
      audio.onerror = () => {
        log(`❌ ERROR: ${describeMediaError(audio.error)}`);
        advance();
      };
      audio.oncanplay = () => { log('🍞 Can play'); };
      audio.onplay = () => { log('▶ PLAY fired'); };

      timeoutRef.current = window.setTimeout(() => { log('⏱ TIMEOUT 8s'); advance(); }, 8000);

      audio.play()
        .then(() => { log('✅ play() resolved'); })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
          log(`❌ play() rejected: ${msg}`);
          advance();
        });
    };

    playNext();
  }, [getSharedAudio, clearPendingTimeout, log]);

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
    debugLogs, clearDebugLogs,
  };
}

export default useSorobanaVoice;