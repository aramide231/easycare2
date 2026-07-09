import { useCallback, useState } from "react";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import { formFieldInputClass } from "../../../lib/formFieldStyles";

type Props = {
  tableKey: string;
  fieldName?: string;
  placeholder?: string;
};

/** Single full-width line field for Specialist Consult sections (Figma). */
export default function SpecialistLineField({
  tableKey,
  fieldName = "value",
  placeholder = "Text here...",
}: Props) {
  const [value, setValue] = useState("");

  const clearForm = useCallback(() => setValue(""), []);

  usePendingCategoryDraft(
    tableKey,
    () => {
      const trimmed = value.trim();
      if (!trimmed) return null;
      return { [fieldName]: trimmed };
    },
    [value, fieldName],
    clearForm
  );

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={formFieldInputClass}
    />
  );
}
