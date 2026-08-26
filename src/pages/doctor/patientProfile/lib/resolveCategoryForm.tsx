import type { ComponentType, ReactNode } from "react";
import { categoryComponents } from "@/pages/doctor/patientProfile/components/CategoryRenderer";

/**
 * Compatibility shim for nurse CategoryFormAccordion after doctor module update.
 * Maps section labels to category form components from CategoryRenderer.
 */
export function resolveCategoryForm(
  _selectedCategory: string | null | undefined,
  sectionLabel: string,
  _module?: string,
): ReactNode {
  const FormComponent = categoryComponents[sectionLabel] as
    | ComponentType
    | undefined;

  if (!FormComponent) {
    return (
      <p className="px-1 py-2 text-sm text-gray-500">
        Form for this section is not available yet.
      </p>
    );
  }

  return <FormComponent />;
}
