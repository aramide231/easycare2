import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { calculateStayDurationBetween } from "@/lib/dateTime";
import LogSearchBar from "@hmo/shared/components/LogSearchBar";
import TablePagination from "@hmo/shared/components/TablePagination";
import DischargeActionMenu from "@hmo/vendor/discharge/components/DischargeActionMenu";
import {
  getRemarkClass,
  getRemarkDotClass,
} from "@hmo/vendor/discharge/lib/remarkStyles";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import {
  buildMockHmoDischargedPatients,
  type HmoDischargedPatientRecord,
} from "../data/mockDischargedPatients";

const DischargedPatientLog = () => {
  const [patients, setPatients] = useState<HmoDischargedPatientRecord[]>(() =>
    buildMockHmoDischargedPatients(),
  );
  const [search, setSearch] = useState("");
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

  const filteredPatients = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return patients;

    return patients.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.patientId.toLowerCase().includes(q) ||
        row.phoneNumber.includes(q) ||
        row.remark.toLowerCase().includes(q) ||
        row.patientType.toLowerCase().includes(q) ||
        row.dischargedBy.toLowerCase().includes(q),
    );
  }, [patients, search]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredPatients, HMO_PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

  const handleReAdmit = (row: HmoDischargedPatientRecord) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== row.id));
    setOpenMenuId(null);
    if (selectedRowId === row.id) {
      setSelectedRowId(null);
    }
  };

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 border-b border-[#D4D4D4] pb-4 sm:flex-row sm:items-center">
        <h1 className="shrink-0 text-base font-semibold text-gray-900">
          Discharge
        </h1>
        <LogSearchBar
          placeholder="Search with patient name, ID or ward"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] text-left text-sm">
          <thead className="text-xs font-medium uppercase tracking-wide text-[#A5A5A5]">
            <tr>
              <th className="px-3 py-2">SN</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Gender</th>
              <th className="px-3 py-2">Patient Type</th>
              <th className="px-3 py-2">Age</th>
              <th className="px-3 py-2">Date of Adm.</th>
              <th className="px-3 py-2">Remark</th>
              <th className="px-3 py-2">Dshrg Time</th>
              <th className="px-3 py-2">No of Days</th>
              <th className="px-3 py-2">Discharged By</th>
              <th className="px-3 py-2 text-center" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No discharged patients yet. Discharge a patient from the
                  Admission page to see them here.
                </td>
              </tr>
            ) : paginatedItems.length > 0 ? (
              paginatedItems.map((row, index) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer border-b border-[#D4D4D4] transition hover:bg-gray-50 ${
                    selectedRowId === row.id ? "bg-[#EEECFA]/60" : "bg-white"
                  }`}
                  onClick={() => setSelectedRowId(row.id)}
                >
                  <td className="px-3 py-3 font-medium text-gray-900">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium text-gray-900">{row.name}</div>
                    <div className="text-xs text-gray-500">
                      {row.patientId} | {row.phoneNumber}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-800">{row.gender}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-lg border px-2 py-1 text-xs font-medium ${getPatientTypeClass(row.patientType)}`}
                    >
                      {row.patientType}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-800">{row.age}</td>
                  <td className="px-3 py-3">
                    <div>{row.dateOfAdmission}</div>
                    <div className="text-xs text-gray-500">
                      {row.timeOfAdmission}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${getRemarkClass(row.remark)}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${getRemarkDotClass(row.remark)}`}
                      />
                      {row.remark}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div>{row.dischargeDate}</div>
                    <div className="text-xs text-gray-500">
                      {row.dischargeTime}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-800">
                    {calculateStayDurationBetween(
                      row.dateOfAdmission,
                      row.timeOfAdmission,
                      row.dischargeDate,
                      row.dischargeTime,
                    )}
                  </td>
                  <td className="px-3 py-3 text-gray-800">
                    {row.dischargedBy}
                  </td>
                  <td className="relative px-3 py-3 text-center">
                    <div
                      ref={openMenuId === row.id ? menuRef : null}
                      className="relative inline-block"
                    >
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Row actions"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenMenuId((prev) =>
                            prev === row.id ? null : row.id,
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
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No discharged patients found.
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
  );
};

export default DischargedPatientLog;
