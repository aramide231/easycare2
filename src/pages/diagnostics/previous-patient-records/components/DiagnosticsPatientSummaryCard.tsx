import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clientimage from "@/assets/image/haywhy.jpg";
import type { DiagnosticsPatientsLogRow } from "../../data/mockDiagnostics";
import DiagnosticsPrevMedicalInfo from "../../components/DiagnosticsPrevMedicalInfo";

type Props = {
  patient: DiagnosticsPatientsLogRow;
};

export default function DiagnosticsPatientSummaryCard({ patient }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:max-w-sm">
      <div className="flex items-center gap-3">
        <img
          src={clientimage}
          alt={patient.regName}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={() =>
            navigate(`/diagnostics/patient-profile/${patient.id}`, {
              state: { patient },
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a35b8]"
        >
          <ExternalLink className="h-4 w-4" />
          View Patient&apos;s Profile
        </button>
        <button
          type="button"
          onClick={() => navigate("/diagnostics")}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#573FD1] px-4 py-2.5 text-sm font-medium text-[#573FD1] transition hover:bg-[#573FD1]/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      <DiagnosticsPrevMedicalInfo patient={patient} />
    </div>
  );
}
