import { useMemo, useRef, useState } from "react";
import { getCurrentMonthRange } from "@/lib/dateTime";
import ExportButton from "@hmo/shared/ExportButton";
import DateRangeFilter, {
  type DateRangeValue,
} from "@/components/ui/DateRangeFilter";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import LogSearchBar from "@hmo/shared/components/LogSearchBar";
import TablePagination from "@hmo/shared/components/TablePagination";
import {
  buildMockHmoInsRegistrationLogRecords,
  parseHmoInsRegistrationLogDate,
} from "../data/mockHmoInsRegistrationLogRecords";

const InsRegistrationLogsLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const allRecords = useMemo(() => buildMockHmoInsRegistrationLogRecords(), []);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>(() =>
    getCurrentMonthRange(),
  );

  const filteredRecords = useMemo(() => {
    const q = search.toLowerCase().trim();
    const rangeStart = new Date(dateRange.startDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(dateRange.endDate);
    rangeEnd.setHours(23, 59, 59, 999);

    return allRecords.filter((record) => {
      const recordDate = parseHmoInsRegistrationLogDate(record.registeredDate);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.hmoName.toLowerCase().includes(q) ||
        record.code.toLowerCase().includes(q) ||
        record.contactPerson.toLowerCase().includes(q) ||
        record.phoneNumber.includes(q);

      return inRange && matchesSearch;
    });
  }, [allRecords, search, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredRecords, HMO_PAGE_SIZE);

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 text-xl font-bold whitespace-nowrap text-gray-800">
            Ins. Registration Logs
          </h1>
          <LogSearchBar
            placeholder="Search with HMO name, code or contact"
            value={search}
            onChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
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
            reportTitle="Ins. Registration Logs"
            tableRef={tableRef}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">SN</th>
              <th className="px-4 py-2 font-medium">HMO NAME</th>
              <th className="px-4 py-2 font-medium">CODE</th>
              <th className="px-4 py-2 font-medium">TYPE</th>
              <th className="px-4 py-2 font-medium">PRE-AUTH</th>
              <th className="px-4 py-2 font-medium">CONTACT PERSON</th>
              <th className="px-4 py-2 font-medium">REGISTERED DATE</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((record, index) => (
              <tr
                key={record.id}
                className="border-b border-[#D4D4D4] bg-white"
              >
                <td className="px-4 py-3 font-medium">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-3">{record.hmoName}</td>
                <td className="px-4 py-3">{record.code}</td>
                <td className="px-4 py-3">{record.hmoType}</td>
                <td className="px-4 py-3">{record.preAuthCode}</td>
                <td className="px-4 py-3">
                  <div>{record.contactPerson}</div>
                  <div className="text-xs text-gray-500">
                    {record.phoneNumber}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>{record.registeredDate}</div>
                  <div className="text-xs text-gray-500">{record.time}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-4 border-[#D4D4D4]"
      />
    </div>
  );
};

export default InsRegistrationLogsLog;
