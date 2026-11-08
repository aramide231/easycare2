import { Lock } from "lucide-react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const diagnosisTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "diagnosis", label: "DIAGNOSIS" },
  { key: "doctor", label: "DOCTOR" },
];

/** Read-only Clinician documentation table — used on Nurse module. */
export default function Diagnosis() {
  const { history } = useMedicalTable("DIAGNOSIS");

  return (
    <div className="min-w-0 w-full space-y-3">
      <div className="flex items-center gap-2 rounded-lg border border-purple-100 bg-purple-50/60 px-3 py-2 text-xs font-medium text-[#573FD1]">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        <span>Read-only — Viewing Clinician&apos;s documented Diagnosis</span>
      </div>
      <CategoryMedicalTable
        title={categoryDetailsTitle("DIAGNOSIS")}
        columns={diagnosisTableColumns}
        rows={history}
        wrapColumns={["diagnosis"]}
      />
    </div>
  );
}
