import type { TreatmentType } from "../../dashboard/data/mockPatients";

export type PxType = "OUT-PATIENT" | "IN-PATIENT";

export type NotificationRow = {
  id: number;
  incoming: string;
  regName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  pxType: PxType;
  treatmentType: TreatmentType;
  invAmount: string;
  staffName: string;
};

/** Notification screen — 9 rows from Figma (3710:16619). */
export const NOTIFICATION_ROWS: NotificationRow[] = [
  {
    id: 1,
    incoming: "MP",
    regName: "Alade Abiodun",
    patientId: "MSH/1088",
    phoneNumber: "0906025311",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "OUT-PATIENT",
    treatmentType: "PRIVATE",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 2,
    incoming: "PCV",
    regName: "Bola Oriyomi",
    patientId: "SUNU/1088",
    phoneNumber: "0707825322",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    pxType: "OUT-PATIENT",
    treatmentType: "STAFF",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 3,
    incoming: "FBC",
    regName: "Kemi Bankole",
    patientId: "MSH/1088",
    phoneNumber: "08160655311",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "IN-PATIENT",
    treatmentType: "HMO",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 4,
    incoming: "GENOTYPE",
    regName: "Yemisi Ayuba",
    patientId: "MSH/1088",
    phoneNumber: "07060655345",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    pxType: "OUT-PATIENT",
    treatmentType: "COMPANY",
    invAmount: "N 5,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 5,
    incoming: "LIPID PROFILE",
    regName: "Chinwe Eze",
    patientId: "MSH/1088",
    phoneNumber: "07034567890",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    pxType: "IN-PATIENT",
    treatmentType: "PRIVATE",
    invAmount: "N 6,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 6,
    incoming: "PCV",
    regName: "Adeola Abimbola",
    patientId: "MSH/1088",
    phoneNumber: "08023456789",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "OUT-PATIENT",
    treatmentType: "COMPANY",
    invAmount: "N 2,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 7,
    incoming: "URINE MCS",
    regName: "Abiola Adebayo A.",
    patientId: "MSH/1088",
    phoneNumber: "09045678901",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "IN-PATIENT",
    treatmentType: "HMO",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 8,
    incoming: "URINE MCS",
    regName: "Akande Yakubu",
    patientId: "MSH/1088",
    phoneNumber: "09045678901",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "IN-PATIENT",
    treatmentType: "PRIVATE",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 9,
    incoming: "URINE MCS",
    regName: "Emeka Okwuosa",
    patientId: "MSH/1088",
    phoneNumber: "09045678901",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    pxType: "IN-PATIENT",
    treatmentType: "HMO",
    invAmount: "N 3,000.00",
    staffName: "Titilayo Olayinka",
  },
];
