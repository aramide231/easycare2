import { ChevronDown, ChevronUp } from "lucide-react";
import { resolveCategoryForm } from "@/pages/doctor/patientProfile/lib/resolveCategoryForm";
import type { SubCategory } from "@/pages/doctor/patientProfile/config/subCategoryMap";

type Props = {
  sections: SubCategory[];
  expandedCategory: string | null;
  onToggle: (label: string) => void;
  /** When set, uses category-specific forms (e.g. Gen Consult Figma). */
  selectedCategory?: string | null;
};

const CategoryFormAccordion = ({
  sections,
  expandedCategory,
  onToggle,
  selectedCategory = null,
}: Props) => {
  return (
    <div className="flex w-full flex-col divide-y divide-gray-200">
      {sections.map((section) => {
        const isOpen = expandedCategory === section.label;
        const form = resolveCategoryForm(selectedCategory, section.label);

        return (
          <div key={section.label} className="py-3 first:pt-0 last:pb-0">
            <button
              type="button"
              onClick={() => onToggle(section.label)}
              className="relative w-full border-b-2 border-[#573FD1] py-3 text-left"
            >
              <span className="absolute -bottom-0.5 left-0 z-10 max-w-[min(100%,20rem)] rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                {section.label}
              </span>
              <div className="flex min-h-[2.25rem] items-center justify-end pr-1">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
                )}
              </div>
            </button>

            {isOpen && (
              <div className="pt-3">
                {form ?? (
                  <p className="px-1 py-2 text-sm text-gray-500">
                    Form for this section is not available yet.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFormAccordion;
