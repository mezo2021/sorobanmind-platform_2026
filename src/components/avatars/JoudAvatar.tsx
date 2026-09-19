import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  className?: string;
  animated?: boolean;
}

export const JoudAvatar: React.FC<AvatarProps> = ({
  className = 'w-32 h-32',
  animated = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const jacketId = `joudJacket-${uid}`;
  const skinId = `joudSkin-${uid}`;

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
        aria-label="صورة رمزية لجود"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* تدرج الجاكيت الكحلي */}
          <linearGradient id={jacketId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* تدرج البشرة */}
          <linearGradient id={skinId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FCA5A5" />
          </linearGradient>
        </defs>

        {/* خلفية توهج خفيفة */}
        <circle cx="100" cy="100" r="90" fill="#2563EB" fillOpacity="0.1" />

        {/* حركة الرأس والملامح */}
        <motion.g
          animate={animated ? { y: [0, -2, 0] } : undefined}
          transition={{ duration: 3, ease: 'easeInOut', ...infinite }}
        >
          {/* الشعر الكثيف والأنيق لجود */}
          <path
            d="M52 70C48 40 70 20 100 20C130 20 152 40 148 70C148 70 158 45 138 32C118 18 82 18 62 32C42 45 52 70 52 70Z"
            fill="#1E293B"
          />

          {/* الأذنان */}
          <circle cx="58" cy="98" r="9" fill="#FCA5A5" />
          <circle cx="142" cy="98" r="9" fill="#FCA5A5" />

          {/* الوجه */}
          <path
            d="M62 84C62 58 80 48 100 48C120 48 138 58 138 84C138 118 120 134 100 134C80 134 62 118 62 84Z"
            fill={`url(#${skinId})`}
          />

          {/* الحواجب */}
          <path
            d="M70 72C80 68 88 72 88 72"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M130 72C120 68 112 72 112 72"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* العينان مع حركة إغماض دقيقة */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={animated ? { scaleY: [1, 1, 0.1, 1, 1] } : undefined}
            transition={{
              duration: 3.8,
              times: [0, 0.88, 0.92, 0.96, 1],
              ...infinite,
            }}
          >
            <circle cx="78" cy="85" r="7.5" fill="#0F172A" />
            <circle cx="122" cy="85" r="7.5" fill="#0F172A" />
            <circle cx="80" cy="83" r="2.5" fill="#FFFFFF" />
            <circle cx="124" cy="83" r="2.5" fill="#FFFFFF" />
          </motion.g>

          {/* النظارة العصرية ذات الإطار الكحلي */}
          <rect
            x="64"
            y="72"
            width="30"
            height="26"
            rx="6"
            stroke="#1E3A8A"
            strokeWidth="4"
            fill="none"
          />
          <rect
            x="106"
            y="72"
            width="30"
            height="26"
            rx="6"
            stroke="#1E3A8A"
            strokeWidth="4"
            fill="none"
          />
          <line x1="94" y1="82" x2="106" y2="82" stroke="#1E3A8A" strokeWidth="3.5" />
          <line x1="52" y1="82" x2="64" y2="82" stroke="#1E3A8A" strokeWidth="3" />
          <line x1="136" y1="82" x2="148" y2="82" stroke="#1E3A8A" strokeWidth="3" />

          {/* لمعة على زجاج النظارة */}
          <line
            x1="68"
            y1="76"
            x2="76"
            y2="76"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="110"
            y1="76"
            x2="118"
            y2="76"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* الابتسامة الواثقة */}
          <path
            d="M86 110C86 110 93 118 100 118C107 118 114 110 114 110"
            stroke="#9F1239"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </motion.g>

        {/* الجاكيت الكحلي */}
        <path
          d="M50 150C50 136 70 132 100 132C130 132 150 136 150 150L158 200H42L50 150Z"
          fill={`url(#${jacketId})`}
        />

        {/* ياقة الجاكيت بالبطانة البرتقالية */}
        <path d="M80 132L100 160L120 132" fill="#F97316" />
        <path d="M90 132L100 152L110 132" fill="#1E293B" />

        {/* شعار البوصلة على كم الجاكيت */}
        <circle cx="68" cy="170" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M68 165L70 170L68 175L66 170Z" fill="#FACC15" />
      </svg>
    </motion.div>
  );
};