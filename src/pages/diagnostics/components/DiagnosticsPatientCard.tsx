import { FaArrowLeft, FaExpandArrowsAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import clientimage from "@/assets/image/haywhy.jpg";
import type { DiagnosticsPatientsLogRow } from "../data/mockDiagnostics";
import DiagnosticsPrevMedicalInfo from "./DiagnosticsPrevMedicalInfo";

type Props = {
  patient: DiagnosticsPatientsLogRow;
};

export default function DiagnosticsPatientCard({ patient }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-4 flex max-w-sm flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src={clientimage}
          alt={patient.regName}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{patient.regName}</h2>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={() =>
            navigate(`/diagnostics/patient-profile/${patient.id}`, {
              state: { patient },
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] px-3 py-2 font-medium text-white shadow-md transition hover:bg-[#4a35b8]"
        >
          <FaExpandArrowsAlt />
          View Patient&apos;s Profile
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(`/diagnostics/previous-patient-records/${patient.id}`, {
              state: { patient },
            })
          }
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#573FD1] px-3 py-2 font-medium text-[#573FD1] shadow-sm transition hover:bg-purple-50"
        >
          <FaArrowLeft />
          Prev. Patient Records
        </button>
      </div>

      <hr className="my-3" />

      <DiagnosticsPrevMedicalInfo patient={patient} />
    </div>
  );
}
