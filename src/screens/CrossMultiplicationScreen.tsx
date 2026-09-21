import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Eye, Play, Check, X, Timer, Trophy, Volume2, Square } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

// ===== الأنواع =====
type CaseType = '2x2' | '3x2' | '4x2' | '5x2' | '3x3';

interface Question { a: number; b: number; answer: number; caseType: CaseType; timeLimit: number; }

// ===== النص الصوتي (قصة الدرس) =====
const LESSON_STORY =
  'قبل مئات السنين، اخترع علماء الرياضيات في الهند طريقة سحرية للضرب. سموها الضرب التقاطعي، لأنها تضرب الأرقام بشكل متقاطع كأنها ترقص معاً! تخيّل أن كل رقم يحمل يداً تصافح يد الرقم الآخر. هذه الطريقة تجعل الضرب الكبير يبدو كقصة ممتعة. هيا لنتعلم سرّها!';

const CASE_LABELS: Record<CaseType, string> = {
  '2x2': 'منزلتين × منزلتين',
  '3x2': '٣ منازل × منزلتين',
  '4x2': '٤ منازل × منزلتين',
  '5x2': '٥ منازل × منزلتين',
  '3x3': '٣ منازل × ٣ منازل',
};

const CASE_COLORS: Record<CaseType, string> = {
  '2x2': 'from-blue-500 to-indigo-700',
  '3x2': 'from-emerald-500 to-teal-700',
  '4x2': 'from-amber-500 to-orange-700',
  '5x2': 'from-pink-500 to-rose-700',
  '3x3': 'from-purple-500 to-violet-700',
};

// ===== حساب مراحل الضرب التقاطعي =====
function computeStages(a: number, b: number): { label: string; sum: number; carry: number }[] {
  const aD = String(a).split('').map(Number);
  const bD = String(b).split('').map(Number);
  const m = aD.length, n = bD.length;
  const totalStages = m + n - 1;
  const raw: { label: string; sum: number }[] = [];

  for (let k = 0; k < totalStages; k++) {
    const parts: string[] = [];
    let sum = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (i + j === (m - 1) + (n - 1) - k) {
          sum += aD[i] * bD[j];
          parts.push(`${aD[i]}×${bD[j]}`);
        }
      }
    }
    raw.push({ label: parts.join(' + '), sum });
  }

  let carry = 0;
  return raw.map(r => {
    const total = r.sum + carry;
    const newCarry = Math.floor(total / 10);
    const result = { label: r.label, sum: total, carry: newCarry };
    carry = newCarry;
    return result;
  });
}

// ===== أمثلة الشاهد لكل حالة =====
const EXAMPLES: Record<CaseType, { a: number; b: number }> = {
  '2x2': { a: 48, b: 68 },
  '3x2': { a: 748, b: 36 },
  '4x2': { a: 6934, b: 42 },
  '5x2': { a: 23742, b: 34 },
  '3x3': { a: 234, b: 567 },
};

// ===== توليد 15 سؤالاً =====
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function generateExam(): Question[] {
  const questions: Question[] = [];

  const pool22: [number,number][] = [[48,68],[23,41],[34,26],[57,63],[72,15],[13,21],[89,12],[64,27]];
  shuffle(pool22).slice(0,3).forEach(([a,b]) => questions.push({ a, b, answer: a*b, caseType:'2x2', timeLimit:40 }));

  const pool32: [number,number][] = [[748,36],[941,46],[324,57],[812,43],[567,28],[421,53]];
  shuffle(pool32).slice(0,3).forEach(([a,b]) => questions.push({ a, b, answer: a*b, caseType:'3x2', timeLimit:60 }));

  const pool42: [number,number][] = [[6934,42],[4327,54],[8746,34],[2378,51],[5641,32]];
  shuffle(pool42).slice(0,3).forEach(([a,b]) => questions.push({ a, b, answer: a*b, caseType:'4x2', timeLimit:60 }));

  const pool52: [number,number][] = [[23742,34],[43247,27],[12345,12],[54321,23]];
  shuffle(pool52).slice(0,3).forEach(([a,b]) => questions.push({ a, b, answer: a*b, caseType:'5x2', timeLimit:60 }));

  const pool33: [number,number][] = [[234,567],[947,243],[123,456],[345,678],[234,123]];
  shuffle(pool33).slice(0,3).forEach(([a,b]) => questions.push({ a, b, answer: a*b, caseType:'3x3', timeLimit:60 }));

  return shuffle(questions);
}

