import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Trophy, RotateCcw, BookOpen } from 'lucide-react';
import { LEARN_MODULES } from '@/data';
import { Soroban2D5 } from './soroban2d5/Soroban2D5';

const COMPLETED_STORAGE_KEY = 'soroban-completed-lessons';
const PRACTICE_STORAGE_KEY = 'soroban_practice_stats';

const SESSION_SIZE = 10;
const MAX_ATTEMPTS = 2;

interface PracticeQuestion {
  question: string;
  answer: number;
  lessonId: number;
}

interface PracticeStats {
  totalProblems: number;
  correctAnswers: number;
  additionProblems: number;
  subtractionProblems: number;
  multiplicationProblems: number;
  divisionProblems: number;
}

function loadPracticeStats(): PracticeStats {
  try {
    const saved = localStorage.getItem(PRACTICE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        totalProblems: typeof parsed.totalProblems === 'number' ? parsed.totalProblems : 0,
        correctAnswers: typeof parsed.correctAnswers === 'number' ? parsed.correctAnswers : 0,
        additionProblems: typeof parsed.additionProblems === 'number' ? parsed.additionProblems : 0,
        subtractionProblems: typeof parsed.subtractionProblems === 'number' ? parsed.subtractionProblems : 0,
        multiplicationProblems: typeof parsed.multiplicationProblems === 'number' ? parsed.multiplicationProblems : 0,
        divisionProblems: typeof parsed.divisionProblems === 'number' ? parsed.divisionProblems : 0,
      };
    }
  } catch { /* ignore */ }
  return { totalProblems: 0, correctAnswers: 0, additionProblems: 0, subtractionProblems: 0, multiplicationProblems: 0, divisionProblems: 0 };
}

function savePracticeStats(stats: PracticeStats) {
  try {
    localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(stats));
  } catch { /* ignore */ }
}

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** ✅ حساب عدد الأعمدة المطلوبة لعرض القيمة */
function getColumnsForValue(value: number): number {
  if (value < 10) return 1;
  if (value < 100) return 2;
  if (value < 1000) return 3;
  return 4;
}

interface PracticeScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

