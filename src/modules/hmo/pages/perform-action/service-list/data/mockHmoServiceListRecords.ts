import {
  expandMockRecords,
  MOCK_HMO_LIST_TOTAL,
} from "@hmo/pages/shared/lib/pagination";

export type ServiceAvailabilityStatus = "AVAILABLE" | "NOT AVAILABLE";

export type HmoServiceListRecord = {
  id: number;
  serviceName: string;
  serviceCategory: string;
  amount: number;
  status: ServiceAvailabilityStatus;
};

const SEED: Omit<HmoServiceListRecord, "id">[] = [
  {
    serviceName: "AMBULANCE",
    serviceCategory: "OTHERS",
    amount: 7500,
    status: "AVAILABLE",
  },
  {
    serviceName: "G.P CONSULATION",
    serviceCategory: "CONSULTATION",
    amount: 5000,
    status: "NOT AVAILABLE",
  },
  {
    serviceName: "SPECIAL CONSULTATION",
    serviceCategory: "CONSULTATION",
    amount: 7500,
    status: "NOT AVAILABLE",
  },
  {
    serviceName: "AUTO - CLAVE MACHINE",
    serviceCategory: "EQUIPMENT",
    amount: 30000,
    status: "AVAILABLE",
  },
  {
    serviceName: "NEBULIZATION BOX",
    serviceCategory: "EQUIPMENT",
    amount: 15000,
    status: "AVAILABLE",
  },
  {
    serviceName: "OXYGEN",
    serviceCategory: "EQUIPMENT",
    amount: 15000,
    status: "AVAILABLE",
  },
  {
    serviceName: "SITZ BATH BOWL/PLASTIC",
    serviceCategory: "EQUIPMENT",
    amount: 15000,
    status: "AVAILABLE",
  },
  {
    serviceName: "STRETCHER",
    serviceCategory: "EQUIPMENT",
    amount: 2500,
    status: "NOT AVAILABLE",
  },
  {
    serviceName: "WHEEL CHAIR",
    serviceCategory: "EQUIPMENT",
    amount: 2000,
    status: "AVAILABLE",
  },
];

export const SERVICE_CATEGORY_OPTIONS = [
  "OTHERS",
  "CONSULTATION",
  "EQUIPMENT",
  "ACCOMMODATION",
  "FEEDING",
  "IMMUNIZATION",
  "INVESTIGATION",
  "MEDICATION",
  "REGISTRATION",
] as const;

export const SERVICE_STATUS_OPTIONS: ServiceAvailabilityStatus[] = [
  "AVAILABLE",
  "NOT AVAILABLE",
];

export function buildMockHmoServiceListRecords(): HmoServiceListRecord[] {
  const seed = SEED.map((row, index) => ({ ...row, id: index + 1 }));

  return expandMockRecords(seed, MOCK_HMO_LIST_TOTAL, (base, index) => ({
    ...base,
    id: index + 1,
  }));
}

export function formatServiceAmount(amount: number): string {
  return `N ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getServiceStatusClass(status: ServiceAvailabilityStatus): string {
  switch (status) {
    case "AVAILABLE":
      return "bg-[#E6FAEE] text-[#00C851]";
    case "NOT AVAILABLE":
      return "bg-[#FFF1E6] text-[#FA7401]";
    default:
      return "bg-[#FFF1E6] text-[#FA7401]";
  }
}

export function getServiceStatusDotClass(status: ServiceAvailabilityStatus): string {
  switch (status) {
    case "AVAILABLE":
      return "bg-[#00C851]";
    case "NOT AVAILABLE":
      return "bg-[#FA7401]";
    default:
      return "bg-[#FA7401]";
  }
}
