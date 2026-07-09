export type ReportDateRange = {
  startDate: Date;
  endDate: Date;
};

export const DEFAULT_REPORT_DATE_RANGE: ReportDateRange = {
  startDate: new Date(2025, 2, 25),
  endDate: new Date(2025, 2, 28),
};

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isDateWithinRange(
  date: Date,
  range: ReportDateRange
): boolean {
  const value = startOfDay(date).getTime();
  const start = startOfDay(range.startDate).getTime();
  const end = startOfDay(range.endDate).getTime();
  return value >= start && value <= end;
}

export function parseReportDate(value: string): Date {
  return new Date(value);
}
