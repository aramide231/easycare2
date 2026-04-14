import { antenatalRenderer } from "./categories/antenatal";
import { childBirthRenderer } from "./categories/childbirth";

export const categoryRegistry: Record<string, Record<string, React.ReactNode>> = {
  "Ante Natal Care": antenatalRenderer,
  "Child Birth": childBirthRenderer,
};
