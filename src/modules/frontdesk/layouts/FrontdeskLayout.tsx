import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";

const FrontdeskLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-x-hidden">
      <aside className="hidden md:block shrink-0">
        <Sidebar />
      </aside>

      <main className="flex flex-col flex-1 overflow-y-auto py-4 shrink">
        <Topbar />
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default FrontdeskLayout;
