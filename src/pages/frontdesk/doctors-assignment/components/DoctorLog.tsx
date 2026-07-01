import { useState, useRef, ChangeEvent, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ExportButton from "@/constant/ExportButton";
import TablePagination from "@/pages/nurse/shared/components/TablePagination";
import { usePaginatedList } from "@/hooks/usePaginatedList";
import { PAGE_SIZE } from "@/constant/pagination";
import { DateRange } from "react-date-range";
import { RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  getPatientTypeClass,
  getVisitTypeClass,
} from "@/lib/badgeStyles";
import { buildMockPatients } from "@/pages/nurse/dashboard/data/mockPatients";

const DoctorLog = () => {
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

  const patients = buildMockPatients().slice(0, 12).map((patient) => ({
    ...patient,
    sendersName: "Bayo Hammed",
    receiversName: "Pelumi Adebayo",
  }));

  const filteredPatients = useMemo(
    () =>
      patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.patientId.toLowerCase().includes(search.toLowerCase()) ||
          patient.phoneNumber.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    usePaginatedList(filteredPatients);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 ">
      <div className="flex justify-between items-center mb-6">
        {/*  Title & Search Input */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Doctor's Log
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
          <div className="relative w-fit">
            {/* Calendar Toggle Button */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center border border-purple-400 text-purple-600 px-3 py-1.5 rounded-full text-sm font-medium"
            >
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
                          ? "bg-[#573FD1] text-[#573FD1] font-semibold"
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
          <ExportButton reportTitle="Export all Doctor's Log" />
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
                <th className="px-4 py-2 font-medium">GENDER</th>
                <th className="px-4 py-2 font-medium">AGE</th>
                <th className="px-4 py-2 font-medium">PATIENT TYPE</th>
                <th className="px-4 py-2 font-medium">VISIT TYPE</th>
                <th className="px-4 py-2 font-medium">SENDER'S NAME</th>
                <th className="px-4 py-2 font-medium">RECEIVER'S NAME</th>
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
                      <div className="text-xs text-blue-600">
                        {patient.time}
                      </div>
                    </td>
                    <td className="px-4 py-3">{patient.gender}</td>
                    <td className="px-4 py-3">{patient.age}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getPatientTypeClass(patient.patientType)}`}
                      >
                        {patient.patientType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getVisitTypeClass(patient.visitType)}`}
                      >
                        {patient.visitType}
                      </span>
                    </td>
                    <td className="px-4 py-3">{patient.sendersName}</td>
                    <td className="px-4 py-3">{patient.receiversName}</td>
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
    </div>
  );
};

export default DoctorLog;
