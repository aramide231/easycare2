import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";
import { COMMENT_OPTIONS } from "./immunizationFieldOptions";

const vitalFields: CategoryFieldConfig[] = [
  {
    name: "temperature",
    label: "Temperature (°C)",
    tableLabel: "TEMP",
    placeholder: "-Input temperature-",
    required: true,
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (mmHg)",
    tableLabel: "B.P",
    placeholder: "-Input blood pressure-",
    required: true,
  },
  {
    name: "weight",
    label: "Weight (kg)",
    tableLabel: "WEIGHT",
    placeholder: "-Input weight-",
    required: true,
  },
  {
    name: "height",
    label: "Height (cm)",
    tableLabel: "HEIGHT",
    placeholder: "-Input height-",
    required: true,
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    placeholder: "-Input pulse rate-",
    showInTable: false,
  },
  {
    name: "comment",
    label: "Comments",
    type: "select",
    placeholder: "-Select option-",
    options: COMMENT_OPTIONS,
    showInTable: false,
  },
];

const vitalTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "temperature", label: "TEMP" },
  { key: "bloodPressure", label: "B.P" },
  { key: "weight", label: "WEIGHT" },
  { key: "height", label: "HEIGHT" },
];

export default function ImmunizationVitalSigns() {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      tableKey="IMMUNIZATION — VITAL SIGNS"
      fields={vitalFields}
      fullWidth
      tableColumns={vitalTableColumns}
    />
  );
}
