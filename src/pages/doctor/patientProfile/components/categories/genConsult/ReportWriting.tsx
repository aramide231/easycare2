import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const reportTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "wardType", label: "SELECT WARD" },
  { key: "ward", label: "WARD" },
  { key: "comment", label: "COMMENT" },
];

/** Clinician: read-only review of report writing the nurses documented. */
export default function ReportWriting() {
  const { history } = useMedicalTable("REPORT WRITING");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("REPORT WRITING")}
      columns={reportTableColumns}
      rows={history}
      emptyMessage="No report writing entries documented by nurses yet."
    />
  );
}
