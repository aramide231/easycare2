import { useEffect, useRef, useState } from "react";
import { ChevronLeft, User } from "lucide-react";
import type { AdmissionRecord } from "@/pages/nurse/patient-management/admission/data/mockAdmissions";
import {
  ASSIGNABLE_WARDS,
  type WardOption,
} from "@/pages/nurse/patient-management/admission/data/mockWards";

type Props = {
  patient: AdmissionRecord;
  open: boolean;
  onClose: () => void;
  onConfirm: (wardName: string) => void;
};

const DoctorAssignPatientToWardModal = ({
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
    if (open) {
      setWardDropdownOpen(true);
      return;
    }
    setSelectedWardId(null);
    setWardDropdownOpen(false);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-assign-ward-title"
    >
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2
            id="doctor-assign-ward-title"
            className="text-lg font-bold text-gray-900"
          >
            Assign Patient to Ward
          </h2>
        </div>

        <div className="px-5 py-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FA7401] bg-orange-50 px-4 py-2">
            <User className="h-4 w-4 text-[#FA7401]" strokeWidth={2} />
            <span className="text-sm font-medium text-[#FA7401]">
              {patient.name}
            </span>
          </div>

          <div ref={dropdownRef}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Assigned To
            </label>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <button
                type="button"
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-gray-50 ${
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
                <span className="text-xs text-gray-400">
                  {wardDropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {wardDropdownOpen && (
                <ul
                  className="max-h-56 divide-y divide-gray-100 overflow-y-auto"
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
                          className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm hover:bg-gray-50"
                          onClick={() => {
                            setSelectedWardId(ward.id);
                            setWardDropdownOpen(false);
                          }}
                        >
                          <span
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                              isSelected
                                ? "border-[#573FD1]"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <span className="h-2 w-2 rounded-full bg-[#573FD1]" />
                            )}
                          </span>
                          <span className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {ward.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {ward.occupiedBeds} of {ward.totalBeds} Beds
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

          <button
            type="button"
            disabled={!selectedWard}
            onClick={handleConfirm}
            className="mt-6 w-full rounded-lg bg-[#573FD1] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAssignPatientToWardModal;
