import {
  formatPatientId,
  mockBookDates,
} from "@/lib/dateTime";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoAnteNatalLogRecord = {
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
const NAMES = [
  ["Adeola", "Abimbola"],
  ["Chinwe", "Eze"],
  ["Femi", "Johnson"],
  ["Tolu", "Akinwunmi"],
  ["Grace", "Okonkwo"],
];
const PATIENT_TYPES: HmoAnteNatalLogRecord["patientType"][] = [
  "COMPANY",
  "PRIVATE",
  "HMO",
];

export function parseHmoAnteNatalLogDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockHmoAnteNatalLogRecords(): HmoAnteNatalLogRecord[] {
  const records: HmoAnteNatalLogRecord[] = [];

  for (let id = 1; id <= MOCK_HMO_LIST_TOTAL; id += 1) {
    const [firstName, lastName] = NAMES[id % NAMES.length];
    const dates = mockBookDates(id % 28);
    const attendant = ATTENDANTS[id % ATTENDANTS.length];

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
      age: 25 + (id % 15),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      attendantFrontDesk: attendant,
      attendant,
    });
  }

  return records;
}
