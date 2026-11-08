import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import type { AdmissionRecord } from "../data/mockAdmissions";
import { getPatientTypeClass } from "@doctor-shared/lib/patientTypeStyles";
import { getSubCategories } from "@/pages/doctor/patientProfile/config/subCategoryMap";
import { getSectionTableRows } from "@/pages/doctor/patientProfile/hooks/useMedicalTable";
import { buildPreviewSectionLines } from "@/pages/doctor/patientProfile/lib/previewSectionLines";
import { calculateAdmissionDays } from "../lib/calculateAdmissionDays";

type Props = {
  patient: AdmissionRecord;
  open: boolean;
  onClose: () => void;
};

const ADMISSION_CATEGORIES = [
  "Gen Consult",
  "Ante Natal Care",
  "Child Birth",
  "Post Natal Care",
  "Neo Natal Care",
  "Immunization",
  "Surgical",
] as const;

function isInPatientRow(row: Record<string, unknown>): boolean {
  const normalized = String(row.patientType ?? "In-Patient")
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  return normalized === "inpatient";
}

const AdmissionPreviewPanel = ({ patient, open, onClose }: Props) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Gen Consult");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const inPatientSections = useMemo(() => {
    const subCategories = getSubCategories(selectedCategory);
    return subCategories
      .map((sub) => {
        const allRows = getSectionTableRows(sub.label);
        const inPatientRows = allRows.filter(isInPatientRow);
        const lines = buildPreviewSectionLines(sub.label, inPatientRows);
        return {
          label: sub.label,
          count: inPatientRows.length,
          lines,
        };
      })
      .filter((section) => section.count > 0);
  }, [selectedCategory, open]);

  if (!open) return null;

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const daysSpent = calculateAdmissionDays(
    patient.dateOfAdmission,
    undefined,
    patient.timeOfAdmission
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close preview"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admission-preview-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2
            id="admission-preview-title"
            className="text-lg font-bold text-gray-900"
          >
            Admission Info
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
            <p className="text-xs text-gray-600">
              {patient.patientId} | {patient.phoneNumber}
            </p>
          </div>

          <dl className="space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Gender</dt>
              <dd className="font-medium text-gray-900">{patient.gender}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Age</dt>
              <dd className="font-medium text-gray-900">{patient.age}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Patient Type</dt>
              <dd>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getPatientTypeClass(
                    patient.patientType
                  )}`}
                >
                  {patient.patientType}
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Date of Admission</dt>
              <dd className="text-right font-medium text-gray-900">
                {patient.dateOfAdmission}
                <span className="block text-xs font-normal text-gray-500">
                  {patient.timeOfAdmission}
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Number of Days</dt>
              <dd className="font-medium text-gray-900">{daysSpent}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Ward</dt>
              <dd className="font-medium text-gray-900">{patient.ward}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Physician Name</dt>
              <dd className="font-medium text-gray-900">{patient.admittedBy}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-900">
                TREATMENT TYPE
              </h3>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-[#573FD1]">
                In-Patient Only
              </span>
            </div>

            <div className="mb-4 relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setExpandedSections([]);
                }}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-sm font-medium text-gray-800 focus:border-[#573FD1] focus:outline-none"
                aria-label="Select treatment category"
              >
                {ADMISSION_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>

            {inPatientSections.length > 0 ? (
              <ul className="space-y-2">
                {inPatientSections.map((section) => {
                  const isOpen = expandedSections.includes(section.label);
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
                        <span className="flex items-center gap-2 text-xs text-gray-500">
                          <span>
                            {section.count}{" "}
                            {section.count === 1
                              ? "In-Patient entry"
                              : "In-Patient entries"}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          )}
                        </span>
                      </button>
                      {isOpen && section.lines.length > 0 ? (
                        <ul className="border-t border-gray-200 bg-white px-4 py-2">
                          {section.lines.map((line, idx) => (
                            <li
                              key={`${section.label}-${idx}`}
                              className="flex items-center gap-3 border-b border-gray-100 py-2 text-sm last:border-b-0"
                            >
                              <span className="w-5 shrink-0 font-medium text-gray-500">
                                {idx + 1}.
                              </span>
                              <span className="min-w-0 flex-1 text-gray-800">
                                {line.text}
                              </span>
                              {line.meta ? (
                                <span className="shrink-0 text-xs text-gray-500">
                                  {line.meta}
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                No In-Patient documentation recorded yet under {selectedCategory}.
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AdmissionPreviewPanel;
