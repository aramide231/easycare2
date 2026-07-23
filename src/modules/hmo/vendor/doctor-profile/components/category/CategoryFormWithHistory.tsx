import type {
  CategoryFieldConfig,
  CategoryTableColumn,
} from "../../config/categoryFieldTypes";
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
  /** Full column override when the default meta + field columns are not enough. */
  tableColumns?: CategoryTableColumn[];
  /** Only Vital Signs keeps per-section Save; others commit on category Submit. */
  showSaveButton?: boolean;
};

const CategoryFormWithHistory = ({
  sectionName,
  tableKey,
  fields,
  detailsTitle,
  emptyMessage,
  includeMetaColumns,
  tableColumns,
  showSaveButton = false,
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
      <CategoryForm
        fields={fields}
        onSave={save}
        showSaveButton={showSaveButton}
        pendingTableKey={showSaveButton ? undefined : key}
      />
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
