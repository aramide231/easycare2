export type PurchaseLogRow = {
  id: number;
  date: string;
  time: string;
  medication: string;
  openingStock: number;
  packsPurchased: number;
  totalQuantity: number;
  expiryDate: string;
  costPrice: number;
  sellingPrice: number;
};

const MEDICATIONS = [
  "Vitamin A TAB",
  "Vitamin C TAB",
  "Anorol 500MG TAB",
  "Diclofenac TAB",
  "Cough Syrup TAB",
] as const;

const TIMES = [
  "11:01 AM",
  "11:02 AM",
  "11:03 AM",
  "11:04 AM",
  "11:05 AM",
  "11:06 AM",
  "11:07 AM",
  "11:08 AM",
  "11:09 AM",
  "11:10 AM",
] as const;

/** Purchase Logs — Figma frame (10 rows). */
export const PURCHASE_LOG_ROWS: PurchaseLogRow[] = Array.from(
  { length: 10 },
  (_, index) => {
    const stock = 499 + index;
    const costPrice = (index + 1) * 10;

    return {
      id: index + 1,
      date: "12-Mar-2025",
      time: TIMES[index],
      medication: MEDICATIONS[index % MEDICATIONS.length],
      openingStock: stock,
      packsPurchased: stock,
      totalQuantity: stock,
      expiryDate: "00-00-0000",
      costPrice,
      sellingPrice: costPrice * 10,
    };
  }
);

/** Default range label shown in Figma: 25/03/2025 - 28/03/2025 */
export const PURCHASE_LOGS_DEFAULT_RANGE = {
  startDate: new Date(2025, 2, 25),
  endDate: new Date(2025, 2, 28),
};
