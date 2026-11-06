import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import {
  formFieldGridClass,
  formFieldInputClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import type { InvestigationCatalogRow } from "../data/investigationListFigma";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (row: Omit<InvestigationCatalogRow, "id">) => void;
};

const EMPTY_FORM = {
  name: "",
  amount: "",
  lastUpdateDate: "12-Mar-2025",
  lastUpdateTime: "11:15 AM",
  updatedBy: "Titilayo Olayinka",
};

export default function AddInvestigationModal({
  isOpen,
  onClose,
  onAdd,
}: Props) {
  const [form, setForm] = useState(EMPTY_FORM);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.name.trim() || !form.amount.trim()) {
      toast.error("Enter investigation name and amount.");
      return;
    }

    const amount = form.amount.trim().startsWith("N")
      ? form.amount.trim()
      : `N ${form.amount.trim()}`;

    onAdd({
      name: form.name.trim(),
      amount,
      lastUpdateDate: form.lastUpdateDate,
      lastUpdateTime: form.lastUpdateTime,
      updatedBy: form.updatedBy,
    });

    setForm(EMPTY_FORM);
    onClose();
    toast.success("Investigation added.");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Add Investigation</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className={formFieldGridClass}>
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Investigation Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className={formFieldInputClass}
              placeholder="e.g. Albumin"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="text"
              value={form.amount}
              onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
              className={formFieldInputClass}
              placeholder="N 7,500.00"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Last Update Date
            </label>
            <input
              type="text"
              value={form.lastUpdateDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, lastUpdateDate: e.target.value }))
              }
              className={formFieldInputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Last Update Time
            </label>
            <input
              type="text"
              value={form.lastUpdateTime}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, lastUpdateTime: e.target.value }))
              }
              className={formFieldInputClass}
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Updated By
            </label>
            <input
              type="text"
              value={form.updatedBy}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, updatedBy: e.target.value }))
              }
              className={formFieldInputClass}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a35b8]"
          >
            Add Record
          </button>
        </div>
      </div>
    </div>
  );
}
