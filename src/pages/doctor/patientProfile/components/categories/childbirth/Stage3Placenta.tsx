import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function Stage3Placenta() {
  const [stageThreeForm, setStageThreeForm] = useState<Record<string, string>>({});

  const stageThreeFields = [
    { name: "placentaDelivery", label: "Placenta Delivery", type: "select" },
    { name: "placentaComplications", label: "Placenta Complications?", type: "select" },
    { name: "estimatedBloodLoss", label: "Estimated Blood Loss (ml)" },
    { name: "hemorrhage", label: "Excessive Bleeding or Hemorrhage?", type: "select" },
    { name: "uterusContraction", label: "Uterus Contraction", type: "select" },
    { name: "uterineAtony", label: "Uterine Atony", type: "select" },
    { name: "bloodPressure", label: "Blood Pressure (B.P)" },
    { name: "tpr", label: "Temperature Pulse Respiration (T.P.R)" },
    { name: "additional", label: "Additional(s)", type: "textarea" },
  ];

  const {
    history: stageThreeHistory,
    save: saveStage3Placenta,
    remove: deleteStage3Placenta,
  } = useMedicalTable("STAGE 3: DELIVERY OF PLACENTA");

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stageThreeFields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "textarea" ? (
              <textarea
                value={stageThreeForm[field.name] || ""}
                onChange={(e) =>
                  setStageThreeForm({
                    ...stageThreeForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            ) : field.type === "select" ? (
              <select
                value={stageThreeForm[field.name] || ""}
                onChange={(e) =>
                  setStageThreeForm({
                    ...stageThreeForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">-Select option-</option>

                {field.name === "placentaDelivery" && (
                  <>
                    <option value="Controlled Cord Traction">
                      Controlled Cord Traction
                    </option>
                    <option value="Manual Removal of Placenta">
                      Manual Removal of Placenta
                    </option>
                  </>
                )}

                {[
                  "placentaComplications",
                  "hemorrhage",
                  "uterusContraction",
                  "uterineAtony",
                ].includes(field.name) && (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type="text"
                value={stageThreeForm[field.name] || ""}
                onChange={(e) =>
                  setStageThreeForm({
                    ...stageThreeForm,
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
          onClick={saveStage3Placenta}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {stageThreeHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">DELIVERY OF PLACENTA</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Placenta Delivery</th>
                <th>Complications</th>
                <th>Estimated Blood Loss</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {stageThreeHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.placentaDelivery}</td>
                  <td>{row.placentaComplications}</td>
                  <td>{row.estimatedBloodLoss}</td>
                  <td>
                    <button
                      onClick={() => deleteStage3Placenta(index)}
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
