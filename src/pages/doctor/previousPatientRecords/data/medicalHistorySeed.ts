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
  address: "12 Allen Avenue, Ikeja, Lagos",
  relationship: "Married",
  patientType: "COMPANY",
  medicationGuide: "Fee for Ser.",
  lastVisitDate: "21/02/2025",
  nextAppointment: "01/04/2025",
};

export const DOCTOR_PATIENT_PREV_MEDICAL: Record<string, PreviousPatientSummary> =
  {
    "P-2025001": DEFAULT_PREVIOUS_PATIENT,
    "P-2025002": {
      firstName: "Chinonso",
      lastName: "Eze",
      patientId: "P-2025002",
      gender: "Male",
      bloodPressure: "130/85",
      heartRate: "78",
      weight: "78",
      height: "178cm",
      address: "22 Oba Akran Ave, Ikeja, Lagos",
      relationship: "Single",
      patientType: "PRIVATE",
      medicationGuide: "Fee for Ser.",
      lastVisitDate: "10/02/2025",
      nextAppointment: "22/03/2025",
    },
    "P-2025003": {
      firstName: "Damilola",
      lastName: "Ogunleye",
      patientId: "P-2025003",
      gender: "Female",
      bloodPressure: "118/78",
      heartRate: "70",
      weight: "58",
      height: "162cm",
      address: "5 Admiralty Way, Lekki, Lagos",
      relationship: "Married",
      patientType: "COMPANY",
      medicationGuide: "Company Scheme",
      lastVisitDate: "18/02/2025",
      nextAppointment: "10/05/2025",
    },
    "P-2025004": {
      firstName: "Emeka",
      lastName: "Nwankwo",
      patientId: "P-2025004",
      gender: "Male",
      bloodPressure: "135/90",
      heartRate: "82",
      weight: "90",
      height: "175cm",
      address: "8 Broad St, Lagos Island",
      relationship: "Married",
      patientType: "HMO",
      medicationGuide: "HMO Covered",
      lastVisitDate: "25/01/2025",
      nextAppointment: "05/04/2025",
    },
    "P-2025005": {
      firstName: "Ifeoma",
      lastName: "Okeke",
      patientId: "P-2025005",
      gender: "Female",
      bloodPressure: "122/79",
      heartRate: "74",
      weight: "65",
      height: "168cm",
      address: "3 Toyin St, Ikeja, Lagos",
      relationship: "Married",
      patientType: "COMPANY",
      medicationGuide: "Company Scheme",
      lastVisitDate: "05/03/2025",
      nextAppointment: "12/04/2025",
    },
    "P-2025006": {
      firstName: "Toluwa",
      lastName: "Afolabi",
      patientId: "P-2025006",
      gender: "Male",
      bloodPressure: "125/82",
      heartRate: "68",
      weight: "72",
      height: "172cm",
      address: "19 Ogudu Rd, Lagos",
      relationship: "Single",
      patientType: "COMPANY",
      medicationGuide: "Staff Welfare",
      lastVisitDate: "02/02/2025",
      nextAppointment: "20/04/2025",
    },
  };

export function resolvePreviousPatient(
  statePatient?: PreviousPatientSummary,
  patientIdParam?: string
): PreviousPatientSummary {
  const patientId =
    patientIdParam ??
    statePatient?.patientId ??
    DEFAULT_PREVIOUS_PATIENT.patientId;
  const fromLookup =
    DOCTOR_PATIENT_PREV_MEDICAL[patientId] ?? DEFAULT_PREVIOUS_PATIENT;

  return {
    ...fromLookup,
    ...statePatient,
    patientId,
    firstName: statePatient?.firstName ?? fromLookup.firstName,
    lastName: statePatient?.lastName ?? fromLookup.lastName,
    bloodPressure: statePatient?.bloodPressure ?? fromLookup.bloodPressure,
  };
}

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

export function buildMedicalHistorySeed(
  total = 50,
  patientId?: string
): MedicalHistoryEntry[] {
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

  const seed = [...FIRST_PAGE, ...extra];
  if (!patientId) return seed;

  const offset = patientId.charCodeAt(patientId.length - 1) % CONSULTATION_TYPES.length;
  return seed.map((row, index) => ({
    ...row,
    consultationType:
      CONSULTATION_TYPES[(index + offset) % CONSULTATION_TYPES.length],
  }));
}

export function getMedicalHistoryForPatient(patientId: string): MedicalHistoryEntry[] {
  return buildMedicalHistorySeed(50, patientId);
}

export const MEDICAL_HISTORY_SEED = buildMedicalHistorySeed(50);
