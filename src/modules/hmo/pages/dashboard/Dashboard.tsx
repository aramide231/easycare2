import { useMemo, useState } from "react";
import HmoDashboardSummary from "./components/summary";
import PatientsLog from "./components/patientsLog";
import HmoDashboardCalendar, {
  type DashboardDateRange,
} from "./components/calendar";
import HmoPatientCard from "./components/HmoPatientCard";
import type { HmoDashboardPatient } from "./data/mockDashboardPatients";

const HmoDashboard = () => {
  const [selectedPatient, setSelectedPatient] =
    useState<HmoDashboardPatient | null>(null);
  const [dateRange, setDateRange] = useState<DashboardDateRange | null>(null);

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-[3]" data-search-panel-region>
        <HmoDashboardSummary />
        <PatientsLog
          selectedPatientId={selectedPatient?.id ?? null}
          onSelectPatient={setSelectedPatient}
          dateRange={dateRange}
        />
      </div>

      <div className="flex w-full max-w-[12.3rem] shrink-0 flex-col gap-4">
        <HmoDashboardCalendar
          value={dateRange ?? undefined}
          onChange={setDateRange}
          className="w-full"
        />
        {selectedPatient && <HmoPatientCard patient={selectedPatient} />}
      </div>
    </div>
  );
};

export default HmoDashboard;
