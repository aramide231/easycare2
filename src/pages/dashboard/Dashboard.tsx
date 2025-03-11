import Sidebar from "../../constant/sidebar";
import Topbar from "../../constant/topbar";
import PatientsLog from "./components/patientLog";
import DashboardSummary from "./components/summary";
import CustomCalendar from "./components/calendar";
import PatientCard from "../../constant/patientCard";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      {/* Added `ml-72` to shift the main content to the right */}
      <main className="flex-1 p-6 ml-72">
        <Topbar />

        <div className="flex gap-6 mt-6">
          <div className="flex-[3]">
            <DashboardSummary />
            <PatientsLog />
          </div>

          <div className="flex-[1]">
            <CustomCalendar />
            <PatientCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

