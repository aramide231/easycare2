import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const columns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "receiptNo", label: "RECEIPT NO" },
  { key: "amount", label: "AMOUNT" },
  { key: "paymentMethod", label: "PAYMENT METHOD" },
  { key: "receivedBy", label: "RECEIVED BY" },
];

export default function Receipt() {
  const { history } = useMedicalTable("RECEIPT");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("RECEIPT")}
      columns={columns}
      rows={history}
    />
  );
}
