"use client";

import { useCallback, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { allTopics } from "@/data";

interface SearchResult {
  type: "problem" | "pattern" | "topic";
  title: string;
  description: string;
  url: string;
  topicSlug: string;
  topicTitle: string;
  patternTitle?: string;
  difficulty?: "easy" | "medium" | "hard" | "hardest";
}

function buildSearchIndex(): SearchResult[] {
  const items: SearchResult[] = [];

  for (const topic of allTopics) {
    items.push({
      type: "topic",
      title: topic.title,
      description: topic.description,
      url: `/topic/${topic.slug}`,
      topicSlug: topic.slug,
      topicTitle: topic.title,
    });

    for (const pattern of topic.patterns) {
      items.push({
        type: "pattern",
        title: pattern.title,
        description: pattern.tagline,
        url: `/pattern/${pattern.id}`,
        topicSlug: topic.slug,
        topicTitle: topic.title,
        patternTitle: pattern.title,
      });

      for (const problem of pattern.problems) {
        items.push({
          type: "problem",
          title: problem.title,
          description: `${pattern.title} - ${topic.title}`,
          url: `/pattern/${pattern.id}`,
          topicSlug: topic.slug,
          topicTitle: topic.title,
          patternTitle: pattern.title,
          difficulty: problem.difficulty,
        });
      }
    }
  }

  return items;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "description", weight: 0.2 },
          { name: "topicTitle", weight: 0.1 },
          { name: "patternTitle", weight: 0.1 },
        ],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [searchIndex]
  );

  const results = useMemo(() => {
    if (query.length < 2) {
      return [];
    }

    return fuse.search(query).slice(0, 15).map((result) => result.item);
  }, [fuse, query]);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    results,
    isOpen,
    openSearch,
    closeSearch,
  };
}

export type { SearchResult };
