import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import {
  genConsultDeleteBtn,
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSaveBtn,
  genConsultSelectClass,
  genConsultTextareaClass,
} from "../genConsult/genConsultStyles";
import {
  HEMORRHAGE_INTERVENTION_OPTIONS,
  PLACENTA_COMPLICATION_DETAIL_OPTIONS,
  PLACENTA_DELIVERY_OPTIONS,
  YES_NO_OPTIONS,
} from "./childbirthFieldOptions";

const HISTORY_COLUMNS = [
  { key: "sn", label: "SN" },
  { key: "placentaDelivery", label: "PLACENTA DELIVERY" },
  { key: "placentaComplications", label: "PLACENTA COMPLICATIONS" },
  { key: "estimatedBloodLoss", label: "ESTIMATED BLOOD LOSS" },
];

export default function Stage3DeliveryOfPlacenta() {
  const [form, setForm] = useState<Record<string, string>>({});
  const { history, save, remove } = useMedicalTable(
    "CHILD BIRTH — STAGE 3: DELIVERY OF PLACENTA",
  );

  const inputClass = genConsultInputClass.replace("max-w-[354px]", "max-w-none");
  const selectClass = genConsultSelectClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );
  const textareaClass = genConsultTextareaClass.replace(
    "max-w-[354px]",
    "max-w-none",
  );

  const update = (name: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "placentaComplications" && value === "No") {
        delete next.complicationDetail;
      }
      if (name === "hemorrhage" && value === "No") {
        delete next.hemorrhageIntervention;
      }
      return next;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const complications =
      form.placentaComplications === "Yes" && form.complicationDetail
        ? `Yes, ${form.complicationDetail}`
        : form.placentaComplications || "No";

    save({
      placentaDelivery: form.placentaDelivery || "",
      placentaComplications: complications,
      estimatedBloodLoss: form.estimatedBloodLoss || "",
      hemorrhage: form.hemorrhage || "",
      hemorrhageIntervention: form.hemorrhageIntervention || "",
      uterusContraction: form.uterusContraction || "",
      uterineAtony: form.uterineAtony || "",
      bloodPressure: form.bloodPressure || "",
      tpr: form.tpr || "",
      additional: form.additional || "",
    });
    setForm({});
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div>
          <label className={genConsultLabelClass}>Placenta Delivery</label>
          <select
            value={form.placentaDelivery || ""}
            onChange={(e) => update("placentaDelivery", e.target.value)}
            className={selectClass}
          >
            <option value="">-Select option-</option>
            {PLACENTA_DELIVERY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Placenta Complications?</label>
          <select
            value={form.placentaComplications || ""}
            onChange={(e) => update("placentaComplications", e.target.value)}
            className={selectClass}
          >
            <option value="">-Select option-</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {form.placentaComplications === "Yes" && (
          <div className="md:col-span-2">
            <label className={genConsultLabelClass}>Complication Type</label>
            <select
              value={form.complicationDetail || ""}
              onChange={(e) => update("complicationDetail", e.target.value)}
              className={selectClass}
            >
              <option value="">-Select complication-</option>
              {PLACENTA_COMPLICATION_DETAIL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={genConsultLabelClass}>Estimated Blood Loss</label>
          <input
            value={form.estimatedBloodLoss || ""}
            onChange={(e) => update("estimatedBloodLoss", e.target.value)}
            placeholder="-Input loss in ml-"
            className={inputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>
            Excessive Bleeding or Hemorrhage?
          </label>
          <select
            value={form.hemorrhage || ""}
            onChange={(e) => update("hemorrhage", e.target.value)}
            className={selectClass}
          >
            <option value="">-Select option-</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {form.hemorrhage === "Yes" && (
          <div className="md:col-span-2">
            <label className={genConsultLabelClass}>Intervention given?</label>
            <select
              value={form.hemorrhageIntervention || ""}
              onChange={(e) => update("hemorrhageIntervention", e.target.value)}
              className={selectClass}
            >
              <option value="">-Select intervention-</option>
              {HEMORRHAGE_INTERVENTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={genConsultLabelClass}>Uterus Contraction</label>
          <select
            value={form.uterusContraction || ""}
            onChange={(e) => update("uterusContraction", e.target.value)}
            className={selectClass}
          >
            <option value="">-Select option-</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Uterine Atony</label>
          <select
            value={form.uterineAtony || ""}
            onChange={(e) => update("uterineAtony", e.target.value)}
            className={selectClass}
          >
            <option value="">-Select option-</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={genConsultLabelClass}>Blood Pressure (B.P)</label>
          <input
            value={form.bloodPressure || ""}
            onChange={(e) => update("bloodPressure", e.target.value)}
            placeholder="-Input B.P-"
            className={inputClass}
          />
        </div>
        <div>
          <label className={genConsultLabelClass}>
            Temperature Pulse Respiration (T.P.R)
          </label>
          <input
            value={form.tpr || ""}
            onChange={(e) => update("tpr", e.target.value)}
            placeholder="-Input TPR-"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className={genConsultLabelClass}>Additional(s)</label>
          <textarea
            value={form.additional || ""}
            onChange={(e) => update("additional", e.target.value)}
            placeholder="Enter notes here"
            className={textareaClass}
          />
        </div>
        <div className="md:col-span-2 pt-2 text-center">
          <button type="submit" className={genConsultSaveBtn}>
            Save
          </button>
        </div>
      </form>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
          DELIVERY OF PLACENTA
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
                  No placenta delivery records yet.
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
                  <td className="px-4 py-3">{row.placentaDelivery as string}</td>
                  <td className="px-4 py-3">{row.placentaComplications as string}</td>
                  <td className="px-4 py-3">{row.estimatedBloodLoss as string}</td>
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
