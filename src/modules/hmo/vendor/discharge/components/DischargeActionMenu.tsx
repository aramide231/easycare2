import { ClipboardList } from "lucide-react";

type Props = {
  onReAdmit: () => void;
};

const DischargeActionMenu = ({ onReAdmit }: Props) => {
  return (
    <div
      className="absolute right-0 top-full z-30 mt-1 min-w-[10.5rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
      role="menu"
    >
      <button
        type="button"
        role="menuitem"
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50"
        onClick={(e) => {
          e.stopPropagation();
          onReAdmit();
        }}
      >
        <ClipboardList
          className="h-[18px] w-[18px] shrink-0 text-gray-500"
          strokeWidth={1.75}
        />
        Re-Admit
      </button>
    </div>
  );
};

export default DischargeActionMenu;
