"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FileCode2, Layers, Search, X } from "lucide-react";
import type { SearchResult } from "@/hooks/useSearch";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
}

const typeIcons = {
  topic: BookOpen,
  pattern: Layers,
  problem: FileCode2,
};

const difficultyColors: Record<string, string> = {
  easy: "text-success",
  medium: "text-primary",
  hard: "text-danger",
  hardest: "text-danger",
};

export default function SearchModal({
  isOpen,
  onClose,
  query,
  setQuery,
  results,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-bg-root/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-xl rounded-xl border border-border bg-bg-card shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-text-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search problems, patterns, topics..."
            className="flex-1 bg-transparent font-jakarta text-sm text-text-1 outline-none placeholder:text-text-3/50"
          />
          <button
            onClick={onClose}
            className="rounded-md p-1 text-text-3 transition-colors hover:text-text-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {query.length < 2 ? (
            <div className="px-4 py-8 text-center text-sm text-text-2">
              Type at least 2 characters to search.
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-text-2">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <ul>
              {results.map((result, index) => {
                const Icon = typeIcons[result.type];

                return (
                  <li key={`${result.type}-${index}`}>
                    <Link
                      href={result.url}
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-bg-elevated"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-text-3 transition-colors group-hover:text-primary" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium text-text-1">
                            {result.title}
                          </span>
                          {result.difficulty && (
                            <span
                              className={`text-[10px] font-mono uppercase ${difficultyColors[result.difficulty]}`}
                            >
                              {result.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-text-3">
                          {result.description}
                        </p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-text-3/30 transition-colors group-hover:text-primary" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2 font-mono text-[10px] text-text-3/50">
          <span>Arrow keys navigate</span>
          <span>Enter select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
