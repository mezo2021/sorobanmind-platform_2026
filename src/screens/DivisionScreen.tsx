import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Divide, Eye, Play, Check, X, Lightbulb,
  RotateCcw, Trophy, Volume2, Square,
} from 'lucide-react';
import { InteractiveSoroban } from '@/components/InteractiveSoroban';
import { useSpeech } from '@/hooks/useSpeech';

// ============================================================
// الأنواع والثوابت
// ============================================================
type Stage = 1 | 2 | 3;

interface Problem { dividend: number; divisor: number; quotient: number; }

// ============================================================
// النص الصوتي (قصة الدرس)
// ============================================================
const LESSON_STORY =
  'في قلعة السوروبان، كان الحكيم معداد يوزّع الحلويات على الأصدقاء بالعدل. سألته البطلة بانة: كيف نوزّع ٨٦ حلوى على صديقين؟ فابتسم الحكيم وقال: نبدأ من المرتبة الكبيرة، ونقسم جزءاً جزءاً. نطرح ثم ننتقل للجزء التالي. هكذا نعطي كل صديق حقه بالعدل. هيا نتعلم سر التوزيع!';

function getColumnsForValue(value: number): number {
  if (value < 10) return 1;
  if (value < 100) return 2;
  if (value < 1000) return 3;
  if (value < 10000) return 4;
  return 5;
}

// ============================================================
// بيانات المراحل
// ============================================================
const STAGE_DATA: Record<Stage, {
  label: string;
  watchExamples: Problem[];
  tryProblems: Problem[];
}> = {
  1: {
    label: 'القسمة البسيطة',
    watchExamples: [
      { dividend: 86, divisor: 2, quotient: 43 },
      { dividend: 57, divisor: 3, quotient: 19 },
      { dividend: 165, divisor: 3, quotient: 55 },
    ],
    tryProblems: [
      { dividend: 84, divisor: 2, quotient: 42 },
      { dividend: 96, divisor: 4, quotient: 24 },
      { dividend: 369, divisor: 3, quotient: 123 },
    ],
  },
  2: {
    label: 'مرتبتين ÷ مرتبتين',
    watchExamples: [
      { dividend: 88, divisor: 22, quotient: 4 },
      { dividend: 96, divisor: 32, quotient: 3 },
      { dividend: 78, divisor: 26, quotient: 3 },
    ],
    tryProblems: [
      { dividend: 66, divisor: 22, quotient: 3 },
      { dividend: 92, divisor: 23, quotient: 4 },
      { dividend: 76, divisor: 19, quotient: 4 },
    ],
  },
  3: {
    label: '٣ مراتب ÷ مرتبتين',
    watchExamples: [
      { dividend: 675, divisor: 25, quotient: 27 },
      { dividend: 945, divisor: 27, quotient: 35 },
      { dividend: 936, divisor: 39, quotient: 24 },
    ],
    tryProblems: [
      { dividend: 828, divisor: 36, quotient: 23 },
      { dividend: 864, divisor: 32, quotient: 27 },
      { dividend: 816, divisor: 24, quotient: 34 },
    ],
  },
};

// ============================================================
// حساب خطوات الحل
// ============================================================
interface Step {
  title: string;
  detail: string;
  abacusValue: number;
  resultSoFar: number;
}

function computeSteps(dividend: number, divisor: number): Step[] {
  const steps: Step[] = [];
  const divStr = String(dividend);
  const digits = divStr.split('').map(Number);
  const numDigits = digits.length;

  let startIdx = 0;
  if (numDigits >= 2 && digits[0] < divisor && numDigits > 1) {
    startIdx = 1;
  }

  let currentValue = 0;
  let resultSoFar = 0;

  const placeNames = ['المئات', 'العشرات', 'الآحاد'];

  steps.push({
    title: '🎯 التمهيد',
    detail: `سنقسم ${dividend} على ${divisor}`,
    abacusValue: dividend,
    resultSoFar: 0,
  });

  for (let i = 0; i < numDigits; i++) {
    const placeIdx = numDigits - 1 - i;
    const placeName = placeNames[placeIdx] || 'آحاد';

    if (i < startIdx) {
      currentValue = currentValue * 10 + digits[i];
      continue;
    }

    currentValue = currentValue * 10 + digits[i];

    if (currentValue < divisor && i < numDigits - 1) {
      continue;
    }

    const q = Math.floor(currentValue / divisor);
    const product = q * divisor;
    const remainder = currentValue - product;

    const abacusValue = remainder * Math.pow(10, numDigits - 1 - i);
    const isLast = i === numDigits - 1;

    steps.push({
      title: `${placeName}: نقسم ${currentValue} على ${divisor}`,
      detail: `${currentValue} ÷ ${divisor} = ${q} → ${q} × ${divisor} = ${product} → ${currentValue} − ${product} = ${remainder}`,
      abacusValue: isLast ? 0 : abacusValue,
      resultSoFar: q,
    });

    resultSoFar = resultSoFar * 10 + q;
    currentValue = remainder;
  }

  steps.push({
    title: '✅ الناتج النهائي',
    detail: `${dividend} ÷ ${divisor} = ${dividend / divisor}`,
    abacusValue: 0,
    resultSoFar: dividend / divisor,
  });

  return steps;
}

