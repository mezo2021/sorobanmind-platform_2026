import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Calculator } from 'lucide-react';
import { cn } from '@/utils/cn';

interface InteractiveSorobanProps {
  onBack: () => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
  onXP: (amount: number) => void;
}

const COLUMNS = 5;

function toDigits(value: number, columns: number): number[] {
  const str = Math.abs(value).toString().padStart(columns, '0');
  return str.split('').map(Number);
}

function Column({
  digit,
  index,
  onUpperClick,
  onLowerClick,
  playSound,
}: {
  digit: number;
  index: number;
  onUpperClick: () => void;
  onLowerClick: (i: number) => void;
  playSound: (type: 'click' | 'success' | 'error' | 'bead' | 'whoosh' | 'levelup') => void;
}) {
  const upperActive = digit >= 5;
  const lowerActiveCount = digit % 5;
  const lowerInactiveCount = 4 - lowerActiveCount;

  const beadSize = "w-7 h-7 sm:w-8 sm:h-8";
  const lowerActiveStyle = "bg-gradient-to-b from-sky-300 to-sky-500 border border-sky-100 shadow-[0_0_8px_rgba(56,189,248,0.7)]";
  const lowerInactiveStyle = "bg-gradient-to-b from-blue-800 to-blue-950 border border-blue-600/80";
  const upperActiveStyle = "bg-gradient-to-b from-yellow-300 to-amber-500 border border-yellow-100 shadow-[0_0_8px_rgba(251,191,36,0.7)]";
  const upperInactiveStyle = "bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-500/80";

  return (
    <div className="flex flex-col items-center">
      {/* Upper deck */}
      <div className="relative w-10 sm:w-12 h-[60px] sm:h-[68px]">
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-amber-800/70" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />
        <motion.button
          onClick={onUpperClick}
          animate={{ y: upperActive ? 26 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={cn(
            "absolute top-1 left-1/2 -translate-x-1/2 rounded-full z-10 cursor-pointer",
            beadSize,
            upperActive ? upperActiveStyle : upperInactiveStyle
          )}
          aria-label="الخرزة العلوية"
        />
      </div>

      {/* Lower deck */}
      <div className="relative w-10 sm:w-12 h-[132px] sm:h-[148px] flex flex-col justify-between py-1">
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-amber-800/70" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />

        {/* Active beads */}
        <div className="relative z-10 flex flex-col gap-[3px] items-center mt-1.5">
          {Array.from({ length: lowerActiveCount }).map((_, i) => (
            <motion.button
              key={`a-${index}-${i}`}
              onClick={() => onLowerClick(i + 1)}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className={cn("rounded-full cursor-pointer", beadSize, lowerActiveStyle)}
              aria-label={`خرزة سفلية ${i + 1}`}
            />
          ))}
        </div>

        {/* Inactive beads */}
        <div className="relative z-10 flex flex-col gap-[3px] items-center mb-1.5">
          {Array.from({ length: lowerInactiveCount }).map((_, i) => {
            const beadNumber = lowerActiveCount + i + 1;
            return (
              <motion.button
                key={`i-${index}-${i}`}
                onClick={() => onLowerClick(beadNumber)}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className={cn("rounded-full cursor-pointer", beadSize, lowerInactiveStyle)}
                aria-label={`خرزة سفلية ${beadNumber}`}
              />
            );
          })}
        </div>
      </div>

      {/* Column label */}
      <div className="mt-2 text-xs text-white/40 font-bold">
        {['آحاد', 'عشرات', 'مئات', 'آلاف', 'عشرات الآلاف'][index]}
      </div>
    </div>
  );
}

export function InteractiveSoroban({ onBack, playSound, onXP }: InteractiveSorobanProps) {
  const [digits, setDigits] = useState<number[]>(() => Array(COLUMNS).fill(0));

  const totalValue = parseInt(digits.join(''), 10) || 0;

  const handleUpperClick = (col: number) => {
    playSound('click');
    setDigits((prev) => {
      const next = [...prev];
      next[col] = next[col] >= 5 ? next[col] - 5 : next[col] + 5;
      return next;
    });
  };

  const handleLowerClick = (col: number, beadNumber: number) => {
    playSound('bead');
    setDigits((prev) => {
      const next = [...prev];
      const current = next[col] % 5;
      // If clicked bead is already active, deactivate it and those above
      // Otherwise activate up to that bead
      next[col] = beadNumber <= current ? (next[col] - current) + (beadNumber - 1) : (next[col] - current) + beadNumber;
      return next;
    });
  };

  const handleReset = () => {
    playSound('whoosh');
    setDigits(Array(COLUMNS).fill(0));
  };

  return (
    <div className="px-3 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { playSound('click'); onBack(); }} className="btn-ghost !px-3 !py-2">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">السوروبان التفاعلي</h2>
          <p className="text-sm text-white/50 font-body">المس الخرزات لتكوين الأرقام</p>
        </div>
      </div>

      {/* Value display */}
      <div className="glass-card p-5 sm:p-6 mb-4 text-center">
        <p className="text-white/50 text-sm mb-1">القيمة الإجمالية</p>
        <p className="text-5xl sm:text-6xl font-extrabold font-display text-electric-300 tabular-nums">
          {totalValue}
        </p>
      </div>

      {/* Soroban */}
      <div className="glass-card p-4 sm:p-6 mb-4 overflow-x-auto">
        <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-max">
          {digits.map((digit, i) => (
            <Column
              key={i}
              index={i}
              digit={digit}
              playSound={playSound}
              onUpperClick={() => handleUpperClick(i)}
              onLowerClick={(bead) => handleLowerClick(i, bead)}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button onClick={handleReset} className="btn-primary flex-1">
          <RotateCcw className="w-5 h-5" /> تصفير
        </button>
      </div>
    </div>
  );
}
