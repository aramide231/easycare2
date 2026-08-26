import { FaExpandArrowsAlt, FaArrowLeft } from "react-icons/fa";
import clientimage from "@doctor-shared/assets/image/haywhy.jpg";
import { useNavigate } from "react-router-dom";
import { resolvePreviousPatient } from "@/pages/doctor/previousPatientRecords/data/medicalHistorySeed";

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
    patientType?: string;
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const navigate = useNavigate();
  const summary = resolvePreviousPatient({
    firstName: patient.firstName,
    lastName: patient.lastName,
    patientId: patient.patientId,
    phoneNumber: patient.phoneNumber,
    gender: patient.gender === "F" ? "Female" : patient.gender === "M" ? "Male" : patient.gender,
    age: patient.age,
    bloodPressure: patient.bloodPressure,
    patientType: patient.patientType,
  });

  const handleViewProfile = () => {
    navigate(`/doctor/patient-profile/${patient.patientId}`, {
      state: { patient },
    });
  };

  const handlePreviousPatientRecords = () => {
    navigate(`/doctor/previous-patient-records/${patient.patientId}`, {
      state: { patient: summary },
    });
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4 max-h-sm flex flex-col flex-1">
      <div className="flex items-center gap-3">
        <img
          src={clientimage}
          alt="Patient"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {summary.firstName} {summary.lastName}
          </h2>
          <p className="text-gray-500 text-sm">ID: {summary.patientId}</p>
        </div>
      </div>

      <div className="mt-3">
        <button
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
          onClick={handleViewProfile}
        >
          <FaExpandArrowsAlt /> View Patient’s Info
        </button>
        <button
          type="button"
          onClick={handlePreviousPatientRecords}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-purple-600 px-3 py-2 font-medium text-purple-600 shadow-sm transition hover:bg-purple-100"
        >
          <FaArrowLeft /> Previous Patient Records
        </button>
      </div>

      <hr className="my-3" />

      <div className="text-sm flex flex-col space-y-3">
        <h3 className="text-purple-600 font-semibold">Prev. Vital Signs :</h3>
        <p>
          <strong>Blood Pressure :</strong> {summary.bloodPressure}{" "}
          <span className="italic">mmHg</span>
        </p>
        <p>
          <strong>Heart Rate :</strong> {summary.heartRate}{" "}
          <span className="italic">bpm</span>
        </p>
        <p>
          <strong>Weight :</strong> {summary.weight}{" "}
          <span className="font-semibold">kg</span> │ <strong>Height :</strong>{" "}
          {summary.height}
        </p>
      </div>

      <div className="text-sm mt-3 flex flex-col space-y-3">
        <h3 className="text-blue-600 font-semibold">Contact :</h3>
        <p>
          <strong>Gender :</strong> {summary.gender}
        </p>
        <p>
          <strong>Address :</strong> {summary.address}
        </p>
        <p>
          <strong>Relationship :</strong> {summary.relationship}
        </p>
        <p>
          <strong>Patient Type :</strong> {summary.patientType}
        </p>
        <p>
          <strong>Treatment Guide :</strong> {summary.medicationGuide}
        </p>
        <p>
          <strong>Last Visits Date :</strong> {summary.lastVisitDate}
        </p>
        <p>
          <strong>Next Appointment :</strong> {summary.nextAppointment}
        </p>
      </div>
    </div>
  );
};

export default PatientCard;
