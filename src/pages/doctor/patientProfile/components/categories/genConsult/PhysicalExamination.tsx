import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "./genConsultStyles";

type ExamForm = {
  general: string;
  cns: string;
  chest: string;
  cvs: string;
  abdomen: string;
  dre: string;
  ve: string;
  mss: string;
  ent: string;
  comments: string;
};

const emptyForm = (): ExamForm => ({
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
});

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "general", label: "GENERAL" },
  { key: "cns", label: "CNS" },
  { key: "chest", label: "CHEST" },
  { key: "cvs", label: "CVS" },
  { key: "abdomen", label: "ABDOMEN" },
];

function Field({
  label,
  value,
  onChange,
  fullWidth,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : undefined}>
      <label className={genConsultLabelClass}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Text here..."
        className="h-[45px] w-full rounded-[8px] border-[0.5px] border-black bg-[#FAFAFA] px-3 text-sm placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
      />
    </div>
  );
}

export default function GenConsultPhysicalExamination() {
  const [form, setForm] = useState<ExamForm>(emptyForm());
  const { history, save } = useMedicalTable("GEN CONSULT — PHYSICAL EXAMINATION");

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="General" value={form.general} onChange={(v) => set("general", v)} fullWidth />
        <Field label="CNS" value={form.cns} onChange={(v) => set("cns", v)} />
        <Field label="Chest" value={form.chest} onChange={(v) => set("chest", v)} />
        <Field label="CVS" value={form.cvs} onChange={(v) => set("cvs", v)} />
        <Field label="Abdomen" value={form.abdomen} onChange={(v) => set("abdomen", v)} />
        <Field label="DRE" value={form.dre} onChange={(v) => set("dre", v)} />
        <Field label="VE" value={form.ve} onChange={(v) => set("ve", v)} />
        <Field label="MSS" value={form.mss} onChange={(v) => set("mss", v)} />
        <Field label="ENT" value={form.ent} onChange={(v) => set("ent", v)} />
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Comments</label>
          <textarea
            value={form.comments}
            onChange={(e) => set("comments", e.target.value)}
            placeholder="Text here..."
            className={genConsultTextareaClass}
          />
        </div>
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
      />
    </div>
  );
}
