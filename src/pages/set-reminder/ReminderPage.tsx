import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
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
      <Sidebar />
      <main className="flex-1 p-6 ml-72">
        <Topbar />
        <Card className="my-10 border-2 rounded p-5 w-[80%] mx-auto">
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Set Reminder</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#eeecfa] border-2 border-[#9080e0] text-[#9080e0] rounded-lg font-medium flex items-center gap-2">
                    <Filter size={16} />
                    {activeView === "create-schedule"
                      ? "Create Schedule"
                      : "View Reminders"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    className={`cursor-pointer ${
                      activeView === "create"
                        ? "text-white bg-[#9080e0]"
                        : "text-[#9080e0] bg-[#eeecfa] hover:bg-[#e0dafa]"
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
