import type { ComponentType } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { categoryComponents } from "./CategoryRenderer";
import ImmunizationVitalSigns from "./categories/immunization/ImmunizationVitalSigns";
import GenConsultVitalSigns from "./categories/genConsult/GenConsultVitalSigns";
import NeoNatalVitalSigns from "./categories/neonatal/NeoNatalVitalSigns";
import SpecialistPresentingComplaints from "./categories/specialistConsult/SpecialistPresentingComplaints";
import type { SubCategory } from "../config/subCategoryMap";

const healthCategorySectionOverrides: Record<
  string,
  Record<string, ComponentType>
> = {
  Immunization: {
    "VITAL SIGNS": ImmunizationVitalSigns,
  },
  "Gen Consult": {
    "VITAL SIGNS": GenConsultVitalSigns,
  },
  "Neo Natal Care": {
    "VITAL SIGNS": NeoNatalVitalSigns,
  },
  "Specialist Consult": {
    "PRESENTING COMPLAINTS": SpecialistPresentingComplaints,
  },
};

function resolveFormComponent(
  healthCategory: string | null | undefined,
  sectionLabel: string
): ComponentType | undefined {
  const override =
    healthCategory &&
    healthCategorySectionOverrides[healthCategory]?.[sectionLabel];
  return override ?? categoryComponents[sectionLabel];
}

type Props = {
  sections: SubCategory[];
  expandedCategories: string[];
  onToggle: (label: string) => void;
  healthCategory?: string | null;
  highlightedSections?: string[];
};

const CategoryFormAccordion = ({
  sections,
  expandedCategories,
  onToggle,
  healthCategory,
  highlightedSections = [],
}: Props) => {
  return (
    <div className="flex w-full flex-col divide-y divide-gray-200">
      {sections.map((section) => {
        const isOpen = expandedCategories.includes(section.label);
        const FormComponent = resolveFormComponent(
          healthCategory,
          section.label
        );

        const isHighlighted = highlightedSections.includes(section.label);

        return (
          <div
            key={section.label}
            className={`relative isolate py-3 first:pt-0 last:pb-0 ${
              isHighlighted ? "rounded-lg ring-2 ring-amber-400 ring-offset-1" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => onToggle(section.label)}
              className="relative z-20 w-full border-b-2 border-[#573FD1] bg-white py-3 text-left"
            >
              <span className="pointer-events-none absolute -bottom-0.5 left-0 z-10 max-w-full truncate rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
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

            <div
              className={`relative z-0 min-w-0 pt-3 ${isOpen ? "" : "hidden"}`}
              aria-hidden={!isOpen}
            >
              {FormComponent ? (
                section.fieldLayout ? (
                  <FormComponent fieldLayout={section.fieldLayout} />
                ) : (
                  <FormComponent />
                )
              ) : (
                <p className="px-1 py-2 text-sm text-gray-500">
                  Form for this section is not available yet.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFormAccordion;