// ===== مكوّن عرض مراحل المثال =====
const StagesDisplay: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const stages = computeStages(a, b);
  return (
    <div className="bg-slate-800 rounded-2xl p-4 space-y-2">
      <div className="text-center mb-3">
        <p className="text-2xl font-black" dir="ltr">
          <span className="text-amber-300">{a}</span> × <span className="text-emerald-300">{b}</span>
        </p>
      </div>
      {stages.map((s, i) => (
        <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.15}}
          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-white/50">المرحلة {i+1}</p>
            <p className="text-sm font-bold text-blue-300" dir="ltr">{s.label}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{s.sum}</p>
            {s.carry > 0 && <p className="text-xs text-amber-400">حمل {s.carry}</p>}
          </div>
        </motion.div>
      ))}
      <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center">
        <p className="text-sm text-white/70">الناتج النهائي:</p>
        <p className="text-2xl font-black text-emerald-300" dir="ltr">{a * b}</p>
      </div>
    </div>
  );
};

// ===== الشاشة الرئيسية =====
interface Props {
  onBack: () => void;
  onComplete?: (stars: number) => void;
  onXP?: (amount: number) => void;
}

const CrossMultiplicationScreen: React.FC<Props> = ({ onBack, onComplete, onXP }) => {
  const [mode, setMode] = useState<'watch'|'try'>('watch');
  const [watchCase, setWatchCase] = useState<CaseType>('2x2');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [examStarted, setExamStarted] = useState(false);

  // ✅ الصوت
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  // ✅ إيقاف الصوت عند تغيير الوضع أو الخروج
  useEffect(() => {
    return () => { stop(); };
  }, [mode, stop]);

  const startExam = () => {
    stop();
    setQuestions(generateExam());
    setExamStarted(true);
    setMode('try');
  };

  const changeMode = (m: 'watch' | 'try') => {
    stop();
    if (m === 'try') {
      startExam();
    } else {
      setMode('watch');
      setExamStarted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-4 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition shrink-0">
          <ArrowRight className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-sm sm:text-lg font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          الضرب التقاطعي
        </h1>
        <Calculator className="w-5 h-5 text-amber-300 shrink-0" />
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

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-2xl">
        <button
          onClick={() => changeMode('watch')}
          className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
            mode==='watch'?'bg-purple-600':'text-white/60'
          }`}
        >
          <Eye className="w-5 h-5" /> شاهد
        </button>
        <button
          onClick={() => changeMode('try')}
          className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
            mode==='try'?'bg-purple-600':'text-white/60'
          }`}
        >
          <Play className="w-5 h-5" /> امتحان
        </button>
      </div>

      {mode === 'watch' && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['2x2','3x2','4x2','5x2','3x3'] as CaseType[]).map(c => (
              <button key={c} onClick={()=>setWatchCase(c)}
                className={`px-3 py-2 rounded-xl whitespace-nowrap font-bold text-xs transition ${
                  watchCase===c?'bg-purple-600':'bg-white/10'
                }`}>
                {CASE_LABELS[c]}
              </button>
            ))}
          </div>
          <div className={`rounded-2xl p-4 bg-gradient-to-l ${CASE_COLORS[watchCase]}`}>
            <p className="font-bold mb-1">🔑 القاعدة:</p>
            <p className="text-sm">
              {watchCase === '2x2'
                ? 'نضرب الأرقام بشكل متقاطع: آحاد × آحاد، ثم (عشرات × آحاد) + (آحاد × عشرات)، ثم عشرات × عشرات.'
                : 'نبدأ من الآحاد ونتقدم نحو المنازل الأعلى، مع جمع حاصلي الضرب المتقابلين في كل مرحلة.'}
            </p>
          </div>
          <StagesDisplay a={EXAMPLES[watchCase].a} b={EXAMPLES[watchCase].b} />
        </div>
      )}

      {mode === 'try' && examStarted && questions.length > 0 && (
        <ExamRunner questions={questions} onClose={() => { stop(); setExamStarted(false); setMode('watch'); }}
          onFinish={(score) => {
            if (onXP && score>0) onXP(score*3);
            if (onComplete) onComplete(Math.max(1, Math.round((score/questions.length)*3)));
          }} />
      )}
    </div>
  );
};

// ===== مشغّل الامتحان =====
interface ExamProps {
  questions: Question[];
  onClose: () => void;
  onFinish: (score: number) => void;
}

