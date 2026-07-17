import { Expand, Undo2 } from "lucide-react";
import clientimage from "../assets/image/haywhy.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getActiveModuleRole } from "@/lib/authRoutes";
import { mockNextAppointmentDate } from "@/lib/dateTime";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nextAppointment = mockNextAppointmentDate(7 + (patient.id % 21));

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

  return (
    <div className="mx-auto flex w-full max-w-[17.5rem] flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={clientimage}
          alt="Patient"
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] px-3 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#4a35b8]"
          onClick={handleViewProfile}
        >
          <Expand className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          View Patient&apos;s Profile
        </button>
        <button
          type="button"
          onClick={handlePreviousRecords}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#573FD1] bg-purple-50 px-3 py-2.5 text-sm font-medium text-[#573FD1] transition hover:bg-purple-100"
        >
          <Undo2 className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          Prev. Patient Records
        </button>
      </div>

      <hr className="my-3 border-gray-200" />

      <div className="flex flex-col space-y-3 text-sm">
        <h3 className="font-semibold text-[#573FD1]">Prev. Vital Signs :</h3>
        <p>
          <strong>Blood Pressure :</strong> {patient.bloodPressure}{" "}
          <span className="italic">mmHg</span>
        </p>
        <p>
          <strong>Heart Rate :</strong> 75 <span className="italic">bpm</span>
        </p>
        <p>
          <strong>Weight :</strong> 85 <span className="italic">kg</span> │{" "}
          <strong>Height :</strong> 170<span className="italic">cm</span>
        </p>
      </div>

      <div className="mt-3 flex flex-col space-y-3 text-sm">
        <h3 className="font-semibold text-[#573FD1]">Contact :</h3>
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
          <strong>MEDICATION Guide :</strong> Fee for Ser.
        </p>
        <p>
          <strong>Last Visits Date :</strong> {patient.lastSeen}
        </p>
        <p>
          <strong>Next Appointment :</strong> {nextAppointment}
        </p>
      </div>
    </div>
  );
};

export default PatientCard;
