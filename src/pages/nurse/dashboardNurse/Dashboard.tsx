import { useState } from "react";
import PatientsLog from "./components/patientLog";
import DashboardSummary from "./components/summary";

import CustomCalendar from "./components/calendar";
import PatientCard from "@/constant/patientCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Patient } from "./data/mockPatients";

const NurseDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex gap-6 ">
      <div className="flex-[3]">
        <DashboardSummary
          onRefreshPatients={() => setRefreshKey((prev) => prev + 1)}
        />
        <PatientsLog
          key={refreshKey}
          onSelectPatient={setSelectedPatient}
        />
      </div>

      <div className="flex-[1]">
        <CustomCalendar width="100%" height="250px" />
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default NurseDashboard;
