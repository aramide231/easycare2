import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import {
  getSectionTableRows,
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

type Props = {
  sectionLabel: string;
};

function buildColumns(sectionLabel: string, rows: Record<string, string>[]) {
  const preferred = [
    "sn",
    "dateTime",
    "patientType",
    "enteredBy",
    "doctor",
    "medication",
    "amount",
    "remark",
    "dispensedBy",
    "diagnosis",
    "complaint",
    "findings",
    "investigation",
    "procedure",
    "notes",
  ];

  const keys = new Set<string>();
  preferred.forEach((key) => keys.add(key));
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!["id"].includes(key)) keys.add(key);
    });
  });

  const ordered = preferred.filter((key) =>
    rows.some((row) => key in row) || ["sn", "dateTime", "patientType"].includes(key),
  );

  const extras = [...keys].filter((key) => !ordered.includes(key));

  return [...ordered, ...extras].slice(0, 8).map((key) => ({
    key,
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase())
      .toUpperCase(),
  }));
}

/** Table-only clinician documentation review for nurse module. */
export default function ReadOnlySectionTable({ sectionLabel }: Props) {
  useMedicalTable(sectionLabel);
  const rows = getSectionTableRows(sectionLabel);

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle(sectionLabel)}
      columns={buildColumns(sectionLabel, rows)}
      rows={rows}
      emptyMessage="No clinician documentation recorded yet."
    />
  );
}
