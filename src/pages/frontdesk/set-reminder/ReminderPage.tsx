import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import SetReminder from "./components/SetReminder";
import ViewReminder from "./components/ViewReminder";
import { useState } from "react";

const ReminderPage = () => {
  const [activeView, setActiveView] = useState("create-schedule");

  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-6 ">
        <Card className="my-10 border-2 rounded p-5 w-[80%] mx-auto">
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Set Reminder</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`flex items-center gap-2 rounded-lg border-2 font-medium ${
                      activeView === "create-schedule"
                        ? "border-[#573FD1] bg-[#573FD1] text-white hover:bg-[#4a35b8] hover:text-white"
                        : "border-[#9080e0] bg-[#eeecfa] text-[#9080e0] hover:bg-[#e0dafa] hover:text-[#9080e0]"
                    }`}
                  >
                    <Filter size={16} />
                    {activeView === "create-schedule"
                      ? "Create Schedule"
                      : "View Reminders"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    className={`cursor-pointer ${
                      activeView === "create-schedule"
                        ? "bg-[#9080e0] text-white"
                        : "bg-[#eeecfa] text-[#9080e0] hover:bg-[#e0dafa]"
                    }`}
                    onClick={() => setActiveView("create-schedule")}
                  >
                    Create Schedule
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`cursor-pointer ${
                      activeView === "view"
                        ? "text-white bg-[#9080e0]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveView("view")}
                  >
                    View Reminders
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <hr className="mb-4" />
            <div>
              {activeView === "create-schedule" ? (
                <SetReminder />
              ) : (
                <ViewReminder />
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReminderPage;
