import { useMemo, useRef, useState } from "react";
import { getCurrentMonthRange, parseLogDateTime } from "@/lib/dateTime";
import ExportButton from "@/constant/ExportButton";
import DateRangeFilter, {
  type DateRangeValue,
} from "@/components/ui/DateRangeFilter";
import { PAGE_SIZE } from "@/constant/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { usePatientManagement } from "@/pages/nurse/shared/context/PatientManagementContext";

const AdmissionReport = () => {
  const { admissionReports } = usePatientManagement();
  const tableRef = useRef<HTMLTableElement>(null);

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

    return admissionReports.filter((row) => {
      const recordDate = parseLogDateTime(row.date, row.time);
      const inRange =
        recordDate !== null &&
        recordDate >= rangeStart &&
        recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        row.patientName.toLowerCase().includes(q) ||
        row.patientId.toLowerCase().includes(q) ||
        row.action.toLowerCase().includes(q) ||
        row.performedBy.toLowerCase().includes(q) ||
        (row.ward?.toLowerCase().includes(q) ?? false);

      return inRange && matchesSearch;
    });
  }, [admissionReports, search, dateRange]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(filteredRecords);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 whitespace-nowrap text-xl font-bold text-gray-800">
            Admission Report
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

          <ExportButton reportTitle="Admission Report" tableRef={tableRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">S/N</th>
                <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                <th className="px-4 py-2 font-medium">ACTION</th>
                <th className="px-4 py-2 font-medium">WARD</th>
                <th className="px-4 py-2 font-medium">DATE</th>
                <th className="px-4 py-2 font-medium">PERFORMED BY</th>
                <th className="px-4 py-2 font-medium">PHYSICIAN</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((row, index) => (
                  <tr key={row.id} className="border-b border-[#D4D4D4]">
                    <td className="px-4 py-3">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{row.patientName}</span>
                        <span className="text-xs text-gray-500">
                          {row.patientId}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{row.action}</td>
                    <td className="px-4 py-3">{row.ward ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span>{row.date}</span>
                        <span className="text-xs text-gray-500">{row.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{row.performedBy}</td>
                    <td className="px-4 py-3">{row.physicianName}</td>
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
                      : admissionReports.length === 0
                        ? "No admission activities recorded yet. Assign a ward or re-admit a patient to see entries here."
                        : "No admission records for the selected date range."}
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

export default AdmissionReport;
