import { useEffect, useState } from "react";
import { ChevronLeft, User } from "lucide-react";
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
        className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h2
          id="take-action-title"
          className="mb-4 text-lg font-bold text-gray-900"
        >
          Take Action
        </h2>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FA7401] bg-orange-50 px-3 py-1.5">
          <User className="h-4 w-4 text-[#FA7401]" strokeWidth={2} />
          <span className="text-sm font-medium text-[#FA7401]">
            {patient.name}
          </span>
        </div>

        <fieldset className="mb-6">
          <legend className="sr-only">Select action</legend>
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
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50"
                    onClick={() => setSelectedActionId(option.id)}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-[#573FD1]" : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-[#573FD1]" />
                      )}
                    </span>
                    <span className="text-sm text-gray-800">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <button
          type="button"
          disabled={!selectedActionId}
          onClick={handleConfirm}
          className="w-full rounded-lg bg-[#573FD1] py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TakeActionModal;
