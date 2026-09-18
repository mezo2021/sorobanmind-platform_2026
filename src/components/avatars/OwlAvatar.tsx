import React from 'react';

interface AvatarProps {
  className?: string;
}

export const OwlAvatar: React.FC<AvatarProps> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="55" rx="36" ry="40" fill="#795548" />
    <ellipse cx="50" cy="65" rx="24" ry="25" fill="#D7CCC8" />
    <path d="M 42 58 Q 46 62 50 58 M 50 58 Q 54 62 58 58" stroke="#8D6E63" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 40 68 Q 45 72 50 68 M 50 68 Q 55 72 60 68" stroke="#8D6E63" strokeWidth="2" fill="none" strokeLinecap="round" />
    <polygon points="25,25 35,10 40,30" fill="#5D4037" />
    <polygon points="75,25 65,10 60,30" fill="#5D4037" />
    <circle cx="35" cy="42" r="16" fill="#FFF8E1" />
    <circle cx="65" cy="42" r="16" fill="#FFF8E1" />
    <circle cx="35" cy="42" r="9" fill="#212121" />
    <circle cx="32" cy="39" r="3" fill="#FFFFFF" />
    <circle cx="65" cy="42" r="9" fill="#212121" />
    <circle cx="62" cy="39" r="3" fill="#FFFFFF" />
    <polygon points="46,48 54,48 50,57" fill="#FFB74D" />
  </svg>
);
