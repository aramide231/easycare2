import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import type { CategoryFieldConfig } from "../../config/categoryFieldTypes";
import { YES_NO_OPTIONS } from "../../config/categoryFieldTypes";
import { VITAL_DROPDOWN_FIELD_OPTIONS } from "../../config/vitalFieldOptions";
import {
  DATE_PLACEHOLDER,
  isValidDateDDMMYY,
} from "../../lib/dateFormat";
import FormDatePicker from "./FormDatePicker";
import { isFutureAppointmentDateField } from "../../lib/dateFieldRules";
import NairaAmountInput, { sanitizeAmountDigits } from "./NairaAmountInput";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "../../lib/formFieldStyles";
import {
  setPendingSectionEntry,
  subscribeSectionFormClear,
} from "../../hooks/useMedicalTable";

type Props = {
  fields: CategoryFieldConfig[];
  onSave: (data: Record<string, string>) => void;
  showSaveButton?: boolean;
  /** When Save is hidden, sync draft to pending state for category Submit. */
  pendingTableKey?: string;
};

const CategoryForm = ({
  fields,
  onSave,
  showSaveButton = false,
  pendingTableKey,
}: Props) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const weight = parseFloat(formData.weight);
    const heightCm = parseFloat(formData.height);

    if (weight > 0 && heightCm > 0) {
      const heightM = heightCm / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(1);
      setFormData((prev) => ({ ...prev, bmi }));
    }
  }, [formData.weight, formData.height]);

  const syncDraft = useCallback(
    (data: Record<string, string>) => {
      if (!pendingTableKey) return;
      const hasContent = Object.values(data).some((value) => value?.trim());
      setPendingSectionEntry(pendingTableKey, hasContent ? data : null);
    },
    [pendingTableKey]
  );

  useEffect(() => {
    if (showSaveButton || !pendingTableKey) return;
    syncDraft(formData);
  }, [formData, pendingTableKey, showSaveButton, syncDraft]);

  useEffect(() => {
    if (!pendingTableKey || showSaveButton) return;
    return subscribeSectionFormClear(pendingTableKey, () => {
      setFormData({});
      setErrors({});
    });
  }, [pendingTableKey, showSaveButton]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.name]?.trim() ?? "";

      if (field.required && !value) {
        newErrors[field.name] = "Required";
        return;
      }

      if (field.type === "date" && value && !isValidDateDDMMYY(value)) {
        newErrors[field.name] = `Use ${DATE_PLACEHOLDER} format`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
    setFormData({});
  };

  const updateField = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resolveField = (field: CategoryFieldConfig): CategoryFieldConfig => {
    const vitalOptions = VITAL_DROPDOWN_FIELD_OPTIONS[field.name];
    if (vitalOptions) {
      return { ...field, type: "select", options: vitalOptions };
    }
    return field;
  };

  const isSelectField = (field: CategoryFieldConfig) =>
    field.type === "select" || Boolean(field.options?.length);

  return (
    <form onSubmit={handleSubmit} className={formFieldGridClass}>
      {fields.map((field) => {
        const resolvedField = resolveField(field);

        return (
        <div
          key={field.name}
          className={field.fullWidth ? "col-span-2" : undefined}
        >
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {resolvedField.label}
          </label>

          {resolvedField.type === "textarea" ? (
            <textarea
              rows={field.fullWidth ? 8 : 3}
              value={formData[field.name] || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={resolvedField.placeholder}
              className={`${formFieldTextareaClass} ${
                field.fullWidth ? "min-h-[180px]" : ""
              }`}
            />
          ) : isSelectField(resolvedField) ? (
            <div className="relative">
              <select
                value={formData[field.name] || ""}
                onChange={(e) => updateField(field.name, e.target.value)}
                className={`${formFieldSelectClass} pr-10`}
              >
                <option value="">-Select an Option-</option>
                {(resolvedField.options ?? YES_NO_OPTIONS).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>
          ) : resolvedField.type === "date" ? (
            <FormDatePicker
              value={formData[field.name] || ""}
              onChange={(next) => updateField(field.name, next)}
              allowFutureOnly={
                Boolean(resolvedField.dateAllowFutureOnly) ||
                isFutureAppointmentDateField(field.name)
              }
            />
          ) : resolvedField.type === "amount" ? (
            <NairaAmountInput
              value={sanitizeAmountDigits(formData[field.name] || "")}
              onChange={(digits) => updateField(field.name, digits)}
            />
          ) : (
            <input
              type="text"
              readOnly={field.name === "bmi"}
              value={formData[field.name] || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={resolvedField.placeholder}
              className={formFieldInputClass}
            />
          )}

          {errors[field.name] && (
            <p className="text-xs text-red-500">{errors[field.name]}</p>
          )}
        </div>
        );
      })}

      {showSaveButton && (
        <div className="col-span-2 pt-2 text-center">
          <button
            type="submit"
            className="w-full max-w-xs rounded-lg bg-[#573FD1] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
};

export default CategoryForm;
