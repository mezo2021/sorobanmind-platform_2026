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
  const lowerActive = digit % 5;

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Upper deck (heaven) - 1 bead worth 5 */}
      <div className="relative flex flex-col items-center w-9 sm:w-12 h-16 sm:h-20 justify-start">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        {/* Rail */}
        <div className="absolute top-1 bottom-0 w-[3px] bg-gradient-to-b from-white/10 to-white/5 rounded-full" style={{ left: '50%', transform: 'translateX(-50%)' }} />
        <motion.div
          className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 border-2 border-gold-200/40 shadow-lg cursor-pointer"
          animate={animate ? { y: upperActive ? [0, 12] : [12, 0] } : { y: upperActive ? 12 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.05 }}
        >
          <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/30 to-transparent" />
        </motion.div>
      </div>

      {/* Divider (reckoning bar) */}
      <div className="w-8 sm:w-11 h-[3px] rounded-full bg-gradient-to-r from-purple-500 via-electric-500 to-purple-500 shadow-md shadow-purple-500/50" />

      {/* Lower deck (earth) - 4 beads worth 1 each */}
      <div className="relative flex flex-col-reverse items-center w-9 sm:w-12 h-24 sm:h-28 justify-start">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400/40 via-electric-400/60 to-purple-400/40" />
        <div className="absolute top-1 bottom-0 w-[3px] bg-gradient-to-b from-white/5 to-white/10 rounded-full" style={{ left: '50%', transform: 'translateX(-50%)' }} />
        {[0, 1, 2, 3].map((i) => {
          const isActive = i < lowerActive;
          return (
            <motion.div
              key={i}
              className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full mb-0.5 bg-gradient-to-br from-electric-400 to-electric-600 border-2 border-electric-300/40 shadow-lg"
              animate={animate ? { y: isActive ? [0, -10] : [-10, 0] } : { y: isActive ? -10 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: index * 0.05 + i * 0.03 }}
            >
              <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-white/30 to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Soroban({ value, columns = 2, showLabels = false, animate = true, className }: SorobanProps) {
  const digits = toDigits(value, columns);
  const placeValues = ['1', '10', '100', '1000'];

  return (
    <div className={cn('inline-flex flex-col items-center gap-3 p-5 glass rounded-3xl', className)}>
      <div className="flex gap-1.5 sm:gap-3 items-stretch">
        {digits.map((digit, i) => {
          const colIndex = columns - 1 - i;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <ColumnBeads digit={digit} index={i} animate={animate} />
              {showLabels && (
                <div className="text-[10px] sm:text-xs font-bold text-white/40 mt-1">
                  {placeValues[colIndex]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
