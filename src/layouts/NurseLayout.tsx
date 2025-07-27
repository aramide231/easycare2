// layouts/NurseLayout.tsx
import { Outlet } from "react-router-dom";

import Topbar from "@/constant/topbar";

import Sidebar from "@/constant/sidebar";

const NurseLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6 ml-72">
        <Topbar />

        <div className="flex gap-6 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default NurseLayout;
