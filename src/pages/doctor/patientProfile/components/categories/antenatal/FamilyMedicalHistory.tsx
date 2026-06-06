import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const fmhFields: CategoryFieldConfig[] = [
  {
    name: "birthDefect",
    label: "Any History of Birth Defects?",
    tableLabel: "Hx BIRTH DEFECT",
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
    name: "geneticDisorder",
    label: "Any History of Genetics Disorder?",
    tableLabel: "Hx GENETICS",
    type: "select",
    placeholder: "-Select an Option-",
  },
  {
    name: "downSyndrome",
    label: "Any History of Down Syndrome?",
    tableLabel: "Hx DOWN SYNDROME",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "tuberculosis",
    label: "Any History of Tuberculosis?",
    tableLabel: "Hx TB",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "diabetes",
    label: "Any History of Diabetes ?",
    tableLabel: "Hx DIABETES",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "cysticFibrosis",
    label: "Any History of Cystic Fibrosis?",
    tableLabel: "Hx CF",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "highBloodPressure",
    label: "Any History of High Blood Pressue?",
    tableLabel: "Hx HBP",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "autism",
    label: "Any History of Autism?",
    tableLabel: "Hx AUTISM",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
  {
    name: "cancer",
    label: "Any History of Cancer?",
    tableLabel: "Hx CANCER",
    type: "select",
    placeholder: "-Select an Option-",
    showInTable: false,
  },
];

const fmhTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "birthDefect", label: "Hx BIRTH DEFECT" },
  { key: "hypertension", label: "Hx HYPERTENSION" },
  { key: "geneticDisorder", label: "Hx GENETICS" },
];

export default function FamilyMedicalHistory() {
  return (
    <CategoryFormWithHistory
      sectionName="FAMILY MEDICAL HISTORY"
      tableKey="ANTE NATAL — FAMILY MEDICAL HISTORY"
      fields={fmhFields}
      detailsTitle="FAMILY MEDICAL HISTORY"
      fullWidth
      tableColumns={fmhTableColumns}
    />
  );
}
