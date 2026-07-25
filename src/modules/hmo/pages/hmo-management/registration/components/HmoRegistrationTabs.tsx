type Tab = "registration" | "tariffs";

type Props = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

const HmoRegistrationTabs = ({ activeTab, onChange }: Props) => (
  <div className="flex w-full max-w-[1020px] items-center gap-0">
    <button
      type="button"
      onClick={() => onChange("registration")}
      className={`flex h-10 flex-1 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold tracking-[-0.28px] transition ${
        activeTab === "registration"
          ? "border-[#573FD1] bg-[#573FD1] text-white"
          : "border-[#A5A5A5] bg-white text-[#A5A5A5]"
      }`}
    >
      HMO Registration
    </button>
    <div className="mx-0 h-px w-[120px] shrink-0 bg-[#D4D4D4]" />
    <button
      type="button"
      onClick={() => onChange("tariffs")}
      className={`flex h-10 flex-1 items-center justify-center rounded-lg border px-5 py-2.5 text-sm tracking-[-0.28px] transition ${
        activeTab === "tariffs"
          ? "border-[#573FD1] bg-[#573FD1] font-semibold text-white"
          : "border-[#A5A5A5] bg-white font-normal text-[#A5A5A5]"
      }`}
    >
      Updated HMO Tariff(s)
    </button>
  </div>
);

export default HmoRegistrationTabs;