export function PracticeScreen({ onBack, playSound, onXP, burst }: PracticeScreenProps) {
  const [completed, setCompleted] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
    if (saved) {
      try { setCompleted(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const buildSession = (): PracticeQuestion[] => {
    const pool: PracticeQuestion[] = [];

    for (const lessonId of completed) {
      const mod = LEARN_MODULES.find((m) => m.id === lessonId);
      if (!mod) continue;

      for (const ex of mod.examples) {
        if (!/[+\-×÷]/.test(ex.problemText)) continue;

        pool.push({
          question: ex.problemText.replace(/\s*=\s*؟?\s*$/, '').trim(),
          answer: ex.answer,
          lessonId: mod.id,
        });
      }
    }

    const shuffled = shuffle(pool);
    const selected: PracticeQuestion[] = [];
    const seen = new Set<string>();

    for (const q of shuffled) {
      if (selected.length >= SESSION_SIZE) break;
      if (seen.has(q.question)) continue;
      seen.add(q.question);
      selected.push(q);
    }

    return selected;
  };

  const [questions, setQuestions] = useState<PracticeQuestion[]>(() => buildSession());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong' | 'revealed'>('idle');
  const [finished, setFinished] = useState(false);

  // ✅ إعادة بناء الجلسة عند تغيير الدروس المكتملة
  useEffect(() => {
    setQuestions(buildSession());
    setIndex(0);
    setScore(0);
    setAttempts(0);
    setFeedback('idle');
    setFinished(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed.length]);

  const question = questions[index];

  const isAddition = question?.question.includes('+') && !question?.question.includes('-');
  const isSubtraction = question?.question.includes('-') && !question?.question.includes('÷');
  const isMultiplication = question?.question.includes('×');
  const isDivision = question?.question.includes('÷');

  const handleAttempt = (isCorrect: boolean) => {
    if (feedback === 'correct' || feedback === 'revealed') return;

    if (isCorrect) {
      if (feedback === 'idle') {
        playSound('success');
        setFeedback('correct');
        setScore((s) => s + 1);
        onXP(2);
        burst(0.5, 0.5);

        const stats = loadPracticeStats();
        savePracticeStats({
          totalProblems: stats.totalProblems + 1,
          correctAnswers: stats.correctAnswers + 1,
          additionProblems: isAddition ? stats.additionProblems + 1 : stats.additionProblems,
          subtractionProblems: isSubtraction ? stats.subtractionProblems + 1 : stats.subtractionProblems,
          multiplicationProblems: isMultiplication ? stats.multiplicationProblems + 1 : stats.multiplicationProblems,
          divisionProblems: isDivision ? stats.divisionProblems + 1 : stats.divisionProblems,
        });
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        playSound('error');
        setFeedback('revealed');

        const stats = loadPracticeStats();
        savePracticeStats({
          totalProblems: stats.totalProblems + 1,
          correctAnswers: stats.correctAnswers,
          additionProblems: isAddition ? stats.additionProblems + 1 : stats.additionProblems,
          subtractionProblems: isSubtraction ? stats.subtractionProblems + 1 : stats.subtractionProblems,
          multiplicationProblems: isMultiplication ? stats.multiplicationProblems + 1 : stats.multiplicationProblems,
          divisionProblems: isDivision ? stats.divisionProblems + 1 : stats.divisionProblems,
        });
      } else {
        playSound('error');
        setFeedback('wrong');
        setTimeout(() => setFeedback('idle'), 800);
      }
    }
  };

  /**
   * ✅ التحقق عند تغيّر قيمة السوروبان
   * - إذا طابق الإجابة → صحيح
   * - إذا اختلف → خطأ
   */
  const handleValueChange = (value: number) => {
    if (!question) return;
    if (feedback === 'correct' || feedback === 'revealed') return;

    // فقط إذا كانت القيمة > 0 (تجنب التحقق عند التصفير)
    if (value === 0) return;

    if (value === question.answer) {
      handleAttempt(true);
    } else {
      // نتحقق فقط عند وصول قيمة غير صفرية
      // ملاحظة: نحتاج debounce لتجنب رصد كل حركة
    }
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setAttempts(0);
      setFeedback('idle');
    } else {
      setFinished(true);
      playSound('levelup');
    }
  };

  const restart = () => {
    setQuestions(buildSession());
    setIndex(0);
    setScore(0);
    setAttempts(0);
    setFeedback('idle');
    setFinished(false);
    playSound('click');
  };

  if (!question && !finished) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-20 h-20 rounded-3xl bg-purple-500/20 flex items-center justify-center mb-5">
          <BookOpen className="w-10 h-10 text-purple-300" />
        </div>
        <h2 className="text-2xl font-extrabold font-display text-white mb-2">لا توجد أسئلة متاحة</h2>
        <p className="text-white/60 font-body text-center mb-6">أكمل دروس "التعلّم" أولاً</p>
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-primary">رجوع</button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-2xl shadow-gold-500/40 mb-5"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-extrabold font-display text-white mb-2">انتهى التدريب!</h2>
        <p className="text-white/60 font-body mb-6">
          أجبت بشكل صحيح على {toArabicNumber(score)} من {toArabicNumber(questions.length)} مسألة
        </p>
        <div className="glass-card p-5 w-full max-w-xs mb-5 text-center">
          <p className="text-4xl font-extrabold font-display shimmer-text">
            {toArabicNumber(score * 2)}
          </p>
          <p className="text-sm text-white/50 font-body">نقاط خبرة مكتسبة</p>
        </div>
        <div className="flex gap-3 w-full max-w-xs">
          <button onClick={restart} className="btn-primary flex-1">
            <RotateCcw className="w-5 h-5" /> جلسة جديدة
          </button>
          <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost flex-1">رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">التدريب</h2>
          <p className="text-sm text-white/50 font-body">استخدم السوروبان لحل المسائل</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-electric-500"
            animate={{ width: `${(index / questions.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </div>
        <span className="text-sm font-body text-white/50 whitespace-nowrap">
          {toArabicNumber(index + 1)}/{toArabicNumber(questions.length)}
        </span>
      </div>

      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="badge bg-emerald2-500/15 border-emerald2-400/20">
          <CheckCircle2 className="w-4 h-4 text-emerald2-300" />
          <span className="text-emerald2-200 text-sm">{toArabicNumber(score)} صحيح</span>
        </div>
        <div className="badge bg-electric-500/15 border-electric-400/20">
          <span className="text-electric-200 text-sm">
            المحاولة {toArabicNumber(attempts + 1)}/{toArabicNumber(MAX_ATTEMPTS)}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="glass-card p-5 sm:p-6 mb-5"
        >
          <p className="text-center text-white/40 font-body text-sm mb-2">مثّل الناتج على السوروبان</p>
          <p className="text-center text-5xl sm:text-6xl font-extrabold font-display shimmer-text mb-6">
            {question.question} = ؟
          </p>

          {feedback === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-emerald2-500/15 border border-emerald2-400/40 text-center mb-4"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald2-300 mx-auto mb-2" />
              <p className="text-emerald2-300 font-bold">أحسنت! إجابة صحيحة 🎉</p>
            </motion.div>
          )}

          {feedback === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-2xl bg-red-500/15 border border-red-400/40 text-center mb-4"
            >
              <p className="text-red-300 font-bold text-sm">❌ حاول مرة أخرى</p>
            </motion.div>
          )}

          {feedback === 'revealed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-red-500/15 border border-red-400/40 text-center mb-4"
            >
              <p className="text-sm text-white/70 mb-1">الإجابة الصحيحة:</p>
              <p className="text-3xl font-black text-red-300 font-display">
                {toArabicNumber(question.answer)}
              </p>
            </motion.div>
          )}

          {/* ✅ Soroban2D5 بدل AbacusInput */}
          {feedback !== 'correct' && feedback !== 'revealed' && (
            <div className="flex flex-col items-center gap-3">
              <Soroban2D5
                key={`practice-${index}`}
                columns={getColumnsForValue(question.answer)}
                interactive={true}
                showValue={true}
                onValueChange={handleValueChange}
              />

              <p className="text-xs text-white/50 font-body text-center">
                💡 حرّك الخرزات لتمثيل الإجابة، ثم اضغط "تحقق"
              </p>

              <button
                onClick={() => {
                  // نجمع القيمة الحالية من Soroban2D5 عبر إعادة قراءتها من الـ state
                  // في هذه النسخة، نستخدم التتبع عبر onValueChange
                  // يمكن استبدال هذا بزر "تحقق" حقيقي عبر ref (نسخة لاحقة)
                  // للآن، التحقق يتم تلقائياً عند مطابقة القيمة
                  const el = document.querySelector('[data-soroban-value]');
                  if (el) {
                    const v = Number(el.getAttribute('data-soroban-value') || '0');
                    if (v === question.answer) handleAttempt(true);
                    else handleAttempt(false);
                  }
                }}
                className="btn-primary !py-2 !px-6 !text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                تحقق
              </button>
            </div>
          )}

          {(feedback === 'correct' || feedback === 'revealed') && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={nextQuestion}
              className="btn-primary w-full mt-5"
            >
              {index + 1 < questions.length ? 'السؤال التالي' : 'إنهاء التدريب'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default PracticeScreen;