import {
  formatLogDate,
  formatLogTime,
  mockVisitAt,
} from "@/lib/dateTime";

export type FlagReport = {
  id: string;
  date: string;
  time: string;
  comment: string;
  flaggedBy: string;
};

const FLAG_COMMENTS = [
  "The patient was flagged due to a significant change in their vital signs, indicating a potential risk that requires immediate attention.",
  "We flagged this patient because their recent lab results showed elevated levels that could suggest a serious condition.",
  "This patient was marked for review as they exhibited symptoms that are concerning and may require further evaluation.",
  "The reason for flagging this patient is due to their history of non-compliance with treatment, which poses a risk to their health.",
];

export function buildMockFlagReports(flaggedBy = "Chibuzor Oladele"): FlagReport[] {
  return FLAG_COMMENTS.map((comment, index) => {
    const visit = mockVisitAt(index, index + 3);
    return {
      id: `flag-${index + 1}`,
      date: visit.date,
      time: visit.time,
      comment,
      flaggedBy,
    };
  });
}

export function formatFlagDate(date: Date): string {
  return formatLogDate(date);
}

export function formatFlagTime(date: Date): string {
  return formatLogTime(date);
}
