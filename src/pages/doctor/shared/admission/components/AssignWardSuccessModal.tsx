import { BedDouble } from "lucide-react";

type Props = {
  patientName: string;
  wardName: string;
  assignedBy: string;
  open: boolean;
  onDismiss: () => void;
};

const AssignWardSuccessModal = ({
  patientName,
  wardName,
  assignedBy,
  open,
  onDismiss,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-ward-success-title"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <BedDouble className="h-8 w-8 text-green-600" strokeWidth={1.75} />
        </div>

        <p
          id="assign-ward-success-title"
          className="text-base font-semibold text-gray-900"
        >
          Successfully Assigned to Ward
        </p>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium text-gray-800">{patientName}</span> has
          been assigned to{" "}
          <span className="font-medium text-[#573FD1]">{wardName}</span>.
        </p>
        <p className="mt-1 text-xs text-gray-500">Assigned by {assignedBy}</p>

        <button
          type="button"
          className="mt-8 w-full rounded-lg bg-[#573FD1] px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a35b8]"
          onClick={onDismiss}
        >
          OK, Dismiss
        </button>
      </div>
    </div>
  );
};

export default AssignWardSuccessModal;
