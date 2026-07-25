import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { toast } from "react-toastify";
import type { HmoServiceListRecord } from "../data/mockHmoServiceListRecords";
import {
  SERVICE_CATEGORY_OPTIONS,
  SERVICE_STATUS_OPTIONS,
  getServiceStatusClass,
  getServiceStatusDotClass,
} from "../data/mockHmoServiceListRecords";

type Props = {
  mode: "add" | "edit";
  record?: HmoServiceListRecord;
  onClose: () => void;
  onConfirm: (record: Omit<HmoServiceListRecord, "id"> & { id?: number }) => void;
};

const fieldClass =
  "h-11 w-full rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 text-[15px] text-black outline-none placeholder:italic placeholder:text-[#808080] focus:border-[#573FD1]";

const selectClass =
  "h-11 w-full appearance-none rounded-lg border-[0.5px] border-black bg-[#FAFAFA] px-4 pr-10 text-[15px] text-black outline-none focus:border-[#573FD1]";

const ServiceFormModal = ({ mode, record, onClose, onConfirm }: Props) => {
  const [serviceName, setServiceName] = useState(record?.serviceName ?? "");
  const [serviceCategory, setServiceCategory] = useState(
    record?.serviceCategory ?? SERVICE_CATEGORY_OPTIONS[0],
  );
  const [amount, setAmount] = useState(
    record ? String(record.amount) : "",
  );
  const [status, setStatus] = useState<HmoServiceListRecord["status"]>(
    record?.status ?? "AVAILABLE",
  );

  useEffect(() => {
    if (!record) return;
    setServiceName(record.serviceName);
    setServiceCategory(record.serviceCategory);
    setAmount(String(record.amount));
    setStatus(record.status);
  }, [record]);

  const handleConfirm = () => {
    const parsedAmount = Number(amount.replace(/,/g, ""));

    if (!serviceName.trim()) {
      toast.error("Service name is required.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    onConfirm({
      id: record?.id,
      serviceName: serviceName.trim().toUpperCase(),
      serviceCategory,
      amount: parsedAmount,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[836px] rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between border-b border-[#D4D4D4] pb-4">
          <h3 className="text-base font-semibold tracking-[-0.32px] text-black">
            SERVICE LIST
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#FC3131] bg-[#FFCFCC] px-2 py-1 text-xs font-semibold text-[#FF3B30]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
                Service Name
              </label>
              <input
                value={serviceName}
                onChange={(event) => setServiceName(event.target.value)}
                placeholder="Enter service name"
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
                Service Category
              </label>
              <div className="relative">
                <select
                  value={serviceCategory}
                  onChange={(event) => setServiceCategory(event.target.value)}
                  className={selectClass}
                >
                  {SERVICE_CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-black" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
                Amount
              </label>
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[15px] tracking-[-0.3px] text-black">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as HmoServiceListRecord["status"])
                  }
                  className={selectClass}
                >
                  {SERVICE_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-black" />
              </div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium ${getServiceStatusClass(status)}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${getServiceStatusDotClass(status)}`}
                  />
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            className="h-10 min-w-[297px] rounded-[10px] border border-[#D4D4D4] bg-[#F8F8F8] px-6 text-sm font-medium text-black"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="h-10 min-w-[273px] rounded-[10px] bg-[#573FD1] px-6 text-sm font-medium text-white"
          >
            {mode === "add" ? "Confirm" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceFormModal;
