import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Grid3X3, Eye, Play, Check, X, Lightbulb, RotateCcw } from 'lucide-react';
import { InteractiveSoroban } from '@/components/InteractiveSoroban';

type Stage = 1 | 2 | 3;

interface Problem { a: number; b: number; }

function getColumnsForValue(value: number): number {
  if (value < 10) return 1;
  if (value < 100) return 2;
  if (value < 1000) return 3;
  return 4;
}

// ========== حساب خطوات الضرب الجزئي ==========
function computePartialProducts(a: number, b: number) {
  const digits = String(a).split('').reverse().map(Number);
  const steps: Array<{ digitValue: number; value: number; label: string }> = [];
  const zerosLabels = ['', 'صفر', 'صفرين', 'ثلاثة أصفار'];
  for (let i = 0; i < digits.length; i++) {
    const place = Math.pow(10, i);
    const digitValue = digits[i] * place;
    if (digits[i] === 0) continue;
    const zerosText = zerosLabels[i] || '';
    steps.push({
      digitValue,
      value: digitValue * b,
      label: zerosText
        ? `${digits[i]} × ${b} + ${zerosText}`
        : `${digits[i]} × ${b}`,
    });
  }
  return steps;
}

// ========== بيانات المراحل ==========
const STAGE_DATA: Record<Stage, {
  label: string;
  watchProblem: Problem;
  tryProblems: Problem[];
}> = {
  1: {
    label: 'منزلتين × منزلة',
    watchProblem: { a: 62, b: 8 },
    tryProblems: [
      { a: 32, b: 4 },
      { a: 44, b: 6 },
      { a: 23, b: 5 },
      { a: 12, b: 7 },
      { a: 31, b: 4 },
    ],
  },
  2: {
    label: '٣ منازل × منزلة',
    watchProblem: { a: 312, b: 3 },
    tryProblems: [
      { a: 213, b: 4 },
      { a: 123, b: 5 },
      { a: 421, b: 2 },
      { a: 132, b: 3 },
      { a: 231, b: 4 },
    ],
  },
  3: {
    label: 'منزلتين × منزلتين',
    watchProblem: { a: 54, b: 13 },
    tryProblems: [
      { a: 21, b: 13 },
      { a: 32, b: 12 },
      { a: 14, b: 22 },
      { a: 23, b: 11 },
      { a: 13, b: 31 },
    ],
  },
};

interface Props {
  onBack: () => void;
  onComplete?: (stars: number) => void;
}

