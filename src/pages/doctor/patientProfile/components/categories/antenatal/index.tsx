import VitalSigns from "./VitalSigns";
import PreviousMedicalHistory from "./PreviousMedicalHistory";
import FamilyMedicalHistory from "./FamilyMedicalHistory";
import NewAntenatalBooking from "./NewAntenatalBooking";
import PreviousPregnancyHistory from "./PreviousPregnancyHistory";
import PresentPregnancyHistory from "./PresentPregnancyHistory";
import FollowUpVisit from "./FollowUpVisit";
import PresentingComplaints from "./PresentingComplaints";
import PhysicalExamination from "../shared/PhysicalExamination";
import Diagnosis from "../shared/Diagnosis";
import Investigation from "../shared/Investigation";
import Procedure from "../shared/Procedure";
import Medication from "../shared/Medication";

export const antenatalRenderer: Record<string, React.ReactNode> = {
  "VITAL SIGNS": <VitalSigns />,
  "PREVIOUS MEDICAL HISTORY": <PreviousMedicalHistory />,
  "FAMILY MEDICAL HISTORY": <FamilyMedicalHistory />,
  "NEW ANTENATAL BOOKING": <NewAntenatalBooking />,
  "PREVIOUS PREGNANCY HISTORY": <PreviousPregnancyHistory />,
  "PRESENTING COMPLAINTS": <PresentingComplaints />,
  "PRESENT PREGNANCY HISTORY": <PresentPregnancyHistory />,
  "PHYSICAL EXAMINATION": <PhysicalExamination />,
  "DIAGNOSIS": <Diagnosis />,
  "INVESTIGATION": <Investigation />,
  "PROCEDURE": <Procedure />,
  "MEDICATION": <Medication />,
  "FOLLOW-UP VISIT": <FollowUpVisit />,
};
