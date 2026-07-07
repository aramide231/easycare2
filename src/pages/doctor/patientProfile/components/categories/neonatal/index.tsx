import NeonatalVitalSigns from "./VitalSigns";
import NeonatalDiagnosis from "./Diagnosis";
import NeonatalInvestigation from "./Investigation";
import NeonatalProcedure from "./Procedure";
import NeonatalMedication from "./Medication";

/** Neo Natal Care forms — Figma-aligned layouts. */
export const neonatalRenderer: Record<string, React.ReactNode> = {
  "VITAL SIGNS": <NeonatalVitalSigns />,
  "DIAGNOSIS": <NeonatalDiagnosis />,
  "INVESTIGATION": <NeonatalInvestigation />,
  "PROCEDURE": <NeonatalProcedure />,
  "MEDICATION": <NeonatalMedication />,
};
