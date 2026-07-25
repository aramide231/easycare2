import { useEffect, useMemo, useState } from "react";
import { ChevronDown, User } from "lucide-react";
import ModalCloseButton from "@/components/ui/ModalCloseButton";
import { ASSIGNABLE_WARDS } from "@hmo/vendor/admission/data/mockWards";
import type { HmoAdmissionRecord } from "../data/mockAdmissions";

type Props = {
  patient: HmoAdmissionRecord;
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
  const [selectedWardId, setSelectedWardId] = useState("");

  useEffect(() => {
    if (!open) setSelectedWardId("");
  }, [open]);

  const selectableWards = useMemo(
    () =>
      ASSIGNABLE_WARDS.map((ward) => ({
        ...ward,
        isCurrentWard: patient.ward === ward.name,
      })),
    [patient.ward],
  );

  if (!open) return null;

  const selectedWard = selectableWards.find((ward) => ward.id === selectedWardId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-ward-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white p-8 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2
            id="assign-ward-title"
            className="text-xl font-bold text-gray-900"
          >
            Assign Patient to Ward
          </h2>
          <ModalCloseButton onClick={onClose} />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FA7401] bg-orange-50 px-4 py-2">
          <User className="h-5 w-5 text-[#FA7401]" strokeWidth={2} />
          <span className="text-base font-medium text-[#FA7401]">
            {patient.name}
          </span>
        </div>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select ward
        </label>
        <div className="relative mb-6">
          <select
            value={selectedWardId}
            onChange={(event) => setSelectedWardId(event.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-800 focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
          >
            <option value="">Choose a ward</option>
            {selectableWards.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
                {ward.isCurrentWard ? " (current)" : ""}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        {selectedWard && (
          <p className="mb-6 text-sm text-gray-500">
            {selectedWard.totalBeds} beds available in {selectedWard.name}.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedWard}
            onClick={() => selectedWard && onConfirm(selectedWard.name)}
            className="flex-1 rounded-lg bg-[#573FD1] py-3 text-base font-medium text-white transition-colors hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPatientToWardModal;
