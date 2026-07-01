import { useMemo, useRef } from "react";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import { PAGE_SIZE } from "@/constant/pagination";
import { getPatientTypeClass } from "@/lib/badgeStyles";
import { buildMockPatients } from "@/pages/nurse/dashboard/data/mockPatients";

type ReminderStatus = "PENDING" | "TRIGGERED";

type ReminderRow = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  lastSeen: string;
  time: string;
  patientType: string;
  status: ReminderStatus;
};

function buildMockReminderRows(): ReminderRow[] {
  return buildMockPatients().slice(0, 32).map((patient, index) => ({
    id: patient.id,
    name: patient.name,
    patientId: patient.patientId,
    phoneNumber: patient.phoneNumber,
    lastSeen: patient.lastSeen,
    time: patient.time,
    patientType: patient.patientType,
    status: index % 2 === 0 ? "PENDING" : "TRIGGERED",
  }));
}

const getPatientStatus = (status: ReminderStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-[#fff1e6] text-[#fa7401] border-[#fa7401]";
    case "TRIGGERED":
      return "bg-[#e6faee] text-[#33d374] border-[#33d374]";
    default:
      return "bg-[#fff1e6] text-[#fa7401] border-[#fa7401]";
  }
};

const ViewReminder = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const patients = useMemo(() => buildMockReminderRows(), []);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(patients);

  return (
    <>
      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">Patient Name</th>
                <th className="px-4 py-2 font-medium">Reminder Time</th>
                <th className="px-4 py-2 font-medium">Patient Type</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((patient, index) => (
                <tr
                  key={patient.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-3 font-medium">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-xs text-gray-500">
                      {patient.patientId} | {patient.phoneNumber}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{patient.lastSeen}</div>
                    <div className="text-xs text-blue-600">{patient.time}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-4 py-2 text-xs font-bold ${getPatientTypeClass(patient.patientType)}`}
                    >
                      {patient.patientType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md border px-4 py-2 text-xs font-bold ${getPatientStatus(patient.status)}`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-6"
      />
    </>
  );
};

export default ViewReminder;
