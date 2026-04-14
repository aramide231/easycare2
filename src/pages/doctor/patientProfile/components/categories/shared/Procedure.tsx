import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function Procedure() {

  /* TEMP BUILDER STATE */
  const [procedure, setProcedure] = useState("");

  const [items, setItems] = useState<any[]>([]);

  const procedurePrices: Record<string, number> = {
    "OXYGEN THERAPY": 3000,
    "THERMAL PROTECTION": 2000,
    "VITAMIN K INJECTION": 4000,
  };

  /* MEDICAL TABLE */
  const {
    history,
    save,
    remove,
  } = useMedicalTable("PROCEDURE");

  /* ADD PROCEDURE */
  const addProcedure = () => {
    if (!procedure) return;

    setItems((prev) => [
      ...prev,
      {
        name: procedure,
        price: procedurePrices[procedure] || 0,
        remarks: "",
        doctor: "Dr. Chibuzo Alen", // later dynamic
      },
    ]);

    setProcedure("");
  };

  /* UPDATE REMARKS */
  const updateRemark = (index: number, value: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, remarks: value } : item
      )
    );
  };

  /* REMOVE TEMP ROW */
  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  /* TOTAL */
  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  /* FINAL SAVE */
  const handleSave = () => {
    if (!items.length) return;

    save({
      procedures: items,
      total,
    });

    setItems([]);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">

      {/* SELECT PROCEDURE */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block mb-1 font-medium">
            Procedure
          </label>

          <select
            value={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Procedure</option>
            {Object.keys(procedurePrices).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <button
          onClick={addProcedure}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TEMP TABLE */}
      {items.length > 0 && (
        <div className="mt-5 space-y-2">

          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-3 items-center border-b py-2"
            >
              <span>{index + 1}</span>
              <span>{item.name}</span>
              <span>₦ {item.price.toLocaleString()}</span>

              <input
                value={item.remarks}
                onChange={(e) =>
                  updateRemark(index, e.target.value)
                }
                placeholder="Remarks"
                className="border rounded p-1"
              />

              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {item.doctor}
                </span>

                <button
                  onClick={() => removeItem(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-semibold pt-2">
            TOTAL ₦ {total.toLocaleString()}
          </div>
        </div>
      )}

      {/* FINAL SAVE */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          className="px-8 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* HISTORY TABLE */}
      {history.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">PROCEDURE</h4>

          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Procedure</th>
                <th>Price</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>
                    {row.procedures
                      ?.map((p: any) => p.name)
                      .join(", ")}
                  </td>
                  <td>₦ {row.total?.toLocaleString()}</td>
                  <td>
                    {row.procedures
                      ?.map((p: any) => p.remarks)
                      .join(", ")}
                  </td>
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