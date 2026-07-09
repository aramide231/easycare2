import Topbar from "@/constant/topbar";
import { Outlet } from "react-router-dom";
import { PatientManagementProvider } from "@/pages/nurse/shared/context/PatientManagementContext";
import DoctorSidebar from "./doctor/components/Sidebar";

const DoctorLayout = () => {
  return (
    <PatientManagementProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50/30">
        <aside className="hidden md:flex h-screen shrink-0 overflow-hidden flex-col">
          <DoctorSidebar />
        </aside>

        <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Topbar />

          <div
            className="flex-1 overflow-y-auto px-4 md:px-6 py-4 hide-scrollbar"
            data-app-page-content
          >
            <Outlet />
          </div>
        </main>
      </div>
    </PatientManagementProvider>
  );
};

export default DoctorLayout;
