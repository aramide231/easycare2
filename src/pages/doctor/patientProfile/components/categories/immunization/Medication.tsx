import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultSmallSaveBtn,
} from "../genConsult/genConsultStyles";

type MedLine = {
  medication: string;
  drugForm: string;
  unit: string;
  price: string;
  duration: string;
  dosage: string;
  frequency: string;
  quantity: string;
  period: string;
  amount: number;
};

const FREQUENCY_OPTIONS = ["BD", "TDS", "STAT", "DLY", "OD", "QID"];

const emptyLine = (): Omit<MedLine, "amount"> => ({
  medication: "",
  drugForm: "",
  unit: "",
  price: "",
  duration: "",
  dosage: "",
  frequency: "",
  quantity: "",
  period: "",
});

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "medication", label: "MEDICATION" },
  { key: "drugForm", label: "D.FORM" },
  { key: "dosage", label: "DOSAGE" },
];

export default function ImmunizationMedication({
  tableKey = "IMMUNIZATION — MEDICATION",
}: {
  tableKey?: string;
} = {}) {
  const [line, setLine] = useState(emptyLine());
  const [items, setItems] = useState<MedLine[]>([]);
  const { history, saveBatch, remove } = useMedicalTable(tableKey);

  const update = (key: keyof typeof line, value: string) => {
    setLine((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = () => {
    if (!line.medication.trim()) return;
    const amount = (Number(line.price) || 0) * (Number(line.quantity) || 1);
    setItems((prev) => [...prev, { ...line, amount }]);
    setLine(emptyLine());
  };

  const totalAmount = items.reduce((s, i) => s + i.amount, 0);

  const handleSave = () => {
    if (!items.length) return;
    saveBatch(
      items.map((item) => ({
        medication: item.medication.toUpperCase(),
        drugForm: item.drugForm || "TAB",
        dosage: item.frequency || item.dosage,
        duration: item.duration,
        period: item.period,
        quantity: item.quantity,
      })),
    );
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
            placeholder="Filter MEDICATION / Medica"
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
              <option value="">Select drug</option>
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
                <th className="px-3 py-2">SN</th>
                <th className="px-3 py-2">Medication</th>
                <th className="px-3 py-2">Drug Form</th>
                <th className="px-3 py-2">Dosage</th>
                <th className="px-3 py-2">Frequency</th>
                <th className="px-3 py-2">Duration</th>
                <th className="px-3 py-2">Period</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{row.medication}</td>
                  <td className="px-3 py-2">{row.drugForm}</td>
                  <td className="px-3 py-2">{row.dosage}</td>
                  <td className="px-3 py-2">
                    <select
                      value={row.frequency}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((item, i) =>
                            i === index
                              ? { ...item, frequency: e.target.value }
                              : item,
                          ),
                        )
                      }
                      className="h-8 rounded border border-gray-300 px-2 text-sm"
                    >
                      <option value="">—</option>
                      {FREQUENCY_OPTIONS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">{row.duration}</td>
                  <td className="px-3 py-2">{row.period}</td>
                  <td className="px-3 py-2">{row.quantity}</td>
                  <td className="px-3 py-2">
                    N {row.amount.toLocaleString()}.00
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() =>
                        setItems((p) => p.filter((_, i) => i !== index))
                      }
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

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
          MEDICATION GIVEN DETAILS
        </h3>
        <table className="min-w-max w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              {HISTORY_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-4 py-2 font-medium"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={HISTORY_COLUMNS.length + 1}
                  className="py-8 text-center text-gray-500"
                >
                  No medication recorded yet.
                </td>
              </tr>
            ) : (
              history.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="px-4 py-3">{row.sn as number}</td>
                  <td className="px-4 py-3">{row.dateTime as string}</td>
                  <td className="px-4 py-3">{row.patientType as string}</td>
                  <td className="px-4 py-3">{row.medication as string}</td>
                  <td className="px-4 py-3">{row.drugForm as string}</td>
                  <td className="px-4 py-3">{row.dosage as string}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
