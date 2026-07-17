import { useState } from "react";
import { Trash2 } from "lucide-react";
import emptyNotification from "@frontdesk/assets/image/empty-notification.png";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId] = useState<number | null>(null); // omit setter
  // const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null); // commented out unused setter


  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Abiola Adebayo",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "GEN. CONSULT",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
    {
      id: 2,
      name: "Chinonso Eze",
      patientId: "P-2025002",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "PRIVATE",
      visitType: "GEN. CONSULT",
      staffName: "Bayo Hammed",
      flagged: false,
    },
    {
      id: 3,
      name: "Damilola Ogunleye",
      patientId: "P-2025003",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "F",
      age: 31,
      patientType: "COMPANY",
      visitType: "ANTE. NATAL",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
    {
      id: 4,
      name: "Emeka Nwankwo",
      patientId: "P-2025004",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "HMO",
      visitType: "POST NATAL",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
    {
      id: 5,
      name: "Ifeoma Okeke",
      patientId: "P-2025005",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "CHILDBIRTH",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
    {
      id: 6,
      name: "Emeka Nwankwo",
      patientId: "P-2025004",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "HMO",
      visitType: "POST NATAL",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
    {
      id: 7,
      name: "Fatima Zara",
      patientId: "P-2025005",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "CHILDBIRTH",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
    {
      id: 8,
      name: "Deola Kadir",
      patientId: "P-2025005",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "HMO",
      visitType: "FAMILY PLAN",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
    {
      id: 9,
      name: "Chioma Okeke",
      patientId: "P-2025005",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "GEN.CONSULT",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
  ]);

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
          placeholder="Search for patients"
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
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-4 py-3">{patient.id}</td>

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

                  <td className="px-4 py-3 text-red-500 cursor-pointer">
                    <Trash2
                      size={18}
                      className="hover:text-red-700"
                      onClick={() => handleDelete(patient.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* EMPTY STATE */
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
                  You don't have any notifications yet. Check back later.
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
