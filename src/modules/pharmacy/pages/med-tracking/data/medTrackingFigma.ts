export type BatchTrackingRow = {
  id: number;
  medication: string;
  sellingPrice: string;
  totalQuantity: string;
  expiryDate: string;
  currentLevel: string;
  reorderLevel: string;
  amount: string;
};

export const MEDICATION_OPTIONS = [
  "Vitamin A TAB",
  "Vitamin C TAB",
  "Anorol 500MG TAB",
  "Diclofenac TAB",
  "Cough Syrup TAB",
  "Abacavir",
  "Amoxicillin",
  "Azithromycin",
] as const;

function emptyRowFields() {
  return {
    sellingPrice: "",
    totalQuantity: "",
    expiryDate: "",
    currentLevel: "",
    reorderLevel: "",
    amount: "",
  };
}

/** Medication(s) Batch Tracking — Figma seed rows. */
export const BATCH_TRACKING_SEED_ROWS: BatchTrackingRow[] = [
  { id: 1, medication: "Vitamin A TAB", ...emptyRowFields() },
  { id: 2, medication: "Vitamin C TAB", ...emptyRowFields() },
  { id: 3, medication: "Anorol 500MG TAB", ...emptyRowFields() },
  { id: 4, medication: "Diclofenac TAB", ...emptyRowFields() },
  { id: 5, medication: "Cough Syrup TAB", ...emptyRowFields() },
];

export function calcBatchAmount(
  sellingPrice: string,
  totalQuantity: string
): string {
  const price = Number(sellingPrice);
  const qty = Number(totalQuantity);
  if (
    sellingPrice.trim() === "" ||
    totalQuantity.trim() === "" ||
    Number.isNaN(price) ||
    Number.isNaN(qty)
  ) {
    return "";
  }
  return (price * qty).toFixed(2);
}

export type DamagedExpiredRow = {
  id: number;
  medication: string;
  expiryDate: string;
  totalQuantity: string;
  costPrice: string;
  sellingPrice: string;
  amount: string;
};

function emptyDamagedFields() {
  return {
    expiryDate: "",
    totalQuantity: "",
    costPrice: "",
    sellingPrice: "",
    amount: "",
  };
}

/** Damaged/Expired Medication(s) — Figma seed rows. */
export const DAMAGED_EXPIRED_SEED_ROWS: DamagedExpiredRow[] = [
  { id: 1, medication: "Vitamin A TAB", ...emptyDamagedFields() },
  { id: 2, medication: "Vitamin C TAB", ...emptyDamagedFields() },
  { id: 3, medication: "Anorol 500MG TAB", ...emptyDamagedFields() },
  { id: 4, medication: "Diclofenac TAB", ...emptyDamagedFields() },
  { id: 5, medication: "Cough Syrup TAB", ...emptyDamagedFields() },
];
