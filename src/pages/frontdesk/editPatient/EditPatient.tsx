import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientForm from "../visitation/components/PatientForm";
import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";

const EditPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [patientData] = useState(location.state?.patient);

  useEffect(() => {
    if (!location.state?.patient) {
      navigate("/");
    } else {
      console.log(patientData);
    }
  }, [location.state, navigate, patientData]);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 ml-72 overflow-y-auto">
        <Topbar />

        <div className="flex justify-center items-start px-4 sm:px-6 lg:px-8 py-10">
          {patientData ? (
            <PatientForm patientData={patientData} />
          ) : (
            <p className="text-center text-gray-600">Loading patient data...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditPatient;
