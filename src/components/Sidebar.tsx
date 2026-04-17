"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  Flame,
  FolderOpen,
  Map,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  X,
  Zap,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learning-path", label: "Learning Path", icon: Map },
  { href: "/topics", label: "Topics", icon: FolderOpen },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { getTotalCompleted, streakData } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalSolved = getTotalCompleted();

  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email
      ? session.user.email.charAt(0).toUpperCase()
      : "?";

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-elevated text-text-2 transition-colors hover:text-primary lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-bg-card transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-rubik text-lg font-bold text-text-1">
              DSA <span className="text-primary">Forge</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-text-3 transition-colors hover:text-text-1 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "border-l-2 border-primary bg-bg-surface text-primary"
                    : "text-text-2 hover:bg-bg-surface hover:text-text-1"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-border px-5 py-4">
          <div className="flex items-center gap-2 text-primary">
            <Flame className="h-4 w-4" />
            <span className="font-mono text-sm font-semibold">
              {streakData.currentStreak} day streak
            </span>
          </div>
          <p className="font-mono text-sm text-text-2">{totalSolved} solved</p>
        </div>

        <div className="border-t border-border px-5 py-4">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-mono font-bold text-primary">
                {userInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-1">
                  {session.user.name || session.user.email}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-text-3 transition-colors hover:text-danger"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
