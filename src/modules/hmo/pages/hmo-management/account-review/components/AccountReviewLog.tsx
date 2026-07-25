import { useMemo, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
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
  buildMockAccountReviewRecords,
  formatAccountAmount,
} from "../data/mockAccountReviewRecords";
import { parsePatientLastSeen } from "@/lib/dateTime";

const viewBtnClass =
  "rounded-lg border-[0.5px] border-[#00C851] bg-[#E6FAEE] px-2 py-1 text-xs font-medium tracking-[-0.24px] text-[#33D374]";

const AccountReviewLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [records, setRecords] = useState(() =>
    buildMockAccountReviewRecords(),
  );
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

    return records.filter((record) => {
      const recordDate = parsePatientLastSeen(record.date);
      if (!recordDate) return false;

      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q) ||
        record.phoneNumber.includes(q) ||
        formatAccountAmount(record.accumulatedTotal).includes(q) ||
        formatAccountAmount(record.amountPaid).includes(q) ||
        formatAccountAmount(record.outstanding).includes(q) ||
        record.senderName.toLowerCase().includes(q);

      return inRange && matchesSearch;
    });
  }, [records, search, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredRecords, HMO_PAGE_SIZE);

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 text-xl font-bold whitespace-nowrap text-gray-800">
            Account Review
          </h1>
          <LogSearchBar
            placeholder="Search with recipient name, ID or Amount"
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
          <ExportButton reportTitle="Account Review" tableRef={tableRef} />
        </div>
      </div>

      <div className="border-t border-[#D4D4D4] pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="min-w-[1180px] w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs font-medium uppercase tracking-[-0.24px] text-[#A5A5A5]">
              <tr>
                <th className="px-4 py-3">SN</th>
                <th className="px-4 py-3">NAME</th>
                <th className="px-4 py-3">DATE &amp; TIME</th>
                <th className="px-4 py-3">ACCUMULATED TOTAL BILL (N)</th>
                <th className="px-4 py-3">AMOUNT PAID (N)</th>
                <th className="px-4 py-3">INVOICES</th>
                <th className="px-4 py-3">CLAIMS PROCESSOR</th>
                <th className="px-4 py-3">OUTSTANDING BAL (N)</th>
                <th className="px-4 py-3">SENDER&apos;S NAME</th>
                <th className="px-4 py-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((record, index) => (
                  <tr
                    key={record.id}
                    className="border-b border-[#D4D4D4] bg-white transition-colors hover:bg-[#EDEDED]"
                  >
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[15px] tracking-[-0.3px] text-black">
                        {record.name}
                      </div>
                      <div className="text-xs tracking-[-0.24px] text-[#626262]">
                        {record.patientId} | {record.phoneNumber}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[15px] tracking-[-0.3px] text-black">
                        {record.date}
                      </div>
                      <div className="text-xs tracking-[-0.24px] text-[#626262]">
                        {record.time}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {formatAccountAmount(record.accumulatedTotal)}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {formatAccountAmount(record.amountPaid)}
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" className={viewBtnClass}>
                        VIEW
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" className={viewBtnClass}>
                        VIEW
                      </button>
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {formatAccountAmount(record.outstanding)}
                    </td>
                    <td className="px-4 py-3 text-[15px] tracking-[-0.3px] text-black">
                      {record.senderName}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setRecords((prev) =>
                            prev.filter((item) => item.id !== record.id),
                          )
                        }
                        className="inline-flex rounded-lg p-1.5 text-[#FC3131] hover:bg-[#FFCFCC]/50"
                        aria-label={`Delete ${record.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No account review records found for the selected filters.
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

export default AccountReviewLog;
