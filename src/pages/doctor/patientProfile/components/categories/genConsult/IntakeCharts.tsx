import { useCallback, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
} from "../../../lib/formFieldStyles";

const FLUID_TYPE_OPTIONS = [
  { value: "IV", label: "IV" },
  { value: "ORAL", label: "ORAL" },
  { value: "RECTAL", label: "RECTAL" },
  { value: "MIXED", label: "Mixed Fluids" },
];

const intakeTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "fluidType", label: "TYPE OF FLUID" },
  { key: "iv", label: "IV" },
  { key: "oral", label: "ORAL" },
  { key: "rectal", label: "RECTAL" },
  { key: "intakeTotal", label: "INTAKE-TOTAL" },
];

function parseVolume(value: string): number {
  const parsed = parseFloat(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function IntakeCharts() {
  const [form, setForm] = useState({
    fluidType: "",
    iv: "",
    oral: "",
    rectal: "",
  });
  const { history } = useMedicalTable("IN-TAKE CHART");

  const intakeTotal = useMemo(
    () =>
      parseVolume(form.iv) + parseVolume(form.oral) + parseVolume(form.rectal),
    [form.iv, form.oral, form.rectal]
  );

  const clearForm = useCallback(
    () => setForm({ fluidType: "", iv: "", oral: "", rectal: "" }),
    []
  );

  usePendingCategoryDraft(
    "IN-TAKE CHART",
    () => {
      if (!form.fluidType && intakeTotal <= 0) return null;
      return {
        fluidType: form.fluidType,
        iv: form.iv,
        oral: form.oral,
        rectal: form.rectal,
        intakeTotal: String(intakeTotal),
      };
    },
    [form, intakeTotal],
    clearForm
  );

  return (
    <div className="space-y-6">
      <div className={formFieldGridClass}>
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Type of Fluid
          </label>
          <div className="relative">
            <select
              value={form.fluidType}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, fluidType: e.target.value }))
              }
              className={`${formFieldSelectClass} pr-10`}
            >
              <option value="">-Select an Option-</option>
              {FLUID_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
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
            IV
          </label>
          <input
            type="text"
            value={form.iv}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, iv: e.target.value }))
            }
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            ORAL
          </label>
          <input
            type="text"
            value={form.oral}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, oral: e.target.value }))
            }
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            RECTAL
          </label>
          <input
            type="text"
            value={form.rectal}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, rectal: e.target.value }))
            }
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Intake-Total
          </label>
          <input
            type="text"
            readOnly
            value={intakeTotal > 0 ? String(intakeTotal) : ""}
            placeholder="Auto-calculated"
            className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
          />
        </div>
      </div>

      <CategoryMedicalTable
        title={categoryDetailsTitle("IN-TAKE CHART")}
        columns={intakeTableColumns}
        rows={history}
        emptyMessage="No intake chart entries recorded yet."
      />
    </div>
  );
}
