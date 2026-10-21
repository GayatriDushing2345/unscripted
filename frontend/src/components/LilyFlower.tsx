import React from 'react';

interface LilyFlowerProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LilyFlower: React.FC<LilyFlowerProps> = ({
  className = "w-6 h-6",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Unscripted Lily Flower Motif"
    >
      {/* Central Lily Bud & Petal */}
      <path
        d="M24 6C24 6 20 18 20 28C20 34 24 40 24 40C24 40 28 34 28 28C28 18 24 6 24 6Z"
        fill="url(#lilyGradientCenter)"
        stroke="#9C8EB9"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Left Petal */}
      <path
        d="M22 28C22 28 15 20 10 22C5 24 6 32 12 34C17 36 22 34 22 34"
        fill="url(#lilyGradientPetal)"
        stroke="#9C8EB9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Petal */}
      <path
        d="M26 28C26 28 33 20 38 22C43 24 42 32 36 34C31 36 26 34 26 34"
        fill="url(#lilyGradientPetal)"
        stroke="#9C8EB9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Delicate Pistil Filaments */}
      <path
        d="M24 24V14M21 26C19 21 17 17 15 16M27 26C29 21 31 17 33 16"
        stroke="#E2A7A1"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Pollen Tips */}
      <circle cx="24" cy="13" r="1.5" fill="#E2A7A1" />
      <circle cx="15" cy="15" r="1.2" fill="#E2A7A1" />
      <circle cx="33" cy="15" r="1.2" fill="#E2A7A1" />

      {/* Gradients */}
      <defs>
        <linearGradient id="lilyGradientCenter" x1="24" y1="6" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFBF8" />
          <stop offset="0.6" stopColor="#ECE7F5" />
          <stop offset="1" stopColor="#E2A7A1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="lilyGradientPetal" x1="10" y1="22" x2="22" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAF7F2" />
          <stop offset="1" stopColor="#ECE7F5" />
        </linearGradient>
      </defs>
    </svg>
  );
};
