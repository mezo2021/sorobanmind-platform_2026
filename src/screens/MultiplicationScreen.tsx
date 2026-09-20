import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Grid3X3, Eye, Play, Check, X, Lightbulb } from 'lucide-react';

// ===== توليد مسائل الضرب حسب المراحل =====
const generateProblems = (stage: number) => {
  const problems: { a: number; b: number; r: number }[] = [];
  if (stage === 1) {
    // منزلة × منزلة
    for (let i = 2; i <= 9; i++) for (let j = 2; j <= 9; j++) problems.push({ a: i, b: j, r: i * j });
  } else if (stage === 2) {
    // منزلتين × منزلة (مثل 62 × 8)
    for (let i = 11; i <= 99; i += 7) for (let j = 2; j <= 9; j += 2) problems.push({ a: i, b: j, r: i * j });
  } else if (stage === 3) {
    // منزلتين × منزلتين (لطريقة الشبكة والخطوط)
    for (let i = 11; i <= 49; i += 6) for (let j = 11; j <= 39; j += 7) problems.push({ a: i, b: j, r: i * j });
  }
  return problems.sort(() => Math.random() - 0.5).slice(0, 10);
};

// ===== مكون الشبكة (Lattice) =====
const LatticeGrid: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const aStr = String(a);
  const bStr = String(b);
  const cells: Array<{ row: number; col: number; val: number; tens: number; ones: number }> = [];
  for (let i = 0; i < aStr.length; i++) {
    for (let j = 0; j < bStr.length; j++) {
      const val = Number(aStr[i]) * Number(bStr[j]);
      cells.push({ row: i, col: j, val, tens: Math.floor(val / 10), ones: val % 10 });
    }
  }
  return (
    <div className="bg-white rounded-2xl p-3 inline-block" dir="ltr">
      {/* أعمدة b في الأعلى */}
      <div className="flex" style={{ paddingRight: 30 }}>
        {bStr.split('').map((d, j) => (
          <div key={j} className="w-16 text-center font-bold text-purple-700">{d}</div>
        ))}
      </div>
      {/* الصفوف */}
      {aStr.split('').map((aDigit, i) => (
        <div key={i} className="flex items-center">
          <div className="w-8 text-center font-bold text-purple-700">{aDigit}</div>
          <div className="flex">
            {bStr.split('').map((_, j) => {
              const cell = cells.find((c) => c.row === i && c.col === j)!;
              return (
                <div key={j} className="w-16 h-16 border border-purple-300 relative bg-purple-50">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {cell.tens}
                    </div>
                    <div className="flex-1 flex items-center justify-center text-red-600 font-bold text-lg border-t border-purple-200">
                      {cell.ones}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {/* الناتج النهائي */}
      <div className="mt-3 text-center">
        <span className="text-sm text-gray-600">الناتج: </span>
        <span className="text-2xl font-bold text-emerald-600">{a * b}</span>
      </div>
    </div>
  );
};

// ===== مكون طريقة الخطوط =====
const LineMethod: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const aStr = String(a);
  const bStr = String(b);
  const colorsA = ['#ef4444', '#3b82f6', '#f59e0b'];
  const colorsB = ['#10b981', '#8b5cf6', '#ec4899'];

  return (
    <div className="bg-slate-800 rounded-2xl p-4 flex justify-center overflow-hidden">
      <svg viewBox="0 0 400 300" className="w-full max-w-md">
        {/* خطوط الرقم الأول (أفقية) */}
        {aStr.split('').map((digit, groupIdx) =>
          Array.from({ length: Number(digit) }).map((_, lineIdx) => {
            const offset = aStr.split('').slice(0, groupIdx).reduce((s, d) => s + Number(d), 0);
            const y = 40 + (offset + lineIdx) * 18;
            return (
              <line key={`a-${groupIdx}-${lineIdx}`} x1={40} y1={y} x2={360} y2={y}
                stroke={colorsA[groupIdx % 3]} strokeWidth={3} strokeLinecap="round" />
            );
          })
        )}
        {/* خطوط الرقم الثاني (عمودية) */}
        {bStr.split('').map((digit, groupIdx) =>
          Array.from({ length: Number(digit) }).map((_, lineIdx) => {
            const offset = bStr.split('').slice(0, groupIdx).reduce((s, d) => s + Number(d), 0);
            const x = 60 + (offset + lineIdx) * 22;
            return (
              <line key={`b-${groupIdx}-${lineIdx}`} x1={x} y1={20} x2={x} y2={270}
                stroke={colorsB[groupIdx % 3]} strokeWidth={3} strokeLinecap="round" />
            );
          })
        )}
      </svg>
    </div>
  );
};

// ===== الشاشة الرئيسية =====
interface Props {
  onBack: () => void;
  onComplete?: (stars: number) => void;
}

const MultiplicationScreen: React.FC<Props> = ({ onBack, onComplete }) => {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<'watch' | 'try'>('watch');
  const [problems, setProblems] = useState(() => generateProblems(1));
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'ok' | 'no' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const current = problems[idx];

  const changeStage = (s: 1 | 2 | 3) => {
    setStage(s);
    setProblems(generateProblems(s));
    setIdx(0);
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
  };

  const handleSubmit = () => {
    if (Number(answer) === current.r) {
      setFeedback('ok');
      setScore((s) => s + 1);
      setTimeout(() => {
        if (idx + 1 >= problems.length) {
          if (onComplete) onComplete(Math.round((score + 1) / problems.length * 3));
        } else {
          setIdx(idx + 1);
          setAnswer('');
          setFeedback(null);
          setShowHint(false);
        }
      }, 1000);
    } else {
      setFeedback('no');
      setShowHint(true);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-4 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          درس الضرب — قواعد السوروبان
        </h1>
        <Grid3X3 className="w-6 h-6 text-amber-300" />
      </div>

      {/* Stage Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {[
          { id: 1, label: 'منزلة × منزلة' },
          { id: 2, label: 'منزلتين × منزلة' },
          { id: 3, label: 'منزلتين × منزلتين' },
        ].map((s) => (
          <button key={s.id} onClick={() => changeStage(s.id as 1 | 2 | 3)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap font-bold transition ${
              stage === s.id ? 'bg-purple-600 shadow-lg' : 'bg-white/10'
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-2xl">
        <button onClick={() => setMode('watch')}
          className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            mode === 'watch' ? 'bg-purple-600' : 'text-white/60'
          }`}>
          <Eye className="w-5 h-5" /> شاهد
        </button>
        <button onClick={() => setMode('try')}
          className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            mode === 'try' ? 'bg-purple-600' : 'text-white/60'
          }`}>
          <Play className="w-5 h-5" /> جرّب
        </button>
      </div>

      {/* Watch Mode */}
      {mode === 'watch' && (
        <div className="space-y-6">
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <span className="bg-amber-500 text-black rounded-lg px-3 py-1">مثال 1</span>
              طريقة الشبكة (Lattice)
            </h3>
            <div className="flex justify-center">
              <LatticeGrid a={stage === 1 ? 7 : stage === 2 ? 62 : 32} b={stage === 1 ? 8 : stage === 2 ? 8 : 12} />
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <span className="bg-emerald-500 text-black rounded-lg px-3 py-1">مثال 2</span>
              طريقة الخطوط
            </h3>
            <LineMethod a={stage === 1 ? 3 : stage === 2 ? 23 : 13} b={stage === 1 ? 4 : stage === 2 ? 4 : 21} />
          </div>
          <div className="bg-amber-500/20 border border-amber-500/40 rounded-2xl p-4 text-sm">
            <p className="font-bold mb-2">💡 قاعدة الحمل:</p>
            <p>إذا كان الناتج 10 أو أكثر → نحتفظ بالآحاد وننقل العشرات للمنزلة التالية (يسارًا).</p>
          </div>
        </div>
      )}

      {/* Try Mode */}
      {mode === 'try' && current && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-white/60">السؤال {idx + 1} من {problems.length}</span>
          </div>
          <div className="bg-white/5 rounded-3xl p-6 text-center">
            <div className="text-4xl font-bold mb-4" dir="ltr">
              <span className="text-amber-300">{current.a}</span>
              <span className="text-white/60 mx-3">×</span>
              <span className="text-emerald-300">{current.b}</span>
              <span className="text-white/60 mx-3">=</span>
              <span className="text-purple-300">؟</span>
            </div>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="اكتب الإجابة"
              className="w-full max-w-xs mx-auto block bg-slate-800 border-2 border-purple-500/50 rounded-2xl px-4 py-3 text-center text-2xl font-bold text-white outline-none focus:border-amber-400"
            />
            <button onClick={handleSubmit}
              className="mt-4 px-8 py-3 bg-gradient-to-l from-purple-600 to-amber-500 rounded-2xl font-bold flex items-center gap-2 mx-auto">
              <Check className="w-5 h-5" /> تحقق
            </button>
          </div>

          <AnimatePresence>
            {feedback === 'ok' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-emerald-500/20 border border-emerald-500 rounded-2xl p-4 text-center">
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-bold text-emerald-300">إجابة صحيحة! 🎉</p>
              </motion.div>
            )}
            {feedback === 'no' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-center">
                <X className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="font-bold text-red-300">حاول مرة أخرى</p>
              </motion.div>
            )}
          </AnimatePresence>

          {showHint && (
            <div className="bg-white/5 rounded-2xl p-4">
              <p className="font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-300" /> الحل خطوة بخطوة:
              </p>
              <p className="text-sm text-white/70">
                استخدم طريقة الشبكة أو الخطوط لحساب {current.a} × {current.b}، ثم مثّل الناتج على السوروبان.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiplicationScreen;