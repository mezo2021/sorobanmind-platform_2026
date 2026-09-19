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
    {/* الشعر */}
    <path
      d="M47 61 Q47 28 80 28 Q113 28 113 61 Q103 45 94 49 Q88 35 80 47 Q70 34 63 49 Q53 44 47 61Z"
      fill="#3A2924"
    />

    {/* الوجه */}
    <ellipse cx="80" cy="76" rx="32" ry="39" fill="#C98F68" />

    {/* الأذنان */}
    <circle cx="47" cy="79" r="7" fill="#C98F68" />
    <circle cx="113" cy="79" r="7" fill="#C98F68" />

    {/* العينان */}
    <ellipse cx="67" cy="77" rx="5.5" ry="7" fill="#241914" />
    <ellipse cx="93" cy="77" rx="5.5" ry="7" fill="#241914" />
    <circle cx="65.5" cy="75" r="2" fill="white" />
    <circle cx="91.5" cy="75" r="2" fill="white" />

    {/* الحاجبان */}
    <path
      d="M59 66 Q67 61 74 66"
      stroke="#55362A"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M86 66 Q93 61 101 66"
      stroke="#55362A"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الأنف */}
    <path
      d="M80 79 L76 89 Q80 91 84 89"
      stroke="#9B654A"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* الابتسامة */}
    <path
      d="M69 96 Q80 105 91 96"
      stroke="#673B35"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* الخدان */}
    <ellipse cx="57" cy="91" rx="7" ry="4" fill="#E99A85" opacity="0.35" />
    <ellipse cx="103" cy="91" rx="7" ry="4" fill="#E99A85" opacity="0.35" />

    {/* اللباس المحتشم */}
    <path
      d="M37 112 Q80 98 123 112 L140 174 H20Z"
      fill="#2563EB"
    />

    {/* الياقة */}
    <path
      d="M62 111 Q80 128 98 111"
      fill="#DBEAFE"
    />

    {/* شارة الحساب */}
    <circle cx="80" cy="145" r="12" fill="#FBBF24" />
    <path
      d="M73 145 H87 M80 138 V152"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* السوروبان */}
    <rect
      x="104"
      y="133"
      width="30"
      height="24"
      rx="5"
      fill="#92400E"
    />
    <path
      d="M109 141 H129 M109 148 H129"
      stroke="#FDE68A"
      strokeWidth="2"
    />
    <circle cx="116" cy="141" r="3" fill="#FBBF24" />
    <circle cx="124" cy="148" r="3" fill="#FBBF24" />
  </svg>
);

export default RayanAvatar;