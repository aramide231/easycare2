import { useMemo } from "react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const procedureHistoryColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "procedure", label: "PROCEDURE" },
  { key: "price", label: "PRICE" },
  { key: "remarks", label: "REMARKS" },
  { key: "doctor", label: "DOCTOR" },
];

/** Nurse table-only view of clinician procedure records. */
export default function ProcedureTableOnly() {
  const { history } = useMedicalTable("PROCEDURE");

  const rows = useMemo(
    () =>
      history.flatMap((row, rowIndex) => {
        const payload = row as Record<string, unknown>;
        const items = payload.procedures;

        if (Array.isArray(items)) {
          return items.map((item, index) => {
            const entry = item as Record<string, unknown>;
            return {
              sn: index + 1,
              dateTime: payload.dateTime,
              patientType: payload.patientType,
              procedure: entry.name ?? entry.procedure ?? "—",
              price: entry.amount ?? entry.price ?? payload.price ?? "—",
              remarks: entry.remarks ?? payload.remarks ?? "—",
              doctor: payload.doctor ?? "—",
            };
          });
        }

        return [
          {
            sn: rowIndex + 1,
            dateTime: payload.dateTime,
            patientType: payload.patientType,
            procedure: payload.procedure ?? "—",
            price: payload.price ?? "—",
            remarks: payload.remarks ?? "—",
            doctor: payload.doctor ?? "—",
          },
        ];
      }),
    [history],
  );

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("PROCEDURE")}
      columns={procedureHistoryColumns}
      rows={rows}
    />
  );
}
