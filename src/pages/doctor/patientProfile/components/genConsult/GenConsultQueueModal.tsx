type Props = {
  open: boolean;
  patientName: string;
  onClose: () => void;
};

export default function GenConsultQueueModal({
  open,
  patientName,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="gen-consult-queue-title"
    >
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2
          id="gen-consult-queue-title"
          className="text-lg font-semibold text-gray-900"
        >
          Not Queued For Visit
        </h2>
        <p className="mt-3 text-sm text-gray-700">
          {patientName}&apos;s name hasn&apos;t being Queued To Visit The
          Clinician Yet.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#573FD1] px-4 py-3 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
