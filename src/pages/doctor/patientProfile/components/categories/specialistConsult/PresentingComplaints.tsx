import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaints", label: "COMPLAINTS" },
];

export default function PresentingComplaints() {
  const [complaints, setComplaints] = useState("");
  const [complaintHistory, setComplaintHistory] = useState("");
  const { history, save } = useMedicalTable(
    "SPECIALIST CONSULT — PRESENTING COMPLAINTS",
  );

  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");
  const textareaClass = genConsultTextareaClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );

  const handleSave = () => {
    if (!complaints.trim() && !complaintHistory.trim()) return;
    save({
      complaints: complaints.trim(),
      complaintHistory: complaintHistory.trim(),
    });
    setComplaints("");
    setComplaintHistory("");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={genConsultLabelClass}>Complaints</label>
        <textarea
          value={complaints}
          onChange={(e) => setComplaints(e.target.value)}
          placeholder="Enter complaints..."
          className={`${textareaClass} min-h-[120px]`}
        />
      </div>
      <div>
        <label className={genConsultLabelClass}>Complaint History</label>
        <input
          type="text"
          value={complaintHistory}
          onChange={(e) => setComplaintHistory(e.target.value)}
          placeholder="Enter complaint history..."
          className={inputClass}
        />
      </div>
      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>
      <CategoryMedicalTable
        title="PRESENTING COMPLAINTS DETAILS"
        columns={TABLE_COLUMNS}
        rows={history}
        emptyMessage="No presenting complaints recorded yet."
      />
    </div>
  );
}
