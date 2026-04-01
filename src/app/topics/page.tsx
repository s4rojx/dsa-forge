"use client";

import AppShell from "@/components/AppShell";
import { allTopics } from "@/data";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function TopicsPage() {
  const { getTopicProgress } = useProgress();

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="font-rubik text-2xl font-bold text-text-1">All Topics</h1>
        <p className="mt-1 text-sm text-text-2">
          15 topics, 50+ patterns — choose your focus area
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allTopics.map((topic) => {
          const allProblemIds = topic.patterns.flatMap((p) => p.problems.map((pr) => pr.id));
          const progress = getTopicProgress(allProblemIds);

          const diffCounts = {
            easy: topic.patterns.flatMap((p) => p.problems).filter((pr) => pr.difficulty === "easy").length,
            medium: topic.patterns.flatMap((p) => p.problems).filter((pr) => pr.difficulty === "medium").length,
            hard: topic.patterns.flatMap((p) => p.problems).filter((pr) => pr.difficulty === "hard" || pr.difficulty === "hardest").length,
          };

          return (
            <Link
              key={topic.slug}
              href={`/topic/${topic.slug}`}
              className="group relative flex flex-col rounded-xl border border-border bg-bg-card p-5 transition-all duration-200 hover:border-border-hover hover:translate-y-[-2px]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-text-3">
                  {topic.totalProblems} problems
                </span>
              </div>

              <h3 className="mt-4 font-jakarta text-lg font-bold text-text-1">
                {topic.title}
              </h3>
              <p className="mt-1 text-xs text-text-2 leading-relaxed line-clamp-2">
                {topic.description}
              </p>

              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-text-3">
                <span>{topic.patterns.length} patterns</span>
                <span className="text-border">•</span>
                <span className="text-success">{diffCounts.easy}E</span>
                <span className="text-primary">{diffCounts.medium}M</span>
                <span className="text-danger">{diffCounts.hard}H</span>
              </div>

              <div className="mt-3">
                <ProgressBar
                  percentage={progress.percentage}
                  size="sm"
                  showLabel
                  completed={progress.completed}
                  total={progress.total}
                />
              </div>

              <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-text-3/30 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
