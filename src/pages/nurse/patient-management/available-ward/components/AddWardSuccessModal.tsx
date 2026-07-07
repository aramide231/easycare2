import { BedDouble } from "lucide-react";
import ModalCloseButton from "@/components/ui/ModalCloseButton";

type Props = {
  wardName: string;
  bedNumber: string;
  open: boolean;
  onDismiss: () => void;
};

const AddWardSuccessModal = ({
  wardName,
  bedNumber,
  open,
  onDismiss,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-ward-success-title"
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
        <div className="absolute right-4 top-4">
          <ModalCloseButton onClick={onDismiss} />
        </div>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <BedDouble className="h-8 w-8 text-green-600" strokeWidth={1.75} />
        </div>

        <p
          id="add-ward-success-title"
          className="text-base font-semibold text-gray-900"
        >
          Ward Added Successfully
        </p>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium text-[#573FD1]">{wardName}</span> (
          {bedNumber}) has been added to the available ward list.
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

export default AddWardSuccessModal;
