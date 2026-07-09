import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import {
  INTERVAL_OPTIONS,
  MEDICATION_LOOKUP,
  PERIOD_OPTIONS,
  calculateMedicationLineAmount,
  calculateMedicationQuantity,
  formatMedicationDisplayName,
  formatMedicationNaira,
  getIntervalLabel,
  getPeriodLabel,
  isEditableQuantityForm,
  isUnitQuantityForm,
  type MedicationLookupOption,
} from "../../../data/medicationLookup";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import NumberedSummaryList from "../../category/NumberedSummaryList";
import NairaAmountInput from "../../category/NairaAmountInput";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "../../../lib/formFieldStyles";

/** Row 1: Med (wide) + Strength. Rows 2–3: three equal columns per sketch. */
const MEDICATION_ENTRY_GRID_CLASS =
  "grid w-full grid-cols-1 items-end gap-4 lg:grid-cols-3";

const ADMIN_ROUTE_OPTIONS = [
  "Oral",
  "Intramuscular",
  "Intravenous",
  "Subcutaneous",
  "Topical",
  "Sublingual",
  "Rectal",
  "Inhalation",
];

const medicationDetailsColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "medication", label: "MEDICATION" },
  { key: "adminRoute", label: "ADMIN ROUTE" },
  { key: "dosage", label: "DOSAGE" },
];

type PickedMedication = {
  id: string;
  medication: string;
  strength: string;
  drugForm: string;
  adminRoute: string;
  dosage: string;
  interval: string;
  period: string;
  quantity: number;
  sellingPrice: number;
  lineTotal: number;
};

type MedForm = {
  medication: string;
  strength: string;
  drugForm: string;
  sellingPrice: number | null;
  adminRoute: string;
  dosage: string;
  interval: string;
  period: string;
};

