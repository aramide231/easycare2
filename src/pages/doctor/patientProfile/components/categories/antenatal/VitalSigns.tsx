import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const vitalFields: CategoryFieldConfig[] = [
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
  { name: "bloodSugar", label: "Blood Sugar", tableLabel: "B.S" },
  { name: "pulseRate", label: "Pulse Rate", tableLabel: "PULSE" },
  { name: "respiration", label: "Respiration (Bpm)", tableLabel: "RESP" },
  { name: "bmi", label: "Body Mass Index (BMI)", tableLabel: "BMI" },
  { name: "urinalysis", label: "Urinalysis", tableLabel: "UR" },
  {
    name: "spo2",
    label: "Peripheral Oxygen Saturation (SpO2)",
    tableLabel: "SPO₂",
  },
  { name: "fhr", label: "Fetal Heart Rate (FHR)", tableLabel: "FHR" },
  { name: "comment", label: "Comments", showInTable: false },
];

export default function VitalSigns() {
  return (
    <CategoryFormWithHistory sectionName="VITAL SIGNS" fields={vitalFields} />
  );
}
