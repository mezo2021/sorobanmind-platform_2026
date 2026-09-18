import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  BookOpen, Dumbbell, Eye, Swords, Calculator,
  Lock, CheckCircle2, Circle, ArrowLeft,
  Star, Award, Crown, Lock as LockBadge, X, Palette, Trash2,
  Target, Diamond,
  type LucideIcon,
} from 'lucide-react';
import { LEVELS, BADGES } from '@/data';
import type { Screen, LevelNode } from '@/types';
import { Companion, type CharacterType } from './Companion';
import { CharacterSelector } from './CharacterSelector';
import { useQuests } from '@/hooks/useQuests';

interface HeroDashboardProps {
  onNavigate: (screen: Screen) => void;
  playSound: (type: 'click' | 'whoosh') => void;
  xp: number;
  streak: number;
  earnedBadges: string[];
}

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const ACTION_CARDS: {
  screen: Screen;
  title: string;
  titleEn: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
}[] = [
  {
    screen: 'learn',
    title: 'التعلّم',
    titleEn: 'Learn',
    desc: 'تعرّف على السوروبان وخرزاته',
    icon: BookOpen,
    gradient: 'from-purple-500 to-purple-700',
    glow: 'shadow-purple-500/40',
  },
  {
    screen: 'practice',
    title: 'التدريب',
    titleEn: 'Practice',
    desc: 'تمارين تفاعلية لزيادة المهارة',
    icon: Dumbbell,
    gradient: 'from-electric-500 to-electric-700',
    glow: 'shadow-electric-500/40',
  },
  {
    screen: 'anzan',
    title: 'التصور الذهني',
    titleEn: 'Anzan Flash',
    desc: 'أرقام تومض بسرعة وحلّها بذهنك',
    icon: Eye,
    gradient: 'from-emerald2-500 to-emerald2-700',
    glow: 'shadow-emerald2-500/40',
  },
  {
    screen: 'quests',
    title: 'المغامرات',
    titleEn: 'Quests',
    desc: 'تحديات يومية ومكافآت ممتعة',
    icon: Swords,
    gradient: 'from-gold-400 to-gold-600',
    glow: 'shadow-gold-500/40',
  },
  {
    screen: 'soroban',
    title: 'السوروبان',
    titleEn: 'Interactive Soroban',
    desc: 'العب بالعداد الياباني تفاعلياً',
    icon: Calculator,
    gradient: 'from-pink-500 to-purple-700',
    glow: 'shadow-pink-500/40',
  },
];

const BADGE_ICONS: Record<string, LucideIcon> = {
  Star,
  Eye,
  Award,
  Crown,
  Target,
  Diamond,
};

const BADGE_GRADIENTS: Record<string, string> = {
  beginner: 'from-emerald2-400 to-emerald2-600',
  trainee: 'from-electric-400 to-electric-600',
  'anzan-master': 'from-electric-400 to-electric-600',
  skilled: 'from-purple-400 to-purple-600',
  'soroban-expert': 'from-purple-400 to-purple-600',
  professional: 'from-pink-400 to-pink-600',
  legend: 'from-gold-400 to-gold-600',
  'eternal-legend': 'from-gold-400 to-gold-600',
};

