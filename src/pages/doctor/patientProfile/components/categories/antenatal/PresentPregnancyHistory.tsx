import { useCallback, useEffect, useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import FormDatePicker from "../../category/FormDatePicker";
import { calculateEddAndEgaFromLmp } from "../../category/CategoryForm";
import { formFieldInputClass, formFieldTextareaClass } from "../../../lib/formFieldStyles";

export default function PresentPregnancyHistory() {
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    const calculated = calculateEddAndEgaFromLmp(form.lmp || "");
    if (calculated) {
      setForm((prev) =>
        prev.edd === calculated.edd && prev.gestationalAge === calculated.ega
          ? prev
          : { ...prev, edd: calculated.edd, gestationalAge: calculated.ega }
      );
    }
  }, [form.lmp]);

  const fields = [
    { name: "lmp", label: "Last Menstrual Period (LMP)", type: "date" },
    {
      name: "edd",
      label: "Estimated Date of Delivery (EDD)",
      readOnly: true,
      placeholder: "Auto-calculated (LMP + 280 days)",
    },
    {
      name: "gestationalAge",
      label: "Estimated Gestational Age (EGA)",
      readOnly: true,
      placeholder: "Auto-calculated (weeks & days)",
    },
    {
      name: "parity",
      label: "Gravidity / Parity at Presentation",
      placeholder: "Enter gravidity / parity (e.g. G2P1)",
    },
    {
      name: "plannedDelivery",
      label: "Planned Place of Delivery",
      placeholder: "Enter planned place of delivery",
    },
    {
      name: "riskFactors",
      label: "Risk Factors / High-Risk Notes",
      type: "textarea",
      placeholder: "Enter risk factors or high-risk notes",
    },
    {
      name: "currentComplaints",
      label: "Current Pregnancy Complaints",
      type: "textarea",
      placeholder: "Enter current pregnancy complaints",
    },
  ];

  const { history, remove } = useMedicalTable("PRESENT PREGNANCY HISTORY");

  const clearForm = useCallback(() => setForm({}), []);

  usePendingCategoryDraft(
    "PRESENT PREGNANCY HISTORY",
    () => {
      const hasValue = Object.values(form).some((value) => value?.trim());
      if (!hasValue) return null;
      return { ...form };
    },
    [form],
    clearForm
  );

  return (
    <div className="rounded-b bg-gray-50 p-4 text-sm">
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-1 block font-medium">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                placeholder={field.placeholder}
                className={formFieldTextareaClass}
                rows={3}
              />
            ) : field.type === "date" ? (
              <FormDatePicker
                value={form[field.name] || ""}
                onChange={(next) => setForm({ ...form, [field.name]: next })}
              />
            ) : (
              <input
                type="text"
                readOnly={Boolean(field.readOnly)}
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                placeholder={field.placeholder}
                className={`${formFieldInputClass} ${
                  field.readOnly ? "bg-gray-50 font-semibold text-gray-800" : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

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
                      {String(entry[f.name] ?? "—")}
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