// ============================================================
// الشاشة الرئيسية
// ============================================================
interface Props {
  onBack: () => void;
  onComplete?: (stars: number) => void;
  onXP?: (amount: number) => void;
}

const DivisionScreen: React.FC<Props> = ({ onBack, onComplete, onXP }) => {
  const [stage, setStage] = useState<Stage>(1);
  const [mode, setMode] = useState<'watch' | 'try'>('watch');
  const [watchIdx, setWatchIdx] = useState(0);
  const [watchStep, setWatchStep] = useState(0);
  const [tryIdx, setTryIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [abacusValue, setAbacusValue] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'no' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  // ✅ الصوت
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  const stageData = STAGE_DATA[stage];
  const watchProblem = stageData.watchExamples[watchIdx];
  const tryProblem = stageData.tryProblems[tryIdx];

  const steps = useMemo(
    () => (watchProblem ? computeSteps(watchProblem.dividend, watchProblem.divisor) : []),
    [watchProblem]
  );

  const currentStep = steps[Math.min(watchStep, steps.length - 1)];

  // ✅ إيقاف الصوت عند تغيير المرحلة/الوضع/المثال/الخروج
  useEffect(() => {
    return () => { stop(); };
  }, [stage, mode, watchIdx, stop]);

  const changeStage = (s: Stage) => {
    stop();
    setStage(s);
    setWatchIdx(0);
    setWatchStep(0);
    setTryIdx(0);
    setAnswer('');
    setAbacusValue(0);
    setFeedback(null);
    setAttempts(0);
    setScore(0);
  };

  const changeMode = (m: 'watch' | 'try') => {
    stop();
    setMode(m);
    setWatchIdx(0);
    setWatchStep(0);
    setTryIdx(0);
    setAnswer('');
    setAbacusValue(0);
    setFeedback(null);
    setAttempts(0);
    setScore(0);
  };

  const nextStep = () => {
    if (watchStep + 1 < steps.length) setWatchStep(watchStep + 1);
  };

  const prevStep = () => {
    if (watchStep > 0) setWatchStep(watchStep - 1);
  };

  const handleCheck = () => {
    if (!tryProblem) return;
    const numAnswer = Number(answer);
    if (numAnswer === tryProblem.quotient) {
      setFeedback('ok');
      setScore((s) => s + 1);
      setTimeout(() => {
        if (tryIdx + 1 >= stageData.tryProblems.length) {
          if (onComplete) onComplete(Math.max(1, Math.round(((score + 1) / stageData.tryProblems.length) * 3)));
        } else {
          setTryIdx(tryIdx + 1);
          setAnswer('');
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

  const columns = tryProblem ? getColumnsForValue(tryProblem.quotient) : 3;
  const watchColumns = currentStep
    ? Math.max(3, getColumnsForValue(watchProblem.dividend))
    : 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white p-4 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition shrink-0">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-sm sm:text-lg font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          درس القسمة — قواعد السوروبان
        </h1>
        <Divide className="w-5 h-5 text-amber-300 shrink-0" />
      </div>

      {/* Story Card + Listen Button */}
      {mode === 'watch' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-l from-pink-500/15 to-purple-500/15 border border-pink-400/30 rounded-2xl p-4 mb-4"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              <span className="text-xs font-bold text-pink-300">القصة:</span>
            </div>
            {isSupported && (
              <button
                onClick={() => {
                  if (isSpeaking) { stop(); }
                  else { speak(LESSON_STORY); }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSpeaking
                    ? 'bg-red-500/30 border border-red-400/50 text-red-200'
                    : 'bg-rose-500/20 border border-rose-400/40 text-rose-200 hover:bg-rose-500/30'
                }`}
              >
                {isSpeaking ? (
                  <><Square className="w-3.5 h-3.5" /> إيقاف</>
                ) : (
                  <><Volume2 className="w-3.5 h-3.5" /> اسمع قصتي</>
                )}
              </button>
            )}
          </div>
          <p className="text-sm text-pink-100 font-body leading-relaxed">
            {LESSON_STORY}
          </p>
        </motion.div>
      )}

      {/* Stage Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => changeStage(s as Stage)}
            className={`px-3 py-2 rounded-xl whitespace-nowrap font-bold text-xs transition ${
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

      {/* ======================= WATCH MODE ======================= */}
      {mode === 'watch' && watchProblem && (
        <div className="space-y-4">
          {/* Example Selector */}
          <div className="flex gap-2 bg-white/5 p-1 rounded-2xl">
            {stageData.watchExamples.map((_, i) => (
              <button
                key={i}
                onClick={() => { stop(); setWatchIdx(i); setWatchStep(0); }}
                className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${
                  watchIdx === i ? 'bg-amber-500 text-black' : 'text-white/60'
                }`}
              >
                مثال {i + 1}
              </button>
            ))}
          </div>

          {/* Problem Display */}
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <p className="text-xs text-white/50 mb-2">
              مثال {watchIdx + 1} من {stageData.watchExamples.length}
            </p>
            <p className="text-3xl font-black font-display" dir="ltr">
              <span className="text-amber-300">{watchProblem.dividend}</span>
              <span className="text-white/60 mx-2">÷</span>
              <span className="text-emerald-300">{watchProblem.divisor}</span>
              <span className="text-white/60 mx-2">=</span>
              <span className="text-purple-300">
                {watchStep >= steps.length - 1 ? watchProblem.quotient : '؟'}
              </span>
            </p>
          </div>

          {/* Steps Display */}
          <div className="bg-white/5 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-amber-300">
                📋 الخطوة {watchStep + 1} من {steps.length}
              </p>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === watchStep
                        ? 'bg-amber-400'
                        : i < watchStep
                        ? 'bg-emerald-400'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={watchStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-4 rounded-2xl border ${
                  watchStep === steps.length - 1
                    ? 'bg-emerald-500/15 border-emerald-400/40'
                    : 'bg-blue-500/10 border-blue-400/30'
                }`}
              >
                <p className="text-sm font-bold text-white mb-2">{currentStep.title}</p>
                <p className="text-sm text-white/80 font-body leading-relaxed" dir="ltr">
                  {currentStep.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2">
              <button
                onClick={prevStep}
                disabled={watchStep === 0}
                className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-sm disabled:opacity-30"
              >
                السابق
              </button>
              <button
                onClick={nextStep}
                disabled={watchStep >= steps.length - 1}
                className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm disabled:opacity-30"
              >
                التالي
              </button>
            </div>
          </div>

          {/* Soroban Display */}
          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-xs text-white/60 mb-3 text-center">
              {watchStep === steps.length - 1
                ? 'الناتج النهائي على المعداد:'
                : 'القيمة الحالية للمقسوم على المعداد:'}
            </p>
            <div className="flex justify-center">
              <InteractiveSoroban
                columns={watchColumns}
                value={
                  watchStep === steps.length - 1
                    ? watchProblem.quotient
                    : currentStep.abacusValue
                }
                onValueChange={() => {}}
              />
            </div>
            <p className="text-center text-2xl font-bold text-emerald-300 mt-3">
              {watchStep === steps.length - 1
                ? `الناتج = ${watchProblem.quotient}`
                : `المتبقي = ${currentStep.abacusValue}`}
            </p>
          </div>

          {/* Rule */}
          <div className="bg-amber-500/20 border border-amber-500/40 rounded-2xl p-4 text-sm">
            <p className="font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-300" /> القاعدة:
            </p>
            <p className="text-white/80 leading-relaxed">
              نبدأ من المرتبة الأكبر. في كل خطوة:{' '}
              <span className="font-bold text-amber-300">اقسم</span>، ثم{' '}
              <span className="font-bold text-amber-300">اضرب</span> الناتج في
              المقسوم عليه، ثم{' '}
              <span className="font-bold text-amber-300">اطرح</span>. وننتقل
              للمرتبة التالية.
            </p>
          </div>
        </div>
      )}

      {/* ======================= TRY MODE ======================= */}
      {mode === 'try' && tryProblem && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-white/60">
              السؤال {tryIdx + 1} من {stageData.tryProblems.length} — النقاط: {score}
            </span>
          </div>

          <div className="bg-white/5 rounded-3xl p-6 text-center">
            <div className="text-4xl font-bold" dir="ltr">
              <span className="text-amber-300">{tryProblem.dividend}</span>
              <span className="text-white/60 mx-3">÷</span>
              <span className="text-emerald-300">{tryProblem.divisor}</span>
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

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-xs text-white/60 mb-2 text-center">أو اكتب الإجابة:</p>
            <input
              type="text"
              inputMode="numeric"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              placeholder="اكتب الناتج"
              className="w-full bg-slate-800 border-2 border-purple-500/50 rounded-2xl px-4 py-3 text-center text-2xl font-bold text-white outline-none focus:border-amber-400"
              dir="ltr"
            />
          </div>

          <div className="text-center">
            <span className="text-sm text-white/60">القيمة الحالية على المعداد: </span>
            <span className="text-2xl font-bold text-amber-300">{abacusValue}</span>
          </div>

          {!feedback && (
            <div className="flex gap-2">
              <button
                onClick={() => { setAbacusValue(0); setAnswer(''); }}
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
                    setAnswer('');
                  }}
                  className="mt-3 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold"
                >
                  إعادة المحاولة
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center gap-2">
            {stageData.tryProblems.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < tryIdx ? 'bg-emerald-400' : i === tryIdx ? 'bg-amber-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionScreen;