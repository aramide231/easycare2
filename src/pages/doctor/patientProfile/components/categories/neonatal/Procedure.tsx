import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultSmallSaveBtn,
} from "../genConsult/genConsultStyles";

type ProcedureItem = {
  name: string;
  price: number;
  remarks: string;
  doctor: string;
};

const PROCEDURE_OPTIONS: Record<string, number> = {
  "OXYGEN THERAPY": 3000,
  "THERMAL PROTECTION": 2000,
  "VITAMIN K INJECTION": 4000,
  "PHOTOTHERAPY": 5000,
  "UMBILICAL CORD CARE": 1500,
};

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "procedureNames", label: "PROCEDURE" },
  { key: "total", label: "PRICE" },
  { key: "remarks", label: "REMARKS" },
];

export default function NeonatalProcedure() {
  const { user } = useAuth();
  const doctorName = user?.fullName ?? "Dr. Chibuzo Alen";
  const [procedure, setProcedure] = useState("");
  const [items, setItems] = useState<ProcedureItem[]>([]);
  const { history, save, remove } = useMedicalTable("NEO NATAL — PROCEDURE");

  const addProcedure = () => {
    if (!procedure) return;
    setItems((prev) => [
      ...prev,
      {
        name: procedure,
        price: PROCEDURE_OPTIONS[procedure] ?? 0,
        remarks: "",
        doctor: doctorName,
      },
    ]);
    setProcedure("");
  };

  const updateRemark = (index: number, value: string) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, remarks: value } : item)),
    );
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleSave = () => {
    if (!items.length) return;
    save({
      procedureNames: items.map((p) => p.name).join(", "),
      total: String(total),
      remarks: items.map((p) => p.remarks).filter(Boolean).join("; "),
      doctor: doctorName,
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
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <label className={genConsultLabelClass}>Procedure</label>
          <select
            value={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            className={genConsultSelectClass}
          >
            <option value="">Select Procedure Filter MEDICATION / Medication</option>
            {Object.keys(PROCEDURE_OPTIONS).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={addProcedure} className={genConsultSmallSaveBtn}>
          Save
        </button>
      </div>

      {items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-2">SN</th>
                <th className="px-3 py-2">Procedure</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Remarks</th>
                <th className="px-3 py-2">Doctor</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">
                    N {item.price.toLocaleString()}.00
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={item.remarks}
                      onChange={(e) => updateRemark(index, e.target.value)}
                      placeholder="Remarks"
                      className={`${genConsultInputClass} h-8 min-w-[120px]`}
                    />
                  </td>
                  <td className="px-3 py-2">{item.doctor}</td>
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
            TOTAL N {total.toLocaleString()}.00
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
          PROCEDURE
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
                  No procedure recorded yet.
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
                  <td className="px-4 py-3">{row.procedureNames as string}</td>
                  <td className="px-4 py-3">{row.total as string}</td>
                  <td className="px-4 py-3">{row.remarks as string}</td>
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
