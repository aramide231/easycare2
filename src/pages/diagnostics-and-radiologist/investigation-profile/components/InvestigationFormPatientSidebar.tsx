import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clientimage from "../../assets/image/haywhy.jpg";
import type { DiagnosticsPatientsLogRow } from "../../data/mockDiagnostics";

type Props = {
  patient: DiagnosticsPatientsLogRow;
};

export default function InvestigationFormPatientSidebar({ patient }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`relative flex shrink-0 flex-col border-gray-200 transition-[width] duration-300 ease-in-out ${
        isOpen
          ? "w-full border-b p-4 lg:w-80 lg:border-b-0 lg:border-r lg:pr-3"
          : "hidden lg:block lg:w-10 lg:border-r lg:p-0"
      }`}
    >
      <div
        className={`flex min-h-0 flex-1 flex-col ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mb-3 flex w-full shrink-0 items-center gap-3 rounded-lg border border-purple-100 bg-purple-50 p-3 text-left transition hover:border-[#573FD1]/30 hover:bg-purple-100"
          aria-label="Hide patient details"
        >
          <img
            src={clientimage}
            alt={patient.regName}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
          </div>
          <ChevronLeft className="h-5 w-5 shrink-0 text-[#573FD1]" />
        </button>

        <div className="min-h-0 max-h-[50vh] space-y-4 overflow-y-auto lg:max-h-none">
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-800">
              PERSONAL DETAILS
            </h3>
            <div className="space-y-1.5 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Name:</span>{" "}
                {patient.regName}
              </p>
              <p>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {patient.phoneNumber}
              </p>
              <p>
                <span className="font-medium text-gray-700">Email:</span> Not
                available
              </p>
              <p>
                <span className="font-medium text-gray-700">Gender:</span>{" "}
                {patient.gender}
              </p>
              <p>
                <span className="font-medium text-gray-700">Age:</span>{" "}
                {patient.age}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Marital Status:
                </span>{" "}
                {patient.relationship}
              </p>
              <p>
                <span className="font-medium text-gray-700">Address:</span>{" "}
                {patient.address}
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-800">
              INSURANCE DETAILS
            </h3>
            <div className="space-y-1.5 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">
                  Insurance Type:
                </span>{" "}
                {patient.treatmentType}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Provider Name:
                </span>{" "}
                Leadway HMO
              </p>
              <p>
                <span className="font-medium text-gray-700">Policy Number:</span>{" "}
                bd2345
              </p>
              <p>
                <span className="font-medium text-gray-700">Employer:</span>{" "}
                7up Bottling Company
              </p>
              <p>
                <span className="font-medium text-gray-700">Patient Type:</span>{" "}
                {patient.patientCategory === "IN-PATIENT"
                  ? "IN-PATIENT"
                  : "OUT-PATIENT"}
              </p>
              <p>
                <span className="font-medium text-gray-700">Eligibility:</span>{" "}
                <span className="font-semibold text-green-600">ACTIVE</span>
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-800">
              PROVIDER DETAILS
            </h3>
            <div className="space-y-1.5 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">
                  Facility Name:
                </span>{" "}
                St James Hospital
              </p>
              <p>
                <span className="font-medium text-gray-700">Address:</span>{" "}
                Lagos, Nigeria
              </p>
              <p>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                01234567890
              </p>
              <p>
                <span className="font-medium text-gray-700">Email:</span> Not
                available
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Admission Date:
                </span>{" "}
                {patient.lastVisitDate}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Discharge Date:
                </span>{" "}
                {patient.nextAppointment}
              </p>
            </div>
          </div>
        </div>
      </div>

      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute left-0 top-4 flex h-8 w-8 items-center justify-center rounded-r-lg border border-purple-100 bg-purple-50 text-[#573FD1] hover:bg-purple-100"
          aria-label="Show patient details"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
