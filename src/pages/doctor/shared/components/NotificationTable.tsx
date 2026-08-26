import { useState, useEffect, useMemo } from "react";
import { Trash2 } from "lucide-react";
import emptyNotification from "@doctor-shared/assets/image/empty-notification.png";
import TablePagination from "@doctor-shared/components/TablePagination";
import { getTotalPages } from "@doctor-shared/lib/pagination";
import { useAuth } from "@doctor-shared/context/useAuth";
import {
  buildMockNotifications,
  type NotificationRow,
} from "@doctor-shared/data/mockNotifications";

const PAGE_SIZE = 20;

const NotificationTable: React.FC = () => {
  const { user } = useAuth();
  const canDelete = user?.userRole === "admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<NotificationRow[]>(() =>
    buildMockNotifications()
  );

  const getPatientTypeClass = (type: string) => {
    const typeClasses: Record<string, string> = {
      COMPANY: "bg-blue-100 text-[#573FD1] border border-[#573FD1]",
      PRIVATE: "bg-[#dbd9d9] text-[#103488]  border border-[#103488]",
      HMO: "bg-orange-100 text-[#FA7401] border border-[#FA7401]",
    };
    return typeClasses[type] || "bg-gray-100 text-gray-700";
  };

  const getVisitTypeClass = (type: string) => {
    const visitClasses: Record<string, string> = {
      "GEN. CONSULT": "bg-blue-100 text-[#573FD1] border border-[#573FD1]",
      "ANTE. NATAL": "bg-green-100 text-green-700 border border-[#00C851]",
      "POST NATAL": "bg-[#FDFDFD] text-[#626262] border border-[#626262]",
      CHILDBIRTH: "bg-blue-100 text-blue-700 border border-blue-400",
      "FAMILY PLAN": "bg-orange-100 text-orange-700 border border-orange-400",
    };
    return visitClasses[type] || "bg-gray-100 text-gray-700";
  };

  const handleDelete = (id: number) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(search) ||
      patient.patientId.toLowerCase().includes(search) ||
      patient.phoneNumber.toLowerCase().includes(search) ||
      patient.lastSeen.toLowerCase().includes(search) ||
      patient.time.toLowerCase().includes(search) ||
      patient.gender.toLowerCase().includes(search) ||
      patient.age.toString().includes(search) ||
      patient.patientType.toLowerCase().includes(search) ||
      patient.visitType.toLowerCase().includes(search) ||
      patient.staffName.toLowerCase().includes(search)
    );
  });

  const listToShow = searchTerm ? filteredPatients : patients;
  const totalPages = getTotalPages(listToShow.length, PAGE_SIZE);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return listToShow.slice(start, start + PAGE_SIZE);
  }, [listToShow, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const hasRows = listToShow.length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2 md:mb-0 md:mr-4">
          Notifications
        </h1>
        <input
          type="search"
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/2 p-2.5"
          placeholder="Search for patients"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="border-t border-gray-200 pt-4 overflow-x-auto">
        {hasRows ? (
          <>
            <table className="min-w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-2 font-medium">SN</th>
                  <th className="px-4 py-2 font-medium">INCOMING</th>
                  <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                  <th className="px-4 py-2 font-medium">TIME OF REQUEST</th>
                  <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                  <th className="px-4 py-2 font-medium">SENDER&apos;S NAME</th>
                  {canDelete && <th className="px-4 py-2 font-medium"></th>}
                </tr>
              </thead>

              <tbody>
                {paginatedRows.map((patient, rowIndex) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * PAGE_SIZE + rowIndex + 1}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getVisitTypeClass(
                          patient.visitType
                        )}`}
                      >
                        {patient.visitType}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{patient.name}</span>
                        <span className="text-xs text-gray-500">
                          {patient.patientId} | {patient.phoneNumber}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span>{patient.lastSeen}</span>
                        <span className="text-xs text-gray-500">
                          {patient.time}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPatientTypeClass(
                          patient.patientType
                        )}`}
                      >
                        {patient.patientType}
                      </span>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {patient.staffName}
                    </td>

                    {canDelete && (
                      <td className="px-4 py-3 text-red-500 cursor-pointer">
                        <Trash2
                          size={18}
                          className="hover:text-red-700"
                          onClick={() => handleDelete(patient.id)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center text-black bg-gray-50">
            <div className="h-[35rem] w-full flex items-center justify-center">
              <div className="w-[392px] h-[225px] flex items-center flex-col gap-4">
                <img
                  className="w-24 h-24"
                  src={emptyNotification}
                  alt="empty-notification"
                />
                <p className="text-[32px] font-semibold">No Notification Yet</p>
                <p className="text-2xl font-normal">
                  {searchTerm
                    ? `No results found for "${searchTerm}"`
                    : "You don't have any notifications yet. Check back later."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationTable;
