import ComingSoonPage from "@/components/ui/ComingSoonPage";
import ClaimsProcessor from "./financial/ClaimsProcessor";

export const FINANCIAL_TABLE_KEYS: Record<string, string> = {
  "Account Review": "FINANCIAL — ACCOUNT REVIEW",
  "Admission Bill": "FINANCIAL — ADMISSION BILL",
  "Service Fee": "FINANCIAL — SERVICE FEE",
  "Claims Processor": "FINANCIAL — CLAIMS PROCESSOR",
  Receipt: "FINANCIAL — RECEIPT",
  "Payment History": "FINANCIAL — PAYMENT HISTORY",
  Invoice: "FINANCIAL — INVOICE",
};

function FinancialComingSoon({ title }: { title: string }) {
  return <ComingSoonPage title={title} />;
}

export const financialCategoryComponents: Record<
  string,
  React.ComponentType
> = {
  "Account Review": () => <FinancialComingSoon title="Account Review" />,
  "Admission Bill": () => <FinancialComingSoon title="Admission Bill" />,
  "Service Fee": () => <FinancialComingSoon title="Service Fee" />,
  "Claims Processor": ClaimsProcessor,
  Receipt: () => <FinancialComingSoon title="Receipt" />,
  "Payment History": () => <FinancialComingSoon title="Payment History" />,
  Invoice: () => <FinancialComingSoon title="Invoice" />,
};
