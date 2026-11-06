import { useEffect, useMemo, useState } from "react";
import LogSearchBar from "@/pages/nurse/components/LogSearchBar";
import DiagnosticsTablePagination from "../../components/DiagnosticsTablePagination";
import { getTotalPages } from "@/pages/nurse/lib/pagination";
import {
  PATIENTS_LOG_ROWS,
  type DiagnosticsPatientsLogRow,
  type PatientCategory,
} from "../../data/mockDiagnostics";
import { treatmentTypeBadgeClass } from "../../lib/diagnosticsBadgeStyles";

const PAGE_SIZE = 7;

type Props = {
  selectedId?: number | null;
  onSelectRow?: (row: DiagnosticsPatientsLogRow) => void;
  patientCategoryFilter?: PatientCategory;
};

export default function DashboardPatientsLog({
  selectedId = null,
  onSelectRow,
  patientCategoryFilter,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = PATIENTS_LOG_ROWS.filter((row) => {
    if (
      patientCategoryFilter &&
      row.patientCategory !== patientCategoryFilter
    ) {
      return false;
    }

    const q = searchTerm.toLowerCase();
    return (
      row.regName.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.phoneNumber.toLowerCase().includes(q) ||
      row.invName.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, patientCategoryFilter]);

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

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:space-x-0">
        <h1 className="text-xl font-bold text-gray-800 md:mr-2">Patients Log</h1>
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
                Reg. Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Date | Time
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">Gender</th>
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
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{row.regName}</div>
                    <div className="text-xs text-gray-500">
                      {row.patientId} | {row.phoneNumber}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{row.date}</div>
                    <div className="text-xs text-gray-500">{row.time}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.gender}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${treatmentTypeBadgeClass(row.treatmentType)}`}
                    >
                      {row.treatmentType}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.age}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[#573FD1] underline hover:text-[#4a35b8]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {row.invName}
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.invAmount}
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

      <DiagnosticsTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
