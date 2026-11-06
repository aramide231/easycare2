import { useState, useEffect, useRef, useMemo } from "react";
import { Search } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import TablePagination from "@doctor-shared/components/TablePagination";
import FlagPatientModal from "@/pages/doctor/patientProfile/components/FlagPatientModal";
import { getTotalPages } from "@doctor-shared/lib/pagination";
import {
  isDateWithinRange,
  parsePatientLastSeen,
  type DateRangeValue,
} from "@doctor-shared/lib/dateTime";
import {
  buildMockPatients,
  type Patient,
} from "@/pages/nurse/dashboardNurse/data/mockPatients";

const PAGE_SIZE = 50;

interface PatientsLogProps {
  onSelectPatient: (patient: Patient) => void;
  dateRange?: DateRangeValue | null;
}

const Toast = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
      <p>{message}</p>
    </div>
  );
};

const PatientsLog: React.FC<PatientsLogProps> = ({
  onSelectPatient,
  dateRange = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  const isVisitationPage = location.pathname.includes("visitation");
  const headingText = isVisitationPage ? "Visitation Log" : "Patients Log";

  const moduleBase = location.pathname.startsWith("/nurse")
    ? "/nurse"
    : location.pathname.startsWith("/frontdesk")
      ? "/frontdesk"
      : "/doctor";

  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [flagModalPatient, setFlagModalPatient] = useState<Patient | null>(null);

  const [patients, setPatients] = useState<Patient[]>(() => buildMockPatients());

  const getPatientTypeClass = (type: string) => {
    switch (type) {
      case "COMPANY":
        return "bg-blue-100 text-[#573FD1] border border-[#573FD1]";
      case "PRIVATE":
        return "bg-[#dbd9d9] text-[#103488] border border-[#103488]";
      case "HMO":
        return "bg-orange-100 text-[#FA7401] border border-[#FA7401]";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getVisitTypeClass = (type: string) => {
    switch (type) {
      case "GEN. CONSULT":
        return "bg-blue-100 text-[#573FD1] border border-[#573FD1]";
      case "ANTE. NATAL":
        return "bg-green-100 text-green-700 border border-[#00C851]";
      case "POST NATAL":
        return "bg-[#FDFDFD] text-[#626262] border border-[#626262]";
      default:
        return "bg-[#dbd9d9] text-[#103488] border border-[#103488]";
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setShowOptions(null);
    if (moduleBase === "/frontdesk") {
      navigate(`/frontdesk/edit/${patient.id}`, { state: { patient } });
    } else {
      setEditPatient(patient);
      setIsModalOpen(true);
    }
  };

  const handleFlagProfile = (patient: Patient) => {
    setShowOptions(null);
    navigate(`${moduleBase}/flag-profile/${patient.id}`, {
      state: { patient },
    });
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

  const filteredPatients = patients.filter((patient) => {
    if (dateRange) {
      const lastSeenDate = parsePatientLastSeen(patient.lastSeen);
      if (!lastSeenDate || !isDateWithinRange(lastSeenDate, dateRange)) {
        return false;
      }
    }

    const search = searchTerm.toLowerCase();
    if (!search) return true;

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

  const totalPages = getTotalPages(filteredPatients.length, PAGE_SIZE);

  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPatients.slice(start, start + PAGE_SIZE);
  }, [filteredPatients, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateRange]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

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
    setShowSendModal(false);
    setShowSuccessMessage(true);
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
              <th className="px-4 py-2 font-medium whitespace-nowrap">SN</th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                PATIENT NAME
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                LAST SEEN
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                GENDER
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">AGE</th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                PATIENT TYPE
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                VISIT TYPE
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap">
                STAFF NAME
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap"></th>
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
                    {patient.gender}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{patient.age}</td>
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getVisitTypeClass(
                        patient.visitType
                      )}`}
                    >
                      {patient.visitType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {patient.staffName}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="relative"
                      ref={showOptions === patient.id ? dropdownRef : null}
                    >
                      <button
                        type="button"
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        aria-label="Patient actions"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowOptions(
                            patient.id === showOptions ? null : patient.id
                          );
                        }}
                      >
                        <HiOutlineDotsVertical size={20} />
                      </button>
                      {showOptions === patient.id && (
                        <div className="absolute right-0 z-20 mt-2 flex w-48 flex-col rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                          <button
                            type="button"
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleEditPatient(patient)}
                          >
                            Edit Profile
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleFlagProfile(patient)}
                          >
                            Flag Profile
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setShowOptions(null);
                              setShowSendModal(true);
                            }}
                          >
                            Send Profile
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-center text-gray-500 py-6 text-sm bg-gray-50"
                >
                  {searchTerm
                    ? `No results found for "${searchTerm}"`
                    : dateRange
                      ? "No patients found for the selected date range."
                      : "No patients found."}
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
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditPatient(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-[#573FD1] text-white px-4 py-2 rounded hover:bg-[#4a35b8]"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

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
                      className="w-5 h-5 text-[#573FD1] border-[#573FD1] rounded focus:ring-purple-500"
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

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowSendModal(false)}
                  className="w-1/2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendProfile}
                  className="w-1/2 px-6 py-2 text-sm font-medium text-white bg-[#573FD1] rounded hover:bg-[#4a35b8]"
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
              <h2 className="text-xl font-bold mb-4">
                Patient Successfully Sent
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessMessage(false);
                  navigate(moduleBase);
                }}
                className="w-full px-5 py-2 text-sm font-medium text-white bg-[#573FD1] rounded hover:bg-[#4a35b8]"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
      {flagModalPatient && (
        <FlagPatientModal
          open={Boolean(flagModalPatient)}
          onClose={() => setFlagModalPatient(null)}
          patient={flagModalPatient}
          variant="portal"
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default PatientsLog;
