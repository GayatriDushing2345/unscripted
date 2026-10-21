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
    // Wide smooth oscillation
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
        {/* Emerald to Champagne Gold Road Gradient */}
        <linearGradient id="emeraldRoadGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="25%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="75%" stopColor="#059669" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>

        <linearGradient id="pavingPattern" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0.3" />
        </linearGradient>

        <filter id="roadShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#064E3B" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Chunky Ivory Under-track Border */}
      <path
        d={pathD}
        stroke="#E5DDD1"
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />

      {/* Rich Emerald & Gold Stone Path */}
      <path
        d={pathD}
        stroke="url(#emeraldRoadGradient)"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        filter="url(#roadShadow)"
      />

      {/* Stepping Dash Stones in Warm Ivory */}
      <path
        d={pathD}
        stroke="url(#pavingPattern)"
        strokeWidth="6"
        strokeDasharray="12 14"
        strokeLinecap="round"
        fill="none"
      />

      {/* Waypoint Markers */}
      {points.map((pt, idx) => (
        <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
          <circle r="8" fill="#FAF7F2" stroke="#064E3B" strokeWidth="2.5" />
          <circle r="3.5" fill="#D4AF37" />
        </g>
      ))}
    </svg>
  );
};
