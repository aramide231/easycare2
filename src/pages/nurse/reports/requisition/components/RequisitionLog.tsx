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
import {
  buildMockRequisitionRecords,
  formatAmount,
  parseRequisitionDate,
  type RequisitionRecord,
} from "../data/mockRequisitionRecords";
import RequisitionViewModal from "./RequisitionViewModal";

function getVisitTypeClass(type: string): string {
  switch (type) {
    case "Out Patient":
      return "text-[#573FD1]";
    case "In Patient":
      return "text-[#FA7401]";
    case "Department":
      return "text-[#103488]";
    default:
      return "text-gray-700";
  }
}

const RequisitionLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const records = useMemo(() => buildMockRequisitionRecords(), []);

  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] =
    useState<RequisitionRecord | null>(null);
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

    return records.filter((record) => {
      const recordDate = parseRequisitionDate(record.date);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.mobileNo.includes(q) ||
        record.id.toLowerCase().includes(q) ||
        record.staffName.toLowerCase().includes(q) ||
        record.patientType.toLowerCase().includes(q);

      return inRange && matchesSearch;
    });
  }, [records, search, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(filteredRecords);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 whitespace-nowrap text-xl font-bold text-gray-800">
            (Requisition) Report
          </h1>
          <LogSearchBar
            placeholder="Search"
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
            reportTitle="(Requisition) Report"
            tableRef={tableRef}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h2 className="mb-4 text-base font-semibold text-gray-800">
          Requisition Logs
        </h2>

        <div className="overflow-x-auto">
          <table ref={tableRef} className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">S/N</th>
                <th className="px-4 py-2 font-medium">Date Time</th>
                <th className="px-4 py-2 font-medium">Name Mobile No</th>
                <th className="px-4 py-2 font-medium">Patient Type</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Action</th>
                <th className="px-4 py-2 font-medium">Staff</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((row, index) => (
                  <tr key={row.id} className="border-b border-[#D4D4D4]">
                    <td className="px-4 py-3">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}.
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span>{row.dateLabel}</span>
                        <span className="text-xs text-gray-500">
                          {row.timeLabel}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold uppercase text-gray-900">
                          {row.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {row.mobileNo} | {row.gender}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-medium ${getVisitTypeClass(row.patientType)}`}
                      >
                        {row.patientType}
                      </span>
                    </td>
                    <td className="px-4 py-3">{formatAmount(row.amount)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(row)}
                        className="font-medium text-green-600 underline hover:text-green-700"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span>{row.staffName}</span>
                        <span className="text-xs text-gray-500">
                          {row.staffMobile}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    {search
                      ? `No results found for "${search}"`
                      : "No requisition records for the selected date range."}
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

      {selectedRecord && (
        <RequisitionViewModal
          record={selectedRecord}
          open={Boolean(selectedRecord)}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
};

export default RequisitionLog;
