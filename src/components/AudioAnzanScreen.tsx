import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Play, Zap, Trophy, RotateCcw,
  Brain, Lock, CheckCircle2, Volume2, Plus, Divide,
} from 'lucide-react';
import { Soroban2D5 } from './soroban2d5/Soroban2D5';
import { SorobanaCompanion } from './SorobanaCompanion';
import { useSorobanaVoice } from '@/hooks/useSorobanaVoice';
import { useSpeech } from '@/hooks/useSpeech';
import {
  loadAudioAnzanBadges, saveAudioAnzanBadges, type AudioAnzanBadges,
} from '@/utils/audioAnzanBadges';
import { loadAnzanBadges } from '@/examBank2';

type SectionType = 'addition' | 'multdiv';
type Phase = 'intro' | 'listening' | 'answer' | 'result';
type AnzanLevel = 1 | 2 | 3 | 4 | 5;

const SPEED_DELAY = 1200;
const MAX_ATTEMPTS = 2;
const CORRECT_TO_MASTER = 10;
const QUESTIONS_PER_ROUND = 5;
const MAX_ROUNDS_PER_DAY = 3;
const ROUNDS_KEY = 'soroban_audio_anzan_rounds';

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

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColumnsForValue(value: number): number {
  if (value < 100) return 2;
  if (value < 1000) return 3;
  if (value < 10000) return 4;
  return 5;
}

function isExamPassed(): boolean {
  try {
    const raw = localStorage.getItem('soroban_exam_result');
    if (!raw) return false;
    return JSON.parse(raw).passed === true;
  } catch {
    return false;
  }
}

function hasAdditionBadge(): boolean {
  return !!loadAnzanBadges().master_addition;
}

function isSecretsUnlocked(): boolean {
  return isExamPassed();
}

function isDivisionUnlocked(): boolean {
  return isExamPassed();
}

interface RoundsData { date: string; count: number; }

function loadRounds(): RoundsData {
  try {
    const raw = localStorage.getItem(ROUNDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === new Date().toDateString()) return parsed;
    }
  } catch { /* ignore */ }
  return { date: new Date().toDateString(), count: 0 };
}

