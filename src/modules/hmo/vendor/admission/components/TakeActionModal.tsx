import { useEffect, useState } from "react";
import { User } from "lucide-react";
import ModalCloseButton from "@/components/ui/ModalCloseButton";
import type { AdmissionRecord } from "../data/mockAdmissions";
import { TAKE_ACTION_OPTIONS } from "../data/takeActionOptions";

type Props = {
  patient: AdmissionRecord;
  open: boolean;
  onClose: () => void;
  onConfirm: (actionId: string) => void;
};

const TakeActionModal = ({ patient, open, onClose, onConfirm }: Props) => {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setSelectedActionId(null);
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!selectedActionId) return;
    onConfirm(selectedActionId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="take-action-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2
            id="take-action-title"
            className="text-xl font-bold text-gray-900"
          >
            Take Action
          </h2>
          <ModalCloseButton onClick={onClose} />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FA7401] bg-orange-50 px-4 py-2">
          <User className="h-5 w-5 text-[#FA7401]" strokeWidth={2} />
          <span className="text-base font-medium text-[#FA7401]">
            {patient.name}
          </span>
        </div>

        <fieldset className="mb-6">
          <legend className="mb-2 text-base font-medium text-gray-700">
            Select action
          </legend>
          <ul
            className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200"
            role="radiogroup"
          >
            {TAKE_ACTION_OPTIONS.map((option) => {
              const isSelected = selectedActionId === option.id;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-gray-50"
                    onClick={() => setSelectedActionId(option.id)}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-[#573FD1]" : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#573FD1]" />
                      )}
                    </span>
                    <span className="text-base text-gray-800">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

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
            disabled={!selectedActionId}
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

export default TakeActionModal;
