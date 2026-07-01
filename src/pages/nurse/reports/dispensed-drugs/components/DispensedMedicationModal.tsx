import { X, Printer } from "lucide-react";
import { getPatientTypeClass } from "@/pages/nurse/shared/lib/patientTypeStyles";
import {
  formatDispensedDate,
  formatDispensedTime,
  formatMedicationLine,
  type DispensedVisitRecord,
} from "../data/mockDispensedDrugRecords";

type Props = {
  record: DispensedVisitRecord;
  open: boolean;
  onClose: () => void;
};

const DispensedMedicationModal = ({ record, open, onClose }: Props) => {
  if (!open) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close preview"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dispensed-med-modal-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2
            id="dispensed-med-modal-title"
            className="text-lg font-bold text-gray-900"
          >
            Dispensed Medication
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
            <p className="text-sm font-semibold text-gray-900">{record.name}</p>
            <p className="text-xs text-gray-600">{record.patientId}</p>
            <p className="mt-1 text-xs text-gray-600">
              <span className="font-medium text-gray-700">Date:</span>{" "}
              {formatDispensedDate(record.date)}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-700">Time:</span>{" "}
              {formatDispensedTime(record.date)}
            </p>
          </div>

          <dl className="space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Date</dt>
              <dd className="font-medium text-gray-900">
                {formatDispensedDate(record.date)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Time</dt>
              <dd className="font-medium text-gray-900">
                {formatDispensedTime(record.date)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Gender</dt>
              <dd className="font-medium text-gray-900">{record.gender}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Age</dt>
              <dd className="font-medium text-gray-900">{record.age}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Patient Type</dt>
              <dd>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${getPatientTypeClass(record.patientType)}`}
                >
                  {record.patientType}
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Complaint</dt>
              <dd className="max-w-[60%] text-right font-medium text-gray-900">
                {record.complaints}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Diagnosis</dt>
              <dd className="max-w-[60%] text-right font-medium text-gray-900">
                {record.diagnosis}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <div className="relative mb-4 border-b-2 border-[#573FD1]">
              <span className="inline-block rounded-t-md bg-[#573FD1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                Medication Dispensed
              </span>
            </div>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-800">
              {record.medications.map((med, index) => (
                <li key={`${record.id}-med-${index}`}>
                  {formatMedicationLine(med)}
                </li>
              ))}
            </ol>
          </div>

          <dl className="mt-8 space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Clinician&apos;s Name</dt>
              <dd className="font-medium text-gray-900">
                {record.clinicianName}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Total Medication Given</dt>
              <dd className="font-medium text-gray-900">
                {record.medications.length}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Dispensed By</dt>
              <dd className="font-medium text-gray-900">{record.staffName}</dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#573FD1] bg-white px-8 py-2.5 text-sm font-semibold text-[#573FD1] hover:bg-purple-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-[#573FD1] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b0]"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </aside>
    </div>
  );
};

export default DispensedMedicationModal;
