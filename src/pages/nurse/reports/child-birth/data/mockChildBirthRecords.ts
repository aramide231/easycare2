import {
  formatPatientId,
  mockBookDates,
} from "@/lib/dateTime";

export type ChildBirthRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  gender: "M" | "F";
  age: number;
  patientType: "COMPANY" | "PRIVATE" | "HMO";
  deliveryDate: string;
  time: string;
  babyGender: "M" | "F";
  attendantDoctor: string;
  attendantNurse: string;
};

const SEED: ChildBirthRecord[] = [
  {
    id: 1,
    name: "Abiola Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    deliveryDate: "12-Mar-2025",
    time: "11:15 AM",
    babyGender: "M",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 2,
    name: "Chinonso Eze",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    gender: "F",
    age: 31,
    patientType: "PRIVATE",
    deliveryDate: "12-Mar-2025",
    time: "11:15 AM",
    babyGender: "M",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    patientId: "P-2025003",
    phoneNumber: "08134567890",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    deliveryDate: "12-Mar-2025",
    time: "11:15 AM",
    babyGender: "F",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 4,
    name: "Emeka Nwankwo",
    patientId: "P-2025004",
    phoneNumber: "07045678901",
    gender: "F",
    age: 31,
    patientType: "HMO",
    deliveryDate: "12-Mar-2025",
    time: "11:15 AM",
    babyGender: "M",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 5,
    name: "Ifeoma Okeke",
    patientId: "P-2025005",
    phoneNumber: "09056789012",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    deliveryDate: "12-Mar-2025",
    time: "11:15 AM",
    babyGender: "F",
    attendantDoctor: "Dr. Sam Ibe",
    attendantNurse: "Nurse Sam Ibe",
  },
];

const NAMES = [
  ["Toluwa", "Afolabi"],
  ["Grace", "Okonkwo"],
  ["Sarah", "Bello"],
  ["Amina", "Musa"],
  ["Blessing", "Adeyemi"],
];
const PATIENT_TYPES: ChildBirthRecord["patientType"][] = [
  "COMPANY",
  "PRIVATE",
  "HMO",
];

export function parseDeliveryDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockChildBirthRecords(): ChildBirthRecord[] {
  const records = SEED.map((record) => {
    const dates = mockBookDates(record.id % 10);
    return {
      ...record,
      deliveryDate: dates.bookDate,
      time: dates.time,
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
      gender: id % 2 === 0 ? "F" : "M",
      age: 24 + (id % 15),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      deliveryDate: dates.bookDate,
      time: dates.time,
      babyGender: id % 3 === 0 ? "F" : "M",
      attendantDoctor: "Dr. Sam Ibe",
      attendantNurse: "Nurse Sam Ibe",
    });
  }

  return records;
}
