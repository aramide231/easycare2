import { Expand, Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clientimage from "@hmo/assets/image/haywhy.jpg";
import type { HmoDashboardPatient } from "../data/mockDashboardPatients";

type Props = {
  patient: HmoDashboardPatient;
};

const HmoPatientCard = ({ patient }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full max-w-[12.3rem] flex-col overflow-hidden rounded-[15px] border border-[#D4D4D4] bg-white">
      <div className="p-3">
        <div className="flex items-center gap-2.5">
          <img
            src={clientimage}
            alt={patient.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-normal text-gray-900">
              {patient.name}
            </h3>
            <p className="truncate text-sm font-light text-[#626262]">
              ID: {patient.patientId}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={() =>
              navigate(`/hmo/patient-profile/${patient.id}`, {
                state: { patient },
              })
            }
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#573FD1] bg-[#573FD1] px-3 py-1.5 text-xs font-medium text-white"
          >
            <Expand size={14} />
            View Patient&apos;s Profile
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#573FD1] bg-[#EEECFA] px-3 py-1.5 text-xs font-medium text-[#573FD1]"
          >
            <Undo2 size={14} />
            Prev. Patient Records
          </button>
        </div>
      </div>

      <div className="border-t border-[#D4D4D4] px-3 py-3">
        <div className="space-y-6 text-xs">
          <div>
            <h4 className="mb-2 font-medium text-[#573FD1]">
              Prev. Vital Signs :
            </h4>
            <div className="space-y-2 text-gray-900">
              <p>Blood Pressure : {patient.bloodPressure}</p>
              <p>Heart Rate : {patient.heartRate}</p>
              <p>
                Weight : {patient.weight} | Height : {patient.height}
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium text-[#573FD1]">Contact :</h4>
            <div className="space-y-2 text-gray-900">
              <p>Gender : {patient.gender}</p>
              <p>Address : {patient.address}</p>
              <p>Relationship : {patient.relationship}</p>
              <p>Patient Type : {patient.patientType}</p>
              <p>MEDICATION Guide : {patient.medicationGuide}</p>
              <p>Last Visits Date : {patient.lastVisitDate}</p>
              <p>Next Appointment : {patient.nextAppointment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HmoPatientCard;
