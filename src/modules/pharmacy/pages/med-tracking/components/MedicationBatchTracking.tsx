import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import {
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  BATCH_TRACKING_SEED_ROWS,
  calcBatchAmount,
  MEDICATION_OPTIONS,
  type BatchTrackingRow,
} from "../data/medTrackingFigma";

const cellInputClass =
  "h-9 w-full min-w-[72px] rounded-md border border-gray-200 bg-[#F3F4F6] px-2 text-center text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]";

const cellReadOnlyClass = `${cellInputClass} cursor-default bg-gray-100 text-gray-700`;

export default function MedicationBatchTracking() {
  const [selectedMedication, setSelectedMedication] = useState("");
  const [rows, setRows] = useState<BatchTrackingRow[]>(
    () => BATCH_TRACKING_SEED_ROWS
  );

  const updateRow = (
    id: number,
    field: keyof BatchTrackingRow,
    value: string
  ) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;

        const next = { ...row, [field]: value };
        if (field === "sellingPrice" || field === "totalQuantity") {
          next.amount = calcBatchAmount(
            field === "sellingPrice" ? value : next.sellingPrice,
            field === "totalQuantity" ? value : next.totalQuantity
          );
        }
        return next;
      })
    );
  };

  const handleAdd = () => {
    if (!selectedMedication) {
      toast.error("Select a medication.");
      return;
    }

    if (rows.some((row) => row.medication === selectedMedication)) {
      toast.error("Medication already added.");
      return;
    }

    setRows((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((row) => row.id)) + 1,
        medication: selectedMedication,
        sellingPrice: "",
        totalQuantity: "",
        expiryDate: "",
        currentLevel: "",
        reorderLevel: "",
        amount: "",
      },
    ]);
    setSelectedMedication("");
  };

  const handleConfirm = () => {
    toast.success("Medication batch tracking confirmed.");
  };

  return (
    <div className="w-full max-w-6xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
        Medication(s) Batch Tracking
      </h2>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        Supply the following information
      </p>

      <div className="mb-6">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
          Medication
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-md">
            <select
              value={selectedMedication}
              onChange={(e) => setSelectedMedication(e.target.value)}
              className={`${formFieldSelectClass} pr-10`}
            >
              <option value="">Select medication</option>
              {MEDICATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="shrink-0 rounded-lg bg-[#573FD1] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
          >
            Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="whitespace-nowrap px-3 py-2 font-medium">S/N</th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Medication
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Selling Price (N)
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Total Quantity
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Expiry Date
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Current Level
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Re-order Level
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b border-[#D4D4D4]">
                <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-900">
                  {row.medication}
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={row.sellingPrice}
                    onChange={(e) =>
                      updateRow(row.id, "sellingPrice", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0.00"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={row.totalQuantity}
                    onChange={(e) =>
                      updateRow(row.id, "totalQuantity", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    value={row.expiryDate}
                    onChange={(e) =>
                      updateRow(row.id, "expiryDate", e.target.value)
                    }
                    className={`${cellInputClass} min-w-[110px]`}
                    placeholder="00-00-0000"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={row.currentLevel}
                    onChange={(e) =>
                      updateRow(row.id, "currentLevel", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={row.reorderLevel}
                    onChange={(e) =>
                      updateRow(row.id, "reorderLevel", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    readOnly
                    value={row.amount}
                    className={cellReadOnlyClass}
                    placeholder="0.00"
                    title="Selling Price × Total Quantity"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full max-w-lg rounded-lg bg-[#573FD1] px-8 py-3 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
