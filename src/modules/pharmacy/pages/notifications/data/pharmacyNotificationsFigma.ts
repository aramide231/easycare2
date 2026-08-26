import type { IncomingType } from "../../data/mockPharmacy";

export type PharmacyNotificationRow = {
  id: number;
  incoming: IncomingType;
  regName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  staffName: string;
};

export const PHARMACY_NOTIFICATION_ROWS: PharmacyNotificationRow[] = [
  {
    id: 1,
    incoming: "MEDICATION",
    regName: "Alade Abiodun",
    patientId: "MSH/1088",
    phoneNumber: "0906025311",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 2,
    incoming: "REQUEST",
    regName: "Bola Oriyomi",
    patientId: "MSH/1089",
    phoneNumber: "0906025312",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 3,
    incoming: "MEDICATION",
    regName: "Chinedu Okafor",
    patientId: "MSH/1090",
    phoneNumber: "0906025313",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 4,
    incoming: "REQUEST",
    regName: "Damilola Adeyemi",
    patientId: "MSH/1091",
    phoneNumber: "0906025314",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 5,
    incoming: "MEDICATION",
    regName: "Emeka Nwosu",
    patientId: "MSH/1092",
    phoneNumber: "0906025315",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 6,
    incoming: "REQUEST",
    regName: "Funke Balogun",
    patientId: "MSH/1093",
    phoneNumber: "0906025316",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 7,
    incoming: "MEDICATION",
    regName: "Grace Okonkwo",
    patientId: "MSH/1094",
    phoneNumber: "0906025317",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 8,
    incoming: "REQUEST",
    regName: "Hassan Ibrahim",
    patientId: "MSH/1095",
    phoneNumber: "0906025318",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Male",
    staffName: "Titilayo Olayinka",
  },
  {
    id: 9,
    incoming: "MEDICATION",
    regName: "Ifeoma Eze",
    patientId: "MSH/1096",
    phoneNumber: "0906025319",
    date: "12-Mar-2025",
    time: "11:15 AM",
    gender: "Female",
    staffName: "Titilayo Olayinka",
  },
];
