import { FaFlag } from "react-icons/fa";
import { X } from "lucide-react";
import FlagProfileReport from "@/components/ui/flagprofile-report";

type PatientInfo = {
  id?: number;
  firstName?: string;
  lastName?: string;
  patientId?: string;
  staffName?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  patient: PatientInfo;
};

const FlagPatientModal = ({ open, onClose, patient }: Props) => {
  if (!open) return null;

  const patientName = [patient.firstName, patient.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flag-patient-modal-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <FaFlag className="text-xl text-orange-500" aria-hidden />
            </div>
            <div className="min-w-0">
              <h2
                id="flag-patient-modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                Flag Patient
              </h2>
              <p className="truncate text-sm text-gray-500">
                {patientName}
                {patient.patientId ? ` · ${patient.patientId}` : ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close flag patient modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <FlagProfileReport patientOverride={patient} embedded />
        </div>
      </div>
    </div>
  );
};

export default FlagPatientModal;
