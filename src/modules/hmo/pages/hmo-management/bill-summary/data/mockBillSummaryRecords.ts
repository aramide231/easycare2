import type { DateRangeValue } from "@/components/ui/DateRangeFilter";
import { startOfDay } from "@/lib/dateTime";
import {
  expandMockRecords,
  MOCK_HMO_LIST_TOTAL,
} from "@hmo/pages/shared/lib/pagination";

export type BillSummaryRecord = {
  id: number;
  hmoName: string;
  providerCode: string;
  treatmentGuide: string;
  frequency: number;
  accumulatedTotal: number;
  amountPaid: number;
  outstanding: number;
  /** Used for date filtering in mock mode */
  billDate: string;
};

type SeedRow = Omit<BillSummaryRecord, "id" | "billDate">;

/** Figma Bill Summary frame (3710:11130) — 18 HMO rows */
const SEED: SeedRow[] = [
  {
    hmoName: "ALLY HEALTHCARE LIMITED",
    providerCode: "ALLY",
    treatmentGuide: "PRIVATE",
    frequency: 10,
    accumulatedTotal: 100000,
    amountPaid: 80000,
    outstanding: 20000,
  },
  {
    hmoName: "AIICO MULTISHIELD NIGERIA LIMITED",
    providerCode: "AIICO",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "ALLEANZA HEALTH MANAGEMENT LIMITED",
    providerCode: "ALLZA",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "AMAN HEALTH MAINTENANCE ORGANIZATIONS",
    providerCode: "AMAN",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "ANCHOR HMO INTERNATIONAL COMPANY LIMITED",
    providerCode: "ANCHOR",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "AVON HEALTHCARE LIMITED",
    providerCode: "AVON",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "DEFENCE HEALTH MAINTENANCE LIMITED",
    providerCode: "ASHMED",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "AXA MANSARD HEALTH LIMITED",
    providerCode: "AXA",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "BASTION HEALTH LIMITED",
    providerCode: "BAST",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "BONITAS HEALTH MAINTENANCE LIMITED",
    providerCode: "BONI",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "CENTURY MEDICAID SERVICES LIMITED",
    providerCode: "CL",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "CLEARLINE INTERNATIONAL LIMITED",
    providerCode: "DEF",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "DELOG MEDICAL SERVICES LIMITED",
    providerCode: "DELOG",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "DOHEEC INTERNATIONAL HEALTHCARE LIMITED HMO",
    providerCode: "DOHEEC",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "DOT HMO LIMITED",
    providerCode: "DOT",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "FOUNTAIN HEALTHCARE LIMITED",
    providerCode: "FTNHLTH",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "GNI HEALTHCARE LTD",
    providerCode: "GNI",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
  {
    hmoName: "A&M HEALTHCARE TRUST LIMITED",
    providerCode: "AMHT",
    treatmentGuide: "FEE FOR SERVICE",
    frequency: 2,
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 50000,
  },
];

const BILL_DATES = [
  "25-Mar-2025",
  "26-Mar-2025",
  "27-Mar-2025",
  "28-Mar-2025",
] as const;

export function getBillSummaryDefaultRange(): DateRangeValue {
  return {
    startDate: startOfDay(new Date(2025, 2, 25)),
    endDate: startOfDay(new Date(2025, 2, 28)),
  };
}

export function buildBillSummaryFilterOptions(
  records: BillSummaryRecord[],
): string[] {
  return records.map((record) => record.hmoName);
}

export function formatBillAmount(amount: number): string {
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function buildMockBillSummaryRecords(): BillSummaryRecord[] {
  const seed = SEED.map((row, index) => ({
    ...row,
    id: index + 1,
    billDate: BILL_DATES[index % BILL_DATES.length],
  }));

  return expandMockRecords(seed, MOCK_HMO_LIST_TOTAL, (base, index) => ({
    ...base,
    id: index + 1,
    billDate: BILL_DATES[index % BILL_DATES.length],
  }));
}
