// layouts/NurseLayout.tsx
// import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      {/* <main className="flex-1 p-4 ml-72"> */}
      <main className="flex-1 p-4">
        <Topbar />

        <div className="flex gap-6 mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DoctorLayout;
