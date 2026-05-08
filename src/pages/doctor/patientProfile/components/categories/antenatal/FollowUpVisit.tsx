import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function FollowUpVisit() {
  const [followUpForm, setFollowUpForm] = useState<Record<string, string>>({});

  const followUpFields = [
    { name: "ega", label: "Estimated Gestational Age" },
    { name: "heightOfFundus", label: "Height of Fundus (cm)" },
    { name: "presentationPosition", label: "Presentation & Position (bpm)" },
    { name: "relationOfBrim", label: "Relation of Presenting Part of Brim" },
    { name: "foetalHeart", label: "Foetal Heart" },
    { name: "urine", label: "Urine" },
    { name: "bloodPressure", label: "Blood Pressure (mmHg)" },
    { name: "weight", label: "Weight (Kg)" },
    { name: "pcv", label: "PCV" },
    { name: "oedema", label: "Oedema" },
    { name: "findings", label: "Findings", type: "textarea" },
    { name: "nextAppointmentDate", label: "Next Appointment Date", type: "date",},
  ];

   const {
    history: followUpVisits,
    save: saveFollowUp,
    remove: deleteFollowUp
  } = useMedicalTable("FOLLOW-UP VISITS");

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {followUpFields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "textarea" ? (
              <textarea
                value={followUpForm[field.name] || ""}
                onChange={(e) =>
                  setFollowUpForm({
                    ...followUpForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            ) : (
              <input
                type={field.type === "date" ? "date" : "text"}
                value={followUpForm[field.name] || ""}
                onChange={(e) =>
                  setFollowUpForm({
                    ...followUpForm,
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
          onClick={saveFollowUp}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {followUpVisits.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">FOLLOW-UP VISIT</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>EGA</th>
                <th>Height of Fundus</th>
                <th>BPM</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {followUpVisits.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.ega}</td>
                  <td>{row.heightOfFundus}</td>
                  <td>{row.presentationPosition}</td>
                  <td>
                    <button
                      onClick={() => deleteFollowUp(index)}
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
