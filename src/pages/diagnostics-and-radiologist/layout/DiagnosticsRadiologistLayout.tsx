import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="animate-pulse text-lg font-semibold text-[#573FD1]">
        Loading...
      </p>
    </div>
  );
}

export default function DiagnosticsRadiologistLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50/30">
      <aside className="hidden h-screen shrink-0 flex-col overflow-hidden md:flex">
        <Sidebar />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <div
          className="hide-scrollbar flex-1 overflow-y-auto px-4 py-4 md:px-6"
          data-app-page-content
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
