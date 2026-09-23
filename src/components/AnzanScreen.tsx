import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Eye, Play, Zap, Trophy, RotateCcw,
  Brain, Lock, CheckCircle2, Volume2,
} from 'lucide-react';
import { Soroban2D5 } from './soroban2d5/Soroban2D5';
import { SorobanaCompanion } from './SorobanaCompanion';
import { DebugOverlay } from './DebugOverlay';
import { useSorobanaVoice } from '@/hooks/useSorobanaVoice';
import AudioAnzanScreen from './AudioAnzanScreen';
import {
  loadAnzanBadges, saveAnzanBadges, type AnzanBadges,
} from '@/examBank2';

type Phase = 'intro' | 'answer' | 'result';
type SectionType = 'addition' | 'multiplication' | 'division' | 'mixed';
type AnzanLevel = 1 | 2 | 3 | 4 | 5;

const ANZAN_PROGRESS_KEY = 'soroban_anzan_progress';
const ANZAN_ROUNDS_KEY = 'soroban_anzan_rounds';
const QUESTIONS_PER_ROUND = 5;
const CORRECT_TO_MASTER = 10;
const MAX_ROUNDS_PER_DAY = 3;
const MAX_ATTEMPTS = 1;

const SECTION_LABELS: Record<SectionType, string> = {
  addition: '🧠 جمع وطرح',
  multiplication: '✖️ ضرب',
  division: '➗ قسمة',
  mixed: '🔀 مختلط',
};

const SECTION_STORIES: Record<SectionType, string> = {
  addition: 'تخيل الخرزات في عقلك، واجمع واطرح الأرقام بسرعة!',
  multiplication: 'تخيل المعداد، واضرب الأرقام بسرعة!',
  division: 'تخيل المعداد، واقسم الأرقام بسرعة!',
  mixed: 'تخيل المعداد، واضرب واقسم بسرعة!',
};

interface AnzanProgress {
  addition: number[];
  multiplication: number[];
  division: number[];
  mixed: number[];
}

function loadProgress(): AnzanProgress {
  try {
    const raw = localStorage.getItem(ANZAN_PROGRESS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        addition: parsed.addition || [],
        multiplication: parsed.multiplication || [],
        division: parsed.division || [],
        mixed: parsed.mixed || [],
      };
    }
  } catch { /* ignore */ }
  return { addition: [], multiplication: [], division: [], mixed: [] };
}

function saveProgress(progress: AnzanProgress) {
  try { localStorage.setItem(ANZAN_PROGRESS_KEY, JSON.stringify(progress)); } catch { /* ignore */ }
}

interface RoundsData { date: string; count: number; }

function loadRounds(): RoundsData {
  try {
    const raw = localStorage.getItem(ANZAN_ROUNDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === new Date().toDateString()) return parsed;
    }
  } catch { /* ignore */ }
  return { date: new Date().toDateString(), count: 0 };
}

