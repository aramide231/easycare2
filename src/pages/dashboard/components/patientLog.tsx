import { useState } from "react";

const PatientsLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample patient data
  const patients = [
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
    },
    {
      id: 2,
      name: "Chinonso Eze",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "PRIVATE",
      visitType: "GEN. CONSULT",
      staffName: "Bayo Hammed",
    },
    {
      id: 3,
      name: "Damilola Ogunleye",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "F",
      age: 31,
      patientType: "COMPANY",
      visitType: "ANTE. NATAL",
      staffName: "Titilayo Olayinka",
    },
    {
      id: 4,
      name: "Emeka Nwankwo",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "HMO",
      visitType: "POST NATAL",
      staffName: "Titilayo Olayinka",
    },
    {
      id: 5,
      name: "Ifeoma Okeke",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "CHILDBIRTH",
      staffName: "Titilayo Olayinka",
    },
    {
      id: 6,
      name: "Toluwa Afolabi",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "ANTE. NATAL",
      staffName: "Titilayo Olayinka",
    },
  ];

  // Function to get patient type badge color
  const getPatientTypeClass = (type: "COMPANY" | "PRIVATE" | "HMO"): string => {
    switch (type) {
      case "COMPANY":
        return "bg-blue-100 text-blue-700";
      case "PRIVATE":
        return "bg-blue-100 text-blue-700";
      case "HMO":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const isValidPatientType = (
    type: string
  ): type is "COMPANY" | "PRIVATE" | "HMO" =>
    ["COMPANY", "PRIVATE", "HMO"].includes(type);

  // Function to get visit type badge color
  const getVisitTypeClass = (
    type: "GEN. CONSULT" | "ANTE. NATAL" | "POST NATAL" | "CHILDBIRTH"
  ): string => {
    switch (type) {
      case "GEN. CONSULT":
      case "CHILDBIRTH":
        return "bg-indigo-100 text-indigo-700";
      case "ANTE. NATAL":
        return "bg-green-100 text-green-700";
      case "POST NATAL":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const isValidVisitType = (
    type: string
  ): type is "GEN. CONSULT" | "ANTE. NATAL" | "POST NATAL" | "CHILDBIRTH" =>
    ["GEN. CONSULT", "ANTE. NATAL", "POST NATAL", "CHILDBIRTH"].includes(type);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800 mr-4">Patients Log</h1>
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search for patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                <th className="px-4 py-2 font-medium">LAST SEEN</th>
                <th className="px-4 py-2 font-medium">GENDER</th>
                <th className="px-4 py-2 font-medium">AGE</th>
                <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                <th className="px-4 py-2 font-medium">VISIT TYPE</th>
                <th className="px-4 py-2 font-medium">STAFF NAME</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-3 font-medium">{patient.id}</td>
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
                  <td className="px-4 py-3">{patient.gender}</td>
                  <td className="px-4 py-3">{patient.age}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        isValidPatientType(patient.patientType)
                          ? getPatientTypeClass(patient.patientType)
                          : "bg-gray-100 text-gray-700"
                      } px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {patient.patientType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        isValidVisitType(patient.visitType)
                          ? getVisitTypeClass(patient.visitType)
                          : "bg-gray-100 text-gray-700"
                      } px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {patient.visitType}
                    </span>
                  </td>
                  <td className="px-4 py-3">{patient.staffName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>

        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm border ${
                currentPage === page
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 bg-white text-gray-700"
              } rounded-md hover:bg-gray-50`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 text-sm border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50">
            ...
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50">
            20
          </button>
        </div>

        <button className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
          Next
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PatientsLog;
