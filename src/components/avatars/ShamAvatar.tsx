import React from 'react';

interface AvatarProps {
  className?: string;
}

export const ShamAvatar: React.FC<AvatarProps> = ({
  className = 'w-24 h-24',
}) => (
  <svg
    viewBox="0 0 160 180"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="شام"
  >
    <defs>
      <linearGradient id="sham-hair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5B3A29" />
        <stop offset="100%" stopColor="#3A2418" />
      </linearGradient>
      <linearGradient id="sham-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="sham-skirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4C1D95" />
        <stop offset="100%" stopColor="#2E1065" />
      </linearGradient>
      <radialGradient id="sham-cheek" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FB7185" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* الجديلة الجانبية */}
    <path
      d="M120 78 Q135 90 132 115 Q128 135 118 145 Q112 140 116 128 Q122 105 114 88Z"
      fill="url(#sham-hair)"
    />
    <ellipse cx="126" cy="112" rx="6" ry="4" fill="#FBBF24" />
    <ellipse cx="121" cy="128" rx="5" ry="3.5" fill="#FBBF24" />

    {/* الشعر الخلفي */}
    <path
      d="M42 78 Q38 40 80 30 Q122 40 118 78 Q115 60 105 55 Q95 45 80 48 Q65 45 55 55 Q45 60 42 78Z"
      fill="url(#sham-hair)"
    />

    {/* الرقبة */}
    <path
      d="M70 108 L70 122 Q80 128 90 122 L90 108Z"
      fill="#E4B28D"
    />
    <path
      d="M70 118 Q80 124 90 118 Q80 122 70 118Z"
      fill="#C99576"
      opacity="0.5"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="78" rx="31" ry="38" fill="#F3C7A5" />

    {/* ظل الذقن */}
    <ellipse cx="80" cy="108" rx="18" ry="6" fill="#D9A585" opacity="0.35" />

    {/* الغرة الأمامية */}
    <path
      d="M46 66 Q48 32 80 30 Q112 32 114 66 Q106 52 95 50 Q88 58 80 52 Q72 58 65 50 Q54 52 46 66Z"
      fill="url(#sham-hair)"
    />

    {/* الأذنان */}
    <ellipse cx="49" cy="80" rx="5" ry="7" fill="#E4B28D" />
    <ellipse cx="111" cy="80" rx="5" ry="7" fill="#E4B28D" />

    {/* العينان */}
    <ellipse cx="67" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="93" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="67" cy="79" rx="5" ry="6.5" fill="#33251F" />
    <ellipse cx="93" cy="79" rx="5" ry="6.5" fill="#33251F" />
    <circle cx="65.5" cy="77" r="2.2" fill="white" />
    <circle cx="91.5" cy="77" r="2.2" fill="white" />
    <circle cx="68" cy="81.5" r="0.9" fill="white" opacity="0.85" />
    <circle cx="94" cy="81.5" r="0.9" fill="white" opacity="0.85" />

    {/* الحاجبان */}
    <path
      d="M58 69 Q67 63 75 69"
      stroke="#5B3A29"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M85 69 Q93 63 102 69"
      stroke="#5B3A29"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 82 L77 90 Q80 92 84 90"
      stroke="#B87858"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة */}
    <path
      d="M69 98 Q80 106 91 98"
      stroke="#7A3F43"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M73 99 Q80 103 87 99"
      fill="#FDFDFD"
      opacity="0.6"
    />

    {/* الخدان */}
    <ellipse cx="56" cy="92" rx="9" ry="4.5" fill="url(#sham-cheek)" />
    <ellipse cx="104" cy="92" rx="9" ry="4.5" fill="url(#sham-cheek)" />

    {/* البلوزة البنفسجية */}
    <path
      d="M42 116 Q80 106 118 116 L124 178 H36Z"
      fill="url(#sham-top)"
    />
    {/* ظل البلوزة */}
    <path
      d="M42 116 Q60 111 80 112 Q100 111 118 116 Q100 118 80 119 Q60 118 42 116Z"
      fill="#5B21B6"
      opacity="0.35"
    />
    {/* ياقة مدورة */}
    <path
      d="M68 114 Q80 126 92 114"
      fill="#F5F3FF"
      stroke="#DDD6FE"
      strokeWidth="1.2"
    />

    {/* حزام */}
    <rect x="55" y="158" width="50" height="6" rx="2" fill="#2E1065" />
    <circle cx="80" cy="161" r="2.5" fill="#FBBF24" />

    {/* التنورة بلايز */}
    <path
      d="M55 164 L105 164 L115 180 H45Z"
      fill="url(#sham-skirt)"
    />
    {/* ثنيات التنورة */}
    <path d="M70 164 L68 180" stroke="#1E1B4B" strokeWidth="1" opacity="0.6" />
    <path d="M80 164 L80 180" stroke="#1E1B4B" strokeWidth="1" opacity="0.6" />
    <path d="M90 164 L92 180" stroke="#1E1B4B" strokeWidth="1" opacity="0.6" />
  </svg>
);

export default ShamAvatar;