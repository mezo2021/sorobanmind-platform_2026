import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Lock, CheckCircle2, Info, Star, CircleDot,
  Combine, Hash, Sigma, Lightbulb, Eye, Hand, RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import { LEARN_MODULES } from '@/data';
import { Soroban } from './Soroban';
import type { LearnModule } from '@/types';

const ICONS: Record<string, LucideIcon> = {
  Info, Star, CircleDot, Combine, Hash, Sigma,
};

interface LearnScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'bead' | 'whoosh') => void;
  onXP: (amount: number) => void;
}

type LessonMode = 'watch' | 'try';

const COMPLETED_STORAGE_KEY = 'soroban-completed-lessons';

/** عمود سوروبان تفاعلي واحد لوضع "جرّب" */
function TryColumn({
  target,
  playSound,
  onSolved,
}: {
  target: number;
  playSound: (type: 'click' | 'success' | 'bead' | 'whoosh') => void;
  onSolved: () => void;
}) {
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(0);
  const [solved, setSolved] = useState(false);

  const currentValue = (upper ? 5 : 0) + lower;
  const lowerInactive = 4 - lower;

  useEffect(() => {
    setUpper(false);
    setLower(0);
    setSolved(false);
  }, [target]);

  useEffect(() => {
    if (currentValue === target && !solved) {
      setSolved(true);
      playSound('success');
      onSolved();
    }
  }, [currentValue, target, solved, playSound, onSolved]);

  const toggleUpper = () => {
    if (solved) return;
    setUpper((u) => !u);
    playSound('bead');
  };

  const incrementLower = () => {
    if (solved) return;
    setLower((l) => (l >= 4 ? 0 : l + 1));
    playSound('bead');
  };

  const reset = () => {
    setUpper(false);
    setLower(0);
    setSolved(false);
    playSound('whoosh');
  };

  const upperBeadStyle = upper
    ? 'bg-gradient-to-b from-yellow-300 to-amber-500 border-yellow-100 shadow-[0_0_8px_rgba(251,191,36,0.7)]'
    : 'bg-gradient-to-b from-amber-700 to-amber-900 border-amber-500/80';
  const activeBeadStyle =
    'bg-gradient-to-b from-sky-300 to-sky-500 border-sky-100 shadow-[0_0_8px_rgba(56,189,248,0.7)]';
  const inactiveBeadStyle =
    'bg-gradient-to-b from-blue-800 to-blue-950 border-blue-600/80';
  const beadBase = 'w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2';

  return (
    <div className="inline-flex flex-col items-center gap-3 p-5 glass rounded-3xl">
      <div className="flex flex-col items-center">
        {/* Upper Deck */}
        <div className="relative flex flex-col w-9 sm:w-12 h-[60px] sm:h-[68px]">
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-amber-800/70" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-electric-500 to-purple-500 rounded-full" />
          <motion.button
            onClick={toggleUpper}
            whileTap={{ scale: 0.88 }}
            animate={{ y: upper ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`absolute top-1 left-1/2 -translate-x-1/2 z-10 ${beadBase} ${upperBeadStyle} cursor-pointer touch-manipulation`}
            aria-label="خرزة علوية"
          >
            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
          </motion.button>
        </div>

        {/* Beam */}
        <div className="w-full h-[3px] rounded-full bg-gradient-to-r from-purple-500 via-electric-500 to-purple-500" />

        {/* Lower Deck */}
        <div className="relative flex flex-col justify-between w-9 sm:w-12 h-[132px] sm:h-[148px] py-1.5">
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-amber-800/70" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-electric-500 to-purple-500 rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-electric-500 to-purple-500 rounded-full" />

          {/* Active beads */}
          <div className="relative z-10 flex flex-col items-center gap-[3px]">
            {Array.from({ length: lower }).map((_, i) => (
              <motion.button
                key={`active-${i}`}
                onClick={incrementLower}
                whileTap={{ scale: 0.88 }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                className={`${beadBase} ${activeBeadStyle} cursor-pointer touch-manipulation`}
                aria-label={`خرزة سفلية مفعّلة ${i + 1}`}
              >
                <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
              </motion.button>
            ))}
          </div>

          {/* Inactive beads */}
          <div className="relative z-10 flex flex-col items-center gap-[3px]">
            {Array.from({ length: lowerInactive }).map((_, i) => (
              <motion.button
                key={`inactive-${i}`}
                onClick={incrementLower}
                whileTap={{ scale: 0.88 }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                className={`${beadBase} ${inactiveBeadStyle} cursor-pointer touch-manipulation`}
                aria-label={`خرزة سفلية غير مفعّلة ${i + 1}`}
              >
                <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <p
          className={`text-2xl font-extrabold font-display ${
            solved ? 'text-emerald2-300' : 'text-white/70'
          }`}
        >
          {currentValue}
        </p>
        <button onClick={reset} className="btn-ghost !p-2" aria-label="تصفير">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {solved && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald2-300 font-bold font-body text-sm flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" /> أحسنت! وصلت للقيمة الصحيحة
        </motion.p>
      )}
    </div>
  );
}

export function LearnScreen({ onBack, playSound, onXP }: LearnScreenProps) {
  const [selected, setSelected] = useState<LearnModule | null>(null);
  const [completed, setCompleted] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [mode, setMode] = useState<LessonMode>('watch');
  const [triedSolved, setTriedSolved] = useState(false);

  // حفظ الدروس المكتملة في localStorage
  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completed));
    } catch {
      /* ignore */
    }
  }, [completed]);

  const handleOpen = (mod: LearnModule, isLocked: boolean) => {
    if (isLocked) return;
    playSound('click');
    setSelected(mod);
    setMode('watch');
    setTriedSolved(false);
  };

  const handleComplete = () => {
    if (!selected) return;
    playSound('success');
    if (!completed.includes(selected.id)) {
      setCompleted([...completed, selected.id]);
      onXP(30);
    }
    setSelected(null);
  };

  const switchMode = (m: LessonMode) => {
    playSound('click');
    setMode(m);
  };

  return (
    <div className="px-3 sm:px-6 py-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="btn-ghost !px-3 !py-2"
        >
          <ArrowRight className="w-5 h-5" />
          <span className="hidden sm:inline">رجوع</span>
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            التعلّم
          </h2>
          <p className="text-sm text-white/50 font-body">تعرّف على السوروبان خطوة بخطوة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEARN_MODULES.map((mod, i) => {
          const Icon = ICONS[mod.icon] || Info;
          const isDone = completed.includes(mod.id) || mod.status === 'completed';
          const isLocked = !isDone && mod.status === 'locked' && !completed.includes(mod.id - 1);

          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={!isLocked ? { scale: 1.03, y: -4 } : {}}
              whileTap={!isLocked ? { scale: 0.97 } : {}}
              onClick={() => handleOpen(mod, isLocked)}
              disabled={isLocked}
              className="group relative glass-card p-5 text-right overflow-hidden disabled:opacity-50"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
              <div className="relative flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {isDone ? (
                  <span className="badge bg-emerald2-500/20 border-emerald2-400/30 text-emerald2-300 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" /> مكتمل
                  </span>
                ) : isLocked ? (
                  <span className="badge bg-white/5 border-white/10 text-white/40 text-xs">
                    <Lock className="w-3.5 h-3.5" /> مقفل
                  </span>
                ) : (
                  <span className="badge bg-gold-400/20 border-gold-400/30 text-gold-300 text-xs">
                    متاح
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold font-display text-white mb-1">
                {mod.titleAr}
              </h3>
              <p className="text-xs text-white/40 font-body mb-2">{mod.title}</p>
              <p className="text-sm text-white/60 font-body leading-snug">{mod.descriptionAr}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Lesson Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-extrabold font-display text-white">
                  {selected.titleAr}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <span className="text-white/70 text-xl">×</span>
                </button>
              </div>

              <p className="text-white/60 font-body text-sm mb-4">{selected.descriptionAr}</p>

              {/* Mode toggle */}
              <div className="flex gap-2 mb-5 p-1 rounded-2xl bg-white/5 border border-white/10">
                <button
                  onClick={() => switchMode('watch')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold font-body text-sm transition-all ${
                    mode === 'watch'
                      ? 'bg-gradient-to-br from-purple-500 to-electric-500 text-white shadow-lg'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Eye className="w-4 h-4" /> شاهد
                </button>
                <button
                  onClick={() => switchMode('try')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold font-body text-sm transition-all ${
                    mode === 'try'
                      ? 'bg-gradient-to-br from-purple-500 to-electric-500 text-white shadow-lg'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Hand className="w-4 h-4" /> جرّب
                </button>
              </div>

              {/* Soroban Visual */}
              <div className="flex justify-center mb-5">
                <AnimatePresence mode="wait">
                  {mode === 'watch' ? (
                    <motion.div
                      key="watch"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Soroban value={selected.value} columns={1} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="try"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TryColumn
                        target={selected.value}
                        playSound={playSound}
                        onSolved={() => setTriedSolved(true)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mode === 'try' && !triedSolved && (
                <p className="text-center text-xs text-white/40 font-body mb-5">
                  حرّك الخرزات حتى تصل إلى القيمة {selected.value}
                </p>
              )}

              {/* Value display */}
              {mode === 'watch' && (
                <div className="text-center mb-5">
                  <p className="text-white/40 font-body text-xs mb-1">القيمة</p>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-5xl font-extrabold font-display shimmer-text"
                  >
                    {selected.value}
                  </motion.p>
                </div>
              )}

              {/* Concept */}
              <div className="flex gap-3 p-4 rounded-2xl bg-purple-500/10 border border-purple-400/20 mb-5">
                <Lightbulb className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/80 font-body leading-relaxed">
                  {selected.conceptAr}
                </p>
              </div>

              <button onClick={handleComplete} className="btn-primary w-full">
                <CheckCircle2 className="w-5 h-5" />
                أكملت الدرس +30 XP
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
