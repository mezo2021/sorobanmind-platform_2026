// src/components/soroban2d5/useBeadSound.ts
import { useCallback, useEffect, useRef } from 'react';

export function useBeadSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // إنشاء AudioContext عند أول استخدام
    if (typeof window !== 'undefined' && !ctxRef.current) {
      ctxRef.current = new (window.AudioContext || 
        (window as any).webkitAudioContext)();
    }
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  const playSound = useCallback((type: 'hit' | 'slide' | 'success' | 'error', intensity = 1) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // فلتر لمحاكاة صوت الخشب
    filter.type = 'lowpass';
    filter.frequency.value = 800 + intensity * 400;
    filter.Q.value = 2;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'hit':
        // صوت تصادم خشبي
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220 + Math.random() * 80, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
        gain.gain.setValueAtTime(0.15 * intensity, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.15);
        break;

      case 'slide':
        // صوت انزلاق ناعم
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.12);
        break;

      case 'success':
        // نغمة نجاح
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, now);       // C5
        osc.frequency.setValueAtTime(659, now + 0.1); // E5
        osc.frequency.setValueAtTime(784, now + 0.2); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        break;

      case 'error':
        // نغمة خطأ
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
    }
  }, []);

  return playSound;
}