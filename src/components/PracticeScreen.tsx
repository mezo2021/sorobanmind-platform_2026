import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, Trophy, RotateCcw, BookOpen } from 'lucide-react';
import { ADDITION_QUESTIONS, SUBTRACTION_QUESTIONS } from '@/data';
import { Soroban } from './Soroban';
import type { PracticeQuestion } from '@/types';

const COMPLETED_STORAGE_KEY = 'soroban-completed-lessons';

interface PracticeScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

export function PracticeScreen({ onBack, playSound, onXP, burst }: PracticeScreenProps) {
  // قراءة الدروس المكتملة من localStorage
  const [completed, setCompleted] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // تحديث القائمة عند فتح الشاشة
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

  // هل أكمل الطفل درس "الطرح البسيط" (id = 10)؟
  const hasSubtraction = completed.includes(10);

  // الأسئلة المتاحة حسب التقدم
  const questions: PracticeQuestion[] = hasSubtraction
    ? [...ADDITION_QUESTIONS, ...SUBTRACTION_QUESTIONS]
    : ADDITION_QUESTIONS;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];

  const handleAnswer = (choice: number) => {
    if (selected !== null || !question) return;
    setSelected(choice);

    if (choice === question.answer) {
      playSound('success');
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      onXP(15);
      burst(0.5, 0.5);
    } else {
      playSound('error');
      setStreak(0);
    }

    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(index + 1);
        setSelected(null);
      } else {
        setFinished(true);
        playSound('levelup');
      }
    }, 1200);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setFinished(false);
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
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-primary">
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
        <h2 className="text-3xl font-extrabold font-display text-white mb-2">انتهى التدريب!</h2>
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
          <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost flex-1">
            رجوع
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">التدريب</h2>
          <p className="text-sm text-white/50 font-body">حلّ المسائل واكسب نقاط الخبرة</p>
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
          <span className="text-emerald2-200 text-sm">{toArabicNumber(score)} صحيح</span>
        </div>
        <div className="badge bg-orange-500/15 border-orange-400/20">
          <span className="text-orange-200 text-sm">سلسلة: {toArabicNumber(streak)}</span>
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
          className="glass-card p-6 sm:p-8 mb-5"
        >
          <div className="flex justify-center mb-6">
            <Soroban
              value={question.answer}
              columns={question.answer >= 100 ? 3 : question.answer >= 10 ? 2 : 1}
            />
          </div>
          <p className="text-center text-white/40 font-body text-sm mb-2">احسب النتيجة</p>
          <p className="text-center text-5xl sm:text-6xl font-extrabold font-display shimmer-text mb-6">
            {question.question}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {question.choices.map((choice) => {
              const isCorrect = choice === question.answer;
              const isSelected = selected === choice;
              let style = 'bg-white/10 border-white/10 hover:bg-white/15 text-white';
              if (selected !== null) {
                if (isCorrect) style = 'bg-emerald2-500/20 border-emerald2-400/50 text-emerald2-200';
                else if (isSelected) style = 'bg-red-500/20 border-red-400/50 text-red-200';
                else style = 'bg-white/5 border-white/8 text-white/40';
              }
              return (
                <motion.button
                  key={choice}
                  whileHover={selected === null ? { scale: 1.04 } : {}}
                  whileTap={selected === null ? { scale: 0.96 } : {}}
                  onClick={() => handleAnswer(choice)}
                  disabled={selected !== null}
                  className={`relative py-5 rounded-2xl border-2 font-extrabold text-2xl font-display transition-all duration-300 ${style}`}
                >
                  {toArabicNumber(choice)}
                  {selected !== null && isCorrect && (
                    <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-emerald2-400" />
                  )}
                  {selected !== null && isSelected && !isCorrect && (
                    <XCircle className="absolute top-2 right-2 w-5 h-5 text-red-400" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
