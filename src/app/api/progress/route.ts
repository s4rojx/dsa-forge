import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProblemMetadata } from "@/lib/problem-index";
import { addUtcDays, startOfUtcDay } from "@/lib/streak";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const solvedProblems = await prisma.solvedProblem.findMany({
      where: { userId: session.user.id },
      select: { problemId: true },
    });

    return NextResponse.json({
      solvedProblemIds: solvedProblems.map((problem) => problem.problemId),
    });
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = (await req.json()) as {
      problemId?: string;
      completed?: boolean;
    };
    const { problemId, completed } = body;

    if (typeof problemId !== "string" || typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "Invalid progress payload" },
        { status: 400 }
      );
    }

    const normalizedProblemId = problemId.trim();
    if (!normalizedProblemId || !getProblemMetadata(normalizedProblemId)) {
      return NextResponse.json(
        { error: "Unknown problem id" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    await prisma.$transaction(async (tx) => {
      const existing = await tx.solvedProblem.findUnique({
        where: {
          userId_problemId: {
            userId,
            problemId: normalizedProblemId,
          },
        },
      });

      if (completed) {
        if (existing) {
          return;
        }

        const solvedAt = new Date();
        const streakDate = startOfUtcDay(solvedAt);

        await tx.solvedProblem.create({
          data: {
            userId,
            problemId: normalizedProblemId,
            solvedAt,
          },
        });

        await tx.streakDay.upsert({
          where: {
            userId_date: {
              userId,
              date: streakDate,
            },
          },
          update: {
            count: {
              increment: 1,
            },
          },
          create: {
            userId,
            date: streakDate,
            count: 1,
          },
        });

        return;
      }

      if (!existing) {
        return;
      }

      const streakDate = startOfUtcDay(existing.solvedAt);
      const nextDay = addUtcDays(streakDate, 1);

      await tx.solvedProblem.delete({
        where: { id: existing.id },
      });

      const remainingForDay = await tx.solvedProblem.count({
        where: {
          userId,
          solvedAt: {
            gte: streakDate,
            lt: nextDay,
          },
        },
      });

      if (remainingForDay === 0) {
        await tx.streakDay.deleteMany({
          where: {
            userId,
            date: streakDate,
          },
        });
      } else {
        await tx.streakDay.update({
          where: {
            userId_date: {
              userId,
              date: streakDate,
            },
          },
          data: {
            count: remainingForDay,
          },
        });
      }
    });

    return NextResponse.json({ problemId: normalizedProblemId, completed });
  } catch (error) {
    console.error("Progress save error:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await prisma.$transaction([
      prisma.solvedProblem.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.streakDay.deleteMany({
        where: { userId: session.user.id },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Progress reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset progress" },
      { status: 500 }
    );
  }
}
