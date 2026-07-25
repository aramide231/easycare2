import { ChevronDown, ChevronUp } from "lucide-react";
import {
  formatNaira,
  getSectionTotal,
  type AdmissionBillSection as AdmissionBillSectionType,
} from "../data/mockAdmissionBillData";

type Props = {
  section: AdmissionBillSectionType;
  isOpen: boolean;
  checked?: boolean;
  onToggle: () => void;
  onCheckedChange?: (checked: boolean) => void;
};

const AdmissionBillSection = ({
  section,
  isOpen,
  checked = false,
  onToggle,
  onCheckedChange,
}: Props) => {
  const subtotal = getSectionTotal(section);

  return (
    <div className="overflow-hidden rounded-[15px] border border-[#D4D4D4] p-5">
      <div className="flex w-full items-center justify-between gap-4 px-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {section.showCheckbox && (
            <button
              type="button"
              aria-pressed={checked}
              onClick={() => onCheckedChange?.(!checked)}
              className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] border border-[#D4D4D4] ${
                checked ? "border-[#573FD1] bg-[#EEECFA]" : "bg-white"
              }`}
              aria-label={`Select ${section.title}`}
            >
              {checked && (
                <span className="h-3 w-3 rounded-sm bg-[#573FD1]" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="text-left text-base font-semibold tracking-[-0.32px] text-black"
          >
            {section.title}
          </button>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="flex shrink-0 items-center gap-2"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${section.title}`}
        >
          <span className="text-lg font-semibold tracking-[-0.36px] text-black">
            {formatNaira(subtotal)}
          </span>
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-gray-500" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-500" />
          )}
        </button>
      </div>

      <div className="mt-4 border-t border-[#D4D4D4]" />

      {isOpen && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#D4D4D4]">
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  S/N
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  SERVICE
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  RATE
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  DURATION
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium tracking-[-0.24px] text-[#A5A5A5]">
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-[#D4D4D4] last:border-b-0"
                >
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {row.service}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {row.rate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-[15px] tracking-[-0.3px] text-black">
                    {row.duration}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right text-[15px] tracking-[-0.3px] text-black">
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdmissionBillSection;
