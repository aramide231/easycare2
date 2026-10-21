import type { CategoryFieldConfig } from "./categoryFieldTypes";
import { VITAL_COMMENT_OPTIONS } from "./vitalFieldOptions";

/** Full ANC / Ante Natal vital signs (includes FHR). */
export const anteNatalVitalFields: CategoryFieldConfig[] = [
  {
    name: "temperature",
    label: "Temperature (°C)",
    tableLabel: "TEMP",
    type: "number",
    required: true,
    placeholder: "Enter temperature",
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (mmHg)",
    tableLabel: "B.P",
    required: true,
    placeholder: "e.g. 120/80",
  },
  {
    name: "weight",
    label: "Weight (kg)",
    tableLabel: "WEIGHT",
    type: "number",
    required: true,
    placeholder: "Enter weight",
  },
  {
    name: "height",
    label: "Height (cm)",
    tableLabel: "HEIGHT",
    type: "number",
    required: true,
    placeholder: "Enter height",
  },
  {
    name: "bloodSugar",
    label: "Blood Sugar",
    tableLabel: "B.S",
    type: "number",
    placeholder: "Enter blood sugar",
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
    type: "number",
    placeholder: "Enter pulse rate",
  },
  {
    name: "respiration",
    label: "Respiration",
    tableLabel: "RESP",
    type: "number",
    placeholder: "Enter respiration",
  },
  {
    name: "bmi",
    label: "Body Mass Index (BMI)",
    tableLabel: "BMI",
    readOnly: true,
    placeholder: "Auto-calculated",
  },
  {
    name: "urinalysis",
    label: "Urinalysis",
    tableLabel: "UR",
    placeholder: "Enter urinalysis",
  },
  {
    name: "spo2",
    label: "Peripheral Oxygen Saturation (SpO2)",
    tableLabel: "SPO₂",
    type: "number",
    placeholder: "Enter SpO2",
  },
  {
    name: "fhr",
    label: "Fetal Heart Rate (FHR)",
    tableLabel: "FHR",
    type: "number",
    placeholder: "Enter FHR",
  },
  {
    name: "comment",
    label: "Comments",
    tableLabel: "COMMENT",
    type: "select",
    options: VITAL_COMMENT_OPTIONS,
    showInTable: false,
  },
];

/** Gen Consult — same as ANC vitals without FHR. */
export const genConsultVitalFields: CategoryFieldConfig[] =
  anteNatalVitalFields.filter((field) => field.name !== "fhr");

export const anteNatalVitalTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "temperature", label: "TEMP" },
  { key: "bloodPressure", label: "B.P" },
  { key: "weight", label: "WEIGHT" },
  { key: "height", label: "HEIGHT" },
  { key: "bmi", label: "BMI" },
];

export const genConsultVitalTableColumns = anteNatalVitalTableColumns;
