import PatientsLog from "../dashboard/components/patientLog";
import { useState } from "react";

const Visitation = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-6 ">
        <div className=" gap-6 mt-6">
          <PatientsLog onSelectPatient={selectedPatient} />
        </div>
      </main>
    </div>
  );
};

export default Visitation;
