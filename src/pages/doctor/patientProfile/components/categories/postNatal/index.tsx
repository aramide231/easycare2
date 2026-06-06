import PostNatalVitalSigns from "./VitalSigns";
import PostNatalPresentingComplaints from "./PresentingComplaints";
import PostNatalPhysicalExamination from "./PhysicalExamination";
import PostNatalInvestigation from "./Investigation";
import PostNatalMedication from "./Medication";

/** Post Natal Care forms — Figma-aligned layouts. */
export const postNatalRenderer: Record<string, React.ReactNode> = {
  "VITAL SIGNS": <PostNatalVitalSigns />,
  "PRESENTING COMPLAINTS": <PostNatalPresentingComplaints />,
  "PHYSICAL EXAMINATION": <PostNatalPhysicalExamination />,
  "INVESTIGATION": <PostNatalInvestigation />,
  "MEDICATION": <PostNatalMedication />,
};
