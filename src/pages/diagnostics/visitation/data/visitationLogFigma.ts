import type { PatientCategory, TreatmentType } from "../../data/mockDiagnostics";

export type VisitationLogRow = {
  id: number;
  regName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  patientCategory: PatientCategory;
  age: number;
  invName: string;
  invAmount: string;
  treatmentType: TreatmentType;
  clinician: string;
};

/** Visitation Logs — Laboratory Report Logs (9 rows, Figma). */
export const VISITATION_LOG_ROWS: VisitationLogRow[] = [
  {
    id: 1,
    regName: "Alade Abiodun",
    patientId: "MSH/1088",
    phoneNumber: "0908025311",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "OUT-PATIENT",
    age: 28,
    invName: "MP",
    invAmount: "N 2,000.00",
    treatmentType: "PRIVATE",
    clinician: "Titilayo C.",
  },
  {
    id: 2,
    regName: "Bola Oriyomi",
    patientId: "MSH/1089",
    phoneNumber: "0908025312",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "OUT-PATIENT",
    age: 34,
    invName: "PCV",
    invAmount: "N 3,000.00",
    treatmentType: "STAFF",
    clinician: "Titilayo C.",
  },
  {
    id: 3,
    regName: "Kemi Bankole",
    patientId: "MSH/1090",
    phoneNumber: "0908025313",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "IN-PATIENT",
    age: 26,
    invName: "FBC",
    invAmount: "N 2,000.00",
    treatmentType: "HMO",
    clinician: "Titilayo C.",
  },
  {
    id: 4,
    regName: "Yemisi Ayuba",
    patientId: "MSH/1091",
    phoneNumber: "0908025314",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "OUT-PATIENT",
    age: 41,
    invName: "GENOTYPE",
    invAmount: "N 5,000.00",
    treatmentType: "COMPANY",
    clinician: "Titilayo C.",
  },
  {
    id: 5,
    regName: "Chinwe Eze",
    patientId: "MSH/1092",
    phoneNumber: "0908025315",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "OUT-PATIENT",
    age: 29,
    invName: "LIPID PROFILE",
    invAmount: "N 6,000.00",
    treatmentType: "PRIVATE",
    clinician: "Titilayo C.",
  },
  {
    id: 6,
    regName: "Adeola Abimbola",
    patientId: "MSH/1093",
    phoneNumber: "0908025316",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "IN-PATIENT",
    age: 33,
    invName: "URINE MCS",
    invAmount: "N 2,000.00",
    treatmentType: "COMPANY",
    clinician: "Titilayo C.",
  },
  {
    id: 7,
    regName: "Abiola Adebayo A.",
    patientId: "P-2025001",
    phoneNumber: "0908025317",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "OUT-PATIENT",
    age: 31,
    invName: "MP",
    invAmount: "N 3,000.00",
    treatmentType: "HMO",
    clinician: "Titilayo C.",
  },
  {
    id: 8,
    regName: "Funke Balogun",
    patientId: "MSH/1094",
    phoneNumber: "0908025318",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    patientCategory: "OUT-PATIENT",
    age: 27,
    invName: "FBC",
    invAmount: "N 4,000.00",
    treatmentType: "PRIVATE",
    clinician: "Titilayo C.",
  },
  {
    id: 9,
    regName: "Segun Olatunde",
    patientId: "MSH/1095",
    phoneNumber: "0908025319",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    patientCategory: "IN-PATIENT",
    age: 36,
    invName: "PCV",
    invAmount: "N 3,500.00",
    treatmentType: "STAFF",
    clinician: "Titilayo C.",
  },
];

/** Default range label shown in Figma: 25/03/2025 - 28/03/2025 */
export const VISITATION_DEFAULT_RANGE = {
  startDate: new Date(2025, 2, 25),
  endDate: new Date(2025, 2, 28),
};
