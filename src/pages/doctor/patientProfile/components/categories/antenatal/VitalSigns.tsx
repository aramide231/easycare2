import {
  anteNatalVitalFields,
  anteNatalVitalTableColumns,
} from "../../../config/clinicalVitalFields";
import { CategoryFormWithHistory } from "../../category";

export default function VitalSigns() {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      fields={anteNatalVitalFields}
      tableColumns={anteNatalVitalTableColumns}
      showSaveButton
    />
  );
}
