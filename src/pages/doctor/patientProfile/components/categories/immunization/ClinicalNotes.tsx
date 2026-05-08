import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function ClinicalNotes() {
  const [notes, setNotes] = useState("");

  const {
    history: notesHistory,
    save,
    remove,
  } = useMedicalTable("CLINICAL NOTES");

  const handleSave = () => {
    if (!notes.trim()) return;

    save({
      notes,
    });

    setNotes("");
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      <label className="block mb-2 font-medium">CLINICAL NOTES</label>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border rounded p-3 min-h-[120px]"
      />

      <div className="mt-4 text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {notesHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">CLINICAL NOTES</h4>

          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {notesHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.notes}</td>
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
