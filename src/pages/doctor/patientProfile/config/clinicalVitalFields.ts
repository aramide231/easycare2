import type { CategoryFieldConfig } from "./categoryFieldTypes";
import { VITAL_COMMENT_OPTIONS } from "./vitalFieldOptions";

/** Full ANC / Ante Natal vital signs (includes FHR). */
export const anteNatalVitalFields: CategoryFieldConfig[] = [
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
    name: "bloodSugar",
    label: "Blood Sugar",
    tableLabel: "B.S",
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
  },
  {
    name: "respiration",
    label: "Respiration",
    tableLabel: "RESP",
  },
  { name: "bmi", label: "Body Mass Index (BMI)", tableLabel: "BMI" },
  {
    name: "urinalysis",
    label: "Urinalysis",
    tableLabel: "UR",
  },
  {
    name: "spo2",
    label: "Peripheral Oxygen Saturation (SpO2)",
    tableLabel: "SPO₂",
  },
  {
    name: "fhr",
    label: "Fetal Heart Rate (FHR)",
    tableLabel: "FHR",
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
  { key: "bloodSugar", label: "B.S" },
  { key: "pulseRate", label: "PULSE" },
  { key: "respiration", label: "RESP" },
  { key: "bmi", label: "BMI" },
  { key: "urinalysis", label: "UR" },
  { key: "spo2", label: "SPO₂" },
  { key: "fhr", label: "FHR" },
  { key: "comment", label: "COMMENT" },
];

export const genConsultVitalTableColumns = anteNatalVitalTableColumns.filter(
  (column) => column.key !== "fhr",
);
