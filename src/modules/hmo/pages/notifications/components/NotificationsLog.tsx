import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import LogSearchBar from "@hmo/shared/components/LogSearchBar";
import TablePagination from "@hmo/shared/components/TablePagination";
import { getIncomingTagClass } from "@hmo/pages/shared/lib/incomingTagStyles";
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import {
  buildMockHmoNotificationRecords,
} from "../data/mockNotificationRecords";

const NotificationsLog = () => {
  const [records, setRecords] = useState(() => buildMockHmoNotificationRecords());
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return records;
    return records.filter(
      (record) =>
        record.name.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q) ||
        record.phoneNumber.includes(q) ||
        record.sendersName.toLowerCase().includes(q),
    );
  }, [records, search]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredRecords, HMO_PAGE_SIZE);

  const handleDelete = (id: number) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 border-b border-[#D4D4D4] pb-4 sm:flex-row sm:items-center">
        <h1 className="shrink-0 text-base font-semibold text-gray-900">
          Notification
        </h1>
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
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs font-medium uppercase tracking-wide text-[#A5A5A5]">
            <tr>
              <th className="px-3 py-2">SN</th>
              <th className="px-3 py-2">Incoming</th>
              <th className="px-3 py-2">Patient Name</th>
              <th className="px-3 py-2">Time of Request</th>
              <th className="px-3 py-2">Patient Type</th>
              <th className="px-3 py-2">Sender&apos;s Name</th>
              <th className="px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((record, index) => (
                <tr
                  key={record.id}
                  className="border-b border-[#D4D4D4] bg-white transition hover:bg-[#EDEDED]"
                >
                  <td className="px-3 py-3 font-medium text-gray-900">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-lg border px-2 py-1 text-xs font-medium ${getIncomingTagClass(record.incoming)}`}
                    >
                      {record.incoming}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium text-gray-900">{record.name}</div>
                    <div className="text-xs text-gray-500">
                      {record.patientId} | {record.phoneNumber}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div>{record.requestDate}</div>
                    <div className="text-xs text-gray-500">
                      {record.requestTime}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-lg border px-2 py-1 text-xs font-medium ${getPatientTypeClass(record.patientType)}`}
                    >
                      {record.patientType}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-800">
                    {record.sendersName}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(record.id)}
                      className="inline-flex rounded-md p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Delete notification"
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
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No notifications found.
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

export default NotificationsLog;
