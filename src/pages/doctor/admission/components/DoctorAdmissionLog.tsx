import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LogSearchBar from "@/pages/nurse/shared/components/LogSearchBar";
import AdmissionActionMenu from "@/pages/nurse/patient-management/admission/components/AdmissionActionMenu";
import AdmissionPreviewPanel from "@/pages/nurse/patient-management/admission/components/AdmissionPreviewPanel";
import DoctorAssignPatientToWardModal from "./DoctorAssignPatientToWardModal";
import AssignWardSuccessModal from "@/pages/nurse/patient-management/admission/components/AssignWardSuccessModal";
import DoctorTakeActionModal from "./DoctorTakeActionModal";
import DoctorTakeActionSuccessModal from "./DoctorTakeActionSuccessModal";
import { getTakeActionSuccessMessage } from "@/pages/nurse/patient-management/admission/data/takeActionOptions";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { getTotalPages } from "@/pages/nurse/shared/lib/pagination";
import type { AdmissionRecord } from "@/pages/nurse/patient-management/admission/data/mockAdmissions";
import { usePatientManagement } from "@/pages/nurse/shared/context/PatientManagementContext";

import { getPatientTypeClass } from "@/pages/nurse/shared/lib/patientTypeStyles";

const PAGE_SIZE = 9;

type LocationPatient = {
  patientId?: string;
  firstName?: string;
  lastName?: string;
};

const DoctorAdmissionLog = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { admissions, assignPatientToWard, dischargeFromAdmission } =
    usePatientManagement();
  const linkedPatient = location.state?.patient as LocationPatient | undefined;
  const [searchTerm, setSearchTerm] = useState(
    () => linkedPatient?.patientId ?? ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(1);
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const [previewPatient, setPreviewPatient] = useState<AdmissionRecord | null>(
    null
  );
  const [assignPatient, setAssignPatient] = useState<AdmissionRecord | null>(
    null
  );
  const [takeActionPatient, setTakeActionPatient] =
    useState<AdmissionRecord | null>(null);
  const [assignSuccess, setAssignSuccess] = useState<{
    patientName: string;
    wardName: string;
    assignedBy: string;
  } | null>(null);
  const [takeActionSuccess, setTakeActionSuccess] = useState<{
    patientName: string;
    message: string;
  } | null>(null);

  const isAdmissionOverlayOpen =
    assignPatient !== null ||
    takeActionPatient !== null ||
    takeActionSuccess !== null ||
    assignSuccess !== null;

  useEffect(() => {
    if (linkedPatient?.patientId) {
      setSearchTerm(linkedPatient.patientId);
      const match = admissions.find(
        (row) => row.patientId === linkedPatient.patientId
      );
      if (match) {
        setSelectedRowId(match.id);
      }
    }
  }, [linkedPatient?.patientId, admissions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = admissions.filter((row) => {
    const q = searchTerm.toLowerCase();
    return (
      row.name.toLowerCase().includes(q) ||
      row.patientId.toLowerCase().includes(q) ||
      row.phoneNumber.includes(q) ||
      row.ward.toLowerCase().includes(q) ||
      row.patientType.toLowerCase().includes(q) ||
      row.admittedBy.toLowerCase().includes(q)
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

  const performedBy = user?.fullName ?? "Unknown User";

  const handleAssignConfirm = (wardName: string) => {
    if (!assignPatient) return;
    assignPatientToWard(assignPatient, wardName, performedBy);
    setAssignSuccess({
      patientName: assignPatient.name,
      wardName,
      assignedBy: performedBy,
    });
    setAssignPatient(null);
  };

  const handleTakeActionConfirm = (actionId: string) => {
    if (!takeActionPatient) return;
    setTakeActionSuccess({
      patientName: takeActionPatient.name,
      message: getTakeActionSuccessMessage(actionId),
    });
    dischargeFromAdmission(takeActionPatient, actionId, performedBy);
    setTakeActionPatient(null);
    setOpenActionMenuId(null);
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <h1 className="shrink-0 text-xl font-bold text-gray-800">Admission</h1>
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
              <th className="whitespace-nowrap px-4 py-2 font-medium">WARD</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                ADM. INFO
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                ADMITTED BY
              </th>
              <th className="px-4 py-2 font-medium" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
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
                  <td className="whitespace-nowrap px-4 py-3">{row.ward}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button
                      type="button"
                      className="text-sm font-medium text-[#2563eb] hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewPatient(row);
                        setOpenActionMenuId(null);
                      }}
                    >
                      Preview
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.admittedBy}
                  </td>
                  <td className="relative whitespace-nowrap px-4 py-3 text-right">
                    <div
                      ref={
                        openActionMenuId === row.id ? actionMenuRef : null
                      }
                      className="relative inline-block"
                    >
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Row actions"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionMenuId((prev) =>
                            prev === row.id ? null : row.id
                          );
                        }}
                      >
                        <HiOutlineDotsVertical size={20} />
                      </button>
                      {openActionMenuId === row.id &&
                        !isAdmissionOverlayOpen && (
                          <AdmissionActionMenu
                            onAssignToWard={() => {
                              setAssignPatient(row);
                              setOpenActionMenuId(null);
                            }}
                            onTakeAction={() => {
                              setTakeActionPatient(row);
                              setOpenActionMenuId(null);
                            }}
                          />
                        )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
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

      {previewPatient && (
        <AdmissionPreviewPanel
          patient={previewPatient}
          open={Boolean(previewPatient)}
          onClose={() => setPreviewPatient(null)}
        />
      )}

      {assignPatient && (
        <DoctorAssignPatientToWardModal
          patient={assignPatient}
          open={Boolean(assignPatient)}
          onClose={() => setAssignPatient(null)}
          onConfirm={handleAssignConfirm}
        />
      )}

      {assignSuccess && (
        <AssignWardSuccessModal
          patientName={assignSuccess.patientName}
          wardName={assignSuccess.wardName}
          assignedBy={assignSuccess.assignedBy}
          open={Boolean(assignSuccess)}
          onDismiss={() => setAssignSuccess(null)}
        />
      )}

      {takeActionPatient && (
        <DoctorTakeActionModal
          patient={takeActionPatient}
          open={Boolean(takeActionPatient)}
          onClose={() => setTakeActionPatient(null)}
          onConfirm={handleTakeActionConfirm}
        />
      )}

      {takeActionSuccess && (
        <DoctorTakeActionSuccessModal
          patientName={takeActionSuccess.patientName}
          message={takeActionSuccess.message}
          open={Boolean(takeActionSuccess)}
          onDismiss={() => setTakeActionSuccess(null)}
        />
      )}
    </div>
  );
};

export default DoctorAdmissionLog;
