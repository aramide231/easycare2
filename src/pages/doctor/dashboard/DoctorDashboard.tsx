import PatientCard from "@/constant/patientCard";
import CustomCalendar from "./components/calendar";
import PatientsLog from "./components/patientLog";

import { useState } from "react";
import DashboardSummaryForAll from "@/pages/nurse/dashboardNurse/components/summary";

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

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="flex gap-6 mt-0 ">
      <div className="flex-[3]">
        <DashboardSummaryForAll />
        <PatientsLog onSelectPatient={setSelectedPatient} />
      </div>

      <div className="flex-[1]">
        <CustomCalendar />
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
