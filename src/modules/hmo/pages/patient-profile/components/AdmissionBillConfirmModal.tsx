import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, User } from "lucide-react";
import {
  ADMISSION_BILL_SUMMARY,
  formatNaira,
  getSectionTotal,
  type AdmissionBillSection,
} from "../data/mockAdmissionBillData";

type Props = {
  open: boolean;
  patientName: string;
  patientId: string;
  sections: AdmissionBillSection[];
  onClose: () => void;
  onConfirm: () => void;
};

function toDisplayTitle(title: string): string {
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const AdmissionBillConfirmModal = ({
  open,
  patientName,
  patientId,
  sections,
  onClose,
  onConfirm,
}: Props) => {
  const groups = sections
    .map((section) => ({
      title: toDisplayTitle(section.title),
      items: section.rows.map((row) => row.service),
      amount: getSectionTotal(section),
    }))
    .filter((group) => group.items.length > 0);

  const [expanded, setExpanded] = useState<string[]>(() =>
    groups.slice(0, 3).map((group) => group.title),
  );

  if (!open) return null;

  const { totalAdmissionBill, deposit, discount, amountToPay } =
    ADMISSION_BILL_SUMMARY;

  const toggleGroup = (title: string) => {
    setExpanded((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-bill-confirm-title"
    >
      <div className="max-h-[90vh] w-full max-w-[588px] overflow-y-auto rounded-lg border border-[#E5E3E3] bg-[#FCFBFB] p-[30px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
        <button
          type="button"
          onClick={onClose}
          className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E3E3] bg-[#FCFBFB] text-gray-600 hover:bg-gray-50"
          aria-label="Close confirmation"
        >
          <ArrowLeft className="h-[18px] w-[18px]" />
        </button>

        <div className="space-y-4">
          <div>
            <h2
              id="admission-bill-confirm-title"
              className="text-2xl font-bold text-[#161616]"
            >
              Confirm Bill Details
            </h2>
            <p className="mt-1 text-sm tracking-[-0.28px] text-[#808080]">
              Review charges before confirmation
            </p>
          </div>

          <div className="inline-flex max-w-full items-center gap-3 rounded-lg bg-[#FFF1E6] px-3 py-2.5">
            <User className="h-5 w-5 shrink-0 text-[#FA7401]" fill="#FA7401" />
            <p className="truncate text-base font-medium tracking-[-0.32px] text-[#FA7401]">
              {patientName} ({patientId})
            </p>
          </div>

          <div className="rounded-lg border border-[#F5F5F5] bg-[#F8F8F8] p-5">
            <h3 className="mb-6 text-base font-medium text-[#071639]">
              Selected Services
            </h3>

            {groups.length === 0 ? (
              <p className="text-sm text-gray-500">
                No admission bill items available.
              </p>
            ) : (
              <ul className="space-y-6">
                {groups.map((group) => {
                  const isOpen = expanded.includes(group.title);
                  return (
                    <li key={group.title}>
                      <div className="flex items-start justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.title)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base font-medium text-[#071639]">
                              {group.title}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
                            )}
                          </span>
                          <span className="mt-1 block pl-5 text-sm text-[#6B7280]">
                            {isOpen
                              ? group.items.join(", ")
                              : group.items.slice(0, 2).join(", ")}
                          </span>
                        </button>
                        <span className="shrink-0 text-base font-medium text-[#071639]">
                          {formatNaira(group.amount)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-[#F5F5F5] bg-[#F0F0F0] p-5">
            <div className="space-y-4 text-base text-[#071639]">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">Total Admission Bill</span>
                <span className="font-semibold">
                  {formatNaira(totalAdmissionBill)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">Deposit</span>
                <span className="font-semibold">{formatNaira(deposit)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">Discount</span>
                <span className="font-semibold">-{formatNaira(discount)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[9px] bg-[#FFF1E6] px-5 py-2.5 font-semibold italic text-[#FA7401]">
                <span className="text-lg">Amount To Pay</span>
                <span className="text-xl">{formatNaira(amountToPay)}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            disabled={groups.length === 0}
            className="flex h-[45px] w-full items-center justify-center rounded-lg bg-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-white hover:bg-[#4a35b0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionBillConfirmModal;
