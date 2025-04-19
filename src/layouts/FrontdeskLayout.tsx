// layouts/NurseLayout.tsx
import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import { Outlet } from "react-router-dom";

const FrontdeskLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6 ml-72">
        <Topbar />

        <div className="flex gap-6 mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default FrontdeskLayout;
