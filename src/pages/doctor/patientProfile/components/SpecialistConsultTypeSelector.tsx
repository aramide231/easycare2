import {
  genConsultLabelClass,
  genConsultSelectClass,
} from "./categories/genConsult/genConsultStyles";

const CONSULTATION_OPTIONS = [
  { value: "dental", label: "Dental Consultation", price: 15000 },
  { value: "dental-review", label: "Dental Consultation (Review)", price: 7500 },
  { value: "ent", label: "ENT Consultation", price: 7000 },
  { value: "ent-review", label: "ENT Consultation (Review)", price: 4500 },
];

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export default function SpecialistConsultTypeSelector({ value, onChange }: Props) {
  const selected = CONSULTATION_OPTIONS.find((opt) => opt.value === value);
  const price = selected?.price ?? 0;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[240px] flex-1">
        <label className={genConsultLabelClass}>Consultation</label>
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={genConsultSelectClass.replace("max-w-[354px]", "max-w-none")}
        >
          <option value="">-Select consultation-</option>
          {CONSULTATION_OPTIONS.map((opt) => (
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
  );
}
