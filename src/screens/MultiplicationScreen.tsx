import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Grid3X3, Eye, Play, Check, X, Lightbulb, RotateCcw } from 'lucide-react';

// =====================================================================
// الأنواع
// =====================================================================
type Stage = 1 | 2 | 3;

interface Problem {
  a: number;
  b: number;
  r: number;
}

interface Point {
  x: number;
  y: number;
}

interface SvgLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface IntersectionGroup {
  points: Point[];
  value: number;
  place: number; // 1=units, 10=tens, 100=hundreds, 1000=thousands
  label: string;
}

// =====================================================================
// توليد المسائل حسب المراحل
// =====================================================================
const generateProblems = (stage: Stage): Problem[] => {
  const problems: Problem[] = [];
  if (stage === 1) {
    // منزلتين × منزلة
    const bases = [12, 21, 23, 32, 31, 42, 13, 41, 24, 34, 43, 52, 15, 51, 62];
    for (const a of bases) {
      for (let b = 2; b <= 8; b += 2) {
        problems.push({ a, b, r: a * b });
      }
    }
  } else if (stage === 2) {
    // 3 منازل × منزلة
    const bases = [123, 213, 312, 231, 132, 321, 214, 412, 314, 413, 234, 432];
    for (const a of bases) {
      for (let b = 2; b <= 8; b += 2) {
        problems.push({ a, b, r: a * b });
      }
    }
  } else {
    // منزلتين × منزلتين
    const pairs: [number, number][] = [
      [12, 21], [13, 21], [21, 13], [23, 12], [31, 12], [14, 22],
      [22, 13], [32, 12], [24, 11], [41, 12], [15, 21], [33, 12],
    ];
    for (const [a, b] of pairs) {
      problems.push({ a, b, r: a * b });
    }
  }
  return problems.sort(() => Math.random() - 0.5).slice(0, 8);
};

// =====================================================================
// حسابات الخطوط القطرية
// =====================================================================
const CANVAS_W = 600;
const CANVAS_H = 400;
const INNER_SPACING = 10; // المسافة بين الخطوط داخل نفس المجموعة
const GROUP_GAP = 90; // المسافة بين المجموعات (الفصل بين المنازل)

interface LineGroupInfo {
  digit: number;
  digitIndex: number; // 0 = العشرات/المئات (يسار), الباقي = الآحاد (يمين)
  lineOffsets: number[]; // قيم الإزاحة الأفقية
  color: string;
}

function buildLineGroups(numStr: string, colors: string[]): LineGroupInfo[] {
  const digits = numStr.split('').map(Number);
  const groups: LineGroupInfo[] = [];
  let cursor = 60;
  digits.forEach((d, gi) => {
    const offsets: number[] = [];
    for (let k = 0; k < d; k++) {
      offsets.push(cursor);
      cursor += INNER_SPACING;
    }
    groups.push({
      digit: d,
      digitIndex: gi,
      lineOffsets: offsets,
      color: colors[gi % colors.length],
    });
    cursor += GROUP_GAP;
  });
  return groups;
}

function buildLines(
  groups: LineGroupInfo[],
  direction: 'down-right' | 'up-right'
): SvgLine[] {
  const lines: SvgLine[] = [];
  for (const g of groups) {
    for (const off of g.lineOffsets) {
      if (direction === 'down-right') {
        lines.push({
          x1: off - 100,
          y1: -50,
          x2: off + 500,
          y2: 450,
        });
      } else {
        lines.push({
          x1: off - 100,
          y1: 450,
          x2: off + 500,
          y2: -50,
        });
      }
    }
  }
  return lines;
}

function intersectLines(l1: SvgLine, l2: SvgLine): Point | null {
  const { x1: x1a, y1: y1a, x2: x2a, y2: y2a } = l1;
  const { x1: x1b, y1: y1b, x2: x2b, y2: y2b } = l2;
  const denom = (x1a - x2a) * (y1b - y2b) - (y1a - y2a) * (x1b - x2b);
  if (Math.abs(denom) < 0.0001) return null;
  const t = ((x1a - x1b) * (y1b - y2b) - (y1a - y1b) * (x1b - x2b)) / denom;
  const x = x1a + t * (x2a - x1a);
  const y = y1a + t * (y2a - y1a);
  if (x < 0 || x > CANVAS_W || y < 0 || y > CANVAS_H) return null;
  return { x, y };
}

