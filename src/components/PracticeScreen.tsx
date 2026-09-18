import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, Trophy, RotateCcw, BookOpen } from 'lucide-react';
import { ADDITION_QUESTIONS, SUBTRACTION_QUESTIONS } from '@/data';
import { AbacusInput } from './AbacusInput';
import type { PracticeQuestion } from '@/types';

const COMPLETED_STORAGE_KEY = 'soroban-completed-lessons';

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
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
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const hasSubtraction = completed.includes(10);

  const questions: PracticeQuestion[] = hasSubtraction
    ? [...ADDITION_QUESTIONS, ...SUBTRACTION_QUESTIONS]
    : ADDITION_QUESTIONS;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [currentSolved, setCurrentSolved] = useState(false);

  const question = questions[index];

  const handleCorrect = () => {
    if (currentSolved) return;
    setCurrentSolved(true);
    playSound('success');
    setScore((s) => s + 1);
    setStreak((s) => s + 1);
    onXP(15);
    burst(0.5, 0.5);
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setCurrentSolved(false);
    } else {
      setFinished(true);
      playSound('levelup');
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setStreak(0);
    setFinished(false);
    setCurrentSolved(false);
    playSound('click');
  };

  // حالة عدم وجود أسئلة
  if (!question && !finished) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-20 h-20 rounded-3xl bg-purple-500/20 flex items-center justify-center mb-5">
          <BookOpen className="w-10 h-10 text-purple-300" />
        </div>
        <h2 className="text-2xl font-extrabold font-display text-white mb-2">
          لا توجد أسئلة متاحة
        </h2>
        <p className="text-white/60 font-body text-center mb-6">
          أكمل دروس "التعلّم" أولاً لفتح أسئلة التدريب
        </p>
        <button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="btn-primary"
        >
          رجوع
        </button>
      </div>
    );
  }

  // حالة الانتهاء
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
        <h2 className="text-3xl font-extrabold font-display text-white mb-2">
          انتهى التدريب!
        </h2>
        <p className="text-white/60 font-body mb-6">
          أجبت بشكل صحيح على {toArabicNumber(score)} من {toArabicNumber(questions.length)} مسألة
        </p>
        <div className="glass-card p-5 w-full max-w-xs mb-5 text-center">
          <p className="text-4xl font-extrabold font-display shimmer-text">
            {toArabicNumber(score * 15)}
          </p>
          <p className="text-sm text-white/50 font-body">نقاط خبرة مكتسبة</p>
        </div>
        <div className="flex gap-3 w-full max-w-xs">
          <button onClick={restart} className="btn-primary flex-1">
            <RotateCcw className="w-5 h-5" /> إعادة
          </button>
          <button
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="btn-ghost flex-1"
          >
            رجوع
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="btn-ghost !px-3 !py-2"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            التدريب
          </h2>
          <p className="text-sm text-white/50 font-body">
            استخدم السوروبان لحل المسائل
          </p>
        </div>
      </div>

      {/* Progress bar */}
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

      {/* Score & Streak */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="badge bg-emerald2-500/15 border-emerald2-400/20">
          <CheckCircle2 className="w-4 h-4 text-emerald2-300" />
          <span className="text-emerald2-200 text-sm">
            {toArabicNumber(score)} صحيح
          </span>
        </div>
        <div className="badge bg-orange-500/15 border-orange-400/20">
          <span className="text-orange-200 text-sm">
            سلسلة: {toArabicNumber(streak)}
          </span>
        </div>
        {hasSubtraction && (
          <div className="badge bg-purple-500/15 border-purple-400/20">
            <span className="text-purple-200 text-sm">جمع + طرح</span>
          </div>
        )}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="glass-card p-5 sm:p-6 mb-5"
        >
          <p className="text-center text-white/40 font-body text-sm mb-2">
            مثّل الناتج على السوروبان
          </p>
          <p className="text-center text-5xl sm:text-6xl font-extrabold font-display shimmer-text mb-6">
            {question.question}
          </p>

          {/* Abacus Input */}
          <AbacusInput
            target={question.answer}
            onCorrect={handleCorrect}
            hint="استخدم الخرزات لتمثيل الإجابة الصحيحة"
          />

          {/* Next button (after solving) */}
          {currentSolved && (
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
