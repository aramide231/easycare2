import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  formFieldInputClass,
  formFieldGridClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import type { InvestigationCatalogRow } from "../data/investigationListFigma";

type Props = {
  row: InvestigationCatalogRow;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, amount: string) => void;
};

function stripNairaPrefix(amount: string) {
  return amount.replace(/^N\s*/, "");
}

export default function EditInvestigationModal({
  row,
  isOpen,
  onClose,
  onSave,
}: Props) {
  const { user } = useAuth();
  const isAdmin = user?.userRole === "admin";
  const [amount, setAmount] = useState(stripNairaPrefix(row.amount));

  useEffect(() => {
    if (!isOpen) return;
    setAmount(stripNairaPrefix(row.amount));
  }, [isOpen, row]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmedAmount = amount.trim();
    if (!trimmedAmount) return;

    const formatted = trimmedAmount.startsWith("N")
      ? trimmedAmount
      : `N ${trimmedAmount}`;

    onSave(row.id, formatted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Investigation
          </h3>
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
              value={row.name}
              readOnly
              className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              readOnly={!isAdmin}
              className={`${formFieldInputClass} ${!isAdmin ? "bg-gray-100 text-gray-600" : ""}`}
            />
            {!isAdmin ? (
              <p className="mt-1 text-xs text-gray-500">
                Only Admin users can modify the amount.
              </p>
            ) : null}
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
            onClick={handleSave}
            disabled={!isAdmin || !amount.trim()}
            className="rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
