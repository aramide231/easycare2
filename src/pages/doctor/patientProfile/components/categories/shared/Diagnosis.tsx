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

/** Doctor table-only review — used on nurse module (exchanged with doctor forms). */
export default function Diagnosis() {
  const { history } = useMedicalTable("DIAGNOSIS");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("DIAGNOSIS")}
      columns={diagnosisTableColumns}
      rows={history}
    />
  );
}
