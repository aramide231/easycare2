import Topbar from "@/layouts/doctor/components/Topbar";
import Sidebar from "@/layouts/doctor/components/Sidebar";
import { PatientManagementProvider } from "@doctor-shared/context/PatientManagementContext";
import { DOCTOR_DISCHARGED_SEED } from "@/pages/doctor/discharge/data/dischargedSeed";
import { Outlet, useLocation } from "react-router-dom";

const DoctorLayout = () => {
  const location = useLocation();
  const isAccountPage = /^\/doctor\/account(\/.*)?$/.test(location.pathname);
  const isFlagProfile = /^\/doctor\/flag-profile\/.+/.test(location.pathname);
  const hideSidebar = isAccountPage || isFlagProfile;

  return (
    <PatientManagementProvider initialDischarged={DOCTOR_DISCHARGED_SEED}>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50/30">
        {!hideSidebar && (
          <aside className="hidden md:block shrink-0">
            <Sidebar />
          </aside>
        )}

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

export default DoctorLayout;
