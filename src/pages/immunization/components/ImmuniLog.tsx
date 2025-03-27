import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import ExportButton from "@/constant/ExportButton";

const ImmunizationLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const tableRef = useRef<HTMLTableElement>(null);

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
    console.log("Search value:", e.target.value);
  };

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
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
      visitType: "GEN. CONSULT",
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
      visitType: "GEN. CONSULT",
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
    },
    {
      id: 9,
      name: "Damilola Ogunleye",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "F",
      age: 31,
      patientType: "COMPANY",
      visitType: "ANTE. NATAL",
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
    },
    {
      id: 10,
      name: "Emeka Nwankwo",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "HMO",
      visitType: "POST NATAL",
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
    },
    {
      id: 11,
      name: "Ifeoma Okeke",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "CHILDBIRTH",
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
    },
    {
      id: 12,
      name: "Toluwa Afolabi",
      patientId: "P-2025001",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "ANTE. NATAL",
      immunization: "Bayo Hammed",
      attendant: "Pelumi Adebayo",
      followUp: "12-Mar-2025",
      followupTime: "12:25 AM",
      weight: "70kg",
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
  // const getVisitTypeClass = (
  //   type: "GEN. CONSULT" | "ANTE. NATAL" | "POST NATAL" | "CHILDBIRTH"
  // ): string => {
  //   switch (type) {
  //     case "GEN. CONSULT":
  //     case "CHILDBIRTH":
  //       return "bg-indigo-100 text-indigo-700";
  //     case "ANTE. NATAL":
  //       return "bg-green-100 text-green-700";
  //     case "POST NATAL":
  //       return "bg-gray-100 text-gray-700";
  //     default:
  //       return "bg-gray-100 text-gray-700";
  //   }
  // };

  const isValidPatientType = (
    type: string
  ): type is "COMPANY" | "PRIVATE" | "HMO" =>
    ["COMPANY", "PRIVATE", "HMO"].includes(type);

  // const isValidVisitType = (
  //   type: string
  // ): type is "GEN. CONSULT" | "ANTE. NATAL" | "POST NATAL" | "CHILDBIRTH" =>
  //   ["GEN. CONSULT", "ANTE. NATAL", "POST NATAL", "CHILDBIRTH"].includes(type);
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 ">
      <div className="flex justify-between items-center mb-6">
        {/*  Title & Search Input */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Immunization Report
          </h1>
          <Input
            type="text"
            placeholder="Search with Surname, Patient ID or Phone number"
            value={search}
            onChange={handleSearchChange}
            //onChange={(e) => setSearch(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/*  Date Picker and Export Button */}
        <div className="flex items-center gap-3">
          {/* Date Picker */}
          <button className="flex items-center border border-purple-400 text-purple-600 px-3 py-1.5 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 4h10M5 10h14M5 14h14M5 18h14"
              ></path>
            </svg>
            25/03/2025 - 28/03/2025
          </button>

          {/* Export Button */}
          {/* <button className="flex items-center border border-purple-400 text-purple-600 px-3 py-1.5 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12h-3m0 0H9m3 0V9m0 3v3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Export
          </button> */}
          <ExportButton reportTitle="Export all Immunization Report" />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                <th className="px-4 py-2 font-medium">LAST SEEN</th>
                <th className="px-4 py-2 font-medium">FOLLOW UP</th>
                <th className="px-4 py-2 font-medium">GENDER</th>
                <th className="px-4 py-2 font-medium">AGE</th>
                <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                <th className="px-4 py-2 font-medium">WEIGHT</th>
                <th className="px-4 py-2 font-medium">IMMUNIZATION</th>
                <th className="px-4 py-2 font-medium">ATTENDANT</th>
              </tr>
            </thead>
            <tbody>
              {patients
                .filter(
                  (patient) =>
                    patient.name.toLowerCase().includes(search.toLowerCase()) ||
                    patient.patientId
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    patient.phoneNumber
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((patient, index) => (
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
                      <div className="text-xs text-blue-600">
                        {patient.time}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{patient.followUp}</div>
                      <div className="text-xs text-gray-500">
                        {patient.followupTime}
                      </div>
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
                    <td className="px-4 py-3">{patient.weight}</td>

                    <td className="px-4 py-3">{patient.immunization}</td>
                    <td className="px-4 py-3">{patient.attendant}</td>
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

export default ImmunizationLog;
