import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function FamilyMedicalHistory() {
  const [fmhForm, setFmhForm] = useState<Record<string, string>>({});

  const fmhFields = [
    { name: "birthDefect", label: "Any History of Birth Defects?" },
    { name: "hypertension", label: "Any History of Hypertension?" },
    { name: "geneticDisorder", label: "Any History of Genetics Disorder?" },
    { name: "downSyndrome", label: "Any History of Down Syndrome?" },
    { name: "tuberculosis", label: "Any History of Tuberculosis?" },
    { name: "diabetes", label: "Any History of Diabetes?" },
    { name: "cysticFibrosis", label: "Any History of Cystic Fibrosis?" },
    { name: "highBloodPressure", label: "Any History of High Blood Pressure?" },
    { name: "autism", label: "Any History of Autism?" },
    { name: "cancer", label: "Any History of Cancer?" },
  ];

  const {
    history: familyMedicalHistory,
    save: saveFamilyMedicalHistory,
    remove: deleteFamilyMedicalHistory,
  } = useMedicalTable("FAMILY MEDICAL HISTORY");
  
  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fmhFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <select
              value={fmhForm[field.name] || ""}
              onChange={(e) =>
                setFmhForm({ ...fmhForm, [field.name]: e.target.value })
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
          onClick={saveFamilyMedicalHistory}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {familyMedicalHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">FAMILY MEDICAL HISTORY</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Hx Birth Defect</th>
                <th>Hx Hypertension</th>
                <th>Hx Genetics</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {familyMedicalHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.birthDefect}</td>
                  <td>{row.hypertension}</td>
                  <td>{row.geneticDisorder}</td>
                  <td>
                    <button
                      onClick={() => deleteFamilyMedicalHistory(index)}
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
