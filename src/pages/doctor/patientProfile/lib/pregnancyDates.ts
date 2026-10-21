import { formatDateToDDMMYY, parseDDMMYY } from "./dateFormat";

const DAYS_IN_PREGNANCY = 280;

/** EDD = LMP + 280 days. */
export function calculateEddFromLmp(lmpValue: string): string {
  const lmp = parseDDMMYY(lmpValue);
  if (!lmp) return "";
  const edd = new Date(lmp);
  edd.setDate(edd.getDate() + DAYS_IN_PREGNANCY);
  return formatDateToDDMMYY(edd);
}

/** EGA as weeks & days from LMP to today. */
export function calculateEgaFromLmp(
  lmpValue: string,
  today: Date = new Date(),
): string {
  const lmp = parseDDMMYY(lmpValue);
  if (!lmp) return "";

  const start = new Date(lmp);
  start.setHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setHours(0, 0, 0, 0);

  const diffMs = end.getTime() - start.getTime();
  if (diffMs < 0) return "0 weeks 0 days";

  const totalDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return `${weeks} weeks ${days} day${days === 1 ? "" : "s"}`;
}
