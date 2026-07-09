import { useState } from "react";

type FieldRow = {
  category: string;
  section: string;
  field: string;
  type: "dropdown" | "open-box" | "textarea" | "date" | "amount" | "search";
  values?: string;
};

const ROWS: FieldRow[] = [
  // ANC — before Vitals
  { category: "ANC", section: "PREVIOUS MEDICAL HISTORY", field: "All 8 history questions", type: "dropdown", values: "YES / NO" },
  { category: "ANC", section: "FAMILY MEDICAL HISTORY", field: "All history questions", type: "dropdown", values: "YES / NO" },
  { category: "ANC", section: "NEW ANTENATAL BOOKING", field: "LMP, EDD", type: "date" },
  { category: "ANC", section: "NEW ANTENATAL BOOKING", field: "EGA, Parity, etc.", type: "open-box" },
  { category: "ANC", section: "PREVIOUS PREGNANCY HISTORY", field: "Pregnancy rows", type: "open-box" },
  // Vitals (ANC + Gen Consult paste)
  { category: "ANC / Gen Consult", section: "VITAL SIGNS", field: "Temperature, B.P, Weight, Height", type: "open-box" },
  { category: "ANC / Gen Consult", section: "VITAL SIGNS", field: "Blood Sugar, Respiration, Urinalysis, SpO₂, Comments", type: "dropdown", values: "Fixed clinical options" },
  { category: "ANC only", section: "VITAL SIGNS", field: "FHR", type: "dropdown", values: "Normal / Bradycardia / Tachycardia / …" },
  { category: "ANC / Gen Consult", section: "VITAL SIGNS", field: "Pulse Rate, BMI", type: "open-box" },
  { category: "ANC / Gen Consult", section: "PRESENTING COMPLAINTS", field: "Complaints textarea", type: "textarea" },
  { category: "ANC / Gen Consult", section: "PHYSICAL EXAMINATION", field: "General, CNS, Chest, CVS, etc.", type: "open-box" },
  { category: "ANC / Gen Consult", section: "DIAGNOSIS", field: "ICD toggle + search / open text", type: "search" },
  { category: "ANC / Gen Consult", section: "INVESTIGATION", field: "Investigation search + Amount", type: "search", values: "Amount = open ₦" },
  { category: "ANC / Gen Consult", section: "PROCEDURE", field: "Procedure search + Amount", type: "search" },
  { category: "ANC / Gen Consult", section: "MEDICATION", field: "Med, Strength, Route, Dosage, Interval, Period", type: "dropdown", values: "Catalogue + selects; Qty/Amount auto" },
  // Gen Consult only
  { category: "Gen Consult", section: "REPORT WRITING", field: "Select Ward, Ward", type: "dropdown", values: "Ward type + ward list" },
  { category: "Gen Consult", section: "REPORT WRITING", field: "Comment", type: "textarea" },
  { category: "Gen Consult", section: "IN-TAKE CHART", field: "Type of Fluid", type: "dropdown", values: "IV / ORAL / RECTAL / Mixed" },
  { category: "Gen Consult", section: "IN-TAKE CHART", field: "IV, Oral, Rectal volumes", type: "open-box" },
  { category: "Gen Consult", section: "OUTPUT CHART", field: "Urine, Vomit, Drainage, etc.", type: "open-box" },
  { category: "Gen Consult", section: "NURSING DISPENSES", field: "Medication, Qty", type: "open-box" },
  { category: "Gen Consult", section: "PHARMACY DISPENSE", field: "Medication, Qty", type: "open-box" },
  // Neo Natal (Figma)
  { category: "Neo Natal", section: "VITAL SIGNS", field: "Temp, Respiratory, Weight, Pulse, SpO₂", type: "open-box" },
  { category: "Neo Natal", section: "VITAL SIGNS", field: "Comments", type: "textarea" },
  { category: "Neo Natal", section: "VITAL SIGNS table", field: "Columns", type: "open-box", values: "SN, DATE|TIME, PATIENT TYPE, TEMP, WEIGHT, PULSE, RES, SPO2" },
  { category: "Neo Natal", section: "DIAGNOSIS / INV / PROC / MED", field: "Same shared forms as Gen Consult", type: "search" },
];

const TYPE_STYLE: Record<FieldRow["type"], string> = {
  dropdown: "bg-violet-100 text-violet-900",
  "open-box": "bg-slate-100 text-slate-800",
  textarea: "bg-blue-100 text-blue-900",
  date: "bg-amber-100 text-amber-900",
  amount: "bg-emerald-100 text-emerald-900",
  search: "bg-orange-100 text-orange-900",
};

export default function SubCategoryFieldAuditCanvas() {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", ...new Set(ROWS.map((r) => r.category))];

  const visible =
    filter === "all" ? ROWS : ROWS.filter((r) => r.category === filter);

  return (
    <div className="min-h-screen bg-white p-6 font-sans text-sm">
      <h1 className="mb-1 text-xl font-bold text-gray-900">
        Sub-category field audit
      </h1>
      <p className="mb-4 text-gray-600">
        Dropdown = chevron select with fixed values. Open-box = plain text input.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              filter === c
                ? "bg-[#573FD1] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="p-2 font-semibold">Category</th>
            <th className="p-2 font-semibold">Section</th>
            <th className="p-2 font-semibold">Field</th>
            <th className="p-2 font-semibold">Type</th>
            <th className="p-2 font-semibold">Values</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((row, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="p-2 text-gray-700">{row.category}</td>
              <td className="p-2 font-medium">{row.section}</td>
              <td className="p-2">{row.field}</td>
              <td className="p-2">
                <span
                  className={`rounded px-2 py-0.5 text-xs font-semibold uppercase ${TYPE_STYLE[row.type]}`}
                >
                  {row.type}
                </span>
              </td>
              <td className="p-2 text-gray-500">{row.values ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 text-xs text-gray-500">
        Family Planning & Post Natal — left unchanged per request.
      </p>
    </div>
  );
}
