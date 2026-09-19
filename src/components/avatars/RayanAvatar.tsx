import React from 'react';

interface AvatarProps {
  className?: string;
}

export const RayanAvatar: React.FC<AvatarProps> = ({
  className = 'w-24 h-24',
}) => (
  <svg
    viewBox="0 0 160 180"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="ريان"
  >
    <defs>
      <linearGradient id="rayan-hair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2B1E1A" />
        <stop offset="100%" stopColor="#15100E" />
      </linearGradient>
      <linearGradient id="rayan-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="rayan-shorts" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <radialGradient id="rayan-cheek" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* الشعر الخلفي */}
    <path
      d="M46 66 Q48 30 80 28 Q112 30 114 66 L112 78 Q106 60 100 56 Q92 48 80 50 Q68 48 60 56 Q54 60 48 78Z"
      fill="url(#rayan-hair)"
    />

    {/* الرقبة */}
    <path
      d="M70 108 L70 122 Q80 128 90 122 L90 108Z"
      fill="#C98F68"
    />
    <path
      d="M70 118 Q80 124 90 118 Q80 122 70 118Z"
      fill="#A1704E"
      opacity="0.5"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="78" rx="32" ry="39" fill="#C98F68" />

    {/* ظل الذقن */}
    <ellipse cx="80" cy="109" rx="18" ry="6" fill="#9B654A" opacity="0.35" />

    {/* الأذنان */}
    <ellipse cx="48" cy="80" rx="5.5" ry="8" fill="#C98F68" />
    <ellipse cx="112" cy="80" rx="5.5" ry="8" fill="#C98F68" />

    {/* الغرة الأمامية */}
    <path
      d="M46 68 Q48 30 80 28 Q112 30 114 68 Q108 52 100 48 Q92 42 80 46 Q68 42 60 48 Q52 52 46 68Z"
      fill="url(#rayan-hair)"
    />

    {/* العينان */}
    <ellipse cx="67" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="93" cy="79" rx="6" ry="7.5" fill="#FDFDFD" />
    <ellipse cx="67" cy="79" rx="5" ry="6.5" fill="#241914" />
    <ellipse cx="93" cy="79" rx="5" ry="6.5" fill="#241914" />
    <circle cx="65.5" cy="77" r="2.2" fill="white" />
    <circle cx="91.5" cy="77" r="2.2" fill="white" />
    <circle cx="68" cy="81.5" r="0.9" fill="white" opacity="0.85" />
    <circle cx="94" cy="81.5" r="0.9" fill="white" opacity="0.85" />

    {/* الحاجبان */}
    <path
      d="M58 68 Q67 63 75 68"
      stroke="#2B1E1A"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M85 68 Q93 63 102 68"
      stroke="#2B1E1A"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 81 L76 90 Q80 92 84 90"
      stroke="#9B654A"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة الرياضية */}
    <path
      d="M68 98 Q80 107 92 98"
      stroke="#673B35"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M72 99 Q80 104 88 99"
      fill="#FDFDFD"
      opacity="0.6"
    />

    {/* الخدان */}
    <ellipse cx="56" cy="92" rx="8" ry="4" fill="url(#rayan-cheek)" />
    <ellipse cx="104" cy="92" rx="8" ry="4" fill="url(#rayan-cheek)" />

    {/* القميص الرياضي الأزرق */}
    <path
      d="M42 116 Q80 106 118 116 L124 158 H36Z"
      fill="url(#rayan-top)"
    />
    {/* ظل القميص */}
    <path
      d="M42 116 Q60 111 80 112 Q100 111 118 116 Q100 118 80 119 Q60 118 42 116Z"
      fill="#1D4ED8"
      opacity="0.4"
    />

    {/* خطوط رياضية بيضاء على الكتفين */}
    <path
      d="M46 122 L56 122"
      stroke="#FDFDFD"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M104 122 L114 122"
      stroke="#FDFDFD"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* رقم رياضي على الصدر */}
    <circle cx="80" cy="134" r="8" fill="#FDFDFD" opacity="0.9" />
    <text
      x="80"
      y="138"
      textAnchor="middle"
      fill="#2563EB"
      fontSize="11"
      fontWeight="900"
      fontFamily="Arial, sans-serif"
    >
      1
    </text>

    {/* ياقة رياضية مدورة */}
    <path
      d="M68 114 Q80 126 92 114"
      fill="#DBEAFE"
      stroke="#93C5FD"
      strokeWidth="1.2"
    />

    {/* الحزام الرياضي */}
    <rect x="55" y="155" width="50" height="5" rx="2" fill="#FBBF24" />
    <rect x="76" y="154" width="8" height="7" rx="1.5" fill="#1E293B" />

    {/* الشورت الرياضي الداكن */}
    <path
      d="M48 160 L112 160 L118 180 H42Z"
      fill="url(#rayan-shorts)"
    />
    {/* خط أبيض على الجانب */}
    <path
      d="M50 162 L48 180"
      stroke="#FDFDFD"
      strokeWidth="1.5"
      opacity="0.7"
    />
    <path
      d="M110 162 L112 180"
      stroke="#FDFDFD"
      strokeWidth="1.5"
      opacity="0.7"
    />
  </svg>
);

export default RayanAvatar;