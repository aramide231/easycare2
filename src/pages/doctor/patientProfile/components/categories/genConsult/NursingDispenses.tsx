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

type DispenseLine = {
  medication: string;
  dose: string;
  route: string;
  quantity: string;
  frequency: string;
  timeGiven: string;
};

const emptyLine = (): DispenseLine => ({
  medication: "",
  dose: "",
  route: "",
  quantity: "",
  frequency: "",
  timeGiven: "",
});

export default function NursingDispenses() {
  const [line, setLine] = useState<DispenseLine>(emptyLine());
  const [items, setItems] = useState<DispenseLine[]>([]);

  const { history, save, remove } = useMedicalTable("GEN CONSULT — NURSING DISPENSES");

  const updateLine = (key: keyof DispenseLine, value: string) => {
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

  const handleSave = () => {
    if (items.length === 0) return;
    save({
      items,
      totalItems: String(items.length),
    });
    setItems([]);
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className={genConsultLabelClass}>Medication</label>
          <input
            value={line.medication}
            onChange={(e) => updateLine("medication", e.target.value)}
            placeholder="Drug name"
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Dose</label>
          <input
            value={line.dose}
            onChange={(e) => updateLine("dose", e.target.value)}
            className={genConsultInputClass}
            placeholder="e.g. 500mg"
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Route</label>
          <select
            value={line.route}
            onChange={(e) => updateLine("route", e.target.value)}
            className={genConsultSelectClass}
          >
            <option value="">-Select Route-</option>
            <option value="ORAL">Oral</option>
            <option value="IV">IV</option>
            <option value="IM">IM</option>
            <option value="SC">SC</option>
            <option value="TOPICAL">Topical</option>
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Quantity</label>
          <input
            value={line.quantity}
            onChange={(e) => updateLine("quantity", e.target.value)}
            className={genConsultInputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Frequency</label>
          <input
            value={line.frequency}
            onChange={(e) => updateLine("frequency", e.target.value)}
            className={genConsultInputClass}
            placeholder="e.g. BD, TDS"
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>Time Given</label>
          <input
            value={line.timeGiven}
            onChange={(e) => updateLine("timeGiven", e.target.value)}
            className={genConsultInputClass}
            placeholder="e.g. 08:00 AM"
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
                <th className="px-3 py-2">Dose</th>
                <th className="px-3 py-2">Route</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Frequency</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{row.medication}</td>
                  <td className="px-3 py-2">{row.dose}</td>
                  <td className="px-3 py-2">{row.route}</td>
                  <td className="px-3 py-2">{row.quantity}</td>
                  <td className="px-3 py-2">{row.frequency}</td>
                  <td className="px-3 py-2">{row.timeGiven}</td>
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
            NURSING DISPENSES DETAILS
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-2">SN</th>
                  <th className="px-4 py-2">DATE | TIME</th>
                  <th className="px-4 py-2">PATIENT TYPE</th>
                  <th className="px-4 py-2">ITEMS</th>
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
                      {(row.items as DispenseLine[] | undefined)
                        ?.map((i) => i.medication)
                        .join(", ") ?? "—"}
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
