// src/components/FingerMath.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FingerMathProps {
  value: number;
}

interface HandProps {
  digit: number;
  label: string;
}

function Hand({ digit, label }: HandProps) {
  const thumbUp = digit >= 5;
  const fingerCount = digit >= 5 ? digit - 5 : digit;

  // مواقع الأصابع الأربعة (كل إصبع في x)
  const fingerPositions = [70, 95, 120, 145];

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width="180"
        height="230"
        viewBox="0 0 220 260"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ظل خلفي */}
        <ellipse
          cx="110"
          cy="235"
          rx="70"
          ry="8"
          fill="rgba(0,0,0,0.2)"
        />

        {/* الكف */}
        <path
          d="M 55 105 
             Q 55 95 65 95 
             L 155 95 
             Q 165 95 165 105 
             L 165 195 
             Q 165 230 135 230 
             L 85 230 
             Q 55 230 55 195 Z"
          fill="#FFD7B5"
          stroke="#A86544"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* خط داخل الكف للعمق */}
        <path
          d="M 80 130 Q 110 145 140 130"
          stroke="rgba(168,101,68,0.25)"
          strokeWidth="2"
          fill="none"
        />

        {/* الأصابع الأربعة */}
        {fingerPositions.map((x, i) => {
          const isUp = i < fingerCount;
          const y = isUp ? 15 : 55;
          const height = isUp ? 85 : 45;

          return (
            <g key={i}>
              <motion.rect
                initial={false}
                animate={{ y, height }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                x={x}
                width="20"
                rx="10"
                fill={isUp ? '#FFD7B5' : '#E5A98A'}
                stroke="#A86544"
                strokeWidth="3"
              />
              {/* خط داخل الأصبع */}
              <motion.line
                initial={false}
                animate={{
                  y1: y + 15,
                  y2: y + height - 12,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                x1={x + 10}
                x2={x + 10}
                stroke="rgba(168,101,68,0.25)"
                strokeWidth="1.5"
              />
            </g>
          );
        })}

        {/* الإبهام */}
        <motion.g
          initial={false}
          animate={{
            x: thumbUp ? -30 : 0,
            y: thumbUp ? -40 : 0,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          {/* شكل الإبهام */}
          <motion.rect
            initial={false}
            animate={{
              width: thumbUp ? 26 : 40,
              height: thumbUp ? 75 : 32,
              x: thumbUp ? 40 : 42,
              y: thumbUp ? 20 : 100,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            rx="13"
            fill={thumbUp ? '#FFD7B5' : '#E5A98A'}
            stroke="#A86544"
            strokeWidth="3"
          />
        </motion.g>

        {/* تلميح بصري: نقطة حمراء على رأس الإبهام إذا كان مرفوعاً (يمثل الجدة 5) */}
        {thumbUp && (
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            cx="52"
            cy="18"
            r="9"
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
      {tens > 0 && <Hand digit={tens} label="اليد اليسرى (العشرات)" />}
      <Hand digit={units} label="اليد اليمنى (الآحاد)" />
    </div>
  );
}

export default FingerMath;