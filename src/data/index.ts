import { arraysStrings } from "./arrays-strings";
import { linkedLists } from "./linked-lists";
import { stacksQueues } from "./stacks-queues";
import { treesBst } from "./trees-bst";
import { graphs } from "./graphs";
import { heaps } from "./heaps";
import { tries } from "./tries";
import { backtracking } from "./backtracking";
import { greedy } from "./greedy";
import { bitManipulation } from "./bit-manipulation";
import { slidingWindow } from "./sliding-window";
import { binarySearch } from "./binary-search";
import { dynamicProgramming } from "./dynamic-programming";
import { sortingSearching } from "./sorting-searching";
import { math } from "./math";
import { Topic } from "@/types";

export const allTopics: Topic[] = [
  arraysStrings,
  binarySearch,
  sortingSearching,
  slidingWindow,
  greedy,
  stacksQueues,
  linkedLists,
  treesBst,
  heaps,
  backtracking,
  dynamicProgramming,
  tries,
  bitManipulation,
  graphs,
  math,
];

export const getTopicBySlug = (slug: string): Topic | undefined =>
  allTopics.find((t) => t.slug === slug);

export const getTotalProblems = (): number =>
  allTopics.reduce((sum, t) => sum + t.totalProblems, 0);

export const getTotalPatterns = (): number =>
  allTopics.reduce((sum, t) => sum + t.patterns.length, 0);
