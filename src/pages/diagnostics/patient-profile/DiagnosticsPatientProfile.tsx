import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import clientimage from "@/assets/image/haywhy.jpg";
import DoctorUploadedDocumentsSection from "@/pages/doctor/patientProfile/components/DoctorUploadedDocumentsSection";
import DiagnosticsPrevMedicalInfo from "../components/DiagnosticsPrevMedicalInfo";
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

function DisabledPanelSection({ title }: { title: string }) {
  return (
    <div className="py-1">
      <div
        className="relative w-full cursor-not-allowed border-b-2 border-gray-200 py-3 opacity-60"
        aria-disabled="true"
        title="Not available in Diagnostics"
      >
        <span className="absolute -bottom-0.5 left-0 z-10 max-w-[min(100%,14rem)] rounded-t-md bg-gray-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          {title}
        </span>
        <div className="flex min-h-[2.25rem] items-center justify-end pr-1">
          <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
        </div>
      </div>
    </div>
  );
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
          onClick={() => navigate("/diagnostics")}
          className="mt-4 text-sm font-semibold text-[#573FD1] hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-5.75rem)] w-full min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div
        className={`relative shrink-0 self-start overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-300 ease-in-out ${
          isDetailsOpen ? "w-64" : "w-10"
        }`}
      >
        <div
          className={`sticky top-0 flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] w-64 flex-col p-3 pr-2 transition-transform duration-300 ease-in-out ${
            isDetailsOpen ? "translate-x-0" : "-translate-x-full"
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

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            <DisabledPanelSection title="Personal Details" />
            <DisabledPanelSection title="Insurance Details" />

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#573FD1]">
                Prev. Medical Info
              </h3>
              <DiagnosticsPrevMedicalInfo patient={patient} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/diagnostics")}
            className="relative z-10 mt-4 flex shrink-0 items-center gap-2 text-left text-sm font-medium text-[#573FD1] transition hover:text-[#4a35b8]"
          >
            ← Back to Dashboard
          </button>
        </div>

        {!isDetailsOpen ? (
          <button
            type="button"
            onClick={() => setIsDetailsOpen(true)}
            className="absolute inset-y-0 left-0 z-20 flex w-10 flex-col items-center border-r border-purple-100 bg-purple-50 pt-4 transition hover:bg-purple-100"
            aria-label="Show patient details"
          >
            <ChevronRight className="h-5 w-5 shrink-0 text-[#573FD1]" />
          </button>
        ) : null}
      </div>

      <div className="relative flex min-h-[calc(100dvh-5.75rem)] min-w-0 flex-1 flex-col overflow-hidden p-4 lg:p-5 xl:p-6">
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
                      className={`h-0.5 w-10 shrink-0 ${
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
