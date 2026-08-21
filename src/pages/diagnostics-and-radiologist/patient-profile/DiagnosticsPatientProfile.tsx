import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import clientimage from "@/assets/image/haywhy.jpg";
import DoctorUploadedDocumentsSection from "@/pages/doctor/patientProfile/components/DoctorUploadedDocumentsSection";
import {
  PATIENT_UPLOADED_DOCUMENTS,
  resolveDiagnosticsPatient,
  type DiagnosticsPatientsLogRow,
} from "../data/mockDiagnostics";

const ATTACH_DOCUMENTS_STEP = 3;

const TAB_LABELS = [
  { step: 1, label: "Health Information", disabled: true },
  { step: 2, label: "Financial Information", disabled: true },
  { step: 3, label: "Attach Documents", disabled: false },
] as const;

function resolvePatient(
  idParam: string | undefined,
  statePatient?: DiagnosticsPatientsLogRow
): DiagnosticsPatientsLogRow | null {
  return resolveDiagnosticsPatient(idParam, statePatient);
}

const DiagnosticsPatientProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const patient = resolvePatient(
    id,
    location.state?.patient as DiagnosticsPatientsLogRow | undefined
  );

  const uploadedDocuments = useMemo(
    () =>
      PATIENT_UPLOADED_DOCUMENTS[patient?.patientId ?? ""]?.map((doc) => ({
        ...doc,
        objectUrl: "",
      })) ?? [],
    [patient?.patientId]
  );

  const [step, setStep] = useState(ATTACH_DOCUMENTS_STEP);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  if (!patient) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">Patient not found.</p>
        <button
          type="button"
          onClick={() => navigate("/diagnostics-and-radiologist")}
          className="mt-4 text-sm font-semibold text-[#573FD1] hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:flex-row">
      <div
        className={`relative flex w-full shrink-0 flex-col border-b border-gray-200 transition-[width] duration-300 ease-in-out lg:border-b-0 lg:border-r ${
          isDetailsOpen
            ? "p-4 pr-3 lg:w-80"
            : "hidden overflow-hidden border-0 p-0 lg:block lg:w-10"
        }`}
      >
        <div
          className={`flex min-h-0 flex-1 flex-col ${
            isDetailsOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsDetailsOpen(false)}
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
                  <span className="font-medium text-gray-700">Last Name:</span>{" "}
                  {patient.lastName}
                </p>
                <p>
                  <span className="font-medium text-gray-700">First Name:</span>{" "}
                  {patient.firstName}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Middle Name:</span>{" "}
                  OluwaPac
                </p>
                <p>
                  <span className="font-medium text-gray-700">Phone NO:</span>{" "}
                  {patient.phoneNumber}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Email:</span> Not
                  available
                </p>
                <p>
                  <span className="font-medium text-gray-700">Gender:</span>{" "}
                  {patient.gender === "Male"
                    ? "M"
                    : patient.gender === "Female"
                      ? "F"
                      : patient.gender}
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
                    Insurance Group No:
                  </span>{" "}
                  LDW/200
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Employer Name:
                  </span>{" "}
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
                  <span className="font-medium text-gray-700">
                    Treatment Guide:
                  </span>{" "}
                  {patient.treatmentGuide || "Fee for service"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Policy No:</span>{" "}
                  bd2345
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Patient Type:
                  </span>{" "}
                  {patient.patientCategory === "IN-PATIENT"
                    ? "IN-PATIENT"
                    : "GEN. CONSULT"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative flex min-h-[calc(100dvh-5.75rem)] min-w-0 flex-1 flex-col overflow-hidden p-4 lg:p-5 xl:p-6 ${
          isDetailsOpen ? "" : "w-full"
        }`}
      >
        {!isDetailsOpen ? (
          <button
            type="button"
            onClick={() => setIsDetailsOpen(true)}
            className="mb-3 flex w-fit max-w-full shrink-0 items-center gap-2 truncate rounded-lg border border-purple-100 bg-purple-50 px-3 py-2 text-left text-sm font-medium text-gray-900 transition hover:border-[#573FD1]/30 hover:bg-purple-100"
            aria-label="Show patient details"
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-[#573FD1]" />
            <span className="truncate">
              {patient.firstName} {patient.lastName}
              <span className="ml-2 font-normal text-gray-500">
                · {patient.patientId}
              </span>
            </span>
          </button>
        ) : null}

        <div className="mb-5 w-full shrink-0 overflow-x-auto">
          <div className="flex flex-nowrap items-center justify-center gap-2 px-1">
            {TAB_LABELS.map((tab, index) => {
              const isActive = step === tab.step;
              return (
                <div
                  key={tab.step}
                  className="flex shrink-0 items-center gap-2"
                >
                  {tab.disabled ? (
                    <span
                      className="cursor-not-allowed whitespace-nowrap rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-400 opacity-70"
                      aria-disabled="true"
                      title="Not available in Diagnostics"
                    >
                      {tab.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStep(tab.step)}
                      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "bg-[#573FD1] text-white shadow-sm"
                          : "border border-gray-300 bg-white text-gray-500"
                      }`}
                    >
                      {tab.label}
                    </button>
                  )}
                  {index < TAB_LABELS.length - 1 ? (
                    <div
                      className={`h-0.5 w-4 shrink-0 sm:w-10 ${
                        !tab.disabled && step > tab.step
                          ? "bg-[#573FD1]"
                          : "bg-gray-300"
                      }`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <hr className="mb-3 shrink-0 border-gray-200" />

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {step === ATTACH_DOCUMENTS_STEP ? (
            <>
              <h2 className="mb-2 text-sm text-gray-400">Step 1</h2>
              <h3 className="mb-2 font-semibold text-gray-700">
                Uploaded Files
              </h3>
              <div className="relative min-w-0 rounded-lg border border-gray-300 p-4">
                <DoctorUploadedDocumentsSection
                  patientName={`${patient.firstName} ${patient.lastName}`}
                  patientId={patient.patientId}
                  phoneNumber={patient.phoneNumber}
                  figmaLayout
                  viewMode="list"
                  initialDocuments={uploadedDocuments}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsPatientProfile;
