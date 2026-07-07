import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";
import { SWAB_COUNT_OPTIONS } from "./surgicalFieldOptions";

const postOpFields: CategoryFieldConfig[] = [
  {
    name: "surgeon",
    label: "Surgeon",
    tableLabel: "SURGEON",
    placeholder: "-input (name) text here-",
  },
  {
    name: "assistant",
    label: "Assistant",
    tableLabel: "ASSISTANT",
    placeholder: "-input (name) text here-",
  },
  {
    name: "circulatingNurse",
    label: "Circulating Nurse",
    tableLabel: "CIR. NURSE",
    placeholder: "-input (name) text here-",
  },
  {
    name: "anaesthetist",
    label: "Anaesthetists",
    tableLabel: "ANAESTHETISTS",
    placeholder: "-input (name) text here-",
  },
  {
    name: "anaesthesia",
    label: "Anaesthesia",
    placeholder: "-input (name) text here-",
    showInTable: false,
  },
  {
    name: "knifeOnSkin",
    label: "Knife on Skin",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "tourniquet",
    label: "Torniquete Used and Duration",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "patientPosition",
    label: "Patient's Position",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "skinPreparation",
    label: "Skin Preparation",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "exposure",
    label: "Exposure/Access",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "procedureFindings",
    label: "Procedure/Findings",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "closure",
    label: "Closure of Incision",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "duration",
    label: "Duration of Operation (Skin to Skin)",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "sutureMaterials",
    label: "Suture Materials Used",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "drains",
    label: "Drains",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "packs",
    label: "Packs",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "specimen",
    label: "Specimen",
    placeholder: "-input text here-",
    showInTable: false,
  },
  {
    name: "swabCount",
    label: "Swab Count Correct (YES/NO)",
    type: "select",
    placeholder: "-Select option-",
    options: SWAB_COUNT_OPTIONS,
    showInTable: false,
  },
  {
    name: "bloodLoss",
    label: "Measured/Estimated Blood Loss",
    placeholder: "-mls-",
    showInTable: false,
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure",
    placeholder: "-mmHg-",
    showInTable: false,
  },
  {
    name: "pulse",
    label: "Pulse",
    placeholder: "-bpm-",
    showInTable: false,
  },
  {
    name: "respiration",
    label: "Respiration / SPO2",
    placeholder: "-cpm%-",
    showInTable: false,
  },
  {
    name: "signature",
    label: "Signature of Surgeon/Assistant",
    placeholder: "-name of clinician-",
    showInTable: false,
  },
  {
    name: "recordedAt",
    label: "Date | Time",
    type: "date",
    placeholder: "capture cur date & time",
    fullWidth: true,
    showInTable: false,
  },
];

const postOpTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "surgeon", label: "SURGEON" },
  { key: "assistant", label: "ASSISTANT" },
  { key: "circulatingNurse", label: "CIR. NURSE" },
  { key: "anaesthetist", label: "ANAESTHETISTS" },
];

export default function PostOperationNote() {
  return (
    <CategoryFormWithHistory
      sectionName="POST-OPERATION NOTE"
      tableKey="SURGICAL — POST-OPERATION NOTE"
      fields={postOpFields}
      detailsTitle="POST-OPERATION NOTE DETAILS"
      fullWidth
      tableColumns={postOpTableColumns}
    />
  );
}
