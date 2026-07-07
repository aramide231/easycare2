import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultTextareaClass,
} from "./genConsultStyles";

const WARD_OPTIONS = [
  "Male Ward",
  "Female Ward",
  "Paediatric Ward",
  "ICU",
  "Private Ward",
];

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "pxWard", label: "PX WARD" },
  { key: "comment", label: "COMMENT" },
];

export default function ReportWriting() {
  const [pxWard, setPxWard] = useState("");
  const [comment, setComment] = useState("");

  const { history, save } = useMedicalTable("GEN CONSULT — REPORT WRITING");

  const handleSave = () => {
    if (!comment.trim()) return;
    save({
      pxWard: pxWard || "—",
      comment,
    });
    setPxWard("");
    setComment("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={genConsultLabelClass}>Patient Ward</label>
          <select
            value={pxWard}
            onChange={(e) => setPxWard(e.target.value)}
            className={genConsultSelectClass}
          >
            <option value="">-Select ward-</option>
            {WARD_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Assessment / Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Assessment:&#10;• Patient reports..."
            className={`${genConsultTextareaClass} min-h-[140px]`}
          />
        </div>
      </div>
      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>
      <CategoryMedicalTable
        title="REPORT WRITING"
        columns={TABLE_COLUMNS}
        rows={history}
      />
    </div>
  );
}
