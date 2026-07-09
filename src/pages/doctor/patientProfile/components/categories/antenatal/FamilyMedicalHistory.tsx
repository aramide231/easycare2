import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const fmhFields: CategoryFieldConfig[] = [
  {
    name: "birthDefect",
    label: "Any History of Birth Defects?",
    tableLabel: "HX BIRTH DEF",
    type: "select",
  },
  {
    name: "hypertension",
    label: "Any History of Hypertension?",
    tableLabel: "HX HTN",
    type: "select",
  },
  {
    name: "geneticDisorder",
    label: "Any History of Genetics Disorder?",
    tableLabel: "HX GENETICS",
    type: "select",
  },
  {
    name: "downSyndrome",
    label: "Any History of Down Syndrome?",
    tableLabel: "HX DOWN",
    type: "select",
  },
  {
    name: "tuberculosis",
    label: "Any History of Tuberculosis?",
    tableLabel: "HX TB",
    type: "select",
  },
  {
    name: "diabetes",
    label: "Any History of Diabetes?",
    tableLabel: "HX DIABETES",
    type: "select",
  },
  {
    name: "cysticFibrosis",
    label: "Any History of Cystic Fibrosis?",
    tableLabel: "HX CF",
    type: "select",
  },
  {
    name: "highBloodPressure",
    label: "Any History of High Blood Pressure?",
    tableLabel: "HX HBP",
    type: "select",
  },
  {
    name: "autism",
    label: "Any History of Autism?",
    tableLabel: "HX AUTISM",
    type: "select",
  },
  {
    name: "cancer",
    label: "Any History of Cancer?",
    tableLabel: "HX CANCER",
    type: "select",
  },
];

export default function FamilyMedicalHistory() {
  return (
    <CategoryFormWithHistory
      sectionName="FAMILY MEDICAL HISTORY"
      fields={fmhFields}
    />
  );
}
