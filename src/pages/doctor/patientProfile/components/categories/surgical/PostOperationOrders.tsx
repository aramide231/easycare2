import { useCallback, useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldTextareaClass,
} from "../../../lib/formFieldStyles";
import NairaAmountInput, {
  sanitizeAmountDigits,
} from "../../category/NairaAmountInput";

export default function PostOperationOrders() {
  const [ordersNote, setOrdersNote] = useState("");
  const [drugForm, setDrugForm] = useState<Record<string, string>>({});
  const [drugList, setDrugList] = useState<any[]>([]);

  const { history, remove } = useMedicalTable("POST-OPERATION ORDERS");

  const addDrug = () => {
    if (!drugForm.medication) return;

    setDrugList((prev) => [
      ...prev,
      {
        sn: prev.length + 1,
        ...drugForm,
      },
    ]);

    setDrugForm({});
  };

  const deleteDrug = (index: number) => {
    setDrugList((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((row, i) => ({ ...row, sn: i + 1 }))
    );
  };

  const clearForm = useCallback(() => {
    setOrdersNote("");
    setDrugForm({});
    setDrugList([]);
  }, []);

  usePendingCategoryDraft(
    "POST-OPERATION ORDERS",
    () => {
      if (!ordersNote.trim() && drugList.length === 0) return null;
      return {
        __payload__: JSON.stringify({
          ordersNote,
          medications: drugList,
        }),
      };
    },
    [ordersNote, drugList],
    clearForm
  );

  return (
    <div className="space-y-6 text-sm">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Post Operative Orders
        </label>
        <textarea
          value={ordersNote}
          onChange={(e) => setOrdersNote(e.target.value)}
          className={formFieldTextareaClass}
          placeholder="-Input text here-"
          rows={4}
        />
      </div>

      <div className={formFieldGridClass}>
        <input
          placeholder="Treatment"
          value={drugForm.medication || ""}
          onChange={(e) =>
            setDrugForm({ ...drugForm, medication: e.target.value })
          }
          className={formFieldInputClass}
        />

        <input
          placeholder="Drug Form"
          value={drugForm.drugForm || ""}
          onChange={(e) =>
            setDrugForm({ ...drugForm, drugForm: e.target.value })
          }
          className={formFieldInputClass}
        />

        <input
          placeholder="Drug Unit"
          value={drugForm.unit || ""}
          onChange={(e) =>
            setDrugForm({ ...drugForm, unit: e.target.value })
          }
          className={formFieldInputClass}
        />

        <NairaAmountInput
          value={sanitizeAmountDigits(drugForm.price || "")}
          onChange={(digits) =>
            setDrugForm({ ...drugForm, price: digits })
          }
        />

        <button
          type="button"
          onClick={addDrug}
          className="h-[45px] rounded-lg bg-[#573FD1] px-4 text-sm font-medium text-white hover:bg-[#4a35b8]"
        >
          Add
        </button>
      </div>

      {drugList.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
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
                      type="button"
                      onClick={() => deleteDrug(index)}
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

      {history.length > 0 && (
        <div>
          <h4 className="mb-2 font-semibold">MEDICATION GIVEN DETAILS</h4>

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
