import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function PhysicalExamination() {

  const [form, setForm] = useState({
    general: "",
    chest: "",
    cvs: "",
    abd: "",
  });

  const {
    history,
    save,
    remove,
  } = useMedicalTable("PHYSICAL EXAMINATION");

  const handleSave = () => {
    const isEmpty =
      !form.general &&
      !form.chest &&
      !form.cvs &&
      !form.abd;

    if (isEmpty) return;

    save(form);

    setForm({
      general: "",
      chest: "",
      cvs: "",
      abd: "",
    });
  };

  const handleChange = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">

      {/* ========= FORM ========= */}

      {/* General */}
      <label className="block mb-1 font-medium">General</label>
      <textarea
        value={form.general}
        onChange={(e) => handleChange("general", e.target.value)}
        className="w-full border rounded p-3 mb-4"
        placeholder="Enter notes here"
      />

      {/* Chest */}
      <label className="block mb-1 font-medium">Chest</label>
      <textarea
        value={form.chest}
        onChange={(e) => handleChange("chest", e.target.value)}
        className="w-full border rounded p-3 mb-4"
        placeholder="Enter notes here"
      />

      {/* CVS */}
      <label className="block mb-1 font-medium">CVS</label>
      <textarea
        value={form.cvs}
        onChange={(e) => handleChange("cvs", e.target.value)}
        className="w-full border rounded p-3 mb-4"
        placeholder="Enter notes here"
      />

      {/* ABD */}
      <label className="block mb-1 font-medium">ABD</label>
      <textarea
        value={form.abd}
        onChange={(e) => handleChange("abd", e.target.value)}
        className="w-full border rounded p-3"
        placeholder="Enter notes here"
      />

      {/* SAVE */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ========= TABLE ========= */}
      {history.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">
            PHYSICAL EXAMINATION
          </h4>

          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>General</th>
                <th>Chest</th>
                <th>CVS</th>
                <th>ABD</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.general}</td>
                  <td>{row.chest}</td>
                  <td>{row.cvs}</td>
                  <td>{row.abd}</td>
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