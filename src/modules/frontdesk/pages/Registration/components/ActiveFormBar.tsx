// ./components/ActiveFormBar.tsx
type ActiveFormBarProps = {
  currentStep: number;
};

export default function ActiveFormBar({ currentStep }: ActiveFormBarProps) {
  const steps = [
    { label: "1. Patient Info" },
    { label: "2. Insurance Info" },
    { label: "3. Emergency Info" },
  ];

  return (
    <div className="flex items-center bg-surface text-[#A5A5A5]">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={index} className="flex items-center">
            <p
              className={`border rounded-lg px-6 py-1.5 ${
                isActive
                  ? "bg-primary/70 text-white"
                  : isCompleted
                  ? "bg-primary text-white"
                  : "border-[#A5A5A5]"
              }`}
            >
              {step.label}
            </p>

            {index < steps.length - 1 && (
              <div
                className={`border-b-2 min-w-20 ${
                  currentStep > stepNumber ? "border-primary/70" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// export default function ActiveFormBar() {
//   return (
//     <div className="flex items-center bg-surface text-[#A5A5A5]">
//       <p className="border rounded-lg px-6 py-1.5 bg-primary text-white">
//         1. Patient Info
//       </p>
//       <div className="border-b min-w-20" />
//       <p className="border border-[#A5A5A5] rounded-lg px-6 py-1.5">
//         2. Insurance Info
//       </p>
//       <div className="border-b min-w-20" />
//       <p className="border border-[#A5A5A5] rounded-lg px-6 py-1.5">
//         3. Emergency Info
//       </p>
//     </div>
//   );
// }
