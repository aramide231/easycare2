import { useState } from "react";
import PatientsLog from "./components/patientLog";
import DashboardSummary from "./components/DashboardSummary";

import Calendar from "./components/calendar";
import PatientCard from "@frontdesk/shared/patientCard";

type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  patientId: string;
  phoneNumber: string;
  lastSeen: string;
  time: string;
  gender: string;
  age: number;
  patientType: string;
  visitType: string;
  staffName: string;
  flagged: boolean;
  bloodPressure: string;
  name: string;
};

const FrontdeskDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="flex gap-6 ">
      <div className="flex-3 w-[]">
        <DashboardSummary />
        <PatientsLog onSelectPatient={setSelectedPatient} />
      </div>

      <div className="flex-1 h-full">
        <Calendar />
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
    </div>
  );
};

export default FrontdeskDashboard;
