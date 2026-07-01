import { X } from "lucide-react";
import FlagProfileReport from "@/pages/nurse/patient-profile/flag-profile/components/FlagProfileReport";

type Patient = {
  firstName?: string;
  lastName?: string;
  patientId?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  patient: Patient;
};

export default function FlagPatientModal({ open, onClose, patient }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Flag Patient</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <FlagProfileReport />
        </div>
      </div>
    </div>
  );
}
