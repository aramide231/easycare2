import type { CategoryFieldConfig } from "./categoryFieldTypes";
import { VITAL_COMMENT_OPTIONS } from "./vitalFieldOptions";

/** Full ANC / Ante Natal vital signs (includes FHR). */
export const anteNatalVitalFields: CategoryFieldConfig[] = [
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
    name: "bloodSugar",
    label: "Blood Sugar",
    tableLabel: "B.S",
    type: "number",
    placeholder: "e.g. 95",
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
    type: "number",
    placeholder: "e.g. 72",
  },
  {
    name: "respiration",
    label: "Respiration",
    tableLabel: "RESP",
    type: "number",
    placeholder: "e.g. 16",
  },
  {
    name: "bmi",
    label: "Body Mass Index (BMI)",
    tableLabel: "BMI",
    readOnly: true,
    placeholder: "Auto-calculated (kg/m²)",
  },
  {
    name: "urinalysis",
    label: "Urinalysis",
    tableLabel: "UR",
    placeholder: "Enter urinalysis result",
  },
  {
    name: "spo2",
    label: "Peripheral Oxygen Saturation (SpO2)",
    tableLabel: "SPO₂",
    type: "number",
    placeholder: "e.g. 98",
  },
  {
    name: "fhr",
    label: "Fetal Heart Rate (FHR)",
    tableLabel: "FHR",
    type: "number",
    placeholder: "e.g. 140",
  },
  {
    name: "comment",
    label: "Comments",
    tableLabel: "COMMENT",
    type: "select",
    options: VITAL_COMMENT_OPTIONS,
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
  { key: "bloodSugar", label: "B.S" },
  { key: "pulseRate", label: "PULSE" },
  { key: "respiration", label: "RESP" },
  { key: "urinalysis", label: "UR" },
  { key: "spo2", label: "SPO₂" },
  { key: "fhr", label: "FHR" },
  { key: "comment", label: "COMMENT" },
];

export const genConsultVitalTableColumns = anteNatalVitalTableColumns.filter(
  (col) => col.key !== "fhr"
);
