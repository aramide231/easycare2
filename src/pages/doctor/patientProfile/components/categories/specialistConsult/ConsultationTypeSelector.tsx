import {
  CONSULTATION_TYPE_OPTIONS,
  consultationPrice,
} from "./specialistConsultFieldOptions";
import {
  genConsultInputClass,
  genConsultLabelClass,
  genConsultSelectClass,
} from "../genConsult/genConsultStyles";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ConsultationTypeSelector({ value, onChange }: Props) {
  const price = consultationPrice(value);

  return (
    <div className="mb-4 shrink-0">
      <h2 className="text-xs text-gray-400">Step 2</h2>
      <h3 className="mb-2 text-sm font-semibold text-gray-800">
        Select Consultation type
      </h3>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[240px] flex-1">
          <label className={genConsultLabelClass}>Consultation</label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={genConsultSelectClass.replace(
              "max-w-[354px]",
              "max-w-none",
            )}
          >
            <option value="">-Select consultation-</option>
            {CONSULTATION_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[140px] rounded-lg border border-gray-300 bg-[#FAFAFA] px-4 py-3 text-sm font-semibold text-gray-800">
          {value ? `N ${price.toLocaleString()}.00` : "N 0.00"}
        </div>
      </div>
      <h2 className="mt-4 text-xs text-gray-400">Step 3</h2>
      <h3 className="mb-2 text-sm font-semibold text-gray-800">
        Fill Category Form
      </h3>
    </div>
  );
}
