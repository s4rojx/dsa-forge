"use client";

import { useMemo } from "react";
import AppShell from "@/components/AppShell";
import DifficultyBadge from "@/components/DifficultyBadge";
import ProgressBar from "@/components/ProgressBar";
import { allTopics } from "@/data";
import { useProgress } from "@/hooks/useProgress";

function Heatmap({
  days,
}: {
  days: Array<{
    date: string;
    count: number;
  }>;
}) {
  const cellSize = 12;
  const gap = 3;

  const { cells, months, width } = useMemo(() => {
    if (days.length === 0) {
      return {
        cells: [] as Array<{ x: number; y: number; date: string; count: number }>,
        months: [] as Array<{ label: string; x: number }>,
        width: 0,
      };
    }

    const firstVisibleDate = new Date(`${days[0].date}T00:00:00.000Z`);
    const gridStart = new Date(firstVisibleDate);
    gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay());
    const gridStartTime = gridStart.getTime();
    const monthLabels = new Map<string, { label: string; x: number }>();

    const nextCells = days.map((day) => {
      const date = new Date(`${day.date}T00:00:00.000Z`);
      const weekIndex = Math.floor(
        (date.getTime() - gridStartTime) / (7 * 24 * 60 * 60 * 1000)
      );
      const x = weekIndex * (cellSize + gap);
      const y = date.getUTCDay() * (cellSize + gap);
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;

      if (!monthLabels.has(monthKey)) {
        monthLabels.set(monthKey, {
          label: date.toLocaleString("en-US", {
            month: "short",
            timeZone: "UTC",
          }),
          x,
        });
      }

      return {
        x,
        y,
        date: day.date,
        count: day.count,
      };
    });

    const maxWeekOffset = nextCells.reduce((max, cell) => Math.max(max, cell.x), 0);

    return {
      cells: nextCells,
      months: Array.from(monthLabels.values()),
      width: maxWeekOffset + cellSize,
    };
  }, [days]);

  const getColor = (count: number) => {
    if (count === 0) return "#1E1E1E";
    if (count <= 2) return "#3D1809";
    if (count <= 5) return "#7A3113";
    return "#BB4A1E";
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-3 flex text-[10px] font-mono uppercase tracking-[0.18em] text-text-3">
        {months.map((month) => (
          <span
            key={`${month.label}-${month.x}`}
            className="shrink-0"
            style={{ marginLeft: month.x === 0 ? 0 : month.x - 24 }}
          >
            {month.label}
          </span>
        ))}
      </div>

      <svg width={Math.max(width, 720)} height={7 * (cellSize + gap)} className="block">
        {cells.map((cell) => (
          <rect
            key={cell.date}
            x={cell.x}
            y={cell.y}
            width={cellSize}
            height={cellSize}
            rx={2}
            fill={getColor(cell.count)}
          >
            <title>{`${cell.date}: ${cell.count} solved`}</title>
          </rect>
        ))}
      </svg>
    </div>
  );
}

export default function DashboardPage() {
  const { getTopicProgress, streakData, userStats, isLoaded, isSyncing } = useProgress();

  const stats = [
    { label: "Problems Solved", value: userStats.totalSolved },
    { label: "Current Streak", value: `${streakData.currentStreak} days` },
    { label: "Topics Covered", value: `${userStats.topicsCovered}/15` },
    { label: "Completion", value: `${userStats.completionPercentage}%` },
  ];

  return (
    <AppShell>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-rubik text-2xl font-bold text-text-1">Dashboard</h1>
          <p className="mt-1 text-sm text-text-2">
            Your backend-backed progress, streak, and recent solves.
          </p>
        </div>
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-text-3">
          {isSyncing ? "Syncing" : isLoaded ? "Live data" : "Loading"}
        </p>
      </div>

      {streakData.showWarningBanner && (
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-text-1">
          You solved yesterday but not yet today. Keep the streak alive.
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-bg-card p-5 transition-all hover:border-border-hover"
          >
            <p className="mb-1 text-xs font-jakarta text-text-3">{stat.label}</p>
            <p className="font-rubik text-2xl font-bold text-text-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <h2 className="mb-4 font-jakarta text-base font-bold text-text-1">
            52-Week Activity
          </h2>
          <Heatmap days={streakData.days} />
          <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-text-3">
            <span>Less</span>
            {[0, 1, 3, 6].map((count) => (
              <div
                key={count}
                className="h-3 w-3 rounded-sm"
                style={{
                  backgroundColor:
                    count === 0
                      ? "#1E1E1E"
                      : count <= 2
                        ? "#3D1809"
                        : count <= 5
                          ? "#7A3113"
                          : "#BB4A1E",
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-6">
          <h2 className="mb-4 font-jakarta text-base font-bold text-text-1">
            Last 10 Solved
          </h2>
          <div className="space-y-3">
            {userStats.recentSolved.length === 0 ? (
              <p className="text-sm text-text-2">No solved problems yet.</p>
            ) : (
              userStats.recentSolved.map((problem) => (
                <a
                  key={`${problem.problemId}-${problem.solvedAt}`}
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border bg-bg-elevated px-4 py-3 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-1">
                        {problem.title}
                      </p>
                      <p className="mt-1 text-xs text-text-2">
                        {problem.topicTitle} · {problem.patternTitle}
                      </p>
                      <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
                        {new Date(problem.solvedAt).toLocaleString()}
                      </p>
                    </div>
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-bg-card p-6">
        <h2 className="mb-4 font-jakarta text-base font-bold text-text-1">
          Progress by Topic
        </h2>
        <div className="space-y-4">
          {allTopics.map((topic) => {
            const topicProblemIds = topic.patterns.flatMap((pattern) =>
              pattern.problems.map((problem) => problem.id)
            );
            const progress = getTopicProgress(topicProblemIds);

            return (
              <div key={topic.slug} className="flex items-center gap-4">
                <span className="w-40 shrink-0 truncate text-sm text-text-2">
                  {topic.title}
                </span>
                <div className="flex-1">
                  <ProgressBar
                    percentage={progress.percentage}
                    size="sm"
                    showLabel
                    completed={progress.completed}
                    total={progress.total}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
