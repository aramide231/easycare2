import { useState } from "react";
import { FaSearch, FaChartBar } from "react-icons/fa";

const VisitationLog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    { id: 1, name: "Juwon Fajemirokun", regDate: "15-Feb-2020", gender: "M", age: 31, type: "COMPANY", visit: "Gen Consult", staff: "Titilayo Olayinka" },
    { id: 2, name: "Juwon Fajemirokun", regDate: "15-Feb-2020", gender: "M", age: 31, type: "PRIVATE", visit: "Ante Natal", staff: "Bayo Hammed" },
    { id: 3, name: "Juwon Fajemirokun", regDate: "15-Feb-2020", gender: "F", age: 31, type: "COMPANY", visit: "Child Birth", staff: "Titilayo Olayinka" },
    { id: 4, name: "Juwon Fajemirokun", regDate: "15-Feb-2020", gender: "M", age: 31, type: "HMO", visit: "Specialist", staff: "Titilayo Olayinka" },
    { id: 5, name: "Juwon Fajemirokun", regDate: "15-Feb-2020", gender: "M", age: 31, type: "COMPANY", visit: "Gen Consult", staff: "Titilayo Olayinka" },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex gap-x-4 items-center mb-4">
        <h2 className="text-xl font-semibold">Patients Log</h2>
        <div className="flex items-center border px-3 py-2 rounded-lg">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for patients"
            className="outline-none ml-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="p-3 text-left">SN</th>
            <th className="p-3 text-left">Patient Name</th>
            <th className="p-3 text-left">Reg Date</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Patient Type</th>
            <th className="p-3 text-left">Visit Type</th>
            <th className="p-3 text-left">Staff Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={patient.id} className="border-t">
              <td className="p-3 text-gray-700 flex items-center gap-2">
                <FaChartBar className="text-purple-500" /> {index + 1}
              </td>
              <td className="p-3 text-gray-700">{patient.name}</td>
              <td className="p-3 text-gray-700">{patient.regDate}</td>
              <td className="p-3 text-gray-700">{patient.gender}</td>
              <td className="p-3 text-gray-700">{patient.age}</td>
              <td className="p-3 text-gray-700">
                <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-lg">
                  {patient.type}
                </span>
              </td>
              <td className="p-3 text-gray-700">{patient.visit}</td>
              <td className="p-3 text-gray-700">{patient.staff}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-center text-gray-500">Pagination</div>
    </div>
  );
};

export default VisitationLog;
