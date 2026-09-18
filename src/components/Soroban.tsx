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
  const activeColor = "bg-electric-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]";
  const inactiveColor = "bg-electric-700/40";
  const ringClass = "ring-1 ring-white/50";

  return (
    <div className="flex flex-col items-center">
      {/* Upper deck (heaven) - 1 bead worth 5 */}
      <div className="relative flex flex-col items-center w-10 sm:w-12 h-16 sm:h-20">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        <div className="absolute top-1 bottom-0 w-[3px] bg-gradient-to-b from-white/20 via-electric-300/50 to-white/20" />
        
        <motion.div
          animate={{ y: upperActive ? 20 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "absolute top-2 z-10 rounded-full",
            beadSize,
            upperActive ? activeColor : inactiveColor,
            ringClass
          )}
        />
      </div>

      {/* Lower deck (earth) - 4 beads worth 1 each */}
      <div className="relative flex flex-col items-center w-10 sm:w-12 h-24 sm:h-28">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        <div className="absolute top-1 bottom-1 w-[3px] bg-gradient-to-b from-white/20 via-electric-300/50 to-white/20" />
        
        <div className="relative z-10 flex flex-col justify-between h-full py-1">
          {/* Active beads - top, touching beam */}
          <div className="flex flex-col gap-1 items-center">
            {Array.from({ length: lowerActiveCount }).map((_, i) => (
              <motion.div
                key={`active-${index}-${i}`}
                initial={animate ? { scale: 0.8, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={cn("rounded-full", beadSize, activeColor, ringClass)}
              />
            ))}
          </div>
          
          {/* Inactive beads - bottom */}
          <div className="flex flex-col gap-1 items-center">
            {Array.from({ length: 4 - lowerActiveCount }).map((_, i) => (
              <motion.div
                key={`inactive-${index}-${i}`}
                initial={animate ? { scale: 0.8, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={cn("rounded-full", beadSize, inactiveColor, ringClass)}
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
