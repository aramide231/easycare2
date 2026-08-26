import { FileDown } from "lucide-react";
import ModalCloseButton from "@/components/ui/ModalCloseButton";

type Props = {
  reportTitle: string;
  formatLabel: string;
  open: boolean;
  onDismiss: () => void;
};

const ExportDownloadSuccessModal = ({
  reportTitle,
  formatLabel,
  open,
  onDismiss,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-success-title"
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
        <div className="absolute right-4 top-4">
          <ModalCloseButton onClick={onDismiss} />
        </div>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <FileDown className="h-8 w-8 text-green-600" strokeWidth={1.75} />
        </div>

        <p
          id="export-success-title"
          className="text-base font-semibold text-gray-900"
        >
          Download Successful
        </p>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium text-gray-800">{reportTitle}</span> has
          been downloaded as{" "}
          <span className="font-medium text-[#573FD1]">{formatLabel}</span>.
        </p>

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

export default ExportDownloadSuccessModal;
