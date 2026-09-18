import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBeadClasses, valueToDigits } from './Soroban';

// ============================================================
// عمود سوروبان تفاعلي واحد
// ============================================================

interface InteractiveSorobanColumnProps {
  digit: number; // 0-9
  onChange: (newDigit: number) => void;
}

const InteractiveSorobanColumn: React.FC<InteractiveSorobanColumnProps> = ({
  digit,
  onChange,
}) => {
  const upperActive = digit >= 5;
  const lowerActiveCount = digit % 5;
  const lowerInactiveCount = 4 - lowerActiveCount;

  const handleUpperClick = () => {
    onChange(upperActive ? digit - 5 : digit + 5);
  };

  // النقر على خرزة مفعّلة (رقمها index من 0، الأقرب للعارضة = 0):
  // تُلغى هي وكل ما بعدها (الأبعد عن العارضة)
  const handleActiveLowerClick = (index: number) => {
    onChange((upperActive ? 5 : 0) + index);
  };

  // النقر على خرزة غير مفعّلة (رقمها index من 0، الأقرب للمجموعة المفعّلة = 0):
  // تُفعَّل هي وكل ما بينها وبين العارضة
  const handleInactiveLowerClick = (index: number) => {
    const newCount = Math.min(lowerActiveCount + index + 1, 4);
    onChange((upperActive ? 5 : 0) + newCount);
  };

  return (
    <div className="relative flex flex-col items-center w-10 sm:w-12">
      {/* العمود الرأسي (القضيب) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-amber-800/70" />

      {/* القسم العلوي: السماء (خرزة ذهبية واحدة قابلة للنقر) */}
      <div className="relative z-10 flex flex-col w-full items-center h-[60px] sm:h-[68px]">
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={handleUpperClick}
          className={`${upperActive ? 'mt-auto mb-1.5' : 'mt-1.5'} cursor-pointer`}
          aria-label="خرزة السماء (قيمتها 5)"
        >
          <div className={getBeadClasses('gold', upperActive)} />
        </motion.button>
      </div>

      {/* العارضة الوسطى */}
      <div className="relative z-10 w-full h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500" />

      {/* القسم السفلي: الأرض (أربع خرزات زرقاء قابلة للنقر) */}
      <div className="relative z-10 flex flex-col justify-between w-full items-center h-[132px] sm:h-[148px]">
        {/* الخرزات المفعّلة: ملتصقة بالعارضة، كل واحدة منفصلة بفجوة gap-[3px] */}
        <div className="flex flex-col items-center gap-[3px] mt-1.5">
          {Array.from({ length: lowerActiveCount }).map((_, i) => (
            <motion.button
              key={`active-${i}`}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => handleActiveLowerClick(i)}
              className="cursor-pointer"
              aria-label={`خرزة أرض مفعّلة رقم ${i + 1}`}
            >
              <div className={getBeadClasses('blue', true)} />
            </motion.button>
          ))}
        </div>
        {/* الخرزات غير المفعّلة: بعيدة في أسفل الإطار، كل واحدة منفصلة بفجوة gap-[3px] */}
        <div className="flex flex-col items-center gap-[3px] mb-1.5">
          {Array.from({ length: lowerInactiveCount }).map((_, i) => (
            <motion.button
              key={`inactive-${i}`}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => handleInactiveLowerClick(i)}
              className="cursor-pointer"
              aria-label={`خرزة أرض غير مفعّلة رقم ${i + 1}`}
            >
              <div className={getBeadClasses('blue', false)} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// السوروبان الكامل التفاعلي (5 أعمدة افتراضياً) — وضع "جرّب"
// ============================================================

interface InteractiveSorobanProps {
  columns?: number;
  value?: number; // قيمة مبدئية/متحكّم بها من الخارج (اختياري)
  onValueChange?: (value: number) => void;
  className?: string;
}

const InteractiveSoroban: React.FC<InteractiveSorobanProps> = ({
  columns = 5,
  value,
  onValueChange,
  className = '',
}) => {
  const [digits, setDigits] = useState<number[]>(() =>
    valueToDigits(value ?? 0, columns)
  );

  // مزامنة الحالة الداخلية إذا تغيّرت القيمة من الخارج
  useEffect(() => {
    if (value !== undefined) {
      setDigits(valueToDigits(value, columns));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, columns]);

  const updateDigit = (index: number, newDigit: number) => {
    const clamped = Math.max(0, Math.min(9, newDigit));
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clamped;
      if (onValueChange) {
        onValueChange(Number(next.join('')));
      }
      return next;
    });
  };

  return (
    <div
      className={`inline-flex bg-amber-950 rounded-xl p-3 sm:p-4 gap-1 sm:gap-2 shadow-lg ${className}`}
    >
      {digits.map((digit, idx) => (
        <InteractiveSorobanColumn
          key={idx}
          digit={digit}
          onChange={(newDigit) => updateDigit(idx, newDigit)}
        />
      ))}
    </div>
  );
};

export { InteractiveSoroban };
export default InteractiveSoroban;
