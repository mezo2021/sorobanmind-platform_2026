import React from 'react';

interface AvatarProps {
  className?: string;
}

export const RabbitAvatar: React.FC<AvatarProps> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="35" cy="25" rx="8" ry="22" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1.5" />
    <ellipse cx="35" cy="25" rx="5" ry="17" fill="#FFCDD2" />
    <ellipse cx="65" cy="25" rx="8" ry="22" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1.5" />
    <ellipse cx="65" cy="25" rx="5" ry="17" fill="#FFCDD2" />
    <ellipse cx="50" cy="58" rx="34" ry="30" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1.5" />
    <circle cx="34" cy="52" r="7" fill="#212121" />
    <circle cx="32" cy="50" r="2.5" fill="#FFFFFF" />
    <circle cx="66" cy="52" r="7" fill="#212121" />
    <circle cx="64" cy="50" r="2.5" fill="#FFFFFF" />
    <polygon points="47,60 53,60 50,63" fill="#FF8A80" />
    <path d="M 45 66 Q 50 70 55 66" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="24" cy="60" r="5" fill="#FF8A80" opacity="0.5" />
    <circle cx="76" cy="60" r="5" fill="#FF8A80" opacity="0.5" />
  </svg>
);
