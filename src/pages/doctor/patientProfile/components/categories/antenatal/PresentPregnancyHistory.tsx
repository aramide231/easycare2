import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function PresentPregnancyHistory() {
  const [form, setForm] = useState<Record<string, string>>({});

  const fields = [
    { name: "lmp", label: "Last Menstrual Period (LMP)", type: "date" },
    { name: "edd", label: "Expected Date of Delivery (EDD)", type: "date" },
    { name: "gestationalAge", label: "Gestational Age at Booking" },
    { name: "parity", label: "Gravidity / Parity at Presentation" },
    { name: "plannedDelivery", label: "Planned Place of Delivery" },
    { name: "riskFactors", label: "Risk Factors / High-Risk Notes", type: "textarea" },
    { name: "currentComplaints", label: "Current Pregnancy Complaints", type: "textarea" },
  ];

  const { history, save, remove } = useMedicalTable("PRESENT PREGNANCY HISTORY");

  return (
    <div className="rounded-b bg-gray-50 p-4 text-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : undefined}
          >
            <label className="mb-1 block font-medium">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="w-full rounded border p-2 text-sm"
                rows={3}
              />
            ) : (
              <input
                type={field.type === "date" ? "date" : "text"}
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="w-full rounded border p-2 text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          save(form);
          setForm({});
        }}
        className="mt-4 rounded bg-[#573FD1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a35b8]"
      >
        Save
      </button>

      {history.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="mb-2 font-semibold">PRESENT PREGNANCY HISTORY</h4>
          <table className="min-w-full text-left text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1">SN</th>
                {fields.map((f) => (
                  <th key={f.name} className="px-2 py-1 whitespace-nowrap">
                    {f.label}
                  </th>
                ))}
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, idx) => (
                <tr key={idx} className="even:bg-white">
                  <td className="px-2 py-1">{idx + 1}</td>
                  {fields.map((f) => (
                    <td key={f.name} className="px-2 py-1">
                      {entry[f.name] ?? "—"}
                    </td>
                  ))}
                  <td className="px-2 py-1">
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="text-red-600 hover:underline"
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
