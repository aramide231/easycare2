import { useMemo } from "react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const investigationTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "investigation", label: "INVESTIGATION" },
  { key: "amount", label: "AMOUNT" },
  { key: "remarks", label: "REMARKS" },
];

/** Nurse table-only view of clinician investigation records. */
export default function InvestigationTableOnly() {
  const { history } = useMedicalTable("INVESTIGATION");

  const rows = useMemo(
    () =>
      history.flatMap((row, rowIndex) => {
        const payload = row as Record<string, unknown>;
        const items = payload.investigations;

        if (Array.isArray(items)) {
          return items.map((item, index) => {
            const entry = item as Record<string, unknown>;
            return {
              sn: index + 1,
              dateTime: payload.dateTime,
              patientType: payload.patientType,
              investigation: entry.name ?? entry.investigation ?? "—",
              amount: entry.amount ?? payload.amount ?? "—",
              remarks: entry.remarks ?? payload.remarks ?? "—",
            };
          });
        }

        return [
          {
            sn: rowIndex + 1,
            dateTime: payload.dateTime,
            patientType: payload.patientType,
            investigation: payload.investigation ?? "—",
            amount: payload.amount ?? "—",
            remarks: payload.remarks ?? "—",
          },
        ];
      }),
    [history],
  );

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("INVESTIGATION")}
      columns={investigationTableColumns}
      rows={rows}
    />
  );
}
