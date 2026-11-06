import { useMedicalTable } from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";

const nursingDispenseColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "medication", label: "MEDICATION" },
  { key: "quantity", label: "QTY" },
  { key: "amount", label: "AMOUNT" },
  { key: "remark", label: "REMARK" },
  { key: "dispensedBy", label: "DISPENSED BY" },
];

export default function NurseDispenseHistory() {
  const { history } = useMedicalTable("NURSING DISPENSES");
  const groups = new Map<string, typeof history>();
  for (const row of history) {
    const month = row.committedAt ? new Date(Number(row.committedAt)).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "Earlier records";
    groups.set(month, [...(groups.get(month) ?? []), row]);
  }
  if (!groups.size) return <p>No nursing dispense records yet.</p>;
  return <div className="space-y-5">{Array.from(groups).reverse().map(([month, rows]) => (
    <section key={month}>
      <CategoryMedicalTable title={month} columns={nursingDispenseColumns} rows={rows.map((row) => ({
        ...row,
        medication: row.medication ?? row.item,
        remark: row.remark ?? row.notes,
        dispensedBy: row.dispensedBy ?? row.nurse,
      }))} />
      <p className="mt-2 font-semibold">Total amount: {rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</p>
    </section>
  ))}</div>;
}
