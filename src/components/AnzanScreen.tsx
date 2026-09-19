import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Play, Zap, Trophy, RotateCcw, Settings2, Sparkles, Brain, Heart } from 'lucide-react';

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

interface AnzanScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

type Phase = 'idle' | 'flashing' | 'answer' | 'result' | 'retry';
type Speed = 'slow' | 'medium' | 'fast';
type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';

const SPEED_MS: Record<Speed, number> = { slow: 1500, medium: 1000, fast: 700 };
const SPEED_LABELS: Record<Speed, string> = { slow: 'بطيء', medium: 'متوسط', fast: 'سريع' };

// ═══════════════════════════════════════════════════════════════
// مستويات الأنزان الجديدة — مرتبطة بالدروس 3-8
// ═══════════════════════════════════════════════════════════════
const LEVEL_LABELS: Record<Level, string> = {
  beginner: '🌱 مبتدئ — درس ٣ (مباشر)',
  intermediate: '⭐ متوسط — درس ٤ (الجدة ٥)',
  advanced: '🔥 متقدم — درس ٥ (عملاق ١٠)',
  expert: '💎 خبير — درس ٦ (المركب)',
  master: '👑 محترف — دروس ٧-٨ (سلاسل وأنزان)',
};

const LEVEL_ORDER: Level[] = ['beginner', 'intermediate', 'advanced', 'expert', 'master'];

function getLevelIndex(level: Level): number {
  return LEVEL_ORDER.indexOf(level);
}

function getEasierLevel(level: Level): Level {
  const idx = getLevelIndex(level);
  if (idx <= 0) return 'beginner';
  return LEVEL_ORDER[idx - 1];
}

const ANZAN_STORAGE_KEY = 'soroban_anzan_stats';

interface AnzanStats {
  highScore: number;
  totalRounds: number;
  totalCorrect: number;
}

function loadAnzanStats(): AnzanStats {
  try {
    const saved = localStorage.getItem(ANZAN_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        highScore: typeof parsed.highScore === 'number' ? parsed.highScore : 0,
        totalRounds: typeof parsed.totalRounds === 'number' ? parsed.totalRounds : 0,
        totalCorrect: typeof parsed.totalCorrect === 'number' ? parsed.totalCorrect : 0,
      };
    }
  } catch { /* ignore */ }
  return { highScore: 0, totalRounds: 0, totalCorrect: 0 };
}

function saveAnzanStats(stats: AnzanStats) {
  try {
    localStorage.setItem(ANZAN_STORAGE_KEY, JSON.stringify(stats));
  } catch { /* ignore */ }
}

interface Operation {
  value: number;
  operator: '+' | '-';
}

