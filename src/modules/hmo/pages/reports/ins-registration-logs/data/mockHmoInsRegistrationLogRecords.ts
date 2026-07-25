import { mockVisitAt } from "@/lib/dateTime";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoInsRegistrationLogRecord = {
  id: number;
  hmoName: string;
  code: string;
  hmoType: string;
  preAuthCode: "YES" | "NO";
  contactPerson: string;
  phoneNumber: string;
  registeredDate: string;
  time: string;
};

const HMO_NAMES = [
  "AIICO PLC",
  "BASTON LTD",
  "CAPITOL PLC",
  "ENEME LTD",
  "METRO HEALTH",
  "NOVO LTD",
  "LEADWAY HMO",
  "AXA MANSARD",
];
const HMO_TYPES = ["PRIVATE", "STAFF", "HMO", "COMPANY"];
const CONTACTS = ["Yemi Olutade", "Bola Demilade", "Sarah Obasi", "Bayo Hammed"];

export function parseHmoInsRegistrationLogDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockHmoInsRegistrationLogRecords(): HmoInsRegistrationLogRecord[] {
  const records: HmoInsRegistrationLogRecord[] = [];

  for (let id = 1; id <= MOCK_HMO_LIST_TOTAL; id += 1) {
    const { date, time } = mockVisitAt(id % 28);
    const name = HMO_NAMES[id % HMO_NAMES.length];

    records.push({
      id,
      hmoName: `${name} ${id > HMO_NAMES.length ? id : ""}`.trim(),
      code: `${name.slice(0, 4).toUpperCase()}${id}`,
      hmoType: HMO_TYPES[id % HMO_TYPES.length],
      preAuthCode: id % 2 === 0 ? "YES" : "NO",
      contactPerson: CONTACTS[id % CONTACTS.length],
      phoneNumber: `070${String(20000000 + id).slice(-8)}`,
      registeredDate: date,
      time,
    });
  }

  return records;
}
