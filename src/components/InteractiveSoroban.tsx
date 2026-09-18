import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBeadClasses, valueToDigits } from './Soroban';
import type { LessonStep, DivisionStep } from '@/types';

interface InteractiveSorobanColumnProps {
  digit: number;
  onChange: (newDigit: number) => void;
  disabled?: boolean;
}

const InteractiveSorobanColumn: React.FC<InteractiveSorobanColumnProps> = ({
  digit,
  onChange,
  disabled = false,
}) => {
  const upperActive = digit >= 5;
  const lowerActiveCount = digit % 5;
  const lowerInactiveCount = 4 - lowerActiveCount;

  const handleUpperClick = () => {
    if (disabled) return;
    onChange(upperActive ? digit - 5 : digit + 5);
  };

  const handleActiveLowerClick = (index: number) => {
    if (disabled) return;
    onChange((upperActive ? 5 : 0) + index);
  };

  const handleInactiveLowerClick = (index: number) => {
    if (disabled) return;
    const newCount = Math.min(lowerActiveCount + index + 1, 4);
    onChange((upperActive ? 5 : 0) + newCount);
  };

  return (
    <div className={`relative flex flex-col items-center w-10 sm:w-12 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-amber-800/70" />
      <div className="relative z-10 flex flex-col w-full items-center h-[60px] sm:h-[68px]">
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={handleUpperClick}
          className={`${upperActive ? 'mt-auto mb-1.5' : 'mt-1.5'} cursor-pointer`}
          aria-label="خرزة السماء"
        >
          <div className={getBeadClasses('gold', upperActive)} />
        </motion.button>
      </div>
      <div className="relative z-10 w-full h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500" />
      <div className="relative z-10 flex flex-col justify-between w-full items-center h-[132px] sm:h-[148px]">
        <div className="flex flex-col items-center gap-[3px] mt-1.5">
          {Array.from({ length: lowerActiveCount }).map((_, i) => (
            <motion.button
              key={`active-${i}`}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => handleActiveLowerClick(i)}
              className="cursor-pointer"
            >
              <div className={getBeadClasses('blue', true)} />
            </motion.button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-[3px] mb-1.5">
          {Array.from({ length: lowerInactiveCount }).map((_, i) => (
            <motion.button
              key={`inactive-${i}`}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => handleInactiveLowerClick(i)}
              className="cursor-pointer"
            >
              <div className={getBeadClasses('blue', false)} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface InteractiveSorobanProps {
  columns?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  className?: string;
  expectedStep?: LessonStep | DivisionStep;
  onStepCorrect?: () => void;
  onStepWrong?: (message: string) => void;
  strictMode?: boolean;
}

const InteractiveSoroban: React.FC<InteractiveSorobanProps> = ({
  columns = 5,
  value,
  onValueChange,
  className = '',
  expectedStep,
  onStepCorrect,
  onStepWrong,
  strictMode = false,
}) => {
  const [digits, setDigits] = useState<number[]>(() =>
    valueToDigits(value ?? 0, columns)
  );

  useEffect(() => {
    if (value !== undefined) {
      setDigits(valueToDigits(value, columns));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, columns]);

  const isStepMatch = (
    columnIndex: number,
    oldDigit: number,
    newDigit: number,
    step: LessonStep | DivisionStep
  ): boolean => {
    const columnMap: Record<string, number> = {
      units: 0,
      tens: 1,
      hundreds: 2,
      thousands: 3,
    };
    const expectedColumnIndex = columnMap[step.targetColumn];
    if (columnIndex !== expectedColumnIndex) return false;

    const upperBefore = oldDigit >= 5;
    const upperAfter = newDigit >= 5;
    const lowerBefore = oldDigit % 5;
    const lowerAfter = newDigit % 5;
    const beads = step.beadsAffected;

    if (beads.includes(5)) {
      if (step.direction === 'down' && !upperBefore && upperAfter) return true;
      if (step.direction === 'up' && upperBefore && !upperAfter) return true;
    }

    const lowerBeads = beads.filter((b) => b < 5);
    if (lowerBeads.length > 0) {
      if (step.direction === 'up' && lowerAfter > lowerBefore) return true;
      if (step.direction === 'down' && lowerAfter < lowerBefore) return true;
      if (step.direction === 'pinch_in' && lowerAfter > lowerBefore) return true;
      if (step.direction === 'pinch_out' && lowerAfter < lowerBefore) return true;
    }

    return false;
  };

  const buildWrongMessage = (step: LessonStep | DivisionStep): string => {
    const fingerMap: Record<string, string> = {
      thumb: 'الإبهام 👍',
      index: 'السبابة ☝️',
      both_pinch: 'الإبهام + السبابة ✋',
      left_index: 'سبابة اليد اليسرى ☝️',
    };
    const directionMap: Record<string, string> = {
      up: 'ارفع',
      down: 'أنزل',
      pinch_in: 'اضم',
      pinch_out: 'افتح',
    };
    const columnMap: Record<string, string> = {
      units: 'الآحاد',
      tens: 'العشرات',
      hundreds: 'المئات',
      thousands: 'الآلاف',
    };
    return `تذكّر! استخدم ${fingerMap[step.fingerUsed]} لكي ${directionMap[step.direction]} الخرزة في ${columnMap[step.targetColumn]}`;
  };

  const updateDigit = (index: number, newDigit: number) => {
    const clamped = Math.max(0, Math.min(9, newDigit));
    const oldDigit = digits[index];

    if (strictMode && expectedStep) {
      const matches = isStepMatch(index, oldDigit, clamped, expectedStep);
      if (!matches) {
        if (onStepWrong) {
          onStepWrong(buildWrongMessage(expectedStep));
        }
        return;
      }
    }

    setDigits((prev) => {
      const next = [...prev];
      next[index] = clamped;
      if (onValueChange) {
        const totalValue = next.reduce(
          (acc, d, i) => acc + d * Math.pow(10, i),
          0
        );
        onValueChange(totalValue);
      }
      return next;
    });

    if (strictMode && expectedStep && onStepCorrect) {
      onStepCorrect();
    }
  };

  return (
    <div className={`inline-flex bg-amber-950 rounded-xl p-3 sm:p-4 gap-1 sm:gap-2 shadow-lg ${className}`}>
      <div className="flex flex-row-reverse items-center justify-center gap-1 sm:gap-2" dir="ltr">
        {digits.map((digit, idx) => (
          <InteractiveSorobanColumn
            key={idx}
            digit={digit}
            onChange={(newDigit) => updateDigit(idx, newDigit)}
          />
        ))}
      </div>
    </div>
  );
};

export { InteractiveSoroban };
export default InteractiveSoroban;
