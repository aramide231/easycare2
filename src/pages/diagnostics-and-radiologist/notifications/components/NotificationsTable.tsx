import { useEffect, useMemo, useState } from "react";
import LogSearchBar from "../../shared/components/LogSearchBar";
import TablePagination from "../../shared/components/TablePagination";
import { getTotalPages } from "../../shared/lib/pagination";
import {
  getPatientTypeClass,
  getPxTypeClass,
} from "../../dashboard/lib/patientTypeStyles";
import {
  NOTIFICATION_ROWS,
  type NotificationRow,
} from "../data/mockNotifications";
import NotificationsEmptyState from "./NotificationsEmptyState";

const PAGE_SIZE = 9;

export default function NotificationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return NOTIFICATION_ROWS;

    return NOTIFICATION_ROWS.filter(
      (row) =>
        row.regName.toLowerCase().includes(q) ||
        row.patientId.toLowerCase().includes(q) ||
        row.phoneNumber.includes(q) ||
        row.staffName.toLowerCase().includes(q) ||
        row.incoming.toLowerCase().includes(q),
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

  const handleSelectRow = (row: NotificationRow) => {
    setSelectedId(row.id);
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
        <h1 className="shrink-0 text-xl font-bold text-gray-800">
          Notification
        </h1>
        <LogSearchBar
          placeholder="Search with Surname, Patient ID or Phone number"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {paginatedRows.length === 0 ? (
        <NotificationsEmptyState />
      ) : (
        <>
          <div className="min-h-0 flex-1 overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="border-b border-[#D4D4D4] text-xs font-medium uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="h-11 px-4">S/N</th>
                  <th className="h-11 px-4">Incoming</th>
                  <th className="h-11 px-4">Reg. Name</th>
                  <th className="h-11 px-4">Date | Time</th>
                  <th className="h-11 px-4">Gender</th>
                  <th className="h-11 px-4">Px-Type</th>
                  <th className="h-11 px-4">Trt. Type</th>
                  <th className="h-11 px-4">Inv. Amount</th>
                  <th className="h-11 px-4">Staff Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleSelectRow(row)}
                    className={`h-[55px] cursor-pointer border-b border-[#D4D4D4] transition hover:bg-gray-50 ${
                      selectedId === row.id ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-4 text-sm text-gray-800">{row.id}</td>
                    <td className="px-4">
                      <button
                        type="button"
                        className="text-sm font-medium text-[#573FD1] hover:underline"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {row.incoming}
                      </button>
                    </td>
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
                    <td className="px-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPatientTypeClass(row.treatmentType)}`}
                      >
                        {row.treatmentType}
                      </span>
                    </td>
                    <td className="px-4 text-sm text-gray-800">{row.invAmount}</td>
                    <td className="px-4 text-sm text-gray-800">{row.staffName}</td>
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
        </>
      )}
    </div>
  );
}
