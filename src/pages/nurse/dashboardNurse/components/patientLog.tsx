import { useState, useEffect, useRef, useMemo } from "react";
import { Search } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import TablePagination from "@/pages/nurse/components/TablePagination";
import { getTotalPages } from "@/pages/nurse/lib/pagination";
import {
  buildMockPatients,
  type Patient,
} from "../data/mockPatients";

const PAGE_SIZE = 8;

interface PatientsLogProps {
  onSelectPatient: (patient: Patient) => void;
}
// Custom Toast Component
const Toast = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
      <p>{message}</p>
    </div>
  );
};

const PatientsLog: React.FC<PatientsLogProps> = ({ onSelectPatient }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // const dropdownRef = useRef(null);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  // to dynamically reader the headingText

  const isVisitationPage = location.pathname.includes("visitation");
  const headingText = isVisitationPage ? "Visitation Log" : "Patients Log";

  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [patients, setPatients] = useState<Patient[]>(() => buildMockPatients());

  const getVisitTypeClass = (type: string) => {
    switch (type) {
      case "GEN. CONSULT":
        return "bg-indigo-100 text-indigo-700";
      case "ANTE. NATAL":
        return "bg-green-100 text-green-700";
      case "POST NATAL":
        return "bg-purple-100 text-purple-700";
      case "CHILDBIRTH":
        return "bg-blue-100 text-blue-700";
      case "FAMILY PLAN":
        return "bg-orange-100 text-orange-700";
      case "SPECIALIST CONSULT":
        return "bg-orange-100 text-orange-700";
      case "WOUND DRESSING":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPatientTypeClass = (type: string) => {
    switch (type) {
      case "COMPANY":
        return "bg-purple-100 text-purple-700";
      case "PRIVATE":
        return "bg-blue-100 text-blue-700";
      case "HMO":
        return "bg-orange-100 text-orange-700";
      case "STAFF":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleEditPatient = (patient: Patient) => {
    navigate(`/frontdesk/edit/${patient.id}`, { state: { patient } });
  };

  const handleFlagPatient = (patient: Patient) => {
    const updatedPatients = patients.map((p) =>
      p.id === patient.id ? { ...p, flagged: !p.flagged } : p
    );
    setPatients(updatedPatients);
    setToastMessage(patient.flagged ? "Patient unflagged" : "Patient flagged");
    toast.success(patient.flagged ? "Patient unflagged" : "Patient flagged");
  };

  const handleSaveChanges = async () => {
    const isConfirmed = await confirmSave();

    if (isConfirmed && editPatient) {
      const updatedPatients = patients.map((patient) =>
        patient.id === editPatient.id ? editPatient : patient
      );
      setPatients(updatedPatients);
      setToastMessage("Patient details updated successfully!");
      setIsModalOpen(false);
      setEditPatient(null);
      toast.success("Patient details updated successfully!");
    }
  };

  const confirmSave = () => {
    return new Promise((resolve) => {
      const confirmation = window.confirm(
        "Are you sure you want to save the changes?"
      );
      resolve(confirmation);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // filter model for the search button

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

  const paginatedPatients = useMemo(() => {
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

  // send profile model
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedSendOptions, setSelectedSendOptions] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const sendOptions = [
    "Antenatal Care",
    "Antenatal Care (Follow Up)",
    "Child Birth",
    "Family Planning",
    "General Consultaion",
    "Immunization / Vaccination",
    "Post Natal care",
    "Procedure",
    "Specialist Consultaion",
    "Wound Dressing",
    "Neonatal Care",
  ];

  const handleCheckboxChange = (option: string) => {
    setSelectedSendOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSendProfile = () => {
    // Handle logic to send the profile to selected options
    console.log("Send to:", selectedSendOptions);
    setShowSendModal(false); // Close modal after send
    setShowSuccessMessage(true); // Show success screen
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-6xl mx-auto">
      <Toast message={toastMessage} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <h1 className="shrink-0 text-xl font-bold text-gray-800">
          {headingText}
        </h1>
        <div className="flex w-full min-w-0 flex-1 items-center rounded-xl border border-[#D4D4D4] bg-white sm:max-w-md">
          <Search
            className="ml-3 h-4 w-4 shrink-0 text-gray-400"
            strokeWidth={2}
            aria-hidden
          />
          <span
            className="mx-3 h-5 w-px shrink-0 bg-[#D4D4D4]"
            aria-hidden
          />
          <input
            type="search"
            className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            placeholder="Search for patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="border-b border-[#D4D4D4] text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-2 font-medium whitespace-nowrap">S/N</th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                VISITATION TYPE
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                PATIENT NAME
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                REG DATE
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                PATIENT TYPE
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                STAFF NAME
              </th>
              {isVisitationPage && (
                <th className="px-4 py-2 font-medium whitespace-nowrap"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient, rowIndex) => (
                <tr
                  key={patient.id}
                  className={`cursor-pointer border-b border-[#D4D4D4] ${
                    selectedPatientId === patient.id
                      ? "bg-gray-100"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedPatientId(patient.id);
                    onSelectPatient(patient);
                  }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {(currentPage - 1) * PAGE_SIZE + rowIndex + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
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
                  <td className="px-4 py-3 whitespace-nowrap">
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
                  {isVisitationPage && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div
                        className="relative"
                        ref={showOptions === patient.id ? dropdownRef : null}
                      >
                        <button
                          className="text-gray-500"
                          onClick={() =>
                            setShowOptions(
                              patient.id === showOptions ? null : patient.id
                            )
                          }
                        >
                          <HiOutlineDotsVertical size={20} />
                        </button>
                        {showOptions === patient.id && (
                          <div className="absolute right-0 flex flex-col mt-2 bg-white border shadow-lg rounded-lg w-48 z-10">
                            <button
                              className="w-full px-4 py-2 mb-2 text-left text-gray-700 hover:bg-gray-100"
                              onClick={() => handleEditPatient(patient)}
                            >
                              Edit Profile
                            </button>
                            <button
                              className="w-full px-4 py-2 mb-2 text-left text-gray-700 hover:bg-gray-100"
                              onClick={() => handleFlagPatient(patient)}
                            >
                              {patient.flagged
                                ? "Unflag Profile"
                                : "Flag Profile"}
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                              onClick={() => setShowSendModal(true)}
                            >
                              Send Profile
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isVisitationPage ? 7 : 6}
                  className="text-center text-gray-500 py-6 text-sm bg-gray-50"
                >
                  No results found for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* modal class  editpatients*/}
        {isModalOpen && editPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Patient</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editPatient.name}
                    onChange={(e) =>
                      setEditPatient({ ...editPatient, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editPatient.phoneNumber}
                    onChange={(e) =>
                      setEditPatient({
                        ...editPatient,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Patient ID
                  </label>
                  <input
                    type="text"
                    value={editPatient.patientId}
                    onChange={(e) =>
                      setEditPatient({
                        ...editPatient,
                        patientId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    value={editPatient.gender}
                    onChange={(e) =>
                      setEditPatient({ ...editPatient, gender: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    value={editPatient.age}
                    onChange={(e) =>
                      setEditPatient({
                        ...editPatient,
                        age: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Patient Type
                  </label>
                  <select
                    value={editPatient.patientType}
                    onChange={(e) =>
                      setEditPatient({
                        ...editPatient,
                        patientType: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="COMPANY">Company</option>
                    <option value="PRIVATE">Private</option>
                    <option value="HMO">HMO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Visit Type
                  </label>
                  <select
                    value={editPatient.visitType}
                    onChange={(e) =>
                      setEditPatient({
                        ...editPatient,
                        visitType: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="GEN. CONSULT">General Consult</option>
                    <option value="ANTE. NATAL">Ante Natal</option>
                    <option value="POST NATAL">Post Natal</option>
                    <option value="CHILDBIRTH">Childbirth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    value={editPatient.staffName}
                    onChange={(e) =>
                      setEditPatient({
                        ...editPatient,
                        staffName: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Seen (Date)
                  </label>
                  <input
                    type="text"
                    value={editPatient.lastSeen}
                    onChange={(e) =>
                      setEditPatient({
                        ...editPatient,
                        lastSeen: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g. 15-Feb-2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="text"
                    value={editPatient.time}
                    onChange={(e) =>
                      setEditPatient({ ...editPatient, time: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g. 10:25 AM"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditPatient(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* modal class for sendProfile*/}
        {showSendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Select type of Visitation
              </h2>

              <div className="mb-6 space-y-2">
                {sendOptions.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option}
                      value={option}
                      checked={selectedSendOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-5 h-5 text-purple-600 border-purple-600 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor={option}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSendProfile}
                  className=" w-[100%] px-10 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {showSuccessMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-12 text-center">
              <h2 className="text-xl font-bold  mb-4">
                Patient Successfully Sent
              </h2>

              <button
                onClick={() => {
                  setShowSuccessMessage(false);
                  // Add your route logic here
                  navigate("/frontdesk/dashboard");
                }}
                className=" w-full px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PatientsLog;
