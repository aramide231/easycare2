import { ChevronDown, ChevronUp } from "lucide-react";
import type { SubCategory } from "@/pages/doctor/patientProfile/config/subCategoryMap";
import { DIAGNOSTICS_RECORD_REGISTRY } from "../data/diagnosticsRecordRegistry";
import DiagnosticsRecordTable from "./DiagnosticsRecordTable";

type Props = {
  sections: SubCategory[];
  expandedCategories: string[];
  onToggle: (label: string) => void;
};

export default function DiagnosticsRecordAccordion({
  sections,
  expandedCategories,
  onToggle,
}: Props) {
  return (
    <div className="flex w-full flex-col divide-y divide-gray-200">
      {sections.map((section) => {
        const isOpen = expandedCategories.includes(section.label);
        const config = DIAGNOSTICS_RECORD_REGISTRY[section.label];

        return (
          <div key={section.label} className="relative isolate py-3 first:pt-0 last:pb-0">
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

            <div className={isOpen ? "relative z-10 pt-4" : "hidden"}>
              {config ? (
                <DiagnosticsRecordTable
                  sectionName={section.label}
                  config={config}
                />
              ) : (
                <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                  No record table available for this section.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
