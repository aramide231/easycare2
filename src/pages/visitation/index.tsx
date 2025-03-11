import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";
import PatientCard from "@/constant/patientCard";
import VisitationLog from "./components/visitationLog";




const Visitation = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      {/* Added `ml-72` to shift the main content to the right */}
      <main className="flex-1 p-6 ml-72">
        <Topbar />

        <div className="flex gap-6 mt-6">
          <div className="flex-[3]">
           
            <VisitationLog />
          </div>

          <div className="flex-[1]">
            <PatientCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visitation;

