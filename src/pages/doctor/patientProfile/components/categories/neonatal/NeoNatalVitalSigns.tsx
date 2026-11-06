import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const neoNatalVitalFields: CategoryFieldConfig[] = [
  {
    name: "temperature",
    label: "Temperature (°C)",
    tableLabel: "TEMP",
    type: "number",
    placeholder: "e.g. 36.5",
    required: true,
  },
  {
    name: "respiration",
    label: "Respiratory (Bpm)",
    tableLabel: "RES",
    type: "number",
    placeholder: "e.g. 40",
    required: true,
  },
  {
    name: "weight",
    label: "Weight (kg)",
    tableLabel: "WEIGHT",
    type: "number",
    placeholder: "e.g. 3.2",
    required: true,
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
    type: "number",
    placeholder: "e.g. 130",
  },
  {
    name: "spo2",
    label: "SPO2",
    tableLabel: "SPO2",
    type: "number",
    placeholder: "e.g. 98",
  },
  {
    name: "comment",
    label: "Comments",
    tableLabel: "COMMENT",
    type: "textarea",
    placeholder: "Enter comments",
  },
];

const neoNatalVitalTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "temperature", label: "TEMP" },
  { key: "respiration", label: "RES" },
  { key: "weight", label: "WEIGHT" },
  { key: "pulseRate", label: "PULSE" },
  { key: "spo2", label: "SPO2" },
  { key: "comment", label: "COMMENT" },
];

export default function NeoNatalVitalSigns() {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      fields={neoNatalVitalFields}
      tableColumns={neoNatalVitalTableColumns}
      showSaveButton
    />
  );
}
