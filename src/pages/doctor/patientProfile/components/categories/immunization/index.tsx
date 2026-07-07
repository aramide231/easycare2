import ImmunizationVitalSigns from "./VitalSigns";
import VaccineAdministration from "./VaccineAdministration";
import ImmunizationMedication from "./Medication";
import FollowUp from "./FollowUp";
import ClinicalNotes from "./ClinicalNotes";

/** Immunization forms — Figma-aligned layouts. */
export const immunizationRenderer: Record<string, React.ReactNode> = {
  "VITAL SIGNS": <ImmunizationVitalSigns />,
  "VACCINE ADMINISTRATION": <VaccineAdministration />,
  "MEDICATION": <ImmunizationMedication />,
  "FOLLOW-UP": <FollowUp />,
  "CLINICAL NOTES": <ClinicalNotes />,
};
