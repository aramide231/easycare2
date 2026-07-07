export type FamilyPlanningMethod =
  | "NATURAL"
  | "BARRIER"
  | "HORMONAL"
  | "LARCs"
  | "PERMANENT"
  | "ECs";

import {
  formatPatientId,
  mockBookDates,
} from "@/lib/dateTime";

export type FamilyPlanningRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  gender: "M" | "F";
  age: number;
  patientType: "COMPANY" | "PRIVATE" | "HMO";
  method: FamilyPlanningMethod;
  followUp: string;
  followUpTime: string;
  attendantDoctor: string;
  attendantNurse: string;
};

const DOCTORS = ["Dr. Sam Ibe", "Dr. Bayo Hammed", "Dr. Emeka Nwankwo"];
const NURSES = ["Nurse Sam Ibe", "Nurse Mike Adeyemi", "Nurse Pelumi Ade"];

const METHODS: FamilyPlanningMethod[] = [
  "NATURAL",
  "BARRIER",
  "HORMONAL",
  "LARCs",
  "PERMANENT",
  "ECs",
];

const SEED: FamilyPlanningRecord[] = [
  {
    id: 1,
    name: "Adeola Abimbola",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    method: "NATURAL",
    followUp: "26-Mar-2025",
    followUpTime: "11:15 AM",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 2,
    name: "Abiola Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    gender: "F",
    age: 31,
    patientType: "PRIVATE",
    method: "BARRIER",
    followUp: "26-Mar-2025",
    followUpTime: "11:15 AM",
    attendantDoctor: "Dr. Bayo Hammed",
    attendantNurse: "Nurse Mike Adeyemi",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    patientId: "P-2025003",
    phoneNumber: "08134567890",
    gender: "F",
    age: 28,
    patientType: "COMPANY",
    method: "HORMONAL",
    followUp: "27-Mar-2025",
    followUpTime: "10:25 AM",
    attendantDoctor: "Dr. Emeka Nwankwo",
    attendantNurse: "Nurse Pelumi Ade",
  },
  {
    id: 4,
    name: "Ifeoma Okeke",
    patientId: "P-2025005",
    phoneNumber: "09056789012",
    gender: "F",
    age: 26,
    patientType: "HMO",
    method: "LARCs",
    followUp: "27-Mar-2025",
    followUpTime: "09:40 AM",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 5,
    name: "Chioma Bello",
    patientId: "P-2025004",
    phoneNumber: "07045678901",
    gender: "M",
    age: 33,
    patientType: "COMPANY",
    method: "PERMANENT",
    followUp: "28-Mar-2025",
    followUpTime: "02:10 PM",
    attendantDoctor: "Dr. Bayo Hammed",
    attendantNurse: "Nurse Mike Adeyemi",
  },
  {
    id: 6,
    name: "Chinonso Eze",
    patientId: "P-2025006",
    phoneNumber: "08067890123",
    gender: "F",
    age: 29,
    patientType: "PRIVATE",
    method: "ECs",
    followUp: "26-Mar-2025",
    followUpTime: "11:15 AM",
    attendantDoctor: "Dr. Emeka Nwankwo",
    attendantNurse: "Nurse Pelumi Ade",
  },
  {
    id: 7,
    name: "Grace Okonkwo",
    patientId: "P-2025007",
    phoneNumber: "08178901234",
    gender: "F",
    age: 27,
    patientType: "COMPANY",
    method: "NATURAL",
    followUp: "27-Mar-2025",
    followUpTime: "11:15 AM",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 8,
    name: "Sarah Bello",
    patientId: "P-2025008",
    phoneNumber: "09089012345",
    gender: "F",
    age: 31,
    patientType: "HMO",
    method: "BARRIER",
    followUp: "28-Mar-2025",
    followUpTime: "11:15 AM",
    attendantDoctor: "Dr. Bayo Hammed",
    attendantNurse: "Nurse Mike Adeyemi",
  },
  {
    id: 9,
    name: "Toluwa Afolabi",
    patientId: "P-2025009",
    phoneNumber: "07090123456",
    gender: "F",
    age: 30,
    patientType: "COMPANY",
    method: "HORMONAL",
    followUp: "26-Mar-2025",
    followUpTime: "11:15 AM",
    attendantDoctor: "Dr. Emeka Nwankwo",
    attendantNurse: "Nurse Pelumi Ade",
  },
];

const NAMES = [
  ["Amina", "Musa"],
  ["Blessing", "Adeyemi"],
  ["Fatima", "Yusuf"],
  ["Ngozi", "Ibrahim"],
  ["Yemi", "Okafor"],
];

const PATIENT_TYPES: FamilyPlanningRecord["patientType"][] = [
  "COMPANY",
  "PRIVATE",
  "HMO",
];

export function parseFamilyPlanningDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockFamilyPlanningRecords(): FamilyPlanningRecord[] {
  const records = SEED.map((record) => {
    const dates = mockBookDates(record.id % 10);
    return {
      ...record,
      followUp: dates.bookDate,
      followUpTime: dates.time,
      patientId: formatPatientId(record.id),
    };
  });

  for (let id = SEED.length + 1; id <= 45; id++) {
    const [firstName, lastName] = NAMES[id % NAMES.length];
    const dates = mockBookDates(id % 10);
    records.push({
      id,
      name: `${firstName} ${lastName}`,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      gender: id % 5 === 0 ? "M" : "F",
      age: 24 + (id % 15),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      method: METHODS[id % METHODS.length],
      followUp: dates.bookDate,
      followUpTime: dates.time,
      attendantDoctor: DOCTORS[id % DOCTORS.length],
      attendantNurse: NURSES[id % NURSES.length],
    });
  }

  return records;
}
