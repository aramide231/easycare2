import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function PostOperationOrders() {

  const [ordersNote, setOrdersNote] = useState("");
  const [drugForm, setDrugForm] = useState<Record<string, string>>({});
  const [drugList, setDrugList] = useState<any[]>([]);

  const {
    history,
    save,
    remove,
  } = useMedicalTable("POST-OPERATION ORDERS");

  const addDrug = () => {
    if (!drugForm.medication) return;

    setDrugList(prev => [
      ...prev,
      {
        sn: prev.length + 1,
        ...drugForm,
      },
    ]);

    setDrugForm({});
  };


  const deleteDrug = (index: number) => {
    setDrugList(prev =>
      prev
        .filter((_, i) => i !== index)
        .map((row, i) => ({ ...row, sn: i + 1 }))
    );
  };

  const saveOrders = () => {
    if (!ordersNote && drugList.length === 0) return;

    save({
      ordersNote,
      medications: drugList,
    });

    setOrdersNote("");
    setDrugList([]);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">

      {/* ===== POST OPERATIVE ORDERS NOTE ===== */}
      <label className="block mb-1 font-medium">
        Post Operative Orders
      </label>

      <textarea
        value={ordersNote}
        onChange={(e) => setOrdersNote(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        placeholder="-Input text here-"
      />

      {/* ===== DRUG ENTRY SECTION ===== */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

        <input
          placeholder="Treatment"
          value={drugForm.medication || ""}
          onChange={(e) =>
            setDrugForm({ ...drugForm, medication: e.target.value })
          }
          className="border rounded p-2"
        />

        <input
          placeholder="Drug Form"
          value={drugForm.drugForm || ""}
          onChange={(e) =>
            setDrugForm({ ...drugForm, drugForm: e.target.value })
          }
          className="border rounded p-2"
        />

        <input
          placeholder="Drug Unit"
          value={drugForm.unit || ""}
          onChange={(e) =>
            setDrugForm({ ...drugForm, unit: e.target.value })
          }
          className="border rounded p-2"
        />

        <input
          placeholder="Price"
          value={drugForm.price || ""}
          onChange={(e) =>
            setDrugForm({ ...drugForm, price: e.target.value })
          }
          className="border rounded p-2"
        />

        <button
          onClick={addDrug}
          className="bg-purple-600 text-white rounded px-4"
        >
          Save
        </button>
      </div>

      {/* ===== DRUG TABLE (MATCHES DESIGN) ===== */}
      {drugList.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Medication</th>
                <th>Form</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {drugList.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.medication}</td>
                  <td>{row.drugForm}</td>
                  <td>{row.unit}</td>
                  <td>{row.price}</td>
                  <td>
                    <button
                      onClick={() => deleteDrug(index)}
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

      {/* ===== FINAL SAVE BUTTON ===== */}
      <div className="mt-6 text-center">
        <button
          onClick={saveOrders}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ===== HISTORY TABLE ===== */}
      {history.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">
            MEDICATION GIVEN DETAILS
          </h4>

          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>SN</th>
                <th>Date | Time</th>
                <th>Orders Note</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map((row, index) => (
                <tr key={index}>
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.ordersNote}</td>
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