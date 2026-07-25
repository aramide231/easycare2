import { useState } from "react";
import { ChevronDown, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import type { HmoTariffItem } from "../data/mockHmoTariffData";

type Props = {
  item: HmoTariffItem;
  showTypeColumn: boolean;
  onClose: () => void;
  onSave: (updated: HmoTariffItem) => void;
};

const fieldClass =
  "h-11 w-full rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 text-[15px] text-black outline-none placeholder:italic placeholder:text-[#808080] focus:border-[#573FD1]";

const HmoTariffEditModal = ({
  item,
  showTypeColumn,
  onClose,
  onSave,
}: Props) => {
  const [service, setService] = useState(item.service);
  const [type, setType] = useState(item.type ?? "");
  const [amount, setAmount] = useState(String(item.amount));

  const handleSave = () => {
    const parsedAmount = Number(amount.replace(/,/g, ""));

    if (!service.trim()) {
      toast.error("Service name is required.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    onSave({
      ...item,
      service: service.trim().toUpperCase(),
      type: showTypeColumn ? type.trim().toUpperCase() || undefined : undefined,
      amount: parsedAmount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-[15px] bg-white p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold tracking-[-0.32px] text-black">
            Edit Tariff Item
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#626262] hover:bg-[#F5F5F5]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
              Service
            </label>
            <input
              value={service}
              onChange={(event) => setService(event.target.value)}
              className={fieldClass}
            />
          </div>

          {showTypeColumn && (
            <div>
              <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
                Type
              </label>
              <input
                value={type}
                onChange={(event) => setType(event.target.value)}
                className={fieldClass}
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
              Amount (N)
            </label>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] border border-[#A5A5A5] px-4 py-2 text-sm text-[#626262]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-[10px] bg-[#573FD1] px-4 py-2 text-sm font-medium text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HmoTariffEditModal;
