import type { TreatmentType } from "../../data/mockDiagnostics";

export type InvestigationLogRow = {
  id: number;
  regName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  pxType: TreatmentType;
  age: number;
  invName: string;
  invAmount: string;
  staffName: string;
  clinician: string;
  hasResult: boolean;
};

/** Investigations Logs — Investigations Report (9 rows, Figma). */
export const INVESTIGATION_LOG_ROWS: InvestigationLogRow[] = [
  {
    id: 1,
    regName: "Alade Abiodun",
    patientId: "MSH/1088",
    phoneNumber: "0908025311",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "PRIVATE",
    age: 25,
    invName: "MP",
    invAmount: "N 2,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 2,
    regName: "Bola Oriyomi",
    patientId: "MSH/1089",
    phoneNumber: "0908025312",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    pxType: "STAFF",
    age: 22,
    invName: "PCV",
    invAmount: "N 3,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 3,
    regName: "Kemi Bankole",
    patientId: "MSH/1090",
    phoneNumber: "0908025313",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "HMO",
    age: 20,
    invName: "URINE MCS",
    invAmount: "N 2,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 4,
    regName: "Yemisi Ayuba",
    patientId: "MSH/1091",
    phoneNumber: "0908025314",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    pxType: "COMPANY",
    age: 28,
    invName: "URINALYSIS",
    invAmount: "N 5,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 5,
    regName: "Chinwe Eze",
    patientId: "MSH/1092",
    phoneNumber: "0908025315",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    pxType: "PRIVATE",
    age: 29,
    invName: "MP",
    invAmount: "N 2,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 6,
    regName: "Adeola Abimbola",
    patientId: "MSH/1093",
    phoneNumber: "0908025316",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "HMO",
    age: 33,
    invName: "PCV",
    invAmount: "N 3,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 7,
    regName: "Abiola Adebayo A.",
    patientId: "P-2025001",
    phoneNumber: "0908025317",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "COMPANY",
    age: 31,
    invName: "URINE MCS",
    invAmount: "N 3,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 8,
    regName: "Funke Balogun",
    patientId: "MSH/1094",
    phoneNumber: "0908025318",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "STAFF",
    age: 27,
    invName: "URINALYSIS",
    invAmount: "N 4,000.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
  {
    id: 9,
    regName: "Segun Olatunde",
    patientId: "MSH/1095",
    phoneNumber: "0908025319",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    pxType: "PRIVATE",
    age: 36,
    invName: "MP",
    invAmount: "N 3,500.00",
    staffName: "Sample Tester",
    clinician: "Titilayo O.",
    hasResult: true,
  },
];

export const INVESTIGATION_LOGS_DEFAULT_RANGE = {
  startDate: new Date(2025, 2, 25),
  endDate: new Date(2025, 2, 28),
};
