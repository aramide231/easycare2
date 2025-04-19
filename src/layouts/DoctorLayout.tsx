// layouts/NurseLayout.tsx
import Sidebar from "@/constant/sidebar";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
