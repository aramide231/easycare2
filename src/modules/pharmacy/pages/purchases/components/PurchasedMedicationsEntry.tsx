import { useState } from "react";
import { Calendar } from "lucide-react";
import { toast } from "react-toastify";
import { formFieldInputClass } from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  calcTotalQuantity,
  PURCHASED_MEDICATION_SEED_ROWS,
  type PurchasedMedicationRow,
} from "../data/purchasedMedicationsFigma";

const cellInputClass =
  "h-9 w-full min-w-[72px] rounded-md border border-gray-200 bg-[#F3F4F6] px-2 text-center text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]";

const cellReadOnlyClass = `${cellInputClass} cursor-default bg-gray-100 text-gray-700`;

function formatNowLabel() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${day}/${month}/${year} ${time}`;
}

export default function PurchasedMedicationsEntry() {
  const [medicationQuery, setMedicationQuery] = useState("");
  const [rows, setRows] = useState<PurchasedMedicationRow[]>(
    () => PURCHASED_MEDICATION_SEED_ROWS
  );
  const [confirmedBy, setConfirmedBy] = useState("");
  const [dateTime, setDateTime] = useState("");

  const updateRow = (
    id: number,
    field: keyof PurchasedMedicationRow,
    value: string
  ) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;

        const next = { ...row, [field]: value };
        if (field === "medUnit" || field === "packsPurchased") {
          next.totalQuantity = calcTotalQuantity(
            field === "medUnit" ? value : next.medUnit,
            field === "packsPurchased" ? value : next.packsPurchased
          );
        }
        return next;
      })
    );
  };

  const handleAdd = () => {
    const name = medicationQuery.trim();
    if (!name) {
      toast.error("Enter a medication name.");
      return;
    }

    setRows((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((row) => row.id)) + 1,
        medication: name,
        openingStock: "",
        medUnit: "",
        packsPurchased: "",
        totalQuantity: "",
        expiryDate: "",
        costPrice: "",
        sellingPrice: "",
      },
    ]);
    setMedicationQuery("");
  };

  const handleAddNew = () => {
    toast.info("Add new medication from catalogue.");
  };

  const handleCaptureDateTime = () => {
    setDateTime(formatNowLabel());
  };

  const handleConfirm = () => {
    if (!confirmedBy.trim()) {
      toast.error("Enter the confirming pharmacist or store manager.");
      return;
    }
    if (!dateTime.trim()) {
      toast.error("Capture the current date and time.");
      return;
    }
    toast.success("Purchased medications confirmed.");
  };

  return (
    <div className="w-full max-w-6xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
        New Purchased Medication(s) Entry
      </h2>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        Supply the following information
      </p>

      <div className="mb-6">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
          Medication
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={medicationQuery}
            onChange={(e) => setMedicationQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            className={`${formFieldInputClass} sm:max-w-md`}
            placeholder="Enter medication"
          />
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-[#573FD1] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleAddNew}
              className="rounded-lg border border-[#573FD1] bg-white px-4 py-2.5 text-sm font-semibold text-[#573FD1] hover:bg-[#573FD1]/5"
            >
              + Add New
            </button>
          </div>
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
                Opening Stock
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Med. Unit
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                No of Packs Pur.
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Total Quantity
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Expiry Date
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Cost Price (N)
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium">
                Selling Price (N)
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
                    inputMode="numeric"
                    value={row.openingStock}
                    onChange={(e) =>
                      updateRow(row.id, "openingStock", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0"
                    title="Current total stock as at point of entry"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={row.medUnit}
                    onChange={(e) =>
                      updateRow(row.id, "medUnit", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={row.packsPurchased}
                    onChange={(e) =>
                      updateRow(row.id, "packsPurchased", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={row.totalQuantity}
                    readOnly
                    className={cellReadOnlyClass}
                    placeholder="0"
                    title="Med. Unit × No of Packs Purchased"
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
                    inputMode="decimal"
                    value={row.costPrice}
                    onChange={(e) =>
                      updateRow(row.id, "costPrice", e.target.value)
                    }
                    className={cellInputClass}
                    placeholder="0.00"
                  />
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Duely Confirmed By
          </label>
          <input
            type="text"
            value={confirmedBy}
            onChange={(e) => setConfirmedBy(e.target.value)}
            className={formFieldInputClass}
            placeholder="-Enter name of pharm. store manager or pharmacist-"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Date | Time
          </label>
          <button
            type="button"
            onClick={handleCaptureDateTime}
            className={`${formFieldInputClass} flex items-center justify-between text-left ${
              dateTime ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <span>{dateTime || "capture cur date & time"}</span>
            <Calendar className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          </button>
        </div>
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