function saveRounds(data: RoundsData) {
  try { localStorage.setItem(ROUNDS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

type AudioOperation = { value: number; operator: '+' | '-' | '×' | '÷'; };
type AudioQuestion = {
  operations: AudioOperation[];
  answer: number;
  level: AnzanLevel;
  isMultiplication?: boolean;
  isDivision?: boolean;
};

function generateAdditionQuestion(level: AnzanLevel): AudioQuestion {
  const count = level + 2;
  const operations: AudioOperation[] = [];
  let current = 0;
  let twoDigitLeft = level === 1 ? 0 : (level === 2 ? 1 : 2);

  for (let i = 0; i < count; i++) {
    const useTwoDigit = twoDigitLeft > 0 && i > 0 && Math.random() < 0.4;
    const canSubtract = current > 5 && Math.random() < 0.3;

    if (canSubtract) {
      const raw = useTwoDigit ? randomInt(5, 20) : randomInt(1, 4);
      const safe = Math.min(raw, current - 1);
      if (safe < 1) {
        const value = randomInt(1, 5);
        operations.push({ value, operator: '+' });
        current += value;
      } else {
        operations.push({ value: safe, operator: '-' });
        current -= safe;
      }
    } else {
      const value = useTwoDigit ? randomInt(5, 20) : randomInt(1, 5);
      if (useTwoDigit) twoDigitLeft--;
      operations.push({ value, operator: '+' });
      current += value;
    }
  }

  return { operations, answer: current, level };
}

const SECRETS_MULTIPLICATION_POOL: Array<{ a: number; b: number }> = [
  { a: 5, b: 3 }, { a: 5, b: 4 }, { a: 5, b: 6 }, { a: 5, b: 7 }, { a: 5, b: 8 }, { a: 5, b: 9 },
  { a: 6, b: 4 }, { a: 6, b: 6 }, { a: 6, b: 8 },
  { a: 7, b: 3 }, { a: 7, b: 4 }, { a: 7, b: 6 }, { a: 7, b: 8 }, { a: 7, b: 9 },
  { a: 8, b: 3 }, { a: 8, b: 4 }, { a: 8, b: 6 }, { a: 8, b: 7 }, { a: 8, b: 9 },
  { a: 9, b: 3 }, { a: 9, b: 4 }, { a: 9, b: 5 }, { a: 9, b: 6 }, { a: 9, b: 7 }, { a: 9, b: 8 },
  { a: 12, b: 4 }, { a: 14, b: 4 }, { a: 16, b: 4 },
  { a: 7, b: 8 }, { a: 6, b: 7 }, { a: 8, b: 9 },
  { a: 34, b: 11 }, { a: 51, b: 11 }, { a: 62, b: 11 }, { a: 82, b: 11 },
  { a: 12, b: 99 }, { a: 25, b: 99 }, { a: 34, b: 99 },
  { a: 20, b: 999 }, { a: 45, b: 999 },
  { a: 96, b: 97 }, { a: 95, b: 98 }, { a: 92, b: 97 },
  { a: 104, b: 103 }, { a: 105, b: 104 }, { a: 106, b: 103 },
];

function generateMultiplicationQuestion(level: AnzanLevel): AudioQuestion {
  const pool = shuffle(SECRETS_MULTIPLICATION_POOL);
  const q = pool[0];
  return {
    operations: [
      { value: q.a, operator: '×' },
      { value: q.b, operator: '×' },
    ],
    answer: q.a * q.b,
    level,
    isMultiplication: true,
  };
}

const DIVISION_POOL: Array<{ a: number; b: number }> = [
  { a: 84, b: 2 }, { a: 96, b: 4 }, { a: 75, b: 5 }, { a: 63, b: 3 }, { a: 88, b: 8 },
  { a: 48, b: 6 }, { a: 92, b: 4 }, { a: 56, b: 7 }, { a: 72, b: 9 }, { a: 45, b: 5 },
  { a: 66, b: 6 }, { a: 81, b: 9 }, { a: 100, b: 4 }, { a: 144, b: 12 }, { a: 121, b: 11 },
  { a: 64, b: 8 }, { a: 36, b: 4 }, { a: 54, b: 6 }, { a: 90, b: 5 }, { a: 108, b: 6 },
  { a: 88, b: 22 }, { a: 96, b: 32 }, { a: 135, b: 27 }, { a: 84, b: 21 },
  { a: 92, b: 23 }, { a: 76, b: 19 }, { a: 78, b: 26 }, { a: 72, b: 18 },
  { a: 91, b: 13 }, { a: 87, b: 29 }, { a: 75, b: 25 }, { a: 98, b: 14 },
];

function generateDivisionQuestion(level: AnzanLevel): AudioQuestion {
  const pool = shuffle(DIVISION_POOL);
  const q = pool[0];
  return {
    operations: [
      { value: q.a, operator: '÷' },
      { value: q.b, operator: '÷' },
    ],
    answer: q.a / q.b,
    level,
    isDivision: true,
  };
}

function generateRound(section: SectionType): AudioQuestion[] {
  const questions: AudioQuestion[] = [];
  const usedAnswers = new Set<number>();
  const targetCount = QUESTIONS_PER_ROUND;

  if (section === 'addition') {
    const unlockedLevels = [1, 2, 3, 4, 5];
    let idx = 0;
    while (questions.length < targetCount) {
      const level = unlockedLevels[idx % unlockedLevels.length] as AnzanLevel;
      let attempts = 0;
      let q: AudioQuestion;
      do {
        q = generateAdditionQuestion(level);
        attempts++;
      } while (usedAnswers.has(q.answer) && attempts < 30);
      usedAnswers.add(q.answer);
      questions.push(q);
      idx++;
    }
  } else {
    while (questions.length < targetCount) {
      let attempts = 0;
      let q: AudioQuestion;
      const isMult = Math.random() < 0.5;
      do {
        q = isMult ? generateMultiplicationQuestion(1) : generateDivisionQuestion(1);
        attempts++;
      } while (usedAnswers.has(q.answer) && attempts < 30);
      usedAnswers.add(q.answer);
      questions.push(q);
    }
  }

  return questions;
}

function buildSpeechSequence(ops: AudioOperation[]): string[] {
  const parts: string[] = [];
  ops.forEach((op, i) => {
    if (i === 0) {
      parts.push(`${op.value}`);
    } else {
      const prevOp = ops[i - 1];
      if (prevOp.operator === '+') parts.push(`زائد ${op.value}`);
      else if (prevOp.operator === '-') parts.push(`ناقص ${op.value}`);
      else if (prevOp.operator === '×') parts.push(`ضرب ${op.value}`);
      else if (prevOp.operator === '÷') parts.push(`تقسيم ${op.value}`);
    }
  });
  return parts;
}

interface Props {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

export function AudioAnzanScreen({ onBack, playSound, onXP, burst }: Props) {
  const [section, setSection] = useState<SectionType>('addition');
  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<AudioQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [abacusValue, setAbacusValue] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong' | 'revealed'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [roundScore, setRoundScore] = useState(0);
  const [roundCorrect, setRoundCorrect] = useState<number[]>([]);
  const [badges, setBadges] = useState<AudioAnzanBadges>(loadAudioAnzanBadges());
  const [rounds, setRounds] = useState<RoundsData>(loadRounds());
  const [replayUsed, setReplayUsed] = useState(false);

  const { speak, stop, isSupported } = useSpeech();
  const sorobana = useSorobanaVoice();

  const currentQ = questions[currentIdx];
  const canStartRound = rounds.count < MAX_ROUNDS_PER_DAY;

  const multUnlocked = hasAdditionBadge() && isSecretsUnlocked();
  const divUnlocked = hasAdditionBadge() && isDivisionUnlocked();
  const multdivUnlocked = multUnlocked || divUnlocked;

  useEffect(() => {
    return () => { stop(); sorobana.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, phase, stop]);

  useEffect(() => {
    if (phase !== 'answer' || !currentQ) return;
    if (timeLeft <= 0) {
      setFeedback('revealed');
      setTimeout(() => nextQuestion(false), 2500);
      return;
    }
    const t = setTimeout(() => setTimeLeft(x => x - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft, currentQ]);

  useEffect(() => {
    if (phase !== 'listening' || !currentQ) return;

    const parts = buildSpeechSequence(currentQ.operations);
    let cancelled = false;

    const playAll = async () => {
      for (const part of parts) {
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          speak(part, { rate: 1.0, onEnd: () => resolve() });
        });
        await new Promise((r) => setTimeout(r, SPEED_DELAY - 300));
      }
      if (!cancelled) {
        setPhase('answer');
      }
    };

    playAll();
    return () => { cancelled = true; };
  }, [phase, currentQ, speak]);

  const getLevelTime = (level: AnzanLevel): number => {
    const map: Record<AnzanLevel, number> = { 1: 15, 2: 20, 3: 25, 4: 30, 5: 35 };
    return map[level] || 20;
  };

  const startRound = () => {
    if (!canStartRound) { playSound('error'); return; }
    const qs = generateRound(section);
    if (qs.length === 0) { playSound('error'); return; }
    setQuestions(qs);
    setCurrentIdx(0);
    setAbacusValue(0);
    setFeedback('idle');
    setAttempts(0);
    setRoundScore(0);
    setRoundCorrect([]);
    setReplayUsed(false);
    setTimeLeft(getLevelTime(qs[0].level));
    setPhase('listening');
    playSound('click');
  };

  const handleReplay = () => {
    if (replayUsed || !currentQ) return;
    setReplayUsed(true);
    playSound('click');
    setPhase('listening');
  };

  const handleCheck = () => {
    if (!currentQ || feedback !== 'idle') return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (abacusValue === currentQ.answer) {
      playSound('success');
      setFeedback('correct');
      sorobana.speakCorrect();
      setTimeout(() => nextQuestion(true), 1200);
    } else if (newAttempts >= MAX_ATTEMPTS) {
      playSound('error');
      setFeedback('revealed');
      sorobana.speakWrong();
      setTimeout(() => nextQuestion(false), 2500);
    } else {
      playSound('error');
      setFeedback('wrong');
      setTimeout(() => setFeedback('idle'), 900);
    }
  };

  const nextQuestion = (correct: boolean) => {
    setAbacusValue(0);
    setFeedback('idle');
    setAttempts(0);
    setReplayUsed(false);

    const newCorrect = correct ? [...roundCorrect, currentQ!.level] : roundCorrect;
    const newScore = correct ? roundScore + 3 : roundScore;
    if (correct) {
      onXP(3);
      burst(0.5, 0.4);
    }

    if (currentIdx + 1 < questions.length) {
      setRoundCorrect(newCorrect);
      setRoundScore(newScore);
      setCurrentIdx(currentIdx + 1);
      setTimeLeft(getLevelTime(questions[currentIdx + 1].level));
      setPhase('listening');
    } else {
      finishRound(newCorrect, newScore);
    }
  };

  const finishRound = (correctLevels: number[], finalScore: number) => {
    const newRounds: RoundsData = { ...rounds, count: rounds.count + 1 };
    saveRounds(newRounds);
    setRounds(newRounds);

    const updatedBadges = { ...badges };
    if (section === 'addition' && correctLevels.length >= CORRECT_TO_MASTER) {
      updatedBadges.master_addition_audio = true;
    }
    if (section === 'multdiv') {
      if (correctLevels.length >= CORRECT_TO_MASTER) {
        if (multUnlocked) updatedBadges.master_multiplication_audio = true;
        if (divUnlocked) updatedBadges.master_division_audio = true;
      }
    }
    saveAudioAnzanBadges(updatedBadges);
    setBadges(updatedBadges);

    setPhase('result');
    sorobana.speakEndLesson();
  };

  if (!isSupported) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]" dir="rtl">
        <Volume2 className="w-16 h-16 text-red-300 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">المتصفح لا يدعم الصوت</h2>
        <p className="text-white/60 text-center mb-6">جرّب متصفحاً آخر (Chrome, Edge)</p>
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-primary">رجوع</button>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { stop(); sorobana.stop(); playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold font-display text-white">الأنزان السماعي</h2>
          <p className="text-sm text-white/50 font-body">اسمع الأرقام واحسبها ذهنياً</p>
        </div>
        <Volume2 className="w-6 h-6 text-purple-300" />
      </div>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => { stop(); sorobana.stop(); playSound('click'); setSection('addition'); setPhase('intro'); }}
          className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
            section === 'addition' ? 'bg-purple-600 shadow-lg' : 'bg-white/10'
          }`}
        >
          <Brain className="w-4 h-4" /> جمع وطرح
        </button>
        <button
          onClick={() => {
            if (!multdivUnlocked) { playSound('error'); return; }
            stop(); sorobana.stop(); playSound('click'); setSection('multdiv'); setPhase('intro');
          }}
          disabled={!multdivUnlocked}
          className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
            section === 'multdiv' ? 'bg-purple-600 shadow-lg' :
            multdivUnlocked ? 'bg-white/10' : 'bg-white/5 opacity-50 cursor-not-allowed'
          }`}
        >
          {!multdivUnlocked ? <Lock className="w-4 h-4" /> : <><Plus className="w-4 h-4" /><Divide className="w-4 h-4" /></>}
          ضرب وقسمة
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-electric-300" />
          <span className="text-xs text-white/60 font-body">الجولات اليوم:</span>
        </div>
        <span className="text-sm font-bold text-electric-200">
          {toArabicNumber(rounds.count)} / {toArabicNumber(MAX_ROUNDS_PER_DAY)}
        </span>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {badges.master_addition_audio && (
          <span className="px-2 py-1 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-200 text-[10px] font-bold">
            🎤 خبير جمع وطرح سماعي
          </span>
        )}
        {badges.master_multiplication_audio && (
          <span className="px-2 py-1 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-200 text-[10px] font-bold">
            🎤 خبير ضرب سماعي
          </span>
        )}
        {badges.master_division_audio && (
          <span className="px-2 py-1 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-200 text-[10px] font-bold">
            🎤 خبير قسمة سماعية
          </span>
        )}
      </div>

      {phase === 'intro' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {!multdivUnlocked && section === 'multdiv' ? (
            <div className="glass-card p-6 text-center">
              <Lock className="w-12 h-12 text-amber-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">القسم مقفل</h3>
              <p className="text-sm text-white/60 font-body leading-relaxed">
                يحتاج: فتح درس الضرب + شارة "خبير جمع وطرح"
              </p>
            </div>
          ) : !canStartRound ? (
            <div className="glass-card p-6 text-center">
              <Trophy className="w-12 h-12 text-gold-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">انتهت جولات اليوم</h3>
              <p className="text-sm text-white/60 font-body">عد غداً 💪</p>
            </div>
          ) : (
            <>
              <div className="glass-card p-5">
                <h3 className="text-sm font-bold text-amber-300 mb-3">
                  🎧 كيف يعمل الأنزان السماعي؟
                </h3>
                <ul className="space-y-2 text-sm text-white/70 font-body">
                  <li>• سمع الأرقام بالتسلسل (سرعة 1.2 ثانية).</li>
                  <li>• احسبها ذهنياً.</li>
                  <li>• أدخل الإجابة على المعداد.</li>
                  <li>• يمكنك إعادة السمع مرة واحدة لكل سؤال.</li>
                  <li>• محاولتان — ثم تظهر الإجابة.</li>
                </ul>
              </div>

              <button onClick={startRound} className="btn-primary w-full !py-4 !text-lg">
                <Play className="w-6 h-6" /> ابدأ الجولة
              </button>
            </>
          )}
        </motion.div>
      )}

      {phase === 'listening' && currentQ && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center mx-auto mb-6"
          >
            <Volume2 className="w-12 h-12 text-white" />
          </motion.div>
          <p className="text-lg text-white/70 font-body">🎧 اسمع الأرقام...</p>
          <p className="text-sm text-white/50 mt-2">
            السؤال {toArabicNumber(currentIdx + 1)} من {toArabicNumber(questions.length)}
          </p>
        </motion.div>
      )}

      {phase === 'answer' && currentQ && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-white/60">
              السؤال {toArabicNumber(currentIdx + 1)} من {toArabicNumber(questions.length)} — النقاط: {toArabicNumber(roundScore)}
            </span>
          </div>

          <div className={`p-2 rounded-xl text-center flex items-center justify-center gap-2 ${
            timeLeft <= 3 ? 'bg-red-500/20 border border-red-500/50' : 'bg-white/5 border border-white/10'
          }`}>
            <Zap className={`w-4 h-4 ${timeLeft <= 3 ? 'text-red-400' : 'text-amber-300'}`} />
            <span className={`font-bold ${timeLeft <= 3 ? 'text-red-300' : 'text-white'}`}>
              {toArabicNumber(timeLeft)} ثانية
            </span>
          </div>

          <div className="flex justify-center">
            <Soroban2D5
              key={`audio-anzan-${currentIdx}`}
              columns={getColumnsForValue(currentQ.answer)}
              autoBeadSize={true}
              interactive={true}
              showValue={true}
              onValueChange={setAbacusValue}
            />
          </div>

          <div className="text-center">
            <span className="text-sm text-white/60">القيمة الحالية: </span>
            <span className="text-2xl font-bold text-amber-300">{toArabicNumber(abacusValue)}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { setAbacusValue(0); playSound('click'); }}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> مسح
            </button>
            <button
              onClick={handleReplay}
              disabled={replayUsed}
              className="flex-1 py-3 rounded-xl bg-purple-500/20 border border-purple-400/40 font-bold flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Volume2 className="w-4 h-4" /> أعد السمع
            </button>
            <button
              onClick={handleCheck}
              disabled={feedback !== 'idle'}
              className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                feedback === 'correct' ? 'bg-emerald-500' :
                feedback === 'wrong' ? 'bg-red-500' :
                'bg-gradient-to-l from-purple-600 to-amber-500'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" /> تحقق
            </button>
          </div>

          {feedback === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-center"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-300 mx-auto mb-1" />
              <p className="text-emerald-300 font-bold text-sm">أحسنت! 🎉</p>
            </motion.div>
          )}

          {feedback === 'wrong' && attempts === 1 && (
            <div className="p-3 rounded-2xl bg-red-500/15 border border-red-400/40 text-center">
              <p className="text-red-300 font-bold text-sm">❌ حاول مرة أخرى</p>
            </div>
          )}

          {feedback === 'revealed' && (
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-400/40 text-center">
              <p className="text-sm text-white/70 mb-1">الإجابة الصحيحة:</p>
              <p className="text-3xl font-black text-red-300 font-display">
                {toArabicNumber(currentQ.answer)}
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 text-center">
          <Trophy className="w-16 h-16 text-gold-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">انتهت الجولة!</h2>
          <p className="text-4xl font-black text-amber-300 mb-4">+{toArabicNumber(roundScore)} XP</p>
          <p className="text-sm text-white/60 mb-6">
            أكملت {toArabicNumber(roundCorrect.length)} من {toArabicNumber(questions.length)} سؤالاً
          </p>
          <button onClick={() => setPhase('intro')} className="btn-primary w-full">
            <RotateCcw className="w-5 h-5" /> متابعة
          </button>
        </motion.div>
      )}

      {/* ✅ سوروبانا — تظهر فقط بعد "ابدأ الجولة" */}
      {phase !== 'intro' && (
        <SorobanaCompanion
          isSpeaking={sorobana.isSpeaking}
          onClick={() => sorobana.speakTeaching()}
          variant="pointing"
          sizeOverride={120}
          offsetBottom="6rem"
          clickThrough={true}
        />
      )}
    </div>
  );
}

export default AudioAnzanScreen;