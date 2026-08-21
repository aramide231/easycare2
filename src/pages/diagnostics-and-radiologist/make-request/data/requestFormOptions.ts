export type RequestLineItem = {
  id: string;
  medication: string;
  drugForm: string;
  dosageAmount: string;
  dosageFrequency: string;
  drugUnit: string;
  durationValue: string;
  durationUnit: string;
  amount: number;
};

export const DRUG_FORM_OPTIONS = [
  "Tablets",
  "Capsules",
  "Cream",
  "Syrup",
  "Injection",
  "Ointment",
  "Drops",
];

export const DOSAGE_FREQUENCY_OPTIONS = [
  "STAT",
  "OD",
  "BD",
  "TDS",
  "QID",
  "NOCTE",
  "PRN",
];

export const DURATION_OPTIONS = [
  { value: "1", label: "1 Day" },
  { value: "2", label: "2 Days" },
  { value: "3", label: "3 Days" },
  { value: "5", label: "5 Days" },
  { value: "7", label: "7 Days" },
  { value: "14", label: "14 Days" },
];

/** Seed rows from Figma Make Request (3710:14587). */
export const INITIAL_REQUEST_ITEMS: RequestLineItem[] = [
  {
    id: "1",
    medication: "Vitamin A",
    drugForm: "Tablets",
    dosageAmount: "2",
    dosageFrequency: "BD",
    drugUnit: "Tabs",
    durationValue: "3",
    durationUnit: "Days",
    amount: 7000,
  },
  {
    id: "2",
    medication: "Clotrimazole",
    drugForm: "Cream",
    dosageAmount: "1",
    dosageFrequency: "NOCTE",
    drugUnit: "Tube",
    durationValue: "2",
    durationUnit: "Days",
    amount: 2000,
  },
  {
    id: "3",
    medication: "Cough Syrup",
    drugForm: "Syrup",
    dosageAmount: "1",
    dosageFrequency: "TDS",
    drugUnit: "Bottle",
    durationValue: "1",
    durationUnit: "Days",
    amount: 10000,
  },
  {
    id: "4",
    medication: "PCM",
    drugForm: "Injection",
    dosageAmount: "1",
    dosageFrequency: "STAT",
    drugUnit: "Amp",
    durationValue: "1",
    durationUnit: "Days",
    amount: 5000,
  },
];

export function formatNaira(amount: number): string {
  return `N ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
