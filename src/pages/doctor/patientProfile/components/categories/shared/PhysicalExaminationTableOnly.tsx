import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const physicalExaminationTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "general", label: "GENERAL" },
  { key: "cns", label: "CNS" },
  { key: "chest", label: "CHEST" },
  { key: "cvs", label: "CVS" },
  { key: "abdomen", label: "ABDOMEN" },
  { key: "dre", label: "DRE" },
  { key: "ve", label: "VE" },
  { key: "mss", label: "MSS" },
  { key: "ent", label: "ENT" },
  { key: "comments", label: "COMMENTS" },
];

/** Nurse table-only view of clinician physical examination records. */
export default function PhysicalExaminationTableOnly() {
  const { history } = useMedicalTable("PHYSICAL EXAMINATION");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("PHYSICAL EXAMINATION")}
      columns={physicalExaminationTableColumns}
      rows={history}
    />
  );
}
