import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function PostOperationNote() {
  
  const [form, setForm] = useState<Record<string, string>>({});
  
  const fields = [
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
    { name: "swabCount", label: "Swab Count Correct (YES/NO)", type: "select" },
    { name: "bloodLoss", label: "Measured/Estimated Blood Loss" },
    { name: "bloodPressure", label: "Blood Pressure" },
    { name: "pulse", label: "Pulse" },
    { name: "respiration", label: "Respiration / SPO2" },
    { name: "signature", label: "Signature of Surgeon/Assistant" },
    { name: "dateTime", label: "Date | Time", type: "datetime-local" },
  ];

  const {
    history: postOpHistory,
    save: savePostOp,
    remove: deletePostOp,
  } = useMedicalTable("POST-OPERATION NOTE");

  const handleSave = () => {
    if (Object.keys(form).length === 0) return;

    savePostOp({ ...form });
    setForm({});
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* ===== FORM ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="w-full border rounded p-2"
              >
                <option value="">-Select option-</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            ) : (
              <input
                type={field.type || "text"}
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="w-full border rounded p-2"
                placeholder="Input text here"
              />
            )}
          </div>
        ))}
      </div>

      {/* ===== SAVE BUTTON ===== */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ===== HISTORY TABLE ===== */}
      {postOpHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">
            POST-OPERATION NOTE DETAILS
          </h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Surgeon</th>
                <th>Assistant</th>
                <th>Cir. Nurse</th>
                <th>Anaesthetist</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {postOpHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.surgeon}</td>
                  <td>{row.assistant}</td>
                  <td>{row.circulatingNurse}</td>
                  <td>{row.anaesthetist}</td>
                  <td>
                    <button
                      onClick={() => deletePostOp(index)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded"
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