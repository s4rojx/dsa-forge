"use client";

import Link from "next/link";
import { ArrowRight, Target, Timer, Trophy } from "lucide-react";
import AppShell from "@/components/AppShell";
import ProgressBar from "@/components/ProgressBar";
import { getPathTopics, learningPaths } from "@/data/learning-paths";
import { useProgress } from "@/hooks/useProgress";

const difficultyStyles: Record<string, string> = {
  Beginner: "bg-success/15 text-success border-success/30",
  Intermediate: "bg-primary/15 text-primary border-primary/30",
  Advanced: "bg-danger/15 text-danger border-danger/30",
};

function getUniqueTopicSlugs(pathTopicSlugs: string[]) {
  return Array.from(new Set(pathTopicSlugs));
}

export default function LearningPathHomePage() {
  const { progress, getTopicProgress } = useProgress();

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="font-rubik text-2xl font-bold text-text-1">Learning Paths</h1>
        <p className="mt-1 text-sm text-text-2">
          Structured progression to master DSA with clear milestones.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {learningPaths.map((path) => {
          const topicSlugs = getUniqueTopicSlugs(
            path.modules.flatMap((module) => module.topicSlugs)
          );
          const topics = getPathTopics(topicSlugs);
          const problemIds = Array.from(
            new Set(
              topics.flatMap((topic) =>
                topic.patterns.flatMap((pattern) =>
                  pattern.problems.map((problem) => problem.id)
                )
              )
            )
          );
          const totalPatterns = topics.reduce(
            (sum, topic) => sum + topic.patterns.length,
            0
          );
          const solvedCount = problemIds.filter((problemId) => progress[problemId]).length;
          const totalProblems = problemIds.length;
          const completion =
            totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

          const nextTopic =
            topics.find((topic) => {
              const topicProblemIds = topic.patterns.flatMap((pattern) =>
                pattern.problems.map((problem) => problem.id)
              );
              const topicStats = getTopicProgress(topicProblemIds);
              return topicStats.completed < topicStats.total;
            }) ?? topics[0];

          return (
            <section
              key={path.id}
              className="rounded-xl border border-border bg-bg-card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-jakarta text-xl font-bold text-text-1">
                    <Link
                      href={`/learning-path/${path.id}`}
                      className="transition-colors hover:text-primary"
                    >
                      {path.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-text-2">{path.description}</p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.12em] ${
                    difficultyStyles[path.difficulty]
                  }`}
                >
                  {path.difficulty}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 rounded-lg border border-border bg-bg-elevated p-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
                    Patterns
                  </p>
                  <p className="mt-1 font-jakarta text-lg font-bold text-text-1">
                    {totalPatterns}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
                    Problems
                  </p>
                  <p className="mt-1 font-jakarta text-lg font-bold text-text-1">
                    {totalProblems}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
                    Est. Time
                  </p>
                  <p className="mt-1 font-jakarta text-lg font-bold text-text-1">
                    {path.estimatedHours}h
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <ProgressBar
                  percentage={completion}
                  size="md"
                  showLabel
                  completed={solvedCount}
                  total={totalProblems}
                />
              </div>

              <div className="mt-5 grid gap-2">
                <div className="flex items-start gap-2">
                  <Target className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm text-text-2">{path.outcomes[0]}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Trophy className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm text-text-2">{path.outcomes[1]}</p>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-border bg-bg-elevated p-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
                  Module Snapshot
                </p>
                <ul className="mt-2 space-y-1.5">
                  {path.modules.slice(0, 3).map((module) => (
                    <li key={module.id} className="text-sm text-text-2">
                      {module.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-text-3">
                  <Timer className="h-3.5 w-3.5 text-primary" />
                  Next step: {nextTopic ? nextTopic.title : "Topic review"}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/learning-path/${path.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-4 py-2 text-sm font-jakarta font-semibold text-text-2 transition-colors hover:border-primary/40 hover:text-text-1"
                  >
                    View Path
                  </Link>
                  <Link
                    href={nextTopic ? `/topic/${nextTopic.slug}` : "/topics"}
                    className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-jakarta font-bold text-bg-root transition-all hover:bg-primary-dim"
                  >
                    {completion > 0 ? "Continue" : "Start"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
