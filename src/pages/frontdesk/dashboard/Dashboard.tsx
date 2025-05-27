import { useState } from "react";
import PatientsLog from "./components/patientLog";
import DashboardSummary from "./components/summary";

import CustomCalendar from "./components/calendar";
import PatientCard from "@/constant/patientCard";

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
      <div className="flex-[3]">
        <DashboardSummary />
        <PatientsLog onSelectPatient={setSelectedPatient} />
      </div>

      <div className="flex-[1] h-full">
        <CustomCalendar width="100%" height="250px" />
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
    </div>
  );
};

export default FrontdeskDashboard;
