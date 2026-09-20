import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Lock, CheckCircle2, Info, Star, CircleDot,
  Combine, Hash, Sigma, Minus, Plus, Lightbulb, Eye, Hand,
  X, Divide, Fingerprint, MoveRight, Target,
  BookOpen, Sparkles, RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import { LEARN_MODULES } from '@/data';
import { Soroban } from './Soroban';
import { FingerMath } from './FingerMath';
import { InteractiveSoroban } from './InteractiveSoroban';
import { SpeechButton } from './SpeechButton';
import { useSpeech } from '@/hooks/useSpeech';
import type { LearnModule, LessonStep, DivisionStep, LessonExample, DivisionExample } from '@/types';

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const ICONS: Record<string, LucideIcon> = {
  Info, Star, CircleDot, Combine, Hash, Sigma, Minus, Plus, X, Divide, Brain: Target, Hand,
};

interface LearnScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
}

type LessonMode = 'watch' | 'try';

const COMPLETED_STORAGE_KEY = 'soroban-completed-lessons';
const PROGRESS_STORAGE_KEY = 'soroban-lesson-progress';
const MAX_ATTEMPTS = 10;

function getColumnsForValue(value: number): number {
  if (value < 10) return 1;
  if (value < 100) return 2;
  if (value < 1000) return 3;
  return 4;
}

function getFingerLabel(finger: string): string {
  if (finger === 'thumb') return '👍 الإبهام';
  if (finger === 'index') return '☝️ السبابة';
  if (finger === 'both_pinch') return '✋ الإبهام + السبابة';
  if (finger === 'left_index') return '☝️ سبابة اليد اليسرى';
  return '👆';
}

function getDirectionLabel(direction: string): string {
  if (direction === 'up') return '⬆️ ارفع';
  if (direction === 'down') return '⬇️ أنزل';
  if (direction === 'pinch_in') return '🤏 ضم';
  if (direction === 'pinch_out') return '🖐️ افتح';
  return '↔️';
}

function getColumnLabel(column: string): string {
  if (column === 'units') return 'الآحاد';
  if (column === 'tens') return 'العشرات';
  if (column === 'hundreds') return 'المئات';
  if (column === 'thousands') return 'الآلاف';
  return '';
}

function getRuleLabel(category: string): string {
  if (category === 'direct') return 'مباشر';
  if (category === 'small_friends') return 'صديق 5';
  if (category === 'big_friends') return 'صديق 10';
  if (category === 'combined') return 'مركب';
  if (category === 'anzan') return 'تخيل';
  return '';
}

function getRuleColor(category: string): string {
  if (category === 'direct') return 'from-emerald2-400 to-emerald2-600';
  if (category === 'small_friends') return 'from-electric-400 to-electric-600';
  if (category === 'big_friends') return 'from-purple-400 to-purple-600';
  if (category === 'combined') return 'from-gold-400 to-gold-600';
  if (category === 'anzan') return 'from-pink-400 to-pink-600';
  return 'from-white/20 to-white/10';
}

function isDivisionExample(ex: LessonExample | DivisionExample): ex is DivisionExample {
  return ex.steps.length > 0 && 'expectedAbacusState' in ex.steps[0];
}

