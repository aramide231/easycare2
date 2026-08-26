import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormDatePicker from "@/pages/doctor/patientProfile/components/category/FormDatePicker";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import type { MainStoreRow } from "../data/mainStoreFigma";

type MedicationFormValues = {
  name: string;
  medCategory: string;
  medType: string;
  costPrice: number;
  sellingPrice: number;
  date: string;
  time: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialRow?: MainStoreRow | null;
  onConfirm: (row: MedicationFormValues) => void;
  onDelete?: () => void;
};

const MED_CATEGORIES = [
  "Anti-Bacteria",
  "Anti-Viral",
  "Anti-Fungal",
  "Anti-Inflammatory",
  "Anti-Parasitic",
  "Anti-Malarial",
  "Anti-Hypertensive",
] as const;

const MED_TYPES = [
  "Pain Reliever",
  "Viral Infection",
  "Fungal Infection",
  "Bacterial Infection",
  "Worm Infection",
  "Malaria",
] as const;

const EMPTY_FORM = {
  name: "",
  medCategory: "",
  medType: "",
  costPrice: "",
  sellingPrice: "",
  expiryDate: "",
  stock: "",
};

function formFromRow(row: MainStoreRow) {
  return {
    name: row.name,
    medCategory: row.medCategory,
    medType: row.medType,
    costPrice: String(row.costPrice),
    sellingPrice: String(row.sellingPrice),
    expiryDate: "",
    stock: "",
  };
}

export default function AddMainStoreModal({
  isOpen,
  onClose,
  mode,
  initialRow = null,
  onConfirm,
  onDelete,
}: Props) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!isOpen) return;
    setForm(initialRow ? formFromRow(initialRow) : EMPTY_FORM);
  }, [isOpen, initialRow]);

  if (!isOpen) return null;

  const resetForm = () => setForm(EMPTY_FORM);

  const handleDelete = () => {
    if (mode === "edit" && onDelete) {
      onDelete();
      resetForm();
      onClose();
      return;
    }
    resetForm();
  };

  const handleBack = () => {
    resetForm();
    onClose();
  };

  const handleConfirm = () => {
    if (!form.name.trim() || !form.medCategory || !form.medType) {
      toast.error("Enter medication, category, and type.");
      return;
    }

    const costPrice = Number(form.costPrice);
    const sellingPrice = Number(form.sellingPrice);
    if (Number.isNaN(costPrice) || Number.isNaN(sellingPrice)) {
      toast.error("Enter valid cost and selling prices.");
      return;
    }

    onConfirm({
      name: form.name.trim(),
      medCategory: form.medCategory,
      medType: form.medType,
      costPrice,
      sellingPrice,
      date: initialRow?.date ?? "12-Mar-2025",
      time: initialRow?.time ?? "11:15 AM",
    });

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === "edit" ? "Edit Medication" : "Add New Medication"}
          </h3>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-600 hover:bg-red-100"
          >
            DELETE
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Medication
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className={formFieldInputClass}
              placeholder="Enter medication"
            />
          </div>

          <div className={formFieldGridClass}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Medication Category
              </label>
              <select
                value={form.medCategory}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, medCategory: e.target.value }))
                }
                className={formFieldSelectClass}
              >
                <option value="">Select from option</option>
                {MED_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Medication Type
              </label>
              <select
                value={form.medType}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, medType: e.target.value }))
                }
                className={formFieldSelectClass}
              >
                <option value="">Select from option</option>
                {MED_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={formFieldGridClass}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cost Price
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  N
                </span>
                <input
                  type="number"
                  value={form.costPrice}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, costPrice: e.target.value }))
                  }
                  className={`${formFieldInputClass} pl-8`}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Selling Price
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  N
                </span>
                <input
                  type="number"
                  value={form.sellingPrice}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      sellingPrice: e.target.value,
                    }))
                  }
                  className={`${formFieldInputClass} pl-8`}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className={formFieldGridClass}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <FormDatePicker
                value={form.expiryDate}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, expiryDate: value }))
                }
                allowFutureOnly
                fullYear
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Number of Stock
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, stock: e.target.value }))
                }
                className={formFieldInputClass}
                placeholder="Enter number of stock"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-lg bg-[#573FD1] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
          >
            {mode === "edit" ? "Update" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
