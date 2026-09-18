import { motion } from 'framer-motion';
import {
  ArrowRight, TrendingUp, Target, Clock, Award,
  Brain, Calendar, Zap, CheckCircle2, BarChart3,
} from 'lucide-react';
import { PROGRESS_DATA, LEVELS } from '@/data';

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

interface GuardianDashboardProps {
  onBack: () => void;
  playSound: (type: 'click' | 'whoosh') => void;
  childName?: string;
  childXP: number;
  childStreak: number;
  childLevel: number;
}

export function GuardianDashboard({
  onBack,
  playSound,
  childName = 'البطل',
  childXP,
  childStreak,
  childLevel,
}: GuardianDashboardProps) {
  const accuracy = Math.round((PROGRESS_DATA.correctAnswers / PROGRESS_DATA.totalProblems) * 100);
  const maxWeeklyXP = Math.max(...PROGRESS_DATA.weeklyXP.map((d) => d.xp));
  const completedLevels = LEVELS.filter((l) => l.status === 'completed').length;

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
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
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
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">{childName}</h2>
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
              <div className={`inline-flex w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} items-center justify-center shadow-lg ${stat.glow} mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-0.5">{stat.value}</p>
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
          {PROGRESS_DATA.weeklyXP.map((day, i) => {
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
            {toArabicNumber(PROGRESS_DATA.totalProblems)}
          </p>
          <p className="text-xs text-emerald2-300 font-body mt-1">
            {toArabicNumber(PROGRESS_DATA.correctAnswers)} إجابة صحيحة
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
            <p className="text-sm text-white/60 font-body">متوسط السرعة</p>
          </div>
          <p className="text-3xl font-extrabold font-display text-white">
            {toArabicNumber(PROGRESS_DATA.averageSpeed)}<span className="text-lg text-white/40"> ثانية</span>
          </p>
          <p className="text-xs text-electric-300 font-body mt-1">لكل مسألة</p>
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
            {toArabicNumber(PROGRESS_DATA.anzanHighScore)}
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
                <span className={`w-2 h-2 rounded-full shrink-0 ${level.status === 'completed' ? 'bg-emerald2-400' : level.status === 'available' ? 'bg-purple-400 animate-pulse' : 'bg-white/20'}`} />
                <span className={`text-sm font-body w-28 sm:w-36 shrink-0 ${level.status === 'locked' ? 'text-white/30' : 'text-white/70'}`}>
                  {level.nameAr}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${level.status === 'completed' ? 'bg-gradient-to-r from-emerald2-400 to-emerald2-600' : level.status === 'available' ? 'bg-gradient-to-r from-purple-400 to-electric-500' : 'bg-white/10'}`}
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
