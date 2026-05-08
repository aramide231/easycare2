import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ComponentRenderer from "./CategoryRenderer";

type Props = {
  label: string;
};

const SubCategoryRenderer = ({ label }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-full px-4 py-3 text-left border-b-2 border-purple-400"
      >
        <span className="absolute -bottom-[2px] left-1 bg-purple-400 text-white w-[300px] rounded-t-md px-4 py-2 shadow-md">
          {label}
        </span>

        <div className="flex justify-end">
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      {open && (
        <div className="p-4 bg-gray-50">
          <ComponentRenderer label={label} />
        </div>
      )}
    </div>
  );
};

export default SubCategoryRenderer;
