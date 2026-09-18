import React from 'react';

interface AvatarProps {
  className?: string;
}

export const FoxAvatar: React.FC<AvatarProps> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="18,15 42,45 12,45" fill="#E65100" />
    <polygon points="24,22 36,42 18,42" fill="#FFE0B2" />
    <polygon points="82,15 58,45 88,45" fill="#E65100" />
    <polygon points="76,22 64,42 82,42" fill="#FFE0B2" />
    <path d="M 15 50 Q 50 20 85 50 Q 85 85 50 90 Q 15 85 15 50" fill="#F57C00" />
    <path d="M 15 55 Q 35 65 50 88 Q 65 65 85 55 Q 85 85 50 90 Q 15 85 15 55" fill="#FFFFFF" />
    <circle cx="34" cy="48" r="8" fill="#212121" />
    <circle cx="32" cy="45" r="3" fill="#FFFFFF" />
    <circle cx="66" cy="48" r="8" fill="#212121" />
    <circle cx="64" cy="45" r="3" fill="#FFFFFF" />
    <ellipse cx="50" cy="62" rx="5" ry="3.5" fill="#212121" />
    <path d="M 45 67 Q 50 72 55 67" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="25" cy="58" r="5" fill="#FF8A80" opacity="0.6" />
    <circle cx="75" cy="58" r="5" fill="#FF8A80" opacity="0.6" />
  </svg>
);
