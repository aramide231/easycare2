export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export type DateRangeValue = {
  startDate: Date;
  endDate: Date;
};

export function getCurrentMonthRange(): DateRangeValue {
  const now = new Date();
  return {
    startDate: new Date(now.getFullYear(), now.getMonth(), 1),
    endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0),
  };
}

export function dateAtDaysAgo(
  daysAgo: number,
  hours = 0,
  minutes = 0
): Date {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function formatSlashDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatLogTime(date: Date): string {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function parsePatientLastSeen(value: string): Date | null {
  const parts = value.split("-");
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const monthKey = parts[1].slice(0, 3);
  const year = Number(parts[2]);
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const month = months[monthKey];
  if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) {
    return null;
  }

  return new Date(year, month, day);
}

export function isDateWithinRange(date: Date, range: DateRangeValue): boolean {
  const value = startOfDay(date).getTime();
  const start = startOfDay(range.startDate).getTime();
  const end = startOfDay(range.endDate).getTime();
  return value >= start && value <= end;
}
