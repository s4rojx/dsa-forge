"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchModal from "@/components/SearchModal";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { getTotalPatterns, getTotalProblems } from "@/data";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useProgress } from "@/hooks/useProgress";
import { useSearch } from "@/hooks/useSearch";

export default function HomePage() {
  const { query, setQuery, results, isOpen, openSearch, closeSearch } = useSearch();
  const { getTotalCompleted } = useProgress();
  useKeyboard(openSearch);

  const totalSolved = getTotalCompleted();
  const totalProblems = getTotalProblems();
  const totalPatterns = getTotalPatterns();

  return (
    <div className="min-h-screen bg-bg-root text-text-1">
      <Navbar onSearchOpen={openSearch} totalSolved={totalSolved} />
      <SearchModal
        isOpen={isOpen}
        onClose={closeSearch}
        query={query}
        setQuery={setQuery}
        results={results}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-root" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pb-36 lg:pt-44">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-rubik text-5xl font-bold leading-[1.05] tracking-tight text-text-1 sm:text-6xl lg:text-7xl">
              Master DSA by mastering{" "}
              <PointerHighlight containerClassName="inline-block">
                <span className="bg-gradient-to-b from-[#E0E0E0] via-[#B0B0B0] to-[#808080] bg-clip-text text-transparent">
                  the patterns.
                </span>
              </PointerHighlight>
            </h1>

            <p className="mt-6 max-w-2xl font-jakarta text-lg text-text-2 sm:text-xl">
              500+ problems. 50+ patterns. 15 topics.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2.5 rounded-lg bg-primary px-8 py-3.5 text-sm font-jakarta font-bold text-bg-root transition-all hover:bg-primary-dim hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98]"
              >
                Start Forging
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={openSearch}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-bg-card/40 px-8 py-3.5 text-sm font-mono text-text-2 transition-all hover:border-primary/30 hover:bg-bg-card/80 hover:text-text-1 active:scale-[0.98]"
              >
                Search Problems
                <kbd className="rounded border border-border bg-bg-elevated px-1.5 py-0.5 text-[10px] font-mono text-text-3">
                  Ctrl K
                </kbd>
              </button>
            </div>

            <div className="mt-16 flex items-center gap-10 sm:gap-14">
              {[
                { value: `${totalProblems}+`, label: "Problems" },
                { value: `${totalPatterns}+`, label: "Patterns" },
                { value: "15", label: "Topics" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-rubik text-3xl font-bold text-primary sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              How it works
            </p>
            <h2 className="font-rubik text-3xl font-bold text-text-1 sm:text-4xl">
              Master the Craft
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Learn Patterns",
                desc: "Each topic is broken into recognizable patterns with detailed recognition signals and approach strategies.",
                num: "01",
              },
              {
                title: "Study Templates",
                desc: "Java templates explain the key decisions, edge cases, and implementation flow clearly.",
                num: "02",
              },
              {
                title: "Solve and Track",
                desc: "Work through curated problems and keep your solved history and streak in sync with the backend.",
                num: "03",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col rounded-xl border border-border bg-bg-card p-6 transition-all hover:translate-y-[-2px] hover:border-border-hover"
              >
                <span className="absolute right-5 top-4 font-rubik text-5xl font-bold text-primary/30">
                  {step.num}
                </span>
                <h3 className="mt-2 font-jakarta text-lg font-bold text-text-1">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
