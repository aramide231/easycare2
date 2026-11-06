import { useMemo, useRef, useState } from "react";
import ExportButton from "@doctor-shared/components/ExportButton";
import LogSearchBar from "@doctor-shared/components/LogSearchBar";
import TablePagination from "@doctor-shared/components/TablePagination";
import { getTotalPages } from "@doctor-shared/lib/pagination";
import { getPatientTypeClass } from "@doctor-shared/lib/patientTypeStyles";
import ReportDateRangeFilter from "@/pages/doctor/reports/components/ReportDateRangeFilter";
import {
  DEFAULT_REPORT_DATE_RANGE,
  isDateWithinRange,
  parseReportDate,
  type ReportDateRange,
} from "@/pages/doctor/reports/lib/reportDateRange";

const PAGE_SIZE = 50;

type PatientType = "COMPANY" | "PRIVATE" | "HMO";

const BASE_PATIENTS = [
  {
    name: "Abiola Adebayo",
    patientId: "P-2025001",
    phoneNumber: "09012345678",
    lastSeen: "15-Feb-2025",
    time: "10:25 AM",
    gender: "F",
    age: 31,
    patientType: "COMPANY" as PatientType,
    sendersName: "Bayo Hammed",
    receiversName: "Pelumi Adebayo",
    method: "NATURAL",
    followUp: "25-Mar-2025",
  },
  {
    name: "Chinonso Eze",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    lastSeen: "18-Feb-2025",
    time: "11:10 AM",
    gender: "F",
    age: 28,
    patientType: "PRIVATE" as PatientType,
    sendersName: "Bayo Hammed",
    receiversName: "Pelumi Adebayo",
    method: "BARRIER",
    followUp: "28-Mar-2025",
  },
  {
    name: "Damilola Ogunleye",
    patientId: "P-2025003",
    phoneNumber: "07034567890",
    lastSeen: "20-Feb-2025",
    time: "09:40 AM",
    gender: "F",
    age: 29,
    patientType: "COMPANY" as PatientType,
    sendersName: "Bayo Hammed",
    receiversName: "Pelumi Adebayo",
    method: "HORMONAL",
    followUp: "30-Mar-2025",
  },
  {
    name: "Ifeoma Okeke",
    patientId: "P-2025004",
    phoneNumber: "08145678901",
    lastSeen: "22-Feb-2025",
    time: "02:15 PM",
    gender: "F",
    age: 33,
    patientType: "HMO" as PatientType,
    sendersName: "Bayo Hammed",
    receiversName: "Pelumi Adebayo",
    method: "LARCs",
    followUp: "02-Apr-2025",
  },
];

const FAMILY_PLANNING_SEED = Array.from({ length: 120 }, (_, i) => {
  const base = BASE_PATIENTS[i % BASE_PATIENTS.length];
  return {
    ...base,
    id: i + 1,
    patientId: `P-${String(2025001 + i)}`,
  };
});

const getMethodTypeClass = (type: string): string => {
  switch (type) {
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
      return "bg-[#fff1e6] text-[#fa7401] border border-[#fa7401]";
  }
};

const isValidPatientType = (type: string): type is PatientType =>
  ["COMPANY", "PRIVATE", "HMO"].includes(type);

const FamilyReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<ReportDateRange>(
    DEFAULT_REPORT_DATE_RANGE
  );
  const tableRef = useRef<HTMLTableElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAMILY_PLANNING_SEED.filter((patient) => {
      const matchesSearch =
        !q ||
        patient.name.toLowerCase().includes(q) ||
        patient.patientId.toLowerCase().includes(q) ||
        patient.phoneNumber.toLowerCase().includes(q);
      const matchesDate = isDateWithinRange(
        parseReportDate(patient.followUp),
        dateRange
      );
      return matchesSearch && matchesDate;
    });
  }, [search, dateRange]);

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
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
            className="sm:max-w-xl"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
          <ReportDateRangeFilter
            onRangeApply={(range) => {
              setDateRange(range);
              setCurrentPage(1);
            }}
          />
          <ExportButton
            reportTitle="Export Family Planning Report"
            tableRef={tableRef}
          />
        </div>
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table ref={tableRef} className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">SN</th>
              <th className="px-4 py-2 font-medium">PATIENT NAME</th>
              <th className="px-4 py-2 font-medium">GENDER</th>
              <th className="px-4 py-2 font-medium">AGE</th>
              <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
              <th className="px-4 py-2 font-medium">METHOD</th>
              <th className="px-4 py-2 font-medium">FOLLOW UP</th>
              <th className="px-4 py-2 font-medium">ATTENDANT (DOCTOR)</th>
              <th className="px-4 py-2 font-medium">ATTENDANT (NURSE)</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((patient, index) => (
                <tr
                  key={patient.id}
                  className="border-b border-[#D4D4D4] bg-white"
                >
                  <td className="px-4 py-3 font-medium">{start + index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {patient.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {patient.patientId} | {patient.phoneNumber}
                    </div>
                  </td>
                  <td className="px-4 py-3">{patient.gender}</td>
                  <td className="px-4 py-3">{patient.age}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isValidPatientType(patient.patientType)
                          ? getPatientTypeClass(patient.patientType)
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {patient.patientType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-3 py-1.5 text-xs font-bold ${getMethodTypeClass(
                        patient.method
                      )}`}
                    >
                      {patient.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>{patient.followUp}</div>
                    <div className="text-xs text-[#573FD1]">{patient.time}</div>
                  </td>
                  <td className="px-4 py-3">{patient.sendersName}</td>
                  <td className="px-4 py-3">{patient.receiversName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                >
                  No family planning records found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default FamilyReport;
