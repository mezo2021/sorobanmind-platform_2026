import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  className?: string;
  animated?: boolean;
}

export const BanaAvatar: React.FC<AvatarProps> = ({
  className = 'w-32 h-32',
  animated = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const jacketId = `banaJacket-${uid}`;
  const innerId = `banaInner-${uid}`;
  const skinId = `banaSkin-${uid}`;

  const infinite = animated ? { repeat: Infinity } : { repeat: 0 };

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      whileHover={animated ? { scale: 1.05 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="صورة رمزية لبنة"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* تدرج الجاكيت الأبيض */}
          <linearGradient id={jacketId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>

          {/* تدرج الكنزة البنفسجية الداخلية */}
          <linearGradient id={innerId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>

          {/* تدرج البشرة */}
          <linearGradient id={skinId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>
        </defs>

        {/* خلفية توهج خفيفة */}
        <circle cx="100" cy="100" r="90" fill="#A855F7" fillOpacity="0.1" />

        {/* حركة التنفس والوقوف الأنيق */}
        <motion.g
          animate={animated ? { y: [0, -2, 0] } : undefined}
          transition={{ duration: 3.2, ease: 'easeInOut', ...infinite }}
        >
          {/* الشعر البني المموج الخلفي */}
          <path
            d="M48 85C40 100 42 135 55 155M152 85C160 100 158 135 145 155"
            stroke="#3B0764"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* الوجه */}
          <path
            d="M64 85C64 60 80 48 100 48C120 48 136 60 136 85C136 120 118 136 100 136C82 136 64 120 64 85Z"
            fill={`url(#${skinId})`}
          />

          {/* الحواجب */}
          <path
            d="M72 76C82 72 90 75 90 75"
            stroke="#3B0764"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M128 76C118 72 110 75 110 75"
            stroke="#3B0764"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* العينان مع حركة إغماض دقيقة */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={animated ? { scaleY: [1, 1, 0.1, 1, 1] } : undefined}
            transition={{
              duration: 4.2,
              times: [0, 0.9, 0.93, 0.96, 1],
              ...infinite,
            }}
          >
            <circle cx="80" cy="88" r="8" fill="#3B0764" />
            <circle cx="120" cy="88" r="8" fill="#3B0764" />
            <circle cx="82" cy="86" r="2.5" fill="#FFFFFF" />
            <circle cx="122" cy="86" r="2.5" fill="#FFFFFF" />
          </motion.g>

          {/* الابتسامة الهادئة */}
          <path
            d="M88 112C88 112 94 118 100 118C106 118 112 112 112 112"
            stroke="#9D174D"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* قرط النجمة الذهبي */}
          <motion.path
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={animated ? { rotate: [0, 15, -15, 0] } : undefined}
            transition={{ duration: 3, ease: 'easeInOut', ...infinite }}
            d="M58 102L60 106L64 106L61 109L62 113L58 110L54 113L55 109L52 106L56 106Z"
            fill="#FACC15"
          />
        </motion.g>

        {/* الكنزة البنفسجية الداخلية */}
        <path d="M70 135H130V180H70V135Z" fill={`url(#${innerId})`} />

        {/* قلادة النجمة الذهبية */}
        <path
          d="M92 136L100 148L108 136"
          stroke="#FACC15"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <polygon
          points="100,146 102,150 106,150 103,152 104,156 100,154 96,156 97,152 94,150 98,150"
          fill="#FACC15"
        />

        {/* الجاكيت الأبيض */}
        <path
          d="M52 150C52 138 72 134 88 134V200H45L52 150ZM148 150C148 138 128 134 112 134V200H155L148 150Z"
          fill={`url(#${jacketId})`}
          stroke="#E2E8F0"
          strokeWidth="2"
        />

        {/* السحاب والياقة */}
        <line x1="88" y1="134" x2="88" y2="200" stroke="#CBD5E1" strokeWidth="3" />
        <line x1="112" y1="134" x2="112" y2="200" stroke="#CBD5E1" strokeWidth="3" />
      </svg>
    </motion.div>
  );
};