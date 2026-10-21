import React from 'react';

interface WindingPathSvgProps {
  totalNodes: number;
  height: number;
  width?: number;
}

export const WindingPathSvg: React.FC<WindingPathSvgProps> = ({
  totalNodes,
  height,
  width = 500,
}) => {
  const nodeSpacing = height / (totalNodes + 1);

  // Calculate coordinates for each node index
  const points = Array.from({ length: totalNodes }).map((_, i) => {
    // Candy Crush wide oscillation
    const angle = i * 1.15;
    const x = width / 2 + Math.sin(angle) * (width * 0.32);
    const y = 80 + i * nodeSpacing;
    return { x, y };
  });

  // Construct smooth bezier track
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midY = (p0.y + p1.y) / 2;
    pathD += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-0"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Bold vibrant gradient along the winding track */}
        <linearGradient id="candyRoadGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="25%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="75%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        <linearGradient id="pavingPattern" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
        </linearGradient>

        <filter id="roadShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#7C3AED" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Chunky Under-track Border */}
      <path
        d={pathD}
        stroke="#E9D5FF"
        strokeWidth="28"
        strokeLinecap="round"
        fill="none"
      />

      {/* Vibrant Rainbow Stone Path */}
      <path
        d={pathD}
        stroke="url(#candyRoadGradient)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
        filter="url(#roadShadow)"
      />

      {/* Stepping Dash Stones */}
      <path
        d={pathD}
        stroke="url(#pavingPattern)"
        strokeWidth="6"
        strokeDasharray="12 12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Floating Star & Gem Waypoints along the path */}
      {points.map((pt, idx) => (
        <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
          <circle r="7" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.5" />
          <circle r="3" fill="#F43F5E" />
        </g>
      ))}
    </svg>
  );
};
