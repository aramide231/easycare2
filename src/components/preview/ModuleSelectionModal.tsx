import { Icon } from "@iconify/react";

export type PreviewModule = "nurse" | "doctor";

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
    id: "nurse",
    title: "Nursing",
    description: "Review the nursing module and patient workflows.",
    icon: "mdi:stethoscope",
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Review the doctor module and clinical workflows.",
    icon: "mdi:doctor",
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
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#573FD1]">
            EasyCare Preview
          </p>
          <h1
            id="module-selection-title"
            className="mt-2 text-2xl font-bold text-gray-900"
          >
            Choose what you want to go into
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Select a module to continue reviewing this build.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {moduleOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="group flex flex-col items-start rounded-xl border border-gray-200 p-6 text-left transition hover:border-[#573FD1] hover:bg-[#F7F5FF] focus:outline-none focus:ring-2 focus:ring-[#573FD1] focus:ring-offset-2"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#573FD1]/10 text-[#573FD1] transition group-hover:bg-[#573FD1] group-hover:text-white">
                <Icon icon={option.icon} width={26} height={26} />
              </span>
              <span className="mt-4 text-lg font-semibold text-gray-900">
                {option.title}
              </span>
              <span className="mt-2 text-sm text-gray-600">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleSelectionModal;
