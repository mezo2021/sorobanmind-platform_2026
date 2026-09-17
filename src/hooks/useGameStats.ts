import { useState, useCallback, useEffect } from 'react';
import type { GameStats } from '@/types';

const STORAGE_KEY = 'sorobanmind-stats';

const DEFAULT_STATS: GameStats = {
  xp: 340,
  streak: 5,
  level: 4,
  soundEnabled: true,
};

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...DEFAULT_STATS, ...JSON.parse(stored) };
    } catch {
      /* ignore */
    }
    return DEFAULT_STATS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      /* ignore */
    }
  }, [stats]);

  const addXP = useCallback((amount: number) => {
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + amount,
      level: Math.floor((prev.xp + amount) / 100) + 1,
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setStats((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const incrementStreak = useCallback(() => {
    setStats((prev) => ({ ...prev, streak: prev.streak + 1 }));
  }, []);

  return { stats, addXP, toggleSound, incrementStreak };
}
