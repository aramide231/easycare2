import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import type { CategoryFieldConfig } from "../../config/categoryFieldTypes";
import { YES_NO_OPTIONS } from "../../config/categoryFieldTypes";
import { VITAL_DROPDOWN_FIELD_OPTIONS } from "../../config/vitalFieldOptions";
import {
  DATE_PLACEHOLDER,
  isValidDateDDMMYY,
  parseDDMMYY,
  parseDDMMYYYY,
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

const NUMERIC_FIELD_NAMES = new Set([
  "temperature",
  "weight",
  "height",
  "bloodSugar",
  "pulseRate",
  "respiration",
  "spo2",
  "fhr",
  "birthWeight",
]);

function sanitizeDecimalInput(raw: string): string {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const [whole, ...decimals] = cleaned.split(".");
  if (decimals.length === 0) return whole;
  return `${whole}.${decimals.join("")}`;
}

function sanitizeBpInput(raw: string): string {
  const cleaned = raw.replace(/[^0-9/]/g, "");
  const [systolic, ...diastolic] = cleaned.split("/");
  if (diastolic.length === 0) return systolic;
  return `${systolic}/${diastolic.join("")}`;
}

function parseFlexibleLmpDate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const fromShort = parseDDMMYY(trimmed);
  if (fromShort) return fromShort;
  const fromLong = parseDDMMYYYY(trimmed);
  if (fromLong) return fromLong;
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function calculateEddAndEgaFromLmp(lmpValue: string): {
  edd: string;
  ega: string;
} | null {
  const lmpDate = parseFlexibleLmpDate(lmpValue);
  if (!lmpDate) return null;

  const lmpStart = new Date(
    lmpDate.getFullYear(),
    lmpDate.getMonth(),
    lmpDate.getDate()
  );

  // EDD = LMP + 280 days (40 weeks)
  const eddDate = new Date(lmpStart);
  eddDate.setDate(eddDate.getDate() + 280);
  const eddDay = String(eddDate.getDate()).padStart(2, "0");
  const eddMonth = eddDate.toLocaleString("en-GB", { month: "short" });
  const eddYear = eddDate.getFullYear();
  const edd = `${eddDay}-${eddMonth}-${eddYear}`;

  // EGA = duration of pregnancy in weeks & days from LMP to current day
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.max(
    0,
    Math.round(
      (todayStart.getTime() - lmpStart.getTime()) / (1000 * 60 * 60 * 24)
    )
  );
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  const ega = `${weeks} week${weeks === 1 ? "" : "s"}, ${days} day${
    days === 1 ? "" : "s"
  }`;

  return { edd, ega };
}

function defaultPlaceholderForField(field: CategoryFieldConfig): string {
  if (field.placeholder) return field.placeholder;
  const clean = field.label
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\?$/, "")
    .replace(/\s+/g, " ")
    .trim();
  return `Enter ${clean.toLowerCase()}`;
}

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
    const hasBmiField = fields.some((field) => field.name === "bmi");
    if (!hasBmiField) return;

    const weight = parseFloat(formData.weight);
    const heightInput = parseFloat(formData.height);

    if (weight > 0 && heightInput > 0) {
      // BMI = weight (kg) / [height (m)]^2
      // Example: 70 kg and 1.70 m -> 1.70 * 1.70 = 2.89 -> 70 / 2.89 = 24.2
      const heightM = heightInput > 3 ? heightInput / 100 : heightInput;
      const squaredHeight = heightM * heightM;
      const bmi = (weight / squaredHeight).toFixed(1);
      setFormData((prev) => (prev.bmi === bmi ? prev : { ...prev, bmi }));
    } else {
      setFormData((prev) => (prev.bmi ? { ...prev, bmi: "" } : prev));
    }
  }, [formData.weight, formData.height, fields]);

  useEffect(() => {
    const hasLmpField = fields.some(
      (field) => field.name === "lastMenstrualPeriod"
    );
    if (!hasLmpField) return;

    const lmpValue = formData.lastMenstrualPeriod || "";
    const calculated = calculateEddAndEgaFromLmp(lmpValue);
    if (calculated) {
      setFormData((prev) => {
        if (
          prev.expectedDeliveryDate === calculated.edd &&
          prev.estimatedGestationalAge === calculated.ega
        ) {
          return prev;
        }
        return {
          ...prev,
          expectedDeliveryDate: calculated.edd,
          estimatedGestationalAge: calculated.ega,
        };
      });
    } else {
      setFormData((prev) => {
        if (!prev.expectedDeliveryDate && !prev.estimatedGestationalAge) {
          return prev;
        }
        return {
          ...prev,
          expectedDeliveryDate: "",
          estimatedGestationalAge: "",
        };
      });
    }
  }, [formData.lastMenstrualPeriod, fields]);

  const syncDraft = useCallback(
    (data: Record<string, string>) => {
      if (!pendingTableKey) return;
      const hasContent = Object.values(data).some((value) => value?.trim());
      setPendingSectionEntry(pendingTableKey, hasContent ? data : null);
    },
    [pendingTableKey]
  );

  useEffect(() => {
    if (!pendingTableKey) return;
    syncDraft(formData);
  }, [formData, pendingTableKey, syncDraft]);

  useEffect(() => {
    if (!pendingTableKey) return;
    return subscribeSectionFormClear(pendingTableKey, () => {
      setFormData({});
      setErrors({});
    });
  }, [pendingTableKey]);

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
    if (pendingTableKey) {
      setPendingSectionEntry(pendingTableKey, null);
    }
    onSave(formData);
    setFormData({});
  };

  const updateField = (name: string, value: string, field?: CategoryFieldConfig) => {
    let nextValue = value;
    if (field?.type === "bp" || name === "bloodPressure") {
      nextValue = sanitizeBpInput(value);
    } else if (field?.type === "number" || NUMERIC_FIELD_NAMES.has(name)) {
      nextValue = sanitizeDecimalInput(value);
    }
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const resolveField = (field: CategoryFieldConfig): CategoryFieldConfig => {
    if (field.type === "textarea") {
      return field;
    }
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
        const placeholderText = defaultPlaceholderForField(resolvedField);
        const isReadOnlyField =
          Boolean(resolvedField.readOnly) ||
          field.name === "bmi" ||
          field.name === "expectedDeliveryDate" ||
          field.name === "estimatedGestationalAge";
        const isNumericField =
          resolvedField.type === "number" ||
          NUMERIC_FIELD_NAMES.has(field.name);
        const isBpField =
          resolvedField.type === "bp" || field.name === "bloodPressure";

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
              onChange={(e) => updateField(field.name, e.target.value, resolvedField)}
              placeholder={placeholderText}
              className={`${formFieldTextareaClass} ${
                field.fullWidth ? "min-h-[180px]" : ""
              }`}
            />
          ) : isSelectField(resolvedField) ? (
            <div className="relative">
              <select
                value={formData[field.name] || ""}
                onChange={(e) => updateField(field.name, e.target.value, resolvedField)}
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
              onChange={(next) => updateField(field.name, next, resolvedField)}
              allowFutureOnly={
                Boolean(resolvedField.dateAllowFutureOnly) ||
                isFutureAppointmentDateField(field.name)
              }
            />
          ) : resolvedField.type === "amount" ? (
            <NairaAmountInput
              value={sanitizeAmountDigits(formData[field.name] || "")}
              onChange={(digits) => updateField(field.name, digits, resolvedField)}
            />
          ) : (
            <input
              type="text"
              inputMode={
                isNumericField ? "decimal" : isBpField ? "numeric" : undefined
              }
              readOnly={isReadOnlyField}
              value={formData[field.name] || ""}
              onChange={(e) => updateField(field.name, e.target.value, resolvedField)}
              placeholder={placeholderText}
              className={`${formFieldInputClass} ${
                isReadOnlyField ? "bg-gray-50 font-semibold text-gray-800" : ""
              }`}
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
