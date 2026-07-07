import {
  formatPatientId,
  mockBookDates,
} from "@/lib/dateTime";

export type ImmunizationRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  lastSeen: string;
  time: string;
  followUp: string;
  followUpTime: string;
  gender: "M" | "F";
  age: number;
  patientType: "COMPANY" | "PRIVATE" | "HMO";
  weight: string;
  immunization: string;
  attendant: string;
};

const VACCINES = [
  "Meningitis Vaccine",
  "Hepatitis B Vaccine",
  "Tdap Vaccine",
  "BCG Vaccine",
  "Polio Vaccine",
  "Measles Vaccine",
];

const ATTENDANTS = ["Nurse Sam Ibe", "Nurse Mike Adeyemi", "Nurse Pelumi Ade"];

const SEED: ImmunizationRecord[] = [
  {
    id: 1,
    name: "Abiola Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    lastSeen: "26-Mar-2025",
    time: "10:25 AM",
    followUp: "12-Apr-2025",
    followUpTime: "10:25 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    weight: "70 kg",
    immunization: "Meningitis Vaccine",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: 2,
    name: "Chinonso Eze",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    lastSeen: "26-Mar-2025",
    time: "10:25 AM",
    followUp: "12-Apr-2025",
    followUpTime: "10:25 AM",
    gender: "M",
    age: 30,
    patientType: "PRIVATE",
    weight: "68 kg",
    immunization: "Hepatitis B Vaccine",
    attendant: "Nurse Mike Adeyemi",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    patientId: "P-2025003",
    phoneNumber: "08134567890",
    lastSeen: "27-Mar-2025",
    time: "11:15 AM",
    followUp: "15-Apr-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 28,
    patientType: "COMPANY",
    weight: "62 kg",
    immunization: "Tdap Vaccine",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: 4,
    name: "Emeka Nwankwo",
    patientId: "P-2025004",
    phoneNumber: "07045678901",
    lastSeen: "27-Mar-2025",
    time: "09:40 AM",
    followUp: "15-Apr-2025",
    followUpTime: "09:40 AM",
    gender: "M",
    age: 33,
    patientType: "HMO",
    weight: "75 kg",
    immunization: "BCG Vaccine",
    attendant: "Nurse Pelumi Ade",
  },
  {
    id: 5,
    name: "Ifeoma Okeke",
    patientId: "P-2025005",
    phoneNumber: "09056789012",
    lastSeen: "28-Mar-2025",
    time: "02:10 PM",
    followUp: "18-Apr-2025",
    followUpTime: "02:10 PM",
    gender: "F",
    age: 26,
    patientType: "COMPANY",
    weight: "58 kg",
    immunization: "Polio Vaccine",
    attendant: "Nurse Mike Adeyemi",
  },
];

const NAMES = [
  ["Toluwa", "Afolabi"],
  ["Grace", "Okonkwo"],
  ["Sarah", "Bello"],
  ["Amina", "Musa"],
  ["Blessing", "Adeyemi"],
];

const PATIENT_TYPES: ImmunizationRecord["patientType"][] = [
  "COMPANY",
  "PRIVATE",
  "HMO",
];

export function parseImmunizationDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockImmunizationRecords(): ImmunizationRecord[] {
  const records = SEED.map((record) => {
    const dates = mockBookDates(record.id % 10);
    return {
      ...record,
      lastSeen: dates.bookDate,
      time: dates.time,
      followUp: dates.followUp,
      followUpTime: dates.followUpTime,
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
      lastSeen: dates.bookDate,
      time: dates.time,
      followUp: dates.followUp,
      followUpTime: dates.followUpTime,
      gender: id % 2 === 0 ? "F" : "M",
      age: 22 + (id % 20),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      weight: `${50 + (id % 30)} kg`,
      immunization: VACCINES[id % VACCINES.length],
      attendant: ATTENDANTS[id % ATTENDANTS.length],
    });
  }

  return records;
}
