import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "diagnosis", label: "DIAGNOSIS" },
  { key: "doctor", label: "DOCTOR" },
];

export default function NeonatalDiagnosis() {
  const { user } = useAuth();
  const [diagnosis, setDiagnosis] = useState("");
  const { history, save, remove } = useMedicalTable("NEO NATAL — DIAGNOSIS");

  const handleSave = () => {
    if (!diagnosis.trim()) return;
    save({
      diagnosis: diagnosis.trim(),
      doctor: user?.fullName ?? "Dr. Chibuzo Alen",
    });
    setDiagnosis("");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={genConsultLabelClass}>Diagnosis</label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter diagnosis..."
          className={`${genConsultTextareaClass} min-h-[120px]`}
        />
      </div>

      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
          DIAGNOSIS
        </h3>
        <table className="min-w-max w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              {TABLE_COLUMNS.map((col) => (
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
                  colSpan={TABLE_COLUMNS.length + 1}
                  className="py-8 text-center text-gray-500"
                >
                  No diagnosis recorded yet.
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
                  <td className="px-4 py-3">{row.diagnosis as string}</td>
                  <td className="px-4 py-3">{row.doctor as string}</td>
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
