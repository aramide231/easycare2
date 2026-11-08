import Topbar from "@/layouts/doctor/components/Topbar";
import Sidebar from "@/layouts/doctor/components/Sidebar";
import { PatientManagementProvider } from "@doctor-shared/context/PatientManagementContext";
import { DOCTOR_DISCHARGED_SEED } from "@/pages/doctor/discharge/data/dischargedSeed";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <PatientManagementProvider initialDischarged={DOCTOR_DISCHARGED_SEED}>
      <div className="flex min-h-screen w-full flex-col bg-gray-50/30">
        <Topbar />

        <main className="hide-scrollbar flex-1 overflow-y-auto px-3 py-4 md:px-5 lg:px-6">
          <div className="flex min-h-[calc(100dvh-5.75rem)] items-stretch gap-3">
            <Sidebar />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </PatientManagementProvider>
  );
};

export default DoctorLayout;