interface SequenceData {
  operations: Operation[];
  expectedResult: number;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ═══════════════════════════════════════════════════════════════
// توليد التسلسل — محدّث ليتوافق مع قواعد الدروس الجديدة
// ═══════════════════════════════════════════════════════════════
function generateSequence(level: Level): SequenceData {
  const operations: Operation[] = [];

  // 🌱 مبتدئ — درس ٣ (المباشر): ٣ عمليات آحاد، مجموع لا يتجاوز ٩
  if (level === 'beginner') {
    let current = 0;
    for (let i = 0; i < 3; i++) {
      const remaining = 9 - current;
      const max = Math.min(4, remaining);
      if (max < 1) {
        // اضطرار: طرح
        const v = randomInt(1, Math.min(3, current));
        operations.push({ value: v, operator: '-' });
        current -= v;
        continue;
      }
      const value = randomInt(1, max);
      operations.push({ value, operator: '+' });
      current += value;
    }
    return { operations, expectedResult: current };
  }

  // ⭐ متوسط — درس ٤ (الجدة ٥): عمليات تجبر استخدام أصدقاء ٥
  if (level === 'intermediate') {
    let current = 0;
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        // ابدأ بـ 4 أو 5 لتسهيل دخول الجدة لاحقاً
        const value = randomInt(4, 5);
        operations.push({ value, operator: '+' });
        current += value;
        continue;
      }
      // نجبر إضافة أو طرح يستخدم الجدة 5
      const canSubtract = current >= 1;
      const useSubtract = canSubtract && Math.random() < 0.5;
      if (useSubtract) {
        // اطرح رقماً بحيث الناتج يبقى في النطاق
        const maxSub = Math.min(4, current);
        const value = randomInt(1, maxSub);
        operations.push({ value, operator: '-' });
        current -= value;
      } else {
        // أضف رقماً يجبر استخدام صديق 5 (مثلاً إذا كان لدينا 4 ونضيف 4)
        const room = 9 - current;
        if (room >= 1) {
          const value = randomInt(1, Math.min(4, room));
          operations.push({ value, operator: '+' });
          current += value;
        } else {
          const v = randomInt(1, Math.min(3, current));
          operations.push({ value: v, operator: '-' });
          current -= v;
        }
      }
    }
    return { operations, expectedResult: current };
  }

  // 🔥 متقدم — درس ٥ (عملاق ١٠): ٣ عمليات آحاد تتجاوز 9 للإجبار على +10
  if (level === 'advanced') {
    let current = 0;
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        const value = randomInt(6, 9);
        operations.push({ value, operator: '+' });
        current += value;
        continue;
      }
      const canSubtract = current >= 1;
      const useSubtract = canSubtract && Math.random() < 0.5;
      if (useSubtract) {
        const value = randomInt(1, Math.min(5, current));
        operations.push({ value, operator: '-' });
        current -= value;
      } else {
        // اجبر تجاوز 9 → استخدام عملاق 10
        const value = randomInt(3, 9);
        operations.push({ value, operator: '+' });
        current += value;
      }
    }
    return { operations, expectedResult: current };
  }

  // 💎 خبير — درس ٦ (المركب): ٤ عمليات مركبة بآحاد
  if (level === 'expert') {
    let current = 0;
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        const value = randomInt(4, 8);
        operations.push({ value, operator: '+' });
        current += value;
        continue;
      }
      const canSubtract = current >= 1;
      const useSubtract = canSubtract && Math.random() < 0.45;
      if (useSubtract) {
        const value = randomInt(1, Math.min(6, current));
        operations.push({ value, operator: '-' });
        current -= value;
      } else {
        // اجبر القاعدة المركبة: أضف 6-9
        const value = randomInt(6, 9);
        operations.push({ value, operator: '+' });
        current += value;
      }
    }
    return { operations, expectedResult: current };
  }

  // 👑 محترف — دروس ٧-٨ (سلاسل بمنزلتين وثلاث)
  let current = 0;
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      const value = randomInt(10, 40);
      operations.push({ value, operator: '+' });
      current += value;
      continue;
    }
    const canSubtract = current >= 10;
    const canAdd = current <= 89;
    const useSubtract = canSubtract && (Math.random() < 0.5 || !canAdd);
    if (useSubtract) {
      const value = randomInt(5, Math.min(20, current));
      operations.push({ value, operator: '-' });
      current -= value;
    } else if (canAdd) {
      const value = randomInt(5, Math.min(20, 99 - current));
      operations.push({ value, operator: '+' });
      current += value;
    } else {
      const v = randomInt(5, Math.min(15, current));
      operations.push({ value: v, operator: '-' });
      current -= v;
    }
  }
  return { operations, expectedResult: current };
}

