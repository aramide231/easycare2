import { X } from "lucide-react";
import type { AdmissionRecord } from "../data/mockAdmissions";
import { getPatientTypeClass } from "@/pages/nurse/lib/patientTypeStyles";

type Props = {
  patient: AdmissionRecord;
  open: boolean;
  onClose: () => void;
};

const AdmissionPreviewPanel = ({ patient, open, onClose }: Props) => {
  if (!open) return null;

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
              <dt className="text-gray-500">Ward</dt>
              <dd className="font-medium text-gray-900">{patient.ward}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Physician Name</dt>
              <dd className="font-medium text-gray-900">{patient.admittedBy}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-700">
              Treatment Summary Since Admission
            </h3>
            <p className="text-sm text-gray-600">
              Detailed treatment history for this admission will appear here as
              clinical entries are recorded on the patient profile.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AdmissionPreviewPanel;
