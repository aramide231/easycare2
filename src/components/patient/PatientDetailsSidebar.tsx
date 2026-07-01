import { FaFlag } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import clientimage from "@/assets/image/haywhy.jpg";

export type PatientDetails = {
  firstName: string;
  lastName: string;
  patientId: string;
  phoneNumber?: string;
  email?: string;
  gender?: string;
  age?: number | string;
  visitType?: string;
  middleName?: string;
  maritalStatus?: string;
  address?: string;
};

type Props = {
  patient: PatientDetails;
  onBack?: () => void;
  onFlagPatient?: () => void;
  flagProfileTo?: string;
  showFlagAction?: boolean;
  className?: string;
};

const PatientDetailsSidebar = ({
  patient,
  onBack,
  onFlagPatient,
  flagProfileTo,
  showFlagAction = true,
  className = "",
}: Props) => {
  return (
    <aside
      className={`flex w-80 shrink-0 flex-col border-r border-gray-200 p-4 pr-3 ${className}`}
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-3 flex w-full shrink-0 items-center gap-3 rounded-lg border border-purple-100 bg-purple-50 p-3 text-left transition hover:border-[#573FD1]/30 hover:bg-purple-100"
        aria-label="Go back"
      >
        <img
          src={clientimage}
          alt="Patient"
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
        {onBack && (
          <ChevronLeft className="h-5 w-5 shrink-0 text-[#573FD1]" />
        )}
      </button>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-800">
            Personal Details
          </h3>
          <div className="space-y-1.5 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">Last Name:</span>{" "}
              {patient.lastName}
            </p>
            <p>
              <span className="font-medium text-gray-700">First Name:</span>{" "}
              {patient.firstName}
            </p>
            <p>
              <span className="font-medium text-gray-700">Middle Name:</span>{" "}
              {patient.middleName ?? "OluwaPac"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone NO:</span>{" "}
              {patient.phoneNumber ?? "—"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {patient.email || "Not available"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Gender:</span>{" "}
              {patient.gender ?? "—"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Age:</span>{" "}
              {patient.age ?? "—"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Marital Status:</span>{" "}
              {patient.maritalStatus ?? "Married"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {patient.address ?? "2, Omega lane, Lekki, Lagos."}
            </p>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-800">
            Insurance Details
          </h3>
          <div className="space-y-1.5 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">Insurance Type:</span>{" "}
              HMO
            </p>
            <p>
              <span className="font-medium text-gray-700">Insurance Group No:</span>{" "}
              LDW/200
            </p>
            <p>
              <span className="font-medium text-gray-700">Employer Name:</span>{" "}
              7up Bottling Company
            </p>
            <p>
              <span className="font-medium text-gray-700">Eligibility:</span>{" "}
              <span className="text-green-600">Active</span>
            </p>
            <p>
              <span className="font-medium text-gray-700">
                Insurance Provider Name:
              </span>{" "}
              Leadway HMO
            </p>
            <p>
              <span className="font-medium text-gray-700">Treatment Guide:</span>{" "}
              Fee for service
            </p>
            <p>
              <span className="font-medium text-gray-700">Policy No:</span> bd2345
            </p>
            <p>
              <span className="font-medium text-gray-700">Patient Type:</span>{" "}
              {patient.visitType ?? "Gen. consult"}
            </p>
          </div>
        </div>
      </div>

      {showFlagAction && onFlagPatient && (
        <button
          type="button"
          onClick={onFlagPatient}
          className="mt-4 flex shrink-0 items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          <FaFlag className="text-base" />
          Flag Patient
        </button>
      )}
      {showFlagAction && !onFlagPatient && flagProfileTo && (
        <Link
          to={flagProfileTo}
          state={{ patient }}
          className="mt-4 flex shrink-0 items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          <FaFlag className="text-base" />
          Flag Patient
        </Link>
      )}
    </aside>
  );
};

export default PatientDetailsSidebar;
