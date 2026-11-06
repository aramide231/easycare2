import type { DiagnosticsPatientsLogRow } from "../../data/mockDiagnostics";
import {
  getPatientsLogRowByPatientId,
  PATIENTS_LOG_ROWS,
} from "../../data/mockDiagnostics";

export type DiagnosticsMedicalHistoryEntry = {
  id: string;
  date: string;
  time: string;
  consultationType: string;
};

const CONSULTATION_TYPES = [
  "General Consultation",
  "Antenatal Consultation",
  "Specialist Consultation",
  "Post Natal Consultation",
  "Immunization Consultation",
];

const INVESTIGATION_TYPES = [
  "Malaria Parasite (MP)",
  "Packed Cell Volume (PCV)",
  "Urinalysis",
  "Urine MCS",
  "Full Blood Count (FBC)",
];

const FIRST_PAGE_BY_PATIENT: Record<string, DiagnosticsMedicalHistoryEntry[]> = {
  "MSH/1088": [
    {
      id: "1",
      date: "08-Jan-2025",
      time: "09:15 AM",
      consultationType: "Malaria Parasite (MP)",
    },
    {
      id: "2",
      date: "22-Jan-2025",
      time: "10:00 AM",
      consultationType: "General Consultation",
    },
    {
      id: "3",
      date: "05-Feb-2025",
      time: "11:30 AM",
      consultationType: "Urinalysis",
    },
    {
      id: "4",
      date: "18-Feb-2025",
      time: "02:15 PM",
      consultationType: "General Consultation",
    },
    {
      id: "5",
      date: "04-Mar-2025",
      time: "08:45 AM",
      consultationType: "Packed Cell Volume (PCV)",
    },
  ],
  "MSH/1089": [
    {
      id: "1",
      date: "02-Feb-2025",
      time: "10:40 AM",
      consultationType: "Packed Cell Volume (PCV)",
    },
    {
      id: "2",
      date: "14-Feb-2025",
      time: "09:20 AM",
      consultationType: "General Consultation",
    },
    {
      id: "3",
      date: "28-Feb-2025",
      time: "11:00 AM",
      consultationType: "Full Blood Count (FBC)",
    },
    {
      id: "4",
      date: "10-Mar-2025",
      time: "03:30 PM",
      consultationType: "Specialist Consultation",
    },
    {
      id: "5",
      date: "12-Mar-2025",
      time: "11:15 AM",
      consultationType: "Malaria Parasite (MP)",
    },
  ],
  "P-2025001": [
    {
      id: "1",
      date: "12-Mar-2025",
      time: "10:30 AM",
      consultationType: "General Consultation",
    },
    {
      id: "2",
      date: "12-Mar-2025",
      time: "11:00 AM",
      consultationType: "General Consultation",
    },
    {
      id: "3",
      date: "12-Mar-2025",
      time: "11:30 AM",
      consultationType: "Antenatal Consultation",
    },
    {
      id: "4",
      date: "12-Mar-2025",
      time: "12:00 PM",
      consultationType: "General Consultation",
    },
    {
      id: "5",
      date: "12-Mar-2025",
      time: "12:30 PM",
      consultationType: "Specialist Consultation",
    },
  ],
};

function buildPatientHistory(
  patientId: string,
  total = 50
): DiagnosticsMedicalHistoryEntry[] {
  const firstPage =
    FIRST_PAGE_BY_PATIENT[patientId] ??
    FIRST_PAGE_BY_PATIENT["P-2025001"].map((row, index) => ({
      ...row,
      id: String(index + 1),
      consultationType:
        INVESTIGATION_TYPES[index % INVESTIGATION_TYPES.length] ??
        CONSULTATION_TYPES[index % CONSULTATION_TYPES.length],
    }));

  if (total <= firstPage.length) return firstPage.slice(0, total);

  const extra = Array.from({ length: total - firstPage.length }, (_, index) => {
    const rowNum = index + firstPage.length + 1;
    return {
      id: String(rowNum),
      date: "12-Mar-2025",
      time: `${9 + (rowNum % 8)}:${rowNum % 2 === 0 ? "15" : "45"} AM`,
      consultationType:
        CONSULTATION_TYPES[rowNum % CONSULTATION_TYPES.length] ??
        INVESTIGATION_TYPES[rowNum % INVESTIGATION_TYPES.length],
    };
  });

  return [...firstPage, ...extra];
}

export function getDiagnosticsMedicalHistory(
  patientId: string
): DiagnosticsMedicalHistoryEntry[] {
  return buildPatientHistory(patientId, 50);
}

export function resolveDiagnosticsPreviousPatient(
  idParam: string | undefined,
  statePatient?: DiagnosticsPatientsLogRow | null
): DiagnosticsPatientsLogRow | null {
  if (statePatient) return statePatient;

  if (!idParam) return PATIENTS_LOG_ROWS[0] ?? null;

  const numericId = Number(idParam);
  if (!Number.isNaN(numericId)) {
    return PATIENTS_LOG_ROWS.find((row) => row.id === numericId) ?? null;
  }

  return getPatientsLogRowByPatientId(idParam);
}
