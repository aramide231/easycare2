import { useCallback, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "../../../lib/formFieldStyles";

const REMARK_OPTIONS = [
  "1st Dose",
  "2nd Dose",
  "3rd Dose",
  "4th Dose",
  "5th Dose",
  "Completed",
  "Declined",
  "Dispensed",
  "Given",
  "Missed",
  "Not Available",
  "Served",
] as const;

const detailsColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "medication", label: "MEDICATION" },
  { key: "amount", label: "AMOUNT" },
  { key: "remark", label: "REMARK" },
  { key: "dispensedBy", label: "DISPENSED BY" },
];

type ServeForm = {
  medication: string;
  remark: string;
  served: boolean;
};

const EMPTY_FORM: ServeForm = {
  medication: "",
  remark: "",
  served: false,
};

/**
 * Gen Consult nurse medication view:
 * mark clinician medications as served + record dispense remark.
 */
export default function NurseMedicationServe() {
  const { user } = useAuth();
  const [form, setForm] = useState<ServeForm>(EMPTY_FORM);
  const { history } = useMedicalTable("MEDICATION");
  const nursing = useMedicalTable("NURSING DISPENSES");

  const prescriptions = useMemo(() => history.flatMap((row, rowIndex) =>
    (Array.isArray(row.medications) ? row.medications : [row]).map((med, index) => ({
      key: `${rowIndex}:${index}`, medication: String(med.medication ?? ""),
      amount: String(med.lineTotal ?? med.amount ?? ""), dosage: med.dosage,
      adminRoute: med.adminRoute, patientType: row.patientType, dateTime: row.dateTime,
      sn: row.sn,
    })).filter((med) => med.medication)
  ), [history]);
  const selected = prescriptions.find((med) => med.key === form.medication);
  const clearForm = useCallback(() => setForm(EMPTY_FORM), []);

  usePendingCategoryDraft(
    "NURSING DISPENSES",
    () => {
      if (!form.served || !selected || !form.remark.trim()) {
        return null;
      }
      return {
        medication: selected.medication,
        amount: selected.amount,
        remark: form.remark,
        dispensedBy: user?.fullName?.trim() || "Nurse",
        patientType: String(selected.patientType ?? ""),
      };
    },
    [form, selected, user?.fullName],
    clearForm,
  );

  return (
    <div className="space-y-6 text-sm">
      <CategoryMedicalTable
        title={categoryDetailsTitle("MEDICATION")}
        columns={[
          { key: "sn", label: "SN" },
          { key: "dateTime", label: "DATE | TIME" },
          { key: "patientType", label: "PATIENT TYPE" },
          { key: "medication", label: "MEDICATION" },
          { key: "dosage", label: "DOSAGE" },
          { key: "adminRoute", label: "ADMIN ROUTE" },
        ]}
        rows={prescriptions}
        emptyMessage="No clinician medications documented yet."
      />

      <div className="rounded-lg border border-purple-100 bg-purple-50/40 p-4">
        <label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-800">
          <input
            type="checkbox"
            checked={form.served}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, served: e.target.checked }))
            }
            className="h-4 w-4 rounded border-gray-300 text-[#573FD1] focus:ring-[#573FD1]"
          />
          Medications written by the Clinician have been served / given
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Medication
            </label>
            <div className="relative">
              <select
                value={form.medication}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, medication: e.target.value }))
                }
                disabled={!form.served}
                className={`${formFieldSelectClass} pr-10 disabled:bg-gray-100`}
              >
                <option value="">-Select medication-</option>
                {prescriptions.map((med) => (
                  <option key={med.key} value={med.key}>
                    {med.medication} {med.dosage}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              value={selected?.amount ?? ""}
              readOnly
              placeholder="Prescription amount"
              className={`${formFieldInputClass} disabled:bg-gray-100`}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Remark
            </label>
            <div className="relative">
              <select
                value={form.remark}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, remark: e.target.value }))
                }
                disabled={!form.served}
                className={`${formFieldSelectClass} pr-10 disabled:bg-gray-100`}
              >
                <option value="">-Select remark-</option>
                {REMARK_OPTIONS.map((option) => (
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
          </div>
        </div>
      </div>

      <CategoryMedicalTable
        title={categoryDetailsTitle("NURSING DISPENSES")}
        columns={detailsColumns}
        rows={nursing.history}
        emptyMessage="No nursing dispense records yet."
      />
    </div>
  );
}
