export type InvestigationCatalogRow = {
  id: number;
  name: string;
  amount: string;
  lastUpdateDate: string;
  lastUpdateTime: string;
  updatedBy: string;
};

/** Investigation List — Figma frame (9 rows). */
export const INVESTIGATION_LIST_ROWS: InvestigationCatalogRow[] = [
  {
    id: 1,
    name: "Albumin",
    amount: "N 7,500.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 2,
    name: "Alkaline Phosphate",
    amount: "N 5,000.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 3,
    name: "Anti A/B Haemolysin",
    amount: "N 7,500.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 4,
    name: "Blood Group & Genotype",
    amount: "N 30,000.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 5,
    name: "Breast Cancer Antigen",
    amount: "N 10,000.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 6,
    name: "Blood Group",
    amount: "N 15,000.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 7,
    name: "Colonoscopy",
    amount: "N 15,000.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 8,
    name: "HB Genotype",
    amount: "N 2,500.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
  {
    id: 9,
    name: "Phosphorus - Zenith",
    amount: "N 20,000.00",
    lastUpdateDate: "12-Mar-2025",
    lastUpdateTime: "11:15 AM",
    updatedBy: "Titilayo Olayinka",
  },
];

export const INVESTIGATION_LIST_DEFAULT_RANGE = {
  startDate: new Date(2025, 2, 25),
  endDate: new Date(2025, 2, 28),
};

export const INVESTIGATION_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
