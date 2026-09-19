import React from 'react';

interface AvatarProps {
  className?: string;
}

export const BanaAvatar: React.FC<AvatarProps> = ({
  className = 'w-24 h-24',
}) => (
  <svg
    viewBox="0 0 160 180"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="بانة"
  >
    {/* الحجاب */}
    <path
      d="M40 73 Q38 37 80 25 Q122 37 120 73 L125 111 Q112 148 80 153 Q48 148 35 111Z"
      fill="#0F766E"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="77" rx="30" ry="38" fill="#D7A17B" />

    {/* مقدمة الحجاب */}
    <path
      d="M48 62 Q53 32 80 30 Q107 32 112 62 Q100 49 80 50 Q60 49 48 62Z"
      fill="#14B8A6"
    />

    {/* العينان */}
    <ellipse cx="67" cy="78" rx="5.5" ry="7" fill="#2C211D" />
    <ellipse cx="93" cy="78" rx="5.5" ry="7" fill="#2C211D" />
    <circle cx="65.5" cy="76" r="2" fill="white" />
    <circle cx="91.5" cy="76" r="2" fill="white" />

    {/* الحاجبان */}
    <path
      d="M59 68 Q67 63 74 68"
      stroke="#69483A"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M86 68 Q93 63 101 68"
      stroke="#69483A"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 81 L77 89 Q80 91 84 89"
      stroke="#A96C51"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة */}
    <path
      d="M70 97 Q80 103 90 97"
      stroke="#633E3D"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الخدان */}
    <ellipse cx="57" cy="92" rx="8" ry="4" fill="#F59EAA" opacity="0.4" />
    <ellipse cx="103" cy="92" rx="8" ry="4" fill="#F59EAA" opacity="0.4" />

    {/* اللباس */}
    <path
      d="M38 112 Q80 99 122 112 L140 174 H20Z"
      fill="#0D9488"
    />

    {/* ياقة */}
    <path
      d="M62 112 Q80 126 98 112"
      fill="#CCFBF1"
    />

    {/* زخرفة نجمة */}
    <path
      d="M80 133 L84 142 L94 143 L86 149 L89 159 L80 153 L71 159 L74 149 L66 143 L76 142Z"
      fill="#FBBF24"
    />

    {/* كتاب صغير */}
    <rect
      x="105"
      y="133"
      width="28"
      height="25"
      rx="4"
      fill="#FEF3C7"
      stroke="#D97706"
      strokeWidth="2"
    />
    <path
      d="M110 141 H128 M110 147 H125"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default BanaAvatar;