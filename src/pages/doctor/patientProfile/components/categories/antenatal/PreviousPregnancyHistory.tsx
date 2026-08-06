import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const LIVING_CHILDREN_OPTIONS = Array.from({ length: 21 }, (_, index) => ({
  value: String(index),
  label: String(index),
}));

const pregnancyFields: CategoryFieldConfig[] = [
  {
    name: "totalGP",
    label: "Total Gravidity & Parity (G/P)",
    tableLabel: "G/P",
  },
  {
    name: "livingChildren",
    label: "No of Living Children",
    tableLabel: "LIVING",
    type: "select",
    options: LIVING_CHILDREN_OPTIONS,
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    tableLabel: "DOB",
    type: "date",
  },
  {
    name: "durationOfPregnancy",
    label: "Duration Of Pregnancy",
    tableLabel: "DURATION",
  },
  { name: "birthWeight", label: "Birth Weight (Kg)", tableLabel: "BIRTH WT" },
  {
    name: "pregnancyOutcome",
    label: "Pregnancy, Labour & Puerperium",
    tableLabel: "OUTCOME",
  },
  { name: "babyCondition", label: "Baby's Condition", tableLabel: "BABY" },
  { name: "babyGender", label: "Baby's Gender", tableLabel: "GENDER" },
];

export default function PreviousPregnancyHistory() {
  return (
    <CategoryFormWithHistory
      sectionName="PREVIOUS PREGNANCY HISTORY"
      fields={pregnancyFields}
    />
  );
}
