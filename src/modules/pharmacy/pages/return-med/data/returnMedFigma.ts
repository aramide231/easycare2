export const RETURN_MEDICATION_OPTIONS = [
  "Vitamin A TAB",
  "Vitamin C TAB",
  "Anorol 500MG TAB",
  "Diclofenac TAB",
  "Cough Syrup TAB",
] as const;

export type ReturnDraftRow = {
  id: number;
  medication: string;
  quantityReturned: string;
  amount: string;
};

export type ReturnedMedicationDetailRow = {
  id: number;
  date: string;
  time: string;
  medication: string;
  quantityReturned: number;
  amount: string;
  staffName: string;
};

function emptyDraftFields() {
  return {
    quantityReturned: "",
    amount: "",
  };
}

/** Return Medication form — Figma seed rows. */
export const RETURN_DRAFT_SEED_ROWS: ReturnDraftRow[] = [
  { id: 1, medication: "Vitamin A TAB", ...emptyDraftFields() },
  { id: 2, medication: "Vitamin C TAB", ...emptyDraftFields() },
  { id: 3, medication: "Anorol 500MG TAB", ...emptyDraftFields() },
  { id: 4, medication: "Diclofenac TAB", ...emptyDraftFields() },
  { id: 5, medication: "Cough Syrup TAB", ...emptyDraftFields() },
];

/** Returned Medication Details — Figma frame (2 rows). */
export const RETURNED_DETAILS_SEED_ROWS: ReturnedMedicationDetailRow[] = [
  {
    id: 1,
    date: "12-Mar-2025",
    time: "11:15 AM",
    medication: "Diclofenac TAB",
    quantityReturned: 20,
    amount: "N 33,600.00",
    staffName: "Easy Tester",
  },
  {
    id: 2,
    date: "12-Mar-2025",
    time: "11:15 AM",
    medication: "Vitamin C TAB",
    quantityReturned: 30,
    amount: "N 33,600.00",
    staffName: "Easy Tester",
  },
];
