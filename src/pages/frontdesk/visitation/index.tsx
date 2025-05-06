import PatientsLog from "../dashboard/components/patientLog";
import { useState } from "react";

const Visitation = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="flex gap-6 mt-6 w-full">
      <div className="w-[100%]">
        <PatientsLog onSelectPatient={setSelectedPatient} />
      </div>
    </div>
  );
};

export default Visitation;
