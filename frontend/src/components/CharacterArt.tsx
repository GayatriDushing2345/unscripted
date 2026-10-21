import React from 'react';

interface CharacterArtProps {
  character: 'aurelia' | 'rowan' | 'theron';
  pose?: 'welcoming' | 'thinking' | 'encouraging' | 'victorious';
  className?: string;
  size?: number;
  animated?: boolean;
}

export const CharacterArt: React.FC<CharacterArtProps> = ({
  character,
  pose = 'welcoming',
  className = 'w-24 h-24',
  size = 110,
  animated = true,
}) => {
  const animClass = animated ? 'animate-float' : '';

  if (character === 'aurelia') {
    // Aurelia: The Electric Violet Cartographer & Celestial Star Guide
    return (
      <div className={`relative inline-block ${animClass} ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_12px_24px_rgba(124,58,237,0.35)]"
        >
          <defs>
            <radialGradient id="aurGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="aurHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="aurRobe" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            <linearGradient id="aurStaff" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Luminous Celestial Halo Ring */}
          <circle cx="60" cy="60" r="54" fill="url(#aurGlow)" />
          <circle cx="60" cy="60" r="52" stroke="#A78BFA" strokeWidth="2.5" strokeDasharray="6 4" className="animate-spin-slow origin-center" />

          {/* Character Cape / Robe */}
          <path d="M60 46 C42 46, 28 66, 24 104 H96 C92 66, 78 46, 60 46 Z" fill="url(#aurRobe)" stroke="#3B0764" strokeWidth="2.5" />
          {/* Golden Cosmic Trim */}
          <path d="M46 52 C54 70, 54 86, 54 104 M74 52 C66 70, 66 86, 66 104" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />

          {/* Head & Stylized Anime Hair */}
          <circle cx="60" cy="34" r="18" fill="#FFF1F2" stroke="#4C1D95" strokeWidth="2" />
          {/* Expressive Galaxy Ponytail */}
          <path d="M42 32 C38 16, 54 8, 68 12 C82 16, 86 30, 84 40 C78 36, 72 35, 60 35 C48 35, 44 38, 42 32 Z" fill="url(#aurHair)" stroke="#4C1D95" strokeWidth="2" />

          {/* Sparkly Expressive Eyes */}
          <ellipse cx="53" cy="34" rx="3.5" ry="4.5" fill="#1E152A" />
          <ellipse cx="67" cy="34" rx="3.5" ry="4.5" fill="#1E152A" />
          <circle cx="54.5" cy="32.5" r="1.5" fill="#FFFFFF" />
          <circle cx="68.5" cy="32.5" r="1.5" fill="#FFFFFF" />
          {/* Cheerful Blush */}
          <ellipse cx="48" cy="38" rx="3" ry="1.5" fill="#FDA4AF" />
          <ellipse cx="72" cy="38" rx="3" ry="1.5" fill="#FDA4AF" />
          {/* Friendly Smile */}
          <path d="M57 40 Q60 43 63 40" stroke="#1E152A" strokeWidth="2" strokeLinecap="round" />

          {/* Glowing Stardust Astrolabe Wand */}
          <line x1="88" y1="28" x2="74" y2="92" stroke="url(#aurStaff)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="88" cy="26" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
          <polygon points="88,18 91,24 97,26 91,28 88,34 85,28 79,26 85,24" fill="#F59E0B" />
          <circle cx="88" cy="26" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (character === 'rowan') {
    // Rowan: The Neon Coral Explorer & High-Energy Horizon Scout
    return (
      <div className={`relative inline-block ${animClass} ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_12px_24px_rgba(244,63,94,0.35)]"
        >
          <defs>
            <radialGradient id="rowGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F43F5E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rowCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="rowJacket" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Sunny Warm Glow */}
          <circle cx="60" cy="60" r="54" fill="url(#rowGlow)" />
          <circle cx="60" cy="60" r="52" stroke="#FB7185" strokeWidth="2.5" strokeDasharray="5 5" />

          {/* Adventurer Bomber Jacket */}
          <path d="M60 48 C42 48, 26 68, 22 104 H98 C94 68, 78 48, 60 48 Z" fill="url(#rowJacket)" stroke="#7C2D12" strokeWidth="2.5" />
          {/* Cyber Straps & Pockets */}
          <rect x="36" y="68" width="14" height="18" rx="4" fill="#FED7AA" stroke="#9A3412" strokeWidth="1.5" />
          <rect x="70" y="68" width="14" height="18" rx="4" fill="#FED7AA" stroke="#9A3412" strokeWidth="1.5" />
          <line x1="32" y1="56" x2="88" y2="92" stroke="#431407" strokeWidth="3" strokeLinecap="round" />

          {/* Head & Cheerful Face */}
          <circle cx="60" cy="34" r="18" fill="#FFF1F2" stroke="#881337" strokeWidth="2" />
          {/* Rowan's Backwards Explorer Snapback */}
          <path d="M40 28 C42 16, 56 12, 78 16 C86 24, 82 32, 60 32 C48 32, 42 30, 40 28 Z" fill="url(#rowCap)" stroke="#881337" strokeWidth="2" />
          {/* Cap Visor */}
          <path d="M76 22 C88 22, 98 28, 92 34 L78 30 Z" fill="#E11D48" stroke="#881337" strokeWidth="1.5" />

          {/* Bold Inquisitive Eyes */}
          <ellipse cx="53" cy="34" rx="3.5" ry="4.5" fill="#1E152A" />
          <ellipse cx="67" cy="34" rx="3.5" ry="4.5" fill="#1E152A" />
          <circle cx="54.5" cy="32.5" r="1.5" fill="#FFFFFF" />
          <circle cx="68.5" cy="32.5" r="1.5" fill="#FFFFFF" />
          {/* Peach Freckles */}
          <circle cx="48" cy="39" r="1" fill="#EA580C" />
          <circle cx="51" cy="40" r="1" fill="#EA580C" />
          <circle cx="69" cy="40" r="1" fill="#EA580C" />
          <circle cx="72" cy="39" r="1" fill="#EA580C" />
          {/* Wide Grin */}
          <path d="M56 40 Q60 45 64 40 Z" fill="#F43F5E" stroke="#1E152A" strokeWidth="1.5" />

          {/* Cyber Spyglass in Hand */}
          <rect x="18" y="52" width="22" height="10" rx="3" transform="rotate(-30 18 52)" fill="#06B6D4" stroke="#155E75" strokeWidth="2" />
          <circle cx="34" cy="42" r="5" fill="#A5F3FC" stroke="#0891B2" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // Theron: The Cyber Mint Realist Architect & Master Strategist
  return (
    <div className={`relative inline-block ${animClass} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]"
      >
        <defs>
          <radialGradient id="theGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="theCoat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="theHolo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Emerald Strategy Aura */}
        <circle cx="60" cy="60" r="54" fill="url(#theGlow)" />
        <circle cx="60" cy="60" r="52" stroke="#34D399" strokeWidth="2.5" strokeDasharray="8 4" />

        {/* Tech Trench Coat */}
        <path d="M60 48 C42 48, 28 66, 24 104 H96 C92 66, 78 48, 60 48 Z" fill="url(#theCoat)" stroke="#064E3B" strokeWidth="2.5" />
        {/* Neon Circuit Collar */}
        <path d="M50 48 L60 74 L70 48" fill="#ECFDF5" stroke="#059669" strokeWidth="2.5" />
        <line x1="60" y1="74" x2="60" y2="104" stroke="#A7F3D0" strokeWidth="2" strokeDasharray="3 3" />

        {/* Head & Confident Expression */}
        <circle cx="60" cy="34" r="18" fill="#FFF1F2" stroke="#064E3B" strokeWidth="2" />
        {/* Slick Emerald Cut Hair */}
        <path d="M42 30 C44 16, 56 12, 74 14 C84 20, 82 32, 60 30 C48 30, 44 32, 42 30 Z" fill="#047857" stroke="#064E3B" strokeWidth="2" />

        {/* Smart Cyber Glasses */}
        <rect x="46" y="29" width="12" height="9" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
        <rect x="62" y="29" width="12" height="9" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
        <line x1="58" y1="33" x2="62" y2="33" stroke="#0284C7" strokeWidth="2" />
        {/* Glasses Glisten */}
        <line x1="48" y1="31" x2="55" y2="36" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

        {/* Subtle Knowing Smirk */}
        <path d="M56 42 Q60 44 65 41" stroke="#1E152A" strokeWidth="2" strokeLinecap="round" />

        {/* Holographic Tablet of Data & Trade-Offs */}
        <rect x="74" y="58" width="22" height="30" rx="4" fill="url(#theHolo)" stroke="#0369A1" strokeWidth="2" className="animate-pulse" />
        <line x1="78" y1="66" x2="92" y2="66" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
        <line x1="78" y1="72" x2="88" y2="72" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
        <line x1="78" y1="78" x2="90" y2="78" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
        <circle cx="85" cy="83" r="1.5" fill="#34D399" />
      </svg>
    </div>
  );
};
