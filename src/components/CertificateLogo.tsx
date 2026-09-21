import React from 'react';

interface CertificateLogoProps {
  size?: number;
  className?: string;
}

const CertificateLogo: React.FC<CertificateLogoProps> = ({ size = 100, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* الخلفية الدائرية الذهبية */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="beadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="beadBlueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* الدائرة الخارجية */}
      <circle cx="100" cy="100" r="95" fill="url(#purpleGradient)" stroke="url(#goldGradient)" strokeWidth="4" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.6" />

      {/* زخارف ذهبية */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <circle cx="100" cy="12" r="3" fill="url(#goldGradient)" />
        </g>
      ))}

      {/* السوروبان المصغر */}
      <g transform="translate(100 100)">
        {/* الإطار */}
        <rect x="-50" y="-40" width="100" height="80" rx="6" fill="#1E1B4B" stroke="url(#goldGradient)" strokeWidth="2.5" />
        
        {/* العارضة الوسطى */}
        <rect x="-50" y="-6" width="100" height="4" fill="url(#goldGradient)" rx="2" />
        
        {/* القضبان */}
        {[-38, -19, 0, 19, 38].map((x) => (
          <line key={x} x1={x} y1="-40" x2={x} y2="40" stroke="#78350F" strokeWidth="2.5" />
        ))}
        
        {/* الخرزات العلوية (ذهبية) */}
        {[-38, -19, 0, 19, 38].map((x) => (
          <circle key={`upper-${x}`} cx={x} cy="-20" r="6" fill="url(#beadGradient)" stroke="#FBBF24" strokeWidth="1" />
        ))}
        
        {/* الخرزات السفلية (زرقاء) - الصف العلوي */}
        {[-38, -19, 0, 19, 38].map((x) => (
          <circle key={`lower1-${x}`} cx={x} cy="8" r="6" fill="url(#beadBlueGradient)" stroke="#0EA5E9" strokeWidth="1" />
        ))}
        
        {/* الخرزات السفلية (زرقاء) - الصف الثاني */}
        {[-38, -19, 0, 19, 38].map((x) => (
          <circle key={`lower2-${x}`} cx={x} cy="22" r="6" fill="url(#beadBlueGradient)" stroke="#0EA5E9" strokeWidth="1" />
        ))}
      </g>

      {/* نجوم الزينة */}
      <g opacity="0.8">
        <path d="M 100 155 L 102 160 L 107 160 L 103 163 L 105 168 L 100 165 L 95 168 L 97 163 L 93 160 L 98 160 Z" fill="url(#goldGradient)" />
      </g>
    </svg>
  );
};

export default CertificateLogo;