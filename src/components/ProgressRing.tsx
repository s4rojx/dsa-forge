"use client";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  label?: string;
}

export default function ProgressRing({
  percentage,
  size = 72,
  label,
}: ProgressRingProps) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E1E1E"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#BB4A1E"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-mono text-xs font-bold text-primary">{percentage}%</p>
        {label && <p className="text-[8px] font-mono text-text-3 uppercase">{label}</p>}
      </div>
    </div>
  );
}
