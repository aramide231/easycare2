import type { CategoryFieldConfig } from "../../../config/categoryFieldTypes";
import { DEFAULT_META_TABLE_COLUMNS } from "../../../config/categoryFieldTypes";
import { CategoryFormWithHistory } from "../../category";
import {
  BLOOD_GROUP_OPTIONS,
  GENOTYPE_OPTIONS,
  OPERATION_STATE_OPTIONS,
  TEST_RESULT_OPTIONS,
  YES_NO_OPTIONS,
} from "./surgicalFieldOptions";

const preOpFields: CategoryFieldConfig[] = [
  {
    name: "preOpHB",
    label: "Pre-Operative HB/PCV",
    tableLabel: "PRE-OPERATIVE HB/PCV",
    placeholder: "-Input text here-",
  },
  {
    name: "genotype",
    label: "Genotype",
    tableLabel: "GENOTYPE",
    type: "select",
    placeholder: "-Select option-",
    options: GENOTYPE_OPTIONS,
  },
  {
    name: "hiv",
    label: "HIV",
    tableLabel: "HIV",
    type: "select",
    placeholder: "-Select option-",
    options: TEST_RESULT_OPTIONS,
  },
  {
    name: "hepatitis",
    label: "Hepatitis",
    tableLabel: "HEPATITIS",
    type: "select",
    placeholder: "-Select option-",
    options: TEST_RESULT_OPTIONS,
  },
  {
    name: "otherInvestigations",
    label: "Other Investigations",
    placeholder: "-Input text here-",
    showInTable: false,
  },
  {
    name: "bloodGroup",
    label: "Blood Group",
    type: "select",
    placeholder: "-Select option-",
    options: BLOOD_GROUP_OPTIONS,
    showInTable: false,
  },
  {
    name: "allergies",
    label: "Allergies",
    placeholder: "-Input text here-",
    showInTable: false,
  },
  {
    name: "previousDrugHistory",
    label: "Previous Drug History",
    placeholder: "-Input text here-",
    showInTable: false,
  },
  {
    name: "operationProposed",
    label: "Operation Proposed",
    placeholder: "-Input text here-",
    showInTable: false,
  },
  {
    name: "indication",
    label: "Indication for Operation",
    placeholder: "-Input text here-",
    showInTable: false,
  },
  {
    name: "operationState",
    label: "Operation State",
    type: "select",
    placeholder: "-Select option-",
    options: OPERATION_STATE_OPTIONS,
    showInTable: false,
  },
  {
    name: "proposedDate",
    label: "Proposed Date of Operation",
    type: "date",
    placeholder: "-Input text here-",
    showInTable: false,
  },
  {
    name: "consentGiven",
    label: "Consent Given",
    type: "select",
    placeholder: "-Select option-",
    options: YES_NO_OPTIONS,
    showInTable: false,
  },
  {
    name: "signature",
    label: "Signature",
    placeholder: "-Name of clinician-",
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

const preOpTableColumns = [
  ...DEFAULT_META_TABLE_COLUMNS.filter((c) => c.key !== "enteredBy"),
  { key: "preOpHB", label: "PRE-OPERATIVE HB/PCV" },
  { key: "genotype", label: "GENOTYPE" },
  { key: "hiv", label: "HIV" },
  { key: "hepatitis", label: "HEPATITIS" },
];

export default function PreOperationNote() {
  return (
    <CategoryFormWithHistory
      sectionName="PRE-OPERATION NOTE"
      tableKey="SURGICAL — PRE-OPERATION NOTE"
      fields={preOpFields}
      detailsTitle="PRE-OPERATION NOTE DETAILS"
      fullWidth
      tableColumns={preOpTableColumns}
    />
  );
}
