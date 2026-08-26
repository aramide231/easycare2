import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExpandArrowsAlt } from "react-icons/fa";
import clientimage from "@pharmacy/assets/image/haywhy.jpg";
import type { PharmacyPatientsLogRow } from "../../data/mockPharmacy";

type Props = {
  patient: PharmacyPatientsLogRow | null;
};

export default function PharmacyPatientCard({ patient }: Props) {
  const navigate = useNavigate();

  if (!patient) {
    return (
      <div className="mx-auto mt-4 flex max-w-sm flex-1 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
        <p className="text-center text-sm text-gray-500">
          Select a patient from the log to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-4 flex max-w-sm flex-1 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src={clientimage}
          alt={patient.regName}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{patient.regName}</h2>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={() =>
            navigate(`/pharmacy/patient-profile/${patient.id}`, {
              state: { patient },
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#573FD1] px-3 py-2 font-medium text-white shadow-md transition hover:bg-[#4a35b8]"
        >
          <FaExpandArrowsAlt />
          View Patient&apos;s Profile
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(`/pharmacy/previous-patient-records/${patient.id}`, {
              state: { patient },
            })
          }
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#573FD1] px-3 py-2 font-medium text-[#573FD1] shadow-sm transition hover:bg-purple-50"
        >
          <FaArrowLeft />
          Prev. Patient Records
        </button>
      </div>

      <hr className="my-3" />

      <div className="flex flex-col space-y-3 text-sm">
        <h3 className="font-semibold text-[#573FD1]">Prev. Vital Signs :</h3>
        <p>
          <strong>Blood Pressure :</strong> {patient.bloodPressure}{" "}
          <span className="italic">mmHg</span>
        </p>
        <p>
          <strong>Heart Rate :</strong> {patient.heartRate}{" "}
          <span className="italic">bpm</span>
        </p>
        <p>
          <strong>Weight :</strong> {patient.weight}{" "}
          <span className="font-semibold">kg</span> │ <strong>Height :</strong>{" "}
          {patient.height}
        </p>
      </div>

      <div className="mt-3 flex flex-col space-y-3 text-sm">
        <h3 className="font-semibold text-blue-600">Contact :</h3>
        <p>
          <strong>Gender :</strong> {patient.gender}
        </p>
        <p>
          <strong>Address :</strong> {patient.address}
        </p>
        <p>
          <strong>Relationship :</strong> {patient.relationship}
        </p>
        <p>
          <strong>Patient Type :</strong> {patient.treatmentType}
        </p>
        <p>
          <strong>Medication Guide :</strong> {patient.treatmentGuide}
        </p>
        <p>
          <strong>Last Visits Date :</strong> {patient.lastVisitDate}
        </p>
        <p>
          <strong>Next Appointment :</strong> {patient.nextAppointment}
        </p>
      </div>
    </div>
  );
}
