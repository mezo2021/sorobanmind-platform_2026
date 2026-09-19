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
    {/* الحجاب */}
    <path
      d="M42 72 Q38 38 80 25 Q122 38 118 72 L122 108 Q112 145 80 151 Q48 145 38 108Z"
      fill="#7C3AED"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="76" rx="31" ry="38" fill="#F3C7A5" />

    {/* غطاء الحجاب الأمامي */}
    <path
      d="M47 63 Q50 31 80 30 Q110 31 113 63 Q100 49 80 50 Q60 49 47 63Z"
      fill="#A78BFA"
    />

    {/* العينان */}
    <ellipse cx="67" cy="78" rx="5.5" ry="7" fill="#33251F" />
    <ellipse cx="93" cy="78" rx="5.5" ry="7" fill="#33251F" />
    <circle cx="65.5" cy="76" r="2" fill="white" />
    <circle cx="91.5" cy="76" r="2" fill="white" />

    {/* الحاجبان */}
    <path
      d="M59 68 Q67 63 74 68"
      stroke="#6B4635"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M86 68 Q93 63 101 68"
      stroke="#6B4635"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 80 L77 88 Q80 90 84 88"
      stroke="#B87858"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة */}
    <path
      d="M70 96 Q80 104 90 96"
      stroke="#7A3F43"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الخدان */}
    <ellipse cx="57" cy="91" rx="8" ry="4" fill="#F59EAA" opacity="0.45" />
    <ellipse cx="103" cy="91" rx="8" ry="4" fill="#F59EAA" opacity="0.45" />

    {/* الجسم والملابس المحتشمة */}
    <path
      d="M39 112 Q80 98 121 112 L139 174 H21Z"
      fill="#8B5CF6"
    />

    {/* الياقة */}
    <path
      d="M61 111 Q80 128 99 111"
      fill="#F5F3FF"
    />

    {/* الزخرفة */}
    <circle cx="80" cy="143" r="10" fill="#FBBF24" opacity="0.95" />
    <path
      d="M74 143 L78 147 L87 137"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* الكتاب */}
    <path
      d="M31 137 Q43 132 54 138 L54 161 Q42 155 31 160Z"
      fill="#FEF3C7"
      stroke="#D97706"
      strokeWidth="2"
    />
    <path
      d="M54 138 Q65 132 76 137 L76 160 Q65 155 54 161Z"
      fill="#FFF7ED"
      stroke="#D97706"
      strokeWidth="2"
    />
  </svg>
);

export default ShamAvatar;