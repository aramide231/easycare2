import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getActiveModuleRole } from "@/lib/authRoutes";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";
import EmptyNotification from "@frontdesk/pages/notifications/components/EmptyNotification";

type Patient = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  lastSeen: string;
  time: string;
  gender: string;
  age: number;
  patientType: string;
  visitType: string;
  staffName: string;
  flagged: boolean;
};

const NotificationTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null,
  );

  const [patients, setPatients] = useState<Patient[]>([]);

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
    };
    return visitClasses[type] || "bg-gray-100 text-gray-700";
  };

  const handleDelete = (id: number) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    if (selectedPatientId === id) setSelectedPatientId(null);
  };

  const handleViewProfile = (patient: Patient) => {
    const role = getActiveModuleRole(location.pathname, user?.userRole);
    const [firstName, ...rest] = patient.name.split(" ");
    navigate(`/${role}/patient-profile/${patient.patientId}`, {
      state: {
        patient: {
          ...patient,
          firstName,
          lastName: rest.join(" ") || firstName,
        },
      },
    });
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2 md:mb-0 md:mr-4">
          Notifications
        </h1>
        <input
          type="search"
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/2 p-2.5"
          placeholder="Search with Surname, Patient ID or Phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="border-t border-gray-200 pt-4 overflow-x-auto">
        {(searchTerm ? filteredPatients : patients).length > 0 ? (
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">INCOMING</th>
                <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                <th className="px-4 py-2 font-medium">TIME OF REQUEST</th>
                <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                <th className="px-4 py-2 font-medium">SENDER'S NAME</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {(searchTerm ? filteredPatients : patients).map((patient) => (
                <tr
                  key={patient.id}
                  className={`border-b border-gray-200 transition ${
                    selectedPatientId === patient.id
                      ? "bg-purple-50 ring-1 ring-inset ring-[#573FD1]/30"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPatientId(patient.id)}
                >
                  <td className="px-4 py-3">{patient.id}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getVisitTypeClass(
                        patient.visitType,
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
                        patient.patientType,
                      )}`}
                    >
                      {patient.patientType}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {patient.staffName}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="text-sm font-medium text-[#573FD1] underline hover:text-[#4a35b8]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(patient);
                        }}
                      >
                        View Px Profile
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(patient.id);
                        }}
                        aria-label="Delete notification"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyNotification />
        )}
      </div>
    </div>
  );
};

export default NotificationTable;
