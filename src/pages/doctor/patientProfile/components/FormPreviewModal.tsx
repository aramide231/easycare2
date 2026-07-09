import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PreviewSectionLine } from "../lib/previewSectionLines";

export type PreviewSection = {
  label: string;
  count: number;
  lines?: PreviewSectionLine[];
};

type Props = {
  open: boolean;
  categoryName: string;
  sections: PreviewSection[];
  onClose: () => void;
};

const FormPreviewModal = ({
  open,
  categoryName,
  sections,
  onClose,
}: Props) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  if (!open) return null;

  const toggleSection = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-preview-title"
    >
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <h2
          id="form-preview-title"
          className="text-lg font-semibold text-gray-900"
        >
          Preview — {categoryName}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Tap a section to show or hide its summary.
        </p>

        <ul className="mt-4 space-y-2">
          {sections.map((section) => {
            const isOpen = expanded.includes(section.label);
            const hasLines = Boolean(section.lines?.length);

            return (
              <li
                key={section.label}
                className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.label)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm"
                >
                  <span className="font-medium text-gray-800">
                    {section.label}
                  </span>
                  <span className="flex items-center gap-2 text-gray-500">
                    <span>
                      {section.count}{" "}
                      {section.count === 1 ? "entry" : "entries"}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    )}
                  </span>
                </button>

                {isOpen && hasLines ? (
                  <ul className="border-t border-gray-200 bg-white px-4 py-2">
                    {section.lines!.map((line, index) => (
                      <li
                        key={`${section.label}-${index}`}
                        className="flex items-center gap-3 border-b border-gray-100 py-2.5 text-sm last:border-b-0"
                      >
                        <span className="w-6 shrink-0 font-medium text-gray-500">
                          {index + 1}.
                        </span>
                        <span className="min-w-0 flex-1 text-gray-800">
                          {line.text}
                        </span>
                        {line.meta ? (
                          <span className="shrink-0 text-gray-600">
                            {line.meta}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {isOpen && !hasLines ? (
                  <p className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
                    No line-item summary for this section.
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#573FD1] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4a35b8]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FormPreviewModal;
