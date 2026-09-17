import { useState, useCallback, useEffect } from 'react';
import type { GameStats } from '@/types';
import { BADGES } from '@/data';

const STORAGE_KEY = 'sorobanmind-stats';

const DEFAULT_STATS: GameStats = {
  xp: 340,
  streak: 5,
  level: 4,
  soundEnabled: true,
  // بيانات افتراضية منطقية: الشارات التي كان يفترض أن يكون المستخدم حصل عليها بالفعل بـ 340 XP
  earnedBadges: ['beginner', 'anzan-master', 'soroban-expert'],
};

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_STATS,
          ...parsed,
          earnedBadges: Array.isArray(parsed.earnedBadges) ? parsed.earnedBadges : DEFAULT_STATS.earnedBadges,
        };
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_STATS;
  });

  // الشارة التي حصل عليها المستخدم للتو (لعرض نافذة الاحتفال). null = لا يوجد شيء جديد.
  const [newBadge, setNewBadge] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      /* ignore */
    }
  }, [stats]);

  const addXP = useCallback((amount: number) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;

      const earned = [...prev.earnedBadges];
      let justEarnedId: string | null = null;

      for (const badge of BADGES) {
        if (newXp >= badge.xpRequired && !earned.includes(badge.id)) {
          earned.push(badge.id);
          justEarnedId = badge.id; // BADGES مرتّبة تصاعدياً، فآخر شارة جديدة هي الأعلى
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

  return { stats, addXP, toggleSound, incrementStreak, newBadge, clearNewBadge };
}
