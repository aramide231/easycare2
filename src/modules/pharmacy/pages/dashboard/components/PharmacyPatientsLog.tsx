import { useEffect, useMemo, useState } from "react";
import LogSearchBar from "@pharmacy/shared/components/LogSearchBar";
import PharmacyTablePagination from "../../components/PharmacyTablePagination";
import MedicalRemarkViewPanel from "@/pages/doctor/patientProfile/components/category/MedicalRemarkViewPanel";
import {
  isDateWithinRange,
  type DateRangeValue,
} from "@doctor-shared/lib/dateTime";
import {
  incomingBadgeClass,
  PATIENTS_LOG_ROWS,
  type PatientCategory,
  type PharmacyPatientsLogRow,
} from "../../data/mockPharmacy";

const PAGE_SIZE = 7;

function parsePharmacyDate(value: string): Date | null {
  const parts = value.split("/");
  if (parts.length !== 3) return null;
  const day = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const year = Number(parts[2]);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return null;
  }
  return new Date(year, month, day);
}

type Props = {
  selectedId?: number | null;
  onSelectRow?: (row: PharmacyPatientsLogRow) => void;
  patientCategoryFilter?: PatientCategory;
  dateRange?: DateRangeValue | null;
};

function PatientLogViewContent({ row }: { row: PharmacyPatientsLogRow }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#573FD1]/20 bg-purple-50/50 px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">{row.regName}</p>
        <p className="text-xs text-gray-600">
          {row.date} {row.time}
        </p>
      </div>

      <dl className="space-y-3 rounded-lg border border-gray-200 p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Incoming</dt>
          <dd>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${incomingBadgeClass(row.incoming)}`}
            >
              <span aria-hidden>•</span>
              {row.incoming}
            </span>
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Patient ID</dt>
          <dd className="font-medium text-gray-900">{row.patientId}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Phone</dt>
          <dd className="font-medium text-gray-900">{row.phoneNumber}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Gender</dt>
          <dd className="font-medium text-gray-900">{row.gender}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Age</dt>
          <dd className="font-medium text-gray-900">{row.age}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Staff Name</dt>
          <dd className="font-medium text-gray-900">{row.staffName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-500">Patient Type</dt>
          <dd className="font-medium text-gray-900">{row.treatmentType}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function PharmacyPatientsLog({
  selectedId = null,
  onSelectRow,
  patientCategoryFilter,
  dateRange = null,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewRow, setViewRow] = useState<PharmacyPatientsLogRow | null>(null);

  const filtered = PATIENTS_LOG_ROWS.filter((row) => {
    if (
      patientCategoryFilter &&
      row.patientCategory !== patientCategoryFilter
    ) {
      return false;
    }

    if (dateRange) {
      const rowDate = parsePharmacyDate(row.date);
      if (!rowDate || !isDateWithinRange(rowDate, dateRange)) {
        return false;
      }
    }

    const q = searchTerm.toLowerCase();
    return (
      row.regName.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.phoneNumber.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, patientCategoryFilter, dateRange]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const totalPages = 70;

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openRowView = (row: PharmacyPatientsLogRow) => {
    onSelectRow?.(row);
    setViewRow(row);
    setViewOpen(true);
  };

  return (
    <>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:space-x-0">
          <h1 className="text-xl font-bold text-gray-800 md:mr-2">
            Patients Log
          </h1>
          <LogSearchBar
            placeholder="Search with Surname, Patient ID or Phone number"
            value={searchTerm}
            onChange={setSearchTerm}
            className="md:w-1/2"
          />
        </div>

        <div className="overflow-x-auto border-t border-gray-200 pt-4">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Incoming
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Patient Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Date | Time
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Gender
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">Age</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Staff Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => (
                  <tr
                    key={row.id}
                    onClick={() => onSelectRow?.(row)}
                    className={`cursor-pointer border-b border-[#D4D4D4] ${
                      selectedId === row.id
                        ? "bg-gray-100"
                        : index % 2 === 0
                          ? "bg-white"
                          : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-3">{row.id}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${incomingBadgeClass(row.incoming)}`}
                      >
                        <span aria-hidden>•</span>
                        {row.incoming}
                      </span>
                    </td>
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
                    <td className="whitespace-nowrap px-4 py-3">{row.gender}</td>
                    <td className="whitespace-nowrap px-4 py-3">{row.age}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {row.staffName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <button
                        type="button"
                        className="text-sm font-semibold text-[#573FD1] underline hover:text-[#4a35b8]"
                        onClick={(event) => {
                          event.stopPropagation();
                          openRowView(row);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PharmacyTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <MedicalRemarkViewPanel
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setViewRow(null);
        }}
        title={viewRow?.incoming === "REQUEST" ? "Request Details" : "Medication Details"}
        subtitle={viewRow?.regName}
        hasResult={Boolean(viewRow)}
      >
        {viewRow ? <PatientLogViewContent row={viewRow} /> : null}
      </MedicalRemarkViewPanel>
    </>
  );
}
