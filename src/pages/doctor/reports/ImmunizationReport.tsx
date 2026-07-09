import { useMemo, useRef, useState } from "react";
import ExportButton from "@/constant/ExportButton";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { getTotalPages } from "@/pages/nurse/shared/lib/pagination";
import { getPatientTypeClass } from "@/pages/nurse/shared/lib/patientTypeStyles";
import ReportDateRangeFilter from "./components/ReportDateRangeFilter";
import {
  IMMUNIZATION_REPORT_SEED,
  type ImmunizationReportRow,
  type PatientType,
} from "./data/immunizationReportSeed";

const PAGE_SIZE = 9;

const isValidPatientType = (type: string): type is PatientType =>
  ["COMPANY", "PRIVATE", "HMO"].includes(type);

const ImmunizationReport = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return IMMUNIZATION_REPORT_SEED;

    return IMMUNIZATION_REPORT_SEED.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.patientId.toLowerCase().includes(q) ||
        row.phoneNumber.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = filtered.slice(start, start + PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const renderPatientCell = (row: ImmunizationReportRow) => (
    <td className="px-4 py-3">
      <div className="font-medium text-gray-900">{row.name}</div>
      <div className="text-xs text-gray-500">
        {row.patientId} | {row.phoneNumber}
      </div>
    </td>
  );

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 text-xl font-bold text-gray-800">
            Immunization Report
          </h1>
          <LogSearchBar
            placeholder="Search with Surname, Patient ID or Phone number"
            value={searchTerm}
            onChange={handleSearchChange}
            className="sm:max-w-xl"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
          <ReportDateRangeFilter />
          <ExportButton
            reportTitle="Immunization Report"
            tableRef={tableRef}
          />
        </div>
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table ref={tableRef} className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">SN</th>
              <th className="px-4 py-2 font-medium">PATIENT NAME</th>
              <th className="px-4 py-2 font-medium">LAST SEEN</th>
              <th className="px-4 py-2 font-medium">FOLLOW-UP</th>
              <th className="px-4 py-2 font-medium">GENDER</th>
              <th className="px-4 py-2 font-medium">AGE</th>
              <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
              <th className="px-4 py-2 font-medium">WEIGHT</th>
              <th className="px-4 py-2 font-medium">IMMUNIZATION</th>
              <th className="px-4 py-2 font-medium">ATTENDANT</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-[#D4D4D4] bg-white"
                >
                  <td className="px-4 py-3">{start + index + 1}</td>
                  {renderPatientCell(row)}
                  <td className="px-4 py-3">
                    <div>{row.lastSeen}</div>
                    <div className="text-xs text-[#573FD1]">
                      {row.lastSeenTime}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{row.followUp}</div>
                    <div className="text-xs text-gray-500">
                      {row.followUpTime}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.gender}</td>
                  <td className="px-4 py-3">{row.age}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isValidPatientType(row.patientType)
                          ? getPatientTypeClass(row.patientType)
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {row.patientType}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.weight}</td>
                  <td className="px-4 py-3">{row.immunization}</td>
                  <td className="px-4 py-3">{row.attendant}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                >
                  {searchTerm
                    ? `No results found for "${searchTerm}"`
                    : "No immunization records found for the selected period."}
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
  );
};

export default ImmunizationReport;
