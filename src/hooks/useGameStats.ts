import { useState, useCallback, useEffect } from 'react';
import type { GameStats } from '@/types';
import { BADGES } from '@/data';

const STORAGE_KEY = 'sorobanmind-stats';
const LAST_VISIT_KEY = 'soroban_last_visit';

// القيم الافتراضية: ابدأ من الصفر
const DEFAULT_STATS: GameStats = {
  xp: 0,
  streak: 0,
  level: 1,
  soundEnabled: true,
  earnedBadges: [],
};

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          xp: typeof parsed.xp === 'number' ? parsed.xp : DEFAULT_STATS.xp,
          streak: typeof parsed.streak === 'number' ? parsed.streak : DEFAULT_STATS.streak,
          level: typeof parsed.level === 'number' ? parsed.level : DEFAULT_STATS.level,
          soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : DEFAULT_STATS.soundEnabled,
          earnedBadges: Array.isArray(parsed.earnedBadges) ? parsed.earnedBadges : DEFAULT_STATS.earnedBadges,
        };
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_STATS;
  });

  const [newBadge, setNewBadge] = useState<string | null>(null);

  // ============================================================
  // التحقق اليومي من السلسلة (Streak)
  // ============================================================
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

    if (lastVisit !== today) {
      // يوم جديد
      if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          // يوم متتالي → زيادة السلسلة
          setStats((prev) => ({ ...prev, streak: prev.streak + 1 }));
        } else if (diffDays > 1) {
          // انقطعت السلسلة → إعادة من 1
          setStats((prev) => ({ ...prev, streak: 1 }));
        }
      } else {
        // أول زيارة → streak = 1
        setStats((prev) => ({ ...prev, streak: 1 }));
      }

      localStorage.setItem(LAST_VISIT_KEY, today);
    }
  }, []);

  // ============================================================
  // حفظ تلقائي
  // ============================================================
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      /* ignore */
    }
  }, [stats]);

  // ============================================================
  // إضافة XP
  // ============================================================
  const addXP = useCallback((amount: number) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;

      const earned = [...prev.earnedBadges];
      let justEarnedId: string | null = null;

      for (const badge of BADGES) {
        if (newXp >= badge.xpRequired && !earned.includes(badge.id)) {
          earned.push(badge.id);
          justEarnedId = badge.id;
        }
      }

      if (justEarnedId) {
        setNewBadge(justEarnedId);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        earnedBadges: earned,
      };
    });
  }, []);

  const clearNewBadge = useCallback(() => {
    setNewBadge(null);
  }, []);

  const toggleSound = useCallback(() => {
    setStats((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const incrementStreak = useCallback(() => {
    setStats((prev) => ({ ...prev, streak: prev.streak + 1 }));
  }, []);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_VISIT_KEY);
  }, []);

  return { stats, addXP, toggleSound, incrementStreak, newBadge, clearNewBadge, resetStats };
}

export default useGameStats;
