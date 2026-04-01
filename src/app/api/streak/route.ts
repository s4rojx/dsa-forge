import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildHeatmapDays, getCurrentStreak, getStreakWarning } from "@/lib/streak";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const streakDays = await prisma.streakDay.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "asc" },
      select: {
        date: true,
        count: true,
      },
    });

    return NextResponse.json({
      currentStreak: getCurrentStreak(streakDays),
      showWarningBanner: getStreakWarning(streakDays),
      days: buildHeatmapDays(streakDays),
    });
  } catch (error) {
    console.error("Streak fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch streak" },
      { status: 500 }
    );
  }
}
