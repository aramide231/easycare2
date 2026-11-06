import {
  anteNatalVitalFields,
  anteNatalVitalTableColumns,
} from "@/pages/doctor/patientProfile/config/clinicalVitalFields";
import { CategoryFormWithHistory } from "@/pages/doctor/patientProfile/components/category";

const nursingColumns = [
  ...anteNatalVitalTableColumns.slice(0, 3),
  ...anteNatalVitalFields.map((field) => ({ key: field.name, label: field.tableLabel ?? field.label })),
];
export default function VitalSigns({ nurse = false }: { nurse?: boolean }) {
  return (
    <CategoryFormWithHistory
      sectionName="VITAL SIGNS"
      fields={anteNatalVitalFields}
      tableColumns={nurse ? nursingColumns : anteNatalVitalTableColumns}
      showSaveButton
    />
  );
}