function AbacusStatePreview({ state, label }: { state: number[]; label: string }) {
  const columnLabels = ['آحاد', 'عشرات', 'مئات'];
  return (
    <div className="mt-2 p-2 rounded-xl bg-black/20 border border-white/10">
      <p className="text-[10px] text-white/50 font-body mb-1">{label}</p>
      <div className="flex flex-row-reverse gap-2 justify-center">
        {state.map((digit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-lg font-bold font-display text-electric-300">
              {toArabicNumber(digit)}
            </span>
            <span className="text-[9px] text-white/40">{columnLabels[idx] || ''}</span>
          </div>
        ))}
      </div>
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
  const [lessonProgress, setLessonProgress] = useState<Record<number, number[]>>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [mode, setMode] = useState<LessonMode>('watch');
  const [currentExample, setCurrentExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [solvedExamples, setSolvedExamples] = useState<number[]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [abacusValue, setAbacusValue] = useState(0);

  // ✨ جديد: تتبع المحاولات لكل مثال
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completed));
    } catch { /* ignore */ }
  }, [completed]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(lessonProgress));
    } catch { /* ignore */ }
  }, [lessonProgress]);

  useEffect(() => { return () => { stop(); }; }, [stop]);

  const handleOpen = (mod: LearnModule, isLocked: boolean) => {
    if (isLocked) return;
    playSound('click');
    setSelected(mod);
    setMode('watch');
    setCurrentExample(0);
    setCurrentStep(0);
    setAbacusValue(0);
    const savedSolved = lessonProgress[mod.id] || [];
    setSolvedExamples(savedSolved);
    setShowSteps(false);
    setAttempts({});
    setShowAnswer(false);
    setFeedbackMsg('');
    setTimeout(() => speak(mod.audioText), 300);
  };

  const handleClose = () => { stop(); setSelected(null); };

  const handleComplete = () => {
    if (!selected) return;
    if (solvedExamples.length < selected.examples.length) return;
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
    setCurrentStep(0);
    setAbacusValue(0);
    if (selected) {
      const savedSolved = lessonProgress[selected.id] || [];
      setSolvedExamples(savedSolved);
    }
    setShowSteps(false);
    setShowAnswer(false);
    setFeedbackMsg('');
  };

  const handleExampleSolved = () => {
    if (!selected) return;
    if (!solvedExamples.includes(currentExample)) {
      const newSolved = [...solvedExamples, currentExample];
      setSolvedExamples(newSolved);
      setLessonProgress({
        ...lessonProgress,
        [selected.id]: newSolved,
      });
      playSound('success');
      setFeedbackMsg('✅ أحسنت! إجابة صحيحة.');
    }
  };

  // ✨ جديد: زر "تحقق" في وضع جرّب
  const handleCheck = () => {
    if (!currentEx) return;
    if (abacusValue === currentEx.answer) {
      handleExampleSolved();
    } else {
      playSound('error');
      const key = currentExample;
      const currentAttempts = (attempts[key] || 0) + 1;
      setAttempts({ ...attempts, [key]: currentAttempts });
      setFeedbackMsg(
        currentAttempts >= MAX_ATTEMPTS
          ? '❌ لم تصل بعد. يمكنك رؤية الإجابة الآن.'
          : `❌ حاول مرة أخرى. المحاولة ${toArabicNumber(currentAttempts)} من ${toArabicNumber(MAX_ATTEMPTS)}`
      );
      // إعادة تعيين المعداد
      setAbacusValue(0);
    }
  };

  const nextExample = () => {
    if (!selected) return;
    if (currentExample + 1 < selected.examples.length) {
      setCurrentExample(currentExample + 1);
      setCurrentStep(0);
      setAbacusValue(0);
      setShowSteps(false);
      setShowAnswer(false);
      setFeedbackMsg('');
      playSound('click');
    }
  };

  const prevExample = () => {
    if (currentExample > 0) {
      setCurrentExample(currentExample - 1);
      setCurrentStep(0);
      setAbacusValue(0);
      setShowSteps(false);
      setShowAnswer(false);
      setFeedbackMsg('');
      playSound('click');
    }
  };

  const currentEx = selected?.examples[currentExample];
  const isSolved = solvedExamples.includes(currentExample);
  const isLastExample = selected ? currentExample + 1 === selected.examples.length : false;
  const isFirstExample = currentExample === 0;
  const allExamplesSolved = selected ? solvedExamples.length === selected.examples.length : false;
  const isFingerLesson = selected?.id === 0;

  const currentAttempts = attempts[currentExample] || 0;
  const canShowAnswerBtn = currentAttempts >= MAX_ATTEMPTS && !isSolved;

  const nextStep = () => {
    if (!currentEx) return;
    if (currentStep + 1 < currentEx.steps.length) {
      setCurrentStep(currentStep + 1);
      playSound('bead');
    } else {
      setShowSteps(false);
    }
  };

  return (
    <div className="px-3 sm:px-6 py-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
          <span className="hidden sm:inline">رجوع</span>
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">التعلّم</h2>
          <p className="text-sm text-white/50 font-body">تعرّف على السوروبان خطوة بخطوة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEARN_MODULES.map((mod, i) => {
          const Icon = ICONS[mod.icon] || Info;
          const isDone = completed.includes(mod.id);
          const isFirstLesson = mod.id === 0;
          const previousCompleted = completed.includes(mod.id - 1);
          const isLocked = !isDone && !isFirstLesson && !previousCompleted;
          const solvedCount = (lessonProgress[mod.id] || []).length;
          const totalCount = mod.examples.length;
          const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

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
              <h3 className="text-lg font-extrabold font-display text-white mb-1">{mod.titleAr}</h3>
              <p className="text-xs text-white/40 font-body mb-2">{mod.title}</p>
              <p className="text-sm text-white/60 font-body leading-snug mb-2">{mod.descriptionAr}</p>

              {!isLocked && totalCount > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald2-400 to-electric-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-[10px] text-white/40 font-body whitespace-nowrap">
                      {toArabicNumber(solvedCount)}/{toArabicNumber(totalCount)}
                    </span>
                  </div>
                </div>
              )}
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
              <div className="flex items-center justify-between mb-4 gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white flex-1">
                  {selected.titleAr}
                </h3>
                <SpeechButton text={selected.audioText} speak={speak} stop={stop} isSpeaking={isSpeaking} isSupported={isSupported} />
                <button onClick={handleClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0">
                  <span className="text-white/70 text-xl">×</span>
                </button>
              </div>

              {/* بطاقة القاعدة */}
              <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-gold-400/10 to-gold-600/10 border border-gold-400/30">
                <div className="flex items-start gap-2">
                  <Fingerprint className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gold-300 mb-1">القاعدة:</p>
                    <p className="text-sm text-white/80 font-body leading-relaxed">{selected.ruleAr}</p>
                  </div>
                </div>
              </div>

              {/* جدول القاعدة */}
              {selected.ruleTable && selected.ruleTable.length > 0 && (
                <div className="mb-4 p-3 rounded-2xl bg-black/30 border border-gold-400/20">
                  <p className="text-xs font-bold text-gold-300 mb-2 text-center">📋 جدول القاعدة</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {selected.ruleTable.map((row, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-1 p-1.5 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs font-bold text-electric-300 font-display">{row.formula}</span>
                        <span className="text-[10px] text-white/40">=</span>
                        <span className="text-xs font-bold text-emerald2-300 font-display">{row.result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.story && (
                <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-400/30">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-pink-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-pink-300 mb-1">القصة:</p>
                      <p className="text-sm text-white/80 font-body leading-relaxed">{selected.story}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-white/60 font-body text-sm mb-4">{selected.descriptionAr}</p>

              <div className="flex gap-2 mb-4 p-1 rounded-2xl bg-white/5 border border-white/10">
                <button
                  onClick={() => switchMode('watch')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold font-body text-sm transition-all ${
                    mode === 'watch' ? 'bg-gradient-to-br from-purple-500 to-electric-500 text-white shadow-lg' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Eye className="w-4 h-4" /> شاهد
                </button>
                <button
                  onClick={() => switchMode('try')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold font-body text-sm transition-all ${
                    mode === 'try' ? 'bg-gradient-to-br from-purple-500 to-electric-500 text-white shadow-lg' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Hand className="w-4 h-4" /> جرّب
                </button>
              </div>

              {currentEx && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-white/40 font-body">
                      المثال {toArabicNumber(currentExample + 1)} من {toArabicNumber(selected.examples.length)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`badge bg-gradient-to-br ${getRuleColor(currentEx.ruleCategory)} text-white text-[10px]`}>
                        {getRuleLabel(currentEx.ruleCategory)}
                      </span>
                      <div className="flex gap-1">
                        {selected.examples.map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-full ${
                            solvedExamples.includes(i) ? 'bg-emerald2-400' : i === currentExample ? 'bg-white' : 'bg-white/20'
                          }`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-lg font-extrabold font-display text-white mb-4">{currentEx.problemText}</p>
                </div>
              )}

              {/* ─────────── وضع "شاهد" ─────────── */}
              {currentEx && mode === 'watch' && (
                <div className="flex justify-center mb-4">
                  <AnimatePresence mode="wait">
                    <motion.div key={`watch-${currentExample}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {isFingerLesson ? (
                        <FingerMath value={currentEx.answer} />
                      ) : (
                        <Soroban value={currentEx.answer} columns={getColumnsForValue(currentEx.answer)} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* ─────────── وضع "جرّب" ─────────── */}
              {currentEx && mode === 'try' && (
                <div className="flex flex-col items-center gap-3 mb-4">
                  {/* المعداد التفاعلي — لا تلميح للإجابة */}
                  <InteractiveSoroban
                    columns={getColumnsForValue(currentEx.answer)}
                    value={abacusValue}
                    onValueChange={(v) => setAbacusValue(v)}
                  />

                  {/* زر تحقق */}
                  {!isSolved && !showAnswer && (
                    <button
                      onClick={handleCheck}
                      className="btn-primary !py-2 !px-6 !text-sm"
                      disabled={abacusValue === 0}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      تحقق
                    </button>
                  )}

                  {/* عداد المحاولات + رسالة التغذية الراجعة */}
                  {feedbackMsg && !showAnswer && !isSolved && (
                    <p className="text-xs text-white/60 font-body text-center">
                      {feedbackMsg}
                    </p>
                  )}

                  {/* نجاح */}
                  {isSolved && (
                    <p className="text-sm text-emerald2-300 font-bold font-body">
                      ✅ أحسنت! إجابة صحيحة.
                    </p>
                  )}

                  {/* زر "أرني الإجابة" بعد 10 محاولات */}
                  {canShowAnswerBtn && !showAnswer && (
                    <button
                      onClick={() => { setShowAnswer(true); playSound('click'); }}
                      className="btn-ghost !py-2 !px-4 !text-xs !border-gold-400/40 !text-gold-300"
                    >
                      <Lightbulb className="w-4 h-4" />
                      أرني الإجابة
                    </button>
                  )}

                  {/* الإجابة بعد الضغط على الزر */}
                  {showAnswer && (
                    <div className="w-full p-3 rounded-2xl bg-gold-500/15 border border-gold-400/40">
                      <p className="text-sm font-bold text-gold-300 text-center mb-1">
                        💡 الإجابة الصحيحة: {toArabicNumber(currentEx.answer)}
                      </p>
                      <p className="text-xs text-white/70 font-body text-center leading-relaxed">
                        {currentEx.explanation}
                      </p>
                      <button
                        onClick={handleExampleSolved}
                        className="w-full mt-3 btn-primary !py-2 !text-sm"
                      >
                        فهمت، التالي
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* خطوات الشرح — "شاهد" فقط */}
              {mode === 'watch' && currentEx && currentEx.steps.length > 0 && !isFingerLesson && (
                <div className="mb-4">
                  {!showSteps ? (
                    <button
                      onClick={() => { setShowSteps(true); setCurrentStep(0); }}
                      className="w-full btn-primary !py-3"
                    >
                      <BookOpen className="w-5 h-5" />
                      اشرح لي الخطوات
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-white/50 font-body">
                          الخطوة {toArabicNumber(currentStep + 1)} من {toArabicNumber(currentEx.steps.length)}
                        </p>
                      </div>

                      {currentEx.steps.slice(0, currentStep + 1).map((step: LessonStep | DivisionStep, i: number) => {
                        const isDiv = 'expectedAbacusState' in step;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-3 rounded-2xl border ${
                              i === currentStep ? 'bg-electric-500/20 border-electric-400/40' : 'bg-white/5 border-white/10'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-electric-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-electric-200">
                                {toArabicNumber(i + 1)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-xs font-bold text-gold-300">{getFingerLabel(step.fingerUsed)}</span>
                                  <span className="text-xs font-bold text-electric-300">{getDirectionLabel(step.direction)}</span>
                                  {step.targetColumn && (
                                    <span className="text-xs text-purple-300 font-body">({getColumnLabel(step.targetColumn)})</span>
                                  )}
                                </div>
                                <p className="text-sm text-white/80 font-body leading-relaxed">{step.instructionText}</p>
                                {!isDiv && (
                                  <p className="text-xs text-emerald2-300 font-body mt-1">
                                    القيمة بعد هذه الخطوة: {toArabicNumber((step as LessonStep).expectedValueAfter)}
                                  </p>
                                )}
                                {isDiv && (
                                  <AbacusStatePreview
                                    state={(step as DivisionStep).expectedAbacusState}
                                    label="حالة المعداد المتوقعة بعد الخطوة:"
                                  />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}

                      {currentStep + 1 < currentEx.steps.length && (
                        <button onClick={nextStep} className="w-full btn-primary !py-2 !text-sm mt-2">
                          <MoveRight className="w-4 h-4" /> الخطوة التالية
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* شرح "شاهد" فقط */}
              {currentEx && mode === 'watch' && currentEx.explanation && (
                <div className="flex gap-3 p-3 rounded-2xl bg-purple-500/10 border border-purple-400/20 mb-4">
                  <Lightbulb className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 font-body leading-relaxed">{currentEx.explanation}</p>
                </div>
              )}

              {selected.examples.length > 0 && (
                <div className="flex gap-2 mb-4">
                  <button onClick={prevExample} disabled={isFirstExample} className="btn-ghost flex-1 !py-2 !text-sm disabled:opacity-30">السابق</button>
                  <button onClick={nextExample} disabled={isLastExample} className={`flex-1 !py-2 !text-sm ${!isLastExample ? 'btn-primary' : 'btn-ghost opacity-30'}`}>التالي</button>
                </div>
              )}

              <button
                onClick={handleComplete}
                disabled={!allExamplesSolved}
                className="btn-primary w-full disabled:opacity-40"
              >
                <CheckCircle2 className="w-5 h-5" />
                {allExamplesSolved
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