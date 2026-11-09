import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { genConsultVitalTableColumns } from "../../../config/clinicalVitalFields";
import {
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import InvestigationReview from "./InvestigationReview";
import MedicationDispenseTable from "./MedicationDispenseTable";
import Procedure from "./Procedure";

const physicalExamColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "general", label: "GENERAL" },
  { key: "cns", label: "CNS" },
  { key: "chest", label: "CHEST" },
  { key: "cvs", label: "CVS" },
  { key: "abdomen", label: "ABDOMEN" },
  { key: "dre", label: "DRE" },
  { key: "ve", label: "VE" },
  { key: "mss", label: "MSS" },
  { key: "ent", label: "ENT" },
  { key: "comments", label: "COMMENTS" },
  { key: "doctor", label: "DOCTOR" },
];

type Props = {
  sectionLabel: string;
  tableKey?: string;
  category?: string;
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
export default function ReadOnlySectionTable({
  sectionLabel,
  tableKey = sectionLabel,
  category,
}: Props) {
  const { history } = useMedicalTable(tableKey);
  const rows = sectionLabel === "MEDICATION" ? history.flatMap((row) => {
    const { medications, ...visit } = row;
    return Array.isArray(medications) ? medications.map((med) => ({ ...visit, ...med })) : [row];
  }) : history;

  if (sectionLabel === "INVESTIGATION") {
    return <InvestigationReview tableKey={tableKey} />;
  }

  if (sectionLabel === "MEDICAL IMAGING") {
    return <InvestigationReview tableKey={tableKey} noun="Imaging" />;
  }

  if (sectionLabel === "X-RAY (RADIOGRAPHY)") {
    return <InvestigationReview tableKey={tableKey} noun="X-Ray" />;
  }

  if (sectionLabel === "PROCEDURE") {
    return <Procedure nurse category={category} />;
  }

  if (sectionLabel === "PHYSICAL EXAMINATION") {
    return (
      <CategoryMedicalTable
        title={categoryDetailsTitle(sectionLabel)}
        columns={physicalExamColumns}
        rows={history}
        emptyMessage="No physical examination recorded yet."
        emptyCellLabel="nil"
        wrapColumns={["general", "cns", "chest", "cvs", "abdomen", "dre", "ve", "mss", "ent", "comments"]}
      />
    );
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
