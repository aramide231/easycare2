import { CategoryFormWithHistory } from "../../category";
import {
  genConsultVitalFields,
  genConsultVitalTableColumns,
} from "../../../config/clinicalVitalFields";

/** Gen Consult vitals — pasted from ANC (no FHR). */
export default function GenConsultVitalSigns() {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      fields={genConsultVitalFields}
      tableColumns={genConsultVitalTableColumns}
      showSaveButton
    />
  );
}
