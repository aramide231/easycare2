import { useEffect, useMemo, useRef, useState } from "react";
import { DateRange, type RangeKeyDict } from "react-date-range";
import MedicalRemarkViewPanel from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";
import RequisitionDownloadButton from "./RequisitionDownloadButton";
import {
  REQUISITION_DEFAULT_RANGE,
  REQUISITION_LOG_ROWS,
  type RequisitionLogRow,
} from "../data/requisitionReportFigma";
import DiagnosticsTablePagination from "../../components/DiagnosticsTablePagination";
import { getTotalPages } from "@/pages/nurse/lib/pagination";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const PAGE_SIZE = 6;

function formatNameMobileNo(row: RequisitionLogRow): string {
  if (row.patientType === "Department") {
    return row.name;
  }
  const genderPart = row.gender ? ` | ${row.gender}` : "";
  return `${row.name} ${row.phoneNumber}${genderPart}`;
}

function RequisitionViewContent({ row }: { row: RequisitionLogRow }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#573FD1]/20 bg-purple-50/50 px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-600">{row.dateTime}</p>
      </div>

      <dl className="space-y-3 rounded-lg border border-gray-200 p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Name / Mobile No</dt>
          <dd className="text-right font-medium text-gray-900">
            {formatNameMobileNo(row)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Patient Type</dt>
          <dd className="font-medium text-gray-900">{row.patientType}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Amount</dt>
          <dd className="font-medium text-gray-900">N {row.amount}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Staff</dt>
          <dd className="text-right font-medium text-gray-900">
            {row.staffName}
            <span className="block text-xs font-normal text-gray-500">
              {row.staffPhone}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function RequisitionReportList() {
  const tableRef = useRef<HTMLTableElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: REQUISITION_DEFAULT_RANGE.startDate,
    endDate: REQUISITION_DEFAULT_RANGE.endDate,
  });
  const [tempRange, setTempRange] = useState([
    {
      startDate: REQUISITION_DEFAULT_RANGE.startDate,
      endDate: REQUISITION_DEFAULT_RANGE.endDate,
      key: "selection",
    },
  ]);
  const [selectedRow, setSelectedRow] = useState<RequisitionLogRow | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return REQUISITION_LOG_ROWS.filter((row) => {
      return (
        row.name.toLowerCase().includes(q) ||
        row.phoneNumber.includes(q) ||
        row.patientType.toLowerCase().includes(q) ||
        row.amount.includes(q) ||
        row.staffName.toLowerCase().includes(q) ||
        row.staffPhone.includes(q) ||
        row.dateTime.toLowerCase().includes(q)
      );
    });
  }, [searchTerm]);

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

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (!selection?.startDate || !selection.endDate) return;
    setTempRange([
      {
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: "selection",
      },
    ]);
  };

  const applyCalendarRange = () => {
    const selection = tempRange[0];
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
    setCalendarOpen(false);
  };

  return (
    <>
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-gray-800">(Requisition) Report</h1>

        <div className="flex shrink-0 items-center gap-3">
          <div className="relative" ref={calendarRef}>
            <button
              type="button"
              onClick={() => setCalendarOpen((open) => !open)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Calendar
            </button>

            {calendarOpen ? (
              <div className="absolute right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
                <DateRange
                  ranges={tempRange}
                  onChange={handleRangeChange}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  direction="horizontal"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarOpen(false)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={applyCalendarRange}
                    className="rounded-md bg-[#573FD1] px-3 py-1.5 text-sm font-medium text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <RequisitionDownloadButton
            reportTitle="Requisition Report"
            tableRef={tableRef}
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-gray-900">Requisition Logs</h2>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="h-10 w-full max-w-md rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
        />
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Date Time
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Name Mobile No
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Patient Type
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Amount
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Action
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">Staff</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3">{row.id}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.dateTime}
                  </td>
                  <td className="px-4 py-3">{formatNameMobileNo(row)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.patientType}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.amount}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRow(row);
                        setViewOpen(true);
                      }}
                      className="text-sm font-semibold text-green-600 underline hover:text-green-700"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div>{row.staffName}</div>
                    <div className="text-xs text-gray-500">{row.staffPhone}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
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
      onClose={() => {
        setViewOpen(false);
        setSelectedRow(null);
      }}
      title="Requisition Details"
      subtitle={selectedRow?.name}
      hasResult={Boolean(selectedRow)}
    >
      {selectedRow ? <RequisitionViewContent row={selectedRow} /> : null}
    </MedicalRemarkViewPanel>
    </>
  );
}
