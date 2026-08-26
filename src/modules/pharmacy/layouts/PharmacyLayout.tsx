import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PharmacySidebar from "./components/Sidebar";
import PharmacyTopbar from "./components/Topbar";

function PharmacyPageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="animate-pulse text-lg font-semibold text-[#573FD1]">
        Loading...
      </p>
    </div>
  );
}

const PharmacyLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50/30">
      <aside className="hidden shrink-0 md:block">
        <PharmacySidebar />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <PharmacyTopbar />
        <div className="hide-scrollbar flex-1 overflow-y-auto px-4 py-4 md:px-6">
          <Suspense fallback={<PharmacyPageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default PharmacyLayout;
