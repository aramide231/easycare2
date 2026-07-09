import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { getTotalPages } from "@/pages/nurse/shared/lib/pagination";
import { getPatientTypeClass } from "@/pages/nurse/shared/lib/patientTypeStyles";
import type { DischargedPatientRecord } from "@/pages/nurse/patient-management/discharge/data/mockDischargedPatients";
import { usePatientManagement } from "@/pages/nurse/shared/context/PatientManagementContext";
import {
  getRemarkClass,
  getRemarkDotClass,
} from "@/pages/nurse/patient-management/discharge/lib/remarkStyles";
import DischargeActionMenu from "@/pages/nurse/patient-management/discharge/components/DischargeActionMenu";

const PAGE_SIZE = 9;

function formatRemarkLabel(remark: DischargedPatientRecord["remark"]) {
  return remark === "Referred" ? "Referral" : remark;
}

const DoctorDischargedPatientLog = () => {
  const { user } = useAuth();
  const { dischargedPatients, readmitPatient } = usePatientManagement();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = dischargedPatients.filter((row) => {
    const q = searchTerm.toLowerCase();
    const remarkLabel = formatRemarkLabel(row.remark).toLowerCase();
    return (
      row.name.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.phoneNumber.includes(q) ||
      row.remark.toLowerCase().includes(q) ||
      remarkLabel.includes(q) ||
      row.patientType.toLowerCase().includes(q) ||
      row.dischargedBy.toLowerCase().includes(q)
    );
  });

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleReAdmit = (row: DischargedPatientRecord) => {
    readmitPatient(row, user?.fullName ?? "Unknown User");
    setOpenMenuId(null);
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <h1 className="shrink-0 text-xl font-bold text-gray-800">
          Discharged Patient
        </h1>
        <LogSearchBar
          placeholder="Search with patient name, ID or ward"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className="overflow-x-auto border-t border-gray-200 pt-4">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">S/N</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">NAME</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                GENDER
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                PATIENT TYPE
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">AGE</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                DATE OF ADM.
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                REMARK
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                DISCHARGE TIME
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                NO OF DAYS
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                DISCHARGED BY
              </th>
              <th className="px-4 py-2 font-medium" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {dischargedPatients.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="bg-gray-50 py-12 text-center text-sm text-gray-500"
                >
                  No discharged patients yet. Discharge a patient from the
                  Admission page to see them here.
                </td>
              </tr>
            ) : paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#D4D4D4] ${
                    selectedRowId === row.id ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => setSelectedRowId(row.id)}
                >
                  <td className="whitespace-nowrap px-4 py-3">
                    {(currentPage - 1) * PAGE_SIZE + rowIndex + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {row.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {row.patientId} | {row.phoneNumber}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.gender}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getPatientTypeClass(
                        row.patientType
                      )}`}
                    >
                      {row.patientType}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{row.age}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>{row.dateOfAdmission}</span>
                      <span className="text-xs text-gray-500">
                        {row.timeOfAdmission}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${getRemarkClass(
                        row.remark
                      )}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${getRemarkDotClass(
                          row.remark
                        )}`}
                      />
                      {formatRemarkLabel(row.remark)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>{row.dischargeDate}</span>
                      <span className="text-xs text-gray-500">
                        {row.dischargeTime}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.noOfDays}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.dischargedBy}
                  </td>
                  <td className="relative whitespace-nowrap px-4 py-3 text-right">
                    <div
                      ref={openMenuId === row.id ? menuRef : null}
                      className="relative inline-block"
                    >
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Row actions"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId((prev) =>
                            prev === row.id ? null : row.id
                          );
                        }}
                      >
                        <HiOutlineDotsVertical size={20} />
                      </button>
                      {openMenuId === row.id && (
                        <DischargeActionMenu
                          onReAdmit={() => handleReAdmit(row)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="bg-gray-50 py-8 text-center text-sm text-gray-500"
                >
                  No results found for &quot;{searchTerm}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DoctorDischargedPatientLog;
