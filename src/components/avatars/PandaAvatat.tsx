import React from 'react';

interface AvatarProps {
  className?: string;
}

export const PandaAvatar: React.FC<AvatarProps> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="24" r="13" fill="#212121" />
    <circle cx="78" cy="24" r="13" fill="#212121" />
    <ellipse cx="50" cy="52" rx="38" ry="34" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
    <ellipse cx="33" cy="48" rx="12" ry="14" fill="#212121" transform="rotate(-15 33 48)" />
    <ellipse cx="67" cy="48" rx="12" ry="14" fill="#212121" transform="rotate(15 67 48)" />
    <circle cx="34" cy="46" r="5" fill="#FFFFFF" />
    <circle cx="35" cy="46" r="2.5" fill="#212121" />
    <circle cx="66" cy="46" r="5" fill="#FFFFFF" />
    <circle cx="65" cy="46" r="2.5" fill="#212121" />
    <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#212121" />
    <path d="M 45 64 Q 50 68 55 64" stroke="#212121" strokeWidth="2" strokeLinecap="round" fill="none" />
    <ellipse cx="22" cy="58" rx="6" ry="4" fill="#FF8A80" opacity="0.5" />
    <ellipse cx="78" cy="58" rx="6" ry="4" fill="#FF8A80" opacity="0.5" />
  </svg>
);
