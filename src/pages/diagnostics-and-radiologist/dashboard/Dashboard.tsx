import { useState } from "react";
import DashboardSummary from "./components/DashboardSummary";
import PatientsLog from "./components/PatientsLog";
import DashboardCalendar, {
  type DashboardDateRange,
} from "./components/DashboardCalendar";
import DashboardPatientCard from "./components/DashboardPatientCard";
import type { DiagnosticsPatientRow } from "./data/mockPatients";

const Dashboard = () => {
  const [selectedPatient, setSelectedPatient] =
    useState<DiagnosticsPatientRow | null>(null);
  const [dateRange, setDateRange] = useState<DashboardDateRange | null>(null);

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
      <div className="min-w-0 flex-1 lg:flex-[3]" data-search-panel-region>
        <DashboardSummary />
        <PatientsLog
          selectedId={selectedPatient?.id ?? null}
          onSelectRow={setSelectedPatient}
          dateRange={dateRange}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:max-w-[17.5rem] lg:shrink-0 lg:flex-col">
        <DashboardCalendar value={dateRange} onChange={setDateRange} />
        {selectedPatient ? (
          <DashboardPatientCard patient={selectedPatient} />
        ) : (
          <div className="flex min-h-[12rem] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center shadow-sm sm:min-h-[16rem]">
            <p className="text-sm font-medium text-gray-800">
              No patient selected
            </p>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              Select a patient from the log to view their card and details here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
