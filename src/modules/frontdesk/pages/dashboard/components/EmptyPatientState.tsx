import { ScrollText } from "lucide-react";

const EmptyPatientState = () => {
  return (
    <div className="flex-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-background min-h-64">
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <div className="text-gray-800">
          <ScrollText size={52} strokeWidth={1.8} />
        </div>
        <p className="text-sm font-medium text-txt-muted leading-snug">
          Click a Patient to view
          <br />
          details
        </p>
      </div>
    </div>
  );
};

export default EmptyPatientState;
