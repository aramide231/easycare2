import PatientCard from "@/constant/patientCard";
import CustomCalendar from "./components/calendar";
import PatientsLog from "@/pages/nurse/dashboard/components/patientLog";

import { useState } from "react";
import DashboardSummaryForAll from "@/pages/nurse/dashboard/components/summary";
import {
  buildMockPatients,
  type Patient,
} from "@/pages/nurse/dashboard/data/mockPatients";

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>(() => buildMockPatients());

  return (
    <div className="flex gap-6 mt-0 ">
      <div className="flex-[3]" data-search-panel-region>
        <DashboardSummaryForAll outPatientCount={patients.length} />
        <PatientsLog
          patients={patients}
          onPatientsChange={setPatients}
          onSelectPatient={setSelectedPatient}
        />
      </div>

      <div className="flex-[1]">
        <CustomCalendar width="100%" height="250px" />
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
