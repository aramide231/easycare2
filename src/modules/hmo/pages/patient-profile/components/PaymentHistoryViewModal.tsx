import easyCareLogoFull from "@hmo/assets/icon/Frame 121.svg";
import type {
  PaymentHistoryRecord,
  PaymentMethod,
} from "../data/mockPaymentHistoryData";

const PAYMENT_METHODS: PaymentMethod[] = [
  "Cash",
  "POS",
  "Cheque",
  "Transfer",
];

type Props = {
  open: boolean;
  record: PaymentHistoryRecord | null;
  patientDisplayName: string;
  onClose: () => void;
};

const PaymentHistoryViewModal = ({
  open,
  record,
  patientDisplayName,
  onClose,
}: Props) => {
  if (!open || !record) return null;

  const headlineVerb =
    record.type === "Deposit" ? "Deposit for" : "Payment for";
  const headlineSuffix =
    record.type === "Deposit" ? "to Available Balance" : "from Available Balance";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-history-view-title"
    >
      <div className="max-h-[90vh] w-full max-w-[669px] overflow-y-auto rounded-lg border border-[#E5E3E3] bg-[#FCFBFB] p-[30px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
        <div className="flex flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="relative flex h-[214px] w-full items-center justify-center rounded-lg border border-[#E5E3E3] bg-[#EEECFA] px-4">
              <div className="flex w-full max-w-[512px] flex-col items-center gap-6">
                <img
                  src={easyCareLogoFull}
                  alt="EasyCare"
                  className="h-10 w-auto"
                />
                <div className="flex flex-col items-center gap-2 text-center">
                  <p
                    id="payment-history-view-title"
                    className="text-xl font-medium text-[#161616]"
                  >
                    {headlineVerb}{" "}
                    <span className="font-bold uppercase">
                      {patientDisplayName}
                    </span>{" "}
                    {headlineSuffix}
                  </p>
                  <p className="text-[32px] font-bold tracking-[-0.64px] text-[#071639]">
                    {record.amount}
                  </p>
                  <p className="text-[15px] font-medium leading-[18px] text-[#00C851]">
                    {record.remark}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full space-y-7">
              <h3 className="text-xl font-semibold text-[#071639]">
                Transaction Details
              </h3>

              <div className="space-y-4 text-base">
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-[#626262]">Payee Details</span>
                  <span className="max-w-[280px] text-right font-medium text-[#071639]">
                    {record.payeeName} | {record.payeePhone}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-[#626262]">Payer Details</span>
                  <span className="max-w-[280px] text-right font-medium text-[#071639]">
                    {record.payerName} {record.payerId}| {record.payerPhone}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-[#626262]">Description</span>
                  <span className="max-w-[280px] text-right font-medium text-[#071639]">
                    {record.description}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-[#626262]">
                    Transaction Type
                  </span>
                  <span className="text-right font-medium text-[#071639]">
                    {PAYMENT_METHODS.map((method, index) => (
                      <span key={method}>
                        {index > 0 ? " | " : ""}
                        <span
                          className={
                            method === record.paymentMethod
                              ? "text-lg text-[#573FD1]"
                              : ""
                          }
                        >
                          {method}
                        </span>
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-[#626262]">
                    Transaction Receipt No
                  </span>
                  <span className="max-w-[280px] break-all text-right font-medium text-[#071639]">
                    {record.receiptNo}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-[#626262]">
                    Transaction Date | Time
                  </span>
                  <span className="max-w-[280px] text-right font-medium text-[#071639]">
                    {record.transactionDateTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-full items-center justify-center rounded-lg border border-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-[#573FD1] hover:bg-purple-50 sm:w-[250px]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex h-10 w-full items-center justify-center rounded-lg bg-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-white hover:bg-[#4a35b0] sm:w-[250px]"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryViewModal;
