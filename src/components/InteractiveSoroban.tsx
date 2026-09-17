import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Hand } from 'lucide-react';

interface InteractiveSorobanProps {
  onBack: () => void;
  playSound: (type: 'click' | 'bead' | 'whoosh') => void;
  onXP: (amount: number) => void;
}

const RODS = 5;
const PLACE_LABELS = ['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف'];
const PLACE_VALUES = [1, 10, 100, 1000, 10000];

type RodState = { upper: boolean; lower: number };

const initialState = (): RodState[] =>
  Array.from({ length: RODS }, () => ({ upper: false, lower: 0 }));

export function InteractiveSoroban({ onBack, playSound, onXP }: InteractiveSorobanProps) {
  const [rods, setRods] = useState<RodState[]>(initialState);

  const toggleUpper = useCallback((rodIndex: number) => {
    setRods((prev) => {
      const next = [...prev];
      next[rodIndex] = { ...next[rodIndex], upper: !next[rodIndex].upper };
      return next;
    });
    playSound('bead');
  }, [playSound]);

  const incrementLower = useCallback((rodIndex: number) => {
    setRods((prev) => {
      const next = [...prev];
      const current = next[rodIndex].lower;
      next[rodIndex] = { ...next[rodIndex], lower: current >= 4 ? 0 : current + 1 };
      return next;
    });
    playSound('bead');
  }, [playSound]);

  const reset = useCallback(() => {
    setRods(initialState());
    playSound('whoosh');
  }, [playSound]);

  const totalValue = rods.reduce((sum, rod, i) => {
    const rodValue = (rod.upper ? 5 : 0) + rod.lower;
    return sum + rodValue * PLACE_VALUES[RODS - 1 - i];
  }, 0);

  const perRodValues = rods.map((rod) => (rod.upper ? 5 : 0) + rod.lower);

  return (
    <div className="px-3 sm:px-6 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">السوروبان التفاعلي</h2>
            <p className="text-sm text-white/50 font-body">المس الخرزات لتحريكها وشاهد القيمة</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="btn-primary !py-2.5 !px-4 !text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          تصفير
        </motion.button>
      </div>

      {/* Total value display */}
      <motion.div
        key={totalValue}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card p-5 mb-5 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-electric-500/10 to-emerald2-500/10" />
        <div className="relative">
          <p className="text-sm text-white/50 font-body mb-1">القيمة الإجمالية</p>
          <motion.p
            key={totalValue}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-5xl sm:text-6xl font-extrabold font-display shimmer-text"
          >
            {totalValue.toLocaleString('ar-EG')}
          </motion.p>
        </div>
      </motion.div>

      {/* Soroban frame */}
      <div className="glass-card p-4 sm:p-8 mb-5">
        <div className="bg-gradient-to-b from-amber-950/40 to-amber-900/20 rounded-2xl p-3 sm:p-6 border-2 border-amber-700/20">
          {/* Top frame bar */}
          <div className="h-3 rounded-full bg-gradient-to-r from-amber-700/40 via-amber-600/40 to-amber-700/40 mb-1" />

          {/* Rods */}
          <div className="flex justify-center gap-1 sm:gap-3 md:gap-5">
            {rods.map((rod, rodIndex) => (
              <div key={rodIndex} className="flex flex-col items-center">
                {/* Upper deck */}
                <div className="relative w-10 sm:w-14 h-14 sm:h-20 flex flex-col items-center justify-start pt-1">
                  {/* Rail */}
                  <div
                    className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-600/30 to-amber-700/20 rounded-full"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                  />
                  {/* Upper bead */}
                  <motion.button
                    onClick={() => toggleUpper(rodIndex)}
                    whileTap={{ scale: 0.85 }}
                    animate={{ y: rod.upper ? [0, 28] : [28, 0] }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 border-2 border-gold-200/50 shadow-lg cursor-pointer touch-manipulation"
                    style={{ boxShadow: rod.upper ? '0 4px 12px rgba(251,191,36,0.4)' : '0 2px 6px rgba(251,191,36,0.2)' }}
                    aria-label={`خرزة علوية - قضيب ${rodIndex + 1}`}
                  >
                    <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
                  </motion.button>
                </div>

                {/* Reckoning bar (divider) */}
                <div className="w-9 sm:w-13 h-[4px] sm:h-[5px] rounded-full bg-gradient-to-r from-purple-500 via-electric-500 to-purple-500 shadow-md shadow-purple-500/50 my-0.5" />

                {/* Lower deck */}
                <div className="relative w-10 sm:w-14 h-28 sm:h-36 flex flex-col-reverse items-center justify-start pb-1 gap-0.5">
                  {/* Rail */}
                  <div
                    className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-700/20 to-amber-600/30 rounded-full"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                  />
                  {/* Lower beads - 4 beads, move up when activated */}
                  {[0, 1, 2, 3].map((beadIdx) => {
                    const isActive = beadIdx < rod.lower;
                    return (
                      <motion.button
                        key={beadIdx}
                        onClick={() => incrementLower(rodIndex)}
                        whileTap={{ scale: 0.85 }}
                        animate={{ y: isActive ? [0, -28] : [-28, 0] }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-electric-400 to-electric-600 border-2 border-electric-300/50 shadow-lg cursor-pointer touch-manipulation"
                        style={{ boxShadow: isActive ? '0 4px 12px rgba(59,130,246,0.4)' : '0 2px 6px rgba(59,130,246,0.2)' }}
                        aria-label={`خرزة سفلية ${beadIdx + 1} - قضيب ${rodIndex + 1}`}
                      >
                        <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Place label */}
                <div className="mt-2 text-center">
                  <p className="text-[10px] sm:text-xs font-bold text-white/40 font-body">
                    {PLACE_LABELS[RODS - 1 - rodIndex]}
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-white/70 font-display">
                    {perRodValues[rodIndex].toLocaleString('ar-EG')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom frame bar */}
          <div className="h-3 rounded-full bg-gradient-to-r from-amber-700/40 via-amber-600/40 to-amber-700/40 mt-1" />
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4 flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-electric-500 flex items-center justify-center shrink-0"
        >
          <Hand className="w-5 h-5 text-white" />
        </motion.div>
        <div className="text-sm text-white/60 font-body leading-relaxed">
          <p className="text-white/80 font-bold mb-0.5">كيف تستخدم السوروبان؟</p>
          <p>المس الخرزة الذهبية العلوية لتحريكها لأسفل (قيمتها ٥). المس الخرزات الزرقاء السفلية لتحريكها للأعلى (قيمة كل واحدة ١). اضغط زر «تصفير» لإعادة الكل للوضع الأولي.</p>
        </div>
      </motion.div>

      {/* Bead value legend */}
      <div className="flex gap-3 mt-4 justify-center flex-wrap">
        <div className="badge bg-gold-400/15 border-gold-400/25">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gold-300 to-gold-500" />
          <span className="text-gold-200 text-xs">خرزة علوية = ٥</span>
        </div>
        <div className="badge bg-electric-500/15 border-electric-400/25">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-electric-400 to-electric-600" />
          <span className="text-electric-200 text-xs">خرزة سفلية = ١</span>
        </div>
      </div>
    </div>
  );
}
