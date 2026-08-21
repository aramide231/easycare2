import { Expand, Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import patientAvatar from "../../assets/image/haywhy.jpg";
import {
  getDashboardPanelPatient,
  type DashboardPanelPatient,
} from "../data/dashboardFigma";
import type { DiagnosticsPatientRow } from "../data/mockPatients";

type Props = {
  patient: DiagnosticsPatientRow;
};

function PatientDetails({ patient }: { patient: DashboardPanelPatient }) {
  return (
    <div className="space-y-6 text-[12px] leading-[15px] tracking-[-0.24px] text-black">
      <div>
        <h4 className="mb-2 font-medium text-[#573FD1]">Prev. Vital Signs :</h4>
        <div className="space-y-2">
          <p>
            Blood Pressure : {patient.bloodPressure}{" "}
            <span className="italic">mmHg</span>
          </p>
          <p>
            Heart Rate : {patient.heartRate}{" "}
            <span className="italic">bpm</span>
          </p>
          <p>
            Weight : {patient.weight} <span className="italic">kg</span> | Height
            : {patient.height}
          </p>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium text-[#573FD1]">Contact :</h4>
        <div className="space-y-2">
          <p>Gender : {patient.gender}</p>
          <p>Address : {patient.address}</p>
          <p>Relationship : {patient.relationship}</p>
          <p>Patient Type : {patient.treatmentType}</p>
          <p className="truncate">
            Medication Guide : {patient.medicationGuide}
          </p>
          <p>Last Visits Date : {patient.lastVisitDate}</p>
          <p>Next Appointment : {patient.nextAppointment}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPatientCard({ patient }: Props) {
  const navigate = useNavigate();
  const panelPatient = getDashboardPanelPatient(patient);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
      <div className="flex items-center gap-2.5">
        <img
          src={patientAvatar}
          alt={panelPatient.panelDisplayName}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-normal tracking-[-0.3px] text-black">
            {panelPatient.panelDisplayName}
          </h3>
          <p className="text-[14px] font-light tracking-[-0.28px] text-[#626262]">
            ID: {panelPatient.panelPatientId}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <button
          type="button"
          onClick={() =>
            navigate(
              `/diagnostics-and-radiologist/patient-profile/${patient.id}`,
            )
          }
          className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#573FD1] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#4a35b8]"
        >
          <Expand size={14} />
          View Patient&apos;s Profile
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(
              `/diagnostics-and-radiologist/previous-patient-records/${patient.id}`,
            )
          }
          className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#573FD1] bg-purple-50 px-3 py-2 text-xs font-medium text-[#573FD1] transition hover:bg-purple-100"
        >
          <Undo2 size={14} />
          Prev. Patient Records
        </button>
      </div>

      <hr className="my-3 border-gray-200" />

      <div className="min-h-0 flex-1 overflow-y-auto hide-scrollbar">
        <PatientDetails patient={panelPatient} />
      </div>
    </div>
  );
}
