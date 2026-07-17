import { useState, useRef, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import ExportButton from "@frontdesk/shared/ExportButton";
import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-date-range";
import { RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const FamilyReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const tableRef = useRef<HTMLTableElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRange, setSelectedRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [tempRange, setTempRange] = useState([...selectedRange]);

  const setQuickDateRange = (daysAgoStart: number, daysAgoEnd: number) => {
    const today = new Date();
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(today.getDate() - daysAgoStart);
    endDate.setDate(today.getDate() - daysAgoEnd);

    setTempRange([{ startDate, endDate, key: "selection" }]);
  };

  const handleApply = () => {
    setSelectedRange([...tempRange]);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempRange([...selectedRange]);
    setIsOpen(false);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "NATURAL",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "BARRIER",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "NATURAL",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "HORMONAL",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "PERMANENT",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "LARCs",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "ECs",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "LARCs",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "PERMANENT",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "BARREIR",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "HORMONAL",
      followUp: "25-Mar-2025",
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
      sendersName: "Bayo Hammed",
      receiversName: "Pelumi Adebayo",
      method: "NATURAL",
      followUp: "25-Mar-2025",
    },
  ];

  const getPatientTypeClass = (type: "COMPANY" | "PRIVATE" | "HMO"): string => {
    switch (type) {
       case "COMPANY":
        return "bg-blue-100 text-[#573FD1] border border-[#573FD1]";
      case "PRIVATE":
        return "bg-[#dbd9d9] text-[#103488]  border border-[#103488]";
      case "HMO":
        return "bg-orange-100 text-[#FA7401] border border-[#FA7401]";
    }
  };

  // Function to get visit type badge color
  const getMethodTypeClass = (
    type: "NATURAL" | "BARRIER" | "HORMONAL" | "LARCs" | "PERMANENT" | "ECs"
  ): string => {
    switch (type) {
      case "NATURAL":
        return "bg-[#e6faee] text-[#33d374] border border-[#33d374]";
      case "BARRIER":
        return "bg-[#fff1e6] text-[#fa7401] border border-[#fa7401]";
      case "HORMONAL":
        return "bg-[#ccd4e6] text-[#103488] border border-[#234492]";
      case "LARCs":
        return "bg-[#b0b0b0] text-[#071639] border border-[#39445d]";
      case "PERMANENT":
        return "bg-[#333333] text-[#FFFFFF] border border-[#cccccc]";
      case "ECs":
        return "bg-[#d0c9f2] text-[#573FD1] border border-[#573FD1]";
      default:
        return "bg-[#fff1e6] text-[#fa7401] border border-[#fa7401]";
    }
  };

  const isValidPatientType = (
    type: string
  ): type is "COMPANY" | "PRIVATE" | "HMO" =>
    ["COMPANY", "PRIVATE", "HMO"].includes(type);

  const isValidMethodType = (
    type: string
  ): type is
    | "NATURAL"
    | "BARRIER"
    | "HORMONAL"
    | "LARCs"
    | "PERMANENT"
    | "ECs" =>
    ["NATURAL", "BARRIER", "HORMONAL", "LARCs", "PERMANENT", "ECs"].includes(
      type
    );
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 ">
      <div className="flex justify-between items-center mb-6">
        {/*  Title & Search Input */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Family Planning Report
          </h1>
          <div className="w-[59%]">
            <img src="" alt="" />
            <Input
              type="text"
              placeholder="Search with Surname, Patient ID or Phone number"
              value={search}
              onChange={handleSearchChange}
              //onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
          </div>
        </div>

        {/*  Date Picker and Export Button */}
        <div className="flex items-center gap-3">
          {/* Date Picker */}
          <div className="relative w-fit">
            {/* Calendar Toggle Button */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center border border-[#573FD1] text-[#573FD1] px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <svg
                className="w-4 h-4 mr-2 text-[#573FD1]"
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
              {selectedRange[0].startDate.toLocaleDateString()} -{" "}
              {selectedRange[0].endDate.toLocaleDateString()}
            </button>

            {/* Side-by-Side Calendar */}

            {isOpen && (
              <div className="absolute top-12 left-[-600px] bg-white shadow-lg rounded-lg p-6 flex space-x-6 z-50">
                {/* Left Side: Date Options */}
                <div className="flex flex-col space-y-3 w-36">
                  {[
                    { label: "Today", start: 0, end: 0 },
                    { label: "Yesterday", start: 1, end: 1 },
                    { label: "Last Week", start: 7, end: 0 },
                    { label: "Last Month", start: 30, end: 0 },
                    { label: "Last Year", start: 365, end: 0 },
                    { label: "All Time", start: 9999, end: 0 },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`text-sm px-3 py-2 rounded-md ${
                        item.label === "Today"
                          ? "bg-[#573FD1] text-[#FFFFFF] font-semibold"
                          : "text-gray-600"
                      }`}
                      onClick={() => setQuickDateRange(item.start, item.end)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Right Side: Date Range Picker */}
                <div>
                  <DateRange
                    editableDateInputs={false}
                    onChange={(ranges: RangeKeyDict) => {
                      const selection = ranges.selection as {
                        startDate: Date;
                        endDate: Date;
                        key: string;
                      };
                      setTempRange([selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={tempRange}
                    maxDate={new Date()}
                    months={2}
                    direction="horizontal"
                    showDateDisplay={false}
                    className="rounded-lg"
                  />

                  {/* Apply & Cancel Buttons */}
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      className="border border-[#573FD1] text-[#573FD1] px-4 py-2 rounded-md"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#573FD1] text-white px-4 py-2 rounded-md"
                      onClick={handleApply}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

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
          <ExportButton reportTitle="Export Family Planning Report" />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 ">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2 font-medium">SN</th>
                <th className="px-4 py-2 font-medium">PATIENT NAME</th>
                <th className="px-4 py-2 font-medium">GENDER</th>
                <th className="px-4 py-2 font-medium">AGE</th>
                <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                <th className="px-4 py-2 font-medium">METHOD</th>
                <th className="px-4 py-2 font-medium">FOLLOW UP</th>
                <th className="px-4 py-2 font-medium">ATTENDANT (DOCTOR)</th>
                <th className="px-4 py-2 font-medium">ATTENDANT (NURSE)</th>
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
                          isValidMethodType(patient.method)
                            ? getMethodTypeClass(patient.method)
                            : "bg-[#fff1e6] text-[#fa7401] border-[#fa7401]"
                        } px-4 py-2 rounded-md text-xs font-bold`}
                      >
                        {patient.method}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>{patient.followUp}</div>
                      <div className="text-xs text-blue-600">
                        {patient.time}
                      </div>
                    </td>

                    <td className="px-4 py-3">{patient.sendersName}</td>
                    <td className="px-4 py-3">{patient.receiversName}</td>
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
                  ? "bg-purple-50 border-[#573FD1] text-[#573FD1]"
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

export default FamilyReport;
