import { useCallback, useState } from "react";
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
    remove: deletePreOp,
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

      {preOpHistory.length > 0 && (
        <div className="overflow-x-auto">
          <h4 className="mb-2 font-semibold">PRE-OPERATION NOTE DETAILS</h4>

          <table className="min-w-max w-full border text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Pre-Op HB/PCV</th>
                <th>Genotype</th>
                <th>HIV</th>
                <th>Hepatitis</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {preOpHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.preOpHB}</td>
                  <td>{row.genotype}</td>
                  <td>{row.hiv}</td>
                  <td>{row.hepatitis}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deletePreOp(index)}
                      className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