function groupIntersections(points: Point[]): IntersectionGroup[] {
  if (points.length === 0) return [];
  // رتّب حسب x
  const sorted = [...points].sort((p, q) => p.x - q.x);
  // جمّع النقاط المتقاربة (فارق x أقل من 40)
  const clusters: Point[][] = [];
  let current: Point[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].x - current[current.length - 1].x < 45) {
      current.push(sorted[i]);
    } else {
      clusters.push(current);
      current = [sorted[i]];
    }
  }
  clusters.push(current);

  // من اليمين لليسار: آحاد، عشرات، مئات، آلاف
  const reversed = [...clusters].reverse();
  const placeValues = [1, 10, 100, 1000, 10000];
  const labels = ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف'];

  return reversed.map((cluster, idx) => ({
    points: cluster,
    value: cluster.length,
    place: placeValues[idx] || 1,
    label: labels[idx] || '',
  }));
}

// =====================================================================
// مكوّن عرض طريقة الخطوط التفاعلية
// =====================================================================
interface LineMethodVizProps {
  a: number;
  b: number;
  autoPlay?: boolean;
}

const LineMethodViz: React.FC<LineMethodVizProps> = ({ a, b, autoPlay = true }) => {
  const [step, setStep] = useState(0);

  const aStr = String(a);
  const bStr = String(b);

  const aColors = ['#ef4444', '#3b82f6', '#f59e0b'];
  const bColors = ['#10b981', '#8b5cf6', '#ec4899'];

  // مجموعات الخطوط
  const aGroups = useMemo(() => buildLineGroups(aStr, aColors), [aStr]);
  const bGroups = useMemo(() => buildLineGroups(bStr, bColors), [bStr]);

  // الخطوط الفعلية
  const aLines = useMemo(() => buildLines(aGroups, 'down-right'), [aGroups]);
  const bLines = useMemo(() => buildLines(bGroups, 'up-right'), [bGroups]);

  // نقاط التقاطع
  const points = useMemo(() => {
    const res: Point[] = [];
    for (const al of aLines) {
      for (const bl of bLines) {
        const p = intersectLines(al, bl);
        if (p) res.push(p);
      }
    }
    return res;
  }, [aLines, bLines]);

  // تجميع النقاط
  const groups = useMemo(() => groupIntersections(points), [points]);

  // إعادة التشغيل عند تغيير المسألة
  useEffect(() => {
    setStep(0);
    if (!autoPlay) {
      setStep(5);
      return;
    }
    const timer = setInterval(() => {
      setStep((s) => {
        if (s >= 5) {
          clearInterval(timer);
          return s;
        }
        return s + 1;
      });
    }, 1100);
    return () => clearInterval(timer);
  }, [a, b, autoPlay]);

  // حساب النتيجة النهائية مع الحمل
  const finalDigits = useMemo(() => {
    let carry = 0;
    const result: number[] = [];
    for (const g of groups) {
      const total = g.value + carry;
      result.unshift(total % 10);
      carry = Math.floor(total / 10);
    }
    while (carry > 0) {
      result.unshift(carry % 10);
      carry = Math.floor(carry / 10);
    }
    return result;
  }, [groups]);

  return (
    <div className="w-full">
      <div className="bg-slate-800 rounded-2xl p-2 sm:p-3">
        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          className="w-full h-auto"
          style={{ maxHeight: '320px' }}
        >
          {/* الخطوة 1: خطوط الرقم الأول */}
          {step >= 1 && (
            <g>
              {aLines.map((l, i) => (
                <motion.line
                  key={`a-${i}`}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke={
                    aColors[
                      Math.min(
                        aGroups.findIndex((g) => g.lineOffsets.some((o) => o === i % 100 || true)) ||
                          0,
                        aColors.length - 1
                      )
                    ] || '#ef4444'
                  }
                  strokeWidth={3}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  style={{
                    stroke: (() => {
                      // اختيار لون حسب المجموعة
                      let idx = 0;
                      let count = 0;
                      for (const g of aGroups) {
                        for (const _ of g.lineOffsets) {
                          if (count === i) return aColors[idx % aColors.length];
                          count++;
                        }
                        idx++;
                      }
                      return aColors[0];
                    })(),
                  }}
                />
              ))}
            </g>
          )}

          {/* الخطوة 2: خطوط الرقم الثاني */}
          {step >= 2 && (
            <g>
              {bLines.map((l, i) => (
                <motion.line
                  key={`b-${i}`}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  strokeWidth={3}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  style={{
                    stroke: (() => {
                      let idx = 0;
                      let count = 0;
                      for (const g of bGroups) {
                        for (const _ of g.lineOffsets) {
                          if (count === i) return bColors[idx % bColors.length];
                          count++;
                        }
                        idx++;
                      }
                      return bColors[0];
                    })(),
                  }}
                />
              ))}
            </g>
          )}

          {/* الخطوة 3: نقاط التقاطع */}
          {step >= 3 && (
            <g>
              {points.map((p, i) => (
                <motion.circle
                  key={`p-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={6}
                  fill="#ef4444"
                  stroke="#fff"
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                />
              ))}
            </g>
          )}

          {/* الخطوة 4: أرقام المجموعات */}
          {step >= 4 &&
            groups.map((g, gi) => {
              const cx = g.points.reduce((s, p) => s + p.x, 0) / g.points.length;
              const cy = g.points.reduce((s, p) => s + p.y, 0) / g.points.length;
              return (
                <motion.g
                  key={`g-${gi}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: gi * 0.15 }}
                >
                  <circle cx={cx} cy={cy - 30} r={18} fill="#fbbf24" stroke="#fff" strokeWidth={2} />
                  <text
                    x={cx}
                    y={cy - 24}
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill="#1e293b"
                  >
                    {g.value}
                  </text>
                  <text
                    x={cx}
                    y={cy + 60}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#cbd5e1"
                  >
                    {g.label}
                  </text>
                </motion.g>
              );
            })}
        </svg>
      </div>

      {/* الخطوة 5: النتيجة النهائية */}
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-2xl bg-gradient-to-l from-emerald-500/20 to-emerald-700/20 border border-emerald-400/40 text-center"
        >
          <p className="text-sm text-white/70 font-body mb-1">النتيجة النهائية:</p>
          <p className="text-3xl font-black font-display text-emerald-300" dir="ltr">
            {a} × {b} = {a * b}
          </p>
        </motion.div>
      )}

      {/* شرح الخطوة الحالية */}
      <div className="mt-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
        <p className="text-sm text-white/80 font-body">
          {step === 0 && '👀 استعد لمشاهدة الطريقة...'}
          {step === 1 && `✏️ خطوط الرقم ${a} (${aStr.split('').join(' + ')} خط)`}
          {step === 2 && `✏️ خطوط الرقم ${b} (${bStr.split('').join(' + ')} خط)`}
          {step === 3 && '🔴 تظهر نقاط التقاطع...'}
          {step === 4 && '🎯 نجمّع النقاط: آحاد ← عشرات ← مئات'}
          {step === 5 && `🎉 الناتج = ${a * b}`}
        </p>
      </div>
    </div>
  );
};

