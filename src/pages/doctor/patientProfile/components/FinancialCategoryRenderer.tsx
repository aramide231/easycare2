import type { ComponentType } from "react";
import AccountReview from "./categories/financial/AccountReview";
import AdmissionBill from "./categories/financial/AdmissionBill";
import ClaimsProcessor from "./categories/financial/ClaimsProcessor";
import Invoice from "./categories/financial/Invoice";
import Receipt from "./categories/financial/Receipt";
import PaymentHistory from "./categories/financial/PaymentHistory";
import ServiceFee from "./categories/financial/ServiceFee";

export const FINANCIAL_TABLE_KEYS: Record<string, string> = {
  "Account Review": "ACCOUNT REVIEW",
  "Admission Bill": "ADMISSION BILL",
  "Service Fee": "SERVICE FEE",
  "Claims Processor": "CLAIMS PROCESSOR",
  Receipt: "RECEIPT",
  "Payment History": "PAYMENT HISTORY",
  Invoice: "INVOICE",
};

export const financialCategoryComponents: Record<string, ComponentType> = {
  "Account Review": AccountReview,
  "Admission Bill": AdmissionBill,
  "Service Fee": ServiceFee,
  "Claims Processor": ClaimsProcessor,
  Receipt: Receipt,
  "Payment History": PaymentHistory,
  Invoice: Invoice,
};

export const FINANCIAL_CATEGORY_LABELS = Object.keys(
  financialCategoryComponents
);
