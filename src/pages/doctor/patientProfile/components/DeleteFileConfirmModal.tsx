type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteFileConfirmModal = ({ open, onCancel, onConfirm }: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-file-confirm-title"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-xl">
        <p
          id="delete-file-confirm-title"
          className="text-base font-medium text-gray-900"
        >
          Do you want to delete this file?
        </p>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg bg-purple-100 px-4 py-3 text-sm font-semibold text-[#573FD1] transition-colors hover:bg-purple-200"
          >
            No
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-[#573FD1] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4a35b8]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFileConfirmModal;
