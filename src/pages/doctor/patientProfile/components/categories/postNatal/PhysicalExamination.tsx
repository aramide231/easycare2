import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";

type ExamForm = {
  general: string;
  chest: string;
  cvs: string;
  abdomen: string;
};

const emptyForm = (): ExamForm => ({
  general: "",
  chest: "",
  cvs: "",
  abdomen: "",
});

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "general", label: "GENERAL" },
];

function ExamField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const textareaClass = genConsultTextareaClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );

  return (
    <div>
      <label className={genConsultLabelClass}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter notes here"
        rows={3}
        className={textareaClass}
      />
    </div>
  );
}

export default function PostNatalPhysicalExamination() {
  const [form, setForm] = useState<ExamForm>(emptyForm());
  const { history, save } = useMedicalTable("POST NATAL — PHYSICAL EXAMINATION");

  const set = (key: keyof ExamForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const hasValue = Object.values(form).some((v) => v.trim());
    if (!hasValue) return;
    save(form);
    setForm(emptyForm());
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ExamField
          label="General"
          value={form.general}
          onChange={(v) => set("general", v)}
        />
        <ExamField
          label="Chest"
          value={form.chest}
          onChange={(v) => set("chest", v)}
        />
        <ExamField label="CVS" value={form.cvs} onChange={(v) => set("cvs", v)} />
        <ExamField
          label="ABD"
          value={form.abdomen}
          onChange={(v) => set("abdomen", v)}
        />
      </div>
      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>
      <CategoryMedicalTable
        title="PHYSICAL EXAMINATION"
        columns={TABLE_COLUMNS}
        rows={history}
        emptyMessage="No physical examination recorded yet."
      />
    </div>
  );
}
