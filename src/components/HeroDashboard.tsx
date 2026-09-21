import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  BookOpen, Dumbbell, Eye, Swords, Calculator, Lock,
  Sparkles, Flame, Brain, Zap, Palette, Trash2,
  Unlock, X, Grid3X3, Wand2, Hash, Divide, FileText,
  LogOut, RefreshCw, Shield,
  type LucideIcon,
} from 'lucide-react';

import type { Screen, CharacterType } from '@/types';
import { Companion } from './Companion';
import { CharacterSelector } from './CharacterSelector';

interface HeroDashboardProps {
  onNavigate: (screen: Screen) => void;
  onSwitchToGuardian?: () => void;
  playSound: (type: 'click' | 'whoosh') => void;
  xp: number;
  streak: number;
  earnedBadges: string[];
}

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const CHARACTER_INFO: Record<
  CharacterType,
  { name: string; title: string; message: string; color: string; lightColor: string }
> = {
  sham: {
    name: 'شام',
    title: 'البطلة الذكية',
    message: 'لنكتشف اليوم طريقة جديدة للحساب!',
    color: 'from-violet-500 to-purple-700',
    lightColor: 'text-violet-300',
  },
  rayan: {
    name: 'ريان',
    title: 'البطل السريع',
    message: 'هل أنت مستعد لتحدٍ جديد؟ هيا نبدأ!',
    color: 'from-blue-500 to-indigo-700',
    lightColor: 'text-blue-300',
  },
  bana: {
    name: 'بانة',
    title: 'البطلة الهادئة',
    message: 'التركيز الهادئ يصنع نتائج رائعة.',
    color: 'from-teal-400 to-emerald-700',
    lightColor: 'text-teal-300',
  },
  joud: {
    name: 'جود',
    title: 'البطل الذكي',
    message: 'أحب التفكير والتحليل — هيا نحل معًا!',
    color: 'from-indigo-500 to-purple-700',
    lightColor: 'text-indigo-300',
  },
};

type ActionCard = {
  screen: Screen;
  title: string;
  titleEn: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
  requiresExam?: boolean;
};

const ACTION_CARDS: ActionCard[] = [
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
  {
    screen: 'multiplication',
    title: 'درس الضرب',
    titleEn: 'Multiplication',
    desc: 'قواعد السوروبان والضرب الذهني',
    icon: Grid3X3,
    gradient: 'from-indigo-500 to-purple-700',
    glow: 'shadow-indigo-500/40',
    requiresExam: true,
  },
  {
    screen: 'cross-multiplication',
    title: 'الضرب التقاطعي',
    titleEn: 'Cross Multiplication',
    desc: 'درس متقدم: 2×2 حتى 5×2 و 3×3',
    icon: Hash,
    gradient: 'from-cyan-500 to-blue-700',
    glow: 'shadow-cyan-500/40',
    requiresExam: true,
  },
  {
    screen: 'secrets',
    title: 'الأسرار السحرية',
    titleEn: 'Magic Secrets',
    desc: 'حِيَل ذكية لجدول الضرب',
    icon: Wand2,
    gradient: 'from-amber-500 to-rose-600',
    glow: 'shadow-amber-500/40',
    requiresExam: true,
  },
  {
    screen: 'division',
    title: 'القسمة',
    titleEn: 'Division',
    desc: 'قسمة الأعداد على السوروبان',
    icon: Divide,
    gradient: 'from-blue-500 to-cyan-700',
    glow: 'shadow-blue-500/40',
    requiresExam: true,
  },
  {
    screen: 'final-exam',
    title: 'الامتحان النهائي',
    titleEn: 'Final Exam',
    desc: '٢٥ سؤالاً — ١٠٠ درجة',
    icon: FileText,
    gradient: 'from-gold-400 to-gold-600',
    glow: 'shadow-gold-500/40',
  },
];

