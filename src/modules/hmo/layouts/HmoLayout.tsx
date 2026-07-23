import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function HmoPageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="animate-pulse text-lg font-semibold text-[#573FD1]">
        Loading...
      </p>
    </div>
  );
}

const HmoLayout = () => {
  return (
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
          <Suspense fallback={<HmoPageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default HmoLayout;
