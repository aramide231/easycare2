import type { CategoryTableColumn } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

type Props = {
  tableKey: string;
  columns: CategoryTableColumn[];
  title?: string;
  emptyMessage?: string;
};

/**
 * Read-only presenting complaints — recorded by clinicians; nurses view history only.
 */
export default function PresentingComplaintsReadOnly({
  tableKey,
  columns,
  title = "PRESENTING COMPLAINTS",
  emptyMessage = "No presenting complaints recorded yet.",
}: Props) {
  const { history } = useMedicalTable(tableKey);

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">Recorded by clinician — read only</p>
      <CategoryMedicalTable
        title={title}
        columns={columns}
        rows={history}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
