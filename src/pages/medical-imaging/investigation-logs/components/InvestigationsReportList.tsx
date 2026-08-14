import { useEffect, useMemo, useRef, useState } from "react";
import ExportButton from "@/constant/ExportButton";
import DateRangeFilter from "@/components/ui/DateRangeFilter";
import LogSearchBar from "@/pages/nurse/components/LogSearchBar";
import InvestigationResultContent from "@/pages/doctor/patientProfile/components/category/InvestigationResultContent";
import MedicalRemarkViewPanel from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";
import DiagnosticsTablePagination from "../../components/DiagnosticsTablePagination";
import { getTotalPages } from "@/pages/nurse/lib/pagination";
import { treatmentTypeBadgeClass } from "../../lib/diagnosticsBadgeStyles";
import {
  INVESTIGATION_LOG_ROWS,
  INVESTIGATION_LOGS_DEFAULT_RANGE,
  type InvestigationLogRow,
} from "../data/investigationLogsFigma";

const PAGE_SIZE = 9;

export default function InvestigationsReportList() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<InvestigationLogRow | null>(
    null
  );
  const [viewOpen, setViewOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: INVESTIGATION_LOGS_DEFAULT_RANGE.startDate,
    endDate: INVESTIGATION_LOGS_DEFAULT_RANGE.endDate,
  });

  const filtered = INVESTIGATION_LOG_ROWS.filter((row) => {
    const q = searchTerm.toLowerCase();
    return (
      row.regName.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.phoneNumber.toLowerCase().includes(q) ||
      row.invName.toLowerCase().includes(q) ||
      row.clinician.toLowerCase().includes(q) ||
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

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openRowView = (row: InvestigationLogRow) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const closeRowView = () => {
    setViewOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <h1 className="shrink-0 text-xl font-bold text-gray-800">
              Investigations Report
            </h1>
            <LogSearchBar
              placeholder="Search with recipient name, ID or phone number"
              value={searchTerm}
              onChange={setSearchTerm}
              className="max-w-md flex-1"
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <DateRangeFilter
              value={dateRange}
              onChange={setDateRange}
              align="right"
            />
            <ExportButton
              reportTitle="Investigations Report"
              tableRef={tableRef}
            />
          </div>
        </div>

        <div className="overflow-x-auto border-t border-gray-200 pt-4">
          <table ref={tableRef} className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Reg. Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Date | Time
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Gender
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Px-Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">Age</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Inv. Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Inv. Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Staff Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Clinician
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => {
                  const isSelected = selectedRow?.id === row.id && viewOpen;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => openRowView(row)}
                      className={`cursor-pointer border-b border-[#D4D4D4] transition-colors hover:bg-gray-100 ${
                        isSelected
                          ? "bg-gray-100"
                          : index % 2 === 0
                            ? "bg-white"
                            : "bg-[#FAFAFA]"
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-3">{row.id}</td>
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
                      <td className="whitespace-nowrap px-4 py-3">
                        {row.gender}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${treatmentTypeBadgeClass(row.pxType)}`}
                        >
                          {row.pxType}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {row.age}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openRowView(row);
                          }}
                          className="text-sm font-semibold text-[#573FD1] underline hover:text-[#4a35b8]"
                        >
                          {row.invName}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {row.invAmount}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {row.staffName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {row.clinician}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <DiagnosticsTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <MedicalRemarkViewPanel
        open={viewOpen}
        onClose={closeRowView}
        title="Investigation Results"
        subtitle={selectedRow?.invName}
        hasResult={selectedRow?.hasResult ?? false}
      >
        {selectedRow ? (
          <InvestigationResultContent
            investigationName={selectedRow.invName}
            dateTime={`${selectedRow.date} ${selectedRow.time}`}
          />
        ) : null}
      </MedicalRemarkViewPanel>
    </>
  );
}
