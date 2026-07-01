import CategoryMedicalTable from "@/pages/doctor/patientProfile/components/category/CategoryMedicalTable";
import type { CategoryTableColumn } from "@/pages/doctor/patientProfile/config/categoryFieldTypes";

type Props = {
  title: string;
  columns: string[] | CategoryTableColumn[];
  rows: string[][] | Record<string, unknown>[];
};

const ExpandedCategoryTable = ({ title, columns, rows }: Props) => {
  const tableColumns: CategoryTableColumn[] = columns.map((col, index) =>
    typeof col === "string" ? { key: String(index), label: col } : col
  );

  const tableRows: Record<string, unknown>[] =
    rows.length > 0 && Array.isArray(rows[0])
      ? (rows as string[][]).map((row) =>
          Object.fromEntries(row.map((cell, i) => [String(i), cell]))
        )
      : (rows as Record<string, unknown>[]);

  return (
    <CategoryMedicalTable
      title={title}
      columns={tableColumns}
      rows={tableRows}
    />
  );
};

export default ExpandedCategoryTable;
