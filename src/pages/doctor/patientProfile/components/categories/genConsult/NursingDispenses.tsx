import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const REMARK_OPTIONS = [
  "1st Dose",
  "2nd Dose",
  "3rd Dose",
  "4th Dose",
  "5th Dose",
  "Completed",
  "Declined",
  "Dispensed",
  "Given",
  "Missed",
  "Not Available",
  "Served",
].map((value) => ({ value, label: value }));

const nursingDispenseFields: CategoryFieldConfig[] = [
  {
    name: "medication",
    label: "Medication",
    tableLabel: "MEDICATION",
    placeholder: "Enter medication",
  },
  {
    name: "amount",
    label: "Amount",
    tableLabel: "AMOUNT",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "remark",
    label: "Remark",
    tableLabel: "REMARK",
    type: "select",
    options: REMARK_OPTIONS,
  },
  {
    name: "dispensedBy",
    label: "Dispensed By",
    tableLabel: "DISPENSED BY",
    placeholder: "Nurse name",
  },
];

const nursingDispenseColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "medication", label: "MEDICATION" },
  { key: "amount", label: "AMOUNT" },
  { key: "remark", label: "REMARK" },
  { key: "dispensedBy", label: "DISPENSED BY" },
];

export default function NursingDispenses() {
  return (
    <CategoryFormWithHistory
      sectionName="NURSING DISPENSES"
      fields={nursingDispenseFields}
      tableColumns={nursingDispenseColumns}
    />
  );
}
