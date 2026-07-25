import { formatPatientId, mockVisitAt } from "@/lib/dateTime";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoDischargedLogRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  patientType: "HMO" | "COMPANY" | "PRIVATE";
  dischargeDate: string;
  time: string;
  remark: string;
  noOfDays: string;
  dischargedBy: string;
};

const NAMES = [
  ["Adeola", "Abimbola"],
  ["Chinonso", "Eze"],
  ["Damilola", "Ogunleye"],
  ["Emeka", "Okafor"],
  ["Grace", "Okonkwo"],
];
const PATIENT_TYPES: HmoDischargedLogRecord["patientType"][] = [
  "HMO",
  "COMPANY",
  "PRIVATE",
];
const REMARKS = ["Discharged", "DAMA", "Absconded", "Referred", "Deceased"];
const CLINICIANS = ["Dr. Easy Test", "Dr. Jane Doe", "Titilayo Olayinka"];

export function parseHmoDischargedLogDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockHmoDischargedLogRecords(): HmoDischargedLogRecord[] {
  const records: HmoDischargedLogRecord[] = [];

  for (let id = 1; id <= MOCK_HMO_LIST_TOTAL; id += 1) {
    const [firstName, lastName] = NAMES[id % NAMES.length];
    const { date, time } = mockVisitAt(id % 28);

    records.push({
      id,
      name: `${firstName} ${lastName}`,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      patientType: PATIENT_TYPES[id % PATIENT_TYPES.length],
      dischargeDate: date,
      time,
      remark: REMARKS[id % REMARKS.length],
      noOfDays: `${3 + (id % 10)} days`,
      dischargedBy: CLINICIANS[id % CLINICIANS.length],
    });
  }

  return records;
}
