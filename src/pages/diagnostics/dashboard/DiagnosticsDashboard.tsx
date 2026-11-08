import { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomCalendar from "@/pages/doctor/dashboard/components/calendar";
import {
  getPatientsLogRowById,
  type DiagnosticsPatientsLogRow,
  type PatientCategory,
} from "../data/mockDiagnostics";
import DiagnosticsDashboardSummary from "./components/DiagnosticsDashboardSummary";
import DashboardPatientsLog from "./components/DashboardPatientsLog";
import DashboardPatientCard from "./components/DashboardPatientCard";

const DiagnosticsDashboard = () => {
  const location = useLocation();
  const patientCategoryFilter = location.state?.patientCategory as
    | PatientCategory
    | undefined;

  const [selectedPatient, setSelectedPatient] =
    useState<DiagnosticsPatientsLogRow | null>(() => getPatientsLogRowById(7));

  return (
    <div className="mt-0 flex gap-6">
      <div className="flex-[3]">
        <DiagnosticsDashboardSummary />
        <DashboardPatientsLog
          selectedId={selectedPatient?.id ?? null}
          onSelectRow={setSelectedPatient}
          patientCategoryFilter={patientCategoryFilter}
        />
      </div>

      <div className="flex-[1]">
        <CustomCalendar width="100%" />
        <DashboardPatientCard
          key={selectedPatient?.id ?? "none"}
          patient={selectedPatient}
        />
      </div>
    </div>
  );
};

export default DiagnosticsDashboard;
