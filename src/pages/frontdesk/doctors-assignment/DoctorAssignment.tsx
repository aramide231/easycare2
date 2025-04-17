import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import DoctorLog from "./components/DoctorLog";

const DoctorAssignment = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      {/* Added `ml-72` to shift the main content to the right */}
      <main className="flex-1 p-6 ml-72">
        <Topbar />

        <div className=" gap-6 mt-6">
          <DoctorLog />
        </div>
      </main>
    </div>
  );
};

export default DoctorAssignment;
