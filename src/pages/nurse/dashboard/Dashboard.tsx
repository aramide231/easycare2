import { useState } from "react";
import PatientsLog from "./components/patientLog";
import DashboardSummary from "./components/summary";

import CustomCalendar, {
  type DashboardDateRange,
} from "./components/calendar";
import PatientCard from "@/constant/patientCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  buildMockPatients,
  type Patient,
} from "./data/mockPatients";

const NurseDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>(() => buildMockPatients());
  const [dateRange, setDateRange] = useState<DashboardDateRange | null>(null);

  const handleRefreshPatients = () => {
    setPatients(buildMockPatients());
  };

  return (
    <div className="flex gap-6 ">
      <div className="flex-[3]" data-search-panel-region>
        <DashboardSummary
          outPatientCount={patients.length}
          onRefreshPatients={handleRefreshPatients}
        />
        <PatientsLog
          patients={patients}
          onPatientsChange={setPatients}
          onSelectPatient={setSelectedPatient}
          dateRange={dateRange}
        />
      </div>

      <div className="flex w-full max-w-[17.5rem] flex-col gap-4">
        <CustomCalendar
          value={dateRange ?? undefined}
          onChange={setDateRange}
          className="w-full shrink-0"
        />
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default NurseDashboard;
