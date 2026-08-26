import { useState, useRef } from "react";

const ViewReminder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLTableElement>(null);

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
      status: "PENDING",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
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
      status: "TRIGGERED",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
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
      status: "TRIGGERED",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
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
      status: "PENDING",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
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
      status: "PENDING",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
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
      patientType: "HMO",
      status: "TRIGGERED",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
    },
    {
      id: 7,
      name: "Abiola Adebayo",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      status: "PENDING",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
    },
    {
      id: 8,
      name: "Chinonso Eze",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "PRIVATE",
      status: "TRIGGERED",
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
    },
  ];
  const getPatientTypeClass = (type: "COMPANY" | "PRIVATE" | "HMO"): string => {
    switch (type) {
      case "COMPANY":
      case "PRIVATE":
        return "bg-blue-100 text-blue-700";
      case "HMO":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Function to get visit type badge color
  const getPatientStatus = (type: "PENDING" | "TRIGGERED"): string => {
    switch (type) {
      case "PENDING":
        return "bg-[#fff1e6] text-[#fa7401] border-[#fa7401]";
      case "TRIGGERED":
        return "bg-[#e6faee] text-[#33d374] border-[#33d374]";
      default:
        return "bg-[#fff1e6] text-[#fa7401] border-[#fa7401]";
    }
  };

  const isValidPatientType = (
    type: string
  ): type is "COMPANY" | "PRIVATE" | "HMO" =>
    ["COMPANY", "PRIVATE", "HMO"].includes(type);

  const isValidPatientStatus = (
    type: string
  ): type is "PENDING" | "TRIGGERED" => ["PENDING", "TRIGGERED"].includes(type);

  return (
    <>
      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                <th className="px-4 py-2 font-medium"> REMINDER TIME</th>
                <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                <th className="px-4 py-2 font-medium">STATUS</th>
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

                  <td className="px-4 py-3">
                    <span
                      className={`${
                        isValidPatientType(patient.patientType)
                          ? getPatientTypeClass(patient.patientType)
                          : "bg-gray-100 text-gray-700"
                      } px-4 py-2 rounded-md text-xs font-bold`}
                    >
                      {patient.patientType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        isValidPatientStatus(patient.status)
                          ? getPatientStatus(patient.status)
                          : "bg-[#fff1e6] text-[#fa7401] border-[#fa7401]"
                      } px-4 py-2 rounded-md text-xs font-bold`}
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
    </>
  );
};

export default ViewReminder;
