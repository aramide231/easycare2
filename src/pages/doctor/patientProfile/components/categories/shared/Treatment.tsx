import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const treatmentTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "medication", label: "MEDICATION" },
  { key: "form", label: "FORM" },
  { key: "dosage", label: "DOSAGE" },
  { key: "duration", label: "DURATION" },
  { key: "period", label: "PERIOD" },
];

export default function Treatment() {
  const { history } = useMedicalTable("TREATMENT");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("TREATMENT")}
      columns={treatmentTableColumns}
      rows={history}
    />
  );
}
