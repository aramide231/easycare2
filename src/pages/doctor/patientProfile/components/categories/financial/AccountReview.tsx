import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const columns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "description", label: "DESCRIPTION" },
  { key: "debit", label: "DEBIT" },
  { key: "credit", label: "CREDIT" },
  { key: "balance", label: "BALANCE" },
];

export default function AccountReview() {
  const { history } = useMedicalTable("ACCOUNT REVIEW");

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("ACCOUNT REVIEW")}
      columns={columns}
      rows={history}
    />
  );
}
