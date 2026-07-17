import FlagProfileReport from "@doctor-shared/components/FlagProfileReport";
import { useLocation, useNavigate } from "react-router-dom";

const MOCK_PATIENT = {
  id: 1,
  firstName: "Abiola",
  lastName: "Adebayo",
  patientId: "P-2025001",
  staffName: "Titilayo Olayinka",
};

const DoctorFlagProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient ?? MOCK_PATIENT;
  const focusPreviousRecords = Boolean(location.state?.focusPreviousRecords);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-[#573FD1] hover:underline"
        >
          ← Back to patient profile
        </button>
        <h1 className="mt-2 text-lg font-semibold text-gray-900">
          {focusPreviousRecords
            ? `Previous Patient Records — ${patient.firstName} ${patient.lastName}`
            : `Flag Patient — ${patient.firstName} ${patient.lastName}`}
        </h1>
        <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
      </div>
      <FlagProfileReport patientOverride={patient} />
    </div>
  );
};

export default DoctorFlagProfile;
