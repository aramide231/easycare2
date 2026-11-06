import PatientCard from "@doctor-shared/components/PatientCard";
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

      <div className="flex flex-[1] flex-col">
        <CustomCalendar
          width="100%"
          height="250px"
          value={dateRange ?? undefined}
          onChange={setDateRange}
        />
        {selectedPatient ? (
          <PatientCard patient={selectedPatient} />
        ) : (
          <div className="mx-auto mt-4 flex min-h-[260px] w-full max-w-sm flex-1 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Select a patient from the log to view details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
