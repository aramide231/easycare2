import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clientImage from "@doctor-shared/assets/image/haywhy.jpg";
import type { PreviousPatientSummary } from "../data/medicalHistorySeed";

type Props = {
  patient: PreviousPatientSummary;
};

const PatientSummaryCard = ({ patient }: Props) => {
  const navigate = useNavigate();
  const fullName = `${patient.firstName} ${patient.lastName}`;

  return (
    <div className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:max-w-sm">
      <div className="flex items-center gap-3">
        <img
          src={clientImage}
          alt={fullName}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{fullName}</h2>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={() =>
            navigate(`/doctor/patient-profile/${patient.patientId}`, {
              state: { patient },
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a35b8]"
        >
          <ExternalLink className="h-4 w-4" />
          View Patient&apos;s Profile
        </button>
        <button
          type="button"
          onClick={() => navigate("/doctor")}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#573FD1] px-4 py-2.5 text-sm font-medium text-[#573FD1] transition hover:bg-[#573FD1]/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="space-y-2 text-sm text-gray-700">
        <h3 className="font-semibold text-[#573FD1]">Prev. Vital Signs :</h3>
        <p>
          <span className="font-medium">Blood Pressure :</span>{" "}
          {patient.bloodPressure}{" "}
          <span className="italic text-gray-500">mmHg</span>
        </p>
        <p>
          <span className="font-medium">Heart Rate :</span>{" "}
          {patient.heartRate}{" "}
          <span className="italic text-gray-500">bpm</span>
        </p>
        <p>
          <span className="font-medium">Weight :</span> {patient.weight}{" "}
          <span className="font-semibold">kg</span>
          <span className="mx-1 text-gray-400">│</span>
          <span className="font-medium">Height :</span> {patient.height}
        </p>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <h3 className="font-semibold text-[#2563EB]">Contact :</h3>
        <p>
          <span className="font-medium">Gender :</span> {patient.gender}
        </p>
        <p>
          <span className="font-medium">Address :</span> {patient.address}
        </p>
        <p>
          <span className="font-medium">Relationship :</span>{" "}
          {patient.relationship}
        </p>
        <p>
          <span className="font-medium">Patient Type :</span>{" "}
          {patient.patientType}
        </p>
        <p>
          <span className="font-medium">Medication Guide :</span>{" "}
          {patient.medicationGuide}
        </p>
        <p>
          <span className="font-medium">Last Visits Date :</span>{" "}
          {patient.lastVisitDate}
        </p>
        <p>
          <span className="font-medium">Next Appointment :</span>{" "}
          {patient.nextAppointment}
        </p>
      </div>
    </div>
  );
};

export default PatientSummaryCard;
