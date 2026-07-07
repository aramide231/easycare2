import GenConsultVitalSigns from "./VitalSigns";
import GenConsultPresentingComplaints from "./PresentingComplaints";
import GenConsultPhysicalExamination from "./PhysicalExamination";
import GenConsultDiagnosis from "./Diagnosis";
import GenConsultInvestigation from "./Investigation";
import GenConsultMedication from "./Medication";
import GenConsultProcedure from "./Procedure";
import ReportWriting from "./ReportWriting";
import IntakeCharts from "./IntakeCharts";
import OutputChart from "./OutputChart";
import NursingDispenses from "./NursingDispenses";
import PharmacyDispenses from "./PharmacyDispenses";

/** Gen Consult forms — Figma-aligned layouts. */
export const genConsultRenderer: Record<string, React.ReactNode> = {
  "VITAL SIGNS": <GenConsultVitalSigns />,
  "PRESENTING COMPLAINTS": <GenConsultPresentingComplaints />,
  "PHYSICAL EXAMINATION": <GenConsultPhysicalExamination />,
  "DIAGNOSIS": <GenConsultDiagnosis />,
  "INVESTIGATION": <GenConsultInvestigation />,
  "MEDICATION": <GenConsultMedication />,
  "PROCEDURE": <GenConsultProcedure />,
  "REPORT WRITING": <ReportWriting />,
  "IN-TAKE CHART": <IntakeCharts />,
  "OUTPUT CHART": <OutputChart />,
  "NURSING DISPENSES": <NursingDispenses />,
  "PHARMACY DISPENSE": <PharmacyDispenses />,
};
