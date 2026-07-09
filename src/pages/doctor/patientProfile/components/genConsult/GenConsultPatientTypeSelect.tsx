import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  GEN_CONSULT_PATIENT_TYPES,
  getGenConsultPatientTypeById,
  type GenConsultPatientTypeId,
} from "../../config/genConsultPatientTypes";
import { formFieldSelectClass } from "../../lib/formFieldStyles";

type Props = {
  value: GenConsultPatientTypeId | null;
  onChange: (value: GenConsultPatientTypeId | null) => void;
};

export default function GenConsultPatientTypeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = getGenConsultPatientTypeById(value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`${formFieldSelectClass} flex items-center justify-between pr-10 text-left`}
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected ? selected.label : "-Select an Option-"}
        </span>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 overflow-y-auto rounded-[8px] border border-gray-200 bg-white py-1 shadow-lg"
        >
          {GEN_CONSULT_PATIENT_TYPES.map((option) => (
            <li key={option.id} role="option" aria-selected={value === option.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                className="flex w-full items-baseline gap-1 px-3 py-2.5 text-left text-sm hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{option.label}</span>
                <span className="text-xs italic text-gray-500">
                  ({option.description})
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
