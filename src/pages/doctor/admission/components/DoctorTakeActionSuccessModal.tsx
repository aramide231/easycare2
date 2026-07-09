import { ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  patientName: string;
  message: string;
  open: boolean;
  onDismiss: () => void;
};

const DoctorTakeActionSuccessModal = ({
  patientName,
  message,
  open,
  onDismiss,
}: Props) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-take-action-success-title"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
          <ClipboardCheck
            className="h-8 w-8 text-[#573FD1]"
            strokeWidth={1.75}
          />
        </div>

        <p
          id="doctor-take-action-success-title"
          className="text-base font-semibold text-gray-900"
        >
          {patientName}
        </p>
        <p className="mt-1 text-sm text-gray-600">{message}</p>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-lg border border-[#573FD1] px-3 py-3 text-sm font-medium text-[#573FD1] transition-colors hover:bg-purple-50"
            onClick={() => {
              onDismiss();
              navigate("/doctor");
            }}
          >
            Go To Dashboard
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-[#573FD1] px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a35b8]"
            onClick={onDismiss}
          >
            OK, Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorTakeActionSuccessModal;
