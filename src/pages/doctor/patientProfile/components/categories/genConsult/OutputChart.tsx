import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const outputFields: CategoryFieldConfig[] = [
  {
    name: "urine",
    label: "Urine",
    tableLabel: "URINE",
    placeholder: "Urine output",
  },
  {
    name: "stool",
    label: "Stool",
    tableLabel: "STOOL",
    placeholder: "Stool output",
  },
  {
    name: "vomit",
    label: "Vomit",
    tableLabel: "VOMIT",
    placeholder: "Vomit output",
  },
  {
    name: "drainage",
    label: "Drainage",
    tableLabel: "DRAINAGE",
    placeholder: "Drainage output",
  },
  {
    name: "remarks",
    label: "Remarks",
    type: "textarea",
    fullWidth: true,
    showInTable: false,
    placeholder: "Additional notes...",
  },
];

const outputTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "urine", label: "URINE" },
  { key: "stool", label: "STOOL" },
  { key: "vomit", label: "VOMIT" },
  { key: "drainage", label: "DRAINAGE" },
];

export default function OutputChart() {
  return (
    <CategoryFormWithHistory
      sectionName="OUTPUT CHART"
      tableKey="GEN CONSULT — OUTPUT CHART"
      detailsTitle="OUTPUT CHART"
      fields={outputFields}
      fullWidth
      tableColumns={outputTableColumns}
    />
  );
}
