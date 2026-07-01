import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const presentPregnancyFields: CategoryFieldConfig[] = [
  {
    name: "lmp",
    label: "Last Menstrual Period (LMP)",
    tableLabel: "LMP",
    type: "date",
    placeholder: "DD/MM/YYYY",
  },
  {
    name: "edd",
    label: "Expected Date of Delivery (EDD)",
    tableLabel: "EDD",
    type: "date",
    placeholder: "DD/MM/YYYY",
  },
  {
    name: "gestationalAge",
    label: "Estimated Gestational Age (EGA)",
    tableLabel: "EGA",
    placeholder: "-Input gestational age-",
  },
  {
    name: "parity",
    label: "Gravidity / Parity at Presentation",
    tableLabel: "G/P",
    placeholder: "-Input G/P-",
  },
  {
    name: "plannedDelivery",
    label: "Planned Place of Delivery",
    tableLabel: "PLANNED DELIVERY",
    placeholder: "-Input location-",
    showInTable: false,
  },
  {
    name: "riskFactors",
    label: "Risk Factors / High-Risk Notes",
    type: "textarea",
    placeholder: "-Input risk factors-",
    fullWidth: true,
    showInTable: false,
  },
  {
    name: "currentComplaints",
    label: "Current Pregnancy Complaints",
    type: "textarea",
    placeholder: "-Input complaints-",
    fullWidth: true,
    showInTable: false,
  },
];

const presentPregnancyTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "lmp", label: "LMP" },
  { key: "edd", label: "EDD" },
  { key: "gestationalAge", label: "EGA" },
  { key: "parity", label: "G/P" },
];

export default function PresentPregnancyHistory() {
  return (
    <CategoryFormWithHistory
      sectionName="PRESENT PREGNANCY HISTORY"
      tableKey="ANTE NATAL — PRESENT PREGNANCY HISTORY"
      fields={presentPregnancyFields}
      detailsTitle="PRESENT PREGNANCY HISTORY"
      fullWidth
      tableColumns={presentPregnancyTableColumns}
    />
  );
}
