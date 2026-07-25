import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import LogSearchBar from "@hmo/shared/components/LogSearchBar";
import TablePagination from "@hmo/shared/components/TablePagination";
import { getIncomingTagClass } from "@hmo/pages/shared/lib/incomingTagStyles";
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import {
  buildMockHmoDashboardPatients,
  type HmoDashboardPatient,
} from "../data/mockDashboardPatients";
import {
  parseHmoRequestDate,
  startOfDayDate,
  type DashboardDateRange,
} from "./calendar";

type Props = {
  selectedPatientId: number | null;
  onSelectPatient: (patient: HmoDashboardPatient) => void;
  dateRange?: DashboardDateRange | null;
};

const PatientsLog = ({
  selectedPatientId,
  onSelectPatient,
  dateRange,
}: Props) => {
  const allPatients = useMemo(() => buildMockHmoDashboardPatients(), []);
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    const q = search.toLowerCase().trim();

    return allPatients.filter((patient) => {
      const matchesSearch =
        !q ||
        patient.name.toLowerCase().includes(q) ||
        patient.patientId.toLowerCase().includes(q) ||
        patient.phoneNumber.includes(q);

      if (!dateRange) return matchesSearch;

      const requestDate = parseHmoRequestDate(patient.requestDate);
      if (!requestDate) return matchesSearch;

      const rangeStart = startOfDayDate(dateRange.startDate);
      const rangeEnd = startOfDayDate(dateRange.endDate);
      rangeEnd.setHours(23, 59, 59, 999);
      const normalizedRequestDate = startOfDayDate(requestDate);

      const inRange =
        normalizedRequestDate >= rangeStart &&
        normalizedRequestDate <= rangeEnd;

      return matchesSearch && inRange;
    });
  }, [allPatients, search, dateRange]);

  const listToShow = search || dateRange ? filteredPatients : allPatients;

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(listToShow, HMO_PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dateRange?.startDate, dateRange?.endDate, setCurrentPage]);

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 border-b border-[#D4D4D4] pb-4 sm:flex-row sm:items-center">
        <h2 className="shrink-0 text-base font-semibold text-gray-900">
          Patients Log
        </h2>
        <LogSearchBar
          placeholder="Search with Surname, Patient ID or Phone number"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs font-medium uppercase tracking-wide text-[#A5A5A5]">
            <tr>
              <th className="px-3 py-2">SN</th>
              <th className="px-3 py-2">Incoming</th>
              <th className="px-3 py-2">Patient Name</th>
              <th className="px-3 py-2">Time of Request</th>
              <th className="px-3 py-2">Patient Type</th>
              <th className="px-3 py-2">Clinician&apos;s Name</th>
              <th className="px-3 py-2 text-center"> </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((patient, index) => (
              <tr
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className={`cursor-pointer border-b border-[#D4D4D4] transition hover:bg-gray-50 ${
                  selectedPatientId === patient.id ? "bg-[#EEECFA]/60" : ""
                }`}
              >
                <td className="px-3 py-3 font-medium text-gray-900">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-lg border px-2 py-1 text-xs font-medium ${getIncomingTagClass(patient.incoming)}`}
                  >
                    {patient.incoming}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="font-medium text-gray-900">{patient.name}</div>
                  <div className="text-xs text-gray-500">
                    {patient.patientId} | {patient.phoneNumber}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div>{patient.requestDate}</div>
                  <div className="text-xs text-gray-500">
                    {patient.requestTime}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-lg border px-2 py-1 text-xs font-medium ${getPatientTypeClass(patient.patientType)}`}
                  >
                    {patient.patientType}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-800">
                  {patient.clinicianName}
                </td>
                <td className="px-3 py-3 text-center">
                  <button
                    type="button"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex rounded-md p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove patient log entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PatientsLog;
