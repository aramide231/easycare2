import {
  dateAtDaysAgo,
  formatSlashDate,
} from "@/lib/dateTime";

export type RequisitionPatientType = "Out Patient" | "In Patient" | "Department";

export type RequisitionItem = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

export type RequisitionRecord = {
  id: string;
  date: Date;
  dateLabel: string;
  timeLabel: string;
  name: string;
  mobileNo: string;
  gender: "Male" | "Female";
  patientType: RequisitionPatientType;
  amount: number;
  staffName: string;
  staffMobile: string;
  items: RequisitionItem[];
  remark?: string;
};

const NAMES = [
  "ALADE ABIODUN",
  "OLUFEMI ADEYEMI",
  "ADEWALE ADEYEMI",
  "CHINWE OKORO",
  "IBRAHIM BALOGUN",
  "FUNKE ADEBAYO",
  "TUNDE OJO",
  "BLESSING EZE",
];

const PATIENT_TYPES: RequisitionPatientType[] = [
  "Out Patient",
  "In Patient",
  "Department",
];

const STAFF = [
  { name: "Sample Tester", mobile: "0802026128" },
  { name: "Nurse Adebayo", mobile: "08033445566" },
  { name: "Nurse Okoro", mobile: "08077889900" },
];

const ITEM_POOL: Omit<RequisitionItem, "quantity">[] = [
  { name: "Surgical Gloves", unit: "Box", unitPrice: 5000 },
  { name: "IV Cannula", unit: "Pcs", unitPrice: 1500 },
  { name: "Syringe 5ml", unit: "Pack", unitPrice: 3000 },
  { name: "Cotton Wool", unit: "Roll", unitPrice: 2500 },
  { name: "Normal Saline", unit: "Bag", unitPrice: 1200 },
  { name: "Gauze Roll", unit: "Roll", unitPrice: 1800 },
];

function formatTimeLabel(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hour12 = hours % 12 || 12;
  const meridiem = hours >= 12 ? "pm" : "am";
  return `${hour12}.${minutes}${meridiem}`;
}

function buildItems(seed: number): RequisitionItem[] {
  const count = 1 + (seed % 3);
  return Array.from({ length: count }, (_, index) => {
    const base = ITEM_POOL[(seed + index) % ITEM_POOL.length];
    const quantity = 1 + ((seed + index) % 4);
    return {
      ...base,
      quantity,
    };
  });
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US");
}

export function parseRequisitionDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function buildMockRequisitionRecords(): RequisitionRecord[] {
  const records: RequisitionRecord[] = [];

  for (let i = 0; i < 40; i++) {
    const date = dateAtDaysAgo(i % 20, 9 + (i % 5), (i * 7) % 60);
    const name = NAMES[i % NAMES.length];
    const patientType = PATIENT_TYPES[i % PATIENT_TYPES.length];
    const staff = STAFF[i % STAFF.length];
    const items = buildItems(i);
    const amount = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    records.push({
      id: `REQ-${2025001 + i}`,
      date,
      dateLabel: formatSlashDate(date),
      timeLabel: formatTimeLabel(date),
      name,
      mobileNo: `080${String(6000000 + (i % 900000)).padStart(7, "0")}`,
      gender: i % 3 === 0 ? "Female" : "Male",
      patientType,
      amount: amount || (i % 2 === 0 ? 50000 : 3000),
      staffName: staff.name,
      staffMobile: staff.mobile,
      items,
      remark:
        i % 4 === 0
          ? "Urgent ward restock"
          : i % 5 === 0
            ? "Routine supply request"
            : undefined,
    });
  }

  return records;
}
