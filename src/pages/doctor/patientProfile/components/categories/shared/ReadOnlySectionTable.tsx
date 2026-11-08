import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { genConsultVitalTableColumns } from "../../../config/clinicalVitalFields";
import {
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import InvestigationReview from "./InvestigationReview";
import MedicationDispenseTable from "./MedicationDispenseTable";

type Props = {
  sectionLabel: string;
  tableKey?: string;
};

function buildColumns(sectionLabel: string, rows: Record<string, unknown>[]) {
  if (sectionLabel === "VITAL SIGNS") {
    return genConsultVitalTableColumns;
  }

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

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!["id", "committedAt", "createdAtMs"].includes(key) && !key.startsWith("__")) {
        keys.add(key);
      }
    });
  });

  const ordered = preferred.filter((key) =>
    rows.some((row) => key in row) || ["sn", "dateTime", "patientType"].includes(key),
  );

  const extras = [...keys].filter((key) => !ordered.includes(key));

  return [...ordered, ...extras].map((key) => ({
    key,
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase())
      .toUpperCase(),
  }));
}

/** Table-only clinician documentation review for nurse module. */
export default function ReadOnlySectionTable({ sectionLabel, tableKey = sectionLabel }: Props) {
  const { history } = useMedicalTable(tableKey);
  const rows = sectionLabel === "MEDICATION" ? history.flatMap((row) => {
    const { medications, ...visit } = row;
    return Array.isArray(medications) ? medications.map((med) => ({ ...visit, ...med })) : [row];
  }) : history;

  if (sectionLabel === "INVESTIGATION") {
    return <InvestigationReview tableKey={tableKey} />;
  }

  if (sectionLabel === "MEDICATION") {
    return <MedicationDispenseTable />;
  }

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle(sectionLabel)}
      columns={buildColumns(sectionLabel, rows)}
      rows={rows}
      emptyMessage="No clinician documentation recorded yet."
    />
  );
}
