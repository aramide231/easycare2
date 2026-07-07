import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultSmallSaveBtn,
} from "./genConsultStyles";

type MedLine = {
  medication: string;
  drugForm: string;
  unit: string;
  price: string;
  duration: string;
  dosage: string;
  quantity: string;
  period: string;
  amount: number;
};

const emptyLine = (): Omit<MedLine, "amount"> => ({
  medication: "",
  drugForm: "",
  unit: "",
  price: "",
  duration: "",
  dosage: "",
  quantity: "",
  period: "",
});

export default function GenConsultMedication() {
  const [line, setLine] = useState(emptyLine());
  const [items, setItems] = useState<MedLine[]>([]);
  const { history, save, remove } = useMedicalTable("GEN CONSULT — MEDICATION");

  const update = (key: keyof typeof line, value: string) => {
    setLine((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = () => {
    if (!line.medication.trim()) return;
    const amount =
      (Number(line.price) || 0) * (Number(line.quantity) || 1);
    setItems((prev) => [...prev, { ...line, amount }]);
    setLine(emptyLine());
  };

  const totalAmount = items.reduce((s, i) => s + i.amount, 0);

  const handleSave = () => {
    if (!items.length) return;
    save({
      medications: items,
      totalAmount,
      totalDrugs: String(items.length),
    });
    setItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div>
          <label className={genConsultLabelClass}>Medication</label>
          <input
            value={line.medication}
            onChange={(e) => update("medication", e.target.value)}
            placeholder="Filter MEDICATION / Medication"
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Drug Form</label>
          <select
            value={line.drugForm}
            onChange={(e) => update("drugForm", e.target.value)}
            className={genConsultSelectClass}
          >
            <option value="">Select drug</option>
            <option value="TABLETS">Tablets</option>
            <option value="SYRUP">Syrup</option>
            <option value="INJECTION">Injection</option>
            <option value="CAPSULE">Capsule</option>
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Drug Unit</label>
          <input
            value={line.unit}
            onChange={(e) => update("unit", e.target.value)}
            placeholder="Enter Unit"
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Price</label>
          <input
            value={line.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="Enter Price"
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Duration</label>
          <input
            value={line.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="Enter duration"
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Dosage</label>
          <input
            value={line.dosage}
            onChange={(e) => update("dosage", e.target.value)}
            placeholder="Enter Dosage"
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Quantity</label>
          <select
            value={line.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            className={genConsultSelectClass}
          >
            <option value="">Select Qnty</option>
            {[1, 2, 3, 4, 5, 10].map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className={genConsultLabelClass}>Period</label>
            <select
              value={line.period}
              onChange={(e) => update("period", e.target.value)}
              className={genConsultSelectClass}
            >
              <option value="">Select period</option>
              <option value="DAYS">Days</option>
              <option value="WEEKS">Weeks</option>
              <option value="MONTHS">Months</option>
            </select>
          </div>
          <button type="button" onClick={addItem} className={genConsultSmallSaveBtn}>
            Save
          </button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-2">S/N</th>
                <th className="px-3 py-2">Medication</th>
                <th className="px-3 py-2">Form</th>
                <th className="px-3 py-2">Dosage</th>
                <th className="px-3 py-2">Duration</th>
                <th className="px-3 py-2">Qty</th>
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
                  <td className="px-3 py-2">
                    {row.dosage} {row.period ? row.period.toLowerCase() : ""}
                  </td>
                  <td className="px-3 py-2">{row.duration}</td>
                  <td className="px-3 py-2">{row.quantity}</td>
                  <td className="px-3 py-2">
                    N {row.amount.toLocaleString()}.00
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setItems((p) => p.filter((_, i) => i !== index))}
                      className={genConsultDeleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-3 py-2 text-right text-sm font-bold">
            TOTAL N {totalAmount.toLocaleString()}.00
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={!items.length}
          className={`${genConsultSaveBtn} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Save
        </button>
      </div>

      {history.length > 0 && (
        <div className="overflow-x-auto border-t border-gray-200 pt-4">
          <h3 className="mb-3 text-sm font-bold uppercase text-gray-800">
            MEDICATION GIVEN DETAILS
          </h3>
          <table className="min-w-full text-sm">
            <thead className="border-b text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Date | Time</th>
                <th className="px-4 py-2">Total Drugs</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-4 py-3">{row.sn as number}</td>
                  <td className="px-4 py-3">{row.dateTime as string}</td>
                  <td className="px-4 py-3">{row.totalDrugs as string}</td>
                  <td className="px-4 py-3">
                    N {(row.totalAmount as number)?.toLocaleString()}.00
                  </td>
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
      )}
    </div>
  );
}
