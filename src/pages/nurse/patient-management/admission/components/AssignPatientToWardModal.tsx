import { useEffect, useMemo, useState } from "react";
import { ChevronDown, User } from "lucide-react";
import ModalCloseButton from "@/components/ui/ModalCloseButton";
import type { AdmissionRecord } from "../data/mockAdmissions";
import { usePatientManagement } from "@/pages/nurse/shared/context/PatientManagementContext";

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
  const { wardAvailability } = usePatientManagement();
  const [selectedWardId, setSelectedWardId] = useState("");

  useEffect(() => {
    if (!open) setSelectedWardId("");
  }, [open]);

  const selectableWards = useMemo(
    () =>
      wardAvailability.map((ward) => {
        const isCurrentWard = patient.ward === ward.name;
        const canAssign = !ward.isFull || isCurrentWard;

        return {
          ...ward,
          isCurrentWard,
          canAssign,
        };
      }),
    [wardAvailability, patient.ward],
  );

  if (!open) return null;

  const selectedWard = selectableWards.find((ward) => ward.id === selectedWardId);

  const handleConfirm = () => {
    if (!selectedWard || !selectedWard.canAssign) return;
    onConfirm(selectedWard.name);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-ward-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
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

        <label
          htmlFor="assign-ward-select"
          className="mb-2 block text-base font-medium text-gray-700"
        >
          Assign To
        </label>
        <div className="relative mb-6">
          <select
            id="assign-ward-select"
            value={selectedWardId}
            onChange={(e) => setSelectedWardId(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3.5 pr-10 text-base text-gray-700 outline-none focus:border-[#573FD1] focus:ring-2 focus:ring-[#573FD1]/20"
          >
            <option value="">Select Ward</option>
            {selectableWards.map((ward) => (
              <option key={ward.id} value={ward.id} disabled={!ward.canAssign}>
                {ward.name} ({ward.occupiedBeds}/{ward.totalBeds} beds
                {ward.isFull ? " - Full" : ` - ${ward.availableBeds} free`})
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
            aria-hidden
          />
        </div>

        {selectedWard && !selectedWard.canAssign && (
          <p className="mb-4 text-base text-red-600">
            This ward is full. Choose another ward or discharge a patient first.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3.5 text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedWard || !selectedWard.canAssign}
            onClick={handleConfirm}
            className="flex-1 rounded-lg bg-[#573FD1] py-3.5 text-base font-medium text-white transition-colors hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPatientToWardModal;
