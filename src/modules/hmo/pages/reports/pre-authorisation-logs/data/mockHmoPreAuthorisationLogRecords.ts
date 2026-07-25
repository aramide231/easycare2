import { formatPatientId, mockVisitAt } from "@/lib/dateTime";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoPreAuthorisationLogRecord = {
  id: number;
  patientName: string;
  patientId: string;
  phoneNumber: string;
  hmoName: string;
  service: string;
  status: "Approved" | "Pending" | "Declined";
  requestDate: string;
  time: string;
};

const NAMES = [
  ["Adeola", "Abimbola"],
  ["Chinonso", "Eze"],
  ["Damilola", "Ogunleye"],
  ["Emeka", "Okafor"],
  ["Grace", "Okonkwo"],
];
const HMO_NAMES = [
  "AIICO PLC",
  "LEADWAY HMO",
  "HYGEIA HMO",
  "AXA MANSARD",
  "RELIANCE HMO",
];
const SERVICES = [
  "MRI Scan",
  "CT Scan",
  "Surgery",
  "Dialysis",
  "ICU Admission",
  "Specialist Consultation",
];
const STATUSES: HmoPreAuthorisationLogRecord["status"][] = [
  "Approved",
  "Pending",
  "Declined",
];

export function parseHmoPreAuthorisationLogDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}

export function buildMockHmoPreAuthorisationLogRecords(): HmoPreAuthorisationLogRecord[] {
  const records: HmoPreAuthorisationLogRecord[] = [];

  for (let id = 1; id <= MOCK_HMO_LIST_TOTAL; id += 1) {
    const [firstName, lastName] = NAMES[id % NAMES.length];
    const { date, time } = mockVisitAt(id % 28);

    records.push({
      id,
      patientName: `${firstName} ${lastName}`,
      patientId: formatPatientId(id),
      phoneNumber: `090${String(10000000 + id).slice(-8)}`,
      hmoName: HMO_NAMES[id % HMO_NAMES.length],
      service: SERVICES[id % SERVICES.length],
      status: STATUSES[id % STATUSES.length],
      requestDate: date,
      time,
    });
  }

  return records;
}

const statusClass: Record<HmoPreAuthorisationLogRecord["status"], string> = {
  Approved: "border border-[#00C851] bg-[#E6FAEE] text-[#00C851]",
  Pending: "border border-[#FA7401] bg-[#FFF1E6] text-[#FA7401]",
  Declined: "border border-[#FF4444] bg-[#FFEBEE] text-[#FF4444]",
};

export function getPreAuthorisationStatusClass(
  status: HmoPreAuthorisationLogRecord["status"],
): string {
  return statusClass[status];
}
