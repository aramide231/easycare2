import { useCallback, useMemo, useState } from "react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  formFieldGridClass,
  formFieldInputClass,
} from "../../../lib/formFieldStyles";

const outputTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "gastricAspiration", label: "GASTRIC ASPIRATION" },
  { key: "blood", label: "BLOOD" },
  { key: "urine", label: "URINE" },
  { key: "urineOutput", label: "URINE (2)" },
  { key: "vomit", label: "VOMIT" },
  { key: "stool", label: "STOOL" },
  { key: "outputTotal", label: "OUTPUT-TOTAL" },
];

function parseVolume(value: string): number {
  const parsed = parseFloat(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function OutputChart() {
  const [form, setForm] = useState({
    gastricAspiration: "",
    blood: "",
    urine: "",
    urineOutput: "",
    vomit: "",
    stool: "",
  });
  const { history } = useMedicalTable("OUTPUT CHART");

  const outputTotal = useMemo(
    () =>
      parseVolume(form.gastricAspiration) +
      parseVolume(form.blood) +
      parseVolume(form.urine) +
      parseVolume(form.urineOutput) +
      parseVolume(form.vomit) +
      parseVolume(form.stool),
    [form]
  );

  const updateField = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = useCallback(
    () =>
      setForm({
        gastricAspiration: "",
        blood: "",
        urine: "",
        urineOutput: "",
        vomit: "",
        stool: "",
      }),
    []
  );

  usePendingCategoryDraft(
    "OUTPUT CHART",
    () => {
      const hasValue = Object.values(form).some((value) => value.trim());
      if (!hasValue && outputTotal <= 0) return null;
      return {
        ...form,
        outputTotal: String(outputTotal),
      };
    },
    [form, outputTotal],
    clearForm
  );

  return (
    <div className="space-y-6">
      <div className={formFieldGridClass}>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Gastric Aspiration
          </label>
          <input
            type="text"
            value={form.gastricAspiration}
            onChange={(e) => updateField("gastricAspiration", e.target.value)}
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Urine
          </label>
          <input
            type="text"
            value={form.urineOutput}
            onChange={(e) => updateField("urineOutput", e.target.value)}
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Blood
          </label>
          <input
            type="text"
            value={form.blood}
            onChange={(e) => updateField("blood", e.target.value)}
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Vomit
          </label>
          <input
            type="text"
            value={form.vomit}
            onChange={(e) => updateField("vomit", e.target.value)}
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Urine
          </label>
          <input
            type="text"
            value={form.urine}
            onChange={(e) => updateField("urine", e.target.value)}
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Stool
          </label>
          <input
            type="text"
            value={form.stool}
            onChange={(e) => updateField("stool", e.target.value)}
            placeholder="Enter volume"
            className={formFieldInputClass}
          />
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Output-Total
          </label>
          <input
            type="text"
            readOnly
            value={outputTotal > 0 ? String(outputTotal) : ""}
            placeholder="Auto-calculated"
            className={`${formFieldInputClass} max-w-[calc(50%-0.5rem)] bg-gray-100 text-gray-600`}
          />
        </div>
      </div>

      <CategoryMedicalTable
        title={categoryDetailsTitle("OUTPUT CHART")}
        columns={outputTableColumns}
        rows={history}
        emptyMessage="No output chart entries recorded yet."
      />
    </div>
  );
}
