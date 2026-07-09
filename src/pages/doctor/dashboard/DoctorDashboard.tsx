import PatientCard from "@/constant/patientCard";
import CustomCalendar, {
  type DashboardDateRange,
} from "./components/calendar";
import PatientsLog from "./components/patientLog";

import { useState } from "react";
import DoctorDashboardSummary from "./components/summary";

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
  const [dateRange, setDateRange] = useState<DashboardDateRange | null>(null);

  return (
    <div className="flex gap-6 mt-0 ">
      <div className="flex-[3]">
        <DoctorDashboardSummary />
        <PatientsLog
          onSelectPatient={setSelectedPatient}
          dateRange={dateRange}
        />
      </div>

      <div className="flex-[1]">
        <CustomCalendar
          width="100%"
          height="250px"
          value={dateRange ?? undefined}
          onChange={setDateRange}
        />
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
