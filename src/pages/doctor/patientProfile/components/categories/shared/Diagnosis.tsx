import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function Diagnosis() {
  const [diagnosis, setDiagnosis] = useState("");

  const {
    history,
    save,
    remove,
  } = useMedicalTable("DIAGNOSIS");

  /* SAVE DIAGNOSIS */
  const handleSave = () => {
    if (!diagnosis.trim()) return;

    save({
      diagnosis,
    });

    setDiagnosis("");
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">

      {/* FORM */}
      <div>
        <label className="block mb-2 font-medium">
          Diagnosis
        </label>

        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter diagnosis..."
          className="w-full border rounded p-3 min-h-[120px]"
        />
      </div>

      {/* SAVE BUTTON */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSave}
          className="px-8 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* HISTORY TABLE */}
      {history.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">DIAGNOSIS</h4>

          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Diagnosis</th>
                <th>Doctor</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.diagnosis}</td>
                  <td>{row.doctor || "—"}</td>

                  <td>
                    <button
                      onClick={() => remove(index)}
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