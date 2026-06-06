import type { CategoryFieldConfig } from "../../config/categoryFieldTypes";
import {
  buildTableColumnsFromFields,
  categoryDetailsTitle,
} from "../../config/categoryFieldTypes";
import { useMedicalTable } from "../../hooks/useMedicalTable";
import CategoryForm from "./CategoryForm";
import CategoryMedicalTable from "./CategoryMedicalTable";

type Props = {
  /** Section name, e.g. "VITAL SIGNS". Table title becomes "VITAL SIGNS DETAILS". */
  sectionName: string;
  /** Storage key for saved rows. Defaults to sectionName. */
  tableKey?: string;
  fields: CategoryFieldConfig[];
  /** Override auto-generated "{SECTION} DETAILS" title if needed. */
  detailsTitle?: string;
  emptyMessage?: string;
  includeMetaColumns?: boolean;
  /** Gen Consult Figma: full-width inputs in 2-column grid. */
  fullWidth?: boolean;
  /** Override table columns (e.g. Figma column set). */
  tableColumns?: import("../../config/categoryFieldTypes").CategoryTableColumn[];
};

/**
 * Standard category block: form fields → Save → shared details table.
 * Same table design everywhere; only section title and columns differ.
 */
const CategoryFormWithHistory = ({
  sectionName,
  tableKey,
  fields,
  detailsTitle,
  emptyMessage,
  includeMetaColumns,
  fullWidth = false,
  tableColumns,
}: Props) => {
  const key = tableKey ?? sectionName;
  const { history, save } = useMedicalTable(key);
  const columns =
    tableColumns ??
    buildTableColumnsFromFields(fields, {
      includeMeta: includeMetaColumns,
    });
  const title = detailsTitle ?? categoryDetailsTitle(sectionName);

  return (
    <div className="space-y-6">
      <CategoryForm fields={fields} onSave={save} fullWidth={fullWidth} />
      <CategoryMedicalTable
        title={title}
        columns={columns}
        rows={history}
        emptyMessage={emptyMessage ?? `No ${sectionName.toLowerCase()} recorded yet.`}
      />
    </div>
  );
};

export default CategoryFormWithHistory;