const ExamRunner: React.FC<ExamProps> = ({ questions, onClose, onFinish }) => {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(questions[0].timeLimit);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<'ok'|'no'|'timeout'|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQ = questions[idx];
  const total = questions.length;

  useEffect(() => {
    if (finished || feedback === 'ok' || !currentQ) return;
    if (timeLeft <= 0) { setFeedback('timeout'); setTimeout(() => advance(), 1500); return; }
    const t = setTimeout(() => setTimeLeft(x => x-1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished, feedback, currentQ]);

  useEffect(() => { if (inputRef.current && !finished) inputRef.current.focus(); }, [idx, finished]);

  const advance = () => {
    if (idx+1 >= total) { setFinished(true); setTimeout(() => onFinish(score), 100); }
    else {
      setIdx(idx+1); setInput(''); setAttempts(0);
      setTimeLeft(questions[idx+1].timeLimit); setFeedback(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length > 12) return;
    setInput(val);
    if (val === '' || !currentQ) return;
    const num = Number(val);
    if (num === currentQ.answer) { setFeedback('ok'); setScore(s => s+1); setTimeout(() => advance(), 900); }
    else if (val.length >= String(currentQ.answer).length) {
      const n = attempts + 1; setAttempts(n);
      if (n >= 2) { setFeedback('no'); setTimeout(() => advance(), 1200); }
      else { setFeedback('no'); setTimeout(() => { setInput(''); setFeedback(null); }, 600); }
    }
  };

  if (!currentQ) return null;
  const progressPct = ((idx+1)/total)*100;

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-purple-500 to-amber-500" initial={{width:0}} animate={{width:`${progressPct}%`}} />
        </div>
        <span className="text-xs text-white/60">{idx+1}/{total}</span>
        <button onClick={onClose} className="p-2 rounded-full bg-white/10"><X className="w-4 h-4" /></button>
      </div>

      <div className={`p-2 rounded-xl text-center flex items-center justify-center gap-2 ${timeLeft <= 5 ? 'bg-red-500/20 border border-red-500/50' : 'bg-white/5 border border-white/10'}`}>
        <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400' : 'text-amber-300'}`} />
        <span className={`font-bold ${timeLeft <= 5 ? 'text-red-300' : 'text-white'}`}>{timeLeft} ثانية</span>
      </div>

      <div className="text-center">
        <span className={`inline-block px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-l ${CASE_COLORS[currentQ.caseType]}`}>
          {CASE_LABELS[currentQ.caseType]}
        </span>
      </div>

      <div className="bg-white/5 rounded-3xl p-6 text-center">
        <p className="text-xs text-white/50 mb-3">السؤال {idx+1}</p>
        <p className="text-3xl sm:text-4xl font-black" dir="ltr">
          <span className="text-amber-300">{currentQ.a}</span> × <span className="text-emerald-300">{currentQ.b}</span> = <span className="text-purple-300">؟</span>
        </p>
      </div>

      <input ref={inputRef} type="text" inputMode="numeric" value={input} onChange={handleChange}
        disabled={feedback === 'ok' || feedback === 'timeout'}
        className={`w-full bg-slate-800 border-2 rounded-2xl px-4 py-3 text-center text-2xl font-bold outline-none transition ${
          feedback === 'ok' ? 'border-emerald-500 text-emerald-300'
          : feedback === 'no' ? 'border-red-500'
          : feedback === 'timeout' ? 'border-red-500 text-red-300'
          : 'border-purple-500/50 focus:border-amber-400 text-white'}`}
        placeholder="اكتب الإجابة" dir="ltr" />

      <div className="h-6 text-center">
        {feedback === 'ok' && <p className="text-emerald-400 font-bold text-sm">✅ إجابة صحيحة!</p>}
        {feedback === 'no' && attempts === 1 && <p className="text-amber-400 font-bold text-sm">⚠️ حاول مرة أخرى!</p>}
        {feedback === 'no' && attempts >= 2 && <p className="text-red-400 font-bold text-sm">❌ الإجابة: {currentQ.answer}</p>}
        {feedback === 'timeout' && <p className="text-red-400 font-bold text-sm">⏱️ انتهى الوقت! الإجابة: {currentQ.answer}</p>}
      </div>

      <p className="text-center text-xs text-white/50">النقاط: {score}/{total}</p>

      {finished && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-white/10 text-center">
            <Trophy className="w-16 h-16 text-gold-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">انتهى الامتحان!</h2>
            <p className="text-5xl font-black text-amber-300 mb-4">{score}/{total}</p>
            <p className="text-sm text-white/60 mb-6">
              {score === total ? '🏆 ممتاز! أنت بطل!' : score >= total*0.6 ? '👏 جيد جداً!' : '💪 حاول مرة أخرى!'}
            </p>
            <button onClick={onClose} className="w-full py-3 bg-gradient-to-l from-purple-600 to-amber-500 rounded-2xl font-bold">
              إغلاق
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CrossMultiplicationScreen;