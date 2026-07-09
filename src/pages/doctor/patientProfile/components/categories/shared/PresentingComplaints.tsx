import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const presentingComplaintsTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaint", label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS" },
];

/** Doctor table-only review — used on nurse module (exchanged with doctor forms). */
export default function PresentingComplaints() {
  const { history } = useMedicalTable("PRESENTING COMPLAINTS");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("PRESENTING COMPLAINTS")}
      columns={presentingComplaintsTableColumns}
      rows={history}
    />
  );
}
