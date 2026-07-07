import { useMemo, useRef, useState } from "react";
import { getCurrentMonthRange } from "@/lib/dateTime";

import ExportButton from "@/constant/ExportButton";
import DateRangeFilter, {
  type DateRangeValue,
} from "@/components/ui/DateRangeFilter";
import { PAGE_SIZE } from "@/constant/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { getPatientTypeClass } from "@/pages/nurse/shared/lib/patientTypeStyles";
import {
  buildMockFamilyPlanningRecords,
  parseFamilyPlanningDate,
  type FamilyPlanningMethod,
} from "../data/mockFamilyPlanningRecords";

const getMethodClass = (method: FamilyPlanningMethod): string => {
  switch (method) {
    case "NATURAL":
      return "bg-[#e6faee] text-[#33d374] border border-[#33d374]";
    case "BARRIER":
      return "bg-[#fff1e6] text-[#fa7401] border border-[#fa7401]";
    case "HORMONAL":
      return "bg-[#ccd4e6] text-[#103488] border border-[#234492]";
    case "LARCs":
      return "bg-[#b0b0b0] text-[#071639] border border-[#39445d]";
    case "PERMANENT":
      return "bg-[#333333] text-[#FFFFFF] border border-[#cccccc]";
    case "ECs":
      return "bg-[#d0c9f2] text-[#573FD1] border border-[#573FD1]";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

const FamilyPlanningLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const allRecords = useMemo(() => buildMockFamilyPlanningRecords(), []);

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => getCurrentMonthRange());

  const filteredRecords = useMemo(() => {
    const q = search.toLowerCase().trim();
    const { startDate, endDate } = dateRange;
    const rangeStart = new Date(startDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(endDate);
    rangeEnd.setHours(23, 59, 59, 999);

    return allRecords.filter((record) => {
      const recordDate = parseFamilyPlanningDate(record.followUp);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q) ||
        record.phoneNumber.includes(q);
      return inRange && matchesSearch;
    });
  }, [allRecords, search, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(filteredRecords);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 whitespace-nowrap text-xl font-bold text-gray-800">
            Family Planning Report
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

          <ExportButton
            reportTitle="Family Planning Report"
            tableRef={tableRef}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                <th className="px-4 py-2 font-medium">GENDER</th>
                <th className="px-4 py-2 font-medium">AGE</th>
                <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                <th className="px-4 py-2 font-medium">METHODS</th>
                <th className="px-4 py-2 font-medium">FOLLOW-UP</th>
                <th className="px-4 py-2 font-medium">ATTENDANT (DOCTOR)</th>
                <th className="px-4 py-2 font-medium">ATTENDANT (NURSE)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((record, index) => (
                  <tr
                    key={record.id}
                    className="border-b border-[#D4D4D4] bg-white"
                  >
                    <td className="px-4 py-3 font-medium">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{record.name}</div>
                      <div className="text-xs text-gray-500">
                        {record.patientId} | {record.phoneNumber}
                      </div>
                    </td>
                    <td className="px-4 py-3">{record.gender}</td>
                    <td className="px-4 py-3">{record.age}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getPatientTypeClass(record.patientType)}`}
                      >
                        {record.patientType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-3 py-1 text-xs font-medium ${getMethodClass(record.method)}`}
                      >
                        {record.method}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>{record.followUp}</div>
                      <div className="text-xs text-gray-500">
                        {record.followUpTime}
                      </div>
                    </td>
                    <td className="px-4 py-3">{record.attendantDoctor}</td>
                    <td className="px-4 py-3">{record.attendantNurse}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    {search
                      ? `No results found for "${search}"`
                      : "No family planning records for the selected date range."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredRecords.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-6"
          />
        )}
      </div>
    </div>
  );
};

export default FamilyPlanningLog;
