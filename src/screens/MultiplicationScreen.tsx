import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Grid3X3, Eye, Play, Check, X, Lightbulb, RotateCcw } from 'lucide-react';
import { InteractiveSoroban } from '@/components/InteractiveSoroban';

// ============================================================
// الأنواع والثوابت
// ============================================================
type Stage = 1 | 2 | 3;

interface Problem {
  a: number;
  b: number;
}

const CANVAS_W = 600;
const CANVAS_H = 400;
const LINE_SPACING = 12;
const GROUP_GAP = 100;

const COLORS_A = ['#ef4444', '#3b82f6', '#f59e0b', '#ec4899'];
const COLORS_B = ['#10b981', '#8b5cf6', '#06b6d4', '#f97316'];
const DOT_COLOR = '#22c55e';

// ============================================================
// أنواع مساعدة
// ============================================================
interface LineA { c: number; color: string; digitIdx: number; }
interface LineB { d: number; color: string; digitIdx: number; }
interface Point { x: number; y: number; }
interface PointGroup {
  points: Point[];
  label: string;
  place: number;
  center: Point;
}

// ============================================================
// توليد الخطوط
// ============================================================
function generateLinesA(numStr: string): LineA[] {
  const result: LineA[] = [];
  const digits = numStr.split('').map(Number);
  let cursor = 100;
  digits.forEach((d, i) => {
    for (let k = 0; k < d; k++) {
      const xPos = cursor + k * LINE_SPACING;
      result.push({ c: -xPos, color: COLORS_A[i % COLORS_A.length], digitIdx: i });
    }
    cursor += d * LINE_SPACING + GROUP_GAP;
  });
  return result;
}

function generateLinesB(numStr: string): LineB[] {
  const result: LineB[] = [];
  const digits = numStr.split('').map(Number);
  let cursor = CANVAS_W - 100;
  digits.forEach((d, i) => {
    for (let k = 0; k < d; k++) {
      const xPos = cursor - k * LINE_SPACING;
      result.push({ d: xPos, color: COLORS_B[i % COLORS_B.length], digitIdx: i });
    }
    cursor -= d * LINE_SPACING + GROUP_GAP;
  });
  return result;
}

function lineASegment(c: number) {
  const W = CANVAS_W, H = CANVAS_H;
  let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
  if (-c >= 0 && -c <= W) { x1 = -c; y1 = 0; }
  else if (c >= 0 && c <= H) { x1 = 0; y1 = c; }
  else return null;
  if (H - c >= 0 && H - c <= W) { x2 = H - c; y2 = H; }
  else if (W + c >= 0 && W + c <= H) { x2 = W; y2 = W + c; }
  else return null;
  return { x1, y1, x2, y2 };
}

function lineBSegment(d: number) {
  const W = CANVAS_W, H = CANVAS_H;
  let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
  if (d >= 0 && d <= W) { x1 = d; y1 = 0; }
  else if (d >= 0 && d <= H) { x1 = 0; y1 = d; }
  else return null;
  if (d - H >= 0 && d - H <= W) { x2 = d - H; y2 = H; }
  else if (d - W >= 0 && d - W <= H) { x2 = W; y2 = d - W; }
  else return null;
  return { x1, y1, x2, y2 };
}

// ============================================================
// تجميع التقاطعات حسب المنزلة
// ============================================================
function computeGroups(
  linesA: LineA[],
  linesB: LineB[],
  numDigitsA: number,
  numDigitsB: number
): PointGroup[] {
  const maxPlace = (numDigitsA - 1) + (numDigitsB - 1);
  const groups: Point[][] = Array.from({ length: maxPlace + 1 }, () => []);

  for (const a of linesA) {
    const placeA = numDigitsA - 1 - a.digitIdx;
    for (const b of linesB) {
      const placeB = numDigitsB - 1 - b.digitIdx;
      const place = placeA + placeB;
      const y = (a.c + b.d) / 2;
      const x = (b.d - a.c) / 2;
      if (x >= 0 && x <= CANVAS_W && y >= 0 && y <= CANVAS_H) {
        groups[place].push({ x, y });
      }
    }
  }

  const labels = ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف'];

  return groups
    .map((pts, place) => ({
      points: pts,
      label: labels[place] || '',
      place,
      center: pts.length > 0
        ? {
            x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
            y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
          }
        : { x: 0, y: 0 },
    }))
    .filter((g) => g.points.length > 0);
}

