import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const followUpFields: CategoryFieldConfig[] = [
  {
    name: "ega",
    label: "Estimated Gestational Age",
    tableLabel: "EGA",
    placeholder: "-Input gestational age-",
  },
  {
    name: "heightOfFundus",
    label: "Height of Fundus (cm)",
    tableLabel: "HEIGHT OF FUNDUS",
    placeholder: "-Input height-",
  },
  {
    name: "presentationPosition",
    label: "Presentation & Position (bpm)",
    tableLabel: "BPM",
    placeholder: "-Input bpm-",
  },
  {
    name: "relationOfBrim",
    label: "Relation of Presenting Part of Brim",
    placeholder: "-Input relation-",
    showInTable: false,
  },
  {
    name: "foetalHeart",
    label: "Foetal Heart",
    placeholder: "-Input foetal heart-",
    showInTable: false,
  },
  {
    name: "urine",
    label: "Urine",
    placeholder: "-Input urine result-",
    showInTable: false,
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (Hhmg)",
    placeholder: "-Input blood pressure-",
    showInTable: false,
  },
  {
    name: "weight",
    label: "Weight (Kg)",
    placeholder: "-Input weight-",
    showInTable: false,
  },
  {
    name: "pcv",
    label: "PCV",
    placeholder: "-Input PCV-",
    showInTable: false,
  },
  {
    name: "oedema",
    label: "Oedema",
    placeholder: "-Input oedema-",
    showInTable: false,
  },
  {
    name: "findings",
    label: "Findings",
    type: "textarea",
    placeholder: "-Input findings-",
    fullWidth: true,
    showInTable: false,
  },
  {
    name: "nextAppointmentDate",
    label: "Next Appointment Date",
    type: "date",
    placeholder: "DD/MM/YYY",
    showInTable: false,
  },
];

const followUpTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "ega", label: "EGA" },
  { key: "heightOfFundus", label: "HEIGHT OF FUNDUS" },
  { key: "presentationPosition", label: "BPM" },
];

export default function FollowUpVisit() {
  return (
    <CategoryFormWithHistory
      sectionName="FOLLOW-UP VISIT"
      tableKey="ANTE NATAL — FOLLOW-UP VISIT"
      fields={followUpFields}
      detailsTitle="FOLLOW-UP VISIT"
      fullWidth
      tableColumns={followUpTableColumns}
    />
  );
}
