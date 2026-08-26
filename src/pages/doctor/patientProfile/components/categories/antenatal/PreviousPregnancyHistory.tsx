import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const pregnancyFields: CategoryFieldConfig[] = [
  {
    name: "totalGP",
    label: "Total Gravidity & Parity (G/P)",
    tableLabel: "G/P",
  },
  {
    name: "livingChildren",
    label: "Number of Living Children",
    tableLabel: "LIVING",
    type: "select",
    options: Array.from({ length: 21 }, (_, i) => ({
      value: String(i),
      label: String(i),
    })),
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
