"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock,
  ExternalLink,
  HardDrive,
  Lightbulb,
  Star,
} from "lucide-react";
import { allTopics } from "@/data";
import AppShell from "@/components/AppShell";
import CodeBlock from "@/components/CodeBlock";
import DifficultyBadge from "@/components/DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";

export default function PatternPage() {
  const params = useParams();
  const patternId = params.id as string;
  const [selectedLanguage, setSelectedLanguage] = useState<"java" | "cpp">("java");
  const { toggleProblem, isCompleted } = useProgress();

  const patternData = useMemo(() => {
    for (const topic of allTopics) {
      const pattern = topic.patterns.find((item) => item.id === patternId);
      if (pattern) {
        return { topic, pattern };
      }
    }
    return null;
  }, [patternId]);

  if (!patternData) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="font-rubik text-3xl font-bold text-text-1">Pattern Not Found</h1>
            <Link href="/topics" className="mt-4 inline-block text-primary hover:underline">
              Back to Topics
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const { topic, pattern } = patternData;
  const activeTemplate =
    selectedLanguage === "java" ? pattern.templateCode : pattern.cppTemplate;

  return (
    <AppShell>
      <Link
        href={`/topic/${topic.slug}`}
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono text-text-3 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3 w-3" /> {topic.title}
      </Link>

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-1">
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-4 flex items-center gap-2 font-jakarta text-sm font-bold text-text-1">
              <Lightbulb className="h-4 w-4 text-success" />
              Recognition Signals
            </h3>
            <div className="space-y-3">
              {pattern.recognitionTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-[10px] font-mono font-bold text-success">
                    {index + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-text-2">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border bg-bg-card p-5">
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
            <h3 className="mb-4 flex items-center gap-2 font-jakarta text-sm font-bold text-text-1">
              <Star className="h-4 w-4 text-primary" />
              Pro Tips
            </h3>
            <div className="space-y-3">
              {pattern.proTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  <p className="text-xs leading-relaxed text-text-2">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-3 flex items-center gap-2 font-jakarta text-sm font-bold text-text-1">
              <BookOpen className="h-4 w-4 text-primary" />
              Approach
            </h3>
            <p className="text-xs leading-relaxed text-text-2">{pattern.approach}</p>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-jakarta text-base font-bold text-text-1">Code Template</h3>
              <div className="inline-flex rounded-lg border border-border bg-bg-card p-1">
                {[
                  { id: "java", label: "Java" },
                  { id: "cpp", label: "C++" },
                ].map((option) => {
                  const isActive = selectedLanguage === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedLanguage(option.id as "java" | "cpp")}
                      className={`rounded-md px-4 py-2 text-sm font-jakarta transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-text-2 hover:bg-bg-elevated hover:text-text-1"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <CodeBlock code={activeTemplate} language={selectedLanguage} />
          </div>

          <div>
            <h3 className="mb-3 font-jakarta text-base font-bold text-text-1">
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
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                        completed
                          ? "border-success bg-success text-bg-root"
                          : "border-text-3/40 hover:border-primary"
                      }`}
                    >
                      {completed && <Check className="h-3 w-3" />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm font-medium ${
                          completed ? "text-success line-through" : "text-text-1"
                        }`}
                      >
                        {problem.title}
                      </span>
                      <div className="mt-0.5 flex items-center gap-2">
                        <DifficultyBadge difficulty={problem.difficulty} />
                        <span className="text-[10px] font-mono capitalize text-text-3">
                          {problem.platform}
                        </span>
                      </div>
                    </div>

                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-md p-1.5 text-text-3 transition-colors hover:bg-primary/10 hover:text-primary"
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
