import {
  expandMockRecords,
  MOCK_HMO_LIST_TOTAL,
} from "@hmo/pages/shared/lib/pagination";

export type HmoReminderStatus = "PENDING" | "TRIGGERED";

export type HmoReminderRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  reminderDate: string;
  reminderTime: string;
  patientType: string;
  status: HmoReminderStatus;
  snoozeFrequency: string;
  reminderNote: string;
};

const SEED: Omit<HmoReminderRecord, "id">[] = [
  {
    name: "Chijioke Okafor",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    reminderDate: "03-Feb-2020",
    reminderTime: "1:45 PM",
    patientType: "HMO",
    status: "PENDING",
    snoozeFrequency: "15 minutes",
    reminderNote: "Follow up on lab results",
  },
  {
    name: "Emeka Nwosu",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    reminderDate: "04-Feb-2020",
    reminderTime: "3:30 AM",
    patientType: "COMPANY",
    status: "TRIGGERED",
    snoozeFrequency: "30 minutes",
    reminderNote: "Medication review",
  },
  {
    name: "Ifeoma Eze",
    patientId: "P-2025003",
    phoneNumber: "07034567890",
    reminderDate: "05-Feb-2020",
    reminderTime: "11:50 PM",
    patientType: "STAFF",
    status: "PENDING",
    snoozeFrequency: "10 minutes",
    reminderNote: "Appointment confirmation",
  },
  {
    name: "Kehinde Ogunleye",
    patientId: "P-2025004",
    phoneNumber: "09045678901",
    reminderDate: "06-Feb-2020",
    reminderTime: "6:05 AM",
    patientType: "HMO",
    status: "TRIGGERED",
    snoozeFrequency: "1 hour",
    reminderNote: "Discharge planning",
  },
  {
    name: "Ngozi Ibe",
    patientId: "P-2025005",
    phoneNumber: "08056789012",
    reminderDate: "07-Feb-2020",
    reminderTime: "2:20 PM",
    patientType: "PRIVATE",
    status: "PENDING",
    snoozeFrequency: "5 minutes",
    reminderNote: "Insurance verification",
  },
  {
    name: "Oluwaseun Afolabi",
    patientId: "P-2025006",
    phoneNumber: "07067890123",
    reminderDate: "08-Feb-2020",
    reminderTime: "9:00 AM",
    patientType: "COMPANY",
    status: "TRIGGERED",
    snoozeFrequency: "15 minutes",
    reminderNote: "Pre-auth follow up",
  },
  {
    name: "Tunde Adeyemi",
    patientId: "P-2025007",
    phoneNumber: "09078901234",
    reminderDate: "09-Feb-2020",
    reminderTime: "4:15 PM",
    patientType: "STAFF",
    status: "PENDING",
    snoozeFrequency: "30 minutes",
    reminderNote: "Ward transfer",
  },
  {
    name: "Uche Ndukwe",
    patientId: "P-2025008",
    phoneNumber: "08089012345",
    reminderDate: "10-Feb-2020",
    reminderTime: "12:30 AM",
    patientType: "HMO",
    status: "TRIGGERED",
    snoozeFrequency: "1 hour",
    reminderNote: "Billing review",
  },
  {
    name: "Yakubu Gowon",
    patientId: "P-2025009",
    phoneNumber: "07090123456",
    reminderDate: "10-Feb-2020",
    reminderTime: "12:30 AM",
    patientType: "HMO",
    status: "PENDING",
    snoozeFrequency: "10 minutes",
    reminderNote: "Consultation reminder",
  },
];

export const SNOOZE_OPTIONS = [
  { value: "5", label: "5 minutes" },
  { value: "10", label: "10 minutes" },
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
] as const;

export function buildMockHmoReminderRecords(): HmoReminderRecord[] {
  const seed = SEED.map((row, index) => ({ ...row, id: index + 1 }));

  return expandMockRecords(seed, MOCK_HMO_LIST_TOTAL, (base, index) => ({
    ...base,
    id: index + 1,
    patientId: `P-2025${String(index + 1).padStart(3, "0")}`,
    phoneNumber: `090${String(10000000 + index).slice(-8)}`,
  }));
}

export function getReminderStatusClass(status: HmoReminderStatus): string {
  switch (status) {
    case "PENDING":
      return "border-[#FA7401] bg-[#FFF1E6] text-[#FA7401]";
    case "TRIGGERED":
      return "border-[#33D374] bg-[#E6FAEE] text-[#33D374]";
    default:
      return "border-[#FA7401] bg-[#FFF1E6] text-[#FA7401]";
  }
}
