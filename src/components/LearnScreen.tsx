import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Lock, CheckCircle2, Info, Star, CircleDot,
  Combine, Hash, Sigma, Minus, Plus, Lightbulb, Eye, Hand,
  X, Divide,
  type LucideIcon,
} from 'lucide-react';
import { LEARN_MODULES } from '@/data';
import { Soroban } from './Soroban';
import { InteractiveSoroban } from './InteractiveSoroban';
import { SpeechButton } from './SpeechButton';
import { useSpeech } from '@/hooks/useSpeech';
import type { LearnModule } from '@/types';

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const ICONS: Record<string, LucideIcon> = {
  Info, Star, CircleDot, Combine, Hash, Sigma, Minus, Plus, X, Divide,
};

interface LearnScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'bead' | 'whoosh') => void;
  onXP: (amount: number) => void;
}

type LessonMode = 'watch' | 'try';

const COMPLETED_STORAGE_KEY = 'soroban-completed-lessons';

function getColumnsForValue(value: number): number {
  if (value < 10) return 1;
  if (value < 100) return 2;
  if (value < 1000) return 3;
  return 4;
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
  const [currentExample, setCurrentExample] = useState(0);
  const [solvedExamples, setSolvedExamples] = useState<number[]>([]);

  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completed));
    } catch {
      /* ignore */
    }
  }, [completed]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleOpen = (mod: LearnModule, isLocked: boolean) => {
    if (isLocked) return;
    playSound('click');
    setSelected(mod);
    setMode('watch');
    setCurrentExample(0);
    setSolvedExamples([]);
    setTimeout(() => speak(mod.audioText), 300);
  };

  const handleClose = () => {
    stop();
    setSelected(null);
  };

  const handleComplete = () => {
    if (!selected) return;
    playSound('success');
    if (!completed.includes(selected.id)) {
      setCompleted([...completed, selected.id]);
      onXP(30);
    }
    stop();
    setSelected(null);
  };

  const switchMode = (m: LessonMode) => {
    playSound('click');
    setMode(m);
    setCurrentExample(0);
    setSolvedExamples([]);
  };

  const handleExampleSolved = () => {
    if (!solvedExamples.includes(currentExample)) {
      setSolvedExamples([...solvedExamples, currentExample]);
      playSound('success');
    }
  };

  const nextExample = () => {
    if (!selected) return;
    if (currentExample + 1 < selected.examples.length) {
      setCurrentExample(currentExample + 1);
      playSound('click');
    }
  };

  const prevExample = () => {
    if (currentExample > 0) {
      setCurrentExample(currentExample - 1);
      playSound('click');
    }
  };

  const allExamplesSolved =
    selected && solvedExamples.length === selected.examples.length;

  const currentEx = selected?.examples[currentExample];
  const isSolved = solvedExamples.includes(currentExample);
  const isLastExample = selected ? currentExample + 1 === selected.examples.length : false;
  const isFirstExample = currentExample === 0;

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
          const isDone = completed.includes(mod.id);
          const isFirstLesson = mod.id === 1;
          const previousCompleted = completed.includes(mod.id - 1);
          const isLocked = !isDone && !isFirstLesson && !previousCompleted;

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

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong p-5 sm:p-7 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-4 gap-3">
                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white flex-1">
                  {selected.titleAr}
                </h3>
                <SpeechButton
                  text={selected.audioText}
                  speak={speak}
                  stop={stop}
                  isSpeaking={isSpeaking}
                  isSupported={isSupported}
                />
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
                >
                  <span className="text-white/70 text-xl">×</span>
                </button>
              </div>

              <p className="text-white/60 font-body text-sm mb-4">{selected.descriptionAr}</p>

              {/* Mode toggle */}
              <div className="flex gap-2 mb-4 p-1 rounded-2xl bg-white/5 border border-white/10">
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

              {/* Example progress */}
              {currentEx && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-white/40 font-body">
                      المثال {toArabicNumber(currentExample + 1)} من {toArabicNumber(selected.examples.length)}
                    </p>
                    <div className="flex gap-1">
                      {selected.examples.map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            solvedExamples.includes(i)
                              ? 'bg-emerald2-400'
                              : i === currentExample
                              ? 'bg-white'
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-center text-lg font-extrabold font-display text-white mb-4">
                    {currentEx.question}
                  </p>
                </div>
              )}

              {/* Soroban Visual */}
              {currentEx && (
                <div className="flex justify-center mb-4">
                  <AnimatePresence mode="wait">
                    {mode === 'watch' ? (
                      <motion.div
                        key={`watch-${currentExample}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Soroban
                          value={currentEx.targetValue}
                          columns={getColumnsForValue(currentEx.targetValue)}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`try-${currentExample}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <InteractiveSoroban
                          columns={getColumnsForValue(currentEx.targetValue)}
                          value={0}
                          onValueChange={(v) => {
                            if (v === currentEx.targetValue && !isSolved) {
                              handleExampleSolved();
                            }
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Explanation */}
              {currentEx && (
                <div className="flex gap-3 p-3 rounded-2xl bg-purple-500/10 border border-purple-400/20 mb-4">
                  <Lightbulb className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 font-body leading-relaxed">
                    {currentEx.explanation}
                  </p>
                </div>
              )}

              {/* Navigation — يظهر في الوضعين */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={prevExample}
                  disabled={isFirstExample}
                  className="btn-ghost flex-1 !py-2 !text-sm disabled:opacity-30"
                >
                  السابق
                </button>
                <button
                  onClick={nextExample}
                  disabled={isLastExample}
                  className={`flex-1 !py-2 !text-sm ${
                    !isLastExample ? 'btn-primary' : 'btn-ghost opacity-30'
                  }`}
                >
                  التالي
                </button>
              </div>

              {/* Status message */}
              {mode === 'try' && (
                <div className="text-center mb-4">
                  {isSolved ? (
                    <p className="text-sm text-emerald2-300 font-bold font-body">
                      ✅ أحسنت! وصلت للقيمة الصحيحة
                    </p>
                  ) : (
                    <p className="text-xs text-white/40 font-body">
                      حرّك الخرزات لتصل إلى القيمة {toArabicNumber(currentEx?.targetValue || 0)}
                    </p>
                  )}
                </div>
              )}

              {/* Complete button */}
              <button
                onClick={handleComplete}
                disabled={mode === 'try' && !allExamplesSolved}
                className="btn-primary w-full disabled:opacity-40"
              >
                <CheckCircle2 className="w-5 h-5" />
                {mode === 'watch' || allExamplesSolved
                  ? `أكملت الدرس +${toArabicNumber(30)} XP`
                  : `حل ${toArabicNumber(selected.examples.length - solvedExamples.length)} أمثلة إضافية`}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LearnScreen;
