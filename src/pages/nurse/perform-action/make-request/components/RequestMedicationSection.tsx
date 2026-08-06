import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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
} from "@/pages/doctor/patientProfile/data/medicationLookup";
import NumberedSummaryList from "@/pages/doctor/patientProfile/components/category/NumberedSummaryList";
import NairaAmountInput from "@/pages/doctor/patientProfile/components/category/NairaAmountInput";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";

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

const ENTRY_GRID =
  "grid w-full grid-cols-1 items-end gap-4 lg:grid-cols-3";

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
    getIntervalLabel(item.interval),
    getPeriodLabel(item.period),
  ]
    .filter(Boolean)
    .join(" × ");
}

type Props = {
  open: boolean;
  onToggle: () => void;
  items: PickedMedication[];
  onItemsChange: (items: PickedMedication[]) => void;
};

/** Reuses clinician medication catalogue / qty / amount logic for Make Request. */
const RequestMedicationSection = ({
  open,
  onToggle,
  items,
  onItemsChange,
}: Props) => {
  const [medForm, setMedForm] = useState<MedForm>({ ...EMPTY_FORM });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quantityInput, setQuantityInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const query = medForm.medication.trim().toLowerCase();
    if (!query) return MEDICATION_LOOKUP;
    return MEDICATION_LOOKUP.filter((option) =>
      option.name.toLowerCase().includes(query),
    );
  }, [medForm.medication]);

  const prescriptionComplete =
    Boolean(medForm.dosage.trim()) &&
    Boolean(medForm.interval) &&
    Boolean(medForm.period);

  const computedQuantity = useMemo(() => {
    if (!prescriptionComplete) return 0;
    return calculateMedicationQuantity(
      medForm.dosage,
      medForm.interval,
      medForm.period,
      medForm.drugForm,
      medForm.medication,
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
      medForm.medication,
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

  const medicationPicked =
    Boolean(medForm.medication.trim()) &&
    medForm.sellingPrice !== null &&
    medForm.sellingPrice > 0;

  const isEditableQuantity =
    medicationPicked &&
    isEditableQuantityForm(medForm.drugForm, medForm.medication);

  const syrupOrCreamIfApplies =
    medicationPicked &&
    isUnitQuantityForm(medForm.drugForm, medForm.medication);

  const effectiveQuantity = isEditableQuantity
    ? Number.parseInt(quantityInput || "0", 10) || 0
    : computedQuantity;

  const effectiveAmount = isEditableQuantity
    ? (medForm.sellingPrice ?? 0) * effectiveQuantity
    : computedAmount;

  const canAdd =
    medicationPicked &&
    Boolean(medForm.strength.trim()) &&
    Boolean(medForm.adminRoute) &&
    Boolean(medForm.dosage.trim()) &&
    Boolean(medForm.interval) &&
    Boolean(medForm.period) &&
    effectiveQuantity > 0 &&
    effectiveAmount > 0;

  useEffect(() => {
    if (isEditableQuantity) {
      setQuantityInput((prev) => (prev === "" ? "1" : prev));
    } else {
      setQuantityInput("");
    }
  }, [isEditableQuantity]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const updateField = useCallback((name: keyof MedForm, value: string) => {
    setMedForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectMedication = (option: MedicationLookupOption) => {
    setMedForm((prev) => ({
      ...prev,
      medication: option.name,
      strength: option.strength,
      drugForm: option.form,
      sellingPrice: option.sellingPrice,
    }));
    setDropdownOpen(false);
  };

  const addMedication = () => {
    if (!canAdd || medForm.sellingPrice === null) return;
    onItemsChange([
      ...items,
      {
        id: `req-med-${Date.now()}`,
        medication: medForm.medication,
        strength: medForm.strength,
        drugForm: medForm.drugForm,
        adminRoute: medForm.adminRoute,
        dosage: medForm.dosage,
        interval: medForm.interval,
        period: medForm.period,
        quantity: effectiveQuantity,
        sellingPrice: medForm.sellingPrice,
        lineTotal: effectiveAmount,
      },
    ]);
    setMedForm({ ...EMPTY_FORM });
    setQuantityInput("");
  };

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-[#573FD1] px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold text-white">
          Request Medication(s)
        </span>
        <ChevronDown
          className={`h-5 w-5 text-white transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-6 p-4 sm:p-6">
          <div className={ENTRY_GRID}>
            <div ref={dropdownRef} className="relative min-w-0 lg:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Medication
              </label>
              <input
                type="text"
                value={medForm.medication}
                onChange={(e) => {
                  updateField("medication", e.target.value);
                  setMedForm((prev) => ({
                    ...prev,
                    medication: e.target.value,
                    sellingPrice: null,
                    drugForm: "",
                  }));
                  setDropdownOpen(true);
                }}
                onFocus={() => setDropdownOpen(true)}
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
                              option.strength,
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
                className={`${formFieldInputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
              />
            </div>

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

            <div className="min-w-0">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Dosage
              </label>
              <input
                type="text"
                value={medForm.dosage}
                onChange={(e) => updateField("dosage", e.target.value)}
                disabled={!medicationPicked}
                className={`${formFieldInputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
              />
            </div>

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
                disabled={!canAdd}
                className="h-[45px] shrink-0 whitespace-nowrap rounded-lg bg-[#573FD1] px-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Medication
              </button>
            </div>
          </div>

          {items.length > 0 && (
            <NumberedSummaryList
              items={items.map((item) => ({
                id: item.id,
                text: formatPickedPrescriptionLine(item),
                meta: `Qty ${item.quantity}`,
                metaRight: formatMedicationNaira(item.lineTotal),
              }))}
              onRemove={(id) =>
                onItemsChange(items.filter((item) => item.id !== id))
              }
            />
          )}
        </div>
      )}
    </section>
  );
};

export type { PickedMedication };
export default RequestMedicationSection;