const EMPTY_FORM: MedForm = {
  medication: "",
  strength: "",
  drugForm: "",
  sellingPrice: null,
  adminRoute: "",
  dosage: "",
  interval: "",
  period: "",
};

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "-Select an Option-",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${formFieldSelectClass} pr-10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-600`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          aria-hidden
        />
      </div>
    </div>
  );
}

function formatPickedPrescriptionLine(item: PickedMedication): string {
  return [
    item.medication,
    item.adminRoute,
    item.dosage,
    item.interval,
    item.period,
  ]
    .filter(Boolean)
    .join(" × ");
}

function isPrescriptionCompleteForCalculation(form: MedForm): boolean {
  return (
    Boolean(form.dosage.trim()) &&
    Boolean(form.interval) &&
    Boolean(form.period)
  );
}

function hasCatalogMedicationPick(form: MedForm): boolean {
  return (
    Boolean(form.medication.trim()) &&
    form.sellingPrice !== null &&
    form.sellingPrice > 0
  );
}

function isMedicationEntryComplete(
  form: MedForm,
  quantity: number,
  amount: number
): boolean {
  return (
    hasCatalogMedicationPick(form) &&
    Boolean(form.strength.trim()) &&
    Boolean(form.adminRoute) &&
    Boolean(form.dosage.trim()) &&
    Boolean(form.interval) &&
    Boolean(form.period) &&
    quantity > 0 &&
    amount > 0
  );
}

function applyLookupToForm(
  option: MedicationLookupOption,
  prev: MedForm
): MedForm {
  return {
    ...prev,
    medication: option.name,
    strength: option.strength,
    drugForm: option.form,
    sellingPrice: option.sellingPrice,
  };
}

/** Clinician medication workflow — Ante Natal / Post Natal / Gen Consult / Immunization. */
export default function Medication() {
  const [medForm, setMedForm] = useState<MedForm>({ ...EMPTY_FORM });
  const [picked, setPicked] = useState<PickedMedication[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quantityInput, setQuantityInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { history: medicationHistory } = useMedicalTable("MEDICATION");

  const filteredOptions = useMemo(() => {
    const query = medForm.medication.trim().toLowerCase();
    if (!query) return MEDICATION_LOOKUP;
    return MEDICATION_LOOKUP.filter((option) =>
      option.name.toLowerCase().includes(query)
    );
  }, [medForm.medication]);

  const prescriptionComplete = isPrescriptionCompleteForCalculation(medForm);

  const computedQuantity = useMemo(() => {
    if (!prescriptionComplete) return 0;
    return calculateMedicationQuantity(
      medForm.dosage,
      medForm.interval,
      medForm.period,
      medForm.drugForm,
      medForm.medication
    );
  }, [
    prescriptionComplete,
    medForm.dosage,
    medForm.interval,
    medForm.period,
    medForm.drugForm,
    medForm.medication,
  ]);

  const computedAmount = useMemo(() => {
    if (!prescriptionComplete || medForm.sellingPrice === null) return 0;
    return calculateMedicationLineAmount(
      medForm.sellingPrice,
      medForm.dosage,
      medForm.interval,
      medForm.period,
      medForm.drugForm,
      medForm.medication
    );
  }, [
    prescriptionComplete,
    medForm.sellingPrice,
    medForm.dosage,
    medForm.interval,
    medForm.period,
    medForm.drugForm,
    medForm.medication,
  ]);

  const medicationPicked = hasCatalogMedicationPick(medForm);

  const syrupOrCreamIfApplies = useMemo(
    () =>
      medicationPicked &&
      isUnitQuantityForm(medForm.drugForm, medForm.medication),
    [medicationPicked, medForm.drugForm, medForm.medication]
  );

  const isEditableQuantity = useMemo(
    () =>
      medicationPicked &&
      isEditableQuantityForm(medForm.drugForm, medForm.medication),
    [medicationPicked, medForm.drugForm, medForm.medication]
  );

  useEffect(() => {
    if (isEditableQuantity) {
      setQuantityInput((prev) => (prev === "" ? "1" : prev));
    } else {
      setQuantityInput("");
    }
  }, [isEditableQuantity]);

  const manualQuantity = Number.parseInt(quantityInput, 10);
  const effectiveQuantity = isEditableQuantity
    ? Number.isFinite(manualQuantity) && manualQuantity > 0
      ? manualQuantity
      : 0
    : computedQuantity;
  const effectiveAmount = isEditableQuantity
    ? medForm.sellingPrice !== null && effectiveQuantity > 0
      ? medForm.sellingPrice * effectiveQuantity
      : 0
    : computedAmount;

  const canAddMedication = isMedicationEntryComplete(
    medForm,
    effectiveQuantity,
    effectiveAmount
  );

  const hasIncompleteMedicationEntry =
    medicationPicked &&
    !isMedicationEntryComplete(medForm, effectiveQuantity, effectiveAmount);

  const totalAmount = picked.reduce((sum, item) => sum + item.lineTotal, 0);

  const updateField = (name: keyof MedForm, value: string) => {
    setMedForm((prev) => {
      const next: MedForm = { ...prev, [name]: value };

      if (name === "medication") {
        const exactMatch = MEDICATION_LOOKUP.find(
          (option) => option.name.toLowerCase() === value.trim().toLowerCase()
        );
        if (exactMatch) {
          return applyLookupToForm(exactMatch, next);
        }
        next.drugForm = "";
        next.sellingPrice = null;
      }

      return next;
    });
  };

  const handleMedicationSearch = (value: string) => {
    setDropdownOpen(true);
    updateField("medication", value);
  };

  const handleSelectMedication = (option: MedicationLookupOption) => {
    setMedForm((prev) => applyLookupToForm(option, prev));
    setDropdownOpen(false);
  };

  const clearEntryFields = useCallback(() => {
    setMedForm({ ...EMPTY_FORM });
    setQuantityInput("");
    setDropdownOpen(false);
  }, []);

  const addMedication = () => {
    if (!canAddMedication || medForm.sellingPrice === null) return;

    const displayName = formatMedicationDisplayName(
      medForm.medication,
      medForm.strength
    );

    const dispenseQty = effectiveQuantity;
    const lineTotal = effectiveAmount;

    setPicked((prev) => [
      ...prev,
      {
        id: `medication-${Date.now()}`,
        medication: displayName,
        strength: medForm.strength.trim(),
        drugForm: medForm.drugForm,
        adminRoute: medForm.adminRoute,
        dosage: medForm.dosage,
        interval: getIntervalLabel(medForm.interval),
        period: getPeriodLabel(medForm.period),
        quantity: dispenseQty,
        sellingPrice: medForm.sellingPrice,
        lineTotal,
      },
    ]);

    clearEntryFields();
  };

  const removeMedication = (id: string) => {
    setPicked((prev) => prev.filter((item) => item.id !== id));
  };

  const clearForm = useCallback(() => {
    setPicked([]);
    clearEntryFields();
  }, [clearEntryFields]);

  usePendingCategoryDraft(
    "MEDICATION",
    () => {
      const payload =
        picked.length > 0
          ? {
              __payload__: JSON.stringify({
                medications: picked.map(({ id: _id, ...item }) => item),
                totalAmount,
              }),
            }
          : null;

      if (hasIncompleteMedicationEntry) {
        return {
          ...(payload ?? {}),
          __incomplete__: "true",
        };
      }

      return payload;
    },
    [picked, totalAmount, hasIncompleteMedicationEntry],
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

  const historyRows = useMemo(
    () =>
      medicationHistory.flatMap((row, rowIndex) => {
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
          },
        ];
      }),
    [medicationHistory]
  );

  return (
    <div className="space-y-6 text-sm">
      <div className={MEDICATION_ENTRY_GRID_CLASS}>
        <div
          ref={dropdownRef}
          className="relative min-w-0 lg:col-span-2"
        >
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Medication
          </label>
          <input
            type="text"
            value={medForm.medication}
            onChange={(e) => handleMedicationSearch(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
            onClick={() => setDropdownOpen(true)}
            placeholder="Type or select medication"
            className={formFieldInputClass}
          />

          {dropdownOpen && (
            <ul className="absolute left-0 right-0 top-full z-30 mt-1 max-h-52 overflow-y-auto rounded-[8px] border border-gray-200 bg-white py-1 shadow-lg">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500">
                  No medication found
                </li>
              ) : (
                filteredOptions.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectMedication(option)}
                      className="w-full px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                    >
                      <span className="block truncate text-gray-800">
                        {formatMedicationDisplayName(
                          option.name,
                          option.strength
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs text-gray-500">
                        {formatMedicationNaira(option.sellingPrice)}
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
            Strength
          </label>
          <input
            type="text"
            value={medForm.strength}
            onChange={(e) => updateField("strength", e.target.value)}
            placeholder="e.g. 500MG / 1G"
            disabled={!medicationPicked}
            className={`${formFieldInputClass} disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-600`}
          />
        </div>

        <div className="min-w-0">
          <SelectField
            label="Admin Route(s)"
            value={medForm.adminRoute}
            onChange={(value) => updateField("adminRoute", value)}
            disabled={!medicationPicked}
            options={ADMIN_ROUTE_OPTIONS.map((route) => ({
              value: route,
              label: route,
            }))}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Dosage
          </label>
          <input
            type="text"
            value={medForm.dosage}
            onChange={(e) => updateField("dosage", e.target.value)}
            disabled={!medicationPicked}
            className={`${formFieldInputClass} disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-600`}
          />
        </div>

        <div className="min-w-0">
          <SelectField
            label="Interval(s)"
            value={medForm.interval}
            onChange={(value) => updateField("interval", value)}
            disabled={!medicationPicked}
            options={INTERVAL_OPTIONS.map((interval) => ({
              value: interval.value,
              label: interval.label,
            }))}
          />
        </div>

        <div className="min-w-0">
          <SelectField
            label="Period (Days)"
            value={medForm.period}
            onChange={(value) => updateField("period", value)}
            disabled={!medicationPicked}
            options={PERIOD_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            placeholder="Select period"
          />
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Quantity (Qty)
          </label>
          {isEditableQuantity ? (
            <input
              type="text"
              inputMode="numeric"
              value={quantityInput}
              onChange={(e) =>
                setQuantityInput(e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="Enter quantity"
              className={formFieldInputClass}
            />
          ) : (
            <input
              type="text"
              readOnly
              value={computedQuantity > 0 ? String(computedQuantity) : ""}
              placeholder={
                syrupOrCreamIfApplies ? "1 (Syrup/Cream)" : "Auto-calculated"
              }
              className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
            />
          )}
        </div>

        <div className="flex min-w-0 items-end gap-2">
          <div className="min-w-0 flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Amount
            </label>
            <NairaAmountInput
              readOnly
              value={effectiveAmount > 0 ? String(effectiveAmount) : ""}
            />
          </div>
          <button
            type="button"
            onClick={addMedication}
            disabled={!canAddMedication}
            title={
              medicationPicked && !canAddMedication
                ? "Complete Strength, Admin Route, Dosage, Interval, and Period before adding"
                : undefined
            }
            className="h-[45px] shrink-0 whitespace-nowrap rounded-lg bg-[#573FD1] px-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Medication
          </button>
        </div>
      </div>

      {picked.length > 0 && (
        <div className="space-y-2">
          <NumberedSummaryList
            items={picked.map((item) => ({
              id: item.id,
              text: formatPickedPrescriptionLine(item),
              meta: `Qty ${item.quantity}`,
              metaRight: formatMedicationNaira(item.lineTotal),
            }))}
            onRemove={removeMedication}
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
        title={categoryDetailsTitle("MEDICATION")}
        columns={medicationDetailsColumns}
        rows={historyRows}
        emptyMessage="No medication records yet."
      />
    </div>
  );
}
