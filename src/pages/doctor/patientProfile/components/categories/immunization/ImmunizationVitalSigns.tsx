import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const immunizationVitalFields: CategoryFieldConfig[] = [
  {
    name: "temperature",
    label: "Temperature (°C)",
    tableLabel: "TEMP",
    required: true,
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (mmHg)",
    tableLabel: "B.P",
    required: true,
  },
  {
    name: "weight",
    label: "Weight (kg)",
    tableLabel: "WEIGHT",
    required: true,
  },
  {
    name: "height",
    label: "Height (cm)",
    tableLabel: "HEIGHT",
    required: true,
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
  },
  {
    name: "comment",
    label: "Comments",
    tableLabel: "COMMENT",
    type: "textarea",
    showInTable: false,
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
  { key: "pulseRate", label: "PULSE" },
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
