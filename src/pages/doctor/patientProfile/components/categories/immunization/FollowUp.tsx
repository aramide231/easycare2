import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "appointmentDate", label: "APPOINTMENT DATE" },
  { key: "nurse", label: "NURSE" },
];

export default function FollowUp() {
  const { user } = useAuth();
  const [nextDoseDate, setNextDoseDate] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  const { history, save } = useMedicalTable("IMMUNIZATION — FOLLOW-UP");

  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");
  const textareaClass = genConsultTextareaClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );

  const handleSave = () => {
    if (!nextDoseDate && !followUpNotes && !extraNotes) return;
    save({
      patientType: "OPD",
      appointmentDate: nextDoseDate,
      nurse: user?.fullName ?? "TOBA AYO",
      notes: followUpNotes,
      extraNotes,
    });
    setNextDoseDate("");
    setFollowUpNotes("");
    setExtraNotes("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={genConsultLabelClass}>Next Dose Due Date</label>
          <input
            type="date"
            value={nextDoseDate}
            onChange={(e) => setNextDoseDate(e.target.value)}
            placeholder="DD/MM/YYY"
            className={inputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Follow-up Notes</label>
          <textarea
            value={followUpNotes}
            onChange={(e) => setFollowUpNotes(e.target.value)}
            rows={3}
            className={textareaClass}
          />
        </div>
      </div>

      <div>
        <label className={genConsultLabelClass}>Follow-up Notes</label>
        <textarea
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          rows={4}
          className={textareaClass}
        />
      </div>

      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>

      <CategoryMedicalTable
        title="FOLLOW-UP VISIT"
        columns={HISTORY_COLUMNS}
        rows={history}
        emptyMessage="No follow-up visits recorded yet."
      />
    </div>
  );
}
