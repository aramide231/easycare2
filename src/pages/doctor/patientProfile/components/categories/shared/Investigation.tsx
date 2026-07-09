import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import {
  INVESTIGATION_LOOKUP,
  formatInvestigationNaira,
  type InvestigationLookupOption,
} from "../../../data/investigationLookup";
import {
  buildBatchPendingEntry,
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import { useMedicalRemarkView } from "../../../hooks/useMedicalRemarkView";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import InvestigationResultContent from "../../category/InvestigationResultContent";
import MedicalRemarkViewPanel, {
  rowHasUploadedResult,
} from "../../category/MedicalRemarkViewPanel";
import NumberedSummaryList from "../../category/NumberedSummaryList";
import NairaAmountInput, {
  parseAmountDigits,
} from "../../category/NairaAmountInput";
import {
  formFieldGridClass,
  formFieldInputClass,
} from "../../../lib/formFieldStyles";

const investigationTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "investigation", label: "INVESTIGATION" },
  { key: "amount", label: "AMOUNT" },
  { key: "remarks", label: "REMARKS" },
];

const TABLE_KEY = "INVESTIGATION";

type SelectedInvestigation = {
  id: string;
  name: string;
  amount: number;
};

type Props = {
  fieldLayout?: "wide-investigation";
};

export default function Investigation({ fieldLayout }: Props) {
  const [search, setSearch] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [picked, setPicked] = useState<SelectedInvestigation[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { history } = useMedicalTable(TABLE_KEY);
  const remarkView = useMedicalRemarkView();

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return INVESTIGATION_LOOKUP;
    return INVESTIGATION_LOOKUP.filter((option) =>
      option.name.toLowerCase().includes(query)
    );
  }, [search]);

  const entryAmount = parseAmountDigits(amountInput);
  const totalAmount = picked.reduce((sum, item) => sum + item.amount, 0);
  const canAddInvestigation = Boolean(search.trim()) && entryAmount !== null;

  const clearEntryFields = useCallback(() => {
    setSearch("");
    setAmountInput("");
    setDropdownOpen(false);
  }, []);

  const clearForm = useCallback(() => {
    setPicked([]);
    clearEntryFields();
  }, [clearEntryFields]);

  usePendingCategoryDraft(
    TABLE_KEY,
    () => {
      if (picked.length === 0) return null;
      return buildBatchPendingEntry(
        picked.map((item) => ({
          investigation: item.name,
          amount: String(item.amount),
          hasResult: "false",
        }))
      );
    },
    [picked],
    clearForm
  );

  useEffect(() => {
    if (!dropdownOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [dropdownOpen]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setDropdownOpen(true);

    const exactMatch = INVESTIGATION_LOOKUP.find(
      (option) => option.name.toLowerCase() === value.trim().toLowerCase()
    );
    if (exactMatch) {
      setAmountInput(String(exactMatch.amount));
    }
  };

  const handleSelectOption = (option: InvestigationLookupOption) => {
    setSearch(option.name);
    setAmountInput(String(option.amount));
    setDropdownOpen(false);
  };

  const handleAddInvestigation = () => {
    const name = search.trim();
    if (!name || entryAmount === null) return;

    setPicked((prev) => [
      ...prev,
      {
        id: `investigation-${Date.now()}`,
        name,
        amount: entryAmount,
      },
    ]);
    clearEntryFields();
  };

  const removeInvestigation = (id: string) => {
    setPicked((prev) => prev.filter((item) => item.id !== id));
  };

  const tableRows = history.map((row) => ({
    ...row,
    remarks: "VIEW",
  }));

  const isWideInvestigation = fieldLayout === "wide-investigation";

  const entryRowClass = isWideInvestigation
    ? "grid w-full grid-cols-1 items-end gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(140px,2fr)_auto]"
    : `${formFieldGridClass} items-end lg:grid-cols-[minmax(0,1fr)_minmax(140px,0.75fr)_auto]`;

  return (
    <div className="space-y-6">
      <div className={entryRowClass}>
        <div
          ref={dropdownRef}
          className={`relative min-w-0 ${isWideInvestigation ? "" : "col-span-2 lg:col-span-1"}`}
        >
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Investigation
          </label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setDropdownOpen(true)}
              placeholder="Type or select investigation"
              className={`${formFieldInputClass} pr-10`}
            />
            <Search
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
          </div>

          {dropdownOpen && (
            <ul className="absolute left-0 right-0 top-full z-30 mt-1 max-h-52 overflow-y-auto rounded-[8px] border border-gray-200 bg-white py-1 shadow-lg">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500">
                  No investigation found
                </li>
              ) : (
                filteredOptions.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                    >
                      <span className="text-gray-800">{option.name}</span>
                      <span className="shrink-0 text-gray-500">
                        {formatInvestigationNaira(option.amount)}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <NairaAmountInput
            value={amountInput}
            onChange={setAmountInput}
          />
        </div>

        <button
          type="button"
          onClick={handleAddInvestigation}
          disabled={!canAddInvestigation}
          className="h-[45px] whitespace-nowrap rounded-lg bg-[#573FD1] px-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Investigation
        </button>
      </div>

      {picked.length > 0 && (
        <div className="space-y-2">
          <NumberedSummaryList
            items={picked.map((item) => ({
              id: item.id,
              text: item.name,
              meta: formatInvestigationNaira(item.amount),
            }))}
            onRemove={removeInvestigation}
          />

          <div className="flex justify-end">
            <div className="w-full max-w-xs">
              <label className="mb-1 block text-right text-sm font-medium text-gray-700">
                Total Amount
              </label>
              <NairaAmountInput
                readOnly
                value={String(totalAmount)}
                className="text-right font-semibold text-gray-900"
              />
            </div>
          </div>
        </div>
      )}

      <CategoryMedicalTable
        title={categoryDetailsTitle("INVESTIGATION")}
        columns={investigationTableColumns}
        rows={tableRows}
        linkColumns={["remarks"]}
        onLinkClick={(row) => remarkView.openRow(row)}
      />

      <MedicalRemarkViewPanel
        open={remarkView.isOpen}
        onClose={remarkView.close}
        title="Investigation Results"
        subtitle={
          remarkView.selectedRow
            ? String(remarkView.selectedRow.investigation ?? "")
            : undefined
        }
        hasResult={
          remarkView.selectedRow
            ? rowHasUploadedResult(remarkView.selectedRow)
            : false
        }
      >
        {remarkView.selectedRow ? (
          <InvestigationResultContent
            investigationName={String(remarkView.selectedRow.investigation ?? "")}
            dateTime={String(remarkView.selectedRow.dateTime ?? "")}
          />
        ) : null}
      </MedicalRemarkViewPanel>
    </div>
  );
}
