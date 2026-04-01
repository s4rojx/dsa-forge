"use client";

import { Search } from "lucide-react";
import SearchModal from "@/components/SearchModal";
import Sidebar from "@/components/Sidebar";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useSearch } from "@/hooks/useSearch";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { query, setQuery, results, isOpen, openSearch, closeSearch } = useSearch();
  useKeyboard(openSearch);

  return (
    <div className="min-h-screen bg-bg-root">
      <Sidebar />
      <SearchModal
        isOpen={isOpen}
        onClose={closeSearch}
        query={query}
        setQuery={setQuery}
        results={results}
      />

      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg-root/95 px-6 backdrop-blur-sm">
          <div />
          <button
            onClick={openSearch}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg-card px-3 py-2 text-sm text-text-2 transition-colors hover:border-primary/40 hover:text-text-1"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden h-5 items-center gap-0.5 rounded border border-border bg-bg-elevated px-1.5 font-mono text-[10px] text-text-3 sm:inline-flex">
              Ctrl K
            </kbd>
          </button>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
