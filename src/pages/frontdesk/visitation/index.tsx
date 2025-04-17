import Sidebar from "@/constant/sidebar";
import Topbar from "@/constant/topbar";

import PatientsLog from "../dashboard/components/patientLog";
import { useState } from "react";
import PatientCard from "@/constant/patientCard";

const Visitation = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      {/* Added `ml-72` to shift the main content to the right */}
      <main className="flex-1 p-6 ml-72">
        <Topbar />

        <div className="flex gap-6 mt-6">
          <div className="">
            <PatientsLog onSelectPatient={setSelectedPatient} />
          </div>

          <div className="flex-[1]">
            {selectedPatient && <PatientCard patient={selectedPatient} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visitation;
