interface CertificateLogoProps {
  size?: number;
}

export default function CertificateLogo({ size = 100 }: CertificateLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ringGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
        <radialGradient id="discNavy" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3D2A6B" />
          <stop offset="60%" stopColor="#1E1240" />
          <stop offset="100%" stopColor="#0A0520" />
        </radialGradient>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <radialGradient id="beadGold" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="45%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="0" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* الحلقة الخارجية */}
      <circle cx="100" cy="100" r="98" fill="url(#ringGold)" />
      <circle cx="100" cy="100" r="94" fill="none" stroke="#8B6914" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#FFF9C4" strokeWidth="0.5" />

      {/* نقاط زخرفية */}
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i * (360 / 48) * Math.PI) / 180;
        const x = 100 + 92 * Math.cos(angle);
        const y = 100 + 92 * Math.sin(angle);
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={i % 6 === 0 ? '1.4' : '0.8'}
            fill={i % 6 === 0 ? '#FFF9C4' : '#DAA520'}
          />
        );
      })}

      {/* القرص الداخلي */}
      <circle cx="100" cy="100" r="86" fill="url(#discNavy)" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#FFD700" strokeWidth="0.6" />

      {/* النجمة الثمانية */}
      <g opacity="0.35">
        <polygon
          points="100,28 118,82 172,82 128,116 145,170 100,138 55,170 72,116 28,82 82,82"
          fill="none" stroke="#FFD700" strokeWidth="0.6"
        />
        <polygon
          points="100,28 82,82 28,82 72,116 55,170 100,138 145,170 128,116 172,82 118,82"
          fill="none" stroke="#FFD700" strokeWidth="0.6"
        />
      </g>

      {/* حلقة ذهبية داخلية */}
      <circle cx="100" cy="100" r="70" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.6" />

      {/* السوروبان المبسّط */}
      <g filter="url(#softShadow)">
        {[72, 86, 100, 114, 128].map((x, i) => (
          <line
            key={`rod-${i}`}
            x1={x} y1="68" x2={x} y2="132"
            stroke="url(#goldStroke)" strokeWidth="1.4" strokeLinecap="round"
          />
        ))}
        <line
          x1="66" y1="98" x2="134" y2="98"
          stroke="url(#goldStroke)" strokeWidth="1.8" strokeLinecap="round"
        />
        {[72, 86, 100, 114, 128].map((x, i) => (
          <circle
            key={`sky-${i}`}
            cx={x} cy="86" r="4.5"
            fill="url(#beadGold)" stroke="#8B6914" strokeWidth="0.6"
          />
        ))}
        {[72, 86, 100, 114, 128].map((x, i) => (
          <g key={`earth-${i}`}>
            <circle cx={x} cy="108" r="4" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="0.5" />
            <circle cx={x} cy="116" r="4" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="0.5" />
            <circle cx={x} cy="124" r="4" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="0.5" />
            <circle cx={x} cy="131" r="4" fill="url(#beadGold)" stroke="#8B6914" strokeWidth="0.5" />
          </g>
        ))}
      </g>

      {/* نجوم صغيرة أعلى وأسفل */}
      <g fill="#FFD700">
        <polygon points="100,12 101.5,16 105.5,16 102.5,18.5 103.5,22.5 100,20 96.5,22.5 97.5,18.5 94.5,16 98.5,16" />
        <polygon points="100,178 101.5,182 105.5,182 102.5,184.5 103.5,188.5 100,186 96.5,188.5 97.5,184.5 94.5,182 98.5,182" />
      </g>
    </svg>
  );
}