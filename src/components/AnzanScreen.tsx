import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Play, Zap, Trophy, RotateCcw, Settings2 } from 'lucide-react';

/** تحويل الأرقام إلى أرقام عربية */
function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

interface AnzanScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

type Phase = 'idle' | 'flashing' | 'answer' | 'result';
type Speed = 'slow' | 'medium' | 'fast';

const SPEED_MS: Record<Speed, number> = {
  slow: 1400,
  medium: 900,
  fast: 550,
};

const SPEED_LABELS: Record<Speed, string> = {
  slow: 'بطيء',
  medium: 'متوسط',
  fast: 'سريع',
};

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
  } catch {
    /* ignore */
  }
  return { highScore: 0, totalRounds: 0, totalCorrect: 0 };
}

function saveAnzanStats(stats: AnzanStats) {
  try {
    localStorage.setItem(ANZAN_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    /* ignore */
  }
}

function generateSequence(count: number): number[] {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 9) + 1);
}

export function AnzanScreen({ onBack, playSound, onXP, burst }: AnzanScreenProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [flashIndex, setFlashIndex] = useState(-1);
  const [userAnswer, setUserAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const [numCount, setNumCount] = useState(3);
  const [speed, setSpeed] = useState<Speed>('medium');
  const [showSettings, setShowSettings] = useState(false);

  const [sequence, setSequence] = useState<number[]>(() => generateSequence(3));

  const total = useMemo(() => sequence.reduce((a, b) => a + b, 0), [sequence]);
  const flashDuration = SPEED_MS[speed];

  const startGame = useCallback(() => {
    setSequence(generateSequence(numCount));
    setPhase('flashing');
    setFlashIndex(-1);
    setUserAnswer('');
    playSound('click');
  }, [playSound, numCount]);

  useEffect(() => {
    if (phase !== 'flashing') return;
    if (flashIndex >= sequence.length) {
      setPhase('answer');
      return;
    }
    const timer = setTimeout(() => {
      if (flashIndex >= 0) playSound('bead');
      setFlashIndex((prev) => prev + 1);
    }, flashIndex === -1 ? 600 : flashDuration);
    return () => clearTimeout(timer);
  }, [phase, flashIndex, playSound, sequence, flashDuration]);

  const submitAnswer = () => {
    const answer = parseInt(userAnswer, 10);
    const isCorrect = answer === total;
    setCorrect(isCorrect);
    setPhase('result');

    // حفظ الإحصائيات
    const stats = loadAnzanStats();
    const newStats: AnzanStats = {
      highScore: isCorrect && score + 1 > stats.highScore ? score + 1 : stats.highScore,
      totalRounds: stats.totalRounds + 1,
      totalCorrect: stats.totalCorrect + (isCorrect ? 1 : 0),
    };
    saveAnzanStats(newStats);

    if (isCorrect) {
      playSound('success');
      setScore((s) => s + 1);
      onXP(25);
      burst(0.5, 0.4);
    } else {
      playSound('error');
    }
  };

  const nextRound = () => {
    setRound((r) => r + 1);
    startGame();
  };

  const currentNumber = flashIndex >= 0 && flashIndex < sequence.length ? sequence[flashIndex] : null;

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">التصور الذهني</h2>
          <p className="text-sm text-white/50 font-body">شاهد الأرقام تومض وجمعها بذهنك</p>
        </div>
        {phase === 'idle' && (
          <button
            onClick={() => { playSound('click'); setShowSettings((s) => !s); }}
            className="btn-ghost !px-3 !py-2"
            aria-label="إعدادات التحدي"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Score */}
      <div className="flex gap-3 mb-5">
        <div className="badge bg-electric-500/15 border-electric-400/20">
          <Zap className="w-4 h-4 text-electric-300" />
          <span className="text-electric-200 text-sm">
            الجولة {toArabicNumber(round + 1)}
          </span>
        </div>
        <div className="badge bg-gold-400/15 border-gold-400/20">
          <Trophy className="w-4 h-4 text-gold-300" />
          <span className="text-gold-200 text-sm">
            نقاط: {toArabicNumber(score)}
          </span>
        </div>
      </div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && phase === 'idle' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-4 sm:p-5 mb-4 overflow-hidden"
          >
            <div className="mb-4">
              <p className="text-sm text-white/60 font-body mb-2">
                عدد الأرقام: <span className="text-white font-bold">{toArabicNumber(numCount)}</span>
              </p>
              <div className="flex gap-2">
                {[3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => { playSound('click'); setNumCount(n); }}
                    className={`flex-1 py-2 rounded-xl font-bold font-body transition-all ${
                      numCount === n
                        ? 'bg-gradient-to-br from-emerald2-500 to-electric-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/60 hover:bg-white/15'
                    }`}
                  >
                    {toArabicNumber(n)}
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
                      speed === s
                        ? 'bg-gradient-to-br from-emerald2-500 to-electric-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/60 hover:bg-white/15'
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

      {/* Game area */}
      <div className="glass-card p-6 sm:p-10 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid bg-[size:20px_20px] opacity-30" />

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative text-center"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald2-500 to-electric-500 flex items-center justify-center shadow-xl shadow-emerald2-500/40 mx-auto mb-5"
              >
                <Eye className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-white/60 font-body mb-5 max-w-sm mx-auto">
                ستظهر {toArabicNumber(numCount)} أرقام بسرعة {SPEED_LABELS[speed]}ة على الشاشة. اجمعها بذهنك باستخدام تخيل السوروبان، ثم اكتب الإجابة!
              </p>
              <button onClick={startGame} className="btn-primary">
                <Play className="w-5 h-5" /> ابدأ التحدي
              </button>
            </motion.div>
          )}

          {phase === 'flashing' && (
            <motion.div
              key="flashing"
              className="relative flex flex-col items-center"
            >
              {currentNumber !== null ? (
                <motion.div
                  key={flashIndex}
                  initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="text-8xl sm:text-9xl font-extrabold font-display text-glow-blue text-white"
                >
                  {toArabicNumber(currentNumber)}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-body text-white/50"
                >
                  استعد...
                </motion.p>
              )}
              <div className="flex gap-1.5 mt-6">
                {sequence.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${i < flashIndex ? 'bg-emerald2-400' : i === flashIndex ? 'bg-white scale-150' : 'bg-white/15'}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'answer' && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative text-center w-full"
            >
              <p className="text-white/60 font-body mb-4">ما المجموع؟</p>
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
              <button onClick={submitAnswer} disabled={!userAnswer} className="btn-primary disabled:opacity-40">
                تحقق
              </button>
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 15 }}
              className="relative text-center"
            >
              {correct ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    className="text-7xl mb-3"
                  >
                    <Trophy className="w-20 h-20 text-gold-400 mx-auto" />
                  </motion.div>
                  <p className="text-3xl font-extrabold font-display text-emerald2-300 mb-2">رائع!</p>
                  <p className="text-white/60 font-body mb-1">
                    الإجابة الصحيحة: {toArabicNumber(total)}
                  </p>
                  <p className="text-gold-300 font-bold mb-5">
                    +{toArabicNumber(25)} XP
                  </p>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                    className="w-20 h-20 rounded-3xl bg-red-500/20 border-2 border-red-400/30 flex items-center justify-center mx-auto mb-3"
                  >
                    <span className="text-4xl font-extrabold text-red-300">×</span>
                  </motion.div>
                  <p className="text-2xl font-extrabold font-display text-red-300 mb-2">حاول مرة أخرى</p>
                  <p className="text-white/60 font-body mb-1">
                    الإجابة الصحيحة: {toArabicNumber(total)}
                  </p>
                  <p className="text-white/40 font-body text-sm mb-5">
                    إجابتك: {userAnswer ? toArabicNumber(userAnswer) : '—'}
                  </p>
                </>
              )}
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
