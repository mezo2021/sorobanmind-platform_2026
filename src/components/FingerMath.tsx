// src/components/FingerMath.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FingerMathProps {
  value: number;
}

interface HandProps {
  digit: number;   // 0-9
  label: string;
}

function Hand({ digit, label }: HandProps) {
  const thumbUp = digit >= 5;
  const fingerCount = digit >= 5 ? digit - 5 : digit; // 0-4

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="110" height="150" viewBox="0 0 110 150">
        {/* الكف */}
        <rect
          x="18"
          y="65"
          width="74"
          height="70"
          rx="14"
          fill="#F5C6A5"
          stroke="#B8935C"
          strokeWidth="2"
        />

        {/* الإبهام (الجدة) */}
        <motion.circle
          animate={{
            cx: thumbUp ? 14 : 22,
            cy: thumbUp ? 45 : 85,
          }}
          transition={{ type: 'spring', stiffness: 200 }}
          r="11"
          fill={thumbUp ? '#F5C6A5' : '#D4A574'}
          stroke="#B8935C"
          strokeWidth="2"
        />

        {/* الأصابع الأربعة */}
        {[0, 1, 2, 3].map((i) => {
          const x = 28 + i * 16;
          const isUp = i < fingerCount;
          const y = isUp ? 15 : 50;
          const height = isUp ? 55 : 20;

          return (
            <motion.rect
              key={i}
              animate={{ y, height }}
              transition={{ type: 'spring', stiffness: 200 }}
              x={x}
              width="13"
              rx="6.5"
              fill={isUp ? '#F5C6A5' : '#D4A574'}
              stroke="#B8935C"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      <p className="text-[11px] text-white/50 font-body text-center">{label}</p>
      <p className="text-2xl font-black text-electric-300 font-display">
        {digit}
      </p>
    </div>
  );
}

export function FingerMath({ value }: FingerMathProps) {
  const safeValue = Math.max(0, Math.min(99, value));
  const units = safeValue % 10;
  const tens = Math.floor(safeValue / 10);

  return (
    <div className="flex items-center justify-center gap-8 p-4">
      {tens > 0 && (
        <Hand digit={tens} label="اليد اليسرى (العشرات)" />
      )}
      <Hand digit={units} label="اليد اليمنى (الآحاد)" />
    </div>
  );
}

export default FingerMath;