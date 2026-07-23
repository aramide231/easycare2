import { useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { parsePatientLastSeen } from "@/lib/dateTime";
import ExportButton from "@hmo/shared/ExportButton";
import DateRangeFilter, {
  type DateRangeValue,
} from "@/components/ui/DateRangeFilter";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import TablePagination from "@hmo/shared/components/TablePagination";
import {
  buildBillSummaryFilterOptions,
  buildMockBillSummaryRecords,
  formatBillAmount,
  getBillSummaryDefaultRange,
} from "../data/mockBillSummaryRecords";

const viewBtnClass =
  "rounded-lg border-[0.5px] border-[#00C851] bg-[#E6FAEE] px-2 py-1 text-xs font-medium tracking-[-0.24px] text-[#33D374]";

const BillSummaryLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const allRecords = useMemo(() => buildMockBillSummaryRecords(), []);
  const filterOptions = useMemo(
    () => buildBillSummaryFilterOptions(allRecords),
    [allRecords],
  );

  const [filterOption, setFilterOption] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>(() =>
    getBillSummaryDefaultRange(),
  );

  const filteredRecords = useMemo(() => {
    const rangeStart = new Date(dateRange.startDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(dateRange.endDate);
    rangeEnd.setHours(23, 59, 59, 999);

    return allRecords.filter((record) => {
      const recordDate = parsePatientLastSeen(record.billDate);
      if (!recordDate) return false;

      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;

      if (!filterOption) {
        return inRange;
      }

      return inRange && record.hmoName === filterOption;
    });
  }, [allRecords, filterOption, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredRecords, HMO_PAGE_SIZE);

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full max-w-[254px]">
          <select
            value={filterOption}
            onChange={(event) => {
              setFilterOption(event.target.value);
              setCurrentPage(1);
            }}
            className="h-8 w-full appearance-none rounded-[5.6px] border-[0.35px] border-[#A5A5A5] bg-[#FAFAFA] px-3 pr-8 text-sm italic text-black outline-none focus:border-[#573FD1]"
          >
            <option value="">-Select An Option-</option>
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A5A5A5]" />
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
          <ExportButton reportTitle="Bill Summary" tableRef={tableRef} />
        </div>
      </div>

      <div className="border-t border-[#D4D4D4] pt-4">
        <div className="overflow-x-auto">
          <table
            ref={tableRef}
            className="min-w-[1200px] w-full text-left text-sm"
          >
            <thead className="border-b border-[#D4D4D4] text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
              <tr>
                <th className="px-4 py-3">SN</th>
                <th className="px-4 py-3">HMO</th>
                <th className="px-4 py-3">P. CODE</th>
                <th className="px-4 py-3">TREATMENT GUIDE</th>
                <th className="px-4 py-3">FREQUENCY</th>
                <th className="px-4 py-3">ACCUMULATED TOTAL BILL (N)</th>
                <th className="px-4 py-3">AMOUNT PAID (N)</th>
                <th className="px-4 py-3">OUTSTANDING BALANCE (N)</th>
                <th className="px-4 py-3">CLAIMS PROCESSOR</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((record, index) => (
                  <tr
                    key={record.id}
                    className="border-b border-[#D4D4D4] bg-white transition-colors hover:bg-[#F8F8F8]"
                  >
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {record.hmoName}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {record.providerCode}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {record.treatmentGuide}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {record.frequency}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {formatBillAmount(record.accumulatedTotal)}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {formatBillAmount(record.amountPaid)}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {formatBillAmount(record.outstanding)}
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" className={viewBtnClass}>
                        VIEW
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No bill summary records found for the selected filters.
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

export default BillSummaryLog;
