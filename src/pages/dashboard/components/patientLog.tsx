import { useState, useEffect, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// type and datat check

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dropdownRef = useRef(null);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);

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
      name: "Toluwa Afolabi",
      patientId: "P-2025006",
      phoneNumber: "09012345678",
      lastSeen: "15-Feb-2020",
      time: "10:25 AM",
      gender: "M",
      age: 31,
      patientType: "COMPANY",
      visitType: "ANTE. NATAL",
      staffName: "Titilayo Olayinka",
      flagged: false,
    },
  ]);

  const getPatientTypeClass = (type: string) => {
    switch (type) {
      case "COMPANY":
        return "bg-blue-100 text-blue-700";
      case "PRIVATE":
        return "bg-green-100 text-green-700";
      case "HMO":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getVisitTypeClass = (type: string) => {
    switch (type) {
      case "GEN. CONSULT":
        return "bg-indigo-100 text-indigo-700";
      case "ANTE. NATAL":
        return "bg-green-100 text-green-700";
      case "POST NATAL":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleEditPatient = (patient: Patient) => {
    navigate(`/edit/${patient.id}`, { state: { patient } });
  };

  const handleFlagPatient = (patient: any) => {
    const updatedPatients = patients.map((p) =>
      p.id === patient.id ? { ...p, flagged: !p.flagged } : p
    );
    setPatients(updatedPatients);
    setToastMessage(patient.flagged ? "Patient unflagged" : "Patient flagged");
    toast.success(patient.flagged ? "Patient unflagged" : "Patient flagged");
  };

  const handleSaveChanges = async () => {
    const isConfirmed = await confirmSave();

    if (isConfirmed) {
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-6xl mx-auto">
      <Toast message={toastMessage} />

      <div className="flex flex-col md:flex-row md:items-center  mb-6 md:space-x-0">
        <h1 className="text-xl font-bold text-gray-800 md:mr-2">
          Patients Log
        </h1>
        <input
          type="search"
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/2 p-2.5 md:ml-0"
          placeholder="Search for patients"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border-t border-gray-200 pt-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase">
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
            {(searchTerm ? filteredPatients : patients).length > 0 ? (
              (searchTerm ? filteredPatients : patients).map((patient) => (
                <tr
                  key={patient.id}
                  className={`${
                    selectedPatientId === patient.id
                      ? "bg-gray-200"
                      : "bg-white"
                  } cursor-pointer`}
                  onClick={() => {
                    setSelectedPatientId(patient.id);
                    onSelectPatient(patient);
                  }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">{patient.id}</td>
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
                          <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
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
                  No results found for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* modal class*/}
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
        {/* Edit Form Appears with Pre-filled Data */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PatientsLog;
