import { BedDouble, ClipboardPen } from "lucide-react";

type Props = {
  onAssignToWard: () => void;
  onTakeAction: () => void;
};

const AdmissionActionMenu = ({ onAssignToWard, onTakeAction }: Props) => {
  return (
    <div
      className="absolute right-0 top-full z-30 mt-1 min-w-[11.5rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
      role="menu"
    >
      <button
        type="button"
        role="menuitem"
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50"
        onClick={(e) => {
          e.stopPropagation();
          onAssignToWard();
        }}
      >
        <BedDouble className="h-[18px] w-[18px] shrink-0 text-gray-500" strokeWidth={1.75} />
        Assign to Ward
      </button>
      <div className="mx-3 border-t border-gray-100" />
      <button
        type="button"
        role="menuitem"
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50"
        onClick={(e) => {
          e.stopPropagation();
          onTakeAction();
        }}
      >
        <ClipboardPen className="h-[18px] w-[18px] shrink-0 text-gray-500" strokeWidth={1.75} />
        Take Action
      </button>
    </div>
  );
};

export default AdmissionActionMenu;
