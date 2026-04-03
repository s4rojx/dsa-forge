"use client";

import { useParams } from "next/navigation";
import { getTopicBySlug, allTopics } from "@/data";
import { useState, useMemo } from "react";
import { useProgress } from "@/hooks/useProgress";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import CodeBlock from "@/components/CodeBlock";
import DifficultyBadge from "@/components/DifficultyBadge";
import ProgressBar from "@/components/ProgressBar";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Check,
  Lightbulb,
  BookOpen,
  Code2,
  Building2,
  Clock,
  HardDrive,
  Star,
  Layers,
} from "lucide-react";

type TabType = "overview" | "problems" | "template" | "companies";

export default function TopicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const topic = getTopicBySlug(slug);

  const { toggleProblem, isCompleted, getPatternProgress, getTopicProgress } = useProgress();

  const [activePatternId, setActivePatternId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [showStandardOnly, setShowStandardOnly] = useState(false);
  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<"java" | "cpp">("java");

  const activePattern = topic
    ? (activePatternId
        ? topic.patterns.find((p) => p.id === activePatternId) || topic.patterns[0]
        : topic.patterns[0])
    : null;

  const filteredProblems = useMemo(() => {
    if (!activePattern) return [];
    let problems = activePattern.problems;
    if (difficultyFilter !== "all") {
      problems = problems.filter((p) => p.difficulty === difficultyFilter);
    }
    if (showStandardOnly) {
      problems = problems.filter((p) => p.isStandard);
    }
    return problems;
  }, [activePattern, difficultyFilter, showStandardOnly]);

  const allCompanies = useMemo(() => {
    if (!activePattern) return [];
    const companyCount: Record<string, number> = {};
    activePattern.problems.forEach((p) =>
      p.companies.forEach((c) => {
        companyCount[c] = (companyCount[c] || 0) + 1;
      })
    );
    return Object.entries(companyCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [activePattern]);

  if (!topic || !activePattern) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-rubik text-3xl font-bold text-text-1">Topic Not Found</h1>
            <Link href="/topics" className="mt-4 inline-block text-primary hover:underline">
              ← Back to Topics
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const allProblemIds = topic.patterns.flatMap((p) => p.problems.map((pr) => pr.id));
  const topicProgress = getTopicProgress(allProblemIds);

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "problems", label: "Problems", icon: Layers },
    { id: "template", label: "Code Template", icon: Code2 },
    { id: "companies", label: "Companies", icon: Building2 },
  ];

  const currentIdx = allTopics.findIndex((t) => t.slug === slug);
  const prevTopic = currentIdx > 0 ? allTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null;

  return (
    <AppShell>
      {/* Topic Header */}
      <div className="mb-6">
        <Link href="/topics" className="mb-4 inline-flex items-center gap-1.5 text-xs font-mono text-text-3 hover:text-primary transition-colors">
          <ArrowLeft className="h-3 w-3" /> All Topics
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text-1">{topic.title}</h1>
            <p className="text-sm text-text-2 mt-1">{topic.description}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-mono text-text-3 mb-1">
              {topicProgress.completed}/{topicProgress.total} solved
            </p>
            <div className="w-32">
              <ProgressBar percentage={topicProgress.percentage} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pattern Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24">
            <button
              className="lg:hidden flex items-center gap-2 w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-sm font-jakarta font-bold text-text-1 mb-4"
              onClick={() => setExpandedSidebar(!expandedSidebar)}
            >
              <Layers className="h-4 w-4 text-primary" />
              Patterns ({topic.patterns.length})
              <ChevronDown className={`h-4 w-4 ml-auto text-text-3 transition-transform ${expandedSidebar ? "rotate-180" : ""}`} />
            </button>

            <div className={`space-y-1 ${expandedSidebar ? "block" : "hidden lg:block"}`}>
              <h3 className="hidden lg:block mb-3 text-xs font-mono uppercase tracking-wider text-text-3">
                {topic.patterns.length} Patterns
              </h3>
              {topic.patterns.map((pattern) => {
                const patternProblemIds = pattern.problems.map((p) => p.id);
                const progress = getPatternProgress(patternProblemIds);
                const isActive = pattern.id === activePattern.id;

                return (
                  <button
                    key={pattern.id}
                    onClick={() => {
                      setActivePatternId(pattern.id);
                      setActiveTab("overview");
                      setExpandedSidebar(false);
                    }}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                      isActive
                        ? "bg-primary/10 border border-primary/30 text-primary"
                        : "border border-transparent text-text-2 hover:bg-bg-elevated hover:text-text-1"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`truncate font-medium ${isActive ? "text-primary" : ""}`}>
                        {pattern.title}
                      </p>
                      <p className="text-[10px] font-mono mt-0.5">
                        {progress.completed}/{progress.total}
                      </p>
                    </div>
                    {progress.percentage === 100 && (
                      <Check className="h-4 w-4 text-success shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Pattern Title */}
          <div className="mb-6">
            <h2 className="font-rubik text-xl font-bold text-text-1">{activePattern.title}</h2>
            <p className="mt-1 text-sm text-text-2">{activePattern.tagline}</p>
            <div className="mt-2 flex items-center gap-4 text-xs font-mono text-text-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {activePattern.timeComplexity}
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" /> {activePattern.spaceComplexity}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 rounded-lg bg-bg-card p-1 border border-border mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-jakarta whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-text-2 hover:text-text-1 hover:bg-bg-elevated"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Approach */}
              <div className="rounded-xl border border-border bg-bg-card p-5">
                <h3 className="flex items-center gap-2.5 font-jakarta text-base font-bold text-text-1 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  Approach
                </h3>
                <p className="text-sm text-text-2 leading-relaxed pl-[38px]">{activePattern.approach}</p>
              </div>

              {/* Recognition Tips */}
              <div className="rounded-xl border border-border bg-bg-card p-5">
                <h3 className="flex items-center gap-2.5 font-jakarta text-base font-bold text-text-1 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10">
                    <Lightbulb className="h-4 w-4 text-success" />
                  </div>
                  How to Recognize
                </h3>
                <div className="space-y-3 pl-[38px]">
                  {activePattern.recognitionTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-[10px] font-mono font-bold text-success mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-text-2 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              <div className="rounded-xl border border-border bg-bg-card p-5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
                <h3 className="flex items-center gap-2.5 font-jakarta text-base font-bold text-text-1 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  Pro Tips
                </h3>
                <div className="space-y-3 pl-[38px]">
                  {activePattern.proTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      <p className="text-sm text-text-2 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total", value: activePattern.problems.length, color: "text-text-1" },
                  { label: "Easy", value: activePattern.problems.filter((p) => p.difficulty === "easy").length, color: "text-success" },
                  { label: "Medium", value: activePattern.problems.filter((p) => p.difficulty === "medium").length, color: "text-primary" },
                  { label: "Hard", value: activePattern.problems.filter((p) => p.difficulty === "hard" || p.difficulty === "hardest").length, color: "text-danger" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-bg-card p-4 text-center">
                    <p className={`text-2xl font-rubik font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-3 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Complexity Card */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-border bg-bg-card p-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-3">Time</p>
                    <p className="text-sm font-mono font-semibold text-primary">{activePattern.timeComplexity}</p>
                  </div>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-bg-card p-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <HardDrive className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-3">Space</p>
                    <p className="text-sm font-mono font-semibold text-primary">{activePattern.spaceComplexity}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "problems" && (
            <div>
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex gap-1 rounded-lg bg-bg-card p-1 border border-border">
                  {["all", "easy", "medium", "hard"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficultyFilter(d)}
                      className={`rounded-md px-3 py-1 text-xs font-mono capitalize transition-all ${
                        difficultyFilter === d
                          ? "bg-primary/10 text-primary"
                          : "text-text-2 hover:text-text-1"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowStandardOnly(!showStandardOnly)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                    showStandardOnly
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border text-text-2 hover:text-text-1"
                  }`}
                >
                  <Star className="h-3 w-3" />
                  Must-Do Only
                </button>
              </div>

              {/* Problem List */}
              <div className="space-y-1">
                {filteredProblems.map((problem) => {
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
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium truncate ${completed ? "text-success line-through" : "text-text-1"}`}>
                            {problem.title}
                          </span>
                          {problem.isStandard && (
                            <Star className="h-3 w-3 text-primary shrink-0 fill-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <DifficultyBadge difficulty={problem.difficulty} />
                          <span className="text-[10px] font-mono text-text-3 capitalize">
                            {problem.platform}
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                        {problem.companies.slice(0, 3).map((c) => (
                          <span key={c} className="text-[10px] font-mono text-text-3/60">
                            {c}
                          </span>
                        ))}
                      </div>

                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-md p-1.5 text-text-3 hover:text-primary hover:bg-primary/10 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-10 text-sm text-text-2">
                  No problems match the selected filters.
                </div>
              )}
            </div>
          )}

          {activeTab === "template" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
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
              <div className="flex items-center gap-4 text-xs font-mono text-text-3 mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary" /> Time: {activePattern.timeComplexity}
                </span>
                <span className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3 text-primary" /> Space: {activePattern.spaceComplexity}
                </span>
              </div>
              <CodeBlock
                code={
                  selectedLanguage === "java"
                    ? activePattern.templateCode
                    : activePattern.cppTemplate
                }
                language={selectedLanguage}
              />
            </div>
          )}

          {activeTab === "companies" && (
            <div>
              <p className="text-sm text-text-2 mb-4">
                Companies that frequently ask problems from this pattern:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allCompanies.map(({ name, count }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-lg border border-border bg-bg-card px-4 py-3"
                  >
                    <span className="text-sm text-text-1 font-medium">{name}</span>
                    <span className="text-xs font-mono text-primary">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topic Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
            {prevTopic ? (
              <Link
                href={`/topic/${prevTopic.slug}`}
                className="flex items-center gap-2 text-sm text-text-2 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-jakarta">{prevTopic.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextTopic ? (
              <Link
                href={`/topic/${nextTopic.slug}`}
                className="flex items-center gap-2 text-sm text-text-2 hover:text-primary transition-colors"
              >
                <span className="font-jakarta">{nextTopic.title}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </AppShell>
  );
}
