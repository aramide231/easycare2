import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "notes", label: "NOTES" },
];

export default function ClinicalNotes() {
  const [notes, setNotes] = useState("");
  const { history, save, remove } = useMedicalTable(
    "IMMUNIZATION — CLINICAL NOTES",
  );

  const textareaClass = genConsultTextareaClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );

  const handleSave = () => {
    if (!notes.trim()) return;
    save({
      patientType: "OPD",
      notes: notes.trim(),
    });
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={genConsultLabelClass}>Additional Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter additional clinical notes..."
          className={`${textareaClass} min-h-[140px]`}
        />
      </div>

      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>

      {history.length > 0 && (
        <CategoryMedicalTable
          title="CLINICAL NOTES"
          columns={HISTORY_COLUMNS}
          rows={history}
          emptyMessage="No clinical notes recorded yet."
        />
      )}
    </div>
  );
}
