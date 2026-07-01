import { Link, useLocation } from "react-router-dom";
import type { PatientDetails } from "@/components/patient/PatientDetailsSidebar";
import FlagProfileReport from "./components/FlagProfileReport";

const FlagProfile = () => {
  const location = useLocation();
  const patient = location.state?.patient as PatientDetails | undefined;

  if (!patient?.firstName || !patient?.lastName || !patient?.patientId) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-600">
          Patient information is not available. Open this page from the visitation
          log.
        </p>
        <Link
          to="/frontdesk"
          className="mt-4 inline-block text-sm font-semibold text-[#573FD1] hover:underline"
        >
          Back to Visitation Log
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

export default FlagProfile;
