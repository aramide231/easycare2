import { X } from "lucide-react";

type Props = {
  open: boolean;
  action: "preview" | "submit";
  unfilledSections: string[];
  onClose: () => void;
};

export default function EmptyFormAlertModal({
  open,
  action,
  unfilledSections,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="pr-8 text-lg font-semibold text-gray-900">
          Incomplete form
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {action === "preview"
            ? "Save all sections before previewing:"
            : "Save all sections before submitting:"}
        </p>
        <ul className="mt-4 max-h-48 list-disc space-y-1 overflow-y-auto pl-5 text-sm text-gray-700">
          {unfilledSections.map((section) => (
            <li key={section}>{section}</li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#573FD1] px-6 py-2 text-sm font-semibold text-white hover:bg-[#4a35b0]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
