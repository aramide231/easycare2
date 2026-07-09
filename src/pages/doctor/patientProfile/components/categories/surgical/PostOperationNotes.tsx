import { useCallback, useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import ProfileInlineFieldGrid, {
  type InlineFieldConfig,
} from "../../category/ProfileInlineFieldGrid";

const fields: InlineFieldConfig[] = [
  { name: "surgeon", label: "Surgeon" },
  { name: "assistant", label: "Assistant" },
  { name: "circulatingNurse", label: "Circulating Nurse" },
  { name: "anaesthetist", label: "Anaesthetists" },
  { name: "anaesthesia", label: "Anaesthesia" },
  { name: "knifeOnSkin", label: "Knife on Skin" },
  { name: "tourniquet", label: "Tourniquet Used and Duration" },
  { name: "patientPosition", label: "Patient's Position" },
  { name: "skinPreparation", label: "Skin Preparation" },
  { name: "exposure", label: "Exposure/Access" },
  { name: "procedureFindings", label: "Procedure/Findings" },
  { name: "closure", label: "Closure of Incision" },
  { name: "duration", label: "Duration of Operation (Skin to Skin)" },
  { name: "sutureMaterials", label: "Suture Materials Used" },
  { name: "drains", label: "Drains" },
  { name: "packs", label: "Packs" },
  { name: "specimen", label: "Specimen" },
  {
    name: "swabCount",
    label: "Swab Count Correct (YES/NO)",
    type: "select",
  },
  { name: "bloodLoss", label: "Measured/Estimated Blood Loss" },
  { name: "bloodPressure", label: "Blood Pressure" },
  { name: "pulse", label: "Pulse" },
  { name: "respiration", label: "Respiration / SPO2" },
  { name: "signature", label: "Signature of Surgeon/Assistant" },
  { name: "dateTime", label: "Date | Time", type: "datetime-local" },
];

export default function PostOperationNote() {
  const [form, setForm] = useState<Record<string, string>>({});

  const {
    history: postOpHistory,
    remove: deletePostOp,
  } = useMedicalTable("POST-OPERATION NOTE");

  const clearForm = useCallback(() => setForm({}), []);

  usePendingCategoryDraft(
    "POST-OPERATION NOTE",
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
    if (field.name === "swabCount") {
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

      {postOpHistory.length > 0 && (
        <div className="overflow-x-auto">
          <h4 className="mb-2 font-semibold">POST-OPERATION NOTE DETAILS</h4>

          <table className="min-w-max w-full border text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Surgeon</th>
                <th>Procedure</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {postOpHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.surgeon}</td>
                  <td>{row.procedureFindings}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deletePostOp(index)}
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
