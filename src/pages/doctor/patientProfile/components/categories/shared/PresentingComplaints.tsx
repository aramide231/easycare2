import { Lock } from "lucide-react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const presentingComplaintsTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaint", label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS" },
  { key: "doctor", label: "DOCTOR" },
];

/** Read-only Clinician documentation table — used on Nurse module. */
export default function PresentingComplaints() {
  const { history } = useMedicalTable("PRESENTING COMPLAINTS");

  return (
    <div className="min-w-0 w-full space-y-3">
      <div className="flex items-center gap-2 rounded-lg border border-purple-100 bg-purple-50/60 px-3 py-2 text-xs font-medium text-[#573FD1]">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        <span>Read-only — Viewing Clinician&apos;s documented Presenting Complaints</span>
      </div>
      <CategoryMedicalTable
        title={categoryDetailsTitle("PRESENTING COMPLAINTS")}
        columns={presentingComplaintsTableColumns}
        rows={history}
        wrapColumns={["complaint"]}
      />
    </div>
  );
}
