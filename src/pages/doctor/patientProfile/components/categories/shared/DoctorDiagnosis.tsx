import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  setPendingDiagnosis,
  subscribeDiagnosisFormClear,
  useMedicalTable,
} from "../../../hooks/useMedicalTable";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import {
  ICD_DIAGNOSIS_LOOKUP,
  type DiagnosisLookupOption,
} from "../../../config/diagnosisFieldOptions";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "../../../lib/formFieldStyles";

const ICD_SELECT_PLACEHOLDER =
  "Select Diagnoses (select multiple if applicable)";

const diagnosisTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "diagnosis", label: "DIAGNOSIS" },
  { key: "doctor", label: "DOCTOR" },
];

export default function DoctorDiagnosis() {
  const { history } = useMedicalTable("DIAGNOSIS");
  const [icdDiagnosis, setIcdDiagnosis] = useState(false);
  const [openText, setOpenText] = useState("");
  const [icdSelections, setIcdSelections] = useState<DiagnosisLookupOption[]>(
    []
  );
  const [icdSearch, setIcdSearch] = useState("");
  const [icdDropdownOpen, setIcdDropdownOpen] = useState(false);
  const icdDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (icdDiagnosis) {
      if (icdSelections.length === 0) {
        setPendingDiagnosis(null);
        return;
      }

      setPendingDiagnosis({
        diagnosis: icdSelections.map((item) => item.label).join("; "),
        icdDiagnosis: "YES",
      });
      return;
    }

    const value = openText.trim();
    if (!value) {
      setPendingDiagnosis(null);
      return;
    }

    setPendingDiagnosis({
      diagnosis: value,
      icdDiagnosis: "NO",
    });
  }, [icdDiagnosis, openText, icdSelections]);

  useEffect(() => {
    return subscribeDiagnosisFormClear(() => {
      setOpenText("");
      setIcdSelections([]);
      setIcdSearch("");
      setIcdDropdownOpen(false);
    });
  }, []);

  const filteredIcdOptions = useMemo(() => {
    const query = icdSearch.trim().toLowerCase();
    if (!query) return ICD_DIAGNOSIS_LOOKUP;
    return ICD_DIAGNOSIS_LOOKUP.filter(
      (option) =>
        option.label.toLowerCase().includes(query) ||
        option.diagnosisText.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
    );
  }, [icdSearch]);

  useEffect(() => {
    if (!icdDropdownOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        icdDropdownRef.current &&
        !icdDropdownRef.current.contains(event.target as Node)
      ) {
        setIcdDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [icdDropdownOpen]);

  const handleIcdToggle = () => {
    setIcdDiagnosis((prev) => !prev);
    setOpenText("");
    setIcdSelections([]);
    setIcdSearch("");
    setIcdDropdownOpen(false);
  };

  const toggleIcdSelection = (option: DiagnosisLookupOption) => {
    setIcdSelections((prev) => {
      const exists = prev.some((item) => item.value === option.value);
      if (exists) {
        return prev.filter((item) => item.value !== option.value);
      }
      return [...prev, option];
    });
  };

  const removeIcdSelection = (value: string) => {
    setIcdSelections((prev) => prev.filter((item) => item.value !== value));
  };

  return (
    <div className="space-y-6 overflow-visible">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
          Diagnosis
        </h3>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <span>ICD Diagnosis</span>
          <button
            type="button"
            role="switch"
            aria-checked={icdDiagnosis}
            onClick={handleIcdToggle}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              icdDiagnosis ? "bg-[#573FD1]" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                icdDiagnosis && "translate-x-5"
              )}
            />
          </button>
        </div>
      </div>

      <div className={`${formFieldGridClass} overflow-visible`}>
        <div className="col-span-2 space-y-4 overflow-visible">
          {icdDiagnosis && (
            <div
              ref={icdDropdownRef}
              className={cn("relative", icdDropdownOpen && "z-10")}
            >
              <button
                type="button"
                aria-expanded={icdDropdownOpen}
                onClick={() => setIcdDropdownOpen((prev) => !prev)}
                className={cn(
                  formFieldSelectClass,
                  "relative flex w-full items-center justify-between pr-10 text-left",
                  icdDropdownOpen && "border-[#573FD1] ring-1 ring-[#573FD1]"
                )}
              >
                <span className="truncate text-gray-500">
                  {ICD_SELECT_PLACEHOLDER}
                </span>
                <ChevronDown
                  className={cn(
                    "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform",
                    icdDropdownOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>

              {icdDropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-lg">
                  <div className="border-b border-gray-100 p-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={icdSearch}
                        onChange={(e) => setIcdSearch(e.target.value)}
                        placeholder="Start typing to search for diagnoses."
                        className={`${formFieldInputClass} !h-10 !pr-10`}
                        autoFocus
                      />
                      <Search
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                        aria-hidden
                      />
                    </div>
                  </div>
                  <ul className="max-h-52 overflow-y-auto py-1">
                    {filteredIcdOptions.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-gray-500">
                        No diagnosis found
                      </li>
                    ) : (
                      filteredIcdOptions.map((option) => {
                        const selected = icdSelections.some(
                          (item) => item.value === option.value
                        );
                        return (
                          <li key={option.value}>
                            <button
                              type="button"
                              onClick={() => toggleIcdSelection(option)}
                              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                            >
                              <input
                                type="checkbox"
                                readOnly
                                tabIndex={-1}
                                checked={selected}
                                className="pointer-events-none h-4 w-4 shrink-0 accent-[#573FD1]"
                                aria-hidden
                              />
                              <span className="text-gray-800">
                                {option.label}
                              </span>
                            </button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="relative z-0">
            {icdDiagnosis ? (
              <div
                className={`${formFieldTextareaClass} min-h-[140px] !resize-none`}
              >
                {icdSelections.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    Selected diagnoses will appear here
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {icdSelections.map((item) => (
                      <span
                        key={item.value}
                        className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-gray-200/80 px-2 py-1 text-sm text-gray-800"
                      >
                        <span className="max-w-[280px] truncate">
                          {item.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeIcdSelection(item.value)}
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-gray-300 hover:text-gray-900"
                          aria-label={`Remove ${item.label}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <textarea
                rows={6}
                value={openText}
                onChange={(e) => setOpenText(e.target.value)}
                placeholder="Enter diagnosis..."
                className={`${formFieldTextareaClass} min-h-[140px]`}
              />
            )}
          </div>
        </div>
      </div>

      <CategoryMedicalTable
        title="DIAGNOSIS"
        columns={diagnosisTableColumns}
        rows={history}
        emptyMessage="No diagnosis recorded yet."
      />
    </div>
  );
}
