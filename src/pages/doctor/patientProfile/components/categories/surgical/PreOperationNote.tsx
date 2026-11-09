import { useCallback, useState } from "react";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import ProfileInlineFieldGrid, {
  type InlineFieldConfig,
} from "../../category/ProfileInlineFieldGrid";

const fields: InlineFieldConfig[] = [
  { name: "preOpHB", label: "Pre-Operative HB/PCV" },
  { name: "genotype", label: "Genotype", type: "select" },
  { name: "hiv", label: "HIV", type: "select" },
  { name: "hepatitis", label: "Hepatitis", type: "select" },
  { name: "otherInvestigations", label: "Other Investigations" },
  { name: "bloodGroup", label: "Blood Group", type: "select" },
  { name: "allergies", label: "Allergies" },
  { name: "previousDrugHistory", label: "Previous Drug History" },
  { name: "operationProposed", label: "Operation Proposed" },
  { name: "indication", label: "Indication for Operation" },
  { name: "operationState", label: "Operation State", type: "select" },
  { name: "proposedDate", label: "Proposed Date of Operation" },
  { name: "consentGiven", label: "Consent Given", type: "select" },
  { name: "signature", label: "Signature" },
  { name: "dateTime", label: "Date | Time", type: "datetime-local" },
];

export default function PreOperationNote() {
  const [form, setForm] = useState<Record<string, string>>({});

  const {
    history: preOpHistory,
  } = useMedicalTable("PRE-OPERATION NOTE");

  const clearForm = useCallback(() => setForm({}), []);

  usePendingCategoryDraft(
    "PRE-OPERATION NOTE",
    () => {
      const hasValue = Object.values(form).some((value) => value?.trim());
      if (!hasValue) return null;
      return { ...form };
    },
    [form],
    clearForm
  );

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderSelectOptions = (field: InlineFieldConfig) => {
    if (field.name === "genotype") {
      return (
        <>
          <option value="AA">AA</option>
          <option value="AC">AC</option>
          <option value="AS">AS</option>
          <option value="CC">CC</option>
          <option value="SC">SC</option>
          <option value="SS">SS</option>
        </>
      );
    }

    if (field.name === "hiv" || field.name === "hepatitis") {
      return (
        <>
          <option value="Positive (+)">Positive (+)</option>
          <option value="Negative (-)">Negative (-)</option>
        </>
      );
    }

    if (field.name === "bloodGroup") {
      return (
        <>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB">AB</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </>
      );
    }

    if (field.name === "operationState") {
      return (
        <>
          <option value="Emergency">Emergency</option>
          <option value="Elective">Elective</option>
        </>
      );
    }

    if (field.name === "consentGiven") {
      return (
        <>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 text-sm">
      <ProfileInlineFieldGrid
        fields={fields}
        values={form}
        onChange={handleChange}
        renderSelectOptions={renderSelectOptions}
      />

      <CategoryMedicalTable
        title="PRE-OPERATION NOTE DETAILS"
        columns={[
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "preOpHB", label: "PRE-OP HB/PCV" },
  { key: "genotype", label: "GENOTYPE" },
  { key: "hiv", label: "HIV" },
  { key: "hepatitis", label: "HEPATITIS" },
  { key: "bloodGroup", label: "BLOOD GROUP" },
  { key: "allergies", label: "ALLERGIES" },
  { key: "operationProposed", label: "OPERATION PROPOSED" },
  { key: "indication", label: "INDICATION" },
  { key: "operationState", label: "OPERATION STATE" },
  { key: "proposedDate", label: "PROPOSED DATE" },
  { key: "consentGiven", label: "CONSENT GIVEN" },
  { key: "signature", label: "SIGNATURE" },
]}
        rows={preOpHistory}
        emptyMessage="No pre-operation notes recorded yet."
      />
    </div>
  );
}
