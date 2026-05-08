import { useState, useEffect } from "react";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea";
};

type Props = {
  fields: Field[];
  onSave: (data: Record<string, string>) => void;
};

const CategoryForm = ({ fields, onSave }: Props) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-calculate BMI
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
    ["temperature", "bloodPressure", "weight", "height"].forEach((key) => {
      if (!formData[key]) newErrors[key] = "Required";
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

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              value={formData[field.name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
              className="w-full border rounded p-2 text-sm"
            />
          ) : (
            <input
              type="text"
              value={formData[field.name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
              className="w-full border rounded p-2 text-sm"
            />
          )}

          {errors[field.name] && (
            <p className="text-xs text-red-500">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div className="md:col-span-2 text-center">
        <button className="px-4 py-2 bg-purple-600 text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
