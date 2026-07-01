import Topbar from "@/constant/topbar";
import { Outlet } from "react-router-dom";
import { PatientManagementProvider } from "@/pages/nurse/shared/context/PatientManagementContext";

const DoctorLayout = () => {
  return (
    <PatientManagementProvider>
      <div className="flex">
        <main className="flex-1 p-4">
          <Topbar />

          <div className="flex gap-6 mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </PatientManagementProvider>
  );
};

export default DoctorLayout;
