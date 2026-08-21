import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import {
  DOSAGE_FREQUENCY_OPTIONS,
  DRUG_FORM_OPTIONS,
  DURATION_OPTIONS,
  INITIAL_REQUEST_ITEMS,
  formatNaira,
  type RequestLineItem,
} from "../data/requestFormOptions";

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const selectClass = `${fieldClass} appearance-none pr-10`;

type FormState = {
  medication: string;
  drugForm: string;
  dosageFrequency: string;
  dosageAmount: string;
  drugUnit: string;
  durationValue: string;
};

const EMPTY_FORM: FormState = {
  medication: "",
  drugForm: "",
  dosageFrequency: "",
  dosageAmount: "",
  drugUnit: "",
  durationValue: "",
};

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-[15px] uppercase tracking-[-0.3px] text-black">
      {children}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClass}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function MakeRequestForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [items, setItems] = useState<RequestLineItem[]>(INITIAL_REQUEST_ITEMS);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items],
  );

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canAdd =
    form.medication.trim() &&
    form.drugForm &&
    form.dosageFrequency &&
    form.dosageAmount.trim() &&
    form.durationValue;

  const handleAdd = () => {
    if (!canAdd) return;

    const next: RequestLineItem = {
      id: `${Date.now()}`,
      medication: form.medication.trim(),
      drugForm: form.drugForm,
      dosageAmount: form.dosageAmount.trim(),
      dosageFrequency: form.dosageFrequency,
      drugUnit: form.drugUnit.trim() || "—",
      durationValue: form.durationValue,
      durationUnit: "Days",
      amount: 0,
    };

    setItems((prev) => [...prev, next]);
    setForm(EMPTY_FORM);
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 border-b border-gray-200 pb-4">
        <h1 className="text-xl font-bold text-gray-800">Make Request</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <FieldLabel>Medication / treatment</FieldLabel>
          <input
            type="text"
            value={form.medication}
            onChange={(e) => updateField("medication", e.target.value)}
            placeholder="Enter medication / treatment"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col items-end gap-5 lg:flex-row">
          <SelectField
            label="Drug Form"
            value={form.drugForm}
            onChange={(value) => updateField("drugForm", value)}
            options={DRUG_FORM_OPTIONS.map((option) => ({
              value: option,
              label: option,
            }))}
            className="w-full min-w-0 flex-1"
          />

          <div className="w-full shrink-0 lg:w-[302px]">
            <FieldLabel>Dosage</FieldLabel>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1">
                <select
                  value={form.dosageFrequency}
                  onChange={(e) =>
                    updateField("dosageFrequency", e.target.value)
                  }
                  className={selectClass}
                >
                  <option value="">Select option</option>
                  {DOSAGE_FREQUENCY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                  aria-hidden
                />
              </div>
              <input
                type="text"
                value={form.dosageAmount}
                onChange={(e) => updateField("dosageAmount", e.target.value)}
                placeholder="Enter dosage"
                className={`${fieldClass} min-w-0 flex-1`}
              />
            </div>
          </div>

          <div className="w-full shrink-0 lg:w-[104px]">
            <FieldLabel>Drug Unit</FieldLabel>
            <input
              type="text"
              value={form.drugUnit}
              onChange={(e) => updateField("drugUnit", e.target.value)}
              placeholder="Enter unit"
              className={fieldClass}
            />
          </div>

          <SelectField
            label="Duration"
            value={form.durationValue}
            onChange={(value) => updateField("durationValue", value)}
            options={DURATION_OPTIONS}
            className="w-full min-w-0 flex-1"
          />

          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="h-10 w-full shrink-0 rounded-lg border border-[#573FD1] bg-[#573FD1] px-3 text-[15px] font-semibold tracking-[-0.3px] text-white transition hover:bg-[#4a34b8] disabled:cursor-not-allowed disabled:opacity-50 lg:w-[94px]"
          >
            Add
          </button>
        </div>

        {items.length > 0 && (
          <div className="mt-2 flex w-full flex-col gap-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={item.id}
                      className="h-[59px] border-b border-[#D4D4D4]"
                    >
                      <td className="w-14 px-4 text-[15px] tracking-[-0.3px]">
                        {index + 1}
                      </td>
                      <td className="px-4 text-[15px] tracking-[-0.3px]">
                        {item.medication}
                      </td>
                      <td className="px-4 text-[15px] tracking-[-0.3px]">
                        {item.drugForm}
                      </td>
                      <td className="w-16 px-4 text-[15px] tracking-[-0.3px]">
                        {item.dosageAmount}
                      </td>
                      <td className="w-24 px-4 text-[15px] tracking-[-0.3px]">
                        {item.dosageFrequency}
                      </td>
                      <td className="w-16 px-4 text-[15px] tracking-[-0.3px]">
                        {item.durationValue}
                      </td>
                      <td className="w-20 px-4 text-[15px] tracking-[-0.3px]">
                        {item.durationUnit}
                      </td>
                      <td className="px-4 text-[15px] tracking-[-0.3px]">
                        {formatNaira(item.amount)}
                      </td>
                      <td className="w-12 px-4">
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="rounded p-1 text-red-500 transition hover:bg-red-50"
                          aria-label={`Remove ${item.medication}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-3 text-[15px] tracking-[-0.3px] text-black">
              <span className="font-semibold">TOTAL</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-2">
          <button
            type="button"
            className="h-[45px] w-[175px] rounded-lg border border-[#573FD1] bg-[#573FD1] text-[15px] font-semibold tracking-[-0.3px] text-white transition hover:bg-[#4a34b8]"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
}
