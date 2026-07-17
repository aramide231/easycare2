import { useNavigate } from "react-router-dom";
import successIcon from "@doctor-shared/assets/image/Succes 2 (1).png";

type Props = {
  open: boolean;
  onClose: () => void;
};

const DeleteFileSuccessModal = ({ open, onClose }: Props) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-file-success-title"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-xl">
        <img
          src={successIcon}
          alt=""
          className="mx-auto mb-4 h-24 w-24 object-contain"
        />
        <p
          id="delete-file-success-title"
          className="text-lg font-semibold text-gray-900"
        >
          Deleted Successfully!
        </p>

        <button
          type="button"
          onClick={() => {
            onClose();
            navigate("/doctor");
          }}
          className="mt-8 w-full rounded-lg bg-[#573FD1] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4a35b8]"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeleteFileSuccessModal;
