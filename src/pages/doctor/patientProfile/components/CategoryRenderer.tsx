import VitalSigns from "./categories/antenatal/VitalSigns";
import PreviousMedicalHistory from "./categories/antenatal/PreviousMedicalHistory";
import FamilyMedicalHistory from "./categories/antenatal/FamilyMedicalHistory";
import NewAntenatalBooking from "./categories/antenatal/NewAntenatalBooking";
import PreviousPregnancyHistory from "./categories/antenatal/PreviousPregnancyHistory";
import PresentPregnancyHistory from "./categories/antenatal/PresentPregnancyHistory";
import FollowUpVisit from "./categories/antenatal/FollowUpVisit";
import Stage1Labour from "./categories/childbirth/Stage1Labour";
import Stage2Pushing from "./categories/childbirth/Stage2Pushing";
import Stage3DeliveryOfPlacenta from "./categories/childbirth/Stage3Placenta";
import Stage4DeliveryNote from "./categories/childbirth/Stage4DeliveryNote";
import VaccineAdministration from "./categories/immunization/VaccineAdministration";
import Medication from "./categories/shared/Medication";
import FollowUp from "./categories/immunization/FollowUp";
import ClinicalNotes from "./categories/immunization/ClinicalNotes";
import PresentingComplaints from "./categories/shared/PresentingComplaints";
import Investigation from "./categories/shared/Investigation";
import PhysicalExamination from "./categories/shared/PhysicalExamination";
import PreOperationNote from "./categories/surgical/PreOperationNote";
import PostOperationOrders from "./categories/surgical/PostOperationOrders";
import PostOperationNote from "./categories/surgical/PostOperationNotes";
import Diagnosis from "./categories/shared/Diagnosis";
import Procedure from "./categories/shared/Procedure";


export const CategoryRenderer: Record<string, React.ReactNode> = {
  "VITAL SIGNS": <VitalSigns />,
  "PREVIOUS MEDICAL HISTORY": <PreviousMedicalHistory />,
  "FAMILY MEDICAL HISTORY": <FamilyMedicalHistory />,
  "NEW ANTENATAL BOOKING": <NewAntenatalBooking />,
  "PREVIOUS PREGNANCY HISTORY": <PreviousPregnancyHistory />,
  "PRESENT PREGNANCY HISTORY": <PresentPregnancyHistory />,
  "PRESENTING COMPLAINTS": <PresentingComplaints />,
  "PHYSICAL EXAMINATION": <PhysicalExamination />,
  "INVESTIGATION": <Investigation />,
  "DIAGNOSIS": <Diagnosis />,
  "PROCEDURE": <Procedure />,
  "FOLLOW-UP VISIT": <FollowUpVisit />,
  "STAGE 1: LABOUR": <Stage1Labour />,
  "STAGE 2: PUSHING & BIRTHING": <Stage2Pushing />,
  "STAGE 3: DELIVERY OF PLACENTA": <Stage3DeliveryOfPlacenta />,
  "STAGE 4: DELIVERY NOTE": <Stage4DeliveryNote />,
  "VACCINE ADMINISTRATION": <VaccineAdministration />,
  "MEDICATION": <Medication />,
  "FOLLOW-UP": <FollowUp />,
  "CLINICAL NOTES": <ClinicalNotes />,
  "PRE-OPERATION NOTE": <PreOperationNote />,
  "POST-OPERATION NOTE": <PostOperationNote />,
  "POST-OPERATION ORDERS": <PostOperationOrders />,


};