const MultiplicationScreen: React.FC<Props> = ({ onBack, onComplete }) => {
  const [stage, setStage] = useState<Stage>(1);
  const [mode, setMode] = useState<'watch' | 'try'>('watch');
  const [watchStep, setWatchStep] = useState(0);
  const [tryIdx, setTryIdx] = useState(0);
  const [abacusValue, setAbacusValue] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'no' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const stageData = STAGE_DATA[stage];
  const watchProblem = stageData.watchProblem;
  const currentProblem = stageData.tryProblems[tryIdx];

  const watchSteps = useMemo(
    () => computePartialProducts(watchProblem.a, watchProblem.b),
    [watchProblem]
  );
  const watchTotalSteps = watchSteps.length + 1;

  useEffect(() => {
    if (mode !== 'watch') return;
    setWatchStep(0);
    const timer = setInterval(() => {
      setWatchStep((s) => {
        if (s >= watchTotalSteps) {
          clearInterval(timer);
          return s;
        }
        return s + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [stage, mode, watchTotalSteps]);

  const changeStage = (s: Stage) => {
    setStage(s);
    setTryIdx(0);
    setAbacusValue(0);
    setFeedback(null);
    setScore(0);
    setAttempts(0);
    setWatchStep(0);
  };

  const changeMode = (m: 'watch' | 'try') => {
    setMode(m);
    setTryIdx(0);
    setAbacusValue(0);
    setFeedback(null);
    setScore(0);
    setAttempts(0);
    setWatchStep(0);
  };

  const handleCheck = () => {
    if (!currentProblem) return;
    const correct = currentProblem.a * currentProblem.b;
    if (abacusValue === correct) {
      setFeedback('ok');
      setScore((s) => s + 1);
      setTimeout(() => {
        if (tryIdx + 1 >= stageData.tryProblems.length) {
          if (onComplete) {
            const stars = Math.max(1, Math.round(((score + 1) / stageData.tryProblems.length) * 3));
            onComplete(stars);
          }
        } else {
          setTryIdx(tryIdx + 1);
          setAbacusValue(0);
          setFeedback(null);
          setAttempts(0);
        }
      }, 1500);
    } else {
      setFeedback('no');
      setAttempts((a) => a + 1);
    }
  };

  const watchTotal = watchProblem.a * watchProblem.b;
  const columns = currentProblem ? getColumnsForValue(currentProblem.a * currentProblem.b) : 3;
  const watchColumns = getColumnsForValue(watchTotal);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-4 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          درس الضرب — قواعد السوروبان
        </h1>
        <Grid3X3 className="w-6 h-6 text-amber-300" />
      </div>

      {/* Stage Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => changeStage(s as Stage)}
            className={`px-3 py-2 rounded-xl whitespace-nowrap font-bold text-xs sm:text-sm transition ${
              stage === s ? 'bg-purple-600 shadow-lg' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {STAGE_DATA[s as Stage].label}
          </button>
        ))}
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-2xl">
        <button
          onClick={() => changeMode('watch')}
          className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm ${
            mode === 'watch' ? 'bg-purple-600' : 'text-white/60'
          }`}
        >
          <Eye className="w-5 h-5" /> شاهد
        </button>
        <button
          onClick={() => changeMode('try')}
          className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm ${
            mode === 'try' ? 'bg-purple-600' : 'text-white/60'
          }`}
        >
          <Play className="w-5 h-5" /> جرّب
        </button>
      </div>

      {/* ============ WATCH MODE ============ */}
      {mode === 'watch' && (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <p className="text-xs text-white/60 mb-2">مثال توضيحي</p>
            <p className="text-3xl font-black font-display text-white" dir="ltr">
              <span className="text-amber-300">{watchProblem.a}</span>
              <span className="text-white/60 mx-3">×</span>
              <span className="text-emerald-300">{watchProblem.b}</span>
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 space-y-3">
            <p className="text-sm font-bold text-amber-300 mb-2">📋 خطوات الحل:</p>
            {watchSteps.map((step, i) => (
              <AnimatePresence key={i}>
                {watchStep >= i + 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between"
                  >
                    <span className="text-sm text-white/80">{step.label}</span>
                    <span className="text-lg font-bold text-blue-300">{step.value}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}

            {watchStep >= watchSteps.length + 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between"
              >
                <span className="text-sm text-white/80">
                  {watchSteps.map((s) => s.value).join(' + ')}
                </span>
                <span className="text-lg font-bold text-emerald-300">{watchTotal}</span>
              </motion.div>
            )}
          </div>

          {watchStep >= watchTotalSteps && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-2xl p-4"
            >
              <p className="text-sm text-white/60 mb-3 text-center">
                تمثيل النتيجة على المعداد:
              </p>
              <div className="flex justify-center">
                <InteractiveSoroban
                  columns={watchColumns}
                  value={watchTotal}
                  onValueChange={() => {}}
                />
              </div>
              <p className="text-center text-2xl font-bold text-emerald-300 mt-3">
                الناتج = {watchTotal}
              </p>
            </motion.div>
          )}

          <div className="bg-amber-500/20 border border-amber-500/40 rounded-2xl p-4 text-sm">
            <p className="font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-300" /> الطريقة:
            </p>
            <p className="text-white/80 leading-relaxed">
              اضرب آحاد الرقم × الرقم الثاني، ثم عشراته × الرقم الثاني (مع إضافة صفر)، ثم اجمع النواتج على المعداد.
            </p>
          </div>
        </div>
      )}

      {/* ============ TRY MODE ============ */}
      {mode === 'try' && currentProblem && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-white/60">
              السؤال {tryIdx + 1} من {stageData.tryProblems.length} — النقاط: {score}
            </span>
          </div>

          <div className="bg-white/5 rounded-3xl p-5 text-center">
            <div className="text-4xl font-bold" dir="ltr">
              <span className="text-amber-300">{currentProblem.a}</span>
              <span className="text-white/60 mx-3">×</span>
              <span className="text-emerald-300">{currentProblem.b}</span>
              <span className="text-white/60 mx-3">=</span>
              <span className="text-purple-300">؟</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3">
            <p className="text-xs text-white/60 mb-3 text-center">
              مثّل الإجابة على المعداد:
            </p>
            <div className="flex justify-center">
              <InteractiveSoroban
                columns={columns}
                value={abacusValue}
                onValueChange={setAbacusValue}
              />
            </div>
          </div>

          <div className="text-center">
            <span className="text-sm text-white/60">القيمة الحالية: </span>
            <span className="text-2xl font-bold text-amber-300">{abacusValue}</span>
          </div>

          {!feedback && (
            <div className="flex gap-2">
              <button
                onClick={() => setAbacusValue(0)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> مسح
              </button>
              <button
                onClick={handleCheck}
                className="flex-1 py-3 rounded-xl bg-gradient-to-l from-purple-600 to-amber-500 font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> تحقق
              </button>
            </div>
          )}

          <AnimatePresence>
            {feedback === 'ok' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/20 border border-emerald-500 rounded-2xl p-4 text-center"
              >
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-bold text-emerald-300">إجابة صحيحة! 🎉</p>
              </motion.div>
            )}
            {feedback === 'no' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-center"
              >
                <X className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="font-bold text-red-300">حاول مرة أخرى</p>
                <p className="text-xs text-white/60 mt-1">المحاولات: {attempts}</p>
                <button
                  onClick={() => {
                    setFeedback(null);
                    setAbacusValue(0);
                  }}
                  className="mt-3 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold"
                >
                  إعادة المحاولة
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MultiplicationScreen;