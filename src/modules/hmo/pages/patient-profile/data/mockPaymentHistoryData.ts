import {
  expandMockRecords,
  MOCK_HMO_LIST_TOTAL,
} from "@hmo/pages/shared/lib/pagination";

export type PaymentHistoryType = "Deposit" | "Payment";

export type PaymentMethod = "Cash" | "POS" | "Cheque" | "Transfer";

export type PaymentHistoryRecord = {
  id: string;
  type: PaymentHistoryType;
  date: string;
  time: string;
  remark: "Successful";
  amount: string;
  description: string;
  payeeName: string;
  payeePhone: string;
  payerName: string;
  payerId: string;
  payerPhone: string;
  paymentMethod: PaymentMethod;
  receiptNo: string;
  transactionDateTime: string;
};

const SEED: Omit<PaymentHistoryRecord, "id">[] = [
  {
    type: "Deposit",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 500,000.00",
    description: "Admission bill",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "Cheque",
    receiptNo: "27338873232838298229",
    transactionDateTime: "Dec 30th, 2025 16:09:24",
  },
  {
    type: "Deposit",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 150,000.00",
    description: "Service deposit",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "Transfer",
    receiptNo: "27338873232838298230",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
  {
    type: "Payment",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 45,000.00",
    description: "Consultation fee",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "Cash",
    receiptNo: "27338873232838298231",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
  {
    type: "Payment",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 25,000.00",
    description: "Laboratory tests",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "POS",
    receiptNo: "27338873232838298232",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
  {
    type: "Payment",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 18,500.00",
    description: "Medication",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "Transfer",
    receiptNo: "27338873232838298233",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
  {
    type: "Deposit",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 75,000.00",
    description: "Ward deposit",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "Cash",
    receiptNo: "27338873232838298234",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
  {
    type: "Payment",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 12,000.00",
    description: "Nursing care",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "POS",
    receiptNo: "27338873232838298235",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
  {
    type: "Payment",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 9,500.00",
    description: "Scan fee",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "Cheque",
    receiptNo: "27338873232838298236",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
  {
    type: "Deposit",
    date: "20-Feb-2025",
    time: "12:20 PM",
    remark: "Successful",
    amount: "N 200,000.00",
    description: "Available balance top-up",
    payeeName: "NURSE TITI ONANUGA",
    payeePhone: "+23490637482974",
    payerName: "ABIOLA ADEBAYO AREMU",
    payerId: "PVT-222",
    payerPhone: "+23490637482974",
    paymentMethod: "Transfer",
    receiptNo: "27338873232838298237",
    transactionDateTime: "Feb 20th, 2025 12:20:00",
  },
];

const METHODS: PaymentMethod[] = ["Cash", "POS", "Cheque", "Transfer"];

export function buildMockPaymentHistoryRecords(): PaymentHistoryRecord[] {
  return expandMockRecords(SEED, MOCK_HMO_LIST_TOTAL, (base, index) => ({
    ...base,
    id: `pay-${index + 1}`,
    type: index % 3 === 0 ? "Deposit" : "Payment",
    paymentMethod: METHODS[index % METHODS.length],
    receiptNo: `27338873232838298${String(229 + index).padStart(3, "0")}`,
    amount:
      index % 3 === 0
        ? `N ${(150000 + (index % 5) * 25000).toLocaleString("en-NG")}.00`
        : `N ${(8500 + (index % 7) * 1500).toLocaleString("en-NG")}.00`,
  }));
}

export function getPaymentTypeBadgeClass(type: PaymentHistoryType): string {
  if (type === "Deposit") {
    return "bg-[#E6FAEE] text-[#00C851]";
  }
  return "bg-[rgba(255,59,48,0.1)] text-[#FF3B30]";
}
