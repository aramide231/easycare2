import { useSearchParams } from "react-router-dom";
import StaffProfileDetails from "@/components/header/StaffProfileDetails";
import HelpDeskTab from "./components/HelpDeskTab";
import LogoutTab from "./components/LogoutTab";

const tabs = [
  { id: "account", label: "Account Information" },
  { id: "helpdesk", label: "Help Desk" },
  { id: "logout", label: "Logout" },
];

export default function AccountSettings() {
  const [params, setParams] = useSearchParams();
  const active = tabs.some((tab) => tab.id === params.get("tab")) ? params.get("tab") : "account";
  return <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
    <nav aria-label="Account settings" className="flex flex-wrap gap-2 border-b p-4">
      {tabs.map((tab) => <button key={tab.id} type="button"
        onClick={() => setParams({ tab: tab.id }, { replace: true })}
        aria-current={active === tab.id ? "page" : undefined}
        className={"rounded-lg px-4 py-2 text-sm font-medium " + (active === tab.id ? "bg-[#573FD1] text-white" : "bg-slate-100 text-slate-700")}
      >{tab.label}</button>)}
    </nav>
    <div className="p-5 sm:p-7">
      {active === "account" && <StaffProfileDetails />}
      {active === "helpdesk" && <HelpDeskTab />}
      {active === "logout" && <LogoutTab />}
    </div>
  </section>;
}
