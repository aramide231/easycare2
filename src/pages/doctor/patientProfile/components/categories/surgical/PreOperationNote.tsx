import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function PreOperationNote() {
  const [form, setForm] = useState<Record<string, string>>({});

  const {
    history: preOpHistory,
    save: savePreOp,
    remove: deletePreOp,
  } = useMedicalTable("PRE-OPERATION NOTE");

  const handleSave = () => {
    if (Object.keys(form).length === 0) return;

    savePreOp({
      ...form,
    });

    setForm({});
  };

  const fields = [
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
    // { name: "dateTime", label: "Date | Time", type: "datetime-local", style: { outerWidth: "100%" } },
  ];

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* ===== FORM ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "select" ? (
              <select
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="w-full border rounded p-2"
              >
                <option value="">-Select option-</option>

                {field.name === "genotype" && (
                  <>
                    <option value="AA">AA</option>
                    <option value="AC">AC</option>
                    <option value="AS">AS</option>
                    <option value="CC">CC</option>
                    <option value="SC">SC</option>
                    <option value="SS">SS</option>
                  </>
                )}

                {(field.name === "hiv" || field.name === "hepatitis") && (
                  <>
                    <option value="Positive (+)">{`Positive (+)`}</option>
                    <option value="Negative (-)">{`Negative (-)`}</option>
                  </>
                )}
              
                {field.name === "bloodGroup" && (
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
                )}
                
                {field.name === "operationState" && (
                  <>
                    <option value="Emergency">Emergency</option>
                    <option value="Elective">Elective</option>
                  </>
                )}
               
                {field.name === "consentGiven" && (
                  <>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </>
                )}

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
      {preOpHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">PRE-OPERATION NOTE DETAILS</h4>

          <table className="min-w-max text-sm text-left border">
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
                      onClick={() => deletePreOp(index)}
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
