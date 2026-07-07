import { useMemo, useRef, useState } from "react";
import { getCurrentMonthRange, mockNextAppointmentDate } from "@/lib/dateTime";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Expand, Undo2 } from "lucide-react";

import clientimage from "@/assets/image/haywhy.jpg";
import ExportButton from "@/constant/ExportButton";
import DateRangeFilter, {
  type DateRangeValue,
} from "@/components/ui/DateRangeFilter";
import { PAGE_SIZE } from "@/constant/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import { useAuth } from "@/context/AuthContext";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import {
  buildMockPatients,
  type Patient,
} from "@/pages/nurse/dashboard/data/mockPatients";
import {
  buildMockPreviousMedicalHistory,
  parseMedicalRecordDate,
} from "./data/mockPreviousMedicalHistory";

type LocationState = {
  patient?: Patient;
};

const DEFAULT_PATIENT = buildMockPatients()[0];

function resolvePatient(patientId: string | undefined, statePatient?: Patient) {
  if (statePatient) return statePatient;
  if (!patientId) return DEFAULT_PATIENT;
  return (
    buildMockPatients().find((p) => p.patientId === patientId) ?? DEFAULT_PATIENT
  );
}

const PreviousPatientRecords = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const tableRef = useRef<HTMLTableElement>(null);

  const role = user?.userRole?.toLowerCase() || "nurse";
  const homePath = role === "nurse" ? "/nurse" : `/${role}`;

  const patient = resolvePatient(
    patientId,
    (location.state as LocationState | null)?.patient,
  );

  const allRecords = useMemo(
    () => buildMockPreviousMedicalHistory(patient.patientId),
    [patient.patientId],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => getCurrentMonthRange());

  const filteredRecords = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    const { startDate, endDate } = dateRange;
    const rangeStart = new Date(startDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(endDate);
    rangeEnd.setHours(23, 59, 59, 999);

    return allRecords.filter((record) => {
      const recordDate = parseMedicalRecordDate(record.date);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.consultationType.toLowerCase().includes(q) ||
        record.date.toLowerCase().includes(q);
      return inRange && matchesSearch;
    });
  }, [allRecords, searchTerm, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(filteredRecords, PAGE_SIZE);

  const handleViewProfile = () => {
    navigate(`/${role}/patient-profile/${patient.patientId}`, {
      state: { patient },
    });
  };

  const nextAppointment = mockNextAppointmentDate(7 + (patient.id % 21));

  return (
    <div className="flex w-full gap-6">
      {/* Patient summary */}
      <aside className="w-full max-w-xs shrink-0">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={clientimage}
              alt="Patient"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={handleViewProfile}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] py-2 px-3 text-sm font-medium text-white shadow-md transition hover:bg-[#4a35b8]"
            >
              <Expand className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              View Patient&apos;s Profile
            </button>
            <Link
              to={homePath}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#573FD1] bg-purple-50 py-2 px-3 text-sm font-medium text-[#573FD1] transition hover:bg-purple-100"
            >
              <Undo2 className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              Back to Dashboard
            </Link>
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="space-y-2 text-sm">
            <h3 className="font-semibold text-[#573FD1]">Prev. Vital Signs :</h3>
            <p>
              <strong>Blood Pressure :</strong> {patient.bloodPressure}{" "}
              <span className="italic">mmHg</span>
            </p>
            <p>
              <strong>Heart Rate :</strong> 75 <span className="italic">bpm</span>
            </p>
            <p>
              <strong>Weight :</strong> 85 <span className="font-semibold">kg</span>{" "}
              │ <strong>Height :</strong> 170cm
            </p>
          </div>

          <div className="mt-3 space-y-2 text-sm">
            <h3 className="font-semibold text-blue-600">Contact :</h3>
            <p>
              <strong>Gender :</strong> {patient.gender === "M" ? "Male" : "Female"}
            </p>
            <p>
              <strong>Address :</strong> Lagos, Nigeria
            </p>
            <p>
              <strong>Relationship :</strong> Married
            </p>
            <p>
              <strong>Patient Type :</strong> {patient.patientType}
            </p>
            <p>
              <strong>Treatment Guide :</strong> Fee for Ser.
            </p>
            <p>
              <strong>Last Visits Date :</strong> {patient.lastSeen}
            </p>
            <p>
              <strong>Next Appointment :</strong> {nextAppointment}
            </p>
          </div>
        </div>
      </aside>

      {/* Medical history table */}
      <section className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <h1 className="shrink-0 text-xl font-bold text-gray-800">
              Prev. Medical History
            </h1>
            <LogSearchBar
              placeholder="Search"
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                setCurrentPage(1);
              }}
              className="sm:max-w-xs"
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <DateRangeFilter
              value={dateRange}
              onChange={(range) => {
                setDateRange(range);
                setCurrentPage(1);
              }}
              align="right"
            />

            <ExportButton
              reportTitle="Prev. Medical History"
              tableRef={tableRef}
            />
          </div>
        </div>

        <div className="overflow-x-auto border-t border-gray-200 pt-4">
          <table ref={tableRef} className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">S/N</th>
                <th className="px-4 py-2 font-medium">DATE</th>
                <th className="px-4 py-2 font-medium">CONSULTATION TYPE</th>
                <th className="px-4 py-2 font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((record, index) => {
                  const serial = (currentPage - 1) * PAGE_SIZE + index + 1;
                  return (
                    <tr
                      key={record.id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-4 py-3">{serial}</td>
                      <td className="px-4 py-3">{record.date}</td>
                      <td className="px-4 py-3">{record.consultationType}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={handleViewProfile}
                          className="font-medium text-green-600 hover:text-green-700 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    {searchTerm
                      ? `No results found for "${searchTerm}"`
                      : "No medical history records for the selected date range."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredRecords.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default PreviousPatientRecords;
