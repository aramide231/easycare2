import { formatLogDate, dateAtDaysAgo } from "@/lib/dateTime";

export type PreviousMedicalRecord = {
  id: string;
  date: string;
  consultationType: string;
};

const CONSULTATION_TYPES = [
  "General Consultation",
  "Antenatal Consultation",
  "Specialist Consultation",
  "Immunization",
  "Post Natal Consultation",
  "Neonatal Consultation",
];

export function parseMedicalRecordDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockPreviousMedicalHistory(
  patientId: string,
): PreviousMedicalRecord[] {
  const records: PreviousMedicalRecord[] = [];

  for (let i = 0; i < 45; i++) {
    records.push({
      id: `${patientId}-record-${i + 1}`,
      date: formatLogDate(dateAtDaysAgo(i * 3)),
      consultationType: CONSULTATION_TYPES[i % CONSULTATION_TYPES.length],
    });
  }

  return records;
}
