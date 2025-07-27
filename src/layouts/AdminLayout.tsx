// layouts/NurseLayout.tsx

import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
