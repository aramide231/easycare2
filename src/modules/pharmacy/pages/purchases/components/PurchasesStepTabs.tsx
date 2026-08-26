import { cn } from "@/lib/utils";

type Step = {
  id: 1 | 2;
  label: string;
};

const STEPS: Step[] = [
  { id: 1, label: "Supplier's Form" },
  { id: 2, label: "Purchased Medication(s) Entry" },
];

type Props = {
  activeStep: 1 | 2;
  onStepChange: (step: 1 | 2) => void;
};

export default function PurchasesStepTabs({ activeStep, onStepChange }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {STEPS.map((step) => {
        const isActive = step.id === activeStep;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepChange(step.id)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition",
              isActive
                ? "bg-[#573FD1] text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            {step.label}
          </button>
        );
      })}
    </div>
  );
}
