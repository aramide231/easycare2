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
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import {
  buildMockHmoDischargedLogRecords,
  parseHmoDischargedLogDate,
} from "../data/mockHmoDischargedLogRecords";

const DischargedLogsLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const allRecords = useMemo(() => buildMockHmoDischargedLogRecords(), []);
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
      const recordDate = parseHmoDischargedLogDate(record.dischargeDate);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q) ||
        record.phoneNumber.includes(q) ||
        record.remark.toLowerCase().includes(q);

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
            Discharged Logs
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

        <div className="flex shrink-0 items-center gap-3">
          <DateRangeFilter
            value={dateRange}
            onChange={(range) => {
              setDateRange(range);
              setCurrentPage(1);
            }}
            align="right"
          />
          <ExportButton reportTitle="Discharged Logs" tableRef={tableRef} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">SN</th>
              <th className="px-4 py-2 font-medium">PATIENT NAME</th>
              <th className="px-4 py-2 font-medium">DISCHARGE DATE</th>
              <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
              <th className="px-4 py-2 font-medium">REMARK</th>
              <th className="px-4 py-2 font-medium">NO. OF DAYS</th>
              <th className="px-4 py-2 font-medium">DISCHARGED BY</th>
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
                <td className="px-4 py-3">
                  <div className="font-medium">{record.name}</div>
                  <div className="text-xs text-gray-500">
                    {record.patientId} | {record.phoneNumber}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>{record.dischargeDate}</div>
                  <div className="text-xs text-gray-500">{record.time}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${getPatientTypeClass(record.patientType)}`}
                  >
                    {record.patientType}
                  </span>
                </td>
                <td className="px-4 py-3">{record.remark}</td>
                <td className="px-4 py-3">{record.noOfDays}</td>
                <td className="px-4 py-3">{record.dischargedBy}</td>
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

export default DischargedLogsLog;
