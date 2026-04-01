interface ProgressBarProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  completed?: number;
  total?: number;
}

export default function ProgressBar({
  percentage,
  size = "md",
  showLabel = false,
  completed,
  total,
}: ProgressBarProps) {
  const heights: Record<string, string> = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div>
      {showLabel && completed !== undefined && total !== undefined && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-text-2">
            {completed}/{total}
          </span>
          <span className="text-[10px] font-mono text-text-3">{percentage}%</span>
        </div>
      )}
      <div className={`w-full rounded-full bg-bg-surface ${heights[size]} overflow-hidden`}>
        <div
          className={`${heights[size]} rounded-full bg-primary transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
