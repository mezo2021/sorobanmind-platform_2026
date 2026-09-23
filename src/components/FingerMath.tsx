// src/components/FingerMath.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FingerMathProps {
  value: number;
}

interface HandProps {
  digit: number;      // 0-9
  label: string;
  mirrored?: boolean; // لليد اليسرى
}

// أطوال ونسب الأصابع الطبيعية (سبابة، وسطى، بنصر، خنصر)
const FINGER_SPECS = [
  { id: 'index',  x: 68,  height: 95,  rx: 11, width: 22, name: 'السبابة' },
  { id: 'middle', x: 94,  height: 108, rx: 11, width: 22, name: 'الوسطى' },
  { id: 'ring',   x: 120, height: 98,  rx: 11, width: 22, name: 'البنصر' },
  { id: 'pinky',  x: 146, height: 78,  rx: 10, width: 20, name: 'الخنصر' },
];

function VectorHand({ digit, label, mirrored = false }: HandProps) {
  const thumbUp = digit >= 5;
  const fingerCount = digit >= 5 ? digit - 5 : digit;

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className="relative drop-shadow-xl">
        <svg
          width="180"
          height="230"
          viewBox="0 0 200 250"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          style={{ transform: mirrored ? 'scaleX(-1)' : 'none' }}
        >
          <defs>
            {/* تدرج جلدي واقعي */}
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE3D1" />
              <stop offset="50%" stopColor="#F5C0A0" />
              <stop offset="100%" stopColor="#E09F7A" />
            </linearGradient>

            {/* تدرج للظلال الداخلية */}
            <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C87A50" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A6552C" stopOpacity="0.2" />
            </linearGradient>

            {/* تدرج الذهب للنقطة */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE259" />
              <stop offset="100%" stopColor="#FFA751" />
            </linearGradient>
          </defs>

          {/* ظل اليد السفلي */}
          <ellipse cx="105" cy="240" rx="60" ry="8" fill="rgba(0,0,0,0.25)" />

          {/* 1. الأصابع الأربعة (السبابة، الوسطى، البنصر، الخنصر) */}
          {FINGER_SPECS.map((finger, i) => {
            const isUp = i < fingerCount;

            return (
              <g key={finger.id}>
                {/* الإصبع المرفوع أو المطوي مع حركة انثناء واقعية */}
                <motion.g
                  initial={false}
                  animate={{
                    y: isUp ? 0 : 45,
                    scaleY: isUp ? 1 : 0.45,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  style={{ transformOrigin: `${finger.x + finger.width / 2}px 145px` }}
                >
                  {/* جسم الإصبع */}
                  <rect
                    x={finger.x}
                    y={145 - finger.height}
                    width={finger.width}
                    height={finger.height}
                    rx={finger.rx}
                    fill="url(#skinGradient)"
                    stroke="#B86E4B"
                    strokeWidth="2.5"
                  />

                  {/* تفاصيل الظفر */}
                  {isUp && (
                    <path
                      d={`M ${finger.x + 4} ${155 - finger.height} Q ${finger.x + finger.width / 2} ${150 - finger.height} ${finger.x + finger.width - 4} ${155 - finger.height}`}
                      stroke="rgba(184, 110, 75, 0.4)"
                      strokeWidth="2"
                      fill="none"
                    />
                  )}

                  {/* خطوط مفاصل الاصبع */}
                  {isUp && (
                    <path
                      d={`M ${finger.x + 3} ${185 - finger.height} L ${finger.x + finger.width - 3} ${185 - finger.height}`}
                      stroke="rgba(184, 110, 75, 0.3)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  )}
                </motion.g>
              </g>
            );
          })}

          {/* 2. الإبهام (المحرك القطري - الجدة 5) */}
          <motion.g
            initial={false}
            animate={{
              rotate: thumbUp ? 0 : 35,
              x: thumbUp ? 0 : 18,
              y: thumbUp ? 0 : 12,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            style={{ transformOrigin: '55px 165px' }}
          >
            {/* جسم الإبهام */}
            <path
              d="M 22 155 C 18 120, 38 95, 54 95 C 66 95, 68 120, 60 165 Z"
              fill="url(#skinGradient)"
              stroke="#B86E4B"
              strokeWidth="2.5"
            />

            {/* ظفر الإبهام */}
            <ellipse cx="40" cy="106" rx="6" ry="4" fill="rgba(255,255,255,0.3)" />

            {/* النقطة الذهبية للمكافأة/الجدة 5 */}
            {thumbUp && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
              >
                <circle cx="40" cy="122" r="9" fill="url(#goldGradient)" stroke="#B45309" strokeWidth="1.5" />
                <circle cx="38" cy="120" r="3" fill="#FFF" opacity="0.6" />
              </motion.g>
            )}
          </motion.g>

          {/* 3. كف اليد (Palmar Region) */}
          <path
            d="M 45 145 C 45 130, 168 130, 172 145 C 176 185, 160 225, 140 230 C 90 235, 45 210, 45 145 Z"
            fill="url(#skinGradient)"
            stroke="#B86E4B"
            strokeWidth="2.5"
          />

          {/* خطوط ثنيات الكف الحقيقية (Life & Heart Lines) */}
          <path
            d="M 58 165 Q 90 185 130 165"
            stroke="rgba(184, 110, 75, 0.35)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 70 185 Q 110 205 145 180"
            stroke="rgba(184, 110, 75, 0.25)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="text-xs text-white/70 font-body text-center font-bold tracking-wide">
        {label}
      </p>
      <p className="text-3xl font-black text-amber-300 font-display drop-shadow-md">
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
    <div className="flex items-center justify-center gap-8 p-4" dir="rtl">
      {/* اليد اليمنى (الآحاد) */}
      <VectorHand digit={units} label="اليد اليمنى (الآحاد)" />

      {/* اليد اليسرى (العشرات) */}
      {tens > 0 && (
        <VectorHand digit={tens} label="اليد اليسرى (العشرات)" mirrored />
      )}
    </div>
  );
}

export default FingerMath;
