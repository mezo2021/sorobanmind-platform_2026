import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  className?: string;
  animated?: boolean;
}

export const RayanAvatar: React.FC<AvatarProps> = ({
  className = 'w-32 h-32',
  animated = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const jacketId = `rayanJacket-${uid}`;
  const skinId = `rayanSkin-${uid}`;

  const infinite = animated ? { repeat: Infinity } : { repeat: 0 };

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      whileHover={animated ? { scale: 1.05, rotate: -1 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="صورة رمزية لريان"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* تدرج السترة الخضراء */}
          <linearGradient id={jacketId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D7C0F" />
            <stop offset="100%" stopColor="#3F6212" />
          </linearGradient>

          {/* تدرج البشرة */}
          <linearGradient id={skinId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>

        {/* خلفية توهج خفيفة */}
        <circle cx="100" cy="100" r="90" fill="#84CC16" fillOpacity="0.12" />

        {/* حركة الرأس والشعر والملامح */}
        <motion.g
          animate={animated ? { y: [0, -3, 0] } : undefined}
          transition={{ duration: 2.8, ease: 'easeInOut', ...infinite }}
        >
          {/* الشعر البني الكثيف */}
          <path
            d="M50 75C45 40 70 20 100 20C130 20 155 40 150 75C150 75 160 50 140 35C120 20 80 20 60 35C40 50 50 75 50 75Z"
            fill="#78350F"
          />

          {/* الأذنان */}
          <circle cx="56" cy="102" r="10" fill="#FDE68A" />
          <circle cx="144" cy="102" r="10" fill="#FDE68A" />

          {/* الوجه */}
          <path
            d="M60 88C60 60 80 50 100 50C120 50 140 60 140 88C140 122 122 138 100 138C78 138 60 122 60 88Z"
            fill={`url(#${skinId})`}
          />

          {/* الشعر الأمامي السبايكي */}
          <path
            d="M62 60C70 45 90 42 100 48C110 42 130 45 138 60C125 50 110 52 100 55C90 52 75 50 62 60Z"
            fill="#92400E"
          />

          {/* الحواجب */}
          <path
            d="M70 78C80 74 90 78 90 78"
            stroke="#451A03"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M130 78C120 74 110 78 110 78"
            stroke="#451A03"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* العينان مع حركة إغماض دقيقة */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={animated ? { scaleY: [1, 1, 0.1, 1, 1] } : undefined}
            transition={{
              duration: 3.5,
              times: [0, 0.88, 0.92, 0.96, 1],
              ...infinite,
            }}
          >
            <circle cx="78" cy="92" r="9" fill="#451A03" />
            <circle cx="122" cy="92" r="9" fill="#451A03" />
            <circle cx="80" cy="90" r="3" fill="#FFFFFF" />
            <circle cx="124" cy="90" r="3" fill="#FFFFFF" />
          </motion.g>

          {/* الغمازة والابتسامة */}
          <path
            d="M68 110C68 110 70 114 72 112"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M84 114C84 114 92 124 100 124C108 124 116 114 116 114"
            stroke="#B45309"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        {/* سترة البيسبول الخضراء */}
        <path
          d="M52 152C52 138 72 134 100 134C128 134 148 138 148 152L155 200H45L52 152Z"
          fill={`url(#${jacketId})`}
        />

        {/* أكمام السترة البرتقالية */}
        <path d="M45 160L32 190" stroke="#EA580C" strokeWidth="14" strokeLinecap="round" />
        <path d="M155 160L168 190" stroke="#EA580C" strokeWidth="14" strokeLinecap="round" />

        {/* حرف R على الصدر */}
        <text
          x="70"
          y="172"
          fill="#FFFFFF"
          fontSize="20"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          R
        </text>

        {/* التابلت */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={animated ? { y: [0, -2, 0] } : undefined}
          transition={{ duration: 2, ease: 'easeInOut', ...infinite }}
        >
          <rect
            x="118"
            y="140"
            width="48"
            height="55"
            rx="6"
            fill="#1E293B"
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <rect x="122" y="145" width="40" height="40" rx="3" fill="#38BDF8" />
          {/* شاشة التابلت */}
          <line x1="130" y1="165" x2="154" y2="165" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="135" cy="158" r="2.5" fill="#FACC15" />
          <circle cx="142" cy="172" r="2.5" fill="#EF4444" />
          <circle cx="149" cy="158" r="2.5" fill="#4ADE80" />
        </motion.g>
      </svg>
    </motion.div>
  );
};