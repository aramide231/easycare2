import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ExportButton from "@/constant/ExportButton";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { getTotalPages } from "@/pages/nurse/shared/lib/pagination";
import ReportDateRangeFilter from "@/pages/doctor/reports/components/ReportDateRangeFilter";
import PatientSummaryCard from "./components/PatientSummaryCard";
import {
  DEFAULT_PREVIOUS_PATIENT,
  MEDICAL_HISTORY_SEED,
  type MedicalHistoryEntry,
  type PreviousPatientSummary,
} from "./data/medicalHistorySeed";

const PAGE_SIZE = 5;

const PreviousPatientRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useParams();
  const tableRef = useRef<HTMLTableElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const patient: PreviousPatientSummary =
    (location.state?.patient as PreviousPatientSummary | undefined) ??
    DEFAULT_PREVIOUS_PATIENT;

  const resolvedPatient =
    patientId && patient.patientId !== patientId
      ? { ...patient, patientId }
      : patient;

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return MEDICAL_HISTORY_SEED;

    return MEDICAL_HISTORY_SEED.filter(
      (row) =>
        row.date.toLowerCase().includes(q) ||
        row.time.toLowerCase().includes(q) ||
        row.consultationType.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = filtered.slice(start, start + PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewRecord = (row: MedicalHistoryEntry) => {
    navigate(`/doctor/patient-profile/${resolvedPatient.patientId}`, {
      state: {
        patient: resolvedPatient,
        consultationRecord: row,
      },
    });
  };

  return (
    <div className="flex min-h-0 w-full flex-col gap-4 lg:flex-row lg:items-start">
      <PatientSummaryCard patient={resolvedPatient} />

      <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <h1 className="shrink-0 text-xl font-bold text-gray-800">
              Prev. Medical History
            </h1>
            <LogSearchBar
              placeholder="Search with date or consultation type"
              value={searchTerm}
              onChange={handleSearchChange}
              className="sm:max-w-md"
            />
          </div>

          <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
            <ReportDateRangeFilter />
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
                <th className="px-4 py-2 text-center font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => (
                  <tr key={row.id} className="border-b border-[#D4D4D4]">
                    <td className="px-4 py-3">{start + index + 1}</td>
                    <td className="px-4 py-3">
                      <div>{row.date}</div>
                      <div className="text-xs text-gray-500">{row.time}</div>
                    </td>
                    <td className="px-4 py-3">{row.consultationType}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleViewRecord(row)}
                        className="rounded-md bg-[#22C55E] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#16A34A]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    {searchTerm
                      ? `No results found for "${searchTerm}"`
                      : "No previous medical history found for this patient."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filtered.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousPatientRecords;
