import { Card } from "@/components/ui/card";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import PatientsLog from "./components/patientLog";
import DashboardSummary from "./components/summary";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="flex-1 p-6">
        <Topbar />

        

        <div className="flex gap-6 mt-6">
          <div className="flex-[2]">
            <DashboardSummary />
            <PatientsLog />
          </div>

          <div className="flex-[1]">
            <Card className="p-4">
              <h2 className="font-bold">Juwon Fajemirokun</h2>
              <p>ID: P-2025001</p>
              <h3 className="mt-2 font-bold">Previous Vital Signs</h3>
              <p>Blood Pressure: 120/80 mmHg</p>
              <p>Heart Rate: 75 bpm</p>
              <p>Weight: 85 kg</p>
              <p>Height: 5'9"</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
