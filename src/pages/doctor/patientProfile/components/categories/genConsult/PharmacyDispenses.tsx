import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const pharmacyDispenseFields: CategoryFieldConfig[] = [
  { name: "medication", label: "Medication", tableLabel: "MEDICATION" },
  { name: "drugForm", label: "Drug Form", tableLabel: "FORM" },
  { name: "quantity", label: "Quantity", tableLabel: "QTY" },
  {
    name: "amount",
    label: "Amount",
    tableLabel: "AMOUNT",
    type: "amount",
  },
  { name: "notes", label: "Notes", tableLabel: "NOTES", type: "textarea", fullWidth: true },
];

export default function PharmacyDispenses() {
  return (
    <CategoryFormWithHistory
      sectionName="PHARMACY DISPENSE"
      fields={pharmacyDispenseFields}
    />
  );
}
