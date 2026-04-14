import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function PreviousPregnancyHistory() {
  const [pregnancyForm, setPregnancyForm] = useState<Record<string, string>>(
    {},
  );

  const pregnancyFields = [
    { name: "totalGP", label: "Total Gravidity & Parity (G/P)" },
    { name: "livingChildren", label: "Number of Living Children" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "durationOfPregnancy", label: "Duration Of Pregnancy" },
    { name: "birthWeight", label: "Birth Weight (Kg)" },
    { name: "pregnancyOutcome", label: "Pregnancy, Labour & Puerperium" },
    { name: "babyCondition", label: "Baby’s Condition" },
    { name: "babyGender", label: "Baby’s Gender" },
  ];

  const {
    history: pregnancyHistory,
    save: savePreganancy,
    remove: deletePreganancy,
  } = useMedicalTable("PREVIOUS PREGNANCY HISTORY");

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pregnancyFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "date" ? (
              <input
                type="date"
                value={pregnancyForm[field.name] || ""}
                onChange={(e) =>
                  setPregnancyForm({
                    ...pregnancyForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            ) : (
              <input
                type="text"
                value={pregnancyForm[field.name] || ""}
                onChange={(e) =>
                  setPregnancyForm({
                    ...pregnancyForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={savePreganancy}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {pregnancyHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">PREVIOUS PREGNANCY HISTORY</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Total G/P</th>
                <th>No. Living Children</th>
                <th>D.O.B</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {pregnancyHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.totalGP}</td>
                  <td>{row.livingChildren}</td>
                  <td>{row.dateOfBirth}</td>
                  <td>
                    <button
                      onClick={() => deletePreganancy(index)}
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
