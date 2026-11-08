import Topbar from "@/layouts/doctor/components/Topbar";
import Sidebar from "@/layouts/doctor/components/Sidebar";
import { PatientManagementProvider } from "@doctor-shared/context/PatientManagementContext";
import { DOCTOR_DISCHARGED_SEED } from "@/pages/doctor/discharge/data/dischargedSeed";
import PatientRecordScope from "@/pages/doctor/patientProfile/components/PatientRecordScope";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <PatientManagementProvider initialDischarged={DOCTOR_DISCHARGED_SEED}>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50/30">
        <aside className="hidden md:flex h-screen shrink-0 overflow-hidden flex-col">
          <Sidebar />
        </aside>

        <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Topbar />
          <div
            className="flex-1 overflow-y-auto px-4 md:px-6 py-4 hide-scrollbar"
            data-app-page-content
          >
            <PatientRecordScope>
              <Outlet />
            </PatientRecordScope>
          </div>
        </main>
      </div>
    </PatientManagementProvider>
  );
};

export default DoctorLayout;
