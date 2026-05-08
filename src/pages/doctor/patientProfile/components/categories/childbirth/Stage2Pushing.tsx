// import React from 'react'
import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function Stage2Pushing() {
  const [stageTwoForm, setStageTwoForm] = useState<Record<string, string>>({});

  const stageTwoFields = [
    { name: "cervicalDilatation", label: "Cervical Dilatation (4hrly)" },
    { name: "deliveryMode", label: "Mother's Mode of Delivery", type: "select" },
    { name: "apgarScore", label: "APGAR Score", type: "select" },
    { name: "babyGender", label: "Baby's Gender", type: "select" },
    { name: "babyWeight", label: "Baby's Weight (KG)" },
    { name: "babyHeight", label: "Baby's Height (CM)" },
    { name: "babyTemperature", label: "Baby's Temperature" },
    { name: "abnormality", label: "Any Congenital Abnormality in Baby?" },
    { name: "deliveryDateTime", label: "Date + Time of Delivery", type: "datetime-local" },
    { name: "additional", label: "Additional(s)", type: "textarea" },
  ];

  const {
    history: stageTwoHistory,
    save: saveStage2Pushing,
    remove: deleteStage2Pushing,
  } = useMedicalTable("STAGE 2: PUSHING & BIRTHING");

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stageTwoFields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "textarea" ? (
              <textarea
                value={stageTwoForm[field.name] || ""}
                onChange={(e) =>
                  setStageTwoForm({
                    ...stageTwoForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            ) : field.type === "select" ? (
              <select
                value={stageTwoForm[field.name] || ""}
                onChange={(e) =>
                  setStageTwoForm({
                    ...stageTwoForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">-Select option-</option>

                {field.name === "deliveryMode" && (
                  <>
                    <option value="AVD">
                      Assistd Vaginal Delivery {`(AVD)`}
                    </option>
                    <option value="C/S">Cesarean Section {`(C/S)`}</option>
                    <option value="VD">Vaginal Delivery {`(VD)`}</option>
                    <option value="VD">
                      Vaginal Birth After Cesarean {`(VBAC)`}
                    </option>
                    <option value="Vacuum Delivery">Vacuum Delivery</option>
                  </>
                )}

                {field.name === "apgarScore" &&
                  [...Array(11)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}

                {field.name === "babyGender" && (
                  <>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                value={stageTwoForm[field.name] || ""}
                onChange={(e) =>
                  setStageTwoForm({
                    ...stageTwoForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            )}
          </div>
        ))}
      </div>

      {/* SAVE */}
      <div className="mt-4 text-center">
        <button
          onClick={saveStage2Pushing}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {stageTwoHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">PUSHING & BIRTHING DETAILS</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Date | Time</th>
                <th>C.V</th>
                <th>Mode</th>
                <th>APGAR</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {stageTwoHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.cervicalDilatation}</td>
                  <td>{row.deliveryMode}</td>
                  <td>{row.apgarScore}</td>
                  <td>{row.babyGender}</td>
                  <td>
                    <button
                      onClick={() => deleteStage2Pushing(index)}
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
