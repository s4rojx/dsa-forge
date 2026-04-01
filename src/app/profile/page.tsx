"use client";

import { useSession } from "next-auth/react";
import { RotateCcw } from "lucide-react";
import AppShell from "@/components/AppShell";
import ProgressBar from "@/components/ProgressBar";
import ProgressRing from "@/components/ProgressRing";
import { allTopics } from "@/data";
import { useProgress } from "@/hooks/useProgress";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { getTopicProgress, resetProgress, streakData, userStats, isSyncing } = useProgress();

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="font-rubik text-2xl font-bold text-text-1">Profile</h1>
        <p className="mt-1 text-sm text-text-2">Your stats, streak, and account settings.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-1">
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-text-3">
              Account
            </p>
            <h2 className="mt-2 font-rubik text-xl font-bold text-text-1">
              {session?.user?.name || "DSA Forge User"}
            </h2>
            <p className="mt-1 text-sm text-text-2">{session?.user?.email}</p>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-border bg-bg-card p-6">
            <ProgressRing
              percentage={userStats.completionPercentage}
              size={120}
              label="Overall"
            />
            <p className="mt-4 text-sm text-text-2">
              {userStats.totalSolved} of {userStats.totalProblems} problems solved
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-bg-card p-4 text-center">
              <p className="font-rubik text-2xl font-bold text-primary">
                {userStats.totalSolved}
              </p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-text-3">
                Solved
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-4 text-center">
              <p className="font-rubik text-2xl font-bold text-text-1">
                {userStats.totalPatterns}
              </p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-text-3">
                Patterns
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-4 text-center">
              <p className="font-rubik text-2xl font-bold text-text-1">
                {userStats.topicsCovered}
              </p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-text-3">
                Topics
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-4 text-center">
              <p className="font-rubik text-2xl font-bold text-text-1">
                {streakData.currentStreak}
              </p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-text-3">
                Streak
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-3 font-jakarta text-sm font-bold text-text-1">
              Solved by Difficulty
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-success">Easy</span>
                <span className="text-xs font-mono text-text-3">
                  {userStats.difficultyBreakdown.easy}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary">Medium</span>
                <span className="text-xs font-mono text-text-3">
                  {userStats.difficultyBreakdown.medium}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-danger">Hard</span>
                <span className="text-xs font-mono text-text-3">
                  {userStats.difficultyBreakdown.hard}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="mb-4 font-jakarta text-base font-bold text-text-1">
              Topic Breakdown
            </h3>
            <div className="space-y-4">
              {allTopics.map((topic) => {
                const topicProblemIds = topic.patterns.flatMap((pattern) =>
                  pattern.problems.map((problem) => problem.id)
                );
                const progress = getTopicProgress(topicProblemIds);

                return (
                  <div key={topic.slug}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm text-text-2">{topic.title}</span>
                      <span className="text-xs font-mono text-text-3">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <ProgressBar percentage={progress.percentage} size="sm" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="mb-4 font-jakarta text-base font-bold text-text-1">Settings</h3>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-text-1">Reset Progress</p>
                <p className="mt-0.5 text-xs text-text-3">
                  Clear all solved problems and rebuild your history from scratch.
                </p>
              </div>
              <button
                onClick={async () => {
                  if (confirm("Are you sure? This will reset all progress.")) {
                    await resetProgress();
                  }
                }}
                disabled={isSyncing}
                className="flex items-center gap-1.5 rounded-lg border border-danger/30 bg-danger/10 px-4 py-2 text-xs font-mono text-danger transition-all hover:bg-danger/20 disabled:opacity-60"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
