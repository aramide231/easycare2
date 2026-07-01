import {
  formatPatientId,
  mockBookDates,
} from "@/lib/dateTime";

export type AnteNatalRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  bookDate: string;
  time: string;
  followUp: string;
  followUpTime: string;
  gender: "M" | "F";
  age: number;
  patientType: "COMPANY" | "PRIVATE" | "HMO";
  attendantFrontDesk: string;
  attendant: string;
};

const ATTENDANTS = ["Nurse Sam Ibe", "Nurse Mike Adeyemi", "Nurse Pelumi Ade"];

const SEED: AnteNatalRecord[] = [
  {
    id: 1,
    name: "Adeola Abimbola",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    bookDate: "26-Mar-2025",
    time: "11:15 AM",
    followUp: "12-Apr-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    attendantFrontDesk: "Nurse Sam Ibe",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: 2,
    name: "Abiola Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    bookDate: "26-Mar-2025",
    time: "11:15 AM",
    followUp: "12-Apr-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 31,
    patientType: "PRIVATE",
    attendantFrontDesk: "Nurse Mike Adeyemi",
    attendant: "Nurse Mike Adeyemi",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    patientId: "P-2025003",
    phoneNumber: "08134567890",
    bookDate: "27-Mar-2025",
    time: "10:25 AM",
    followUp: "15-Apr-2025",
    followUpTime: "10:25 AM",
    gender: "F",
    age: 28,
    patientType: "COMPANY",
    attendantFrontDesk: "Nurse Sam Ibe",
    attendant: "Nurse Sam Ibe",
  },
  {
    id: 4,
    name: "Ifeoma Okeke",
    patientId: "P-2025005",
    phoneNumber: "09056789012",
    bookDate: "27-Mar-2025",
    time: "09:40 AM",
    followUp: "15-Apr-2025",
    followUpTime: "09:40 AM",
    gender: "F",
    age: 26,
    patientType: "HMO",
    attendantFrontDesk: "Nurse Pelumi Ade",
    attendant: "Nurse Pelumi Ade",
  },
  {
    id: 5,
    name: "Chioma Bello",
    patientId: "P-2025004",
    phoneNumber: "07045678901",
    bookDate: "28-Mar-2025",
    time: "02:10 PM",
    followUp: "18-Apr-2025",
    followUpTime: "02:10 PM",
    gender: "F",
    age: 33,
    patientType: "COMPANY",
    attendantFrontDesk: "Nurse Mike Adeyemi",
    attendant: "Nurse Mike Adeyemi",
  },
];

const NAMES = [
  ["Grace", "Okonkwo"],
  ["Sarah", "Bello"],
  ["Amina", "Musa"],
  ["Blessing", "Adeyemi"],
  ["Toluwa", "Afolabi"],
];

const PATIENT_TYPES: AnteNatalRecord["patientType"][] = [
  "COMPANY",
  "PRIVATE",
  "HMO",
];

export function parseAnteNatalDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockAnteNatalRecords(): AnteNatalRecord[] {
  const records = SEED.map((record) => {
    const dates = mockBookDates(record.id % 10);
    return {
      ...record,
      ...dates,
      patientId: formatPatientId(record.id),
    };
  });

  for (let id = SEED.length + 1; id <= 45; id++) {
    const [firstName, lastName] = NAMES[id % NAMES.length];
    const attendant = ATTENDANTS[id % ATTENDANTS.length];
    const dates = mockBookDates(id % 10);
    records.push({
      id,
      name: `${firstName} ${lastName}`,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      bookDate: dates.bookDate,
      time: dates.time,
      followUp: dates.followUp,
      followUpTime: dates.followUpTime,
      gender: "F",
      age: 24 + (id % 15),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      attendantFrontDesk: attendant,
      attendant,
    });
  }

  return records;
}
