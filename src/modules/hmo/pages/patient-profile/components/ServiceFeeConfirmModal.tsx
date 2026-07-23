import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, User } from "lucide-react";
import type { ServiceFeeSection } from "../data/mockServiceFeeData";

export type ConfirmServiceGroup = {
  title: string;
  description: string;
  amount: number;
  items: string[];
};

type Props = {
  open: boolean;
  patientName: string;
  patientId: string;
  sections: ServiceFeeSection[];
  onClose: () => void;
  onConfirm: () => void;
};

function parseAmount(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNaira(amount: number, withSymbol = false): string {
  const formatted = amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return withSymbol ? `₦${formatted}` : `N ${formatted}`;
}

function toDisplayTitle(title: string): string {
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildConfirmServiceGroups(
  sections: ServiceFeeSection[],
): ConfirmServiceGroup[] {
  return sections
    .map((section) => {
      const items = section.rows.map((row) => row.service);
      const amount = section.rows.reduce(
        (sum, row) => sum + parseAmount(row.amount),
        0,
      );
      return {
        title: toDisplayTitle(section.title),
        description: items.slice(0, 3).join(", "),
        amount,
        items,
      };
    })
    .filter((group) => group.items.length > 0 && group.amount > 0);
}

const INSURANCE_RATE = 0.2;

const ServiceFeeConfirmModal = ({
  open,
  patientName,
  patientId,
  sections,
  onClose,
  onConfirm,
}: Props) => {
  const groups = buildConfirmServiceGroups(sections);
  const [expanded, setExpanded] = useState<string[]>([]);

  if (!open) return null;

  const subtotal = groups.reduce((sum, group) => sum + group.amount, 0);
  const insuranceCoverage = subtotal * INSURANCE_RATE;
  const total = subtotal - insuranceCoverage;

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
      aria-labelledby="service-fee-confirm-title"
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
              id="service-fee-confirm-title"
              className="text-2xl font-bold text-[#161616]"
            >
              Confirm Bill Details
            </h2>
            <p className="mt-1 text-sm tracking-[-0.28px] text-[#808080]">
              Review selected services and charges before finalizing this bill
            </p>
          </div>

          <div className="inline-flex max-w-full items-center gap-3 rounded-lg bg-[#FFF1E6] px-3 py-2.5">
            <User className="h-5 w-5 shrink-0 text-[#FA7401]" fill="#FA7401" />
            <p className="truncate text-base font-medium tracking-[-0.32px] text-[#FA7401]">
              {patientName} ({patientId})
            </p>
          </div>

          <div className="rounded-lg border border-[#F5F5F5] bg-[#F8F8F8] p-5">
            <h3 className="mb-6 text-base font-medium text-[#4B5563]">
              Selected Services
            </h3>

            {groups.length === 0 ? (
              <p className="text-sm text-gray-500">
                No service fees have been added yet.
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
                            <span className="text-base font-medium text-[#4B5563]">
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
                              : group.description}
                          </span>
                        </button>
                        <span className="shrink-0 text-base text-[#4B5563]">
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
            <h3 className="mb-4 text-base text-[#4B5563]">Bill Breakdown</h3>
            <div className="space-y-4 text-sm text-[#4B5563]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Insurance Coverage (20%)</span>
                <span>-{formatNaira(insuranceCoverage)}</span>
              </div>
              <div className="flex items-center justify-between rounded-[9px] bg-[#FFF1E6] px-5 py-2.5 text-[22px] font-semibold italic text-[#FA7401]">
                <span>Total</span>
                <span>{formatNaira(total, true)}</span>
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

export default ServiceFeeConfirmModal;
