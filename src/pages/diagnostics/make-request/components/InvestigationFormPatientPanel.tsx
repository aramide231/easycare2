import clientimage from "@/assets/image/haywhy.jpg";
import { MAKE_REQUEST_PATIENT } from "../data/investigationFormEntryFigma";

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 text-sm">
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-800">
        {title}
      </h3>
      <div className="space-y-1.5 text-gray-700">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-medium text-gray-800">{label}:</span> {value}
    </p>
  );
}

export default function InvestigationFormPatientPanel() {
  const patient = MAKE_REQUEST_PATIENT;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
        <img
          src={clientimage}
          alt={`${patient.firstName} ${patient.lastName}`}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
        </div>
      </div>

      <div className="space-y-5">
        <DetailSection title="Personal Details">
          <DetailRow
            label="Name"
            value={`${patient.firstName} ${patient.lastName}`}
          />
          <DetailRow label="Phone" value={patient.phone} />
          <DetailRow label="Email" value={patient.email} />
          <DetailRow label="Gender" value={patient.gender} />
          <DetailRow label="Age" value={String(patient.age)} />
          <DetailRow label="Marital Status" value={patient.maritalStatus} />
          <DetailRow label="Address" value={patient.address} />
        </DetailSection>

        <DetailSection title="Insurance Details">
          <DetailRow label="Insurance Type" value={patient.insuranceType} />
          <DetailRow label="Provider Name" value={patient.providerName} />
          <DetailRow label="Policy Number" value={patient.policyNumber} />
          <DetailRow label="Employer" value={patient.employer} />
          <DetailRow label="Patient Type" value={patient.patientCategory} />
          <p>
            <span className="font-medium text-gray-800">Eligibility:</span>{" "}
            <span className="font-semibold text-green-600">
              {patient.eligibility}
            </span>
          </p>
        </DetailSection>

        <DetailSection title="Provider Details">
          <DetailRow label="Facility Name" value={patient.facilityName} />
          <DetailRow label="Address" value={patient.facilityAddress} />
          <DetailRow label="Phone" value={patient.facilityPhone} />
          <DetailRow label="Email" value={patient.facilityEmail} />
          <DetailRow label="Admission Date" value={patient.admissionDate} />
          <DetailRow label="Discharge Date" value={patient.dischargeDate} />
        </DetailSection>
      </div>
    </div>
  );
}
