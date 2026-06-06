import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
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
    name: "respiratory",
    label: "Respiratory (Bpm)",
    tableLabel: "RES",
    placeholder: "-Input respiratory rate-",
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
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
    placeholder: "-Input pulse rate-",
  },
  {
    name: "spo2",
    label: "SPO2",
    tableLabel: "SPO2",
    placeholder: "-Input SPO2-",
  },
  {
    name: "comment",
    label: "Comments",
    type: "textarea",
    placeholder: "-Input comments-",
    fullWidth: true,
    showInTable: false,
  },
];

const vitalTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "temperature", label: "TEMP" },
  { key: "weight", label: "WEIGHT" },
  { key: "pulseRate", label: "PULSE" },
  { key: "respiratory", label: "RES" },
  { key: "spo2", label: "SPO2" },
];

export default function NeonatalVitalSigns() {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      tableKey="NEO NATAL — VITAL SIGNS"
      fields={vitalFields}
      fullWidth
      tableColumns={vitalTableColumns}
    />
  );
}
