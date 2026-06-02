import { Outlet } from "react-router-dom";
import { PatientManagementProvider } from "@/pages/nurse/context/PatientManagementContext";
import Sidebar from "./nurse/components/Sidebar";
import Topbar from "./nurse/components/Topbar";

const NurseLayout = () => {
  return (
    <PatientManagementProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50/30">
        <aside className="hidden md:block shrink-0">
          <Sidebar />
        </aside>

        <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Topbar />
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 hide-scrollbar">
            <Outlet />
          </div>
        </main>
      </div>
    </PatientManagementProvider>
  );
};

export default NurseLayout;