function saveRounds(data: RoundsData) {
  try { localStorage.setItem(ANZAN_ROUNDS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

function isLessonCompleted(id: number): boolean {
  try {
    const raw = localStorage.getItem('soroban-completed-lessons');
    if (!raw) return false;
    return JSON.parse(raw).includes(id);
  } catch { return false; }
}

interface LevelInfo {
  level: AnzanLevel;
  label: string;
  time: number;
  unlocked: boolean;
}

function getAdditionLevels(): LevelInfo[] {
  const progress = loadProgress();
  return [
    { level: 1, label: '3 أرقام', time: 15, unlocked: true },
    { level: 2, label: '4 أرقام', time: 20, unlocked: progress.addition.includes(1) },
    { level: 3, label: '5 أرقام', time: 25, unlocked: progress.addition.includes(2) },
    { level: 4, label: '6 أرقام', time: 30, unlocked: progress.addition.includes(3) },
    { level: 5, label: '7 أرقام', time: 35, unlocked: progress.addition.includes(4) },
  ];
}

function getMultiplicationLevels(): LevelInfo[] {
  const progress = loadProgress();
  const lesson1 = isLessonCompleted(1);
  const lesson2 = isLessonCompleted(2);
  const lesson3 = isLessonCompleted(3);
  const lesson4 = isLessonCompleted(4);
  return [
    { level: 1, label: 'ضرب بسيط', time: 10, unlocked: lesson1 },
    { level: 2, label: 'منزلتين × منزلة', time: 20, unlocked: lesson1 && progress.multiplication.includes(1) },
    { level: 3, label: '٣ × منزلة', time: 20, unlocked: lesson2 && progress.multiplication.includes(2) },
    { level: 4, label: 'منزلتين × منزلتين', time: 30, unlocked: lesson3 && progress.multiplication.includes(3) },
    { level: 5, label: 'الضرب التقاطعي', time: 30, unlocked: lesson4 && progress.multiplication.includes(4) },
  ];
}

function getDivisionLevels(): LevelInfo[] {
  const progress = loadProgress();
  const lesson6 = isLessonCompleted(6);
  const lesson7 = isLessonCompleted(7);
  const lesson8 = isLessonCompleted(8);
  return [
    { level: 1, label: 'قسمة بسيطة', time: 10, unlocked: lesson6 },
    { level: 2, label: 'مرتبتين ÷ مرتبتين', time: 20, unlocked: lesson6 && progress.division.includes(1) },
    { level: 3, label: '٣ مراتب ÷ مرتبتين', time: 20, unlocked: lesson7 && progress.division.includes(2) },
    { level: 4, label: 'سلسلة قسمة', time: 30, unlocked: lesson7 && progress.division.includes(3) },
    { level: 5, label: 'قسمة ذهنية', time: 30, unlocked: lesson8 && progress.division.includes(4) },
  ];
}

function getMixedLevels(): LevelInfo[] {
  const progress = loadProgress();
  const multDone = [1, 2, 3, 4, 5].every(id => isLessonCompleted(id));
  const divDone = [6, 7, 8].every(id => isLessonCompleted(id));
  const allDone = multDone && divDone;
  return [
    { level: 1, label: 'سلسلة قصيرة', time: 20, unlocked: allDone },
    { level: 2, label: 'سلسلة متوسطة', time: 25, unlocked: allDone && progress.mixed.includes(1) },
    { level: 3, label: 'سلسلة طويلة', time: 30, unlocked: allDone && progress.mixed.includes(2) },
    { level: 4, label: 'مركب سريع', time: 35, unlocked: allDone && progress.mixed.includes(3) },
    { level: 5, label: 'مركب متقدم', time: 40, unlocked: allDone && progress.mixed.includes(4) },
  ];
}

function getLevelsForSection(section: SectionType): LevelInfo[] {
  switch (section) {
    case 'addition': return getAdditionLevels();
    case 'multiplication': return getMultiplicationLevels();
    case 'division': return getDivisionLevels();
    case 'mixed': return getMixedLevels();
  }
}

type Question = {
  operations: Array<{ value: number; operator: '+' | '-' | '×' | '÷' }>;
  answer: number;
  level: AnzanLevel;
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(section: SectionType, level: AnzanLevel): Question {
  if (section === 'addition') {
    const count = level + 2;
    const operations: Array<{ value: number; operator: '+' | '-'; }> = [];
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

  if (section === 'multiplication') {
    let a = 2, b = 2;
    switch (level) {
      case 1: a = randomInt(2, 9); b = randomInt(2, 9); break;
      case 2: a = randomInt(12, 92); b = randomInt(2, 8); break;
      case 3: a = randomInt(120, 920); b = randomInt(2, 8); break;
      case 4: a = randomInt(12, 92); b = randomInt(12, 32); break;
      case 5: a = randomInt(120, 420); b = randomInt(11, 31); break;
    }
    return { operations: [{ value: a, operator: '×' }, { value: b, operator: '×' }], answer: a * b, level };
  }

  if (section === 'division') {
    let dividend = 4, divisor = 2, quotient = 2;
    switch (level) {
      case 1: quotient = randomInt(2, 30); divisor = randomInt(2, 9); dividend = quotient * divisor; break;
      case 2: quotient = randomInt(2, 15); divisor = randomInt(11, 50); dividend = quotient * divisor; break;
      case 3: quotient = randomInt(10, 40); divisor = randomInt(11, 50); dividend = quotient * divisor; break;
      case 4: quotient = randomInt(5, 25); divisor = randomInt(5, 20); dividend = quotient * divisor; break;
      case 5: quotient = randomInt(5, 45); divisor = randomInt(5, 35); dividend = quotient * divisor; break;
    }
    return { operations: [{ value: dividend, operator: '÷' }, { value: divisor, operator: '÷' }], answer: quotient, level };
  }

  const result: Array<{ value: number; operator: '+' | '-' | '×' | '÷'; }> = [];
  let start = randomInt(4, 8);
  result.push({ value: start, operator: '×' });
  for (let i = 0; i < level; i++) {
    if (i % 2 === 0) {
      const div = randomInt(2, 6);
      result.push({ value: div, operator: '÷' });
    } else {
      const mult = randomInt(2, 6);
      result.push({ value: mult, operator: '×' });
    }
  }
  let answer = result[0].value;
  for (let i = 0; i < result.length - 1; i++) {
    const op = result[i].operator;
    if (op === '×') answer *= result[i + 1].value;
    else if (op === '÷') answer = Math.floor(answer / result[i + 1].value);
  }
  return { operations: result, answer, level };
}

function generateRound(section: SectionType): Question[] {
  const levels = getLevelsForSection(section);
  const unlocked = levels.filter(l => l.unlocked).map(l => l.level);
  if (unlocked.length === 0) return [];
  const questions: Question[] = [];
  const usedAnswers = new Set<number>();
  let idx = 0;
  while (questions.length < QUESTIONS_PER_ROUND) {
    const level = unlocked[idx % unlocked.length];
    let attempts = 0;
    let q: Question;
    do {
      q = generateQuestion(section, level);
      attempts++;
    } while (usedAnswers.has(q.answer) && attempts < 30);
    usedAnswers.add(q.answer);
    questions.push(q);
    idx++;
  }
  return questions;
}

function questionToString(q: Question): string {
  if (q.operations.length === 0) return '';
  const parts: string[] = [String(q.operations[0].value)];
  for (let i = 1; i < q.operations.length; i++) {
    const op = q.operations[i];
    parts.push(`${op.operator} ${op.value}`);
  }
  return parts.join(' ') + ' = ؟';
}

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

function getColumnsForValue(value: number): number {
  if (value < 100) return 2;
  if (value < 1000) return 3;
  if (value < 10000) return 4;
  return 5;
}

function getLevelTime(section: SectionType, level: AnzanLevel): number {
  const lv = getLevelsForSection(section).find(l => l.level === level);
  return lv ? lv.time : 20;
}

interface Props {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

export function AnzanScreen({ onBack, playSound, onXP, burst }: Props) {
  const [isAudioMode, setIsAudioMode] = useState<boolean>(false);
  const [section, setSection] = useState<SectionType>('addition');
  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [abacusValue, setAbacusValue] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong' | 'revealed'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [roundScore, setRoundScore] = useState(0);
  const [roundCorrect, setRoundCorrect] = useState<number[]>([]);
  const [progress, setProgress] = useState<AnzanProgress>(loadProgress());
  const [badges, setBadges] = useState<AnzanBadges>(loadAnzanBadges());
  const [rounds, setRounds] = useState<RoundsData>(loadRounds());

  const sorobana = useSorobanaVoice();

  const currentQ = questions[currentIdx];
  const levels = getLevelsForSection(section);
  const hasUnlockedLevels = levels.some(l => l.unlocked);
  const canStartRound = rounds.count < MAX_ROUNDS_PER_DAY;

  useEffect(() => {
    return () => { sorobana.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useEffect(() => {
    if (phase !== 'answer' || !currentQ) return;
    if (feedback !== 'idle') return;
    if (timeLeft <= 0) {
      setFeedback('revealed');
      sorobana.speakWrong();
      return;
    }
    const t = setTimeout(() => setTimeLeft(x => x - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft, currentQ, feedback]);

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
    setTimeLeft(getLevelTime(section, qs[0].level));
    setPhase('answer');
    playSound('click');
  };

  const handleCheck = () => {
    if (!currentQ || feedback !== 'idle') return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (abacusValue === currentQ.answer) {
      playSound('success');
      setFeedback('correct');
      sorobana.speakCorrect();
    } else {
      playSound('error');
      setFeedback('revealed');
      sorobana.speakWrong();
    }
  };

  const nextQuestion = (correct: boolean) => {
    if (!currentQ) return;
    sorobana.stop();
    setAbacusValue(0);
    setFeedback('idle');
    setAttempts(0);
    const newCorrect = correct ? [...roundCorrect, currentQ.level] : roundCorrect;
    const newScore = correct ? roundScore + 2 : roundScore;
    if (correct) { onXP(2); burst(0.5, 0.4); }
    if (currentIdx + 1 < questions.length) {
      setRoundCorrect(newCorrect);
      setRoundScore(newScore);
      setCurrentIdx(currentIdx + 1);
      setTimeLeft(getLevelTime(section, questions[currentIdx + 1].level));
    } else {
      finishRound(newCorrect, newScore);
    }
  };

  const finishRound = (correctLevels: number[], finalScore: number) => {
    const newRounds: RoundsData = { ...rounds, count: rounds.count + 1 };
    saveRounds(newRounds);
    setRounds(newRounds);

    const newProgress = { ...progress };
    const sectionProgress = [...newProgress[section]];
    const updatedBadges = { ...badges };

    for (const level of correctLevels) {
      sectionProgress.push(level);
      const count = sectionProgress.filter(x => x === level).length;
      if (count >= CORRECT_TO_MASTER) {
        if (section === 'addition') updatedBadges.master_addition = true;
        if (section === 'multiplication') updatedBadges.master_multiplication = true;
        if (section === 'division') updatedBadges.master_division = true;
        if (section === 'mixed') updatedBadges.master_mixed = true;
      }
    }
    newProgress[section] = sectionProgress;
    setProgress(newProgress);
    saveProgress(newProgress);
    saveAnzanBadges(updatedBadges);
    setBadges(updatedBadges);
    setPhase('result');
  };

  const getLevelCount = (level: AnzanLevel): number => {
    return progress[section].filter(x => x === level).length;
  };

  if (isAudioMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900" dir="rtl">
        <div className="px-3 sm:px-6 py-4 max-w-2xl mx-auto">
          <button
            onClick={() => { sorobana.stop(); playSound('click'); setIsAudioMode(false); }}
            className="mb-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold"
          >
            <ArrowRight className="w-4 h-4" /> العودة للأنزان البصري
          </button>
        </div>
        <AudioAnzanScreen
          onBack={onBack}
          playSound={playSound}
          onXP={onXP}
          burst={burst}
        />
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto" dir="rtl">
      <DebugOverlay logs={sorobana.debugLogs} onClear={sorobana.clearDebugLogs} />

      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => { sorobana.stop(); playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold font-display text-white">التصور الذهني</h2>
          <p className="text-sm text-white/50 font-body">{SECTION_STORIES[section]}</p>
        </div>
        <Brain className="w-6 h-6 text-purple-300" />
      </div>

      <div className="flex gap-2 mb-5 bg-white/5 p-1 rounded-2xl">
        <button
          onClick={() => { sorobana.stop(); playSound('click'); setIsAudioMode(false); }}
          className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
            !isAudioMode ? 'bg-purple-600 shadow-lg' : 'text-white/60'
          }`}
        >
          <Eye className="w-4 h-4" /> الأنزان البصري
        </button>
        <button
          onClick={() => { sorobana.stop(); playSound('click'); setIsAudioMode(true); }}
          className={`flex-1 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2 ${
            isAudioMode ? 'bg-purple-600 shadow-lg' : 'text-white/60'
          }`}
        >
          <Volume2 className="w-4 h-4" /> الأنزان السماعي
        </button>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {(['addition', 'multiplication', 'division', 'mixed'] as SectionType[]).map((s) => (
          <button
            key={s}
            onClick={() => { sorobana.stop(); playSound('click'); setSection(s); setPhase('intro'); }}
            className={`px-3 py-2 rounded-xl whitespace-nowrap font-bold text-xs transition ${
              section === s ? 'bg-purple-600 shadow-lg' : 'bg-white/10'
            }`}
          >
            {SECTION_LABELS[s]}
          </button>
        ))}
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

      {(badges.master_addition || badges.master_multiplication || badges.master_division || badges.master_mixed) && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {badges.master_addition && <span className="px-2 py-1 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-200 text-[10px] font-bold">🏅 خبير جمع وطرح</span>}
          {badges.master_multiplication && <span className="px-2 py-1 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-200 text-[10px] font-bold">🏅 خبير ضرب</span>}
          {badges.master_division && <span className="px-2 py-1 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-200 text-[10px] font-bold">🏅 خبير قسمة</span>}
          {badges.master_mixed && <span className="px-2 py-1 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-200 text-[10px] font-bold">🏅 خبير مختلط</span>}
        </div>
      )}

      {phase === 'intro' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {!hasUnlockedLevels ? (
            <div className="glass-card p-6 text-center">
              <Lock className="w-12 h-12 text-amber-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">لا توجد مستويات مفتوحة</h3>
              <p className="text-sm text-white/60 font-body leading-relaxed">
                {section === 'multiplication' && 'أكمل دروس الضرب أولاً'}
                {section === 'division' && 'أكمل دروس القسمة أولاً'}
                {section === 'mixed' && 'أكمل دروس الضرب والقسمة أولاً'}
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
                <h3 className="text-sm font-bold text-amber-300 mb-3">📊 تقدمك في هذا القسم:</h3>
                <div className="space-y-2">
                  {levels.map(lv => {
                    const count = getLevelCount(lv.level);
                    const pct = Math.min(100, (count / CORRECT_TO_MASTER) * 100);
                    return (
                      <div key={lv.level} className={`p-3 rounded-xl border ${lv.unlocked ? 'bg-white/5 border-white/10' : 'bg-white/[0.02] border-white/5 opacity-50'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-bold ${lv.unlocked ? 'text-white' : 'text-white/40'}`}>
                            {lv.unlocked ? '' : '🔒 '}مستوى {toArabicNumber(lv.level)} — {lv.label}
                          </span>
                          <span className={`text-xs font-bold ${count >= CORRECT_TO_MASTER ? 'text-gold-300' : 'text-white/50'}`}>
                            {toArabicNumber(count)}/{toArabicNumber(CORRECT_TO_MASTER)}
                            {count >= CORRECT_TO_MASTER && ' 🏅'}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${count >= CORRECT_TO_MASTER ? 'from-gold-400 to-gold-600' : 'from-purple-400 to-electric-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={startRound} className="btn-primary w-full !py-4 !text-lg">
                <Play className="w-6 h-6" /> ابدأ الجولة
              </button>
            </>
          )}
        </motion.div>
      )}

      {phase === 'answer' && currentQ && (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-white/60">
              السؤال {toArabicNumber(currentIdx + 1)} من {toArabicNumber(questions.length)} — النقاط: {toArabicNumber(roundScore)}
            </span>
          </div>

          <div className={`p-2 rounded-xl text-center flex items-center justify-center gap-2 ${timeLeft <= 3 ? 'bg-red-500/20 border border-red-500/50' : 'bg-white/5 border border-white/10'}`}>
            <Zap className={`w-4 h-4 ${timeLeft <= 3 ? 'text-red-400' : 'text-amber-300'}`} />
            <span className={`font-bold ${timeLeft <= 3 ? 'text-red-300' : 'text-white'}`}>{toArabicNumber(timeLeft)} ثانية</span>
          </div>

          <div className="bg-white/5 rounded-3xl p-5 text-center">
            <p className="text-3xl sm:text-4xl font-black font-display text-white" dir="ltr">{questionToString(currentQ)}</p>
          </div>

          <div className="flex justify-center">
            <Soroban2D5
              key={`anzan-${currentIdx}`}
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
              disabled={feedback !== 'idle'}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <RotateCcw className="w-4 h-4" /> مسح
            </button>
            <button
              onClick={() => {
                if (feedback === 'idle') handleCheck();
                else nextQuestion(feedback === 'correct');
              }}
              className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                feedback === 'idle'
                  ? 'bg-gradient-to-l from-purple-600 to-amber-500'
                  : feedback === 'correct'
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
              }`}
            >
              {feedback === 'idle' ? (
                <><CheckCircle2 className="w-5 h-5" /> تحقق</>
              ) : (
                <>التالي <ArrowLeft className="w-5 h-5" /></>
              )}
            </button>
          </div>

          {feedback === 'revealed' && currentQ && (
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-400/40 text-center">
              <p className="text-sm text-white/70 mb-1">الإجابة الصحيحة:</p>
              <p className="text-3xl font-black text-red-300 font-display">{toArabicNumber(currentQ.answer)}</p>
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

      {phase !== 'intro' && (
        <SorobanaCompanion
          isSpeaking={sorobana.isSpeaking}
          variant="pointing"
          sizeOverride={150}
          offsetBottom="8rem"
          clickThrough={true}
        />
      )}
    </div>
  );
}

export default AnzanScreen;