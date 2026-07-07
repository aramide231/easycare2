import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSmallSaveBtn,
  genConsultViewBtn,
} from "../genConsult/genConsultStyles";

type InvestigationItem = { name: string; price: number };

const TARIFF_OPTIONS = [
  { name: "Geneotype", price: 3000 },
  { name: "Malaria Parasite", price: 3000 },
  { name: "HVS", price: 4000 },
  { name: "Neonatal Sepsis Screen", price: 5500 },
  { name: "Bilirubin Level", price: 3500 },
];

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "investigationNames", label: "INVESTIGATION" },
  { key: "total", label: "AMOUNT" },
  { key: "results", label: "RESULT" },
];

export default function NeonatalInvestigation() {
  const [investigation, setInvestigation] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<InvestigationItem[]>([]);

  const { history, save, remove } = useMedicalTable("NEO NATAL — INVESTIGATION");

  const addItem = () => {
    if (!investigation.trim()) return;
    const amount = Number(price) || 0;
    setItems((prev) => [...prev, { name: investigation.trim(), price: amount }]);
    setInvestigation("");
    setPrice("");
  };

  const pickTariff = (name: string) => {
    const match = TARIFF_OPTIONS.find((t) => t.name === name);
    setInvestigation(name);
    if (match) setPrice(String(match.price));
  };

  const totalAmount = items.reduce((sum, i) => sum + i.price, 0);

  const handleSave = () => {
    if (!items.length) return;
    save({
      investigationNames: items.map((i) => i.name).join(", "),
      total: String(totalAmount),
      results: "Pending",
    });
    setItems([]);
  };

  const historyRows = history.map((row) => ({
    ...row,
    total:
      typeof row.total === "number"
        ? `N ${row.total.toLocaleString()}.00`
        : row.total
          ? `N ${Number(row.total).toLocaleString()}.00`
          : row.total,
    results: row.results ?? "Pending",
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <label className={genConsultLabelClass}>Investigation</label>
          <input
            list="neo-natal-investigation-tariffs"
            value={investigation}
            onChange={(e) => pickTariff(e.target.value)}
            placeholder="Select Investigation (To Filter from uploaded tariffs from the data..."
            className={genConsultInputClass}
          />
          <datalist id="neo-natal-investigation-tariffs">
            {TARIFF_OPTIONS.map((t) => (
              <option key={t.name} value={t.name} />
            ))}
          </datalist>
        </div>
        <div className="w-40">
          <label className={genConsultLabelClass}>Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            className={genConsultInputClass}
          />
        </div>
        <button type="button" onClick={addItem} className={genConsultSmallSaveBtn}>
          Save
        </button>
      </div>

      {items.length > 0 && (
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <span>
                {index + 1}. {item.name}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  N {item.price.toLocaleString()}.00
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) => prev.filter((_, i) => i !== index))
                  }
                  className={genConsultDeleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end px-4 py-3 text-sm font-bold">
            TOTAL N {totalAmount.toLocaleString()}.00
          </div>
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

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
          INVESTIGATION
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
            {historyRows.length === 0 ? (
              <tr>
                <td
                  colSpan={HISTORY_COLUMNS.length + 1}
                  className="py-8 text-center text-gray-500"
                >
                  No investigation recorded yet.
                </td>
              </tr>
            ) : (
              historyRows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="px-4 py-3">{row.sn as number}</td>
                  <td className="px-4 py-3">{row.dateTime as string}</td>
                  <td className="px-4 py-3">{row.patientType as string}</td>
                  <td className="px-4 py-3">{row.investigationNames as string}</td>
                  <td className="px-4 py-3">{row.total as string}</td>
                  <td className="px-4 py-3">
                    <button type="button" className={genConsultViewBtn}>
                      View
                    </button>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
