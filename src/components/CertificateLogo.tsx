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
        <radialGradient id="outerRing" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="45%" stopColor="#FFD700" />
          <stop offset="80%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
        <radialGradient id="innerDisc" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#2a1a5e" />
          <stop offset="100%" stopColor="#0f0a2e" />
        </radialGradient>
        <linearGradient id="woodFrame" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8B888" />
          <stop offset="50%" stopColor="#C69060" />
          <stop offset="100%" stopColor="#8B5A2B" />
        </linearGradient>
        <linearGradient id="beadGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="beadBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B3E5FC" />
          <stop offset="50%" stopColor="#29B6F6" />
          <stop offset="100%" stopColor="#0277BD" />
        </linearGradient>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D3A1A" />
          <stop offset="100%" stopColor="#3A220D" />
        </linearGradient>
      </defs>

      {/* الحلقة الذهبية الخارجية */}
      <circle cx="100" cy="100" r="98" fill="url(#outerRing)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#8B6914" strokeWidth="1" />
      <circle cx="100" cy="100" r="88" fill="url(#innerDisc)" />

      {/* نقاط زخرفية حول الحلقة */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i * (360 / 32) * Math.PI) / 180;
        const x = 100 + 94 * Math.cos(angle);
        const y = 100 + 94 * Math.sin(angle);
        return <circle key={`d-${i}`} cx={x} cy={y} r="1.2" fill="#FFF59D" />;
      })}

      {/* قوس علوي: ISA */}
      <path
        id="topArc"
        d="M 30,100 A 70,70 0 0 1 170,100"
        fill="none"
      />
      <text fill="#FFD700" fontSize="13" fontWeight="bold" fontFamily="serif" letterSpacing="3">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          ★ INTERNATIONAL SOROBAN ACADEMY ★
        </textPath>
      </text>

      {/* قوس سفلي: عربي */}
      <path
        id="bottomArc"
        d="M 170,105 A 70,70 0 0 1 30,105"
        fill="none"
      />
      <text fill="#FFD700" fontSize="11" fontWeight="bold" fontFamily="serif">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          ★ أكاديمية السوروبان الدولية ★
        </textPath>
      </text>

      {/* إطار السوروبان الخشبي */}
      <rect
        x="48"
        y="62"
        width="104"
        height="76"
        rx="5"
        fill="url(#woodFrame)"
        stroke="#5D3A1A"
        strokeWidth="2.5"
      />
      <rect x="54" y="68" width="92" height="64" rx="2" fill="#FBF2E0" />

      {/* العارضة الوسطى */}
      <rect x="54" y="94" width="92" height="5" fill="url(#beamGrad)" />

      {/* القضبان العمودية (5 قضبان) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`rod-${i}`}
          x1={64 + i * 18}
          y1="68"
          x2={64 + i * 18}
          y2="132"
          stroke="#8B5A2B"
          strokeWidth="1.2"
        />
      ))}

      {/* خرزات السماء (ذهبية) — واحدة فوق كل قضيب */}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={`heaven-${i}`}
          cx={64 + i * 18}
          cy="83"
          rx="7"
          ry="5.5"
          fill="url(#beadGold)"
          stroke="#8B6914"
          strokeWidth="0.6"
        />
      ))}

      {/* خرزات الأرض (زرقاء) — 4 تحت كل قضيب */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`earth-${i}`}>
          <ellipse cx={64 + i * 18} cy="103" rx="7" ry="5" fill="url(#beadBlue)" stroke="#01579B" strokeWidth="0.6" />
          <ellipse cx={64 + i * 18} cy="112" rx="7" ry="5" fill="url(#beadBlue)" stroke="#01579B" strokeWidth="0.6" />
          <ellipse cx={64 + i * 18} cy="121" rx="7" ry="5" fill="url(#beadBlue)" stroke="#01579B" strokeWidth="0.6" />
          <ellipse cx={64 + i * 18} cy="128" rx="7" ry="5" fill="url(#beadBlue)" stroke="#01579B" strokeWidth="0.6" />
        </g>
      ))}

      {/* نجمة ذهبية أسفل السوروبان */}
      <polygon
        points="100,150 103,158 111,158 105,163 107,171 100,166 93,171 95,163 89,158 97,158"
        fill="#FFD700"
        stroke="#8B6914"
        strokeWidth="0.8"
      />
    </svg>
  );
}