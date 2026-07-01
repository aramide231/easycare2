import { useState } from "react";
import type { CategoryTableColumn } from "../../../config/categoryFieldTypes";
import {
  markSectionSaved,
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";

type FieldDef = {
  name: string;
  label: string;
  type?: "textarea" | "text";
  placeholder?: string;
};

type Props = {
  tableKey: string;
  sectionLabel?: string;
  columns: CategoryTableColumn[];
  title?: string;
  emptyMessage?: string;
  fields: FieldDef[];
};

/** Clinician entry form for presenting complaints (doctor only). */
export default function PresentingComplaintsEditable({
  tableKey,
  sectionLabel = "PRESENTING COMPLAINTS",
  columns,
  title = "PRESENTING COMPLAINTS",
  emptyMessage = "No presenting complaints recorded yet.",
  fields,
}: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { history, save } = useMedicalTable(tableKey);

  const textareaClass = genConsultTextareaClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );
  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");

  const handleSave = () => {
    const payload: Record<string, string> = {};
    let hasValue = false;

    for (const field of fields) {
      const value = (formData[field.name] ?? "").trim();
      if (value) {
        payload[field.name] = value;
        hasValue = true;
      }
    }

    if (!hasValue) return;

    save(payload);
    markSectionSaved(sectionLabel);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className={genConsultLabelClass}>{field.label}</label>
          {field.type === "text" ? (
            <input
              type="text"
              value={formData[field.name] ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.value,
                }))
              }
              placeholder={field.placeholder}
              className={inputClass}
            />
          ) : (
            <textarea
              value={formData[field.name] ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.value,
                }))
              }
              placeholder={field.placeholder}
              className={`${textareaClass} min-h-[120px]`}
            />
          )}
        </div>
      ))}
      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>
      <CategoryMedicalTable
        title={title}
        columns={columns}
        rows={history}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
