import { formatPatientId, mockVisitAt } from "@/lib/dateTime";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoChildBirthLogRecord = {
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

const NAMES = [
  ["Abiola", "Adebayo"],
  ["Chinonso", "Eze"],
  ["Damilola", "Ogunleye"],
  ["Emeka", "Okafor"],
  ["Grace", "Okonkwo"],
];
const PATIENT_TYPES: HmoChildBirthLogRecord["patientType"][] = [
  "COMPANY",
  "PRIVATE",
  "HMO",
];
const DOCTORS = ["Dr. Sam Ibe", "Dr. Jane Doe", "Dr. Easy Test"];
const NURSES = ["Nurse Sam Ibe", "Nurse Mike Adeyemi", "Nurse Pelumi Ade"];

export function parseHmoChildBirthLogDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockHmoChildBirthLogRecords(): HmoChildBirthLogRecord[] {
  const records: HmoChildBirthLogRecord[] = [];

  for (let id = 1; id <= MOCK_HMO_LIST_TOTAL; id += 1) {
    const [firstName, lastName] = NAMES[id % NAMES.length];
    const { date, time } = mockVisitAt(id % 28);

    records.push({
      id,
      name: `${firstName} ${lastName}`,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      gender: "F",
      age: 24 + (id % 12),
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      deliveryDate: date,
      time,
      babyGender: id % 2 === 0 ? "M" : "F",
      attendantDoctor: DOCTORS[id % DOCTORS.length],
      attendantNurse: NURSES[id % NURSES.length],
    });
  }

  return records;
}
