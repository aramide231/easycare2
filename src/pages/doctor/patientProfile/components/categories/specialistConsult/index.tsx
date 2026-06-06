import PresentingComplaints from "./PresentingComplaints";
import PreviousDentalHistory from "./PreviousDentalHistory";
import PreviousDentalMedication from "./PreviousDentalMedication";

export const specialistConsultRenderer: Record<string, React.ReactNode> = {
  "PRESENTING COMPLAINTS": <PresentingComplaints />,
  "PREVIOUS DENTAL HISTORY": <PreviousDentalHistory />,
  "PREVIOUS DENTAL MEDICATION": <PreviousDentalMedication />,
};
