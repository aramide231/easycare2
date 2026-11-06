import FlagPatientPanel from "@/components/patient/FlagPatientPanel";
import FlagProfileReport from "@doctor-shared/components/FlagProfileReport";

type PatientInfo = {
  id?: number;
  firstName?: string;
  lastName?: string;
  patientId?: string;
  staffName?: string;
  flagged?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  patient: PatientInfo;
  /** embedded = slides inside the patient profile card (same as nursing). */
  variant?: "portal" | "embedded";
};

/**
 * Clinician flag patient panel — uses the same slide-in panel shell as the
 * nursing module, with the clinician flag report as its body.
 */
const FlagPatientModal = ({
  open,
  onClose,
  patient,
  variant = "embedded",
}: Props) => {
  const patientName = [patient.firstName, patient.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <FlagPatientPanel
      open={open}
      onClose={onClose}
      patientName={patientName}
      patientId={patient.patientId}
      variant={variant}
    >
      <FlagProfileReport
        key={patient.patientId}
        patientOverride={patient}
        embedded
      />
    </FlagPatientPanel>
  );
};

export default FlagPatientModal;
