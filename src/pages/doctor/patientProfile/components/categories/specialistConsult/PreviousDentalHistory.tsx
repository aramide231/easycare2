import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
} from "../genConsult/genConsultStyles";
import { YES_NO_OPTIONS } from "./specialistConsultFieldOptions";

const DENTAL_HISTORY_FIELDS = [
  { key: "previousVisit", label: "Any Previous Dental Visit?" },
  { key: "previousProblem", label: "Any Previous Dental Problem or Issues?" },
  { key: "previousTreatment", label: "Any Previous Dental Treatment?" },
  { key: "teethConcerns", label: "Any Specific Teeth with Major Concerns?" },
  { key: "additionalInfo", label: "Any Additional Information" },
];

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "lastDentalVisit", label: "DATE OF LAST DENTAL VISIT" },
  { key: "previousVisit", label: "ANY PREVIOUS DENTAL VISIT" },
  {
    key: "previousProblem",
    label: "ANY PREVIOUS DENTAL PROBLEM OR ISSUES",
  },
];

function YesNoDetailInput({
  label,
  selectValue,
  detailValue,
  onSelectChange,
  onDetailChange,
}: {
  label: string;
  selectValue: string;
  detailValue: string;
  onSelectChange: (v: string) => void;
  onDetailChange: (v: string) => void;
}) {
  const selectClass = genConsultSelectClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );
  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");

  return (
    <div>
      <label className={genConsultLabelClass}>{label}</label>
      <div className="flex gap-2">
        <select
          value={selectValue}
          onChange={(e) => onSelectChange(e.target.value)}
          className={`${selectClass} w-28 shrink-0`}
        >
          <option value="">-Select-</option>
          {YES_NO_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={detailValue}
          onChange={(e) => onDetailChange(e.target.value)}
          className={`${inputClass} flex-1`}
        />
      </div>
    </div>
  );
}

export default function PreviousDentalHistory() {
  const [form, setForm] = useState<Record<string, string>>({});
  const { history, save } = useMedicalTable(
    "SPECIALIST CONSULT — PREVIOUS DENTAL HISTORY",
  );

  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const hasValue = Object.values(form).some((v) => v.trim());
    if (!hasValue) return;
    save({
      lastDentalVisit: form.lastDentalVisit || "",
      previousVisit: form.previousVisitSelect || "",
      previousVisitDetail: form.previousVisitDetail || "",
      previousProblem: form.previousProblemSelect || "",
      previousProblemDetail: form.previousProblemDetail || "",
      previousTreatment: form.previousTreatmentSelect || "",
      previousTreatmentDetail: form.previousTreatmentDetail || "",
      teethConcerns: form.teethConcernsSelect || "",
      teethConcernsDetail: form.teethConcernsDetail || "",
      additionalInfo: form.additionalInfoSelect || "",
      additionalInfoDetail: form.additionalInfoDetail || "",
    });
    setForm({});
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {DENTAL_HISTORY_FIELDS.map((field) => (
          <YesNoDetailInput
            key={field.key}
            label={field.label}
            selectValue={form[`${field.key}Select`] || ""}
            detailValue={form[`${field.key}Detail`] || ""}
            onSelectChange={(v) => update(`${field.key}Select`, v)}
            onDetailChange={(v) => update(`${field.key}Detail`, v)}
          />
        ))}
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Date of Last Dental Visit</label>
          <input
            type="date"
            value={form.lastDentalVisit || ""}
            onChange={(e) => update("lastDentalVisit", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>
      <CategoryMedicalTable
        title="PREVIOUS DENTAL HISTORY DETAILS"
        columns={TABLE_COLUMNS}
        rows={history}
        emptyMessage="No dental history recorded yet."
      />
    </div>
  );
}
