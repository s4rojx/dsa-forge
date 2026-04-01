export type Difficulty = "easy" | "medium" | "hard" | "hardest";
export type Platform = "leetcode" | "gfg" | "codeforces";

export interface Problem {
  id: string;
  title: string;
  platform: Platform;
  url: string;
  difficulty: Difficulty;
  isStandard: boolean;
  companies: string[];
}

export interface Pattern {
  id: string;
  title: string;
  tagline: string;
  recognitionTips: string[];
  proTips: string[];
  approach: string;
  templateCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  problems: Problem[];
}

export interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  totalProblems: number;
  patterns: Pattern[];
}

export interface ProgressStore {
  solved: Record<string, boolean>;
  lastUpdated: string;
}

export interface SearchResult {
  type: "topic" | "pattern" | "problem" | "company";
  title: string;
  subtitle: string;
  topicSlug: string;
  patternId?: string;
  problemId?: string;
}
