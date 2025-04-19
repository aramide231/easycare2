import { FaExpandArrowsAlt, FaArrowLeft } from "react-icons/fa";
import clientimage from "../assets/image/haywhy.jpg";
import { useNavigate } from "react-router-dom";

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
    bloodPressure: string;
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const navigate = useNavigate();

  console.log("Rendering patient card for", patient.firstName); // Add this

  const handleViewProfile = () => {
    navigate(`/nurse/patient-profile/${patient.patientId}`, {
      state: { patient },
    });
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4">
      {/* Patient Image & Name */}
      <div className="flex items-center gap-3">
        <img
          src={clientimage}
          alt="Patient"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-gray-500 text-sm">ID: {patient.patientId}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-3">
        <button
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
          onClick={handleViewProfile}
        >
          <FaExpandArrowsAlt /> View Patient’s Info
        </button>
        <button className="w-full flex items-center justify-center gap-2 border border-purple-600 text-purple-600 py-2 px-3 rounded-lg font-medium shadow-sm hover:bg-purple-100 transition mt-2">
          <FaArrowLeft /> Prev. Patient Records
        </button>
      </div>

      {/* Divider */}
      <hr className="my-3" />

      {/* Vital Signs */}
      <div className="text-sm">
        <h3 className="text-purple-600 font-semibold">Prev. Vital Signs :</h3>
        <p>
          <strong>Blood Pressure :</strong> {patient.bloodPressure}{" "}
          <span className="italic">mmHg</span>
        </p>
        <p>
          <strong>Heart Rate :</strong> 75 <span className="italic">bpm</span>
        </p>
        <p>
          <strong>Weight :</strong> 85 <span className="font-semibold">kg</span>{" "}
          │ <strong>Height :</strong> 5’99”
        </p>
      </div>

      {/* Contact Info */}
      <div className="text-sm mt-3">
        <h3 className="text-blue-600 font-semibold">Contact :</h3>
        <p>
          <strong>Gender :</strong> Male
        </p>
        <p>
          <strong>Address :</strong> Lagos, Nigeria
        </p>
        <p>
          <strong>Relationship :</strong> Married
        </p>
        <p>
          <strong>Patient Type :</strong> COMPANY
        </p>
        <p>
          <strong>Treatment Guide :</strong> Fee for Ser.
        </p>
        <p>
          <strong>Last Visits Date :</strong> 21/02/2022
        </p>
        <p>
          <strong>Next Appointment :</strong> 01/03/2025
        </p>
      </div>
    </div>
  );
};

export default PatientCard;
