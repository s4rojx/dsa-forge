"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogIn, Search, Zap } from "lucide-react";

interface NavbarProps {
  onSearchOpen: () => void;
  totalSolved: number;
}

export default function Navbar({ onSearchOpen, totalSolved }: NavbarProps) {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg-root/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <Zap className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          <span className="font-rubik text-xl font-bold text-text-1">
            DSA <span className="text-primary">Forge</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {totalSolved > 0 && (
            <span className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary sm:inline-flex">
              {totalSolved} solved
            </span>
          )}

          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg-card px-3 py-2 text-sm text-text-2 transition-colors hover:border-primary/40 hover:text-text-1"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden h-5 items-center gap-0.5 rounded border border-border bg-bg-elevated px-1.5 font-mono text-[10px] text-text-3 sm:inline-flex">
              Ctrl K
            </kbd>
          </button>

          {session?.user ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-jakarta font-bold text-white transition-all hover:bg-primary-dim"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-jakarta font-bold text-white transition-all hover:bg-primary-dim"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
