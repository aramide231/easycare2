import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const pmhFields: CategoryFieldConfig[] = [
  {
    name: "heartDisease",
    label: "Any History of Heart Disease?",
    tableLabel: "Hx HEART DISEASE",
    type: "select",
    placeholder: "-Select an Option-",
  },
  {
    name: "hypertension",
    label: "Any History of Hypertension?",
    tableLabel: "Hx HYPERTENSION",
    type: "select",
    placeholder: "-Select an Option-",
  },
  {
    name: "kidneyDisease",
    label: "Any History of Kidney Disease?",
    tableLabel: "Hx KIDNEY DISEASE",
    type: "select",
    placeholder: "-Select an Option-",
  },
  {
    name: "bloodTransfusion",
    label: "Any History of Blood Transfusion?",
    tableLabel: "Hx TRANSFUSION",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "diabetes",
    label: "Any History of Diabetes?",
    tableLabel: "Hx DIABETES",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "chestDisease",
    label: "Any History of Chest Disease?",
    tableLabel: "Hx CHEST DISEASE",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "asthma",
    label: "Any History of Asthma?",
    tableLabel: "Hx ASTHMA",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "fibroid",
    label: "Any History of Fibroid?",
    tableLabel: "Hx FIBROID",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
];

const pmhTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "heartDisease", label: "Hx HEART DISEASE" },
  { key: "hypertension", label: "Hx HYPERTENSION" },
  { key: "kidneyDisease", label: "Hx KIDNEY DISEASE" },
];

export default function PreviousMedicalHistory() {
  return (
    <CategoryFormWithHistory
      sectionName="PREVIOUS MEDICAL HISTORY"
      tableKey="ANTE NATAL — PREVIOUS MEDICAL HISTORY"
      fields={pmhFields}
      detailsTitle="PREV MEDICAL HISTORY"
      fullWidth
      tableColumns={pmhTableColumns}
    />
  );
}
