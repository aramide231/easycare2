import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function PreviousMedicalHistory() {
  const [pmhForm, setPmhForm] = useState<Record<string, string>>({});

  const pmhFields = [
    { name: "heartDisease", label: "Any History of Heart Disease?" },
    { name: "hypertension", label: "Any History of Hypertension?" },
    { name: "kidneyDisease", label: "Any History of Kidney Disease?" },
    { name: "bloodTransfusion", label: "Any History of Blood Transfusion?" },
    { name: "diabetes", label: "Any History of Diabetes?" },
    { name: "chestDisease", label: "Any History of Chest Disease?" },
    { name: "asthma", label: "Any History of Asthma?" },
    { name: "fibroid", label: "Any History of Fibroid?" },
  ];

  const {
    history: prevMedicalHistory,
    save: saveMedicalHistory,
    remove: deleteMedicalHistory,
  } = useMedicalTable("PREVIOUS MEDICAL HISTORY");

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pmhFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <select
              value={pmhForm[field.name] || ""}
              onChange={(e) =>
                setPmhForm({ ...pmhForm, [field.name]: e.target.value })
              }
              className="w-full border rounded p-2 text-sm"
            >
              <option value="">-Select an Option-</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={saveMedicalHistory}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {prevMedicalHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">PREV MEDICAL HISTORY</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Hx Heart Disease</th>
                <th>Hx Hypertension</th>
                <th>Hx Kidney Disease</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {prevMedicalHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.heartDisease}</td>
                  <td>{row.hypertension}</td>
                  <td>{row.kidneyDisease}</td>
                  <td>
                    <button
                      onClick={() => deleteMedicalHistory(index)}
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
