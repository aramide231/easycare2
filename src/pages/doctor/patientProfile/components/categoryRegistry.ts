import { antenatalRenderer } from "./categories/antenatal";
import { childBirthRenderer } from "./categories/childbirth";
import { genConsultRenderer } from "./categories/genConsult";
import { immunizationRenderer } from "./categories/immunization";
import { neonatalRenderer } from "./categories/neonatal";
import { postNatalRenderer } from "./categories/postNatal";
import { specialistConsultRenderer } from "./categories/specialistConsult";
import { surgicalRenderer } from "./categories/surgical";

export const categoryRegistry: Record<string, Record<string, React.ReactNode>> = {
  "Ante Natal Care": antenatalRenderer,
  "Child Birth": childBirthRenderer,
  "Gen Consult": genConsultRenderer,
  "Neo Natal Care": neonatalRenderer,
  Immunization: immunizationRenderer,
  "Post Natal Care": postNatalRenderer,
  "Specialist Consult": specialistConsultRenderer,
  Surgical: surgicalRenderer,
};
