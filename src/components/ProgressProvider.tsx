"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";

type ProgressStore = Record<string, boolean>;

interface StreakDay {
  date: string;
  count: number;
}

interface StreakData {
  currentStreak: number;
  showWarningBanner: boolean;
  days: StreakDay[];
}

interface RecentSolvedItem {
  problemId: string;
  title: string;
  difficulty: "easy" | "medium" | "hard" | "hardest";
  topicTitle: string;
  patternTitle: string;
  url: string;
  solvedAt: string;
}

interface UserStats {
  totalSolved: number;
  totalProblems: number;
  totalPatterns: number;
  topicsCovered: number;
  completionPercentage: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
  recentSolved: RecentSolvedItem[];
}

interface ProgressContextValue {
  progress: ProgressStore;
  isLoaded: boolean;
  isSyncing: boolean;
  streakData: StreakData;
  userStats: UserStats;
  toggleProblem: (problemId: string) => Promise<boolean>;
  isCompleted: (problemId: string) => boolean;
  getTopicProgress: (problemIds: string[]) => {
    completed: number;
    total: number;
    percentage: number;
  };
  getPatternProgress: (problemIds: string[]) => {
    completed: number;
    total: number;
    percentage: number;
  };
  getTotalCompleted: () => number;
  resetProgress: () => Promise<boolean>;
  refreshProgressState: () => Promise<void>;
}

interface ProgressResponse {
  solvedProblemIds: string[];
}

const emptyStreakData: StreakData = {
  currentStreak: 0,
  showWarningBanner: false,
  days: [],
};

const emptyUserStats: UserStats = {
  totalSolved: 0,
  totalProblems: 0,
  totalPatterns: 0,
  topicsCovered: 0,
  completionPercentage: 0,
  difficultyBreakdown: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  recentSolved: [],
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}`);
  }

  return (await response.json()) as T;
}

export default function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState<ProgressStore>({});
  const [streakData, setStreakData] = useState<StreakData>(emptyStreakData);
  const [userStats, setUserStats] = useState<UserStats>(emptyUserStats);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const refreshProgressState = useCallback(async () => {
    if (status === "loading") {
      return;
    }

    if (!session?.user?.id) {
      let localProgress = {};
      try {
        const stored = localStorage.getItem("dsa_progress");
        if (stored) {
          localProgress = JSON.parse(stored);
        }
      } catch (e) {
        console.error("Failed to read local progress", e);
      }
      
      setProgress(localProgress);
      setStreakData(emptyStreakData);
      setUserStats(emptyUserStats);
      setIsLoaded(true);
      setIsSyncing(false);
      return;
    }

    setIsSyncing(true);

    try {
      const [progressResponse, nextStreakData, nextUserStats] = await Promise.all([
        fetchJson<ProgressResponse>("/api/progress"),
        fetchJson<StreakData>("/api/streak"),
        fetchJson<UserStats>("/api/user"),
      ]);

      setProgress(
        Object.fromEntries(
          progressResponse.solvedProblemIds.map((problemId) => [problemId, true] as const)
        )
      );
      setStreakData(nextStreakData);
      setUserStats(nextUserStats);
    } catch (error) {
      console.error("Progress state refresh failed:", error);
    } finally {
      setIsLoaded(true);
      setIsSyncing(false);
    }
  }, [session?.user?.id, status]);

  useEffect(() => {
    void refreshProgressState();
  }, [refreshProgressState]);

  const toggleProblem = useCallback(
    async (problemId: string) => {
      const wasCompleted = Boolean(progress[problemId]);

      // Optimistic update for UI feel
      setProgress((current) => {
        const next = { ...current };
        if (wasCompleted) {
          delete next[problemId];
        } else {
          next[problemId] = true;
        }

        // If unauthenticated, save to local storage immediately
        if (!session?.user?.id) {
          try {
            localStorage.setItem("dsa_progress", JSON.stringify(next));
          } catch (e) {
            console.error("Local storage error:", e);
          }
        }
        return next;
      });

      // If not authenticated, we only do local state
      if (!session?.user?.id) {
        return true;
      }

      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problemId,
            completed: !wasCompleted,
          }),
        });

        if (!response.ok) {
          throw new Error("Problem toggle failed");
        }

        await refreshProgressState();
        return true;
      } catch (error) {
        console.error("Toggle progress failed:", error);
        // Rollback on failure
        setProgress((current) => {
          const reverted = { ...current };
          if (wasCompleted) {
            reverted[problemId] = true;
          } else {
            delete reverted[problemId];
          }
          return reverted;
        });
        return false;
      }
    },
    [progress, refreshProgressState, session?.user?.id]
  );

  const resetProgress = useCallback(async () => {
    if (!session?.user?.id) {
      return false;
    }

    const previous = progress;
    setProgress({});

    try {
      const response = await fetch("/api/progress", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Progress reset failed");
      }

      await refreshProgressState();
      return true;
    } catch (error) {
      console.error("Reset progress failed:", error);
      setProgress(previous);
      return false;
    }
  }, [progress, refreshProgressState, session?.user?.id]);

  const isCompleted = useCallback(
    (problemId: string) => Boolean(progress[problemId]),
    [progress]
  );

  const getProgressMetrics = useCallback(
    (problemIds: string[]) => {
      const completed = problemIds.filter((problemId) => progress[problemId]).length;
      const total = problemIds.length;

      return {
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },
    [progress]
  );

  const getTotalCompleted = useCallback(
    () => Object.keys(progress).length,
    [progress]
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      isLoaded,
      isSyncing,
      streakData,
      userStats,
      toggleProblem,
      isCompleted,
      getTopicProgress: getProgressMetrics,
      getPatternProgress: getProgressMetrics,
      getTotalCompleted,
      resetProgress,
      refreshProgressState,
    }),
    [
      getProgressMetrics,
      getTotalCompleted,
      isCompleted,
      isLoaded,
      isSyncing,
      progress,
      refreshProgressState,
      resetProgress,
      streakData,
      toggleProblem,
      userStats,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgressContext() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }

  return context;
}
