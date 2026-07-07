import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { VITAL_SIGNS_COMMENT_FIELD } from "../../../config/vitalSignsFieldOptions";
import { CategoryFormWithHistory } from "../../category";

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
    ...VITAL_SIGNS_COMMENT_FIELD,
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
      variant="genConsult"
      tableColumns={vitalTableColumns}
    />
  );
}
