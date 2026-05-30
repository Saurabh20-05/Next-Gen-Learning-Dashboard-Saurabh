export interface ActivityDay {
  date: string;
  count: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateActivity(): ActivityDay[] {
  const days: ActivityDay[] = [];

  const BASE = new Date("2026-05-30T00:00:00.000Z");

  for (let i = 111; i >= 0; i--) {
    const d = new Date(BASE);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);

    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const rand = seededRandom(i * 7 + 13);

    let count = 0;
    if (isWeekend) {
      count = rand < 0.4 ? 0 : rand < 0.65 ? 1 : rand < 0.8 ? 2 : 3;
    } else {
      count = rand < 0.15 ? 0 : rand < 0.35 ? 1 : rand < 0.6 ? 2 : rand < 0.82 ? 3 : 4;
    }
    days.push({ date: dateStr, count });
  }

  return days;
}

export const activityData = generateActivity();

export function getCurrentStreak(data: ActivityDay[]): number {
  let streak = 0;
  const sorted = [...data].sort((a, b) => (a.date > b.date ? -1 : 1));
  for (const day of sorted) {
    if (day.count > 0) streak++;
    else break;
  }
  return streak;
}