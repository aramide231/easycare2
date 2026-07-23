import type { ReactNode } from "react";
import type { CategoryFieldType } from "../../config/categoryFieldTypes";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "../../lib/formFieldStyles";

export type InlineFieldConfig = {
  name: string;
  label: string;
  type?: CategoryFieldType | "datetime-local";
  fullWidth?: boolean;
  placeholder?: string;
  rows?: number;
};

type Props = {
  fields: InlineFieldConfig[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  renderSelectOptions?: (field: InlineFieldConfig) => ReactNode;
};

export function inlineFieldWrapperClass(field: InlineFieldConfig) {
  return field.type === "textarea" || field.fullWidth ? "col-span-2" : undefined;
}

export function inlineFieldControlClass(field: InlineFieldConfig) {
  if (field.type === "textarea") return formFieldTextareaClass;
  if (field.type === "select") return formFieldSelectClass;
  return formFieldInputClass;
}

/** Consistent two-column profile form grid with even input/select heights. */
export default function ProfileInlineFieldGrid({
  fields,
  values,
  onChange,
  renderSelectOptions,
}: Props) {
  return (
    <div className={formFieldGridClass}>
      {fields.map((field) => (
        <div key={field.name} className={inlineFieldWrapperClass(field)}>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              rows={field.rows ?? 4}
              value={values[field.name] || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={formFieldTextareaClass}
            />
          ) : field.type === "select" ? (
            <select
              value={values[field.name] || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className={formFieldSelectClass}
            >
              <option value="">-Select option-</option>
              {renderSelectOptions?.(field)}
            </select>
          ) : (
            <input
              type={field.type || "text"}
              value={values[field.name] || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={formFieldInputClass}
            />
          )}
        </div>
      ))}
    </div>
  );
}
