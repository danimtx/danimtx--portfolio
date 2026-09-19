import React from 'react';

export type LogoVariant = 'cyber' | 'brackets' | 'monogram' | 'stealth';

interface BrandLogoProps {
  className?: string;
  variant?: LogoVariant;
}

/**
 * Custom Feline Tech Brand Mark for "danimtx"
 * Four distinct concepts combining cats, clean geometry, and developer identity.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-6 h-6',
  variant = 'stealth'
}) => {
  if (variant === 'brackets') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="danimtx Syntax Cat Logo"
      >
        <defs>
          <linearGradient id="bracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4F014" />
            <stop offset="100%" stopColor="#9EE000" />
          </linearGradient>
        </defs>
        {/* Left Ear < */}
        <path d="M26,44 L44,22 L52,42" stroke="url(#bracketGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right Ear > */}
        <path d="M68,42 L76,22 L94,44" stroke="url(#bracketGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Head Contour */}
        <path d="M26,52 C22,68 28,88 44,96 C52,100 68,100 76,96 C92,88 98,68 94,52" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        {/* Slit Eyes */}
        <path d="M40,64 L50,60" stroke="#D4F014" strokeWidth="5" strokeLinecap="round" />
        <path d="M80,64 L70,60" stroke="#D4F014" strokeWidth="5" strokeLinecap="round" />
        {/* Nose & Whiskers */}
        <circle cx="60" cy="74" r="3" fill="#D4F014" />
        <line x1="16" y1="68" x2="32" y2="70" stroke="url(#bracketGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1="18" y1="78" x2="34" y2="76" stroke="url(#bracketGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1="104" y1="68" x2="88" y2="70" stroke="url(#bracketGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1="102" y1="78" x2="86" y2="76" stroke="url(#bracketGrad)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'monogram') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="danimtx Monogram Cat Logo"
      >
        <defs>
          <linearGradient id="monoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4F014" />
            <stop offset="100%" stopColor="#8AC600" />
          </linearGradient>
        </defs>
        <path
          d="M34,88 L34,36 L48,18 L54,46 L60,36 L66,46 L72,18 L86,36 L86,88"
          stroke="url(#monoGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M34,60 C42,60 50,66 50,74 C50,82 42,88 34,88" stroke="url(#monoGrad)" strokeWidth="6" strokeLinecap="round" />
        <path d="M86,60 C78,60 70,66 70,74 C70,82 78,88 86,88" stroke="url(#monoGrad)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="48" cy="56" r="4" fill="#D4F014" />
        <circle cx="72" cy="56" r="4" fill="#D4F014" />
        <polygon points="60,68 56,62 64,62" fill="#FFFFFF" />
      </svg>
    );
  }

  if (variant === 'stealth') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="danimtx Stealth Cat Logo"
      >
        <defs>
          <linearGradient id="stealthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4F014" />
            <stop offset="100%" stopColor="#A8DE08" />
          </linearGradient>
        </defs>
        <polygon points="30,22 48,52 26,52" fill="url(#stealthGrad)" />
        <polygon points="90,22 94,52 72,52" fill="url(#stealthGrad)" />
        <path d="M48,52 L72,52 L60,62 Z" fill="#1E1E1E" stroke="url(#stealthGrad)" strokeWidth="2" />
        <polygon points="26,52 60,38 94,52 90,84 60,102 30,84" fill="#141414" stroke="url(#stealthGrad)" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="40,64 54,66 44,74" fill="#D4F014" />
        <polygon points="80,64 66,66 76,74" fill="#D4F014" />
        <circle cx="60" cy="80" r="3" fill="#D4F014" />
      </svg>
    );
  }

  // Default: CyberCat (Geometric Polygonal)
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="danimtx CyberCat Logo"
    >
      <defs>
        <linearGradient id="cyberLime" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5FF2E" />
          <stop offset="100%" stopColor="#A6E600" />
        </linearGradient>
      </defs>

      {/* Sharp Polygonal Ears */}
      <polygon points="28,24 46,50 24,54" fill="url(#cyberLime)" opacity="0.95" />
      <polygon points="92,24 96,54 74,50" fill="url(#cyberLime)" opacity="0.95" />

      {/* Head Polyhedral Mask */}
      <polygon
        points="28,50 60,34 92,50 96,78 60,102 24,78"
        fill="#141414"
        stroke="url(#cyberLime)"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Forehead Vertex & Diamond */}
      <polygon points="60,44 70,54 60,64 50,54" fill="#1E1E1E" stroke="#D4F014" strokeWidth="2" />
      <circle cx="60" cy="54" r="2.5" fill="#D4F014" />

      {/* Piercing Feline Slit Eyes */}
      <polygon points="38,66 52,68 44,76" fill="#D4F014" />
      <polygon points="82,66 76,76 68,68" fill="#D4F014" />

      {/* Nose & Whiskers */}
      <polygon points="57,80 63,80 60,85" fill="#D4F014" />
      <line x1="20" y1="74" x2="32" y2="76" stroke="#D4F014" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="22" y1="84" x2="34" y2="82" stroke="#D4F014" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="100" y1="74" x2="88" y2="76" stroke="#D4F014" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="98" y1="84" x2="86" y2="82" stroke="#D4F014" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
};
