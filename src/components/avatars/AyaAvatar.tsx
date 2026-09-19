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
    <defs>
      <linearGradient id="aya-hair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#7C2D12" />
      </linearGradient>
      <linearGradient id="aya-shirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="aya-jacket" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
      <linearGradient id="aya-jeans" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <radialGradient id="aya-cheek" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FB7185" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* الكعكة اليسرى */}
    <circle cx="52" cy="38" r="12" fill="url(#aya-hair)" />
    <circle cx="52" cy="38" r="12" fill="none" stroke="#F472B6" strokeWidth="2" opacity="0.75" />
    <circle cx="52" cy="34" r="3" fill="#FDE047" />

    {/* الكعكة اليمنى */}
    <circle cx="108" cy="38" r="12" fill="url(#aya-hair)" />
    <circle cx="108" cy="38" r="12" fill="none" stroke="#F472B6" strokeWidth="2" opacity="0.75" />
    <circle cx="108" cy="34" r="3" fill="#FDE047" />

    {/* الشعر الخلفي */}
    <path
      d="M44 76 Q40 34 80 28 Q120 34 116 76 Q112 60 100 56 Q92 50 80 52 Q68 50 60 56 Q48 60 44 76Z"
      fill="url(#aya-hair)"
    />

    {/* الرقبة */}
    <path
      d="M70 108 L70 122 Q80 128 90 122 L90 108Z"
      fill="#E4B28D"
    />
    <path
      d="M70 118 Q80 124 90 118 Q80 122 70 118Z"
      fill="#BD8F6B"
      opacity="0.5"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="78" rx="31" ry="38" fill="#E4B28D" />

    {/* ظل الذقن */}
    <ellipse cx="80" cy="109" rx="18" ry="6" fill="#BD8F6B" opacity="0.35" />

    {/* الغرة الأمامية */}
    <path
      d="M46 66 Q50 30 80 28 Q110 30 114 66 Q106 52 96 52 Q88 60 80 52 Q72 60 64 52 Q54 52 46 66Z"
      fill="url(#aya-hair)"
    />

    {/* الأذنان */}
    <ellipse cx="49" cy="80" rx="5" ry="7" fill="#E4B28D" />
    <ellipse cx="111" cy="80" rx="5" ry="7" fill="#E4B28D" />

    {/* العينان */}
    <ellipse cx="67" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="93" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="67" cy="79" rx="5" ry="6.5" fill="#30201D" />
    <ellipse cx="93" cy="79" rx="5" ry="6.5" fill="#30201D" />
    <circle cx="65.5" cy="77" r="2.2" fill="white" />
    <circle cx="91.5" cy="77" r="2.2" fill="white" />
    <circle cx="68" cy="81.5" r="0.9" fill="white" opacity="0.85" />
    <circle cx="94" cy="81.5" r="0.9" fill="white" opacity="0.85" />

    {/* الحاجبان */}
    <path
      d="M58 69 Q67 63 75 69"
      stroke="#7C2D12"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M85 69 Q93 63 102 69"
      stroke="#7C2D12"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 82 L77 90 Q80 92 84 90"
      stroke="#B8795A"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة المرحة */}
    <path
      d="M68 97 Q80 107 92 97"
      stroke="#723F4A"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M72 99 Q80 104 88 99"
      fill="#FDFDFD"
      opacity="0.6"
    />

    {/* الخدان */}
    <ellipse cx="56" cy="92" rx="9" ry="4.5" fill="url(#aya-cheek)" />
    <ellipse cx="104" cy="92" rx="9" ry="4.5" fill="url(#aya-cheek)" />

    {/* التيشيرت الأصفر */}
    <path
      d="M42 116 Q80 106 118 116 L124 158 H36Z"
      fill="url(#aya-shirt)"
    />
    {/* ظل التيشيرت */}
    <path
      d="M42 116 Q60 111 80 112 Q100 111 118 116 Q100 118 80 119 Q60 118 42 116Z"
      fill="#D97706"
      opacity="0.35"
    />

    {/* الجاكيت الوردي المفتوح (الجانبين) */}
    <path
      d="M42 116 Q56 110 62 124 L58 158 L38 158Z"
      fill="url(#aya-jacket)"
    />
    <path
      d="M118 116 Q104 110 98 124 L102 158 L122 158Z"
      fill="url(#aya-jacket)"
    />
    {/* ياقة الجاكيت */}
    <path
      d="M60 114 L68 128 L74 118"
      fill="#FBCFE8"
      stroke="#F472B6"
      strokeWidth="1"
    />
    <path
      d="M100 114 L92 128 L86 118"
      fill="#FBCFE8"
      stroke="#F472B6"
      strokeWidth="1"
    />

    {/* نجمة على التيشيرت */}
    <path
      d="M80 132 L83 139 L90 140 L85 145 L86 152 L80 149 L74 152 L75 145 L70 140 L77 139Z"
      fill="#FBBF24"
      stroke="#B45309"
      strokeWidth="0.8"
    />

    {/* بنطال الجينز */}
    <path
      d="M48 158 L76 158 L76 180 H48Z"
      fill="url(#aya-jeans)"
    />
    <path
      d="M84 158 L112 158 L112 180 H84Z"
      fill="url(#aya-jeans)"
    />
    {/* خط الحزام */}
    <rect x="46" y="156" width="68" height="4" rx="1.5" fill="#1E3A8A" />
    {/* جيوب الجينز */}
    <path
      d="M52 162 L68 162 L68 168 L52 168Z"
      fill="#3B82F6"
      opacity="0.4"
    />
    <path
      d="M92 162 L108 162 L108 168 L92 168Z"
      fill="#3B82F6"
      opacity="0.4"
    />
  </svg>
);

export default AyaAvatar;