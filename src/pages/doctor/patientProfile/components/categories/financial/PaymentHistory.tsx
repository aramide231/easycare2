import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const columns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "reference", label: "REFERENCE" },
  { key: "amount", label: "AMOUNT" },
  { key: "method", label: "METHOD" },
  { key: "status", label: "STATUS" },
];

export default function PaymentHistory() {
  const { history } = useMedicalTable("PAYMENT HISTORY");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("PAYMENT HISTORY")}
      columns={columns}
      rows={history}
    />
  );
}
