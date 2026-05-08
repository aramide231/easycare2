import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

const Stage4DeliveryNote = () => {

  const [stageFourForm, setStageFourForm] = useState<Record<string, any>>({
    noOfBaby: "Single",
    babies: [{}],
  });

  const stageFourFields = [
    { name: "ega", label: "Estimated Gestational Age (E.G.A)" },
    { name: "deliveryMode", label: "Mother's Mode of Delivery", type: "select" },
    { name: "noOfBaby", label: "No of Baby", type: "select" },
    { name: "motherCondition", label: "Mother's Condition" },
    { name: "patientType", label: "Patient Type", type: "select" },
    { name: "clinician", label: "Clinician Name" },
    { name: "deliveryDate", label: "Date + Time of Delivery", type: "datetime-local" },
    { name: "physicalExam", label: "Physical Examination", type: "textarea" },
    { name: "additional", label: "Additional(s)", type: "textarea" },
  ];

  const handleChange = (name: string, value: any) => {

    // Dynamic baby count logic
    if (name === "noOfBaby") {
      const count =
        value === "Twins" ? 2 :
        value === "Triplets" ? 3 : 1;

      setStageFourForm(prev => ({
        ...prev,
        noOfBaby: value,
        babies: Array.from({ length: count }, (_, i) =>
          prev.babies?.[i] || {}
        ),
      }));

      return;
    }

    setStageFourForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBabyChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedBabies = [...stageFourForm.babies];
    updatedBabies[index] = {
      ...updatedBabies[index],
      [field]: value,
    };

    setStageFourForm(prev => ({
      ...prev,
      babies: updatedBabies,
    }));
  };

    const {
      history: stageFourHistory,
      save: saveStage4DeliveryNote,
      remove: deleteStage4DeliveryNote,
    } = useMedicalTable("STAGE 4: DELIVERY NOTE");

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">

      {/* ========= FORM ========= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {stageFourFields.map(field => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label className="block mb-1 font-medium">
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                value={stageFourForm[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full border rounded p-2"
              />
            ) : field.type === "select" ? (
              <select
                value={stageFourForm[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full border rounded p-2"
              >
                <option value="">-Select option-</option>

                {field.name === "deliveryMode" && (
                  <>
                    <option>Vaginal Delivery</option>
                    <option>Cesarean Section (C/S)</option>
                    <option>Emergency Cesarean</option>
                  </>
                )}

                {field.name === "noOfBaby" && (
                  <>
                    <option>Single</option>
                    <option>Twins</option>
                    <option>Triplets</option>
                  </>
                )}

                {field.name === "patientType" && (
                  <>
                    <option>In-Patient</option>
                    <option>Out-Patient</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                value={stageFourForm[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full border rounded p-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* ========= BABIES SECTION ========= */}

      <div className="mt-6">
        <h4 className="font-semibold mb-3 text-purple-600">
          Baby Details
        </h4>

        {stageFourForm.babies.map((baby: any, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-3 mb-3 bg-white"
          >
            <p className="font-semibold mb-2">
              Baby {String.fromCharCode(65 + index)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                placeholder="Weight (Kg)"
                value={baby.weight || ""}
                onChange={(e) =>
                  handleBabyChange(index, "weight", e.target.value)
                }
                className="border rounded p-2"
              />

              <input
                placeholder="Length (CM)"
                value={baby.length || ""}
                onChange={(e) =>
                  handleBabyChange(index, "length", e.target.value)
                }
                className="border rounded p-2"
              />

              <input
                placeholder="Head Circumference (CM)"
                value={baby.headCircumference || ""}
                onChange={(e) =>
                  handleBabyChange(index, "headCircumference", e.target.value)
                }
                className="border rounded p-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* SAVE */}
      <div className="mt-4 text-center">
        <button
          onClick={saveStage4DeliveryNote}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ========= TABLE ========= */}
      {stageFourHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">
            DELIVERY NOTE DETAILS
          </h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Delivery Mode</th>
                <th>No of Baby</th>
                <th>Clinician</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {stageFourHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.deliveryMode}</td>
                  <td>{row.noOfBaby}</td>
                  <td>{row.clinician}</td>
                  <td>
                    <button
                      onClick={() => deleteStage4DeliveryNote(index)}
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

export default Stage4DeliveryNote;
