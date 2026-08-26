export type PatientCategory = "OUT-PATIENT" | "IN-PATIENT";
export type IncomingType = "MEDICATION" | "REQUEST";
export type TreatmentType = "PRIVATE" | "STAFF" | "HMO" | "COMPANY";

export type PharmacyPatientsLogRow = {
  id: number;
  incoming: IncomingType;
  regName: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  gender: string;
  age: number;
  staffName: string;
  patientCategory: PatientCategory;
  treatmentType: TreatmentType;
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
  address: string;
  relationship: string;
  treatmentGuide: string;
  lastVisitDate: string;
  nextAppointment: string;
};

export const NOTIFICATION_COUNT = 9;

export const PATIENTS_LOG_ROWS: PharmacyPatientsLogRow[] = [
  {
    id: 1,
    incoming: "MEDICATION",
    regName: "Alade Abiodun",
    patientId: "P-2025001",
    phoneNumber: "0802026128",
    date: "24/02/2025",
    time: "10:05 AM",
    gender: "Male",
    age: 35,
    staffName: "Titilayo C.",
    patientCategory: "OUT-PATIENT",
    treatmentType: "PRIVATE",
    bloodPressure: "120/80",
    heartRate: "72",
    weight: "78",
    height: "1.75 m",
    address: "Lagos, Nigeria",
    relationship: "Married",
    treatmentGuide: "Fee for Ser.",
    lastVisitDate: "21/02/2022",
    nextAppointment: "01/03/2025",
  },
  {
    id: 2,
    incoming: "REQUEST",
    regName: "Bola Oriyomi",
    patientId: "P-2025002",
    phoneNumber: "0802026129",
    date: "24/02/2025",
    time: "10:12 AM",
    gender: "Female",
    age: 28,
    staffName: "Titilayo C.",
    patientCategory: "OUT-PATIENT",
    treatmentType: "HMO",
    bloodPressure: "118/76",
    heartRate: "70",
    weight: "65",
    height: "1.62 m",
    address: "Ikeja, Lagos",
    relationship: "Single",
    treatmentGuide: "Fee for Ser.",
    lastVisitDate: "10/01/2025",
    nextAppointment: "03/03/2025",
  },
  {
    id: 3,
    incoming: "MEDICATION",
    regName: "Chinedu Okafor",
    patientId: "P-2025003",
    phoneNumber: "0802026130",
    date: "24/02/2025",
    time: "10:20 AM",
    gender: "Male",
    age: 42,
    staffName: "Titilayo C.",
    patientCategory: "IN-PATIENT",
    treatmentType: "COMPANY",
    bloodPressure: "130/85",
    heartRate: "78",
    weight: "82",
    height: "1.78 m",
    address: "Surulere, Lagos",
    relationship: "Married",
    treatmentGuide: "Fee for Ser.",
    lastVisitDate: "15/02/2025",
    nextAppointment: "05/03/2025",
  },
  {
    id: 4,
    incoming: "REQUEST",
    regName: "Damilola Adeyemi",
    patientId: "P-2025004",
    phoneNumber: "0802026131",
    date: "24/02/2025",
    time: "10:35 AM",
    gender: "Female",
    age: 31,
    staffName: "Titilayo C.",
    patientCategory: "OUT-PATIENT",
    treatmentType: "STAFF",
    bloodPressure: "115/75",
    heartRate: "68",
    weight: "60",
    height: "1.60 m",
    address: "Yaba, Lagos",
    relationship: "Married",
    treatmentGuide: "Fee for Ser.",
    lastVisitDate: "02/02/2025",
    nextAppointment: "08/03/2025",
  },
  {
    id: 5,
    incoming: "MEDICATION",
    regName: "Emeka Nwosu",
    patientId: "P-2025005",
    phoneNumber: "0802026132",
    date: "24/02/2025",
    time: "11:00 AM",
    gender: "Male",
    age: 50,
    staffName: "Titilayo C.",
    patientCategory: "IN-PATIENT",
    treatmentType: "PRIVATE",
    bloodPressure: "135/88",
    heartRate: "80",
    weight: "90",
    height: "1.80 m",
    address: "Lekki, Lagos",
    relationship: "Married",
    treatmentGuide: "Fee for Ser.",
    lastVisitDate: "20/02/2025",
    nextAppointment: "10/03/2025",
  },
  {
    id: 6,
    incoming: "REQUEST",
    regName: "Funke Balogun",
    patientId: "P-2025006",
    phoneNumber: "0802026133",
    date: "24/02/2025",
    time: "11:15 AM",
    gender: "Female",
    age: 26,
    staffName: "Titilayo C.",
    patientCategory: "OUT-PATIENT",
    treatmentType: "HMO",
    bloodPressure: "110/70",
    heartRate: "74",
    weight: "58",
    height: "1.58 m",
    address: "Ajah, Lagos",
    relationship: "Single",
    treatmentGuide: "Fee for Ser.",
    lastVisitDate: "18/02/2025",
    nextAppointment: "12/03/2025",
  },
  {
    id: 7,
    incoming: "MEDICATION",
    regName: "Abiola Adebayo",
    patientId: "P-2025001",
    phoneNumber: "08012345678",
    date: "24/02/2025",
    time: "11:40 AM",
    gender: "Male",
    age: 31,
    staffName: "Titilayo C.",
    patientCategory: "OUT-PATIENT",
    treatmentType: "COMPANY",
    bloodPressure: "120/80",
    heartRate: "72",
    weight: "78",
    height: "1.75 m",
    address: "Lagos, Nigeria",
    relationship: "Married",
    treatmentGuide: "Fee for Ser.",
    lastVisitDate: "21/02/2022",
    nextAppointment: "01/03/2025",
  },
];

export function getPatientsLogRowById(
  id: number
): PharmacyPatientsLogRow | null {
  return PATIENTS_LOG_ROWS.find((row) => row.id === id) ?? null;
}

export function incomingBadgeClass(incoming: IncomingType): string {
  if (incoming === "MEDICATION") {
    return "bg-[#FFF1E6] text-[#FA7401]";
  }
  return "bg-[#E8F8EF] text-[#1B9E4B]";
}
