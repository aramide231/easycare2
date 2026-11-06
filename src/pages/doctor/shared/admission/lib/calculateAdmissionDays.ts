const MONTH_MAP: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

export function parseClinicalDate(dateStr?: string, timeStr?: string): Date | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (!trimmed || trimmed === "--" || trimmed === "—") return null;

  let year = 0;
  let month = -1;
  let day = 0;

  // Match DD-MMM-YYYY or DD MMM YYYY (e.g., "01-Oct-2026" or "Oct 1, 2026")
  const dmyMatch = /^(\d{1,2})[-/\s]+([A-Za-z]+)[-/\s,]+(\d{4})/.exec(trimmed);
  const mdyTextMatch = /^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/.exec(trimmed);
  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(trimmed);
  const numericDmyMatch = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/.exec(trimmed);

  if (dmyMatch) {
    day = Number(dmyMatch[1]);
    month = MONTH_MAP[dmyMatch[2].toLowerCase()] ?? -1;
    year = Number(dmyMatch[3]);
  } else if (mdyTextMatch) {
    month = MONTH_MAP[mdyTextMatch[1].toLowerCase()] ?? -1;
    day = Number(mdyTextMatch[2]);
    year = Number(mdyTextMatch[3]);
  } else if (isoMatch) {
    year = Number(isoMatch[1]);
    month = Number(isoMatch[2]) - 1;
    day = Number(isoMatch[3]);
  } else if (numericDmyMatch) {
    day = Number(numericDmyMatch[1]);
    month = Number(numericDmyMatch[2]) - 1;
    year = Number(numericDmyMatch[3]);
  } else {
    const fallback = new Date(trimmed);
    if (!Number.isNaN(fallback.getTime())) {
      return fallback;
    }
    return null;
  }

  if (month < 0 || month > 11 || day < 1 || day > 31 || year < 1900) {
    return null;
  }

  let hours = 0;
  let minutes = 0;
  if (timeStr) {
    const timeMatch = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(timeStr.trim());
    if (timeMatch) {
      hours = Number(timeMatch[1]);
      minutes = Number(timeMatch[2]);
      const meridiem = timeMatch[3]?.toUpperCase();
      if (meridiem === "PM" && hours < 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
    }
  }

  return new Date(year, month, day, hours, minutes, 0, 0);
}

/**
 * Calculates the number of days spent on admission:
 * Formula: {Days} = {Date}{discharged} - {Date}{admitted}
 * Example: Admit Clicked Oct 1, 2026 at 08:00 AM -> Discharge Confirmed Oct 3, 2026 at 02:00 PM = 2 days.
 */
export function calculateAdmissionDays(
  admittedDateStr?: string,
  dischargedDateStr?: string,
  admittedTimeStr?: string,
  dischargedTimeStr?: string
): string {
  const admitted = parseClinicalDate(admittedDateStr, admittedTimeStr);
  const discharged = dischargedDateStr
    ? parseClinicalDate(dischargedDateStr, dischargedTimeStr)
    : new Date();

  if (!admitted || !discharged) {
    return "1 day";
  }

  const startMidnight = new Date(
    admitted.getFullYear(),
    admitted.getMonth(),
    admitted.getDate()
  ).getTime();
  const endMidnight = new Date(
    discharged.getFullYear(),
    discharged.getMonth(),
    discharged.getDate()
  ).getTime();

  const diffCalendarDays = Math.round(
    (endMidnight - startMidnight) / (1000 * 60 * 60 * 24)
  );

  const days = Math.max(0, diffCalendarDays);
  return `${days} ${days === 1 ? "day" : "days"}`;
}
