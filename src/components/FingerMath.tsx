// src/components/FingerMath.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FingerMathProps {
  value: number;
}

interface HandProps {
  digit: number;      // 0-9
  label: string;
  mirrored?: boolean; // للقلب (لليد اليسرى)
}

function Hand({ digit, label, mirrored = false }: HandProps) {
  const thumbUp = digit >= 5;
  const fingerCount = digit >= 5 ? digit - 5 : digit;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width="160"
        height="200"
        viewBox="0 0 200 240"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: mirrored ? 'scaleX(-1)' : 'none' }}
      >
        {/* ظل */}
        <ellipse
          cx="105"
          cy="230"
          rx="55"
          ry="5"
          fill="rgba(0,0,0,0.12)"
        />

        {/* الأصابع الأربعة — خلف الكف */}
        {[0, 1, 2, 3].map((i) => {
          const x = 58 + i * 24;
          const isUp = i < fingerCount;

          return (
            <motion.rect
              key={i}
              initial={false}
              animate={{
                y: isUp ? 20 : 90,
                height: isUp ? 140 : 70,
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              x={x}
              width="20"
              rx="10"
              fill={isUp ? '#FFD7B5' : '#E8B893'}
              stroke="#8B5A3C"
              strokeWidth="3"
            />
          );
        })}

        {/* الإبهام */}
        <motion.rect
          initial={false}
          animate={{
            y: thumbUp ? 55 : 145,
            height: thumbUp ? 100 : 40,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          x="30"
          width="28"
          rx="14"
          fill={thumbUp ? '#FFD7B5' : '#E8B893'}
          stroke="#8B5A3C"
          strokeWidth="3"
        />

        {/* الكف */}
        <rect
          x="55"
          y="125"
          width="100"
          height="100"
          rx="22"
          fill="#FFD7B5"
          stroke="#8B5A3C"
          strokeWidth="3"
        />

        {/* خط انحناء في الكف */}
        <path
          d="M 80 155 Q 105 172 130 155"
          stroke="rgba(139,90,60,0.3)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* نقطة ذهبية على الإبهام المرفوع (الجدة 5) */}
        {thumbUp && (
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            cx="44"
            cy="70"
            r="8"
            fill="#FCD34D"
            stroke="#B45309"
            strokeWidth="2"
          />
        )}
      </svg>

      <p className="text-xs text-white/60 font-body text-center font-bold">
        {label}
      </p>
      <p className="text-3xl font-black text-electric-300 font-display">
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
    <div className="flex items-center justify-center gap-6 p-4" dir="rtl">
      {/* 
        في وضع RTL:
        - العنصر الأول يظهر على اليمين
        - العنصر الثاني يظهر على اليسار
      */}

      {/* اليد اليمنى (الآحاد) — على اليمين */}
      <Hand digit={units} label="اليد اليمنى (الآحاد)" />

      {/* اليد اليسرى (العشرات) — على اليسار، مع قلبه */}
      {tens > 0 && (
        <Hand digit={tens} label="اليد اليسرى (العشرات)" mirrored />
      )}
    </div>
  );
}

export default FingerMath;