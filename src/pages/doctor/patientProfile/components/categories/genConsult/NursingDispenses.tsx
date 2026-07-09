import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const nursingDispenseFields: CategoryFieldConfig[] = [
  { name: "item", label: "Dispensed Item", tableLabel: "ITEM" },
  { name: "quantity", label: "Quantity", tableLabel: "QTY" },
  { name: "nurse", label: "Nurse Name", tableLabel: "NURSE" },
  { name: "notes", label: "Notes", tableLabel: "NOTES", type: "textarea", fullWidth: true },
];

export default function NursingDispenses() {
  return (
    <CategoryFormWithHistory
      sectionName="NURSING DISPENSES"
      fields={nursingDispenseFields}
    />
  );
}
