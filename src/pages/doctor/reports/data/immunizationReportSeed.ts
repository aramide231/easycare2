export type PatientType = "COMPANY" | "PRIVATE" | "HMO";

export type ImmunizationReportRow = {
  id: string;
  name: string;
  patientId: string;
  phoneNumber: string;
  lastSeen: string;
  lastSeenTime: string;
  followUp: string;
  followUpTime: string;
  gender: "M" | "F";
  age: number;
  patientType: PatientType;
  weight: string;
  immunization: string;
  attendant: string;
};

const FIRST_PAGE: ImmunizationReportRow[] = [
  {
    id: "1",
    name: "Abiola Adebayo",
    patientId: "P-2025002",
    phoneNumber: "08031234567",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "M",
    age: 31,
    patientType: "COMPANY",
    weight: "68 kg",
    immunization: "Meningitis Vaccine",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: "2",
    name: "Chinonso Eze",
    patientId: "P-2025003",
    phoneNumber: "08052345678",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "M",
    age: 31,
    patientType: "PRIVATE",
    weight: "72 kg",
    immunization: "Hepatitis B Vaccine",
    attendant: "Nurse Mike Adeyemi",
  },
  {
    id: "3",
    name: "Damilola Ogunleye",
    patientId: "P-2025004",
    phoneNumber: "08073456789",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    weight: "65 kg",
    immunization: "Tdap Vaccine",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: "4",
    name: "Emeka Nwankwo",
    patientId: "P-2025005",
    phoneNumber: "08094567890",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "M",
    age: 31,
    patientType: "HMO",
    weight: "70 kg",
    immunization: "Pneumococcal Vaccine",
    attendant: "Nurse Mike Adeyemi",
  },
  {
    id: "5",
    name: "Ifeoma Okeke",
    patientId: "P-2025006",
    phoneNumber: "08105678901",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 31,
    patientType: "PRIVATE",
    weight: "58 kg",
    immunization: "Influenza Vaccine",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: "6",
    name: "Kemi Balogun",
    patientId: "P-2025007",
    phoneNumber: "08126789012",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    weight: "63 kg",
    immunization: "MMR Vaccine",
    attendant: "Nurse Mike Adeyemi",
  },
  {
    id: "7",
    name: "Lanre Akintola",
    patientId: "P-2025008",
    phoneNumber: "08137890123",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "M",
    age: 31,
    patientType: "HMO",
    weight: "75 kg",
    immunization: "Varicella Vaccine",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: "8",
    name: "Ngozi Eze",
    patientId: "P-2025009",
    phoneNumber: "08148901234",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 31,
    patientType: "PRIVATE",
    weight: "60 kg",
    immunization: "HPV Vaccine",
    attendant: "Nurse Mike Adeyemi",
  },
  {
    id: "9",
    name: "Oluwaseun Fashola",
    patientId: "P-2025010",
    phoneNumber: "08159012345",
    lastSeen: "12-Mar-2025",
    lastSeenTime: "11:15 AM",
    followUp: "12-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "M",
    age: 31,
    patientType: "COMPANY",
    weight: "69 kg",
    immunization: "Rotavirus Vaccine",
    attendant: "Nurse Sam Ibe",
  },
];

const EXTRA_NAMES = [
  "Amina Yusuf",
  "Bola Okonkwo",
  "Chidi Obi",
  "Fatima Bello",
  "Grace Uche",
  "Hassan Musa",
  "Ijeoma Nwosu",
  "Jide Akinwale",
  "Kunle Ojo",
  "Lola Adewale",
];

const VACCINES = [
  "Meningitis Vaccine",
  "Hepatitis B Vaccine",
  "Tdap Vaccine",
  "Pneumococcal Vaccine",
  "Influenza Vaccine",
  "MMR Vaccine",
  "Varicella Vaccine",
  "HPV Vaccine",
  "Rotavirus Vaccine",
];

const ATTENDANTS = ["Nurse Sam Ibe", "Nurse Mike Adeyemi"];
const PATIENT_TYPES: PatientType[] = ["COMPANY", "PRIVATE", "HMO"];

function buildExtraRows(): ImmunizationReportRow[] {
  return Array.from({ length: 61 }, (_, index) => {
    const rowNum = index + 10;
    const name = EXTRA_NAMES[index % EXTRA_NAMES.length];
    const patientType = PATIENT_TYPES[index % PATIENT_TYPES.length];
    const gender = index % 2 === 0 ? "M" : "F";

    return {
      id: String(rowNum),
      name,
      patientId: `P-2025${String(rowNum).padStart(3, "0")}`,
      phoneNumber: `080${String(10000000 + rowNum).slice(1)}`,
      lastSeen: "12-Mar-2025",
      lastSeenTime: "11:15 AM",
      followUp: "12-Mar-2025",
      followUpTime: "11:15 AM",
      gender,
      age: 28 + (index % 8),
      patientType,
      weight: `${58 + (index % 20)} kg`,
      immunization: VACCINES[index % VACCINES.length],
      attendant: ATTENDANTS[index % ATTENDANTS.length],
    };
  });
}

export const IMMUNIZATION_REPORT_SEED: ImmunizationReportRow[] = [
  ...FIRST_PAGE,
  ...buildExtraRows(),
];
