import { useEffect, useState } from "react";
import {
  setPendingPhysicalExamination,
  subscribePhysicalExaminationFormClear,
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldTextareaClass,
} from "../../../lib/formFieldStyles";

const physicalExaminationTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "general", label: "GENERAL" },
  { key: "cns", label: "CNS" },
  { key: "chest", label: "CHEST" },
  { key: "cvs", label: "CVS" },
  { key: "abdomen", label: "ABDOMEN" },
  { key: "dre", label: "DRE" },
  { key: "ve", label: "VE" },
  { key: "mss", label: "MSS" },
  { key: "ent", label: "ENT" },
  { key: "comments", label: "COMMENTS" },
];

const EMPTY_FORM = {
  general: "",
  cns: "",
  chest: "",
  cvs: "",
  abdomen: "",
  dre: "",
  ve: "",
  mss: "",
  ent: "",
  comments: "",
};

type PhysicalExamForm = typeof EMPTY_FORM;

const fieldPairs: { name: keyof PhysicalExamForm; label: string }[][] = [
  [{ name: "cns", label: "CNS" }, { name: "chest", label: "Chest" }],
  [{ name: "cvs", label: "CVS" }, { name: "abdomen", label: "Abdomen" }],
  [{ name: "dre", label: "DRE" }, { name: "ve", label: "VE" }],
  [{ name: "mss", label: "MSS" }, { name: "ent", label: "ENT" }],
];

export default function PhysicalExamination() {
  const { history } = useMedicalTable("PHYSICAL EXAMINATION");
  const [formData, setFormData] = useState<PhysicalExamForm>(EMPTY_FORM);

  useEffect(() => {
    const general = formData.general.trim();
    if (!general) {
      setPendingPhysicalExamination(null);
      return;
    }

    setPendingPhysicalExamination({
      general,
      cns: formData.cns.trim(),
      chest: formData.chest.trim(),
      cvs: formData.cvs.trim(),
      abdomen: formData.abdomen.trim(),
      dre: formData.dre.trim(),
      ve: formData.ve.trim(),
      mss: formData.mss.trim(),
      ent: formData.ent.trim(),
      comments: formData.comments.trim(),
    });
  }, [formData]);

  useEffect(() => {
    return subscribePhysicalExaminationFormClear(() => {
      setFormData(EMPTY_FORM);
    });
  }, []);

  const updateField = (name: keyof PhysicalExamForm, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className={formFieldGridClass}>
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            General
          </label>
          <input
            type="text"
            value={formData.general}
            onChange={(e) => updateField("general", e.target.value)}
            placeholder="Text here..."
            className={formFieldInputClass}
          />
        </div>

        {fieldPairs.map((pair) =>
          pair.map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="text"
                value={formData[field.name]}
                onChange={(e) => updateField(field.name, e.target.value)}
                placeholder="Text here..."
                className={formFieldInputClass}
              />
            </div>
          ))
        )}

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            rows={8}
            value={formData.comments}
            onChange={(e) => updateField("comments", e.target.value)}
            placeholder="Text here..."
            className={`${formFieldTextareaClass} min-h-[180px]`}
          />
        </div>
      </div>

      <CategoryMedicalTable
        title="PHYSICAL EXAMINATION"
        columns={physicalExaminationTableColumns}
        rows={history}
        emptyMessage="No physical examination recorded yet."
        emptyCellLabel="nil"
      />
    </div>
  );
}
