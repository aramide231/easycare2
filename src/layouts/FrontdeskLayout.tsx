import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import { Outlet } from "react-router-dom";

const FrontdeskLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-x-hidden">
      <aside className="hidden md:block md:w-64 lg:w-72 shrink-0">
        <Sidebar />
      </aside>

      <main className="flex flex-col flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <Topbar />
        <div className="mt-4 border-t-2 border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default FrontdeskLayout;
