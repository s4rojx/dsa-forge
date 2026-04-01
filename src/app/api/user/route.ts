import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { allTopics, getTotalPatterns, getTotalProblems } from "@/data";
import { authOptions } from "@/lib/auth";
import { getProblemMetadata } from "@/lib/problem-index";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const [solvedProblems, recentSolved] = await Promise.all([
      prisma.solvedProblem.findMany({
        where: { userId: session.user.id },
        select: {
          problemId: true,
        },
      }),
      prisma.solvedProblem.findMany({
        where: { userId: session.user.id },
        orderBy: { solvedAt: "desc" },
        take: 10,
        select: {
          problemId: true,
          solvedAt: true,
        },
      }),
    ]);

    const solvedIds = solvedProblems.map((problem) => problem.problemId);
    const solvedSet = new Set(solvedIds);
    const totalSolved = solvedIds.length;
    const totalProblems = getTotalProblems();
    const totalPatterns = getTotalPatterns();
    const topicsCovered = allTopics.filter((topic) =>
      topic.patterns.some((pattern) =>
        pattern.problems.some((problem) => solvedSet.has(problem.id))
      )
    ).length;

    const difficultyBreakdown = solvedIds.reduce(
      (acc, problemId) => {
        const metadata = getProblemMetadata(problemId);
        if (!metadata) {
          return acc;
        }

        if (metadata.difficulty === "easy") {
          acc.easy += 1;
        } else if (metadata.difficulty === "medium") {
          acc.medium += 1;
        } else {
          acc.hard += 1;
        }

        return acc;
      },
      { easy: 0, medium: 0, hard: 0 }
    );

    return NextResponse.json({
      totalSolved,
      totalProblems,
      totalPatterns,
      topicsCovered,
      completionPercentage:
        totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0,
      difficultyBreakdown,
      recentSolved: recentSolved
        .map((problem) => {
          const metadata = getProblemMetadata(problem.problemId);
          if (!metadata) {
            return null;
          }

          return {
            problemId: problem.problemId,
            title: metadata.title,
            difficulty: metadata.difficulty,
            topicTitle: metadata.topicTitle,
            patternTitle: metadata.patternTitle,
            url: metadata.url,
            solvedAt: problem.solvedAt.toISOString(),
          };
        })
        .filter(Boolean),
    });
  } catch (error) {
    console.error("User stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}
