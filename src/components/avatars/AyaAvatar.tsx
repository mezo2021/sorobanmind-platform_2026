import React from 'react';

interface AvatarProps {
  className?: string;
}

export const AyaAvatar: React.FC<AvatarProps> = ({
  className = 'w-24 h-24',
}) => (
  <svg
    viewBox="0 0 160 180"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="آية"
  >
    {/* الحجاب */}
    <path
      d="M41 72 Q39 38 80 25 Q121 38 119 72 L124 109 Q112 147 80 152 Q48 147 36 109Z"
      fill="#DB2777"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="76" rx="31" ry="39" fill="#E4B28D" />

    {/* مقدمة الحجاب */}
    <path
      d="M47 62 Q51 32 80 29 Q109 32 113 62 Q100 48 80 50 Q60 48 47 62Z"
      fill="#F472B6"
    />

    {/* العينان */}
    <ellipse cx="67" cy="77" rx="5.5" ry="7" fill="#30201D" />
    <ellipse cx="93" cy="77" rx="5.5" ry="7" fill="#30201D" />
    <circle cx="65.5" cy="75" r="2" fill="white" />
    <circle cx="91.5" cy="75" r="2" fill="white" />

    {/* الحاجبان */}
    <path
      d="M59 67 Q67 62 74 67"
      stroke="#704936"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M86 67 Q93 62 101 67"
      stroke="#704936"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 80 L77 89 Q80 91 84 89"
      stroke="#B8795A"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة */}
    <path
      d="M69 96 Q80 105 91 96"
      stroke="#723F4A"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الخدان */}
    <ellipse cx="57" cy="91" rx="8" ry="4" fill="#FB7185" opacity="0.4" />
    <ellipse cx="103" cy="91" rx="8" ry="4" fill="#FB7185" opacity="0.4" />

    {/* اللباس */}
    <path
      d="M38 112 Q80 99 122 112 L140 174 H20Z"
      fill="#EC4899"
    />

    {/* الياقة */}
    <path
      d="M62 112 Q80 127 98 112"
      fill="#FCE7F3"
    />

    {/* نجوم صغيرة */}
    <circle cx="62" cy="143" r="4" fill="#FDE68A" />
    <circle cx="98" cy="143" r="4" fill="#FDE68A" />
    <path
      d="M80 134 L83 141 L90 142 L85 147 L86 154 L80 151 L74 154 L75 147 L70 142 L77 141Z"
      fill="#FBBF24"
    />
  </svg>
);

export default AyaAvatar;