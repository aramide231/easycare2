import type { CategoryTableColumn } from "../../config/categoryFieldTypes";

export type MedicalTableRow = Record<string, unknown>;

type Props = {
  /** Table heading, e.g. "VITAL SIGNS DETAILS". */
  title: string;
  columns: CategoryTableColumn[];
  rows: MedicalTableRow[];
  emptyMessage?: string;
  /** Shown when a cell value is empty. Defaults to "—". */
  emptyCellLabel?: string;
  /** Column keys that render as a purple VIEW link. */
  linkColumns?: string[];
  /** Fired when a VIEW link cell is clicked. */
  onLinkClick?: (row: MedicalTableRow, columnKey: string) => void;
  /** Column keys that allow wrapped / multiline cell text. */
  wrapColumns?: string[];
};

/**
 * One shared details-table design for every patient-profile category.
 * Same layout and styling; only title and column definitions change.
 */
const CategoryMedicalTable = ({
  title,
  columns,
  rows,
  emptyMessage = "No records yet.",
  emptyCellLabel = "—",
  linkColumns = [],
  onLinkClick,
  wrapColumns = [],
}: Props) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-max w-full text-left text-sm">
          <thead className="border-b border-[#D4D4D4] text-xs uppercase text-gray-500">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-4 py-2 font-medium"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#D4D4D4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-gray-800 ${
                        wrapColumns.includes(col.key)
                          ? "whitespace-pre-line"
                          : "whitespace-nowrap"
                      }`}
                    >
                      {linkColumns.includes(col.key) &&
                      formatCell(row[col.key], emptyCellLabel) === "VIEW" ? (
                        <button
                          type="button"
                          onClick={() => onLinkClick?.(row, col.key)}
                          className="text-sm font-semibold text-[#573FD1] hover:underline"
                        >
                          VIEW
                        </button>
                      ) : col.key === "patientType" ? (
                        <span className="text-xs font-medium text-gray-600">
                          {formatCell(row[col.key], emptyCellLabel)}
                        </span>
                      ) : (
                        formatCell(row[col.key], emptyCellLabel)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="bg-white py-8 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function formatCell(value: unknown, emptyLabel: string): string {
  if (value === null || value === undefined || value === "") return emptyLabel;
  return String(value);
}

export default CategoryMedicalTable;
