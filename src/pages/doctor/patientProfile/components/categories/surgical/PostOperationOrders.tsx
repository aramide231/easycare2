import { useCallback, useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import { formFieldTextareaClass } from "../../../lib/formFieldStyles";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import Medication from "../shared/Medication";

const ordersTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "ordersNote", label: "POST OPERATIVE ORDERS" },
  { key: "enteredBy", label: "ENTERED BY" },
];

/** Post-op orders: the shared Medication workflow, with the orders box underneath. */
export default function PostOperationOrders() {
  const [ordersNote, setOrdersNote] = useState("");
  const { history } = useMedicalTable("POST-OPERATION ORDERS");

  const clearForm = useCallback(() => setOrdersNote(""), []);

  usePendingCategoryDraft(
    "POST-OPERATION ORDERS",
    () => (ordersNote.trim() ? { ordersNote: ordersNote.trim() } : null),
    [ordersNote],
    clearForm
  );

  return (
    <div className="space-y-6 text-sm">
      <Medication />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Post Operative Orders
        </label>
        <textarea
          value={ordersNote}
          onChange={(e) => setOrdersNote(e.target.value)}
          className={`${formFieldTextareaClass} min-h-[140px]`}
          placeholder="-Input text here-"
          rows={5}
        />
      </div>

      <CategoryMedicalTable
        title="POST-OPERATION ORDERS DETAILS"
        columns={ordersTableColumns}
        rows={history}
        emptyMessage="No post-operation orders recorded yet."
        wrapColumns={["ordersNote"]}
      />
    </div>
  );
}
