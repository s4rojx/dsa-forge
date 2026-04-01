interface StreakDayRecord {
  date: Date;
  count: number;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function startOfUtcDay(input: Date) {
  return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
}

export function addUtcDays(input: Date, days: number) {
  return new Date(input.getTime() + days * DAY_IN_MS);
}

export function formatUtcDay(input: Date) {
  return input.toISOString().slice(0, 10);
}

export function getCurrentStreak(days: StreakDayRecord[]) {
  const activeDays = new Set(
    days.filter((day) => day.count > 0).map((day) => formatUtcDay(startOfUtcDay(day.date)))
  );
  const today = startOfUtcDay(new Date());
  const yesterday = addUtcDays(today, -1);

  let cursor: Date | null = null;
  if (activeDays.has(formatUtcDay(today))) {
    cursor = today;
  } else if (activeDays.has(formatUtcDay(yesterday))) {
    cursor = yesterday;
  }

  if (!cursor) {
    return 0;
  }

  let streak = 0;
  while (cursor && activeDays.has(formatUtcDay(cursor))) {
    streak += 1;
    cursor = addUtcDays(cursor, -1);
  }

  return streak;
}

export function getStreakWarning(days: StreakDayRecord[]) {
  const activeDays = new Set(
    days.filter((day) => day.count > 0).map((day) => formatUtcDay(startOfUtcDay(day.date)))
  );
  const today = startOfUtcDay(new Date());
  const yesterday = addUtcDays(today, -1);

  return (
    !activeDays.has(formatUtcDay(today)) && activeDays.has(formatUtcDay(yesterday))
  );
}

export function buildHeatmapDays(days: StreakDayRecord[], weeks = 52) {
  const countsByDay = new Map(
    days.map((day) => [formatUtcDay(startOfUtcDay(day.date)), day.count] as const)
  );
  const totalDays = weeks * 7;
  const today = startOfUtcDay(new Date());
  const startDate = addUtcDays(today, -(totalDays - 1));

  return Array.from({ length: totalDays }, (_, index) => {
    const date = addUtcDays(startDate, index);
    const key = formatUtcDay(date);

    return {
      date: key,
      count: countsByDay.get(key) ?? 0,
    };
  });
}
