import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function Medication() {
  const [medForm, setMedForm] = useState<Record<string, string>>({});
  const [medications, setMedications] = useState<any[]>([]);

  const {
    history: medicationHistory,
    save: saveMedicationHistory,
    remove: deleteMedicationHistory,
  } = useMedicalTable("MEDICATION");

  const addMedication = () => {
    if (!medForm.medication) return;

    setMedications((prev) => [
      ...prev,
      {
        ...medForm,
        amount:
          Number(medForm.price || 0) *
          Number(medForm.quantity || 1),
      },
    ]);

    setMedForm({});
  };

  const removeMedication = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const totalAmount = medications.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  const handleSave = () => {
    if (medications.length === 0) return;

    saveMedicationHistory({
      medications,
      totalAmount,
    });

    setMedications([]);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <input
          placeholder="Medication"
          className="border rounded p-2"
          value={medForm.medication || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, medication: e.target.value })
          }
        />

        <input
          placeholder="Drug Form"
          className="border rounded p-2"
          value={medForm.drugForm || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, drugForm: e.target.value })
          }
        />

        <input
          placeholder="Drug Unit"
          className="border rounded p-2"
          value={medForm.unit || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, unit: e.target.value })
          }
        />

        <input
          placeholder="Price"
          className="border rounded p-2"
          value={medForm.price || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, price: e.target.value })
          }
        />

        <input
          placeholder="Duration"
          className="border rounded p-2"
          value={medForm.duration || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, duration: e.target.value })
          }
        />

        <input
          placeholder="Dosage"
          className="border rounded p-2"
          value={medForm.dosage || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, dosage: e.target.value })
          }
        />

        <input
          placeholder="Quantity"
          className="border rounded p-2"
          value={medForm.quantity || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, quantity: e.target.value })
          }
        />

        <input
          placeholder="Period"
          className="border rounded p-2"
          value={medForm.period || ""}
          onChange={(e) =>
            setMedForm({ ...medForm, period: e.target.value })
          }
        />
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={addMedication}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ========= TEMP TABLE ========= */}
      {medications.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Medication</th>
                <th>Form</th>
                <th>Qty</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {medications.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{row.medication}</td>
                  <td>{row.drugForm}</td>
                  <td>{row.quantity}</td>
                  <td>{row.dosage}</td>
                  <td>{row.duration}</td>
                  <td>₦ {row.amount}</td>
                  <td>
                    <button
                      onClick={() => removeMedication(index)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTAL */}
          <div className="text-right font-semibold mt-3">
            TOTAL: ₦ {totalAmount}
          </div>
        </div>
      )}

      {/* FINAL SAVE */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* HISTORY TABLE */}
      {medicationHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">MEDICATION GIVEN DETAILS</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Total Drugs</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {medicationHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.medications?.length}</td>
                  <td>₦ {row.totalAmount}</td>
                  <td>
                    <button
                      onClick={() => deleteMedicationHistory(index)}
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