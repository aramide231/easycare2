export type InvoicePaymentItem = {
  id: string;
  label: string;
  amount: number;
};

export type InvoicePaymentOption = {
  label: string;
  defaultAmount: number;
};

export const INVOICE_PAYMENT_OPTIONS: InvoicePaymentOption[] = [
  { label: "FEEDING", defaultAmount: 3000 },
  { label: "PROCEDURE", defaultAmount: 5000 },
  { label: "ULTRA SOUND", defaultAmount: 10000 },
  { label: "CONSULTATION", defaultAmount: 3000 },
  { label: "MEDICATION", defaultAmount: 2500 },
  { label: "INVESTIGATION", defaultAmount: 8000 },
  { label: "ACCOMODATION", defaultAmount: 5000 },
  { label: "OTHER SERVICES", defaultAmount: 4000 },
];

export const SEED_INVOICE_ITEMS: InvoicePaymentItem[] = [
  { id: "seed-1", label: "FEEDING", amount: 3000 },
  { id: "seed-2", label: "PROCEDURE", amount: 5000 },
  { id: "seed-3", label: "ULTRA SOUND", amount: 10000 },
];

export function parseNairaInput(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatNairaAmount(amount: number, compact = false): string {
  const formatted = amount.toLocaleString("en-NG", {
    minimumFractionDigits: compact ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return compact ? `N ${formatted}` : `N  ${formatted}`;
}

export function nextInvoiceNumber(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `INV-${y}${m}${d}-${seq}`;
}
