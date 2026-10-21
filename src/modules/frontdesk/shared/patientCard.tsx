import { FaExpandArrowsAlt, FaUndo } from "react-icons/fa";
import fdAvatar from "@frontdesk/assets/icon-image/Ellipse 2.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getActiveModuleRole } from "@/lib/authRoutes";

interface PatientCardProps {
  patient: {
    id: number;
    firstName: string;
    lastName: string;
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
    bloodPressure: string;
    name: string;
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewProfile = () => {
    const role = getActiveModuleRole(location.pathname, user?.userRole);
    navigate(`/${role}/patient-profile/${patient.patientId}`, {
      state: { patient },
    });
  };

  const handlePreviousRecords = () => {
    const role = getActiveModuleRole(location.pathname, user?.userRole);
    navigate(`/${role}/previous-patient-records/${patient.patientId}`, {
      state: { patient },
    });
  };

  const formatGender = (g: string) => {
    if (g === "M" || g.toLowerCase() === "male") return "Male";
    if (g === "F" || g.toLowerCase() === "female") return "Female";
    return g;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-full mt-4">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={fdAvatar}
          alt="Patient avatar"
          className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-100"
        />
        <div>
          <h2 className="text-sm font-semibold text-gray-900 leading-tight">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            ID: {patient.patientId}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mb-4">
        <button
          type="button"
          onClick={handleViewProfile}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <FaExpandArrowsAlt className="shrink-0" />
          View Patient's Info
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-primary text-primary text-sm font-medium py-2 px-4 rounded-xl hover:bg-primary/5 transition-colors"
          onClick={handlePreviousRecords}
        >
          <FaUndo className="shrink-0" />
          Prev. Patient Records
        </button>
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Prev. Vital Signs */}
      <div className="mb-4 space-y-1.5">
        <h3 className="text-xs font-semibold text-primary mb-2">
          Prev. Vital Signs :
        </h3>
        <p className="text-xs text-gray-800">
          Blood Pressure : {patient.bloodPressure}{" "}
          <span className="italic">mmHg</span>
        </p>
        <p className="text-xs text-gray-800">
          Heart Rate : 75 <span className="italic">bpm</span>
        </p>
        <p className="text-xs text-gray-800">
          Weight : 85 <span className="italic">kg</span>
          <span className="mx-2 text-gray-400">│</span>
          Height : 5&apos;99&quot;
        </p>
      </div>

      {/* Contact */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-primary mb-2">Contact :</h3>
        <p className="text-xs text-gray-800">
          Gender : {formatGender(patient.gender)}
        </p>
        <p className="text-xs text-gray-800">Address : Lagos, Nigeria</p>
        <p className="text-xs text-gray-800">Relationship : Married</p>
        <p className="text-xs text-gray-800">
          Patient Type : {patient.patientType}
        </p>
        <p className="text-xs text-gray-800 truncate">
          Treatment Guide : Fee for Ser...
        </p>
        <p className="text-xs text-gray-800">
          Last Visits Date : {patient.lastSeen}
        </p>
        <p className="text-xs text-gray-800">Next Appointment : 01/03/2025</p>
      </div>
    </div>
  );
};

export default PatientCard;
