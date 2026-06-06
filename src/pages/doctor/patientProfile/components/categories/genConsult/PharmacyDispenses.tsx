import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSmallSaveBtn,
  genConsultTextareaClass,
} from "./genConsultStyles";

type PharmacyLine = {
  medication: string;
  drugForm: string;
  batchNumber: string;
  quantity: string;
  unitPrice: string;
  instructions: string;
};

const emptyLine = (): PharmacyLine => ({
  medication: "",
  drugForm: "",
  batchNumber: "",
  quantity: "",
  unitPrice: "",
  instructions: "",
});

export default function PharmacyDispenses() {
  const [line, setLine] = useState<PharmacyLine>(emptyLine());
  const [items, setItems] = useState<PharmacyLine[]>([]);

  const { history, save, remove } = useMedicalTable("GEN CONSULT — PHARMACY DISPENSE");

  const updateLine = (key: keyof PharmacyLine, value: string) => {
    setLine((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = () => {
    if (!line.medication.trim()) return;
    setItems((prev) => [...prev, { ...line }]);
    setLine(emptyLine());
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const lineTotal = (item: PharmacyLine) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return qty * price;
  };

  const batchTotal = items.reduce((sum, item) => sum + lineTotal(item), 0);

  const handleSave = () => {
    if (items.length === 0) return;
    save({
      items,
      totalAmount: batchTotal,
      totalItems: String(items.length),
    });
    setItems([]);
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className={genConsultLabelClass}>
            Medication
          </label>
          <input
            value={line.medication}
            onChange={(e) => updateLine("medication", e.target.value)}
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>
            Drug Form
          </label>
          <input
            value={line.drugForm}
            onChange={(e) => updateLine("drugForm", e.target.value)}
            className={genConsultInputClass}
            placeholder="Tablet, Syrup, etc."
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>
            Batch Number
          </label>
          <input
            value={line.batchNumber}
            onChange={(e) => updateLine("batchNumber", e.target.value)}
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>
            Quantity
          </label>
          <input
            value={line.quantity}
            onChange={(e) => updateLine("quantity", e.target.value)}
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>
            Unit Price (₦)
          </label>
          <input
            value={line.unitPrice}
            onChange={(e) => updateLine("unitPrice", e.target.value)}
            className={genConsultInputClass}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <label className={genConsultLabelClass}>
            Instructions
          </label>
          <textarea
            value={line.instructions}
            onChange={(e) => updateLine("instructions", e.target.value)}
            className={genConsultTextareaClass}
            rows={2}
          />
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={addItem}
          className={genConsultSmallSaveBtn}
        >
          Add to list
        </button>
      </div>

      {items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-2">S/N</th>
                <th className="px-3 py-2">Medication</th>
                <th className="px-3 py-2">Form</th>
                <th className="px-3 py-2">Batch</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Unit Price</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{row.medication}</td>
                  <td className="px-3 py-2">{row.drugForm}</td>
                  <td className="px-3 py-2">{row.batchNumber}</td>
                  <td className="px-3 py-2">{row.quantity}</td>
                  <td className="px-3 py-2">₦ {row.unitPrice}</td>
                  <td className="px-3 py-2">₦ {lineTotal(row).toLocaleString()}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className={genConsultDeleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-3 py-2 text-right text-sm font-semibold text-gray-800">
            Total: ₦ {batchTotal.toLocaleString()}
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={items.length === 0}
          className={`${genConsultSaveBtn} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Save
        </button>
      </div>

      {history.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
            PHARMACY DISPENSE DETAILS
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-2">SN</th>
                  <th className="px-4 py-2">DATE | TIME</th>
                  <th className="px-4 py-2">PATIENT TYPE</th>
                  <th className="px-4 py-2">ITEMS</th>
                  <th className="px-4 py-2">TOTAL</th>
                  <th className="px-4 py-2">ENTERED BY</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#D4D4D4] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td className="px-4 py-3">{row.sn as number}</td>
                    <td className="px-4 py-3">{row.dateTime as string}</td>
                    <td className="px-4 py-3">{row.patientType as string}</td>
                    <td className="px-4 py-3">
                      {(row.items as PharmacyLine[] | undefined)
                        ?.map((i) => i.medication)
                        .join(", ") ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      ₦ {(row.totalAmount as number)?.toLocaleString() ?? "—"}
                    </td>
                    <td className="px-4 py-3">{row.enteredBy as string}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className={genConsultDeleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
