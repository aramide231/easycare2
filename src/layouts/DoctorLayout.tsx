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
      <div className="flex min-h-screen w-full flex-col bg-gray-50/30">
        <Topbar />

        <div className="hide-scrollbar flex-1 overflow-y-auto px-3 py-4 md:px-5 lg:px-6">
          <div
            className={
              hideSidebar
                ? "flex min-h-0 w-full"
                : "flex min-h-[calc(100dvh-5.75rem)] items-stretch gap-3"
            }
          >
            {!hideSidebar && <Sidebar />}

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </PatientManagementProvider>
  );
};

export default DoctorLayout;
