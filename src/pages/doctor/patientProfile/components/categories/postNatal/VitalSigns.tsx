import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";
import { COMMENT_OPTIONS } from "../immunization/immunizationFieldOptions";

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
    showInTable: false,
  },
  {
    name: "bloodSugar",
    label: "Blood Sugar",
    tableLabel: "B.S",
    placeholder: "-Input blood sugar-",
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    placeholder: "-Input pulse rate-",
    showInTable: false,
  },
  {
    name: "respiration",
    label: "Respiration (Bpm)",
    placeholder: "-Input Bpm-",
    showInTable: false,
  },
  {
    name: "bmi",
    label: "Body Mass Index (BMI)",
    placeholder: "-Input BMI-",
    showInTable: false,
  },
  {
    name: "urinalysis",
    label: "Urinalysis",
    placeholder: "-Input urinalysis-",
    showInTable: false,
  },
  {
    name: "spo2",
    label: "Peripheral Oxygen Saturation (SpO2)",
    placeholder: "-Input SpO2-",
    showInTable: false,
  },
  {
    name: "fhr",
    label: "Fetal Heart Rate (FHR)",
    placeholder: "-Input FHR-",
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
  { key: "bloodSugar", label: "B.S" },
  { key: "weight", label: "WEIGHT" },
];

export default function PostNatalVitalSigns() {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      tableKey="POST NATAL — VITAL SIGNS"
      fields={vitalFields}
      fullWidth
      tableColumns={vitalTableColumns}
    />
  );
}
