import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";

const neoNatalVitalFields: CategoryFieldConfig[] = [
  {
    name: "temperature",
    label: "Temperature (°C)",
    tableLabel: "TEMP",
    required: true,
  },
  {
    name: "respiration",
    label: "Respiratory (Bpm)",
    tableLabel: "RES",
    required: true,
  },
  {
    name: "weight",
    label: "Weight (kg)",
    tableLabel: "WEIGHT",
    required: true,
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    tableLabel: "PULSE",
  },
  {
    name: "spo2",
    label: "SPO2",
    tableLabel: "SPO2",
  },
  {
    name: "comment",
    label: "Comments",
    tableLabel: "COMMENT",
    type: "textarea",
    showInTable: false,
  },
];

const neoNatalVitalTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "temperature", label: "TEMP" },
  { key: "weight", label: "WEIGHT" },
  { key: "pulseRate", label: "PULSE" },
  { key: "respiration", label: "RES" },
  { key: "spo2", label: "SPO2" },
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
