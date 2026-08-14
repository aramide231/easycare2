import { useEffect, useMemo, useState } from "react";
import LogSearchBar from "@/pages/nurse/components/LogSearchBar";
import DiagnosticsTablePagination from "./DiagnosticsTablePagination";
import { getTotalPages } from "@/pages/nurse/lib/pagination";
import {
  isDateWithinRange,
  parsePatientLastSeen,
  type DateRangeValue,
} from "@/lib/dateTime";
import {
  PATIENTS_LOG_ROWS,
  type DiagnosticsPatientsLogRow,
} from "../data/mockDiagnostics";
import { treatmentTypeBadgeClass } from "../lib/diagnosticsBadgeStyles";

const PAGE_SIZE = 7;

type Props = {
  dateRange?: DateRangeValue | null;
  selectedId?: number | null;
  onSelectRow?: (row: DiagnosticsPatientsLogRow) => void;
};

export default function DiagnosticsPatientsLog({
  dateRange = null,
  selectedId = null,
  onSelectRow,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = PATIENTS_LOG_ROWS.filter((row) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      row.regName.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.phoneNumber.toLowerCase().includes(q) ||
      row.invName.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (!dateRange) return true;

    const parsedDate = parsePatientLastSeen(row.date);
    return parsedDate !== null && isDateWithinRange(parsedDate, dateRange);
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateRange]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <h1 className="shrink-0 text-xl font-bold text-gray-800">
          Patients Log
        </h1>
        <LogSearchBar
          placeholder="Search with Surname, Patient ID or Phone number"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">S/N</th>
              <th className="px-4 py-2 font-medium">Reg. Name</th>
              <th className="px-4 py-2 font-medium">Date | Time</th>
              <th className="px-4 py-2 font-medium">Gender</th>
              <th className="px-4 py-2 font-medium">Px-Type</th>
              <th className="px-4 py-2 font-medium">Age</th>
              <th className="px-4 py-2 font-medium">Inv. Name</th>
              <th className="px-4 py-2 font-medium">Inv. Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => onSelectRow?.(row)}
                className={`cursor-pointer border-b border-[#D4D4D4] ${
                  selectedId === row.id
                    ? "bg-purple-50"
                    : index % 2 === 0
                      ? "bg-white"
                      : "bg-[#FAFAFA]"
                }`}
              >
                <td className="px-4 py-3">{row.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{row.regName}</div>
                  <div className="text-xs text-gray-500">
                    {row.patientId} | {row.phoneNumber}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>{row.date}</div>
                  <div className="text-xs text-gray-500">{row.time}</div>
                </td>
                <td className="px-4 py-3">{row.gender}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${treatmentTypeBadgeClass(row.treatmentType)}`}
                  >
                    {row.treatmentType}
                  </span>
                </td>
                <td className="px-4 py-3">{row.age}</td>
                <td className="px-4 py-3">{row.invName}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.invAmount}</td>
              </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No records on this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DiagnosticsTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
