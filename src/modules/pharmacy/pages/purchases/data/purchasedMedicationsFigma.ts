export type PurchasedMedicationRow = {
  id: number;
  medication: string;
  /** Current total stock as at point of entry. */
  openingStock: string;
  /** Units per pack — used in Total Quantity = Med. Unit × No of Packs Pur. */
  medUnit: string;
  packsPurchased: string;
  totalQuantity: string;
  expiryDate: string;
  costPrice: string;
  sellingPrice: string;
};

function emptyCalcFields() {
  return {
    openingStock: "",
    medUnit: "",
    packsPurchased: "",
    totalQuantity: "",
    expiryDate: "",
    costPrice: "",
    sellingPrice: "",
  };
}

/** Total Quantity = Med. Unit × No of Packs Purchased */
export function calcTotalQuantity(medUnit: string, packsPurchased: string): string {
  const unit = Number(medUnit);
  const packs = Number(packsPurchased);
  if (
    medUnit.trim() === "" ||
    packsPurchased.trim() === "" ||
    Number.isNaN(unit) ||
    Number.isNaN(packs)
  ) {
    return "";
  }
  return String(unit * packs);
}

/** Purchased Medication(s) Entry — Figma seed rows. */
export const PURCHASED_MEDICATION_SEED_ROWS: PurchasedMedicationRow[] = [
  {
    id: 1,
    medication: "Vitamin A TAB",
    ...emptyCalcFields(),
  },
  {
    id: 2,
    medication: "Vitamin C TAB",
    ...emptyCalcFields(),
  },
  {
    id: 3,
    medication: "Anorol 500MG TAB",
    ...emptyCalcFields(),
  },
  {
    id: 4,
    medication: "Diclofenac TAB",
    ...emptyCalcFields(),
  },
  {
    id: 5,
    medication: "Cough Syrup TAB",
    ...emptyCalcFields(),
  },
];
