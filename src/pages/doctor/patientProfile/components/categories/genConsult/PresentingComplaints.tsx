import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "./genConsultStyles";

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaint", label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS" },
];

export default function GenConsultPresentingComplaints() {
  const [complaint, setComplaint] = useState("");
  const { history, save } = useMedicalTable("GEN CONSULT — PRESENTING COMPLAINTS");

  const handleSave = () => {
    if (!complaint.trim()) return;
    save({ complaint });
    setComplaint("");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={genConsultLabelClass}>
          Complaints / History of Presenting Complaints
        </label>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter complaints and history..."
          className={`${genConsultTextareaClass} min-h-[120px]`}
        />
      </div>
      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>
      <CategoryMedicalTable
        title="PRESENTING COMPLAINTS"
        columns={TABLE_COLUMNS}
        rows={history}
      />
    </div>
  );
}
