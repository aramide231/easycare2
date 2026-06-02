export type CategoryFieldType = "text" | "textarea" | "select" | "date";

export type CategoryFieldConfig = {
  name: string;
  label: string;
  type?: CategoryFieldType;
  fullWidth?: boolean;
  required?: boolean;
  /** Short column header in the shared details table. */
  tableLabel?: string;
  /** Hide from table (form-only). */
  showInTable?: boolean;
  /** For type "select". Defaults to YES / NO. */
  options?: { value: string; label: string }[];
};

export type CategoryTableColumn = {
  key: string;
  label: string;
};

export const YES_NO_OPTIONS = [
  { value: "YES", label: "YES" },
  { value: "NO", label: "NO" },
];

/** Standard leading columns on every category details table. */
export const DEFAULT_META_TABLE_COLUMNS: CategoryTableColumn[] = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "enteredBy", label: "ENTERED BY" },
];

/** e.g. "VITAL SIGNS" → "VITAL SIGNS DETAILS" */
export function categoryDetailsTitle(sectionName: string): string {
  const trimmed = sectionName.trim();
  if (trimmed.toUpperCase().endsWith(" DETAILS")) return trimmed.toUpperCase();
  return `${trimmed.toUpperCase()} DETAILS`;
}

export function buildTableColumnsFromFields(
  fields: CategoryFieldConfig[],
  options?: { includeMeta?: boolean }
): CategoryTableColumn[] {
  const includeMeta = options?.includeMeta !== false;

  const dataColumns = fields
    .filter((field) => field.showInTable !== false)
    .map((field) => ({
      key: field.name,
      label: field.tableLabel ?? abbreviateLabel(field.label),
    }));

  return includeMeta
    ? [...DEFAULT_META_TABLE_COLUMNS, ...dataColumns]
    : dataColumns;
}

function abbreviateLabel(label: string): string {
  return label.replace(/\?$/g, "").trim().toUpperCase();
}