export function AnzanScreen({ onBack, playSound, onXP, burst }: AnzanScreenProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [flashIndex, setFlashIndex] = useState(-1);
  const [userAnswer, setUserAnswer] = useState('');
  const [lastAttemptCorrect, setLastAttemptCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [level, setLevel] = useState<Level>('beginner');
  const [speed, setSpeed] = useState<Speed>('slow');
  const [showSettings, setShowSettings] = useState(false);

  const [attempt, setAttempt] = useState(1);
  const [levelWasEased, setLevelWasEased] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const [sequence, setSequence] = useState<SequenceData>(() => generateSequence('beginner'));

  const total = sequence.expectedResult;
  const flashDuration = SPEED_MS[speed];

  const runningTotal = useMemo(() => {
    if (flashIndex < 0) return 0;
    let acc = 0;
    for (let i = 0; i <= flashIndex && i < sequence.operations.length; i++) {
      const op = sequence.operations[i];
      acc += op.operator === '+' ? op.value : -op.value;
    }
    return acc;
  }, [sequence, flashIndex]);

  const startGame = useCallback((resetAttempts: boolean = true) => {
    const newSeq = generateSequence(level);
    setSequence(newSeq);
    setPhase('flashing');
    setFlashIndex(-1);
    setUserAnswer('');
    if (resetAttempts) {
      setAttempt(1);
      setLevelWasEased(false);
      setShowAnswer(false);
    }
    playSound('click');
  }, [playSound, level]);

  const replaySequence = useCallback((slowerSpeed: boolean) => {
    setPhase('flashing');
    setFlashIndex(-1);
    setUserAnswer('');
    setShowAnswer(false);
    if (slowerSpeed) {
      setSpeed('slow');
    }
    playSound('click');
  }, [playSound]);

  useEffect(() => {
    if (phase !== 'flashing') return;
    if (flashIndex >= sequence.operations.length) {
      setPhase('answer');
      return;
    }
    const timer = setTimeout(() => {
      if (flashIndex >= 0) playSound('bead');
      setFlashIndex((prev) => prev + 1);
    }, flashIndex === -1 ? 800 : flashDuration);
    return () => clearTimeout(timer);
  }, [phase, flashIndex, playSound, sequence, flashDuration]);

  const submitAnswer = () => {
    const answer = parseInt(userAnswer, 10);
    const isCorrect = answer === total;
    setLastAttemptCorrect(isCorrect);

    if (isCorrect) {
      playSound('success');
      setScore((s) => s + 1);
      onXP(attempt === 1 ? 25 : 10);
      burst(0.5, 0.4);
      setPhase('result');

      const stats = loadAnzanStats();
      saveAnzanStats({
        highScore: score + 1 > stats.highScore ? score + 1 : stats.highScore,
        totalRounds: stats.totalRounds + 1,
        totalCorrect: stats.totalCorrect + 1,
      });
    } else {
      playSound('error');

      if (attempt === 1) {
        setAttempt(2);
        setShowAnswer(false);
        setPhase('retry');
      } else {
        setShowAnswer(true);
        const easierLevel = getEasierLevel(level);
        if (easierLevel !== level) {
          setLevel(easierLevel);
          setLevelWasEased(true);
        }
        setPhase('result');

        const stats = loadAnzanStats();
        saveAnzanStats({
          highScore: stats.highScore,
          totalRounds: stats.totalRounds + 1,
          totalCorrect: stats.totalCorrect,
        });
      }
    }
  };

  const handleRetry = () => {
    setSpeed('slow');
    replaySequence(true);
  };

  const nextRound = () => {
    setRound((r) => r + 1);
    startGame(true);
  };

  const currentOp = flashIndex >= 0 && flashIndex < sequence.operations.length ? sequence.operations[flashIndex] : null;

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">التصور الذهني</h2>
          <p className="text-sm text-white/50 font-body">تخيل الخرزات في عقلك واجمع/اطرح الأرقام</p>
        </div>
        {phase === 'idle' && (
          <button onClick={() => { playSound('click'); setShowSettings((s) => !s); }} className="btn-ghost !px-3 !py-2" aria-label="الإعدادات">
            <Settings2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="badge bg-electric-500/15 border-electric-400/20">
          <Zap className="w-4 h-4 text-electric-300" />
          <span className="text-electric-200 text-sm">الجولة {toArabicNumber(round + 1)}</span>
        </div>
        <div className="badge bg-gold-400/15 border-gold-400/20">
          <Trophy className="w-4 h-4 text-gold-300" />
          <span className="text-gold-200 text-sm">نقاط: {toArabicNumber(score)}</span>
        </div>
        <div className="badge bg-purple-500/15 border-purple-400/20">
          <Brain className="w-4 h-4 text-purple-300" />
          <span className="text-purple-200 text-sm">{LEVEL_LABELS[level]}</span>
        </div>
      </div>

      <AnimatePresence>
        {showSettings && phase === 'idle' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-4 sm:p-5 mb-4 overflow-hidden"
          >
            <div className="mb-4">
              <p className="text-sm text-white/60 font-body mb-2">المستوى (مرتبط بالدروس)</p>
              <div className="grid grid-cols-1 gap-2">
                {(['beginner', 'intermediate', 'advanced', 'expert', 'master'] as Level[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { playSound('click'); setLevel(l); }}
                    className={`py-2 px-3 rounded-xl font-bold font-body text-xs transition-all text-right ${
                      level === l ? 'bg-gradient-to-br from-emerald2-500 to-electric-500 text-white shadow-lg' : 'bg-white/10 text-white/60 hover:bg-white/15'
                    }`}
                  >
                    {LEVEL_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-white/60 font-body mb-2">سرعة العرض</p>
              <div className="flex gap-2">
                {(['slow', 'medium', 'fast'] as Speed[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => { playSound('click'); setSpeed(s); }}
                    className={`flex-1 py-2 rounded-xl font-bold font-body transition-all ${
                      speed === s ? 'bg-gradient-to-br from-emerald2-500 to-electric-500 text-white shadow-lg' : 'bg-white/10 text-white/60 hover:bg-white/15'
                    }`}
                  >
                    {SPEED_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card p-6 sm:p-10 min-h-[360px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid bg-[size:20px_20px] opacity-30" />

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative text-center">
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald2-500 to-electric-500 flex items-center justify-center shadow-xl shadow-emerald2-500/40 mx-auto mb-5">
                <Eye className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-white/60 font-body mb-5 max-w-sm mx-auto">
                ستظهر {toArabicNumber(sequence.operations.length)} عمليات بسرعة {SPEED_LABELS[speed]}ة.
                تخيل المعداد في عقلك واحسب الناتج!
              </p>
              <button onClick={() => startGame(true)} className="btn-primary">
                <Play className="w-5 h-5" /> ابدأ التحدي
              </button>
            </motion.div>
          )}

          {phase === 'flashing' && (
            <motion.div key="flashing" className="relative flex flex-col items-center w-full">
              {currentOp !== null ? (
                <>
                  <motion.div
                    key={flashIndex}
                    initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className={`text-7xl sm:text-8xl font-extrabold font-display ${
                      currentOp.operator === '+' ? 'text-emerald2-300 text-glow-blue' : 'text-red-300'
                    }`}
                  >
                    {currentOp.operator === '+' ? '+' : '−'} {toArabicNumber(currentOp.value)}
                  </motion.div>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-body text-gold-300 mt-4">
                    المجموع الحالي: {toArabicNumber(runningTotal)}
                  </motion.p>
                </>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-body text-white/50">استعد...</motion.p>
              )}
              <div className="flex gap-1.5 mt-6 flex-wrap justify-center">
                {sequence.operations.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all ${
                    i < flashIndex ? 'bg-emerald2-400' : i === flashIndex ? 'bg-white scale-150' : 'bg-white/15'
                  }`} />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'answer' && (
            <motion.div key="answer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="relative text-center w-full">
              <div className="mb-4 p-4 rounded-2xl bg-purple-500/10 border border-purple-400/20">
                <Sparkles className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                <p className="text-white/70 font-body text-sm">تخيل المعداد في عقلك، واحسب الناتج</p>
              </div>
              <p className="text-white/60 font-body mb-4">
                {attempt === 1 ? 'ما الناتج؟' : 'المحاولة الثانية — ما الناتج؟'}
              </p>
              <input
                type="number"
                autoFocus
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                className="w-48 text-5xl font-extrabold font-display text-center bg-white/10 border-2 border-purple-400/30 rounded-2xl py-4 text-white focus:outline-none focus:border-purple-400/60 transition-colors mb-5"
                placeholder="؟"
              />
              <br />
              <button onClick={submitAnswer} disabled={!userAnswer} className="btn-primary disabled:opacity-40">تحقق</button>
            </motion.div>
          )}

          {phase === 'retry' && (
            <motion.div key="retry" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative text-center w-full">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-20 h-20 rounded-3xl bg-gold-400/20 border-2 border-gold-400/40 flex items-center justify-center mx-auto mb-5">
                <Heart className="w-10 h-10 text-gold-300" />
              </motion.div>
              <p className="text-2xl font-extrabold font-display text-gold-300 mb-2">قريب جداً! 💪</p>
              <p className="text-white/60 font-body mb-5 max-w-sm mx-auto">
                لا بأس، دعنا نعيد عرض الأرقام معاً بسرعة أبطأ. ركّز جيداً!
              </p>
              <button onClick={handleRetry} className="btn-primary">
                <RotateCcw className="w-5 h-5" /> أعد العرض
              </button>
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 250, damping: 15 }} className="relative text-center">
              {lastAttemptCorrect ? (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} className="text-7xl mb-3">
                    <Trophy className="w-20 h-20 text-gold-400 mx-auto" />
                  </motion.div>
                  <p className="text-3xl font-extrabold font-display text-emerald2-300 mb-2">
                    {attempt === 1 ? 'رائع! 🎉' : 'أحسنت! المحاولة الثانية 👏'}
                  </p>
                  <p className="text-white/60 font-body mb-1">الإجابة الصحيحة: {toArabicNumber(total)}</p>
                  <p className="text-gold-300 font-bold mb-5">
                    +{toArabicNumber(attempt === 1 ? 25 : 10)} XP
                  </p>
                </>
              ) : (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-3xl bg-electric-500/20 border-2 border-electric-400/30 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-10 h-10 text-electric-300" />
                  </motion.div>
                  <p className="text-2xl font-extrabold font-display text-electric-300 mb-2">لا بأس! 💙</p>
                  <p className="text-white/60 font-body mb-1">الإجابة الصحيحة: <span className="font-bold text-white">{toArabicNumber(total)}</span></p>
                  <p className="text-white/40 font-body text-sm mb-3">إجابتك: {userAnswer ? toArabicNumber(userAnswer) : '—'}</p>
                  {levelWasEased && (
                    <p className="text-gold-300 font-body text-sm mb-3">
                      🌱 سنتدرب أكثر في مستوى أسهل
                    </p>
                  )}
                </>
              )}
              <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 font-body mb-1">العمليات التي ظهرت:</p>
                <p className="text-lg font-bold text-white font-display" dir="ltr">
                  {sequence.operations.map((op) => `${op.operator === '+' ? '+' : '−'}${toArabicNumber(op.value)}`).join(' ')}
                </p>
              </div>
              <button onClick={nextRound} className="btn-primary">
                <RotateCcw className="w-5 h-5" /> الجولة التالية
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnzanScreen;