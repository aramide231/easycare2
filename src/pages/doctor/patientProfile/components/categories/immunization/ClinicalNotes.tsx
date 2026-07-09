import { useCallback, useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import { formFieldTextareaClass } from "../../../lib/formFieldStyles";

export default function ClinicalNotes() {
  const [notes, setNotes] = useState("");

  const { history: notesHistory, remove } = useMedicalTable("CLINICAL NOTES");

  const clearForm = useCallback(() => setNotes(""), []);

  usePendingCategoryDraft(
    "CLINICAL NOTES",
    () => {
      if (!notes.trim()) return null;
      return { notes };
    },
    [notes],
    clearForm
  );

  return (
    <div className="space-y-6 text-sm">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          CLINICAL NOTES
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={formFieldTextareaClass}
          rows={6}
        />
      </div>

      {notesHistory.length > 0 && (
        <div className="overflow-x-auto">
          <h4 className="mb-2 font-semibold">CLINICAL NOTES</h4>

          <table className="min-w-full border text-left text-sm">
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
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded bg-red-500 px-2 py-1 text-xs text-white"
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
