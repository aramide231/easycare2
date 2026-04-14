// import React from "react";
import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function Stage1Labour() {
  const [stageOneLabourForm, setStageOneLabourForm] = useState<
    Record<string, string>
  >({});

  const stageOneLabourFields = [
    { name: "patientType", label: "Patient Type", type: "select" },
    { name: "intensity", label: "Intensity of Contractions", type: "select" },
    { name: "cervicalDilatation", label: "Cervical Dilatation (4hrly)" },
    { name: "presentation", label: "Presentation", type: "select" },
    { name: "fhr", label: "Fetal Heart Rate (FHR)" },
    { name: "bloodPressure", label: "Blood Pressure (B.P)" },
    { name: "tpr", label: "Temperature Pulse Respiration (T.P.R)" },
    { name: "additional", label: "Additional(s)", type: "textarea" },
  ];

    const {
      history: stageOneLabourHistory,
      save: saveStage1Labour,
      remove: deleteStage1Labour,
    } = useMedicalTable("STAGE 1: LABOUR");

    return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stageOneLabourFields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "textarea" ? (
              <textarea
                value={stageOneLabourForm[field.name] || ""}
                onChange={(e) =>
                  setStageOneLabourForm({
                    ...stageOneLabourForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            ) : field.type === "select" ? (
              <select
                value={stageOneLabourForm[field.name] || ""}
                onChange={(e) =>
                  setStageOneLabourForm({
                    ...stageOneLabourForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">-Select option-</option>

                {field.name === "patientType" && (
                  <>
                    <option value="Booked">Booked</option>
                    <option value="UnBooked">UnBooked</option>
                  </>
                )}

                {field.name === "intensity" && (
                  <>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </>
                )}

                {field.name === "presentation" && (
                  <>
                    <option value="Breech">Breech</option>
                    <option value="Cephalic">Cephalic</option>
                    <option value="Transverse">Transverse</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type="text"
                value={stageOneLabourForm[field.name] || ""}
                onChange={(e) =>
                  setStageOneLabourForm({
                    ...stageOneLabourForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            )}
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <div className="mt-4 text-center">
        <button
          onClick={saveStage1Labour}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {stageOneLabourHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">LABOUR DETAILS</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date</th>
                <th>Patient Type</th>
                <th>Intensity</th>
                <th>C.V</th>
                <th>Presentation</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {stageOneLabourHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.intensity}</td>
                  <td>{row.cervicalDilatation}</td>
                  <td>{row.presentation}</td>
                  <td>
                    <button
                      onClick={() => deleteStage1Labour(index)}
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
