import { cn } from "@/lib/utils";

type Tab = {
  id: 1 | 2;
  label: string;
};

const TABS: Tab[] = [
  { id: 1, label: "Medication(s) Batch Tracking" },
  { id: 2, label: "Damaged/Expired Medication(s)" },
];

type Props = {
  activeTab: 1 | 2;
  onTabChange: (tab: 1 | 2) => void;
};

export default function MedTrackingTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition",
              isActive
                ? "bg-[#573FD1] text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
