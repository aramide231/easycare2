import type { DiagnosticsPatientsLogRow } from "../data/mockDiagnostics";

type Props = {
  patient: DiagnosticsPatientsLogRow;
};

export default function DiagnosticsPrevMedicalInfo({ patient }: Props) {
  return (
    <>
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
          <strong>Treatment Guide :</strong> {patient.treatmentGuide}
        </p>
        <p>
          <strong>Last Visits Date :</strong> {patient.lastVisitDate}
        </p>
        <p>
          <strong>Next Appointment :</strong> {patient.nextAppointment}
        </p>
      </div>
    </>
  );
}
