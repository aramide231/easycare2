import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const intakeFields: CategoryFieldConfig[] = [
  {
    name: "fluidType",
    label: "Fluid Type",
    tableLabel: "FLUID TYPE",
    placeholder: "Fluid Type",
    required: true,
  },
  {
    name: "iv",
    label: "IV",
    tableLabel: "IV",
    placeholder: "Iv text here",
  },
  {
    name: "oral",
    label: "Oral",
    tableLabel: "ORAL",
    placeholder: "Oral text here",
  },
  {
    name: "rectal",
    label: "Rectal",
    tableLabel: "RECTA",
    placeholder: "Rectal text here",
  },
];

const intakeTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "fluidType", label: "FLUID TYPE" },
  { key: "iv", label: "IV" },
  { key: "oral", label: "ORAL" },
  { key: "rectal", label: "RECTA" },
];

export default function IntakeCharts() {
  return (
    <CategoryFormWithHistory
      sectionName="INTAKE CHART"
      tableKey="GEN CONSULT — IN-TAKE CHART"
      detailsTitle="INTAKE CHART"
      fields={intakeFields}
      fullWidth
      tableColumns={intakeTableColumns}
    />
  );
}
