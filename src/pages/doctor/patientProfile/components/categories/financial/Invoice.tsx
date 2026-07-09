import { useCallback, useState } from "react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import {
  formFieldGridClass,
  formFieldInputClass,
} from "../../../lib/formFieldStyles";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import NairaAmountInput from "../../category/NairaAmountInput";

const columns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "invoiceNo", label: "INVOICE NO" },
  { key: "description", label: "DESCRIPTION" },
  { key: "amount", label: "AMOUNT" },
  { key: "status", label: "STATUS" },
];

export default function Invoice() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const { history } = useMedicalTable("INVOICE");

  const clearForm = useCallback(() => {
    setDescription("");
    setAmount("");
  }, []);

  usePendingCategoryDraft(
    "INVOICE",
    () => {
      if (!description.trim() || !amount.trim()) return null;
      return {
        description: description.trim(),
        amount,
      };
    },
    [description, amount],
    clearForm
  );

  return (
    <div className="space-y-6">
      <div className={formFieldGridClass}>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className={formFieldInputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <NairaAmountInput value={amount} onChange={setAmount} />
        </div>
      </div>

      <CategoryMedicalTable
        title={categoryDetailsTitle("INVOICE")}
        columns={columns}
        rows={history}
      />
    </div>
  );
}