// ============================================================
// مكوّن عرض طريقة الخطوط
// ============================================================
interface LineVizProps {
  a: number;
  b: number;
  showNumbers: boolean;
  animate?: boolean;
}

const LineMethodViz: React.FC<LineVizProps> = ({ a, b, showNumbers, animate = true }) => {
  const [step, setStep] = useState(animate ? 0 : 3);

  const aStr = String(a);
  const bStr = String(b);
  const digitsA = aStr.split('').map(Number);
  const digitsB = bStr.split('').map(Number);

  const linesA = useMemo(() => generateLinesA(aStr), [aStr]);
  const linesB = useMemo(() => generateLinesB(bStr), [bStr]);
  const groups = useMemo(
    () => computeGroups(linesA, linesB, digitsA.length, digitsB.length),
    [linesA, linesB, digitsA.length, digitsB.length]
  );

  useEffect(() => {
    if (!animate) {
      setStep(3);
      return;
    }
    setStep(0);
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [a, b, animate]);

  return (
    <div className="w-full">
      <div className="bg-slate-800 rounded-2xl p-2 sm:p-3 overflow-hidden">
        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          className="w-full h-auto"
          style={{ maxHeight: 320 }}
        >
          <defs>
            <filter id="dotglow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* خطوط الرقم الأول (تنزل من أعلى اليسار لأسفل اليمين) */}
          {step >= 1 &&
            linesA.map((l, i) => {
              const s = lineASegment(l.c);
              if (!s) return null;
              return (
                <motion.line
                  key={`a-${i}`}
                  x1={s.x1}
                  y1={s.y1}
                  x2={s.x2}
                  y2={s.y2}
                  stroke={l.color}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                />
              );
            })}

          {/* خطوط الرقم الثاني (تنزل من أعلى اليمين لأسفل اليسار) */}
          {step >= 2 &&
            linesB.map((l, i) => {
              const s = lineBSegment(l.d);
              if (!s) return null;
              return (
                <motion.line
                  key={`b-${i}`}
                  x1={s.x1}
                  y1={s.y1}
                  x2={s.x2}
                  y2={s.y2}
                  stroke={l.color}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                />
              );
            })}

          {/* نقاط التقاطع الخضراء */}
          {step >= 3 &&
            groups.flatMap((g, gi) =>
              g.points.map((p, pi) => (
                <motion.circle
                  key={`p-${gi}-${pi}`}
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill={DOT_COLOR}
                  stroke="#ffffff"
                  strokeWidth={1}
                  filter="url(#dotglow)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: pi * 0.005 }}
                />
              ))
            )}

          {/* أرقام/عناوين المجموعات */}
          {step >= 3 &&
            groups.map((g, gi) => {
              const minY = Math.min(...g.points.map((p) => p.y));
              const maxY = Math.max(...g.points.map((p) => p.y));
              const labelX = g.center.x;
              const numberY = Math.max(minY - 30, 25);
              const labelY = Math.min(maxY + 30, CANVAS_H - 15);

              return (
                <motion.g
                  key={`lbl-${gi}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.15 }}
                >
                  {showNumbers && (
                    <>
                      <circle
                        cx={labelX}
                        cy={numberY}
                        r={20}
                        fill="#fbbf24"
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                      <text
                        x={labelX}
                        y={numberY + 6}
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="bold"
                        fill="#1e293b"
                      >
                        {g.points.length}
                      </text>
                    </>
                  )}
                  <text
                    x={labelX}
                    y={showNumbers ? labelY + 20 : numberY}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="bold"
                    fill="#fbbf24"
                  >
                    {g.label}
                  </text>
                </motion.g>
              );
            })}
        </svg>
      </div>
    </div>
  );
};

// ============================================================
// مكوّن عرض الشبكة (Lattice)
// ============================================================
interface LatticeProps {
  a: number;
  b: number;
  animate?: boolean;
}

const LatticeViz: React.FC<LatticeProps> = ({ a, b, animate = true }) => {
  const [step, setStep] = useState(animate ? 0 : 3);

  const aStr = String(a);
  const bStr = String(b);
  const aLen = aStr.length;
  const bLen = bStr.length;
  const numDiags = aLen + bLen - 1;

  const cells: Array<{ i: number; j: number; val: number; tens: number; ones: number }> = [];
  for (let i = 0; i < aLen; i++) {
    for (let j = 0; j < bLen; j++) {
      const val = Number(aStr[i]) * Number(bStr[j]);
      cells.push({ i, j, val, tens: Math.floor(val / 10), ones: val % 10 });
    }
  }

  const diagonalResults = useMemo(() => {
    const diags: Array<{ digit: number; displayOrder: number }> = [];
    let carry = 0;
    for (let d = 0; d < numDiags; d++) {
      let sum = carry;
      for (const cell of cells) {
        const cellDiag = (aLen - 1 - cell.i) + (bLen - 1 - cell.j);
        if (cellDiag === d) sum += cell.ones;
        if (cellDiag === d - 1) sum += cell.tens;
      }
      const digit = sum % 10;
      carry = Math.floor(sum / 10);
      diags.push({ digit, displayOrder: d });
    }
    while (carry > 0) {
      diags.push({ digit: carry % 10, displayOrder: diags.length });
      carry = Math.floor(carry / 10);
    }
    return diags;
  }, [a, b, aLen, bLen, numDiags, cells]);

  useEffect(() => {
    if (!animate) {
      setStep(3);
      return;
    }
    setStep(0);
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [a, b, animate]);

  const cellSize = Math.min(70, 240 / Math.max(aLen, bLen));

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-2xl p-3 inline-block" dir="ltr">
        {/* رأس الجدول (أرقام b) */}
        <div className="flex" style={{ paddingLeft: 40 }}>
          {bStr.split('').map((d, j) => (
            <div
              key={j}
              className="text-center font-bold text-purple-700"
              style={{ width: cellSize }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* الصفوف */}
        {aStr.split('').map((aDigit, i) => (
          <div key={i} className="flex items-center">
            <div
              className="font-bold text-purple-700 text-center"
              style={{ width: 40 }}
            >
              {aDigit}
            </div>
            {bStr.split('').map((_, j) => {
              const cell = cells.find((c) => c.i === i && c.j === j)!;
              const cellDiag = (aLen - 1 - i) + (bLen - 1 - j);
              const show = step >= 1;
              return (
                <div
                  key={j}
                  className="border border-purple-300 relative bg-purple-50"
                  style={{ width: cellSize, height: cellSize }}
                >
                  {show && (
                    <div className="absolute inset-0 flex flex-col">
                      <div className="flex-1 flex items-center justify-center text-blue-600 font-bold text-base">
                        {cell.tens}
                      </div>
                      <div className="flex-1 flex items-center justify-center text-red-600 font-bold text-base border-t border-purple-300">
                        {cell.ones}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* صف النتيجة */}
        {step >= 2 && (
          <div className="mt-3 flex justify-center gap-1" dir="ltr">
            {diagonalResults
              .slice()
              .reverse()
              .map((d, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12 }}
                  className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg"
                >
                  {d.digit}
                </motion.div>
              ))}
          </div>
        )}

        {/* النتيجة النهائية */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center"
          >
            <span className="text-sm text-gray-600">الناتج: </span>
            <span className="text-2xl font-black text-emerald-600">{a * b}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// بيانات المراحل
// ============================================================
interface StageData {
  id: Stage;
  label: string;
  watchExamples: { lattice: Problem; lines: Problem };
  tryProblems: Problem[];
}

const STAGE_DATA: Record<Stage, StageData> = {
  1: {
    id: 1,
    label: 'منزلتين × منزلة',
    watchExamples: {
      lattice: { a: 62, b: 8 },
      lines: { a: 44, b: 6 },
    },
    tryProblems: [
      { a: 62, b: 8 },   // شبكة
      { a: 32, b: 4 },
      { a: 23, b: 6 },
      { a: 41, b: 5 },
      { a: 14, b: 7 },
    ],
  },
  2: {
    id: 2,
    label: '٣ منازل × منزلة',
    watchExamples: {
      lattice: { a: 312, b: 3 },
      lines: { a: 321, b: 3 },
    },
    tryProblems: [
      { a: 312, b: 3 },  // شبكة
      { a: 213, b: 4 },
      { a: 123, b: 5 },
      { a: 421, b: 2 },
      { a: 132, b: 6 },
    ],
  },
  3: {
    id: 3,
    label: 'منزلتين × منزلتين',
    watchExamples: {
      lattice: { a: 32, b: 12 },
      lines: { a: 14, b: 23 },
    },
    tryProblems: [
      { a: 32, b: 12 },  // شبكة
      { a: 13, b: 21 },
      { a: 21, b: 13 },
      { a: 14, b: 22 },
      { a: 12, b: 32 },
    ],
  },
};

// ============================================================
// دوال مساعدة
// ============================================================
function getColumnsForValue(value: number): number {
  if (value < 10) return 1;
  if (value < 100) return 2;
  if (value < 1000) return 3;
  return 4;
}

// ============================================================
// الشاشة الرئيسية
// ============================================================
interface Props {
  onBack: () => void;
  onComplete?: (stars: number) => void;
}

const MultiplicationScreen: React.FC<Props> = ({ onBack, onComplete }) => {
  const [stage, setStage] = useState<Stage>(1);
  const [mode, setMode] = useState<'watch' | 'try'>('watch');
  const [watchIdx, setWatchIdx] = useState<0 | 1>(0); // 0 = lattice, 1 = lines
  const [tryIdx, setTryIdx] = useState(0);
  const [abacusValue, setAbacusValue] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'no' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  const stageData = STAGE_DATA[stage];
  const watchExample =
    watchIdx === 0 ? stageData.watchExamples.lattice : stageData.watchExamples.lines;
  const currentProblem = stageData.tryProblems[tryIdx];
  const isTryLattice = tryIdx === 0;

  // إعادة تعيين عند تغيير المرحلة
  const changeStage = (s: Stage) => {
    setStage(s);
    setTryIdx(0);
    setWatchIdx(0);
    setAbacusValue(0);
    setFeedback(null);
    setAttempts(0);
    setScore(0);
  };

  // إعادة تعيين عند تغيير الوضع
  const changeMode = (m: 'watch' | 'try') => {
    setMode(m);
    setTryIdx(0);
    setWatchIdx(0);
    setAbacusValue(0);
    setFeedback(null);
    setAttempts(0);
    setScore(0);
  };

  // التحقق من الإجابة
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

  // مسح المعداد
  const handleClear = () => {
    setAbacusValue(0);
  };

  // الانتقال للسؤال التالي
  const handleNext = () => {
    if (tryIdx + 1 < stageData.tryProblems.length) {
      setTryIdx(tryIdx + 1);
      setAbacusValue(0);
      setFeedback(null);
      setAttempts(0);
    }
  };

  const columns = currentProblem
    ? getColumnsForValue(currentProblem.a * currentProblem.b)
    : 3;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-4 pb-24"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
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

      {/* ======================= Watch Mode ======================= */}
      {mode === 'watch' && (
        <div className="space-y-4">
          {/* Sub-selector: Lattice or Lines */}
          <div className="flex gap-2 bg-white/5 p-1 rounded-2xl">
            <button
              onClick={() => setWatchIdx(0)}
              className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${
                watchIdx === 0 ? 'bg-amber-500 text-black' : 'text-white/60'
              }`}
            >
              مثال شبكة (Lattice)
            </button>
            <button
              onClick={() => setWatchIdx(1)}
              className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${
                watchIdx === 1 ? 'bg-emerald-500 text-black' : 'text-white/60'
              }`}
            >
              مثال خطوط
            </button>
          </div>

          {/* عنوان المثال */}
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <p className="text-xs text-white/60 mb-2">
              {watchIdx === 0 ? 'المثال الأول: طريقة الشبكة' : 'المثال الثاني: طريقة الخطوط'}
            </p>
            <p className="text-3xl font-black font-display text-white" dir="ltr">
              <span className="text-amber-300">{watchExample.a}</span>
              <span className="text-white/60 mx-3">×</span>
              <span className="text-emerald-300">{watchExample.b}</span>
              <span className="text-white/60 mx-3">=</span>
              <span className="text-purple-300">
                {watchExample.a * watchExample.b}
              </span>
            </p>
          </div>

          {/* الرسم */}
          <div className="bg-white/5 rounded-2xl p-3">
            {watchIdx === 0 ? (
              <LatticeViz a={watchExample.a} b={watchExample.b} animate key={`wl-${stage}`} />
            ) : (
              <LineMethodViz
                a={watchExample.a}
                b={watchExample.b}
                showNumbers
                animate
                key={`wln-${stage}`}
              />
            )}
          </div>

          {/* قاعدة الحمل */}
          <div className="bg-amber-500/20 border border-amber-500/40 rounded-2xl p-4 text-sm">
            <p className="font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-300" /> قاعدة الحمل:
            </p>
            <p className="text-white/80 leading-relaxed">
              إذا تجاوز مجموع النقاط في أي مجموعة الرقم 9 → نحتفظ بالآحاد ونحمل العشرات للمنزلة التالية (يسارًا).
            </p>
          </div>
        </div>
      )}

      {/* ======================= Try Mode ======================= */}
      {mode === 'try' && currentProblem && (
        <div className="space-y-4">
          {/* Progress */}
          <div className="text-center">
            <span className="text-sm text-white/60">
              السؤال {tryIdx + 1} من {stageData.tryProblems.length} — النقاط: {score}
            </span>
          </div>

          {/* Problem */}
          <div className="bg-white/5 rounded-3xl p-5 text-center">
            <p className="text-xs text-white/50 mb-2">
              {isTryLattice ? '🟨 طريقة الشبكة' : '🟩 طريقة الخطوط'}
            </p>
            <div className="text-4xl font-bold" dir="ltr">
              <span className="text-amber-300">{currentProblem.a}</span>
              <span className="text-white/60 mx-3">×</span>
              <span className="text-emerald-300">{currentProblem.b}</span>
              <span className="text-white/60 mx-3">=</span>
              <span className="text-purple-300">؟</span>
            </div>
          </div>

          {/* Viz */}
          <div className="bg-white/5 rounded-2xl p-3">
            {isTryLattice ? (
              <LatticeViz a={currentProblem.a} b={currentProblem.b} animate={false} key={`tl-${stage}-${tryIdx}`} />
            ) : (
              <LineMethodViz
                a={currentProblem.a}
                b={currentProblem.b}
                showNumbers={false}
                animate={false}
                key={`tln-${stage}-${tryIdx}`}
              />
            )}
          </div>

          {/* Hint text for lines mode */}
          {!isTryLattice && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-3 text-xs text-center">
              <p className="text-emerald-200">
                💡 عُدّ النقاط الخضراء في كل مجموعة، ثم أدخل الإجابة على المعداد.
              </p>
            </div>
          )}

          {/* Soroban for answer */}
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

          {/* Current value display */}
          <div className="text-center">
            <span className="text-sm text-white/60">القيمة الحالية: </span>
            <span className="text-2xl font-bold text-amber-300">{abacusValue}</span>
          </div>

          {/* Buttons */}
          {!feedback && (
            <div className="flex gap-2">
              <button
                onClick={handleClear}
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

          {/* Feedback */}
          <AnimatePresence>
            {feedback === 'ok' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-500/20 border border-emerald-500 rounded-2xl p-4 text-center"
              >
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-bold text-emerald-300">إجابة صحيحة! 🎉</p>
                <p className="text-xs text-white/60 mt-1">
                  {tryIdx + 1 < stageData.tryProblems.length ? 'جاري الانتقال...' : 'انتهت المرحلة!'}
                </p>
              </motion.div>
            )}
            {feedback === 'no' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-center"
              >
                <X className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="font-bold text-red-300">حاول مرة أخرى</p>
                <p className="text-xs text-white/60 mt-1">
                  عدد المحاولات: {attempts}
                </p>
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

          {/* Skip button */}
          {!feedback && (
            <button
              onClick={handleNext}
              disabled={tryIdx + 1 >= stageData.tryProblems.length}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 text-xs disabled:opacity-30"
            >
              تخطي
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiplicationScreen;