import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const pmhFields: CategoryFieldConfig[] = [
  {
    name: "heartDisease",
    label: "Any History of Heart Disease?",
    tableLabel: "HX HEART",
    type: "select",
  },
  {
    name: "hypertension",
    label: "Any History of Hypertension?",
    tableLabel: "HX HTN",
    type: "select",
  },
  {
    name: "kidneyDisease",
    label: "Any History of Kidney Disease?",
    tableLabel: "HX KIDNEY",
    type: "select",
  },
  {
    name: "bloodTransfusion",
    label: "Any History of Blood Transfusion?",
    tableLabel: "HX TRANSFUSION",
    type: "select",
  },
  {
    name: "diabetes",
    label: "Any History of Diabetes?",
    tableLabel: "HX DIABETES",
    type: "select",
  },
  {
    name: "chestDisease",
    label: "Any History of Chest Disease?",
    tableLabel: "HX CHEST",
    type: "select",
  },
  {
    name: "asthma",
    label: "Any History of Asthma?",
    tableLabel: "HX ASTHMA",
    type: "select",
  },
  {
    name: "fibroid",
    label: "Any History of Fibroid?",
    tableLabel: "HX FIBROID",
    type: "select",
  },
];

export default function PreviousMedicalHistory() {
  return (
    <CategoryFormWithHistory
      sectionName="PREVIOUS MEDICAL HISTORY"
      fields={pmhFields}
    />
  );
}
