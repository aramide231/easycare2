import ModalCloseButton from "@/components/ui/ModalCloseButton";
import type { AdmissionRecord } from "../data/mockAdmissions";
import {
  getTreatmentCategoryLabel,
  getTreatmentReview,
  type TreatmentSection,
  type TreatmentTableSection,
  type TreatmentTextSection,
} from "../data/mockTreatmentReview";

type Props = {
  patient: AdmissionRecord;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#D4D4D4] py-3 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="max-w-[55%] text-right font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}

function TextSectionContent({ fields }: TreatmentTextSection) {
  const midpoint = Math.ceil(fields.length / 2);
  const left = fields.slice(0, midpoint);
  const right = fields.slice(midpoint);

  return (
    <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
      <div>
        {left.map((field) => (
          <FieldRow key={field.label} label={field.label} value={field.value} />
        ))}
      </div>
      <div>
        {right.map((field) => (
          <FieldRow key={field.label} label={field.label} value={field.value} />
        ))}
      </div>
    </div>
  );
}

function TableSectionContent({
  columns,
  rows,
  totalLabel,
  totalValue,
}: TreatmentTableSection) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            {columns.map((column) => (
              <th key={column} className="px-3 py-2 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5 text-gray-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {totalLabel && totalValue && (
            <tr className="bg-gray-50 font-semibold text-gray-900">
              <td className="px-3 py-2.5">{totalLabel}</td>
              <td className="px-3 py-2.5">{totalValue}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SectionTab({ title }: { title: string }) {
  return (
    <div className="relative mb-4 border-b-2 border-[#573FD1]">
      <span className="inline-block rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
        {title}
      </span>
    </div>
  );
}

function TreatmentSectionBlock({
  section,
  isFirst = false,
}: {
  section: TreatmentSection;
  isFirst?: boolean;
}) {
  return (
    <div className={isFirst ? "mt-4" : "mt-8"}>
      <SectionTab title={section.title} />
      {section.content.type === "text" ? (
        <TextSectionContent {...section.content} />
      ) : (
        <TableSectionContent {...section.content} />
      )}
    </div>
  );
}

const AdmissionPreviewPanel = ({
  patient,
  open,
  onClose,
  onConfirm,
}: Props) => {
  if (!open) return null;

  const treatmentReview = getTreatmentReview(patient.treatmentCategory);
  const treatmentLabel = getTreatmentCategoryLabel(patient.treatmentCategory);

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close review"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300"
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
          <ModalCloseButton onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div>
            <SectionTab title="DETAILS" />
            <TextSectionContent
              fields={[
                { label: "Patient Name", value: patient.name },
                {
                  label: "Patient ID",
                  value: `${patient.patientId} | ${patient.phoneNumber}`,
                },
                { label: "Gender", value: patient.gender },
                { label: "Age", value: String(patient.age) },
                { label: "Patient Type", value: patient.patientType },
                {
                  label: "Date of Admission",
                  value: `${patient.dateOfAdmission} · ${patient.timeOfAdmission}`,
                },
                { label: "Ward", value: patient.ward },
                { label: "Physician Name", value: patient.admittedBy },
              ]}
            />
          </div>

          <div className="mt-8">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Treatment Type
              </p>
              <p className="mt-1 text-base font-bold text-gray-900">
                {treatmentLabel}
              </p>
            </div>

            {treatmentReview.sections.map((section, index) => (
              <TreatmentSectionBlock
                key={section.title}
                section={section}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-lg bg-[#573FD1] px-10 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b0]"
          >
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdmissionPreviewPanel;
