import { X } from "lucide-react";

type Props = {
  onClick: () => void;
  className?: string;
  label?: string;
};

const ModalCloseButton = ({
  onClick,
  className = "",
  label = "Close",
}: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 ${className}`}
    aria-label={label}
  >
    <X className="h-5 w-5" />
  </button>
);

export default ModalCloseButton;
