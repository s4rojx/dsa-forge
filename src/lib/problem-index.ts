import { allTopics } from "@/data";
import type { Difficulty, Platform } from "@/types";

export interface ProblemMetadata {
  problemId: string;
  title: string;
  difficulty: Difficulty;
  platform: Platform;
  topicSlug: string;
  topicTitle: string;
  patternId: string;
  patternTitle: string;
  url: string;
}

const problemMetadataEntries = allTopics.flatMap((topic) =>
  topic.patterns.flatMap((pattern) =>
    pattern.problems.map((problem) => [
      problem.id,
      {
        problemId: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        platform: problem.platform,
        topicSlug: topic.slug,
        topicTitle: topic.title,
        patternId: pattern.id,
        patternTitle: pattern.title,
        url: problem.url,
      },
    ] as const)
  )
);

const problemMetadataById = new Map<string, ProblemMetadata>(problemMetadataEntries);

export function getProblemMetadata(problemId: string) {
  return problemMetadataById.get(problemId) ?? null;
}
