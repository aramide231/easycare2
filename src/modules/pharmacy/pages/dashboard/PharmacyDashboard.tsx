import { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomCalendar, {
  type DashboardDateRange,
} from "@/pages/doctor/dashboard/components/calendar";
import {
  getPatientsLogRowById,
  type PatientCategory,
  type PharmacyPatientsLogRow,
} from "../data/mockPharmacy";
import PharmacyDashboardSummary from "./components/PharmacyDashboardSummary";
import PharmacyPatientsLog from "./components/PharmacyPatientsLog";
import PharmacyPatientCard from "./components/PharmacyPatientCard";

const PharmacyDashboard = () => {
  const location = useLocation();
  const patientCategoryFilter = location.state?.patientCategory as
    | PatientCategory
    | undefined;

  const [selectedPatient, setSelectedPatient] =
    useState<PharmacyPatientsLogRow | null>(() => getPatientsLogRowById(7));
  const [dateRange, setDateRange] = useState<DashboardDateRange | null>(null);

  return (
    <div className="mt-0 flex gap-6">
      <div className="flex-[3]">
        <PharmacyDashboardSummary />
        <PharmacyPatientsLog
          selectedId={selectedPatient?.id ?? null}
          onSelectRow={setSelectedPatient}
          patientCategoryFilter={patientCategoryFilter}
          dateRange={dateRange}
        />
      </div>

      <div className="flex-[1]">
        <CustomCalendar
          width="100%"
          value={dateRange ?? undefined}
          onChange={setDateRange}
        />
        <PharmacyPatientCard
          key={selectedPatient?.id ?? "none"}
          patient={selectedPatient}
        />
      </div>
    </div>
  );
};

export default PharmacyDashboard;
