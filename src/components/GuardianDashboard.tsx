import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowRight, TrendingUp, Target, Clock, Award,
  Brain, Calendar, Zap, CheckCircle2, BarChart3,
} from 'lucide-react';
import { LEVELS } from '@/data';

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const STATS_KEY = 'sorobanmind-stats';
const COMPLETED_KEY = 'soroban-completed-lessons';
const ANZAN_KEY = 'soroban_anzan_stats';
const PRACTICE_KEY = 'soroban_practice_stats';

interface GuardianDashboardProps {
  onBack: () => void;
  playSound: (type: 'click' | 'whoosh') => void;
  childName?: string;
  childXP: number;
  childStreak: number;
  childLevel: number;
}

interface AnzanStats {
  highScore: number;
  totalRounds: number;
  totalCorrect: number;
}

interface PracticeStats {
  totalProblems: number;
  correctAnswers: number;
  additionProblems: number;
  subtractionProblems: number;
}

export function GuardianDashboard({
  onBack,
  playSound,
  childName = 'البطل',
  childXP,
  childStreak,
  childLevel,
}: GuardianDashboardProps) {
  const [savedName, setSavedName] = useState(childName);
  const [completed, setCompleted] = useState<number[]>([]);
  const [anzanStats, setAnzanStats] = useState<AnzanStats>({ highScore: 0, totalRounds: 0, totalCorrect: 0 });
  const [practiceStats, setPracticeStats] = useState<PracticeStats>({
    totalProblems: 0,
    correctAnswers: 0,
    additionProblems: 0,
    subtractionProblems: 0,
  });
  const [weeklyXP, setWeeklyXP] = useState<{ day: string; xp: number }[]>([]);

  useEffect(() => {
    // قراءة الاسم
    const name = localStorage.getItem('soroban_child_name');
    if (name) setSavedName(name);

    // قراءة الدروس المكتملة
    try {
      const saved = localStorage.getItem(COMPLETED_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch {
      /* ignore */
    }

    // قراءة إحصائيات الأنزان
    try {
      const saved = localStorage.getItem(ANZAN_KEY);
      if (saved) setAnzanStats({ ...anzanStats, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }

    // قراءة إحصائيات التدريب
    try {
      const saved = localStorage.getItem(PRACTICE_KEY);
      if (saved) setPracticeStats({ ...practiceStats, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }

    // قراءة نشاط الأسبوع (من sorobanmind-stats)
    try {
      const saved = localStorage.getItem(STATS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // استخدام XP الحالي كـ "نشاط اليوم"
        // في المستقبل، يمكن تخزين XP لكل يوم
        const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
        const today = new Date().getDay();
        const mapped = days.map((day, idx) => ({
          day,
          xp: idx === (today + 1) % 7 ? parsed.xp || 0 : 0,
        }));
        setWeeklyXP(mapped);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const accuracy = practiceStats.totalProblems > 0
    ? Math.round((practiceStats.correctAnswers / practiceStats.totalProblems) * 100)
    : 0;
  const maxWeeklyXP = Math.max(...weeklyXP.map((d) => d.xp), 1);
  const completedLevels = completed.length;

  const stats = [
    {
      label: 'نقاط الخبرة',
      labelEn: 'XP Points',
      value: toArabicNumber(childXP),
      icon: Zap,
      gradient: 'from-gold-400 to-gold-600',
      glow: 'shadow-gold-500/30',
    },
    {
      label: 'المستوى',
      labelEn: 'Level',
      value: toArabicNumber(childLevel),
      icon: Award,
      gradient: 'from-purple-500 to-purple-700',
      glow: 'shadow-purple-500/30',
    },
    {
      label: 'الأيام المتتالية',
      labelEn: 'Day Streak',
      value: toArabicNumber(childStreak),
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
      glow: 'shadow-orange-500/30',
    },
    {
      label: 'دقة الإجابات',
      labelEn: 'Accuracy',
      value: `${toArabicNumber(accuracy)}٪`,
      icon: Target,
      gradient: 'from-emerald2-500 to-emerald2-700',
      glow: 'shadow-emerald2-500/30',
    },
  ];

  return (
    <div className="px-3 sm:px-6 py-6 max-w-5xl mx-auto">
      {/* Back */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="btn-ghost !px-3 !py-2"
        >
          <ArrowRight className="w-5 h-5" />
          <span className="hidden sm:inline">تبديل الدور</span>
        </button>
      </div>

      {/* Child overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 sm:p-6 mb-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald2-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="relative flex items-center gap-4">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shadow-xl shadow-purple-500/40 shrink-0"
          >
            <Brain className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
          </motion.div>
          <div>
            <p className="text-sm text-white/50 font-body">تقدم الطفل</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              {savedName}
            </h2>
            <p className="text-sm text-emerald2-300 font-body mt-0.5">
              مستوى {toArabicNumber(childLevel)} · {toArabicNumber(completedLevels)}/{toArabicNumber(LEVELS.length)} دروس مكتملة
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
              className="glass-card p-4 sm:p-5 text-center"
            >
              <div
                className={`inline-flex w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} items-center justify-center shadow-lg ${stat.glow} mb-3`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-0.5">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-white/60 font-body">{stat.label}</p>
              <p className="text-[10px] text-white/30 font-body">{stat.labelEn}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly XP chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-5 h-5 text-electric-400" />
          <h3 className="text-lg font-extrabold font-display text-white">نشاط الأسبوع</h3>
        </div>
        <div className="flex items-end justify-between gap-2 sm:gap-3 h-40">
          {weeklyXP.map((day, i) => {
            const height = (day.xp / maxWeeklyXP) * 100;
            return (
              <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + i * 0.06, type: 'spring', stiffness: 100, damping: 15 }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-purple-600 to-electric-400 min-h-[4px] relative group"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white/0 group-hover:text-white/80 transition-colors whitespace-nowrap">
                    {toArabicNumber(day.xp)}
                  </span>
                </motion.div>
                <span className="text-[10px] sm:text-xs text-white/50 font-body">{day.day}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Detailed stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald2-400" />
            <p className="text-sm text-white/60 font-body">مسائل محلولة</p>
          </div>
          <p className="text-3xl font-extrabold font-display text-white">
            {toArabicNumber(practiceStats.totalProblems)}
          </p>
          <p className="text-xs text-emerald2-300 font-body mt-1">
            {toArabicNumber(practiceStats.correctAnswers)} إجابة صحيحة
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-electric-400" />
            <p className="text-sm text-white/60 font-body">جولات الأنزان</p>
          </div>
          <p className="text-3xl font-extrabold font-display text-white">
            {toArabicNumber(anzanStats.totalRounds)}
          </p>
          <p className="text-xs text-electric-300 font-body mt-1">
            {toArabicNumber(anzanStats.totalCorrect)} إجابة صحيحة
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-gold-400" />
            <p className="text-sm text-white/60 font-body">رقم قياسي أنزان</p>
          </div>
          <p className="text-3xl font-extrabold font-display text-white">
            {toArabicNumber(anzanStats.highScore)}
          </p>
          <p className="text-xs text-gold-300 font-body mt-1">أعلى نتيجة</p>
        </motion.div>
      </div>

      {/* Level progress detail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="glass-card p-5 sm:p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-extrabold font-display text-white">تقدم المستويات</h3>
        </div>
        <div className="space-y-2.5">
          {LEVELS.map((level, i) => {
            const pct = level.status === 'completed' ? 100 : level.status === 'available' ? 40 : 0;
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.04 }}
                className="flex items-center gap-3"
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    level.status === 'completed'
                      ? 'bg-emerald2-400'
                      : level.status === 'available'
                      ? 'bg-purple-400 animate-pulse'
                      : 'bg-white/20'
                  }`}
                />
                <span
                  className={`text-sm font-body w-28 sm:w-36 shrink-0 ${
                    level.status === 'locked' ? 'text-white/30' : 'text-white/70'
                  }`}
                >
                  {level.nameAr}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      level.status === 'completed'
                        ? 'bg-gradient-to-r from-emerald2-400 to-emerald2-600'
                        : level.status === 'available'
                        ? 'bg-gradient-to-r from-purple-400 to-electric-500'
                        : 'bg-white/10'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.7 + i * 0.04, duration: 0.6 }}
                  />
                </div>
                <span className="text-xs text-white/40 font-body w-8 text-left shrink-0">
                  {toArabicNumber(level.xpRequired)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default GuardianDashboard;
