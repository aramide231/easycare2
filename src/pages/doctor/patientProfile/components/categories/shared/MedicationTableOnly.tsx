import { useMemo } from "react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const medicationDetailsColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "medication", label: "MEDICATION" },
  { key: "adminRoute", label: "ADMIN ROUTE" },
  { key: "dosage", label: "DOSAGE" },
  { key: "interval", label: "INTERVAL" },
  { key: "period", label: "PERIOD" },
  { key: "quantity", label: "QTY" },
];

/** Nurse table-only view of clinician medication records. */
export default function MedicationTableOnly() {
  const { history } = useMedicalTable("MEDICATION");

  const rows = useMemo(
    () =>
      history.flatMap((row, rowIndex) => {
        const payload = row as Record<string, unknown>;
        const meds = payload.medications;

        if (Array.isArray(meds)) {
          return meds.map((med, index) => {
            const item = med as Record<string, unknown>;
            return {
              sn: index + 1,
              dateTime: payload.dateTime,
              patientType: payload.patientType,
              medication: item.medication,
              adminRoute: item.adminRoute ?? "—",
              dosage: item.dosage,
              interval: item.interval ?? "—",
              period: item.period ?? "—",
              quantity: item.quantity ?? "—",
            };
          });
        }

        return [
          {
            sn: rowIndex + 1,
            dateTime: payload.dateTime,
            patientType: payload.patientType,
            medication: payload.medication,
            adminRoute: payload.adminRoute ?? "—",
            dosage: payload.dosage,
            interval: payload.interval ?? "—",
            period: payload.period ?? "—",
            quantity: payload.quantity ?? "—",
          },
        ];
      }),
    [history],
  );

  return (
    <CategoryMedicalTable
      title={categoryDetailsTitle("MEDICATION")}
      columns={medicationDetailsColumns}
      rows={rows}
    />
  );
}
