"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  LayoutList,
  Target,
  Trophy,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import ProgressBar from "@/components/ProgressBar";
import { getLearningPathById, getPathTopics } from "@/data/learning-paths";
import { useProgress } from "@/hooks/useProgress";

const difficultyStyles: Record<string, string> = {
  Beginner: "bg-success/15 text-success border-success/30",
  Intermediate: "bg-primary/15 text-primary border-primary/30",
  Advanced: "bg-danger/15 text-danger border-danger/30",
};

function getUniqueTopicSlugs(pathTopicSlugs: string[]) {
  return Array.from(new Set(pathTopicSlugs));
}

export default function LearningPathDetailPage() {
  const params = useParams<{ id: string }>();
  const pathId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { progress } = useProgress();

  const path = pathId ? getLearningPathById(pathId) : null;

  const derived = useMemo(() => {
    if (!path) {
      return null;
    }

    const pathTopicSlugs = getUniqueTopicSlugs(
      path.modules.flatMap((module) => module.topicSlugs)
    );
    const pathTopics = getPathTopics(pathTopicSlugs);

    const pathProblemIds = Array.from(
      new Set(
        pathTopics.flatMap((topic) =>
          topic.patterns.flatMap((pattern) =>
            pattern.problems.map((problem) => problem.id)
          )
        )
      )
    );

    const solvedCount = pathProblemIds.filter((problemId) => progress[problemId]).length;
    const completion =
      pathProblemIds.length > 0
        ? Math.round((solvedCount / pathProblemIds.length) * 100)
        : 0;

    const modules = path.modules.map((module) => {
      const moduleTopicSlugs = getUniqueTopicSlugs(module.topicSlugs);
      const moduleTopics = getPathTopics(moduleTopicSlugs);

      const moduleProblemIds = Array.from(
        new Set(
          moduleTopics.flatMap((topic) =>
            topic.patterns.flatMap((pattern) =>
              pattern.problems.map((problem) => problem.id)
            )
          )
        )
      );

      const moduleSolved = moduleProblemIds.filter((problemId) => progress[problemId]).length;
      const moduleCompletion =
        moduleProblemIds.length > 0
          ? Math.round((moduleSolved / moduleProblemIds.length) * 100)
          : 0;

      const nextTopic =
        moduleTopics.find((topic) => {
          const ids = topic.patterns.flatMap((pattern) =>
            pattern.problems.map((problem) => problem.id)
          );
          const solved = ids.filter((id) => progress[id]).length;
          return solved < ids.length;
        }) ?? moduleTopics[0];

      return {
        ...module,
        topics: moduleTopics,
        totalProblems: moduleProblemIds.length,
        solvedProblems: moduleSolved,
        completion: moduleCompletion,
        nextTopic,
      };
    });

    const nextPathTopic =
      pathTopics.find((topic) => {
        const ids = topic.patterns.flatMap((pattern) =>
          pattern.problems.map((problem) => problem.id)
        );
        const solved = ids.filter((id) => progress[id]).length;
        return solved < ids.length;
      }) ?? pathTopics[0];

    const firstPattern = pathTopics[0]?.patterns[0] ?? null;

    return {
      modules,
      pathTopics,
      solvedCount,
      totalProblems: pathProblemIds.length,
      totalPatterns: pathTopics.reduce((sum, topic) => sum + topic.patterns.length, 0),
      completion,
      nextPathTopic,
      firstPattern,
    };
  }, [path, progress]);

  if (!path || !derived) {
    return (
      <AppShell>
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <h1 className="font-rubik text-2xl font-bold text-text-1">Path Not Found</h1>
          <p className="mt-2 text-sm text-text-2">
            This learning path does not exist or was removed.
          </p>
          <Link
            href="/learning-path"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-jakarta font-bold text-bg-root transition-colors hover:bg-primary-dim"
          >
            Back to Learning Paths
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-7">
        <Link
          href="/learning-path"
          className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-text-3 transition-colors hover:text-primary"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          Back to all paths
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text-1">{path.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-text-2">{path.description}</p>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.12em] ${
              difficultyStyles[path.difficulty]
            }`}
          >
            {path.difficulty}
          </span>
        </div>
      </div>

      <div className="mb-7 grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-bg-card p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
            Patterns
          </p>
          <p className="mt-1 font-jakarta text-xl font-bold text-text-1">{derived.totalPatterns}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
            Problems
          </p>
          <p className="mt-1 font-jakarta text-xl font-bold text-text-1">{derived.totalProblems}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
            Estimated Time
          </p>
          <p className="mt-1 font-jakarta text-xl font-bold text-text-1">{path.estimatedHours}h</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
            Completion
          </p>
          <p className="mt-1 font-jakarta text-xl font-bold text-text-1">{derived.completion}%</p>
        </div>
      </div>

      <div className="mb-7 rounded-xl border border-border bg-bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-jakarta text-base font-bold text-text-1">Path Progress</h2>
          <span className="text-xs font-mono text-text-3">
            {derived.solvedCount}/{derived.totalProblems}
          </span>
        </div>
        <ProgressBar
          percentage={derived.completion}
          size="lg"
          showLabel
          completed={derived.solvedCount}
          total={derived.totalProblems}
        />
      </div>

      <section className="mb-7">
        <div className="mb-4 flex items-center gap-2">
          <LayoutList className="h-4 w-4 text-primary" />
          <h2 className="font-jakarta text-base font-bold text-text-1">Ordered Modules</h2>
        </div>
        <div className="space-y-4">
          {derived.modules.map((module, idx) => (
            <article
              key={module.id}
              className="rounded-xl border border-border bg-bg-card p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-primary">
                    Module {idx + 1}
                  </p>
                  <h3 className="mt-1 font-jakarta text-lg font-bold text-text-1">
                    {module.title}
                  </h3>
                  {module.description ? (
                    <p className="mt-1 text-sm text-text-2">{module.description}</p>
                  ) : null}
                </div>
                <div className="rounded-md border border-border px-2 py-1 text-xs font-mono text-text-3">
                  {module.solvedProblems}/{module.totalProblems}
                </div>
              </div>

              <div className="mb-4">
                <ProgressBar
                  percentage={module.completion}
                  size="md"
                  showLabel
                  completed={module.solvedProblems}
                  total={module.totalProblems}
                />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {module.topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topic/${topic.slug}`}
                    className="rounded-md border border-border bg-bg-elevated px-2.5 py-1 text-xs text-text-2 transition-colors hover:border-primary/30 hover:text-text-1"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>

              <Link
                href={module.nextTopic ? `/topic/${module.nextTopic.slug}` : "/topics"}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary/15 px-3 py-2 text-sm font-jakarta font-semibold text-primary transition-colors hover:bg-primary/25"
              >
                {module.completion > 0 ? "Continue Module" : "Start Module"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-xl border border-border bg-bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="font-jakarta text-base font-bold text-text-1">Next Best Start</h2>
          </div>
          <div className="space-y-3">
            <Link
              href={derived.nextPathTopic ? `/topic/${derived.nextPathTopic.slug}` : "/topics"}
              className="block rounded-lg border border-border bg-bg-elevated px-4 py-3 transition-colors hover:border-primary/30"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">1. Start Path</p>
              <p className="mt-1 text-sm font-semibold text-text-1">
                Begin with {derived.nextPathTopic ? derived.nextPathTopic.title : "your next topic"}
              </p>
            </Link>
            <Link
              href="/topics"
              className="block rounded-lg border border-border bg-bg-elevated px-4 py-3 transition-colors hover:border-primary/30"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">2. Practice Questions</p>
              <p className="mt-1 text-sm font-semibold text-text-1">
                Use topic filters and continue solving from your weak areas.
              </p>
            </Link>
            <Link
              href={derived.firstPattern ? `/pattern/${derived.firstPattern.id}` : "/topics"}
              className="block rounded-lg border border-border bg-bg-elevated px-4 py-3 transition-colors hover:border-primary/30"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">3. Pattern Deep Dive</p>
              <p className="mt-1 text-sm font-semibold text-text-1">
                Review one pattern template before your next practice block.
              </p>
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-lg border border-border bg-bg-elevated px-4 py-3 transition-colors hover:border-primary/30"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">4. Previous Sessions</p>
              <p className="mt-1 text-sm font-semibold text-text-1">
                Inspect streak and recent solves to decide tomorrow&apos;s focus.
              </p>
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="font-jakarta text-base font-bold text-text-1">Quick Links</h2>
          </div>
          <div className="space-y-3">
            <Link
              href="/topics"
              className="flex items-center justify-between rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-2 transition-colors hover:border-primary/30 hover:text-text-1"
            >
              Browse all topics
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
            <Link
              href={derived.nextPathTopic ? `/topic/${derived.nextPathTopic.slug}` : "/topics"}
              className="flex items-center justify-between rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-2 transition-colors hover:border-primary/30 hover:text-text-1"
            >
              Open next topic
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
            <Link
              href={derived.firstPattern ? `/pattern/${derived.firstPattern.id}` : "/topics"}
              className="flex items-center justify-between rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-2 transition-colors hover:border-primary/30 hover:text-text-1"
            >
              Open pattern template
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-between rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-text-2 transition-colors hover:border-primary/30 hover:text-text-1"
            >
              Go to dashboard
              <Clock3 className="h-4 w-4 text-primary" />
            </Link>
          </div>

          <div className="mt-5 rounded-lg border border-border bg-bg-elevated px-4 py-3">
            <div className="flex items-start gap-2">
              <Trophy className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-text-1">Path Outcome</p>
                <p className="mt-1 text-sm text-text-2">{path.outcomes[0]}</p>
                <p className="mt-1 text-sm text-text-2">{path.outcomes[1]}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

