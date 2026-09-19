import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  className?: string;
  animated?: boolean;
}

export const ShamAvatar: React.FC<AvatarProps> = ({
  className = 'w-32 h-32',
  animated = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const rainbowId = `shamRainbow-${uid}`;
  const skinId = `shamSkin-${uid}`;
  const woodId = `abacusWood-${uid}`;

  const infinite = animated ? { repeat: Infinity } : { repeat: 0 };

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      whileHover={animated ? { scale: 1.05, rotate: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="صورة رمزية لشام"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* تدرج كنزة قوس قزح */}
          <linearGradient id={rainbowId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="75%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* تدرج البشرة */}
          <linearGradient id={skinId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FCA5A5" />
          </linearGradient>

          {/* تدرج خشب المعداد */}
          <linearGradient id={woodId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>

        {/* خلفية توهج خفيفة */}
        <circle cx="100" cy="100" r="90" fill="#F472B6" fillOpacity="0.12" />

        {/* حركة الرأس والشعر والأذنين */}
        <motion.g
          animate={animated ? { y: [0, -2, 0] } : undefined}
          transition={{ duration: 3, ease: 'easeInOut', ...infinite }}
        >
          {/* الشعر الكيرلي الخلفي */}
          <path
            d="M50 80C35 70 30 110 40 130C50 150 70 150 70 150M150 80C165 70 170 110 160 130C150 150 130 150 130 150"
            stroke="#5B21B6"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M42 65C30 50 50 30 70 40M158 65C170 50 150 30 130 40"
            stroke="#4C1D95"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* الأذنان */}
          <circle cx="58" cy="105" r="10" fill="#FCA5A5" />
          <circle cx="142" cy="105" r="10" fill="#FCA5A5" />

          {/* الوجه */}
          <path
            d="M60 90C60 60 80 50 100 50C120 50 140 60 140 90C140 125 122 140 100 140C78 140 60 125 60 90Z"
            fill={`url(#${skinId})`}
          />

          {/* الخدود الوردية */}
          <circle cx="76" cy="112" r="8" fill="#F43F5E" fillOpacity="0.3" />
          <circle cx="124" cy="112" r="8" fill="#F43F5E" fillOpacity="0.3" />

          {/* النمش */}
          <circle cx="82" cy="108" r="1" fill="#9F1239" />
          <circle cx="85" cy="110" r="1" fill="#9F1239" />
          <circle cx="118" cy="108" r="1" fill="#9F1239" />
          <circle cx="115" cy="110" r="1" fill="#9F1239" />

          {/* الحواجب */}
          <path d="M72 82C80 78 88 82 88 82" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          <path d="M128 82C120 78 112 82 112 82" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />

          {/* العينان مع حركة إغماض دقيقة */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={animated ? { scaleY: [1, 1, 0.1, 1, 1] } : undefined}
            transition={{
              duration: 4,
              times: [0, 0.9, 0.93, 0.96, 1],
              ...infinite,
            }}
          >
            <circle cx="80" cy="94" r="9" fill="#312E81" />
            <circle cx="120" cy="94" r="9" fill="#312E81" />
            <circle cx="82" cy="92" r="3" fill="#FFFFFF" />
            <circle cx="122" cy="92" r="3" fill="#FFFFFF" />
          </motion.g>

          {/* الابتسامة */}
          <path
            d="M88 118C88 118 94 126 100 126C106 126 112 118 112 118"
            stroke="#9F1239"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* شعر الغرة العلوي */}
          <path
            d="M75 55C65 40 85 20 100 25C115 20 135 40 125 55C115 45 85 45 75 55Z"
            fill="#5B21B6"
          />
        </motion.g>

        {/* الكنزة الملونة */}
        <path
          d="M55 155C55 142 75 138 100 138C125 138 145 142 145 155L152 200H48L55 155Z"
          fill={`url(#${rainbowId})`}
        />

        {/* المعداد الخشبي */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={animated ? { rotate: [-2, 2, -2] } : undefined}
          transition={{ duration: 2.5, ease: 'easeInOut', ...infinite }}
        >
          <rect
            x="110"
            y="145"
            width="55"
            height="35"
            rx="5"
            fill={`url(#${woodId})`}
            stroke="#FEF3C7"
            strokeWidth="2"
          />
          {/* أعمدة المعداد */}
          <line x1="122" y1="149" x2="122" y2="176" stroke="#FDE68A" strokeWidth="2" />
          <line x1="137" y1="149" x2="137" y2="176" stroke="#FDE68A" strokeWidth="2" />
          <line x1="152" y1="149" x2="152" y2="176" stroke="#FDE68A" strokeWidth="2" />
          {/* خرزات المعداد */}
          <circle cx="122" cy="154" r="3" fill="#EF4444" />
          <circle cx="122" cy="168" r="3" fill="#10B981" />
          <circle cx="137" cy="158" r="3" fill="#F59E0B" />
          <circle cx="152" cy="164" r="3" fill="#3B82F6" />
        </motion.g>
      </svg>
    </motion.div>
  );
};