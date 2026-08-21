import { useEffect, useMemo, useState } from "react";
import { Calendar, Share2 } from "lucide-react";
import LogSearchBar from "../../shared/components/LogSearchBar";
import TablePagination from "../../shared/components/TablePagination";
import { getTotalPages } from "../../shared/lib/pagination";
import {
  getPatientTypeClass,
  getPxTypeClass,
} from "../../dashboard/lib/patientTypeStyles";
import { VISITATION_LOG_ROWS } from "../data/mockVisitationLogs";

const PAGE_SIZE = 9;

export default function VisitationLogsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return VISITATION_LOG_ROWS;

    return VISITATION_LOG_ROWS.filter(
      (row) =>
        row.regName.toLowerCase().includes(q) ||
        row.patientId.toLowerCase().includes(q) ||
        row.phoneNumber.includes(q) ||
        row.invName.toLowerCase().includes(q),
    );
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
      <div className="mb-4 flex flex-col gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 text-xl font-bold text-gray-800">
            Diagnx Report List
          </h1>
          <LogSearchBar
            placeholder="Search with recipient name, ID or phone number"
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#573FD1] bg-white px-4 py-2 text-sm font-medium text-[#573FD1] transition hover:bg-purple-50"
          >
            <Calendar className="h-4 w-4" />
            <span>25/03/2025 - 28/03/2025</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#573FD1] bg-white px-4 py-2 text-sm font-medium text-[#573FD1] transition hover:bg-purple-50"
          >
            <Share2 className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full min-w-[1150px] text-left">
          <thead className="border-b border-[#D4D4D4] text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="h-11 px-4">S/N</th>
              <th className="h-11 px-4">Reg. Name</th>
              <th className="h-11 px-4">Date | Time</th>
              <th className="h-11 px-4">Gender</th>
              <th className="h-11 px-4">Px-Type</th>
              <th className="h-11 px-4">Age</th>
              <th className="h-11 px-4">Inv. Name</th>
              <th className="h-11 px-4">Inv. Amount</th>
              <th className="h-11 px-4">Trt. Type</th>
              <th className="h-11 px-4">Clinician</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr
                key={row.id}
                className="h-[55px] border-b border-[#D4D4D4] bg-white transition hover:bg-gray-50"
              >
                <td className="px-4 text-sm text-gray-800">{row.id}</td>
                <td className="px-4">
                  <div className="text-sm font-medium text-gray-900">
                    {row.regName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {row.patientId} | {row.phoneNumber}
                  </div>
                </td>
                <td className="px-4">
                  <div className="text-sm text-gray-800">{row.date}</div>
                  <div className="text-xs text-gray-500">{row.time}</div>
                </td>
                <td className="px-4 text-sm text-gray-800">{row.gender}</td>
                <td className="px-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPxTypeClass(row.pxType)}`}
                  >
                    {row.pxType}
                  </span>
                </td>
                <td className="px-4 text-sm text-gray-800">{row.age}</td>
                <td className="px-4">
                  <button
                    type="button"
                    className="text-sm font-medium text-[#573FD1] hover:underline"
                  >
                    {row.invName}
                  </button>
                </td>
                <td className="px-4 text-sm text-gray-800">{row.invAmount}</td>
                <td className="px-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPatientTypeClass(row.treatmentType)}`}
                  >
                    {row.treatmentType}
                  </span>
                </td>
                <td className="px-4 text-sm text-gray-800">{row.clinician}</td>
              </tr>
            ))}
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
}