// =====================================================================
// مكوّن عرض الشبكة (Lattice)
// =====================================================================
const LatticeViz: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const [step, setStep] = useState(0);
  const aStr = String(a);
  const bStr = String(b);

  useEffect(() => {
    setStep(0);
    const timer = setInterval(() => {
      setStep((s) => (s >= 4 ? s : s + 1));
    }, 1300);
    return () => clearInterval(timer);
  }, [a, b]);

  const cells: Array<{ i: number; j: number; val: number; tens: number; ones: number }> = [];
  for (let i = 0; i < aStr.length; i++) {
    for (let j = 0; j < bStr.length; j++) {
      const val = Number(aStr[i]) * Number(bStr[j]);
      cells.push({ i, j, val, tens: Math.floor(val / 10), ones: val % 10 });
    }
  }

  // أقطار الشبكة
  const diagonals: Array<{ cells: typeof cells; sum: number }> = [];
  const n = aStr.length + bStr.length - 1;
  for (let d = 0; d < n; d++) {
    const diagCells = cells.filter((c) => c.i + (bStr.length - 1 - c.j) === d);
    if (diagCells.length > 0) {
      const sum = diagCells.reduce((s, c) => s + (c.i === 0 || c.j === bStr.length - 1 ? c.ones : c.ones) + (c.i > 0 || c.j < bStr.length - 1 ? 0 : 0), 0);
      // حساب مجموع القطر بشكل صحيح:
      // كل خلية تساهم بالعشرات أو الآحاد حسب موضع الخلية في القطر
      diagonals.push({ cells: diagCells, sum });
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-3 inline-block w-full" dir="ltr">
        <div className="flex justify-center">
          <div>
            <div className="flex" style={{ paddingRight: 40 }}>
              {bStr.split('').map((d, j) => (
                <div key={j} className="w-16 text-center font-bold text-purple-700 text-lg">{d}</div>
              ))}
            </div>
            {aStr.split('').map((aDigit, i) => (
              <div key={i} className="flex items-center">
                <div className="w-10 text-center font-bold text-purple-700 text-lg">{aDigit}</div>
                <div className="flex">
                  {bStr.split('').map((_, j) => {
                    const cell = cells.find((c) => c.i === i && c.j === j)!;
                    return (
                      <div key={j} className="w-16 h-16 border-2 border-purple-300 relative bg-purple-50">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex-1 flex items-center justify-center text-blue-600 font-bold text-lg">
                            {cell.tens}
                          </div>
                          <div className="flex-1 flex items-center justify-center text-red-600 font-bold text-lg border-t-2 border-purple-300">
                            {cell.ones}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
        <p className="text-sm text-white/80 font-body">
          {step === 0 && '📋 نضرب كل رقم في الخلايا...'}
          {step >= 1 && '🔢 نبدأ بجمع الأقطار من اليمين لليسار'}
          {step >= 2 && '💡 عند تجاوز 9 → نحمل الرقم للمنزلة التالية'}
          {step >= 3 && `🎯 النتيجة: ${a * b}`}
        </p>
      </div>

      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-2xl bg-gradient-to-l from-emerald-500/20 to-emerald-700/20 border border-emerald-400/40 text-center"
        >
          <p className="text-sm text-white/70 font-body mb-1">النتيجة النهائية:</p>
          <p className="text-3xl font-black font-display text-emerald-300" dir="ltr">
            {a} × {b} = {a * b}
          </p>
        </motion.div>
      )}
    </div>
  );
};

// =====================================================================
// الشاشة الرئيسية
// =====================================================================
interface Props {
  onBack: () => void;
  onComplete?: (stars: number) => void;
}

const MultiplicationScreen: React.FC<Props> = ({ onBack, onComplete }) => {
  const [stage, setStage] = useState<Stage>(1);
  const [mode, setMode] = useState<'watch' | 'try'>('watch');
  const [watchIndex, setWatchIndex] = useState(0);
  const [problems, setProblems] = useState<Problem[]>(() => generateProblems(1));
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'ok' | 'no' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const current = problems[idx];

  // مسائل وضع الشاهد
  const watchExamples: Problem[] = useMemo(() => {
    if (stage === 1) return [{ a: 62, b: 8, r: 496 }, { a: 32, b: 4, r: 128 }, { a: 21, b: 6, r: 126 }];
    if (stage === 2) return [{ a: 312, b: 3, r: 936 }, { a: 213, b: 4, r: 852 }, { a: 123, b: 7, r: 861 }];
    return [{ a: 13, b: 21, r: 273 }, { a: 32, b: 12, r: 384 }, { a: 14, b: 23, r: 322 }];
  }, [stage]);

  const watchCurrent = watchExamples[watchIndex];

  const changeStage = (s: Stage) => {
    setStage(s);
    setProblems(generateProblems(s));
    setIdx(0);
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
    setScore(0);
    setWatchIndex(0);
  };

  const handleSubmit = () => {
    if (!current) return;
    if (Number(answer) === current.r) {
      setFeedback('ok');
      setScore((s) => s + 1);
      setTimeout(() => {
        if (idx + 1 >= problems.length) {
          if (onComplete) onComplete(Math.max(1, Math.round(((score + 1) / problems.length) * 3)));
        } else {
          setIdx(idx + 1);
          setAnswer('');
          setFeedback(null);
          setShowHint(false);
        }
      }, 1200);
    } else {
      setFeedback('no');
      setShowHint(true);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

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
        {[
          { id: 1 as Stage, label: 'منزلتين × منزلة' },
          { id: 2 as Stage, label: '٣ منازل × منزلة' },
          { id: 3 as Stage, label: 'منزلتين × منزلتين' },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => changeStage(s.id)}
            className={`px-3 py-2 rounded-xl whitespace-nowrap font-bold text-xs sm:text-sm transition ${
              stage === s.id ? 'bg-purple-600 shadow-lg' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-2xl">
        <button
          onClick={() => setMode('watch')}
          className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            mode === 'watch' ? 'bg-purple-600' : 'text-white/60'
          }`}
        >
          <Eye className="w-5 h-5" /> شاهد
        </button>
        <button
          onClick={() => setMode('try')}
          className={`flex-1 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            mode === 'try' ? 'bg-purple-600' : 'text-white/60'
          }`}
        >
          <Play className="w-5 h-5" /> جرّب
        </button>
      </div>

      {/* ============ Watch Mode ============ */}
      {mode === 'watch' && watchCurrent && (
        <div className="space-y-4">
          {/* المعادلة */}
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <p className="text-sm text-white/60 mb-2">مثال {watchIndex + 1} من {watchExamples.length}</p>
            <p className="text-3xl font-black font-display text-white" dir="ltr">
              <span className="text-amber-300">{watchCurrent.a}</span>
              <span className="text-white/60 mx-3">×</span>
              <span className="text-emerald-300">{watchCurrent.b}</span>
              <span className="text-white/60 mx-3">=</span>
              <span className="text-purple-300">؟</span>
            </p>
          </div>

          {/* طريقة الخطوط */}
          <div className="bg-white/5 rounded-2xl p-3">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
              <span className="bg-emerald-500 text-black rounded-lg px-2 py-1 text-xs">طريقة الخطوط القطرية</span>
            </h3>
            <LineMethodViz a={watchCurrent.a} b={watchCurrent.b} autoPlay key={`${stage}-${watchIndex}`} />
          </div>

          {/* طريقة الشبكة (فقط في المرحلة 3) */}
          {stage === 3 && (
            <div className="bg-white/5 rounded-2xl p-3">
              <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                <span className="bg-amber-500 text-black rounded-lg px-2 py-1 text-xs">طريقة الشبكة (Lattice)</span>
              </h3>
              <LatticeViz a={watchCurrent.a} b={watchCurrent.b} />
            </div>
          )}

          {/* أزرار التنقل بين الأمثلة */}
          <div className="flex gap-2">
            <button
              onClick={() => setWatchIndex((i) => Math.max(0, i - 1))}
              disabled={watchIndex === 0}
              className="flex-1 py-3 rounded-xl bg-white/10 font-bold disabled:opacity-30"
            >
              السابق
            </button>
            <button
              onClick={() => setWatchIndex((i) => Math.min(watchExamples.length - 1, i + 1))}
              disabled={watchIndex >= watchExamples.length - 1}
              className="flex-1 py-3 rounded-xl bg-purple-600 font-bold disabled:opacity-30"
            >
              التالي
            </button>
          </div>

          {/* قاعدة الحمل */}
          <div className="bg-amber-500/20 border border-amber-500/40 rounded-2xl p-4 text-sm">
            <p className="font-bold mb-2">💡 قاعدة الحمل:</p>
            <p className="text-white/80">
              إذا تجاوز مجموع النقاط في أي مجموعة الرقم 9 → نحتفظ بالآحاد ونحمل العشرات للمنزلة التالية (يسارًا).
            </p>
          </div>
        </div>
      )}

      {/* ============ Try Mode ============ */}
      {mode === 'try' && current && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-white/60">السؤال {idx + 1} من {problems.length} — النقاط: {score}</span>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="اكتب الإجابة"
              className="w-full max-w-xs mx-auto block bg-slate-800 border-2 border-purple-500/50 rounded-2xl px-4 py-3 text-center text-2xl font-bold text-white outline-none focus:border-amber-400"
              dir="ltr"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-8 py-3 bg-gradient-to-l from-purple-600 to-amber-500 rounded-2xl font-bold flex items-center gap-2 mx-auto"
            >
              <Check className="w-5 h-5" /> تحقق
            </button>
          </div>

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
              </motion.div>
            )}
          </AnimatePresence>

          {/* تلميح مرئي */}
          {showHint && (
            <div className="bg-white/5 rounded-2xl p-3">
              <p className="font-bold mb-3 flex items-center gap-2 text-sm">
                <Lightbulb className="w-5 h-5 text-amber-300" /> الحل خطوة بخطوة:
              </p>
              <LineMethodViz a={current.a} b={current.b} autoPlay={false} key={`hint-${idx}`} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiplicationScreen;