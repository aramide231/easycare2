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

const MEDICATION_FIELDS = [
  {
    key: "previousMedication",
    label: "Any Previous Medication for Dental Problems?",
  },
  {
    key: "currentMedication",
    label: "Any Current Medication for Dental Care?",
  },
  {
    key: "medicationAllergies",
    label: "Any Allergies for Dental Medication",
  },
  {
    key: "foodAllergies",
    label: "Any Food/Meal Allergies Symptoms",
  },
];

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  {
    key: "previousMedication",
    label: "ANY PREVIOUS MEDICATION FOR DENTAL PROBLEMS",
  },
  {
    key: "currentMedication",
    label: "ANY CURRENT MEDICATION FOR DENTAL CARE",
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

export default function PreviousDentalMedication() {
  const [form, setForm] = useState<Record<string, string>>({});
  const { history, save } = useMedicalTable(
    "SPECIALIST CONSULT — PREVIOUS DENTAL MEDICATION",
  );

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const hasValue = Object.values(form).some((v) => v.trim());
    if (!hasValue) return;
    save({
      previousMedication: form.previousMedicationSelect || "",
      previousMedicationDetail: form.previousMedicationDetail || "",
      currentMedication: form.currentMedicationSelect || "",
      currentMedicationDetail: form.currentMedicationDetail || "",
      medicationAllergies: form.medicationAllergiesSelect || "",
      medicationAllergiesDetail: form.medicationAllergiesDetail || "",
      foodAllergies: form.foodAllergiesSelect || "",
      foodAllergiesDetail: form.foodAllergiesDetail || "",
    });
    setForm({});
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {MEDICATION_FIELDS.map((field) => (
          <YesNoDetailInput
            key={field.key}
            label={field.label}
            selectValue={form[`${field.key}Select`] || ""}
            detailValue={form[`${field.key}Detail`] || ""}
            onSelectChange={(v) => update(`${field.key}Select`, v)}
            onDetailChange={(v) => update(`${field.key}Detail`, v)}
          />
        ))}
      </div>
      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>
      <CategoryMedicalTable
        title="PREVIOUS DENTAL MEDICATION DETAILS"
        columns={TABLE_COLUMNS}
        rows={history}
        emptyMessage="No dental medication history recorded yet."
      />
    </div>
  );
}
