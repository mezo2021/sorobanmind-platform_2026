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
  const lowerActiveCount = digit % 5;
  const upperActive = digit >= 5;

  const beadSize = "w-6 h-6 sm:w-7 sm:h-7";
  const activeColor = "bg-electric-400 ring-2 ring-white/70";
  const inactiveColor = "bg-electric-700/50 ring-1 ring-white/30";

  return (
    <div className="flex flex-col items-center">
      {/* Upper deck (heaven) */}
      <div className="relative flex flex-col items-center w-10 sm:w-12 h-14 sm:h-16">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        <div className="absolute top-1 bottom-0 w-[3px] bg-gradient-to-b from-white/20 via-electric-300/50 to-white/20" />
        
        <motion.div
          animate={{ y: upperActive ? 14 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "absolute top-1.5 z-10 rounded-full",
            beadSize,
            upperActive ? activeColor : inactiveColor
          )}
        />
      </div>

      {/* Lower deck (earth) */}
      <div className="relative flex flex-col items-center w-10 sm:w-12 h-32 sm:h-36">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        <div className="absolute top-1 bottom-1 w-[3px] bg-gradient-to-b from-white/20 via-electric-300/50 to-white/20" />

        <div className="relative z-10 flex flex-col justify-between h-full py-1.5">
          {/* Active beads - touching the beam */}
          <div className="flex flex-col gap-2 items-center">
            {Array.from({ length: lowerActiveCount }).map((_, i) => (
              <motion.div
                key={`active-${index}-${i}`}
                initial={animate ? { scale: 0.85, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={cn("rounded-full", beadSize, activeColor)}
              />
            ))}
          </div>
          
          {/* Inactive beads - at the bottom */}
          <div className="flex flex-col gap-2 items-center">
            {Array.from({ length: 4 - lowerActiveCount }).map((_, i) => (
              <motion.div
                key={`inactive-${index}-${i}`}
                initial={animate ? { scale: 0.85, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={cn("rounded-full", beadSize, inactiveColor)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Soroban({ value, columns = 5, showLabels, animate = true, className }: SorobanProps) {
  const digits = toDigits(value, columns);

  return (
    <div className={cn('flex items-center justify-center gap-1 p-4', className)}>
      {digits.map((digit, index) => (
        <ColumnBeads key={index} digit={digit} index={index} animate={animate} />
      ))}
    </div>
  );
}
