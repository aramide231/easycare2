import {
  formatPatientId,
  mockBookDates,
} from "@/lib/dateTime";

export type PostNatalRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  followUp: string;
  followUpTime: string;
  gender: "M" | "F";
  age: number;
  patientType: "COMPANY" | "PRIVATE" | "HMO";
  counselling: "DONE" | "NOT DONE";
  attendantDoctor: string;
  attendantNurse: string;
};

const DOCTORS = ["Dr. Bayo Hammed", "Dr. Emeka Nwankwo", "Dr. Sarah Bello"];
const NURSES = ["Nurse Sam Ibe", "Nurse Mike Adeyemi", "Nurse Pelumi Ade"];

const SEED: PostNatalRecord[] = [
  {
    id: 1,
    name: "Adeola Abimbola",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    followUp: "26-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY",
    counselling: "DONE",
    attendantDoctor: "Dr. Bayo Hammed",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 2,
    name: "Abiola Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    followUp: "26-Mar-2025",
    followUpTime: "10:25 AM",
    gender: "F",
    age: 29,
    patientType: "PRIVATE",
    counselling: "NOT DONE",
    attendantDoctor: "Dr. Emeka Nwankwo",
    attendantNurse: "Nurse Mike Adeyemi",
  },
  {
    id: 3,
    name: "Damilola Ogunleye",
    patientId: "P-2025003",
    phoneNumber: "08134567890",
    followUp: "27-Mar-2025",
    followUpTime: "09:40 AM",
    gender: "F",
    age: 28,
    patientType: "COMPANY",
    counselling: "DONE",
    attendantDoctor: "Dr. Sarah Bello",
    attendantNurse: "Nurse Pelumi Ade",
  },
  {
    id: 4,
    name: "Ifeoma Okeke",
    patientId: "P-2025005",
    phoneNumber: "09056789012",
    followUp: "27-Mar-2025",
    followUpTime: "02:10 PM",
    gender: "F",
    age: 26,
    patientType: "HMO",
    counselling: "NOT DONE",
    attendantDoctor: "Dr. Bayo Hammed",
    attendantNurse: "Nurse Sam Ibe",
  },
  {
    id: 5,
    name: "Chioma Bello",
    patientId: "P-2025004",
    phoneNumber: "07045678901",
    followUp: "28-Mar-2025",
    followUpTime: "11:15 AM",
    gender: "F",
    age: 33,
    patientType: "COMPANY",
    counselling: "DONE",
    attendantDoctor: "Dr. Emeka Nwankwo",
    attendantNurse: "Nurse Mike Adeyemi",
  },
];

const NAMES = [
  ["Grace", "Okonkwo"],
  ["Sarah", "Bello"],
  ["Amina", "Musa"],
  ["Blessing", "Adeyemi"],
  ["Toluwa", "Afolabi"],
];

const PATIENT_TYPES: PostNatalRecord["patientType"][] = [
  "COMPANY",
  "PRIVATE",
  "HMO",
];

export function parsePostNatalDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockPostNatalRecords(): PostNatalRecord[] {
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
      followUp: dates.bookDate,
      followUpTime: dates.time,
      gender: "F",
      age: 24 + (id % 15),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      counselling: id % 2 === 0 ? "DONE" : "NOT DONE",
      attendantDoctor: DOCTORS[id % DOCTORS.length],
      attendantNurse: NURSES[id % NURSES.length],
    });
  }

  return records;
}
