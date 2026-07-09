import FlagProfileReport from "@/pages/frontdesk/flag-profile/components/FlagProfileReport";

type PatientInfo = {
  id?: number;
  firstName?: string;
  lastName?: string;
  patientId?: string;
  staffName?: string;
};

type Props = {
  patientOverride?: PatientInfo;
  embedded?: boolean;
};

const FlagProfileReportWrapper = (_props: Props) => {
  return <FlagProfileReport />;
};

export default FlagProfileReportWrapper;
