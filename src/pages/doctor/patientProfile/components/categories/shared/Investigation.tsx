import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function Investigation() {

  const [investigation, setInvestigation] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<any[]>([]);

  const {
    history,
    save,
    remove,
  } = useMedicalTable("INVESTIGATION");

  const addItem = () => {
    if (!investigation || !price) return;

    setItems((prev) => [
      ...prev,
      {
        name: investigation,
        price: Number(price),
      },
    ]);

    setInvestigation("");
    setPrice("");
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!items.length) return;

    save({
      investigations: items,
      total: totalAmount,
    });

    setItems([]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">

      {/* ========= INPUT SECTION ========= */}
      <div className="flex flex-wrap gap-3 items-end">

        <div className="flex-1">
          <label className="block mb-1 font-medium">
            Investigation
          </label>
          <input
            value={investigation}
            onChange={(e) => setInvestigation(e.target.value)}
            placeholder="Select Investigation"
            className="w-full border rounded p-2"
          />
        </div>

        <div className="w-40">
          <label className="block mb-1 font-medium">
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            className="w-full border rounded p-2"
          />
        </div>

        <button
          onClick={addItem}
          className="px-5 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ========= TEMP TABLE ========= */}
      {items.length > 0 && (
        <div className="mt-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {index + 1}. {item.name}
              </span>

              <div className="flex items-center gap-4">
                <span>₦ {item.price.toLocaleString()}</span>

                <button
                  onClick={() => removeItem(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="text-right font-semibold mt-3">
            TOTAL ₦ {totalAmount.toLocaleString()}
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

      {/* ========= HISTORY TABLE ========= */}
      {history.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">INVESTIGATION</h4>

          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Investigation</th>
                <th>Amount</th>
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
                    {row.investigations
                      ?.map((i: any) => i.name)
                      .join(", ")}
                  </td>
                  <td>₦ {row.total?.toLocaleString()}</td>
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