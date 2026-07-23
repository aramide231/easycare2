import { ChevronDown } from "lucide-react";
import {
  SPECIALIST_CONSULT_TYPES,
  getConsultTypeById,
} from "../config/specialistConsultTypes";
import { formFieldSelectClass } from "../lib/formFieldStyles";
import NairaAmountInput from "./category/NairaAmountInput";

type Props = {
  value: string | null;
  onChange: (consultTypeId: string) => void;
};

export default function SpecialistConsultTypeSelector({ value, onChange }: Props) {
  const selected = getConsultTypeById(value);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-end">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Consultation Type
        </label>
        <div className="relative">
          <select
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${formFieldSelectClass} pr-10`}
          >
            <option value="">-Select an Option-</option>
            {SPECIALIST_CONSULT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            aria-hidden
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Price
        </label>
        <NairaAmountInput
          readOnly
          value={selected ? String(selected.price) : ""}
          placeholder="0"
          className="text-gray-700"
        />
      </div>
    </div>
  );
}
