export type PreviousPatientSummary = {
  id?: number;
  firstName: string;
  lastName: string;
  patientId: string;
  phoneNumber?: string;
  gender?: string;
  age?: number;
  bloodPressure?: string;
  heartRate?: string;
  weight?: string;
  height?: string;
  address?: string;
  relationship?: string;
  patientType?: string;
  medicationGuide?: string;
  lastVisitDate?: string;
  nextAppointment?: string;
};

export type MedicalHistoryEntry = {
  id: string;
  date: string;
  time: string;
  consultationType: string;
};

export const DEFAULT_PREVIOUS_PATIENT: PreviousPatientSummary = {
  id: 1,
  firstName: "Abiola",
  lastName: "Adebayo",
  patientId: "P-2025001",
  phoneNumber: "09012345678",
  gender: "Male",
  age: 31,
  bloodPressure: "120/80",
  heartRate: "75",
  weight: "85",
  height: "170cm",
  address: "Lagos, Nigeria",
  relationship: "Married",
  patientType: "COMPANY",
  medicationGuide: "Fee for Ser.",
  lastVisitDate: "21/02/2022",
  nextAppointment: "01/03/2025",
};

const CONSULTATION_TYPES = [
  "General Consultation",
  "Antenatal Consultation",
  "Specialist Consultation",
  "Post Natal Consultation",
  "Immunization Consultation",
];

const FIRST_PAGE: MedicalHistoryEntry[] = [
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
];

export function buildMedicalHistorySeed(total = 50): MedicalHistoryEntry[] {
  if (total <= FIRST_PAGE.length) return FIRST_PAGE.slice(0, total);

  const extra = Array.from({ length: total - FIRST_PAGE.length }, (_, index) => {
    const rowNum = index + FIRST_PAGE.length + 1;
    return {
      id: String(rowNum),
      date: "12-Mar-2025",
      time: `${9 + (rowNum % 8)}:${rowNum % 2 === 0 ? "15" : "45"} AM`,
      consultationType:
        CONSULTATION_TYPES[rowNum % CONSULTATION_TYPES.length],
    };
  });

  return [...FIRST_PAGE, ...extra];
}

export const MEDICAL_HISTORY_SEED = buildMedicalHistorySeed(50);
