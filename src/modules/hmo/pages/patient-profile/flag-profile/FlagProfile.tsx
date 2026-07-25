import { Link, useLocation } from "react-router-dom";
import FlagProfileReport from "./components/FlagProfileReport";

export type HmoFlagPatient = {
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

const HmoFlagProfile = () => {
  const location = useLocation();
  const patient = location.state?.patient as HmoFlagPatient | undefined;

  if (!patient?.firstName || !patient?.lastName || !patient?.patientId) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-600">
          Patient information is not available. Open this page from a patient
          profile.
        </p>
        <Link
          to="/hmo/dashboard"
          className="mt-4 inline-block text-sm font-semibold text-[#573FD1] hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FlagProfileReport />
    </div>
  );
};

export default HmoFlagProfile;
