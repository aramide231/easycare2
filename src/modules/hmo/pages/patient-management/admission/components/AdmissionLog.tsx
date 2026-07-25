import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import LogSearchBar from "@hmo/shared/components/LogSearchBar";
import TablePagination from "@hmo/shared/components/TablePagination";
import { HMO_PAGE_SIZE } from "@hmo/pages/shared/lib/pagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import AdmissionActionMenu from "@hmo/vendor/admission/components/AdmissionActionMenu";
import AdmissionPreviewPanel from "@hmo/vendor/admission/components/AdmissionPreviewPanel";
import TakeActionModal from "@hmo/vendor/admission/components/TakeActionModal";
import TakeActionSuccessModal from "@hmo/vendor/admission/components/TakeActionSuccessModal";
import AssignWardSuccessModal from "@hmo/vendor/admission/components/AssignWardSuccessModal";
import { getTakeActionSuccessMessage } from "@hmo/vendor/admission/data/takeActionOptions";
import AssignPatientToWardModal from "./AssignPatientToWardModal";
import {
  buildMockHmoAdmissions,
  type HmoAdmissionRecord,
} from "../data/mockAdmissions";

const AdmissionLog = () => {
  const { user } = useAuth();
  const [admissions, setAdmissions] = useState<HmoAdmissionRecord[]>(() =>
    buildMockHmoAdmissions(),
  );
  const [search, setSearch] = useState("");
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const [previewPatient, setPreviewPatient] =
    useState<HmoAdmissionRecord | null>(null);
  const [assignPatient, setAssignPatient] =
    useState<HmoAdmissionRecord | null>(null);
  const [takeActionPatient, setTakeActionPatient] =
    useState<HmoAdmissionRecord | null>(null);
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

  const filteredAdmissions = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return admissions;

    return admissions.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.patientId.toLowerCase().includes(q) ||
        row.phoneNumber.includes(q) ||
        row.ward.toLowerCase().includes(q) ||
        row.patientType.toLowerCase().includes(q) ||
        row.admittedBy.toLowerCase().includes(q),
    );
  }, [admissions, search]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems, pageSize } =
    usePaginatedList(filteredAdmissions, HMO_PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

  const performedBy = user?.fullName ?? "Unknown User";

  const handleAssignConfirm = (wardName: string) => {
    if (!assignPatient) return;

    setAdmissions((prev) =>
      prev.map((row) =>
        row.id === assignPatient.id ? { ...row, ward: wardName } : row,
      ),
    );
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
    setAdmissions((prev) =>
      prev.filter((row) => row.id !== takeActionPatient.id),
    );
    setTakeActionPatient(null);
    setOpenActionMenuId(null);
    if (selectedRowId === takeActionPatient.id) {
      setSelectedRowId(null);
    }
  };

  return (
    <div className="rounded-[15px] border border-[#D4D4D4] bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 border-b border-[#D4D4D4] pb-4 sm:flex-row sm:items-center">
        <h1 className="shrink-0 text-base font-semibold text-gray-900">
          Admission
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
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="text-xs font-medium uppercase tracking-wide text-[#A5A5A5]">
            <tr>
              <th className="px-3 py-2">SN</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Gender</th>
              <th className="px-3 py-2">Patient Type</th>
              <th className="px-3 py-2">Age</th>
              <th className="px-3 py-2">Date of Adm.</th>
              <th className="px-3 py-2">Ward</th>
              <th className="px-3 py-2">Adm. Info</th>
              <th className="px-3 py-2">Admitted By</th>
              <th className="px-3 py-2 text-center" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
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
                  <td className="px-3 py-3 text-gray-800">{row.ward}</td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      className="text-sm font-medium text-[#2563eb] hover:underline"
                      onClick={(event) => {
                        event.stopPropagation();
                        setPreviewPatient(row);
                        setOpenActionMenuId(null);
                      }}
                    >
                      Review
                    </button>
                  </td>
                  <td className="px-3 py-3 text-gray-800">{row.admittedBy}</td>
                  <td className="relative px-3 py-3 text-center">
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
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenActionMenuId((prev) =>
                            prev === row.id ? null : row.id,
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
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No admissions found.
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

      {previewPatient && (
        <AdmissionPreviewPanel
          patient={previewPatient}
          open={Boolean(previewPatient)}
          onClose={() => setPreviewPatient(null)}
        />
      )}

      {assignPatient && (
        <AssignPatientToWardModal
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
        <TakeActionModal
          patient={takeActionPatient}
          open={Boolean(takeActionPatient)}
          onClose={() => setTakeActionPatient(null)}
          onConfirm={handleTakeActionConfirm}
        />
      )}

      {takeActionSuccess && (
        <TakeActionSuccessModal
          patientName={takeActionSuccess.patientName}
          message={takeActionSuccess.message}
          open={Boolean(takeActionSuccess)}
          onDismiss={() => setTakeActionSuccess(null)}
        />
      )}
    </div>
  );
};

export default AdmissionLog;
