import { useMemo, useRef, useState } from "react";
import { Eye } from "lucide-react";
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
import { getTreatmentGuideClass } from "@hmo/pages/shared/lib/treatmentGuideStyles";
import {
  buildMockClaimsProcessorRecords,
  parseClaimDate,
} from "../data/mockClaimsProcessorRecords";

const ClaimsProcessorLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const allRecords = useMemo(() => buildMockClaimsProcessorRecords(), []);

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>(() =>
    getCurrentMonthRange(),
  );

  const filteredRecords = useMemo(() => {
    const q = search.toLowerCase().trim();
    const { startDate, endDate } = dateRange;
    const rangeStart = new Date(startDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(endDate);
    rangeEnd.setHours(23, 59, 59, 999);

    return allRecords.filter((record) => {
      const recordDate = parseClaimDate(record.claimDate);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q) ||
        record.phoneNumber.includes(q);
      return inRange && matchesSearch;
    });
  }, [allRecords, search, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredRecords, HMO_PAGE_SIZE);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 text-xl font-bold whitespace-nowrap text-gray-800">
            Claims Processor
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

          <ExportButton reportTitle="Claims Processor" tableRef={tableRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">Patient Name</th>
                <th className="px-4 py-2 font-medium">Gender</th>
                <th className="px-4 py-2 font-medium">Age</th>
                <th className="px-4 py-2 font-medium">Patient Type</th>
                <th className="px-4 py-2 font-medium">Treatment Guide</th>
                <th className="px-4 py-2 font-medium">Date / Time</th>
                <th className="px-4 py-2 font-medium text-center">Action</th>
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
                      {(currentPage - 1) * pageSize + index + 1}
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
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getTreatmentGuideClass(record.treatmentGuide)}`}
                      >
                        {record.treatmentGuide}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>{record.claimDate}</div>
                      <div className="text-xs text-gray-500">{record.time}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#573FD1]/30 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-[#573FD1] transition hover:bg-indigo-100"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No claims found for the selected filters.
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
    </div>
  );
};

export default ClaimsProcessorLog;
