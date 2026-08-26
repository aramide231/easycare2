import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formFieldSelectClass } from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  RETURN_DRAFT_SEED_ROWS,
  RETURN_MEDICATION_OPTIONS,
  RETURNED_DETAILS_SEED_ROWS,
  type ReturnDraftRow,
  type ReturnedMedicationDetailRow,
} from "./data/returnMedFigma";

const cellInputClass =
  "h-9 w-full min-w-[72px] rounded-md border border-gray-200 bg-[#F3F4F6] px-2 text-center text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatReturnDetailDateTime() {
  const now = new Date();
  const date = `${String(now.getDate()).padStart(2, "0")}-${
    MONTH_NAMES[now.getMonth()]
  }-${now.getFullYear()}`;
  const time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time };
}

function formatAmount(raw: string) {
  const trimmed = raw.trim();
  if (trimmed.startsWith("N")) return trimmed;

  const num = Number.parseFloat(trimmed.replace(/,/g, ""));
  if (Number.isNaN(num)) return trimmed;

  return `N ${num.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const ReturnMed = () => {
  const { user } = useAuth();
  const [selectedMedication, setSelectedMedication] = useState("");
  const [draftRows, setDraftRows] = useState<ReturnDraftRow[]>(
    () => RETURN_DRAFT_SEED_ROWS
  );
  const [details, setDetails] = useState<ReturnedMedicationDetailRow[]>(
    () => RETURNED_DETAILS_SEED_ROWS
  );

  const updateDraft = (
    id: number,
    field: "quantityReturned" | "amount",
    value: string
  ) => {
    setDraftRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAdd = () => {
    if (!selectedMedication) return;

    setDraftRows((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((row) => row.id)) + 1,
        medication: selectedMedication,
        quantityReturned: "",
        amount: "",
      },
    ]);
    setSelectedMedication("");
  };

  const handleDeleteDraft = (id: number) => {
    setDraftRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleDeleteDetail = (id: number) => {
    setDetails((prev) => prev.filter((row) => row.id !== id));
  };

  const handleConfirm = () => {
    const readyRows = draftRows.filter(
      (row) => row.quantityReturned.trim() && row.amount.trim()
    );
    if (readyRows.length === 0) return;

    const { date, time } = formatReturnDetailDateTime();
    const staffName = user?.fullName ?? "Easy Tester";
    let nextId = Math.max(0, ...details.map((row) => row.id));

    const newDetails = readyRows.map((row) => {
      nextId += 1;
      return {
        id: nextId,
        date,
        time,
        medication: row.medication,
        quantityReturned: Number.parseInt(row.quantityReturned, 10) || 0,
        amount: formatAmount(row.amount),
        staffName,
      };
    });

    const confirmedIds = new Set(readyRows.map((row) => row.id));

    setDetails((prev) => [...newDetails, ...prev]);
    setDraftRows((prev) => prev.filter((row) => !confirmedIds.has(row.id)));
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
          Return Medication
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
                {RETURN_MEDICATION_OPTIONS.map((option) => (
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
                  Quantity Returned
                </th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">
                  Amount (N)
                </th>
                <th className="whitespace-nowrap px-3 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {draftRows.map((row, index) => (
                <tr key={row.id} className="border-b border-[#D4D4D4]">
                  <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-900">
                    {row.medication}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={row.quantityReturned}
                      onChange={(e) =>
                        updateDraft(row.id, "quantityReturned", e.target.value)
                      }
                      className={cellInputClass}
                      placeholder="0"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={row.amount}
                      onChange={(e) =>
                        updateDraft(row.id, "amount", e.target.value)
                      }
                      className={cellInputClass}
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteDraft(row.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-red-600 hover:bg-red-50"
                      aria-label={`Delete ${row.medication}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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

      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
          Returned Medication Details
        </h2>

        <div className="overflow-x-auto border-t border-gray-200 pt-4">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Date | Time
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Medication
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Quantity Returned
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Staff Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {details.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3">{index + 1}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div>{row.date}</div>
                    <div className="text-xs text-gray-500">{row.time}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {row.medication}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.quantityReturned}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.amount}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.staffName}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDeleteDetail(row.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-red-600 hover:bg-red-50"
                      aria-label={`Delete ${row.medication}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReturnMed;
