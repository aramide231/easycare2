const MONTH_ABBREV = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type DateRangeValue = {
  startDate: Date;
  endDate: Date;
};

export function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function getTimeGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function formatLogDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTH_ABBREV[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatLogTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatLogDateTime(date: Date): string {
  return `${formatLogDate(date)} ${formatLogTime(date)}`;
}

export function formatSlashDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatOrdinalDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function formatTopBarDateTime(date: Date): string {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatClockDateTime(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

export function dateAtDaysAgo(
  daysAgo: number,
  hour = 10,
  minute = 25,
): Date {
  const date = startOfDay(new Date());
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);
  return date;
}

export function mockVisitAt(daysAgo: number, minuteOffset = 0) {
  const date = dateAtDaysAgo(
    daysAgo,
    8 + (minuteOffset % 10),
    5 + (minuteOffset % 55),
  );
  return {
    lastSeen: formatLogDate(date),
    time: formatLogTime(date),
    date: formatLogDate(date),
    dateTime: formatLogDateTime(date),
  };
}

/** Mock visit dates that always fall within the current calendar month. */
export function mockVisitAtCurrentMonth(index: number, minuteOffset = 0) {
  const dayOfMonth = new Date().getDate();
  return mockVisitAt(index % Math.max(dayOfMonth, 1), minuteOffset);
}

export function mockDateTimeDaysAgo(daysAgo: number): string {
  return formatLogDateTime(dateAtDaysAgo(daysAgo));
}

export function getTodayRange(): DateRangeValue {
  const today = startOfDay(new Date());
  return { startDate: today, endDate: today };
}

export function getCurrentMonthRange(): DateRangeValue {
  const now = new Date();
  return {
    startDate: startOfDay(new Date(now.getFullYear(), now.getMonth(), 1)),
    endDate: startOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
  };
}

export function currentPatientIdPrefix(): string {
  return `P-${new Date().getFullYear()}`;
}

export function dateAtDaysAhead(
  daysAhead: number,
  hour = 10,
  minute = 0,
): Date {
  const date = startOfDay(new Date());
  date.setDate(date.getDate() + daysAhead);
  date.setHours(hour, minute, 0, 0);
  return date;
}

export function mockNextAppointmentDate(daysAhead = 14): string {
  return formatSlashDate(dateAtDaysAhead(daysAhead));
}

export function mockBookDates(daysAgo: number, followUpDaysAhead = 17) {
  const bookDate = dateAtDaysAgo(daysAgo);
  const followUp = startOfDay(new Date(bookDate));
  followUp.setDate(followUp.getDate() + followUpDaysAhead);
  followUp.setHours(bookDate.getHours(), bookDate.getMinutes(), 0, 0);
  return {
    bookDate: formatLogDate(bookDate),
    time: formatLogTime(bookDate),
    followUp: formatLogDate(followUp),
    followUpTime: formatLogTime(followUp),
    lastSeen: formatLogDate(bookDate),
  };
}

export function formatPatientId(sequence: number): string {
  return `${currentPatientIdPrefix()}${String(sequence).padStart(3, "0")}`;
}

const MONTH_INDEX: Record<string, number> = {
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

export function parseLogDateTime(dateStr: string, timeStr: string): Date | null {
  const parts = dateStr.trim().split("-");
  if (parts.length !== 3) return null;

  const day = Number.parseInt(parts[0], 10);
  const month = MONTH_INDEX[parts[1]];
  const year = Number.parseInt(parts[2], 10);
  if (Number.isNaN(day) || month === undefined || Number.isNaN(year)) return null;

  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  return new Date(year, month, day, hours, minutes, 0, 0);
}

/** Days from admission date/time through discharge date/time (minimum 1 day). */
export function calculateStayDuration(
  admissionDateStr: string,
  admissionTimeStr: string,
  dischargeDate: Date = new Date(),
): string {
  const admission = parseLogDateTime(admissionDateStr, admissionTimeStr);
  if (!admission) return "—";

  const diffMs = dischargeDate.getTime() - admission.getTime();
  if (diffMs < 0) return "0 days";

  const days = Math.max(1, Math.ceil(diffMs / (24 * 60 * 60 * 1000)));
  return `${days} day${days === 1 ? "" : "s"}`;
}

export function calculateStayDurationBetween(
  admissionDateStr: string,
  admissionTimeStr: string,
  dischargeDateStr: string,
  dischargeTimeStr: string,
): string {
  const discharge = parseLogDateTime(dischargeDateStr, dischargeTimeStr);
  if (!discharge) return "—";
  return calculateStayDuration(admissionDateStr, admissionTimeStr, discharge);
}

/** Parses patient last-seen strings like `20-Feb-2025`. */
export function parsePatientLastSeen(value: string): Date | null {
  const parts = value.split("-");
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const monthKey = parts[1].slice(0, 3);
  const year = Number(parts[2]);
  const month = MONTH_INDEX[monthKey];

  if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) {
    return null;
  }

  return new Date(year, month, day);
}

export function isDateWithinRange(
  date: Date,
  range: DateRangeValue,
): boolean {
  const value = startOfDay(date).getTime();
  const start = startOfDay(range.startDate).getTime();
  const end = startOfDay(range.endDate).getTime();
  return value >= start && value <= end;
}
