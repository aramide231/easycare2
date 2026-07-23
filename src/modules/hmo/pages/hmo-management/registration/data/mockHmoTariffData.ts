import {
  expandMockRecords,
  MOCK_HMO_LIST_TOTAL,
} from "@hmo/pages/shared/lib/pagination";

export type HmoTariffItem = {
  id: string;
  service: string;
  type?: string;
  amount: number;
};

export type HmoTariffCategory = {
  id: string;
  title: string;
  showTypeColumn: boolean;
  items: HmoTariffItem[];
};

export const MOCK_HMO_TARIFF_CATEGORIES: HmoTariffCategory[] = [
  {
    id: "accommodation",
    title: "ACCOMODATION",
    showTypeColumn: true,
    items: [
      { id: "acc-1", service: "CHILDREN WARD", type: "BED 1", amount: 7500 },
      { id: "acc-2", service: "CHILDREN WARD", type: "BED 2", amount: 7500 },
      { id: "acc-3", service: "CHILDREN WARD 2", type: "BED 3", amount: 7500 },
      { id: "acc-4", service: "EXECUTIVE ROOM 1", type: "BED 1", amount: 20000 },
      { id: "acc-5", service: "GENERAL MALE WARD 1", type: "BED 1", amount: 15000 },
    ],
  },
  {
    id: "consultation",
    title: "CONSULTATION",
    showTypeColumn: true,
    items: [
      { id: "con-1", service: "G.P CONSULTATION", type: "1ST VISIT", amount: 5000 },
      { id: "con-2", service: "CARDIOLOGIST", type: "REVIEW", amount: 7500 },
      { id: "con-3", service: "DERMATOLOGIST", type: "REVIEW", amount: 7500 },
      {
        id: "con-4",
        service: "DENTAL CONSULATION",
        type: "1ST VISIT",
        amount: 30000,
      },
      { id: "con-5", service: "ORTHOPEDIC", type: "1ST VISIT", amount: 30000 },
    ],
  },
  {
    id: "feeding",
    title: "FEEDING",
    showTypeColumn: true,
    items: [
      { id: "feed-1", service: "CARDIOLOGIST", type: "REVIEW", amount: 7500 },
    ],
  },
  {
    id: "immunization",
    title: "IMMUNIZATION",
    showTypeColumn: false,
    items: [
      { id: "imm-1", service: "OPV", amount: 5000 },
      { id: "imm-2", service: "PNEMOCCOUCAL", amount: 7500 },
      { id: "imm-3", service: "HBV", amount: 7500 },
      { id: "imm-4", service: "VITAMIN A", amount: 4000 },
      { id: "imm-5", service: "VITAMIN B", amount: 3000 },
    ],
  },
  {
    id: "investigation",
    title: "INVESTIGATION",
    showTypeColumn: true,
    items: [
      { id: "inv-1", service: "CARDIOLOGIST", type: "REVIEW", amount: 7500 },
    ],
  },
  {
    id: "medication",
    title: "MEDICATION",
    showTypeColumn: true,
    items: [
      { id: "med-1", service: "CARDIOLOGIST", type: "REVIEW", amount: 7500 },
    ],
  },
  {
    id: "registration",
    title: "REGISTRATION",
    showTypeColumn: true,
    items: [
      { id: "reg-1", service: "CARDIOLOGIST", type: "REVIEW", amount: 7500 },
    ],
  },
  {
    id: "other-services",
    title: "OTHER SERVICES",
    showTypeColumn: true,
    items: [
      { id: "oth-1", service: "CARDIOLOGIST", type: "REVIEW", amount: 7500 },
    ],
  },
];

export function formatHmoTariffAmount(amount: number): string {
  return `N ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function expandTariffItems(items: HmoTariffItem[]): HmoTariffItem[] {
  return expandMockRecords(items, MOCK_HMO_LIST_TOTAL, (base, index) => ({
    ...base,
    id: `${base.id}-${index + 1}`,
    amount: base.amount + (index % 5) * 250,
  }));
}

export function buildMockHmoTariffCategories(): HmoTariffCategory[] {
  return MOCK_HMO_TARIFF_CATEGORIES.map((category) => ({
    ...category,
    items: expandTariffItems(category.items),
  }));
}

export function cloneTariffCategories(
  categories: HmoTariffCategory[],
): HmoTariffCategory[] {
  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({ ...item })),
  }));
}
