import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Play, Zap, Trophy, RotateCcw } from 'lucide-react';
import { ANZAN_SEQUENCE } from '@/data';

interface AnzanScreenProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
  burst: (x?: number, y?: number) => void;
}

type Phase = 'idle' | 'flashing' | 'answer' | 'result';

export function AnzanScreen({ onBack, playSound, onXP, burst }: AnzanScreenProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [flashIndex, setFlashIndex] = useState(-1);
  const [userAnswer, setUserAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const total = ANZAN_SEQUENCE.reduce((a, b) => a + b, 0);

  const startGame = useCallback(() => {
    setPhase('flashing');
    setFlashIndex(-1);
    setUserAnswer('');
    playSound('click');
  }, [playSound]);

  useEffect(() => {
    if (phase !== 'flashing') return;
    if (flashIndex >= ANZAN_SEQUENCE.length) {
      setPhase('answer');
      return;
    }
    const timer = setTimeout(() => {
      if (flashIndex >= 0) playSound('bead');
      setFlashIndex((prev) => prev + 1);
    }, flashIndex === -1 ? 600 : 900);
    return () => clearTimeout(timer);
  }, [phase, flashIndex, playSound]);

  const submitAnswer = () => {
    const answer = parseInt(userAnswer, 10);
    const isCorrect = answer === total;
    setCorrect(isCorrect);
    setPhase('result');
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

  const currentNumber = flashIndex >= 0 && flashIndex < ANZAN_SEQUENCE.length ? ANZAN_SEQUENCE[flashIndex] : null;

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">التصور الذهني</h2>
          <p className="text-sm text-white/50 font-body">شاهد الأرقام تومض وجمعها بذهنك</p>
        </div>
      </div>

      {/* Score */}
      <div className="flex gap-3 mb-5">
        <div className="badge bg-electric-500/15 border-electric-400/20">
          <Zap className="w-4 h-4 text-electric-300" />
          <span className="text-electric-200 text-sm">الجولة {round + 1}</span>
        </div>
        <div className="badge bg-gold-400/15 border-gold-400/20">
          <Trophy className="w-4 h-4 text-gold-300" />
          <span className="text-gold-200 text-sm">نقاط: {score}</span>
        </div>
      </div>

      {/* Game area */}
      <div className="glass-card p-6 sm:p-10 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background grid */}
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
                ستظهر أرقام بسرعة على الشاشة. اجمعها بذهنك باستخدام تخيل السوروبان، ثم اكتب الإجابة!
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
                  {currentNumber}
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
                {ANZAN_SEQUENCE.map((_, i) => (
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
                onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                className="w-48 text-5xl font-extrabold font-display text-center bg-white/10 border-2 border-purple-400/30 rounded-2xl py-4 text-white focus:outline-none focus:border-purple-400/60 transition-colors mb-5"
                placeholder="؟"
              />
              <br />
              <button onClick={submitAnswer} disabled={!userAnswer} className="btn-primary disabled:opacity-40">
                تأكيد الإجابة
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
                  <p className="text-white/60 font-body mb-1">الإجابة الصحيحة: {total}</p>
                  <p className="text-gold-300 font-bold mb-5">+25 XP</p>
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
                  <p className="text-white/60 font-body mb-1">الإجابة الصحيحة: {total}</p>
                  <p className="text-white/40 font-body text-sm mb-5">إجابتك: {userAnswer || '—'}</p>
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
