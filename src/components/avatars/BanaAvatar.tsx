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
    <defs>
      <linearGradient id="bana-hair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A2E1F" />
        <stop offset="100%" stopColor="#2B1A0F" />
      </linearGradient>
      <linearGradient id="bana-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5EEAD4" />
        <stop offset="100%" stopColor="#0D9488" />
      </linearGradient>
      <linearGradient id="bana-pants" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D6D3D1" />
        <stop offset="100%" stopColor="#A8A29E" />
      </linearGradient>
      <radialGradient id="bana-cheek" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#F59EAA" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F59EAA" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* الشعر الطويل المفرود (خلف الرأس) */}
    <path
      d="M38 70 Q34 32 80 26 Q126 32 122 70 L126 140 Q120 148 112 145 L118 80 Q110 60 80 58 Q50 60 42 80 L48 145 Q40 148 34 140Z"
      fill="url(#bana-hair)"
    />

    {/* الرقبة */}
    <path
      d="M70 108 L70 122 Q80 128 90 122 L90 108Z"
      fill="#D7A17B"
    />
    <path
      d="M70 118 Q80 124 90 118 Q80 122 70 118Z"
      fill="#AB7855"
      opacity="0.5"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="78" rx="31" ry="38" fill="#D7A17B" />

    {/* ظل الذقن */}
    <ellipse cx="80" cy="109" rx="18" ry="6" fill="#AB7855" opacity="0.35" />

    {/* الغرة الناعمة */}
    <path
      d="M46 66 Q50 32 80 30 Q110 32 114 66 Q108 50 96 48 Q88 56 80 50 Q72 56 64 48 Q52 50 46 66Z"
      fill="url(#bana-hair)"
    />
    {/* خصلة جانبية على الجبين */}
    <path
      d="M56 58 Q62 68 58 78 Q54 74 56 58Z"
      fill="#3A2318"
      opacity="0.85"
    />

    {/* الأذنان */}
    <ellipse cx="49" cy="80" rx="5" ry="7" fill="#D7A17B" />
    <ellipse cx="111" cy="80" rx="5" ry="7" fill="#D7A17B" />

    {/* العينان */}
    <ellipse cx="67" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="93" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="67" cy="79" rx="5" ry="6.5" fill="#2C211D" />
    <ellipse cx="93" cy="79" rx="5" ry="6.5" fill="#2C211D" />
    <circle cx="65.5" cy="77" r="2.2" fill="white" />
    <circle cx="91.5" cy="77" r="2.2" fill="white" />
    <circle cx="68" cy="81.5" r="0.9" fill="white" opacity="0.85" />
    <circle cx="94" cy="81.5" r="0.9" fill="white" opacity="0.85" />

    {/* رموش ناعمة */}
    <path
      d="M61 74 L58 71"
      stroke="#2B1A0F"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M99 74 L102 71"
      stroke="#2B1A0F"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* الحاجبان */}
    <path
      d="M58 69 Q67 64 75 69"
      stroke="#4A2E1F"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M85 69 Q93 64 102 69"
      stroke="#4A2E1F"
      strokeWidth="2.8"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 82 L77 90 Q80 92 84 90"
      stroke="#A96C51"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة الهادئة */}
    <path
      d="M70 98 Q80 105 90 98"
      stroke="#633E3D"
      strokeWidth="2.8"
      strokeLinecap="round"
    />

    {/* الخدان */}
    <ellipse cx="56" cy="92" rx="9" ry="4.5" fill="url(#bana-cheek)" />
    <ellipse cx="104" cy="92" rx="9" ry="4.5" fill="url(#bana-cheek)" />

    {/* البلوزة التركوازية */}
    <path
      d="M42 116 Q80 106 118 116 L124 158 H36Z"
      fill="url(#bana-top)"
    />
    {/* ظل البلوزة */}
    <path
      d="M42 116 Q60 111 80 112 Q100 111 118 116 Q100 118 80 119 Q60 118 42 116Z"
      fill="#0F766E"
      opacity="0.4"
    />
    {/* ياقة V ناعمة */}
    <path
      d="M68 114 L80 128 L92 114"
      fill="#CCFBF1"
      stroke="#5EEAD4"
      strokeWidth="1.2"
    />

    {/* حزام بسيط */}
    <rect x="55" y="155" width="50" height="5" rx="2" fill="#78350F" />
    <rect x="76" y="154" width="8" height="7" rx="1.5" fill="#FBBF24" />

    {/* البنطال البيج */}
    <path
      d="M48 160 L76 160 L76 180 H48Z"
      fill="url(#bana-pants)"
    />
    <path
      d="M84 160 L112 160 L112 180 H84Z"
      fill="url(#bana-pants)"
    />
    {/* ثنية ساق البنطال */}
    <path
      d="M48 174 L76 174"
      stroke="#78716C"
      strokeWidth="1"
      opacity="0.5"
    />
    <path
      d="M84 174 L112 174"
      stroke="#78716C"
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

export default BanaAvatar;