"use client";

import { useMemo, useState, useCallback } from "react";
import AppShell from "@/components/AppShell";
import DifficultyBadge from "@/components/DifficultyBadge";
import ProgressBar from "@/components/ProgressBar";
import { allTopics } from "@/data";
import { useProgress } from "@/hooks/useProgress";

/* ──────────────────────────────────────────────
   Heatmap — GitHub-style contribution graph
   ────────────────────────────────────────────── */

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

function getHeatColor(count: number): string {
  if (count === 0) return "var(--hm-0)";
  if (count <= 1) return "var(--hm-1)";
  if (count <= 3) return "var(--hm-2)";
  if (count <= 5) return "var(--hm-3)";
  return "var(--hm-4)";
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Heatmap({
  days,
}: {
  days: Array<{ date: string; count: number }>;
}) {
  const CELL = 13;
  const GAP = 3;
  const STEP = CELL + GAP;
  const LABEL_W = 32;

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    date: string;
    count: number;
  } | null>(null);

  /* Build the full 52-week grid; always show all cells even when empty */
  const { cells, monthLabels, svgW, svgH } = useMemo(() => {
    const WEEKS = 52;
    const today = new Date();
    const todayUtc = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );

    // Start grid from (WEEKS * 7 - 1) days ago, snapped to a Sunday
    const startDate = new Date(todayUtc);
    startDate.setUTCDate(startDate.getUTCDate() - (WEEKS * 7 - 1));
    startDate.setUTCDate(startDate.getUTCDate() - startDate.getUTCDay()); // snap to Sun

    const countMap = new Map<string, number>();
    for (const d of days) countMap.set(d.date, d.count);

    const gridCells: Array<{
      col: number;
      row: number;
      date: string;
      count: number;
    }> = [];

    const monthMap = new Map<string, { label: string; col: number }>();

    const cursor = new Date(startDate);
    while (cursor <= todayUtc) {
      const key = cursor.toISOString().slice(0, 10);
      const dayOfWeek = cursor.getUTCDay(); // 0 = Sun
      const weeksSinceStart = Math.floor(
        (cursor.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
      );
      gridCells.push({
        col: weeksSinceStart,
        row: dayOfWeek,
        date: key,
        count: countMap.get(key) ?? 0,
      });

      // Track month labels at start of each month
      const mKey = `${cursor.getUTCFullYear()}-${cursor.getUTCMonth()}`;
      if (!monthMap.has(mKey)) {
        monthMap.set(mKey, {
          label: cursor.toLocaleDateString("en-US", {
            month: "short",
            timeZone: "UTC",
          }),
          col: weeksSinceStart,
        });
      }
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    const maxCol = gridCells.reduce((m, c) => Math.max(m, c.col), 0);
    return {
      cells: gridCells,
      monthLabels: Array.from(monthMap.values()),
      svgW: LABEL_W + (maxCol + 1) * STEP,
      svgH: 7 * STEP,
    };
  }, [days, STEP, LABEL_W]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<SVGRectElement>, cell: (typeof cells)[0]) => {
      const rect = (e.target as SVGRectElement).getBoundingClientRect();
      setTooltip({
        x: rect.left + rect.width / 2,
        y: rect.top,
        date: cell.date,
        count: cell.count,
      });
    },
    []
  );
  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  return (
    <div className="relative">
      {/* Month labels */}
      <div className="overflow-x-auto pb-1" style={{ paddingLeft: LABEL_W }}>
        <div className="relative" style={{ width: svgW - LABEL_W, height: 18 }}>
          {monthLabels.map((m, i) => (
            <span
              key={`${m.label}-${m.col}-${i}`}
              className="absolute top-0 text-[10px] font-mono uppercase tracking-widest"
              style={{
                left: m.col * STEP,
                color: "var(--text-3)",
              }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Grid + Day labels wrapper */}
      <div className="overflow-x-auto">
        <svg
          width={svgW}
          height={svgH}
          className="block"
          role="img"
          aria-label="52-week activity heatmap"
        >
          {/* Day labels (Mon, Wed, Fri) */}
          {DAY_LABELS.map((label, idx) =>
            label ? (
              <text
                key={label}
                x={0}
                y={idx * STEP + CELL - 1}
                fill="var(--text-3)"
                fontSize={9}
                fontFamily="monospace"
                textAnchor="start"
              >
                {label}
              </text>
            ) : null
          )}

          {/* Cells */}
          {cells.map((cell) => (
            <rect
              key={cell.date}
              x={LABEL_W + cell.col * STEP}
              y={cell.row * STEP}
              width={CELL}
              height={CELL}
              rx={3}
              fill={getHeatColor(cell.count)}
              className="heatmap-cell"
              onMouseEnter={(e) => handleMouseEnter(e, cell)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </svg>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          <div className="rounded-lg border border-border-hover bg-bg-elevated px-3 py-2 text-center shadow-xl shadow-black/40">
            <p className="text-[11px] font-semibold text-text-1">
              {tooltip.count === 0
                ? "No problems solved"
                : `${tooltip.count} problem${tooltip.count > 1 ? "s" : ""} solved`}
            </p>
            <p className="mt-0.5 text-[10px] font-mono text-text-3">
              {formatDateLabel(tooltip.date)}
            </p>
          </div>
          {/* tooltip arrow */}
          <div className="mx-auto h-0 w-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-border-hover" />
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] font-mono text-text-3">
        <span className="mr-1">Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <div
            key={lvl}
            className="h-[13px] w-[13px] rounded-[3px]"
            style={{ backgroundColor: `var(--hm-${lvl})` }}
          />
        ))}
        <span className="ml-1">More</span>
      </div>
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
