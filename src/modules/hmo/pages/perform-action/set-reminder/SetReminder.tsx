import { useState } from "react";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HmoSetReminderForm from "./components/HmoSetReminderForm";
import HmoViewReminders from "./components/HmoViewReminders";

type ViewMode = "create-schedule" | "view";

const HmoSetReminder = () => {
  const [activeView, setActiveView] = useState<ViewMode>("create-schedule");

  const toggleLabel =
    activeView === "create-schedule" ? "Create Schedule" : "View Schedules";

  return (
    <div className="mx-auto w-full max-w-[836px]">
      <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between border-b border-[#D4D4D4] pb-4">
          <h1 className="text-base font-semibold tracking-[-0.32px] text-black">
            Set Reminder
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={`flex h-10 items-center gap-2 rounded-lg border-2 px-3 text-sm font-medium transition ${
                  activeView === "create-schedule"
                    ? "border-[#573FD1] bg-[#573FD1] text-white"
                    : "border-[#9080E0] bg-[#EEECFA] text-[#9080E0]"
                }`}
              >
                <Filter className="h-5 w-5" />
                {toggleLabel}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                className={`cursor-pointer ${
                  activeView === "create-schedule"
                    ? "bg-[#9080E0] text-white focus:bg-[#9080E0] focus:text-white"
                    : "bg-[#EEECFA] text-[#9080E0] focus:bg-[#E0DAFA] focus:text-[#9080E0]"
                }`}
                onClick={() => setActiveView("create-schedule")}
              >
                Create Schedule
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer ${
                  activeView === "view"
                    ? "bg-[#9080E0] text-white focus:bg-[#9080E0] focus:text-white"
                    : "text-gray-700 focus:bg-gray-100"
                }`}
                onClick={() => setActiveView("view")}
              >
                View Schedules
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {activeView === "create-schedule" ? (
          <HmoSetReminderForm />
        ) : (
          <HmoViewReminders />
        )}
      </div>
    </div>
  );
};

export default HmoSetReminder;
