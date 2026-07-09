import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const columns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "item", label: "ITEM" },
  { key: "quantity", label: "QTY" },
  { key: "unitPrice", label: "UNIT PRICE" },
  { key: "amount", label: "AMOUNT" },
];

export default function AdmissionBill() {
  const { history } = useMedicalTable("ADMISSION BILL");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("ADMISSION BILL")}
      columns={columns}
      rows={history}
    />
  );
}
