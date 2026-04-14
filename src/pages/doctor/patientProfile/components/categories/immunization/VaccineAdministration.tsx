import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

const VaccineAdministration = () => {

  /* ================= FORM STATE ================= */
  const [vaccineForm, setVaccineForm] = useState<Record<string, any>>({});
  const [vaccineRow, setVaccineRow] = useState<Record<string, string>>({});
  const [vaccines, setVaccines] = useState<any[]>([]);

  /* ================= FIELD CONFIG ================= */
  const vaccineFields = [
    { name: "ageGrade", label: "Age Grade", type: "select" },
    { name: "period", label: "Period", type: "select" },
  ];

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (name: string, value: any) => {
    setVaccineForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= MEDICAL TABLE HOOK ================= */
  const {
    history: vaccineHistory,
    save: saveMedicalRecord,
    remove: deleteMedicalRecord,
  } = useMedicalTable("VACCINE ADMINISTRATION");

  /* ================= ADD VACCINE ================= */
  const addVaccine = () => {
    if (!vaccineRow.vaccine) return;

    setVaccines(prev => [
      ...prev,
      { ...vaccineRow }
    ]);

    setVaccineRow({});
  };

  const removeVaccine = (index: number) => {
    setVaccines(prev => prev.filter((_, i) => i !== index));
  };

  /* ================= SAVE ================= */
  const handleSave = () => {

    if (vaccines.length === 0) return;

    saveMedicalRecord({
      ...vaccineForm,
      vaccines,
    });

    setVaccines([]);
    setVaccineForm({});
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">

      {/* ========= TOP FORM ========= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {vaccineFields.map(field => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">
              {field.label}
            </label>

            <select
              value={vaccineForm[field.name] || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              className="w-full border rounded p-2"
            >
              <option value="">-Select an Option-</option>

              {field.name === "ageGrade" && (
                <>
                  <option>At Birth</option>
                  <option>6 Weeks</option>
                  <option>10 Weeks</option>
                  <option>14 Weeks</option>
                  <option>9 Months</option>
                </>
              )}

              {field.name === "period" && (
                <>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </>
              )}

            </select>
          </div>
        ))}

      </div>


      {/* ========= VACCINE ENTRY ========= */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">

        <div>
          <label className="block mb-1 font-medium">
            Type of Vaccine
          </label>

          <select
            className="w-full border rounded p-2"
            value={vaccineRow.vaccine || ""}
            onChange={(e) =>
              setVaccineRow({
                ...vaccineRow,
                vaccine: e.target.value
              })
            }
          >
            <option value="">-Select vaccine-</option>
            <option>BCG</option>
            <option>OPV</option>
            <option>Penta</option>
            <option>Measles</option>
            <option>Yellow Fever</option>
          </select>
        </div>


        <div>
          <label className="block mb-1 font-medium">Dosage</label>
          <input
            className="w-full border rounded p-2"
            value={vaccineRow.dosage || ""}
            onChange={(e) =>
              setVaccineRow({
                ...vaccineRow,
                dosage: e.target.value
              })
            }
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">
            Administration Route
          </label>
          <input
            className="w-full border rounded p-2"
            value={vaccineRow.route || ""}
            onChange={(e) =>
              setVaccineRow({
                ...vaccineRow,
                route: e.target.value
              })
            }
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">
            Site (Body Part)
          </label>
          <input
            className="w-full border rounded p-2"
            value={vaccineRow.site || ""}
            onChange={(e) =>
              setVaccineRow({
                ...vaccineRow,
                site: e.target.value
              })
            }
          />
        </div>


        <button
          onClick={addVaccine}
          className="h-[38px] bg-purple-600 text-white rounded px-4"
        >
          Add
        </button>

      </div>


      {/* ========= TEMP VACCINE LIST ========= */}
      {vaccines.length > 0 && (
        <div className="mt-6 overflow-x-auto">

          <table className="min-w-max text-sm text-left border">

            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Vaccine</th>
                <th>Dosage</th>
                <th>Route</th>
                <th>Site</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {vaccines.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{row.vaccine}</td>
                  <td>{row.dosage}</td>
                  <td>{row.route}</td>
                  <td>{row.site}</td>

                  <td>
                    <button
                      onClick={() => removeVaccine(index)}
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


      {/* ========= EXTRA DETAILS ========= */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          className="border rounded p-2"
          placeholder="Weight"
          value={vaccineForm.weight || ""}
          onChange={(e) =>
            handleChange("weight", e.target.value)
          }
        />

        <input
          className="border rounded p-2"
          placeholder="Comment"
          value={vaccineForm.comment || ""}
          onChange={(e) =>
            handleChange("comment", e.target.value)
          }
        />

      </div>


      {/* ========= SAVE ========= */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>


      {/* ========= MEDICAL TABLE ========= */}
      {vaccineHistory.length > 0 && (

        <div className="mt-6 overflow-x-auto">

          <h4 className="font-semibold mb-2">
            VACCINE ADMINISTRATION DETAILS
          </h4>

          <table className="min-w-max text-sm text-left border">

            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Age Grade</th>
                <th>Total Vaccines</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {vaccineHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">

                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.ageGrade}</td>
                  <td>{row.vaccines?.length}</td>

                  <td>
                    <button
                      onClick={() => deleteMedicalRecord(index)}
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
};

export default VaccineAdministration;
