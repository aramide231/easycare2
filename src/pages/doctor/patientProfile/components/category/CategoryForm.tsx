import { useState, useEffect } from "react";
import type { CategoryFieldConfig } from "../../config/categoryFieldTypes";
import { YES_NO_OPTIONS } from "../../config/categoryFieldTypes";
import {
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "../../lib/formFieldStyles";
import {
  genConsultInputClass,
  genConsultSelectClass,
  genConsultTextareaClass,
} from "../categories/genConsult/genConsultStyles";

type Props = {
  fields: CategoryFieldConfig[];
  onSave: (data: Record<string, string>) => void;
  /** Full-width fields for Gen Consult / Figma grid layouts. */
  fullWidth?: boolean;
  /** Use Gen Consult Figma field styling. */
  variant?: "default" | "genConsult";
};

const CategoryForm = ({
  fields,
  onSave,
  fullWidth = false,
  variant = "default",
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields
      .filter((field) => field.required)
      .forEach((field) => {
        if (!formData[field.name]?.trim()) {
          newErrors[field.name] = "Required";
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

  const isGenConsult = variant === "genConsult";

  const inputClass = isGenConsult
    ? genConsultInputClass
    : fullWidth
      ? formFieldInputClass.replace("max-w-[354px]", "max-w-none")
      : formFieldInputClass;
  const textareaClass = isGenConsult
    ? genConsultTextareaClass
    : fullWidth
      ? formFieldTextareaClass.replace("max-w-[354px]", "max-w-none")
      : formFieldTextareaClass;
  const selectClass = isGenConsult
    ? genConsultSelectClass
    : fullWidth
      ? formFieldSelectClass.replace("max-w-[354px]", "max-w-none")
      : formFieldSelectClass;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.fullWidth ? "md:col-span-2" : undefined}
        >
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-800">
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              rows={3}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={textareaClass}
            />
          ) : field.type === "select" ? (
            <select
              value={formData[field.name] || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={selectClass}
            >
              <option value="">
                {field.placeholder ?? "-Select an Option-"}
              </option>
              {(field.options ?? YES_NO_OPTIONS).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type === "date" ? "date" : "text"}
              readOnly={field.name === "bmi"}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={inputClass}
            />
          )}

          {errors[field.name] && (
            <p className="text-xs text-red-500">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="md:col-span-2 pt-2 text-center">
        <button
          type="submit"
          className="w-full max-w-xs rounded-lg bg-[#573FD1] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4a35b8]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
