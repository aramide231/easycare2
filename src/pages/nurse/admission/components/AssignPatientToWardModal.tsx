import { useEffect, useRef, useState } from "react";
import { ChevronLeft, User, X } from "lucide-react";
import type { AdmissionRecord } from "../data/mockAdmissions";
import {
  ASSIGNABLE_WARDS,
  type WardOption,
} from "../data/mockWards";

type Props = {
  patient: AdmissionRecord;
  open: boolean;
  onClose: () => void;
  onConfirm: (wardName: string) => void;
};

const AssignPatientToWardModal = ({
  patient,
  open,
  onClose,
  onConfirm,
}: Props) => {
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);
  const [wardDropdownOpen, setWardDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedWard: WardOption | undefined = ASSIGNABLE_WARDS.find(
    (w) => w.id === selectedWardId
  );

  useEffect(() => {
    if (!open) {
      setSelectedWardId(null);
      setWardDropdownOpen(false);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setWardDropdownOpen(false);
      }
    };
    if (wardDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wardDropdownOpen]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!selectedWard) return;
    onConfirm(selectedWard.name);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close assign ward"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-ward-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2
              id="assign-ward-title"
              className="text-xl font-bold text-gray-900"
            >
              Assign Patient to Ward
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FA7401] bg-orange-50 px-4 py-2">
            <User className="h-5 w-5 text-[#FA7401]" strokeWidth={2} />
            <span className="text-base font-medium text-[#FA7401]">
              {patient.name}
            </span>
          </div>

          <div className="mb-8">
            <label className="mb-3 block text-base font-medium text-gray-700">
              Select Available Ward
            </label>
            <div
              ref={dropdownRef}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <button
                type="button"
                className={`flex w-full items-center justify-between px-5 py-4 text-left text-base hover:bg-gray-50 ${
                  wardDropdownOpen ? "border-b border-gray-200" : ""
                }`}
                onClick={() => setWardDropdownOpen((prev) => !prev)}
                aria-expanded={wardDropdownOpen}
                aria-haspopup="listbox"
              >
                <span
                  className={
                    selectedWard ? "font-medium text-gray-900" : "text-gray-500"
                  }
                >
                  {selectedWard ? selectedWard.name : "Select Ward"}
                </span>
                <span className="text-sm text-gray-400">
                  {wardDropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {wardDropdownOpen && (
                <ul
                  className="max-h-72 divide-y divide-gray-100 overflow-y-auto"
                  role="listbox"
                >
                  {ASSIGNABLE_WARDS.map((ward) => {
                    const isSelected = selectedWardId === ward.id;
                    return (
                      <li
                        key={ward.id}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <button
                          type="button"
                          className="flex w-full items-start gap-4 px-5 py-4 text-left hover:bg-gray-50"
                          onClick={() => {
                            setSelectedWardId(ward.id);
                            setWardDropdownOpen(false);
                          }}
                        >
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              isSelected
                                ? "border-[#573FD1]"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <span className="h-2.5 w-2.5 rounded-full bg-[#573FD1]" />
                            )}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-base font-medium text-gray-800">
                              {ward.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {ward.occupiedBeds} of {ward.totalBeds} Beds
                              available
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-8 py-6">
          <button
            type="button"
            disabled={!selectedWard}
            onClick={handleConfirm}
            className="w-full rounded-xl bg-[#573FD1] py-4 text-base font-medium text-white transition-colors hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Assign to Ward
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AssignPatientToWardModal;
