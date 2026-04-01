"use client";

import { useParams } from "next/navigation";
import { allTopics } from "@/data";
import { useMemo } from "react";
import { useProgress } from "@/hooks/useProgress";
import AppShell from "@/components/AppShell";
import CodeBlock from "@/components/CodeBlock";
import DifficultyBadge from "@/components/DifficultyBadge";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Check,
  Lightbulb,
  Star,
  Clock,
  HardDrive,
  BookOpen,
} from "lucide-react";

export default function PatternPage() {
  const params = useParams();
  const patternId = params.id as string;

  const { toggleProblem, isCompleted } = useProgress();

  // Find pattern across all topics
  const patternData = useMemo(() => {
    for (const topic of allTopics) {
      const pattern = topic.patterns.find((p) => p.id === patternId);
      if (pattern) return { topic, pattern };
    }
    return null;
  }, [patternId]);

  if (!patternData) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-rubik text-3xl font-bold text-text-1">Pattern Not Found</h1>
            <Link href="/topics" className="mt-4 inline-block text-primary hover:underline">
              ← Back to Topics
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const { topic, pattern } = patternData;

  return (
    <AppShell>
      {/* Breadcrumb */}
      <Link
        href={`/topic/${topic.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-text-3 hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-3 w-3" /> {topic.title}
      </Link>

      {/* Pattern Header */}
      <div className="mb-8">
        <h1 className="font-rubik text-2xl font-bold text-text-1">{pattern.title}</h1>
        <p className="mt-2 text-sm text-text-2">{pattern.tagline}</p>
        <div className="mt-3 flex items-center gap-4 text-xs font-mono text-text-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-primary" /> {pattern.timeComplexity}
          </span>
          <span className="flex items-center gap-1">
            <HardDrive className="h-3 w-3 text-primary" /> {pattern.spaceComplexity}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Recognition & Tips */}
        <div className="lg:col-span-1 space-y-5">
          {/* When to Use / Recognition */}
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="flex items-center gap-2 font-jakarta text-sm font-bold text-text-1 mb-4">
              <Lightbulb className="h-4 w-4 text-success" />
              Recognition Signals
            </h3>
            <div className="space-y-3">
              {pattern.recognitionTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-[10px] font-mono font-bold text-success mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-text-2 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="rounded-xl border border-border bg-bg-card p-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
            <h3 className="flex items-center gap-2 font-jakarta text-sm font-bold text-text-1 mb-4">
              <Star className="h-4 w-4 text-primary" />
              Pro Tips
            </h3>
            <div className="space-y-3">
              {pattern.proTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  <p className="text-xs text-text-2 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="flex items-center gap-2 font-jakarta text-sm font-bold text-text-1 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              Approach
            </h3>
            <p className="text-xs text-text-2 leading-relaxed">{pattern.approach}</p>
          </div>
        </div>

        {/* Right Column — Template + Problems */}
        <div className="lg:col-span-2 space-y-6">
          {/* Java Template */}
          <div>
            <h3 className="font-jakarta text-base font-bold text-text-1 mb-3">Java Template</h3>
            <CodeBlock code={pattern.templateCode} language="java" />
          </div>

          {/* Problem List */}
          <div>
            <h3 className="font-jakarta text-base font-bold text-text-1 mb-3">
              Problems ({pattern.problems.length})
            </h3>
            <div className="space-y-1">
              {pattern.problems.map((problem) => {
                const completed = isCompleted(problem.id);
                return (
                  <div
                    key={problem.id}
                    className={`group flex items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                      completed
                        ? "border-success/20 bg-success/5"
                        : "border-border bg-bg-card hover:border-primary/20 hover:bg-bg-elevated"
                    }`}
                  >
                    <button
                      onClick={() => toggleProblem(problem.id)}
                      className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                        completed
                          ? "border-success bg-success text-bg-root"
                          : "border-text-3/40 hover:border-primary"
                      }`}
                    >
                      {completed && <Check className="h-3 w-3" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-medium truncate block ${completed ? "text-success line-through" : "text-text-1"}`}>
                        {problem.title}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <DifficultyBadge difficulty={problem.difficulty} />
                        <span className="text-[10px] font-mono text-text-3 capitalize">
                          {problem.platform}
                        </span>
                      </div>
                    </div>

                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-md p-1.5 text-text-3 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
