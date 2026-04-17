import { allTopics } from "@/data";

export type LearningPathDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface LearningPathModule {
  id: string;
  title: string;
  description?: string;
  topicSlugs: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: LearningPathDifficulty;
  estimatedHours: number;
  outcomes: [string, string];
  modules: LearningPathModule[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "dsa-basics",
    title: "DSA Basics",
    description: "Programming foundations and first-pass interview patterns.",
    difficulty: "Beginner",
    estimatedHours: 60,
    outcomes: [
      "Time and space complexity fluency",
      "Strong basics in arrays, pointers, and linked structures",
    ],
    modules: [
      {
        id: "core-arrays",
        title: "Core Arrays and Search",
        description: "Build confidence with basic traversal, searching, and sorting intuition.",
        topicSlugs: ["arrays-strings", "binary-search", "sorting-searching"],
      },
      {
        id: "linear-patterns",
        title: "Sliding Window and Greedy",
        description: "Learn how local choices and moving windows unlock faster solutions.",
        topicSlugs: ["sliding-window", "greedy"],
      },
      {
        id: "foundational-structures",
        title: "Stacks, Queues, and Linked Lists",
        description: "Master data-flow problems with linear structures and pointer movement.",
        topicSlugs: ["stacks-queues", "linked-lists"],
      },
    ],
  },
  {
    id: "dsa-patterns",
    title: "DSA Pattern Mastery",
    description: "Pattern-first learning for medium-to-hard coding rounds.",
    difficulty: "Intermediate",
    estimatedHours: 180,
    outcomes: [
      "Pattern recognition across 80%+ interview questions",
      "Confident approach selection under time pressure",
    ],
    modules: [
      {
        id: "core-patterns",
        title: "Trees, Heaps, and Backtracking",
        description: "Cover recursive thinking, priority structures, and combinatorial exploration.",
        topicSlugs: ["trees-bst", "heaps", "backtracking"],
      },
      {
        id: "advanced-patterns",
        title: "DP, Graphs, and Tries",
        description: "Develop robust state modeling and graph traversal strategy.",
        topicSlugs: ["dynamic-programming", "graphs", "tries"],
      },
      {
        id: "specialized-patterns",
        title: "Bit Manipulation and Math",
        description: "Sharpen optimization instincts with low-level and numeric techniques.",
        topicSlugs: ["bit-manipulation", "math"],
      },
    ],
  },
  {
    id: "interview-sprint",
    title: "Interview Sprint",
    description: "Fast revision loop for upcoming coding interviews.",
    difficulty: "Advanced",
    estimatedHours: 40,
    outcomes: [
      "Targeted revision of weak patterns",
      "Higher solving speed with fewer re-attempts",
    ],
    modules: [
      {
        id: "high-frequency",
        title: "High-Frequency Patterns",
        description: "Revise the most commonly asked interview patterns at speed.",
        topicSlugs: [
          "arrays-strings",
          "binary-search",
          "sliding-window",
          "trees-bst",
          "graphs",
          "dynamic-programming",
        ],
      },
      {
        id: "edge-cases",
        title: "Edge Cases and Hard Pattern Drills",
        description: "Stress-test tricky constraints, corner cases, and hard pattern transitions.",
        topicSlugs: ["heaps", "backtracking", "bit-manipulation"],
      },
    ],
  },
];

export function getPathTopics(topicSlugs: string[]) {
  const slugSet = new Set(topicSlugs);
  return allTopics.filter((topic) => slugSet.has(topic.slug));
}

export function getLearningPathById(pathId: string) {
  return learningPaths.find((path) => path.id === pathId) ?? null;
}
