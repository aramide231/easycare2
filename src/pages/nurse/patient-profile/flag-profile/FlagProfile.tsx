import { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { buildMockPatients } from "@/pages/nurse/dashboard/data/mockPatients";
import FlagProfileReport from "./components/FlagProfileReport";

export type NurseFlagPatient = {
  id: number;
  firstName: string;
  lastName: string;
  patientId: string;
  phoneNumber?: string;
  email?: string;
  gender?: string;
  age?: number | string;
  visitType?: string;
};

const NurseFlagProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const patient = useMemo<NurseFlagPatient | undefined>(() => {
    const fromState = location.state?.patient as NurseFlagPatient | undefined;
    if (fromState?.firstName && fromState?.lastName && fromState?.patientId) {
      return fromState;
    }
    if (!id) return undefined;
    const all = buildMockPatients();
    return all.find(
      (p) => p.patientId === id || String(p.id) === id,
    );
  }, [id, location.state]);

  if (!patient?.firstName || !patient?.lastName || !patient?.patientId) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-600">
          Patient information is not available. Open this page from a patient
          profile.
        </p>
        <Link
          to="/nurse"
          className="mt-4 inline-block text-sm font-semibold text-[#573FD1] hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Flag Profile</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {patient.firstName} {patient.lastName} &middot; {patient.patientId}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-[#573FD1] hover:underline"
        >
          &larr; Back
        </button>
      </div>
      <FlagProfileReport key={patient.patientId} patientId={patient.patientId} />
    </div>
  );
};

export default NurseFlagProfile;
