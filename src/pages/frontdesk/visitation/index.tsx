import PatientsLog from "../dashboard/components/patientLog";
import { useState } from "react";
import PatientCard from "@/constant/patientCard";

const Visitation = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  return (
    <div className="flex gap-6 mt-6">
      <div className="">
        <PatientsLog onSelectPatient={setSelectedPatient} />
      </div>

      <div className="flex-[1]">
        {selectedPatient && <PatientCard patient={selectedPatient} />}
      </div>
    </div>
  );
};

export default Visitation;
