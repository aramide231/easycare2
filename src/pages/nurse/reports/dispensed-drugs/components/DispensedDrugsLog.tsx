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
  buildMockDispensedMedicationRows,
  buildMockDispensedVisitRecords,
  formatDispensedDate,
  formatDispensedTime,
  parseDispensedDate,
  type DispensedVisitRecord,
} from "../data/mockDispensedDrugRecords";
import DispensedMedicationModal from "./DispensedMedicationModal";

type TabKey = "byName" | "byMedication";

const DispensedDrugsLog = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const visitRecords = useMemo(() => buildMockDispensedVisitRecords(), []);
  const medicationRows = useMemo(() => buildMockDispensedMedicationRows(), []);

  const [activeTab, setActiveTab] = useState<TabKey>("byName");
  const [search, setSearch] = useState("");
  const [selectedVisit, setSelectedVisit] = useState<DispensedVisitRecord | null>(
    null,
  );
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => getCurrentMonthRange());

  const filteredVisitRecords = useMemo(() => {
    const q = search.toLowerCase().trim();
    const { startDate, endDate } = dateRange;
    const rangeStart = new Date(startDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(endDate);
    rangeEnd.setHours(23, 59, 59, 999);

    return visitRecords.filter((record) => {
      const recordDate = parseDispensedDate(record.dateTime);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q);
      return inRange && matchesSearch;
    });
  }, [visitRecords, search, dateRange]);

  const filteredMedicationRows = useMemo(() => {
    const q = search.toLowerCase().trim();
    const { startDate, endDate } = dateRange;
    const rangeStart = new Date(startDate);
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(endDate);
    rangeEnd.setHours(23, 59, 59, 999);

    return medicationRows.filter((record) => {
      const recordDate = parseDispensedDate(record.dateTime);
      const inRange = recordDate >= rangeStart && recordDate <= rangeEnd;
      const matchesSearch =
        !q ||
        record.name.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q) ||
        record.medicationName.toLowerCase().includes(q);
      return inRange && matchesSearch;
    });
  }, [medicationRows, search, dateRange]);

  const activeRecords =
    activeTab === "byName" ? filteredVisitRecords : filteredMedicationRows;

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(activeRecords);

  const tabClass = (tab: TabKey) =>
    `rounded-lg px-6 py-2.5 text-sm font-semibold transition ${
      activeTab === tab
        ? "bg-[#573FD1] text-white shadow-sm"
        : "border border-[#573FD1] bg-white text-[#573FD1] hover:bg-purple-50"
    }`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          className={tabClass("byName")}
          onClick={() => {
            setActiveTab("byName");
            setCurrentPage(1);
          }}
        >
          Dispensed By Name
        </button>
        <button
          type="button"
          className={tabClass("byMedication")}
          onClick={() => {
            setActiveTab("byMedication");
            setCurrentPage(1);
          }}
        >
          Dispensed By Medication
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="shrink-0 whitespace-nowrap text-xl font-bold text-gray-800">
            Dispensed Med. Logs
          </h1>
          <LogSearchBar
            placeholder="Search patient name as stored on the database"
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
            reportTitle="Dispensed Med. Logs"
            tableRef={tableRef}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              {activeTab === "byName" ? (
                <tr>
                  <th className="px-4 py-2 font-medium">S/N</th>
                  <th className="px-4 py-2 font-medium">Date/Time</th>
                  <th className="px-4 py-2 font-medium">Name/ID</th>
                  <th className="px-4 py-2 font-medium">Px Type</th>
                  <th className="px-4 py-2 font-medium">Gender</th>
                  <th className="px-4 py-2 font-medium">Age</th>
                  <th className="px-4 py-2 font-medium">Complaints</th>
                  <th className="px-4 py-2 font-medium">Diagnosis</th>
                  <th className="px-4 py-2 font-medium">Medication Name</th>
                  <th className="px-4 py-2 font-medium">Total Med Given (Brands)</th>
                  <th className="px-4 py-2 font-medium">Staff Name</th>
                </tr>
              ) : (
                <tr>
                  <th className="px-4 py-2 font-medium">S/N</th>
                  <th className="px-4 py-2 font-medium">Date/Time</th>
                  <th className="px-4 py-2 font-medium">Name/ID</th>
                  <th className="px-4 py-2 font-medium">Px Type</th>
                  <th className="px-4 py-2 font-medium">Gender</th>
                  <th className="px-4 py-2 font-medium">Age</th>
                  <th className="px-4 py-2 font-medium">Complaints</th>
                  <th className="px-4 py-2 font-medium">Diagnosis</th>
                  <th className="px-4 py-2 font-medium">Medication Name</th>
                  <th className="px-4 py-2 font-medium">Qty Given (pieces)</th>
                  <th className="px-4 py-2 font-medium">Staff Name</th>
                </tr>
              )}
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                activeTab === "byName" ? (
                  (paginatedItems as DispensedVisitRecord[]).map(
                    (record, index) => (
                      <tr
                        key={record.id}
                        className="border-b border-[#D4D4D4] bg-white"
                      >
                        <td className="px-4 py-3 font-medium">
                          {(currentPage - 1) * PAGE_SIZE + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div>{formatDispensedDate(record.date)}</div>
                          <div className="text-xs text-gray-500">
                            {formatDispensedTime(record.date)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{record.name}</div>
                          <div className="text-xs text-gray-500">
                            {record.patientId}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getPatientTypeClass(record.patientType)}`}
                          >
                            {record.patientType}
                          </span>
                        </td>
                        <td className="px-4 py-3">{record.gender}</td>
                        <td className="px-4 py-3">{record.age}</td>
                        <td className="px-4 py-3">{record.complaints}</td>
                        <td className="px-4 py-3">{record.diagnosis}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => setSelectedVisit(record)}
                            className="text-sm font-semibold text-green-600 underline hover:text-green-700"
                          >
                            VIEW
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          {record.medications.length}
                        </td>
                        <td className="px-4 py-3">{record.staffName}</td>
                      </tr>
                    ),
                  )
                ) : (
                  paginatedItems.map((record, index) => (
                    <tr
                      key={record.rowId}
                      className="border-b border-[#D4D4D4] bg-white"
                    >
                      <td className="px-4 py-3 font-medium">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div>{formatDispensedDate(record.date)}</div>
                        <div className="text-xs text-gray-500">
                          {formatDispensedTime(record.date)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{record.name}</div>
                        <div className="text-xs text-gray-500">
                          {record.patientId}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${getPatientTypeClass(record.patientType)}`}
                        >
                          {record.patientType}
                        </span>
                      </td>
                      <td className="px-4 py-3">{record.gender}</td>
                      <td className="px-4 py-3">{record.age}</td>
                      <td className="px-4 py-3">{record.complaints}</td>
                      <td className="px-4 py-3">{record.diagnosis}</td>
                      <td className="px-4 py-3">{record.medicationName}</td>
                      <td className="px-4 py-3">{record.qtyGiven}</td>
                      <td className="px-4 py-3">{record.staffName}</td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td
                    colSpan={11}
                    className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                  >
                    {search
                      ? `No results found for "${search}"`
                      : "No dispensed medication records for the selected date range."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {activeRecords.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-6"
          />
        )}
      </div>

      {selectedVisit && (
        <DispensedMedicationModal
          record={selectedVisit}
          open={Boolean(selectedVisit)}
          onClose={() => setSelectedVisit(null)}
        />
      )}
    </div>
  );
};

export default DispensedDrugsLog;
