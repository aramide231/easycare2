import { useEffect, useState } from "react";
import {
  setPendingPresentingComplaint,
  subscribePresentingComplaintFormClear,
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import { formFieldTextareaClass } from "../../../lib/formFieldStyles";

const presentingComplaintsTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaint", label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS" },
];

export default function DoctorPresentingComplaints() {
  const { history } = useMedicalTable("PRESENTING COMPLAINTS");
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    const value = complaint.trim();
    setPendingPresentingComplaint(value || null);
  }, [complaint]);

  useEffect(() => {
    return subscribePresentingComplaintFormClear(() => {
      setComplaint("");
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Complaints / History of Presenting Complaints
        </label>
        <textarea
          rows={10}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter complaints / history of presenting complaints..."
          className={`${formFieldTextareaClass} min-h-[220px] w-full`}
        />
      </div>

      <CategoryMedicalTable
        title="PRESENTING COMPLAINTS"
        columns={presentingComplaintsTableColumns}
        rows={history}
        emptyMessage="No presenting complaints recorded yet."
      />
    </div>
  );
}
