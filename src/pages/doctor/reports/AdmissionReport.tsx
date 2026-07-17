import { useState } from "react";
import LogSearchBar from "@doctor-shared/components/LogSearchBar";
import TablePagination from "@doctor-shared/components/TablePagination";
import { getTotalPages } from "@doctor-shared/lib/pagination";
import { usePatientManagement } from "@doctor-shared/context/PatientManagementContext";

const PAGE_SIZE = 20;

const AdmissionReport = () => {
  const { admissionReports } = usePatientManagement();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = admissionReports.filter((row) => {
    const q = searchTerm.toLowerCase();
    return (
      row.patientName.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.action.toLowerCase().includes(q) ||
      row.performedBy.toLowerCase().includes(q) ||
      (row.ward?.toLowerCase().includes(q) ?? false)
    );
  });

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <h1 className="shrink-0 text-xl font-bold text-gray-800">
          Admission Report
        </h1>
        <LogSearchBar
          placeholder="Search by patient name, ID, ward or staff"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table className="min-w-full text-left text-sm">
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
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <tr key={row.id} className="border-b border-[#D4D4D4]">
                  <td className="px-4 py-3">{start + index + 1}</td>
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
                  {admissionReports.length === 0
                    ? "No admission activities recorded yet. Assign a ward or re-admit a patient to see entries here."
                    : `No results found for "${searchTerm}"`}
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

export default AdmissionReport;
