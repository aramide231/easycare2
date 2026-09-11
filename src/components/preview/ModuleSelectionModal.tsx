import { Icon } from "@iconify/react";

export type PreviewModule =
  | "frontdesk"
  | "nurse"
  | "doctor"
  | "hmo"
  | "pharmacy"
  | "diagnostics-and-radiologist";

type Props = {
  onSelect: (module: PreviewModule) => void;
};

const moduleOptions: {
  id: PreviewModule;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "frontdesk",
    title: "Frontdesk",
    description: "Review registration, visitation, and front-office workflows.",
    icon: "mdi:desk",
  },
  {
    id: "nurse",
    title: "Nursing",
    description: "Review the nursing module and patient workflows.",
    icon: "mdi:stethoscope",
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Review the clinician module and clinical workflows.",
    icon: "mdi:doctor",
  },
  {
    id: "hmo",
    title: "HMO",
    description: "Review insurance registration, claims, and billing workflows.",
    icon: "mdi:shield-account",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description: "Review store, purchases, dispensing, and medication tracking.",
    icon: "mdi:pill",
  },
  {
    id: "diagnostics-and-radiologist",
    title: "M.I (Radiology)",
    description: "Review scans, investigations, and imaging workflows.",
    icon: "mdi:radiology-box",
  },
];

const ModuleSelectionModal = ({ onSelect }: Props) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="module-selection-title"
    >
      <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#573FD1]">
            EasyCare Preview
          </p>
          <h1
            id="module-selection-title"
            className="mt-2 text-xl font-bold text-gray-900"
          >
            Choose what you want to go into
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Select a module to continue reviewing this build.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moduleOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="flex items-start gap-3 border border-gray-200 bg-white p-4 text-left hover:border-[#573FD1] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#573FD1] focus:ring-offset-1"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-[#573FD1]/10 text-[#573FD1]">
                <Icon icon={option.icon} width={20} height={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-gray-900">
                  {option.title}
                </span>
                <span className="mt-1 block text-xs leading-snug text-gray-600">
                  {option.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleSelectionModal;
