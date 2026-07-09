export const ACCOUNT_REVIEW_SEED = [
  {
    sn: 1,
    dateTime: "15-Feb-2023 10:25 AM",
    patientType: "Out-Patient",
    description: "Consultation Fee",
    debit: "N 5,000.00",
    credit: "—",
    balance: "N 5,000.00",
  },
  {
    sn: 2,
    dateTime: "16-Feb-2023 11:00 AM",
    patientType: "Out-Patient",
    description: "HMO Payment",
    debit: "—",
    credit: "N 5,000.00",
    balance: "N 0.00",
  },
];

export const ADMISSION_BILL_SEED = [
  {
    sn: 1,
    dateTime: "15-Feb-2023 10:25 AM",
    patientType: "In-Patient",
    item: "Ward Bed (Daily)",
    quantity: "3",
    unitPrice: "N 8,000.00",
    amount: "N 24,000.00",
  },
  {
    sn: 2,
    dateTime: "15-Feb-2023 10:25 AM",
    patientType: "In-Patient",
    item: "Nursing Care",
    quantity: "3",
    unitPrice: "N 2,500.00",
    amount: "N 7,500.00",
  },
];

export const CLAIMS_PROCESSOR_SEED = [
  {
    sn: 1,
    dateTime: "15-Feb-2023 10:25 AM",
    patientType: "Out-Patient",
    claimId: "CLM-2023-001",
    status: "Pending",
    amount: "N 12,500.00",
    insurer: "Leadway HMO",
  },
];

export const SERVICE_FEE_SEED = [
  {
    sn: 1,
    dateTime: "15-Feb-2023 10:25 AM",
    patientType: "Out-Patient",
    service: "Registration Fee",
    amount: "N 2,000.00",
  },
  {
    sn: 2,
    dateTime: "16-Feb-2023 11:30 AM",
    patientType: "Out-Patient",
    service: "Medical Report",
    amount: "N 5,000.00",
  },
];

export const INVOICE_SEED = [
  {
    sn: 1,
    dateTime: "15-Feb-2023 10:25 AM",
    patientType: "Out-Patient",
    invoiceNo: "INV-2023-0142",
    description: "General Consultation",
    amount: "N 5,000.00",
    status: "Unpaid",
  },
  {
    sn: 2,
    dateTime: "16-Feb-2023 09:15 AM",
    patientType: "Out-Patient",
    invoiceNo: "INV-2023-0148",
    description: "Laboratory Tests",
    amount: "N 9,500.00",
    status: "Paid",
  },
];

export const RECEIPT_SEED = [
  {
    sn: 1,
    dateTime: "16-Feb-2023 09:20 AM",
    patientType: "Out-Patient",
    receiptNo: "RCT-2023-0089",
    amount: "N 9,500.00",
    paymentMethod: "Bank Transfer",
    receivedBy: "Cashier Desk",
  },
];

export const PAYMENT_HISTORY_SEED = [
  {
    sn: 1,
    dateTime: "16-Feb-2023 09:20 AM",
    patientType: "Out-Patient",
    reference: "TXN-884521",
    amount: "N 9,500.00",
    method: "Bank Transfer",
    status: "Successful",
  },
  {
    sn: 2,
    dateTime: "10-Feb-2023 14:05 PM",
    patientType: "Out-Patient",
    reference: "TXN-883102",
    amount: "N 5,000.00",
    method: "POS",
    status: "Successful",
  },
];