const LEGACY_CHARACTER_MAP: Record<string, CharacterType> = {
  fox: 'sham',
  owl: 'bana',
  panda: 'joud',
  rabbit: 'rayan',
};

export function HeroDashboard({
  onNavigate,
  onSwitchToGuardian,
  playSound,
  xp,
  streak,
  earnedBadges,
}: HeroDashboardProps) {
  const [companion, setCompanion] = useState<CharacterType>('sham');
  const [showSelector, setShowSelector] = useState(false);
  const [childName, setChildName] = useState<string>('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [examPassed, setExamPassed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('soroban_companion');
    if (saved === 'sham' || saved === 'rayan' || saved === 'bana' || saved === 'joud') {
      setCompanion(saved as CharacterType);
    } else if (saved && LEGACY_CHARACTER_MAP[saved]) {
      const migrated = LEGACY_CHARACTER_MAP[saved];
      localStorage.setItem('soroban_companion', migrated);
      setCompanion(migrated);
    } else {
      localStorage.setItem('soroban_companion', 'sham');
      setCompanion('sham');
    }

    const savedName = localStorage.getItem('soroban_child_name');
    if (savedName) setChildName(savedName);

    try {
      const raw = localStorage.getItem('soroban_exam_result');
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.passed === true) setExamPassed(true);
      }
    } catch { /* ignore */ }
  }, []);

  const handleCompanionChange = (character: CharacterType) => {
    setCompanion(character);
    localStorage.setItem('soroban_companion', character);
    setShowSelector(false);
  };

  const handleNav = (screen: Screen) => {
    playSound('click');
    onNavigate(screen);
  };

  const canOpenCard = (card: ActionCard): boolean => {
    if (card.requiresExam && !examPassed) return false;
    return true;
  };

  const handleTestUnlock = () => {
    try {
      localStorage.setItem(
        'soroban_exam_result',
        JSON.stringify({ score: 100, passed: true, date: Date.now() })
      );

      const allLessons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      localStorage.setItem(
        'soroban-completed-lessons',
        JSON.stringify(allLessons)
      );

      localStorage.setItem(
        'soroban_anzan_badges',
        JSON.stringify({
          master_addition: true,
          master_multiplication: true,
          master_division: true,
          master_mixed: true,
        })
      );

      playSound('whoosh');
      setTimeout(() => window.location.reload(), 300);
    } catch { /* ignore */ }
  };

  // ✅ تصفير التقدم فقط (يُبقي الاسم والرفيق)
  const handleReset = () => {
    const keysToKeep = ['soroban_companion', 'soroban_child_name'];
    Object.keys(localStorage).forEach((key) => {
      if (!keysToKeep.includes(key)) localStorage.removeItem(key);
    });
    playSound('whoosh');
    setShowResetConfirm(false);
    setTimeout(() => window.location.reload(), 300);
  };

  // ✅ خروج كامل (يمسح كل شيء — يعود لشاشة البداية)
  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch { /* ignore */ }
    playSound('whoosh');
    setShowLogoutConfirm(false);
    // ✅ إعادة تحميل قوية — تُعيد التطبيق لشاشة البداية
    setTimeout(() => {
      window.location.href = window.location.pathname + '?logout=' + Date.now();
      window.location.reload();
    }, 200);
  };

  // ✅ إعادة تحميل سريع (لحل مشكلة "الصفحة لا تتحدث")
  const handleReload = () => {
    playSound('click');
    window.location.reload();
  };

  const characterInfo = CHARACTER_INFO[companion];

  return (
    <div dir="rtl" className="px-3 sm:px-6 py-6 max-w-5xl mx-auto">
      {/* ═══════════════════════════════════════════════════════
          WELCOME HEADER
      ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 sm:p-7 mb-6 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-electric-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-gold-300" />
            <span className="text-xs sm:text-sm text-gold-300 font-bold font-body">
              أكاديمية الأبطال الصغار
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-2">
            مرحباً يا {childName || 'أيها البطل'}!
          </h2>
          <p className="text-white/60 font-body text-sm sm:text-base mb-5">
            واصل رحلتك في إتقان الحساب الذهني بالسوروبان
          </p>

          {/* الإحصائيات */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="text-center px-4 py-3 rounded-2xl bg-purple-500/15 border border-purple-400/20">
              <p className="text-3xl font-extrabold text-purple-300 font-display">
                {toArabicNumber(xp)}
              </p>
              <p className="text-xs text-white/60 font-body mt-1">نقطة خبرة</p>
            </div>

            <div className="text-center px-4 py-3 rounded-2xl bg-orange-500/15 border border-orange-400/20">
              <div className="flex items-center justify-center gap-1.5">
                <Flame className="w-5 h-5 text-orange-300" />
                <p className="text-3xl font-extrabold text-orange-300 font-display">
                  {toArabicNumber(streak)}
                </p>
              </div>
              <p className="text-xs text-white/60 font-body mt-1">أيام متتالية</p>
            </div>
          </div>

          {/* ✅ الأزرار */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => { playSound('click'); setShowSelector(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-electric-500/20 border border-purple-400/30 text-purple-200 hover:from-purple-500/30 hover:to-electric-500/30 transition-all text-sm font-body"
            >
              <Palette className="w-4 h-4" />
              <span>تغيير الرفيق</span>
            </button>

            <button
              type="button"
              onClick={handleTestUnlock}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-100 hover:bg-emerald-500/30 transition-all text-sm font-bold font-body"
              title="فتح كل الدروس والامتحانات للاختبار"
            >
              <Unlock className="w-4 h-4" />
              <span>فتح الكل</span>
            </button>

            {/* ✅ زر إعادة التحميل */}
            <button
              type="button"
              onClick={handleReload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-blue-200 hover:bg-blue-500/25 transition-all text-sm font-body"
              title="إعادة تحميل التطبيق"
            >
              <RefreshCw className="w-4 h-4" />
              <span>تحديث</span>
            </button>

            {/* ✅ زر لوحة ولي الأمر */}
            {onSwitchToGuardian && (
              <button
                type="button"
                onClick={() => { playSound('click'); onSwitchToGuardian(); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-200 hover:bg-amber-500/25 transition-all text-sm font-body"
                title="لوحة ولي الأمر"
              >
                <Shield className="w-4 h-4" />
                <span>ولي الأمر</span>
              </button>
            )}

            {/* ✅ زر تصفير التقدم */}
            <button
              type="button"
              onClick={() => { playSound('click'); setShowResetConfirm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-500/10 border border-red-400/30 text-red-300 hover:bg-red-500/20 transition-all text-sm font-body"
              title="تصفير التقدم (يُبقي الاسم والرفيق)"
            >
              <Trash2 className="w-4 h-4" />
              <span>تصفير التقدم</span>
            </button>

            {/* ✅ زر الخروج الكامل */}
            <button
              type="button"
              onClick={() => { playSound('click'); setShowLogoutConfirm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-200 hover:bg-red-600/30 transition-all text-sm font-bold font-body"
              title="خروج كامل (يمسح كل شيء)"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          HERO COMPANION CARD
      ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card p-5 sm:p-6 mb-8 overflow-hidden relative"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-electric-500/10 blur-3xl" />

        <div className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
          <div className="relative flex justify-center">
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-3xl scale-75" />
              <div
                className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-[2rem] bg-gradient-to-br ${characterInfo.color} flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10" />
                <div className="relative">
                  <Companion character={companion} xp={xp} />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-400/20 mb-3">
              <Sparkles className="w-4 h-4 text-violet-300" />
              <span className="text-xs font-bold text-violet-200 font-body">
                رفيق رحلتك
              </span>
            </div>

            <h3 className="text-4xl sm:text-5xl font-black font-display text-white mb-2">
              {characterInfo.name}
            </h3>
            <p className={`text-lg font-bold font-body mb-4 ${characterInfo.lightColor}`}>
              {characterInfo.title}
            </p>
            <p className="text-base text-white/70 font-body leading-relaxed mb-5">
              {characterInfo.message}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
                <Brain className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-white/70 font-body">تدريب العقل</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-gold-300" />
                <span className="text-sm text-white/70 font-body">تطوير السرعة</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          MAIN ACTION CARDS
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white mb-1">
          🎮 اختر نشاطك
        </h3>
        <p className="text-sm text-white/50 font-body">
          ابدأ رحلتك من أي مكان تريده
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {ACTION_CARDS.map((card, i) => {
          const Icon = card.icon;
          const isLocked = !canOpenCard(card);

          return (
            <motion.button
              key={`${card.screen}-${i}`}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.05,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              whileHover={!isLocked ? { scale: 1.03, y: -4 } : {}}
              whileTap={!isLocked ? { scale: 0.97 } : {}}
              onClick={() => {
                if (isLocked) { playSound('whoosh'); return; }
                handleNav(card.screen);
              }}
              className={`group relative glass-card p-5 text-center overflow-hidden ${
                isLocked ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
              />

              <div
                className={`relative inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.gradient} items-center justify-center shadow-xl ${card.glow} mb-3 ${
                  isLocked ? 'grayscale' : ''
                }`}
              >
                {isLocked ? (
                  <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                ) : (
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                )}
              </div>

              <h4 className="text-lg sm:text-xl font-extrabold font-display text-white mb-1">
                {card.title}
              </h4>
              <p className="text-xs text-white/40 font-body mb-2">
                {card.titleEn}
              </p>
              <p className="text-sm text-white/70 font-body leading-relaxed">
                {isLocked ? '🔒 اجتز الامتحان النهائي لفتح هذا الدرس' : card.desc}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════
          CHARACTER SELECTOR MODAL
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-7 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10">
              <button
                type="button"
                onClick={() => { playSound('click'); setShowSelector(false); }}
                className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
              <CharacterSelector onSelectCharacter={handleCompanionChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
          RESET CONFIRMATION (تصفير التقدم)
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <div
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-red-500/30 text-center"
              dir="rtl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-300" />
              </div>
              <h3 className="text-xl font-extrabold font-display text-white mb-2">
                تصفير التقدم؟
              </h3>
              <p className="text-sm text-white/60 font-body mb-6 leading-relaxed">
                سيتم حذف جميع نقاط الخبرة، الشارات، والدروس المكتملة.
                <br />
                <span className="text-emerald-300">الرفيق والاسم سيُحفظان.</span>
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-primary flex-1 !bg-gradient-to-br !from-red-500 !to-red-700"
                >
                  نعم، صفّر
                </button>
                <button
                  type="button"
                  onClick={() => { playSound('click'); setShowResetConfirm(false); }}
                  className="btn-ghost flex-1"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
          LOGOUT CONFIRMATION (خروج كامل)
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <div
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-red-500/50 text-center"
              dir="rtl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-600/30 border border-red-500/50 flex items-center justify-center">
                <LogOut className="w-8 h-8 text-red-200" />
              </div>
              <h3 className="text-xl font-extrabold font-display text-white mb-2">
                خروج كامل؟
              </h3>
              <p className="text-sm text-white/60 font-body mb-6 leading-relaxed">
                سيتم حذف <span className="font-bold text-red-300">كل شيء</span>:
                <br />
                الاسم • الرفيق • التقدم • الشارات • الدروس
                <br />
                <span className="text-red-300">لا يمكن التراجع عن هذا الإجراء.</span>
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-primary flex-1 !bg-gradient-to-br !from-red-600 !to-red-800"
                >
                  نعم، خروج
                </button>
                <button
                  type="button"
                  onClick={() => { playSound('click'); setShowLogoutConfirm(false); }}
                  className="btn-ghost flex-1"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroDashboard;