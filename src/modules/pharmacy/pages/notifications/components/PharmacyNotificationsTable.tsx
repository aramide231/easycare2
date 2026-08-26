import { useEffect, useMemo, useState } from "react";
import LogSearchBar from "@pharmacy/shared/components/LogSearchBar";
import PharmacyTablePagination from "../../components/PharmacyTablePagination";
import MedicalRemarkViewPanel from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";
import { incomingBadgeClass } from "../../data/mockPharmacy";
import {
  PHARMACY_NOTIFICATION_ROWS,
  type PharmacyNotificationRow,
} from "../data/pharmacyNotificationsFigma";

const PAGE_SIZE = 9;

function NotificationViewContent({ row }: { row: PharmacyNotificationRow }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#573FD1]/20 bg-purple-50/50 px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">{row.regName}</p>
        <p className="text-xs text-gray-600">
          {row.date} {row.time}
        </p>
      </div>

      <dl className="space-y-3 rounded-lg border border-gray-200 p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Incoming</dt>
          <dd>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${incomingBadgeClass(row.incoming)}`}
            >
              <span aria-hidden>•</span>
              {row.incoming}
            </span>
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Patient ID</dt>
          <dd className="font-medium text-gray-900">{row.patientId}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Phone</dt>
          <dd className="font-medium text-gray-900">{row.phoneNumber}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Gender</dt>
          <dd className="font-medium text-gray-900">{row.gender}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Staff Name</dt>
          <dd className="font-medium text-gray-900">{row.staffName}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function PharmacyNotificationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<PharmacyNotificationRow | null>(null);

  const filtered = PHARMACY_NOTIFICATION_ROWS.filter((row) => {
    const q = searchTerm.toLowerCase();
    return (
      row.regName.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.phoneNumber.toLowerCase().includes(q) ||
      row.incoming.toLowerCase().includes(q) ||
      row.staffName.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const totalPages = 70;

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="shrink-0 text-xl font-bold text-gray-800">
            Notification
          </h1>
          <LogSearchBar
            placeholder="Search with Surname, Patient ID or Phone number"
            value={searchTerm}
            onChange={setSearchTerm}
            className="sm:max-w-md sm:flex-1"
          />
        </div>

        <div className="overflow-x-auto border-t border-gray-200 pt-4">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Incoming
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Patient Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Date | Time
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Gender
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Staff Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-[#D4D4D4] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-3">{row.id}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${incomingBadgeClass(row.incoming)}`}
                      >
                        <span aria-hidden>•</span>
                        {row.incoming}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {row.regName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {row.patientId} | {row.phoneNumber}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{row.date}</div>
                      <div className="text-xs text-gray-500">{row.time}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{row.gender}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.staffName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRow(row);
                          setViewOpen(true);
                        }}
                        className="text-sm font-semibold text-[#1B9E4B] underline hover:text-green-700"
                      >
                        View
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
                    No notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PharmacyTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <MedicalRemarkViewPanel
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelectedRow(null);
        }}
        title={
          selectedRow?.incoming === "REQUEST"
            ? "Request Details"
            : "Medication Details"
        }
        subtitle={selectedRow?.regName}
        hasResult={Boolean(selectedRow)}
      >
        {selectedRow ? <NotificationViewContent row={selectedRow} /> : null}
      </MedicalRemarkViewPanel>
    </>
  );
}
