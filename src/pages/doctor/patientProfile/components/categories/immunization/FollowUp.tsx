import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function FollowUp() {

  const [form, setForm] = useState<Record<string, string>>({});

  const {
    history: followUpHistory,
    save: saveFollowUp,
    remove: deleteFollowUp,
  } = useMedicalTable("FOLLOW-UP");


  const handleSave = () => {
    if (!form.nextDoseDate && !form.notes) return;

    saveFollowUp({
      appointmentDate: form.nextDoseDate,
      nurse: form.nurse || "TOBA AYO",
      notes: form.notes,
    });

    setForm({});
  };


  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* ===== FORM ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">
            Next Dose Due Date
          </label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.nextDoseDate || ""}
            onChange={(e) =>
              setForm({ ...form, nextDoseDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Follow-up Notes
          </label>
          <textarea
            className="w-full border rounded p-2"
            value={form.notes || ""}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-medium">
          FOLLOW-UP NOTES
        </label>
        <textarea
          className="w-full border rounded p-2"
          value={form.extraNotes || ""}
          onChange={(e) =>
            setForm({ ...form, extraNotes: e.target.value })
          }
        />
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
      {followUpHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">FOLLOW-UP VISIT</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Appointment Date</th>
                <th>Nurse</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {followUpHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType || "OPD"}</td>
                  <td>{row.appointmentDate}</td>
                  <td>{row.nurse}</td>
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