import { ChevronDown } from "lucide-react";
import { useAuth } from "@doctor-shared/context/useAuth";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import {
  MEDICATION_REMARK_OPTIONS,
  updateMedicationDispenseStatus,
  useMedicalTable,
} from "../../../hooks/useMedicalTable";

export default function MedicationDispenseTable() {
  const { user } = useAuth();
  const { history: medicationHistory } = useMedicalTable("MEDICATION");

  const dispensedByName = user?.fullName?.trim() || "Titilayo Olayinka";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
          {categoryDetailsTitle("MEDICATION")}
        </h3>
        <span className="text-xs text-gray-500">
          Tick the checkbox to mark medication as served/given and select a Remark
        </span>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full min-w-max border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-600">
              <th className="whitespace-nowrap px-3 py-2.5">SN</th>
              <th className="whitespace-nowrap px-3 py-2.5">DATE | TIME</th>
              <th className="whitespace-nowrap px-3 py-2.5">PATIENT TYPE</th>
              <th className="whitespace-nowrap px-3 py-2.5">MEDICATION</th>
              <th className="whitespace-nowrap px-3 py-2.5">AMOUNT</th>
              <th className="whitespace-nowrap px-3 py-2.5">REMARK</th>
              <th className="whitespace-nowrap px-3 py-2.5">DISPENSED BY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicationHistory.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-sm text-gray-500"
                >
                  No medication records documented yet.
                </td>
              </tr>
            ) : (
              medicationHistory.map((row, rowIndex) => {
                const isServed = Boolean(row.served);
                const remarkValue = String(row.remark ?? "");
                const medLabel = [
                  String(row.medication ?? "—"),
                  row.dosage ? `(${String(row.dosage)})` : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <tr
                    key={String(row.id ?? `med-row-${rowIndex}`)}
                    className="bg-white even:bg-gray-50/80"
                  >
                    <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isServed}
                          onChange={(e) =>
                            updateMedicationDispenseStatus(
                              rowIndex,
                              { served: e.target.checked },
                              dispensedByName
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 accent-[#573FD1]"
                          title="Mark medication as served/given"
                        />
                        <span>{rowIndex + 1}</span>
                      </label>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                      {String(row.dateTime ?? "—")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                      {String(row.patientType ?? "—")}
                    </td>
                    <td className="px-3 py-2.5 font-medium text-gray-900">
                      {medLabel}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 font-medium text-gray-800">
                      {String(row.amount ?? "N 0.00")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">
                      <div className="relative min-w-[165px]">
                        <select
                          value={remarkValue}
                          onChange={(e) =>
                            updateMedicationDispenseStatus(
                              rowIndex,
                              {
                                remark: e.target.value,
                                served: Boolean(e.target.value) || isServed,
                              },
                              dispensedByName
                            )
                          }
                          className="h-9 w-full appearance-none rounded-md border border-gray-300 bg-white pl-2.5 pr-8 text-xs font-medium text-gray-800 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
                        >
                          <option value="">-Select Remark-</option>
                          {MEDICATION_REMARK_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500"
                          aria-hidden
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-gray-800">
                      {String(row.dispensedBy ?? "—")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
