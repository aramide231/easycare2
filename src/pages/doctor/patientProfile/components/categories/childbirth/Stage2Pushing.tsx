import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";
import {
  APGAR_OPTIONS,
  DELIVERY_MODE_OPTIONS,
  GENDER_OPTIONS,
} from "./childbirthFieldOptions";

const pushingFields: CategoryFieldConfig[] = [
  {
    name: "cervicalDilatation",
    label: "Cervical Dilatation (4hrly)",
    placeholder: "-Input dilation-",
    tableLabel: "C.V",
  },
  {
    name: "deliveryMode",
    label: "Mother's Mode of Delivery",
    type: "select",
    placeholder: "-Select option-",
    options: DELIVERY_MODE_OPTIONS,
    tableLabel: "MODE",
  },
  {
    name: "apgarScore",
    label: "APGAR Score",
    type: "select",
    placeholder: "-Select option-",
    options: APGAR_OPTIONS,
    tableLabel: "APGAR SCORE",
  },
  {
    name: "babyGender",
    label: "Baby's Gender",
    type: "select",
    placeholder: "-Select option-",
    options: GENDER_OPTIONS,
    tableLabel: "GENDER",
  },
  {
    name: "babyWeight",
    label: "Baby's Weight",
    placeholder: "-Input weight in KG-",
    showInTable: false,
  },
  {
    name: "babyHeight",
    label: "Baby's Height",
    placeholder: "-Input height in CM-",
    showInTable: false,
  },
  {
    name: "babyTemperature",
    label: "Baby's Temperature",
    placeholder: "-Input temperature in TEMP-",
    showInTable: false,
  },
  {
    name: "abnormality",
    label: "Any Congenital Abnormality in Baby?",
    placeholder: "Enter notes here",
    showInTable: false,
  },
  {
    name: "deliveryDateTime",
    label: "Date + Time of Delivery",
    type: "date",
    placeholder: "-Input date and time-",
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

const pushingTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter(
    (c) => c.key !== "enteredBy" && c.key !== "patientType",
  ),
  { key: "cervicalDilatation", label: "C.V" },
  { key: "deliveryMode", label: "MODE" },
  { key: "apgarScore", label: "APGAR SCORE" },
  { key: "babyGender", label: "GENDER" },
];

export default function Stage2Pushing() {
  return (
    <CategoryFormWithHistory
      sectionName="STAGE 2: PUSHING & BIRTHING"
      tableKey="CHILD BIRTH — STAGE 2: PUSHING & BIRTHING"
      fields={pushingFields}
      detailsTitle="PUSHING & BIRTHING DETAILS"
      fullWidth
      includeMetaColumns={false}
      tableColumns={pushingTableColumns}
    />
  );
}
