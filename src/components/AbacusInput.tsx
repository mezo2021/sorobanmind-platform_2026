import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBeadClasses } from './Soroban';

function toArabicNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

const COLUMN_LABELS = ['آحاد', 'عشرات', 'مئات'];

function InteractiveColumn({
  digit,
  onChange,
}: {
  digit: number;
  onChange: (newDigit: number) => void;
}) {
  const upperActive = digit >= 5;
  const lowerActiveCount = digit % 5;
  const lowerInactiveCount = 4 - lowerActiveCount;

  const handleUpperClick = () => {
    onChange(upperActive ? digit - 5 : digit + 5);
  };

  const handleActiveLowerClick = (index: number) => {
    onChange((upperActive ? 5 : 0) + index);
  };

  const handleInactiveLowerClick = (index: number) => {
    const newCount = Math.min(lowerActiveCount + index + 1, 4);
    onChange((upperActive ? 5 : 0) + newCount);
  };

  return (
    <div className="relative flex flex-col items-center w-10 sm:w-12">
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-amber-800/70" />
      <div className="relative z-10 flex flex-col w-full items-center h-[60px] sm:h-[68px]">
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={handleUpperClick}
          className={`${upperActive ? 'mt-auto mb-1.5' : 'mt-1.5'} cursor-pointer`}
          aria-label="خرزة علوية"
        >
          <div className={getBeadClasses('gold', upperActive)} />
        </motion.button>
      </div>
      <div className="relative z-10 w-full h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full" />
      <div className="relative z-10 flex flex-col justify-between w-full items-center h-[132px] sm:h-[148px]">
        <div className="flex flex-col items-center gap-[3px] mt-1.5">
          {Array.from({ length: lowerActiveCount }).map((_, i) => (
            <motion.button key={`a-${i}`} type="button" whileTap={{ scale: 0.85 }} onClick={() => handleActiveLowerClick(i)} className="cursor-pointer">
              <div className={getBeadClasses('blue', true)} />
            </motion.button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-[3px] mb-1.5">
          {Array.from({ length: lowerInactiveCount }).map((_, i) => (
            <motion.button key={`i-${i}`} type="button" whileTap={{ scale: 0.85 }} onClick={() => handleInactiveLowerClick(i)} className="cursor-pointer">
              <div className={getBeadClasses('blue', false)} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AbacusInputProps {
  target: number;
  columns?: number;
  onCorrect: () => void;
  onValueChange?: (value: number) => void;
  hint?: string;
}

function getColumnsForValue(value: number): number {
  if (value < 10) return 1;
  if (value < 100) return 2;
  return 3;
}

export function AbacusInput({ target, columns, onCorrect, onValueChange, hint }: AbacusInputProps) {
  const cols = columns ?? getColumnsForValue(target);
  const [digits, setDigits] = useState<number[]>(() => Array(cols).fill(0));
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setDigits(Array(cols).fill(0));
    setSolved(false);
  }, [target, cols]);

  const totalValue = digits.reduce((acc, d, i) => acc + d * Math.pow(10, i), 0);

  useEffect(() => {
    if (onValueChange) onValueChange(totalValue);
    if (totalValue === target && !solved) {
      setSolved(true);
      onCorrect();
    }
  }, [totalValue, target, solved, onCorrect, onValueChange]);

  const updateDigit = (index: number, newDigit: number) => {
    const clamped = Math.max(0, Math.min(9, newDigit));
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clamped;
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center">
        <p className="text-white/40 font-body text-xs mb-1">القيمة الحالية</p>
        <motion.p
          key={totalValue}
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-4xl font-extrabold font-display tabular-nums transition-colors ${solved ? 'text-emerald2-300' : 'text-electric-300'}`}
        >
          {toArabicNumber(totalValue)}
        </motion.p>
      </div>
      <div className="glass-card p-4 overflow-x-auto">
        <div className="flex flex-row-reverse items-start justify-center gap-2 sm:gap-3 min-w-max" dir="ltr">
          {digits.map((digit, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <InteractiveColumn digit={digit} onChange={(newDigit) => updateDigit(idx, newDigit)} />
              <div className="mt-2 text-[10px] text-white/40 font-body">{COLUMN_LABELS[idx]}</div>
            </div>
          ))}
        </div>
      </div>
      {hint && !solved && (
        <p className="text-center text-xs text-white/40 font-body max-w-xs">{hint}</p>
      )}
      {solved && (
        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-emerald2-300 font-bold font-body text-sm flex items-center gap-1.5">
          ✅ أحسنت! وصلت للإجابة الصحيحة
        </motion.p>
      )}
    </div>
  );
}

export { AbacusInput };
export default AbacusInput;
