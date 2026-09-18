import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SorobanProps {
  value: number;
  columns?: number;
  showLabels?: boolean;
  animate?: boolean;
  className?: string;
}

function toDigits(value: number, columns: number): number[] {
  const str = Math.abs(value).toString().padStart(columns, '0');
  return str.split('').map(Number);
}

function ColumnBeads({ digit, index, animate }: { digit: number; index: number; animate: boolean }) {
  const upperActive = digit >= 5;
  const lowerActiveCount = digit % 5;
  const lowerInactiveCount = 4 - lowerActiveCount;

  const beadSize = "w-6 h-6 sm:w-7 sm:h-7";
  const lowerActiveStyle = "bg-gradient-to-b from-sky-300 to-sky-500 border border-sky-100 shadow-[0_0_6px_rgba(56,189,248,0.6)]";
  const lowerInactiveStyle = "bg-gradient-to-b from-blue-800 to-blue-950 border border-blue-600/80";
  const upperActiveStyle = "bg-gradient-to-b from-yellow-300 to-amber-500 border border-yellow-100 shadow-[0_0_6px_rgba(251,191,36,0.6)]";
  const upperInactiveStyle = "bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-500/80";

  return (
    <div className="flex flex-col items-center">
      {/* Upper deck (heaven) */}
      <div className="relative w-9 sm:w-11 h-[56px] sm:h-[64px]">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-amber-800/70" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />
        <motion.div
          animate={{ y: upperActive ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={cn(
            "absolute top-1 left-1/2 -translate-x-1/2 rounded-full z-10",
            beadSize,
            upperActive ? upperActiveStyle : upperInactiveStyle
          )}
        />
      </div>

      {/* Lower deck (earth) */}
      <div className="relative w-9 sm:w-11 h-[124px] sm:h-[136px] flex flex-col justify-between py-1">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-amber-800/70" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />

        {/* Active beads (touch beam) */}
        <div className="relative z-10 flex flex-col gap-[3px] items-center mt-1.5">
          {Array.from({ length: lowerActiveCount }).map((_, i) => (
            <motion.div
              key={`a-${index}-${i}`}
              initial={animate ? { scale: 0.85, opacity: 0 } : false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className={cn("rounded-full", beadSize, lowerActiveStyle)}
            />
          ))}
        </div>

        {/* Inactive beads (at bottom) */}
        <div className="relative z-10 flex flex-col gap-[3px] items-center mb-1.5">
          {Array.from({ length: lowerInactiveCount }).map((_, i) => (
            <motion.div
              key={`i-${index}-${i}`}
              initial={animate ? { scale: 0.85, opacity: 0 } : false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className={cn("rounded-full", beadSize, lowerInactiveStyle)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Soroban({ value, columns = 5, showLabels, animate = true, className }: SorobanProps) {
  const digits = toDigits(value, columns);
  return (
    <div className={cn('flex items-center justify-center gap-1 p-4', className)} dir="rtl">
      {digits.map((digit, index) => (
        <ColumnBeads key={index} digit={digit} index={index} animate={animate} />
      ))}
    </div>
  );
}