function LevelNodeButton({ level, index, onClick, playSound }: {
  level: LevelNode;
  index: number;
  onClick: () => void;
  playSound: (type: 'click' | 'whoosh') => void;
}) {
  const isOdd = index % 2 === 1;
  const Icon = level.status === 'locked' ? Lock : level.status === 'completed' ? CheckCircle2 : Circle;
  const statusColor =
    level.status === 'completed' ? 'from-emerald2-400 to-emerald2-600' :
    level.status === 'available' ? 'from-purple-400 to-electric-500' :
    'from-gray-600 to-gray-800';

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={level.status !== 'locked' ? { scale: 1.1, y: -3 } : {}}
      whileTap={level.status !== 'locked' ? { scale: 0.95 } : {}}
      onClick={() => {
        if (level.status !== 'locked') {
          playSound('click');
          onClick();
        }
      }}
      disabled={level.status === 'locked'}
      className={`relative flex flex-col items-center gap-2 ${isOdd ? 'mt-12' : ''}`}
    >
      {level.status === 'available' && (
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-purple-500/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${statusColor} flex items-center justify-center shadow-xl ${level.status === 'available' ? 'shadow-purple-500/50' : ''}`}>
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gold-400 text-gold-900 text-xs font-extrabold flex items-center justify-center shadow-lg">
          {toArabicNumber(level.id)}
        </span>
      </div>
      <div className="text-center max-w-[90px]">
        <p className={`text-xs sm:text-sm font-bold font-body ${level.status === 'locked' ? 'text-white/30' : 'text-white/80'}`}>
          {level.nameAr}
        </p>
        {level.status === 'available' && (
          <p className="text-[10px] text-purple-300 font-body mt-0.5">
            {toArabicNumber(level.xpRequired)} XP
          </p>
        )}
      </div>
    </motion.button>
  );
}

export function HeroDashboard({ onNavigate, playSound, xp, streak, earnedBadges }: HeroDashboardProps) {
  const [companion, setCompanion] = useState<CharacterType>('fox');
  const [showSelector, setShowSelector] = useState(false);
  const [childName, setChildName] = useState<string>('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const quests = useQuests();

  useEffect(() => {
    const saved = localStorage.getItem('soroban_companion') as CharacterType | null;
    if (saved && ['fox', 'owl', 'panda', 'rabbit'].includes(saved)) {
      setCompanion(saved);
    } else {
      setShowSelector(true);
    }

    const savedName = localStorage.getItem('soroban_child_name');
    if (savedName) {
      setChildName(savedName);
    }
  }, []);

  const handleCompanionChange = (c: CharacterType) => {
    setCompanion(c);
    setShowSelector(false);
  };

  const handleNav = (screen: Screen) => {
    playSound('click');
    onNavigate(screen);
  };

  const handleReset = () => {
    const keysToKeep = ['soroban_companion', 'soroban_child_name'];
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    playSound('whoosh');
    setShowResetConfirm(false);
    window.location.reload();
  };

  const nextBadge = BADGES.find((b) => !earnedBadges.includes(b.id));
  const prevThreshold = (() => {
    const idx = nextBadge ? BADGES.findIndex((b) => b.id === nextBadge.id) : -1;
    return idx > 0 ? BADGES[idx - 1].xpRequired : 0;
  })();
  const progressPct = nextBadge
    ? Math.min(100, Math.max(0, ((xp - prevThreshold) / (nextBadge.xpRequired - prevThreshold)) * 100))
    : 100;

  return (
    <div className="px-3 sm:px-6 py-6 max-w-6xl mx-auto">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 sm:p-6 mb-6 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="relative flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-1">
              مرحباً يا {childName || 'أيها البطل'}!
            </h2>
            <p className="text-white/60 font-body text-sm">
              واصل رحلتك في إتقان الحساب الذهني بالسوروبان
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-center px-4 py-2 rounded-2xl bg-purple-500/15 border border-purple-400/20">
              <p className="text-2xl font-extrabold text-purple-300 font-display">
                {toArabicNumber(xp)}
              </p>
              <p className="text-[10px] text-white/50 font-body">نقطة خبرة</p>
            </div>
            <div className="text-center px-4 py-2 rounded-2xl bg-orange-500/15 border border-orange-400/20">
              <p className="text-2xl font-extrabold text-orange-300 font-display">
                {toArabicNumber(streak)}
              </p>
              <p className="text-[10px] text-white/50 font-body">أيام متتالية</p>
            </div>
            <button
              onClick={() => {
                playSound('click');
                setShowSelector(true);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-br from-purple-500/20 to-electric-500/20 border border-purple-400/30 text-purple-200 hover:from-purple-500/30 hover:to-electric-500/30 transition-all text-xs font-body"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">تغيير الرفيق</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                setShowResetConfirm(true);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-red-500/10 border border-red-400/30 text-red-300 hover:bg-red-500/20 transition-all text-xs font-body"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">تصفير</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-extrabold font-display text-white">
            الشارات
          </h3>
          <span className="badge bg-gold-400/15 border-gold-400/20 text-gold-200 text-xs">
            {toArabicNumber(earnedBadges.length)}/{toArabicNumber(BADGES.length)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {BADGES.map((badge, i) => {
            const isEarned = earnedBadges.includes(badge.id);
            const Icon = BADGE_ICONS[badge.icon] || Star;
            const gradient = BADGE_GRADIENTS[badge.id] || 'from-purple-400 to-electric-500';
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border ${
                  isEarned ? 'bg-white/5 border-white/10' : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                    isEarned ? `bg-gradient-to-br ${gradient}` : 'bg-white/5'
                  }`}
                >
                  {isEarned ? (
                    <Icon className="w-7 h-7 text-white" />
                  ) : (
                    <LockBadge className="w-6 h-6 text-white/25" />
                  )}
                </div>
                <p className={`text-xs font-bold font-body text-center ${isEarned ? 'text-white/80' : 'text-white/30'}`}>
                  {badge.nameAr}
                </p>
                <p className="text-[10px] text-white/40 font-body">
                  {toArabicNumber(badge.xpRequired)} XP
                </p>
              </motion.div>
            );
          })}
        </div>

        {nextBadge ? (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-white/50 font-body">
                المسافة نحو شارة "{nextBadge.nameAr}"
              </p>
              <p className="text-xs text-white/50 font-body">
                {toArabicNumber(xp)}/{toArabicNumber(nextBadge.xpRequired)} XP
              </p>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${BADGE_GRADIENTS[nextBadge.id] || 'from-purple-400 to-electric-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-gold-300 font-body font-bold">
            🏆 حصلت على جميع الشارات! أنت أسطورة حقيقية
          </p>
        )}
      </motion.div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-8">
        {ACTION_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.screen}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNav(card.screen)}
              className="group relative glass-card p-4 sm:p-6 text-center overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
              <div className={`relative inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.gradient} items-center justify-center shadow-xl ${card.glow} mb-3`}>
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-white/30"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.3, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold font-display text-white mb-0.5">
                {card.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-white/40 font-body mb-1.5">
                {card.titleEn}
              </p>
              <p className="text-xs text-white/60 font-body leading-snug">
                {card.desc}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Level Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-extrabold font-display text-white">
            خارطة المستويات
          </h3>
          <span className="badge bg-purple-500/15 border-purple-400/20 text-purple-300 text-xs">
            {toArabicNumber(LEVELS.filter(l => l.status === 'completed').length)}/{toArabicNumber(LEVELS.length)} مكتمل
          </span>
        </div>

        <div className="relative overflow-x-auto scrollbar-hide pb-4">
          <div className="flex items-start gap-3 sm:gap-5 min-w-max pr-2 pl-8">
            <div className="absolute top-8 right-0 left-0 h-1 bg-gradient-to-r from-purple-500/30 via-electric-500/30 to-white/5 rounded-full" />
            {LEVELS.map((level, i) => (
              <LevelNodeButton
                key={level.id}
                level={level}
                index={i}
                onClick={() => onNavigate('learn')}
                playSound={playSound}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Quests Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-extrabold font-display text-white">
            المغامرات النشطة
          </h3>
          <button
            onClick={() => handleNav('quests')}
            className="flex items-center gap-1 text-sm text-purple-300 font-body hover:text-purple-200 transition-colors"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {quests.slice(0, 2).map((quest, i) => {
            const pct = Math.min(100, (quest.progress / quest.target) * 100);
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-white font-body text-sm">{quest.titleAr}</p>
                  <span className="text-xs font-bold text-gold-300">
                    +{toArabicNumber(quest.xpReward)} XP
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${quest.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-xs text-white/50 font-body whitespace-nowrap">
                    {toArabicNumber(quest.progress)}/{toArabicNumber(quest.target)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Companion (fixed corner) */}
      <Companion character={companion} />

      {/* Character Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
            >
              <button
                onClick={() => {
                  playSound('click');
                  setShowSelector(false);
                }}
                className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              <CharacterSelector onSelectCharacter={handleCompanionChange} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirm Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-red-500/30 text-center"
              dir="rtl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-300" />
              </div>
              <h3 className="text-xl font-extrabold font-display text-white mb-2">
                تصفير التقدم؟
              </h3>
              <p className="text-sm text-white/60 font-body mb-6">
                سيتم حذف جميع نقاط الخبرة، الشارات، والدروس المكتملة. (الرفيق والاسم سيُحفظان)
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="btn-primary flex-1 !bg-gradient-to-br !from-red-500 !to-red-700"
                >
                  نعم، صفّر
                </button>
                <button
                  onClick={() => {
                    playSound('click');
                    setShowResetConfirm(false);
                  }}
                  className="btn-ghost flex-1"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroDashboard;
