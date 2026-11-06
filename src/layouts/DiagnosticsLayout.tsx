import { Outlet } from "react-router-dom";
import DiagnosticsSidebar from "./diagnostics/components/Sidebar";
import DiagnosticsTopbar from "./diagnostics/components/Topbar";

const DiagnosticsLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50/30">
      <aside className="hidden md:block shrink-0">
        <DiagnosticsSidebar />
      </aside>

      <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DiagnosticsTopbar />
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 hide-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DiagnosticsLayout;
