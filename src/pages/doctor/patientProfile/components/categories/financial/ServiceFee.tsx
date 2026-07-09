import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const columns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "service", label: "SERVICE" },
  { key: "amount", label: "AMOUNT" },
];

export default function ServiceFee() {
  const { history } = useMedicalTable("SERVICE FEE");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("SERVICE FEE")}
      columns={columns}
      rows={history}
    />
  );
}
