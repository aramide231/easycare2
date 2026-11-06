import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const immunizationVitalFields: CategoryFieldConfig[] = [
  {
    name: "temperature",
    label: "Temperature (°C)",
    tableLabel: "TEMP",
    type: "number",
    placeholder: "e.g. 36.5",
    required: true,
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (mmHg)",
    tableLabel: "B.P",
    type: "bp",
    placeholder: "e.g. 120/80",
    required: true,
  },
  {
    name: "weight",
    label: "Weight (kg)",
    tableLabel: "WEIGHT",
    type: "number",
    placeholder: "e.g. 70",
    required: true,
  },
  {
    name: "height",
    label: "Height (m)",
    tableLabel: "HEIGHT",
    type: "number",
    placeholder: "e.g. 1.70",
    required: true,
  },
  {
    name: "bmi",
    label: "Body Mass Index (BMI)",
    tableLabel: "BMI",
    readOnly: true,
    placeholder: "Auto-calculated (kg/m²)",
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
    type: "number",
    placeholder: "e.g. 72",
  },
  {
    name: "comment",
    label: "Comments",
    tableLabel: "COMMENT",
    type: "textarea",
    placeholder: "Enter comments",
  },
];

const immunizationVitalTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "temperature", label: "TEMP" },
  { key: "bloodPressure", label: "B.P" },
  { key: "weight", label: "WEIGHT" },
  { key: "height", label: "HEIGHT" },
  { key: "bmi", label: "BMI" },
  { key: "pulseRate", label: "PULSE" },
  { key: "comment", label: "COMMENT" },
];

export default function ImmunizationVitalSigns() {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      fields={immunizationVitalFields}
      tableColumns={immunizationVitalTableColumns}
      showSaveButton
    />
  );
}
