import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultTextareaClass,
} from "./genConsultStyles";

const DIAGNOSIS_CATEGORIES = [
  "Infectious Disease",
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Neurological",
  "Other",
];

const DIAGNOSIS_LOOKUPS = [
  "Malaria R/O Sepsis",
  "Hypertension",
  "Type 2 Diabetes",
  "Upper Respiratory Tract Infection",
  "Gastroenteritis",
];

const TABLE_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "diagnosis", label: "DIAGNOSIS" },
  { key: "doctor", label: "DOCTOR" },
];

export default function GenConsultDiagnosis() {
  const { user } = useAuth();
  const [icdEnabled, setIcdEnabled] = useState(false);
  const [category, setCategory] = useState("");
  const [lookup, setLookup] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const { history, save, remove } = useMedicalTable("GEN CONSULT — DIAGNOSIS");

  const handleSave = () => {
    const text = diagnosis.trim() || lookup;
    if (!text) return;
    save({
      diagnosis: text,
      diagnosisCategory: category,
      icdEnabled: icdEnabled ? "YES" : "NO",
      doctor: user?.fullName ?? "Dr. Chibuzo Alen",
    });
    setCategory("");
    setLookup("");
    setDiagnosis("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <span className={genConsultLabelClass}>Diagnosis</span>
        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase text-gray-700">
          ICD Diagnosis
          <button
            type="button"
            role="switch"
            aria-checked={icdEnabled}
            onClick={() => setIcdEnabled((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition ${
              icdEnabled ? "bg-[#573FD1]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                icdEnabled ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={genConsultLabelClass}>Diagnosis Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={genConsultSelectClass}
            disabled={!icdEnabled}
          >
            <option value="">-Select Category-</option>
            {DIAGNOSIS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Diagnosis Lookup</label>
          <select
            value={lookup}
            onChange={(e) => {
              setLookup(e.target.value);
              if (e.target.value) setDiagnosis(e.target.value);
            }}
            className={genConsultSelectClass}
            disabled={!icdEnabled}
          >
            <option value="">-Select Lookup-</option>
            {DIAGNOSIS_LOOKUPS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis..."
            className={`${genConsultTextareaClass} min-h-[100px]`}
          />
        </div>
      </div>

      <div className="text-center">
        <button type="button" onClick={handleSave} className={genConsultSaveBtn}>
          Save
        </button>
      </div>

      <div className="overflow-x-auto">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
          DIAGNOSIS
        </h3>
        <table className="min-w-max w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              {TABLE_COLUMNS.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-2 font-medium">
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
                      className="rounded bg-red-50 px-3 py-1 text-xs font-semibold uppercase text-red-600 hover:bg-red-100"
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
