import { Difficulty } from "@/types";

const difficultyStyles: Record<string, string> = {
  easy: "bg-success/15 text-success border-success/20",
  medium: "bg-primary/15 text-primary border-primary/20",
  hard: "bg-danger/15 text-danger border-danger/20",
  hardest: "bg-danger/20 text-danger border-danger/30",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${
        difficultyStyles[difficulty] || difficultyStyles.medium
      }`}
    >
      {difficulty}
    </span>
  );
}
