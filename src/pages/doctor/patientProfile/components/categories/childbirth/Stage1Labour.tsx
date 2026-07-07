import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";
import {
  BOOKED_PATIENT_OPTIONS,
  CONTRACTION_INTENSITY_OPTIONS,
  PRESENTATION_OPTIONS,
} from "./childbirthFieldOptions";

const labourFields: CategoryFieldConfig[] = [
  {
    name: "patientType",
    label: "Patient Type",
    type: "select",
    placeholder: "-Select option-",
    options: BOOKED_PATIENT_OPTIONS,
    tableLabel: "PATIENT TYPE",
  },
  {
    name: "intensity",
    label: "Intensity of Contractions",
    type: "select",
    placeholder: "-Select option-",
    options: CONTRACTION_INTENSITY_OPTIONS,
    tableLabel: "INT. OF CONT.",
  },
  {
    name: "cervicalDilatation",
    label: "Cervical Dilatation (4hrly)",
    placeholder: "-Input dilation-",
    tableLabel: "C.V",
  },
  {
    name: "presentation",
    label: "Presentation",
    type: "select",
    placeholder: "-Select option-",
    options: PRESENTATION_OPTIONS,
    tableLabel: "PRESENTATION",
  },
  {
    name: "fhr",
    label: "Fetal Heart Rate (FHR)",
    placeholder: "-Input FHR-",
    showInTable: false,
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure (B.P)",
    placeholder: "-Input B.P-",
    showInTable: false,
  },
  {
    name: "tpr",
    label: "Temperature Pulse Respiration (T.P.R)",
    placeholder: "-Input TPR-",
    fullWidth: true,
    showInTable: false,
  },
  {
    name: "additional",
    label: "Additional(s)",
    type: "textarea",
    placeholder: "Enter notes here",
    fullWidth: true,
    showInTable: false,
  },
];

const labourTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "intensity", label: "INT. OF CONT." },
  { key: "cervicalDilatation", label: "C.V" },
  { key: "presentation", label: "PRESENTATION" },
];

export default function Stage1Labour() {
  return (
    <CategoryFormWithHistory
      sectionName="STAGE 1: LABOUR"
      tableKey="CHILD BIRTH — STAGE 1: LABOUR"
      fields={labourFields}
      detailsTitle="LABOUR DETAILS"
      fullWidth
      includeMetaColumns={false}
      tableColumns={labourTableColumns}
    />
  );
}
