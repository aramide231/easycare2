import { useCallback, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categoryDetailsTitle } from "../../../config/categoryFieldTypes";
import { VITAL_COMMENT_OPTIONS } from "../../../config/vitalFieldOptions";
import { useMedicalTable } from "../../../hooks/useMedicalTable";
import { usePendingCategoryDraft } from "../../../hooks/usePendingCategoryDraft";
import CategoryMedicalTable from "../../category/CategoryMedicalTable";
import NairaAmountInput, {
  sanitizeAmountDigits,
} from "../../category/NairaAmountInput";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "../../../lib/formFieldStyles";

/** Nigerian EPI-style schedule: vaccines listed under each Age-Grade. */
const VACCINES_BY_AGE_GRADE: Record<string, string[]> = {
  "At Birth": ["BCG", "Hepatitis B", "OPV"],
  "6 Weeks": ["OPV 1", "Pentavalent 1", "PCV 1", "Rotavirus 1"],
  "10 Weeks": ["OPV 2", "Pentavalent 2", "PCV 2", "Rotavirus 2"],
  "14 Weeks": ["OPV 3", "Pentavalent 3", "PCV 3", "IPV"],
  "9 Months": ["Measles", "Yellow Fever"],
};

const AGE_GRADE_OPTIONS = Object.keys(VACCINES_BY_AGE_GRADE);

const DOSAGE_OPTIONS = ["0.5 ml", "1 dose", "2 drops", "5 drops"];

const ROUTE_OPTIONS = ["Intramuscular", "Oral", "Subcutaneous", "Intradermal"];

const SITE_OPTIONS = [
  "Left Thigh",
  "Right Thigh",
  "Left Arm",
  "Right Arm",
  "Oral",
];

const vaccineDetailsColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PT TYPE" },
  { key: "ageGrade", label: "AGE GRADE" },
  { key: "vaccineType", label: "TYPE OF VACCINE" },
  { key: "dosage", label: "DOSAGE" },
];

type VaccineRow = {
  ageGrade: string;
  vaccine: string;
  dosage: string;
  route: string;
  site: string;
  amount: string;
};

const EMPTY_VACCINE_ROW: VaccineRow = {
  ageGrade: "",
  vaccine: "",
  dosage: "",
  route: "",
  site: "",
  amount: "",
};

function parseAmount(value: string): number {
  const parsed = Number(sanitizeAmountDigits(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNaira(amount: number): string {
  return `N ${amount.toLocaleString()}.00`;
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabledOptions?: string[];
  placeholder?: string;
  disabled?: boolean;
};

function SelectField({
  label,
  value,
  onChange,
  options,
  disabledOptions = [],
  placeholder = "-Select an Option-",
  disabled = false,
}: SelectFieldProps) {
  const disabledSet = useMemo(
    () => new Set(disabledOptions),
    [disabledOptions]
  );

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${formFieldSelectClass} pr-10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option
              key={option}
              value={option}
              disabled={disabledSet.has(option)}
            >
              {option}
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

const VaccineAdministration = () => {
  const [vaccineForm, setVaccineForm] = useState<Record<string, string>>({});
  const [vaccineRow, setVaccineRow] = useState<VaccineRow>({
    ...EMPTY_VACCINE_ROW,
  });
  const [vaccines, setVaccines] = useState<VaccineRow[]>([]);

  const { history: vaccineHistory } = useMedicalTable("VACCINE ADMINISTRATION");

  const selectedAgeGrade = vaccineForm.ageGrade || "";

  const vaccinesForAgeGrade = useMemo(
    () => VACCINES_BY_AGE_GRADE[selectedAgeGrade] ?? [],
    [selectedAgeGrade]
  );

  const savedVaccinesForAgeGrade = useMemo(
    () =>
      vaccines
        .filter((row) => row.ageGrade === selectedAgeGrade)
        .map((row) => row.vaccine),
    [vaccines, selectedAgeGrade]
  );

  const completedAgeGrades = useMemo(() => {
    return AGE_GRADE_OPTIONS.filter((grade) => {
      const required = VACCINES_BY_AGE_GRADE[grade] ?? [];
      if (required.length === 0) return false;
      const saved = new Set(
        vaccines.filter((row) => row.ageGrade === grade).map((row) => row.vaccine)
      );
      return required.every((vaccine) => saved.has(vaccine));
    });
  }, [vaccines]);

  const totalAmount = useMemo(
    () => vaccines.reduce((sum, row) => sum + parseAmount(row.amount), 0),
    [vaccines]
  );

  const handleAgeGradeChange = (value: string) => {
    setVaccineForm((prev) => ({ ...prev, ageGrade: value }));
    setVaccineRow((prev) => ({
      ...prev,
      ageGrade: value,
      vaccine: "",
    }));
  };

  const handleRowChange = (name: keyof VaccineRow, value: string) => {
    setVaccineRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleMetaChange = (name: string, value: string) => {
    setVaccineForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveVaccineRow = () => {
    if (!selectedAgeGrade.trim() || !vaccineRow.vaccine.trim()) return;
    if (savedVaccinesForAgeGrade.includes(vaccineRow.vaccine)) return;

    setVaccines((prev) => [
      ...prev,
      {
        ...vaccineRow,
        ageGrade: selectedAgeGrade,
      },
    ]);
    setVaccineRow({
      ...EMPTY_VACCINE_ROW,
      ageGrade: selectedAgeGrade,
    });
  };

  const removeVaccine = (index: number) => {
    setVaccines((prev) => prev.filter((_, i) => i !== index));
  };

  const clearForm = useCallback(() => {
    setVaccines([]);
    setVaccineForm({});
    setVaccineRow({ ...EMPTY_VACCINE_ROW });
  }, []);

  usePendingCategoryDraft(
    "VACCINE ADMINISTRATION",
    () => {
      const hasMeta = Object.values(vaccineForm).some((value) => value.trim());
      if (vaccines.length === 0 && !hasMeta) return null;

      return {
        __payload__: JSON.stringify({
          ...vaccineForm,
          vaccines,
          totalAmount,
          ageGrade: vaccineForm.ageGrade || "",
          vaccineType: vaccines[0]?.vaccine || "",
          dosage: vaccines[0]?.dosage || "",
        }),
      };
    },
    [vaccineForm, vaccines, totalAmount],
    clearForm
  );

  const historyRows = vaccineHistory.map((row) => {
    const payload = row as Record<string, unknown>;
    const firstVaccine = Array.isArray(payload.vaccines)
      ? (payload.vaccines[0] as Record<string, string> | undefined)
      : undefined;

    return {
      ...row,
      ageGrade: payload.ageGrade ?? "—",
      vaccineType: payload.vaccineType ?? firstVaccine?.vaccine ?? "—",
      dosage: payload.dosage ?? firstVaccine?.dosage ?? "—",
    };
  });

  return (
    <div className="space-y-6 text-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="Age-Grade"
          value={selectedAgeGrade}
          onChange={handleAgeGradeChange}
          options={AGE_GRADE_OPTIONS}
          disabledOptions={completedAgeGrades}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SelectField
          label="Type of Vaccine"
          value={vaccineRow.vaccine}
          onChange={(value) => handleRowChange("vaccine", value)}
          options={vaccinesForAgeGrade}
          disabledOptions={savedVaccinesForAgeGrade}
          disabled={!selectedAgeGrade}
          placeholder={
            selectedAgeGrade
              ? "-Select an Option-"
              : "Select Age-Grade first"
          }
        />
        <SelectField
          label="Dosage"
          value={vaccineRow.dosage}
          onChange={(value) => handleRowChange("dosage", value)}
          options={DOSAGE_OPTIONS}
          disabled={!selectedAgeGrade}
        />
        <SelectField
          label="Administration Route"
          value={vaccineRow.route}
          onChange={(value) => handleRowChange("route", value)}
          options={ROUTE_OPTIONS}
          disabled={!selectedAgeGrade}
        />
      </div>

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(100px,1fr)_auto]">
        <SelectField
          label="Site (Body Part)"
          value={vaccineRow.site}
          onChange={(value) => handleRowChange("site", value)}
          options={SITE_OPTIONS}
          disabled={!selectedAgeGrade}
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <NairaAmountInput
            value={sanitizeAmountDigits(vaccineRow.amount)}
            onChange={(digits) => handleRowChange("amount", digits)}
            readOnly={!selectedAgeGrade}
          />
        </div>

        <button
          type="button"
          onClick={saveVaccineRow}
          disabled={!selectedAgeGrade.trim() || !vaccineRow.vaccine.trim()}
          className="h-[45px] whitespace-nowrap rounded-lg bg-[#573FD1] px-6 text-sm font-medium text-white hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save
        </button>
      </div>

      {vaccines.length > 0 && (
        <div className="space-y-2">
          <div className="hidden text-xs uppercase text-gray-500 sm:grid sm:grid-cols-[2rem_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_4.5rem] sm:gap-2 sm:px-3 sm:pb-1">
            <span>S/N</span>
            <span>Age Grade</span>
            <span>Vaccine Name</span>
            <span>Dosage</span>
            <span>Route</span>
            <span>Site</span>
            <span>Amount</span>
            <span className="text-right">Action</span>
          </div>

          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
            {vaccines.map((row, index) => (
              <li
                key={`${row.ageGrade}-${row.vaccine}-${index}`}
                className="grid grid-cols-1 gap-2 px-3 py-2.5 text-sm sm:grid-cols-[2rem_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_4.5rem] sm:items-center sm:gap-2"
              >
                <span className="text-gray-500 sm:text-gray-800">
                  {index + 1}
                </span>
                <span className="min-w-0 text-gray-600">
                  {row.ageGrade || "—"}
                </span>
                <span className="min-w-0 font-medium text-gray-800">
                  {row.vaccine}
                </span>
                <span className="min-w-0 text-gray-600">
                  {row.dosage || "—"}
                </span>
                <span className="min-w-0 text-gray-600">{row.route || "—"}</span>
                <span className="min-w-0 text-gray-600">{row.site || "—"}</span>
                <span className="min-w-0 text-gray-600">
                  {row.amount ? formatNaira(parseAmount(row.amount)) : "—"}
                </span>
                <div className="sm:text-right">
                  <button
                    type="button"
                    onClick={() => removeVaccine(index)}
                    className="rounded bg-red-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right text-base font-semibold text-gray-900">
            TOTAL: {formatNaira(totalAmount)}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Weight
          </label>
          <input
            className={formFieldInputClass}
            placeholder="Enter weight"
            value={vaccineForm.weight || ""}
            onChange={(e) => handleMetaChange("weight", e.target.value)}
          />
        </div>

        <div className="lg:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Comment
          </label>
          <div className="relative">
            <select
              value={vaccineForm.comment || ""}
              onChange={(e) => handleMetaChange("comment", e.target.value)}
              className={`${formFieldSelectClass} pr-10`}
            >
              <option value="">-Select an Option-</option>
              {VITAL_COMMENT_OPTIONS.map((option) => (
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
      </div>

      <CategoryMedicalTable
        title={categoryDetailsTitle("VACCINE ADMINISTRATION")}
        columns={vaccineDetailsColumns}
        rows={historyRows}
        emptyMessage="No vaccine administration records yet."
      />
    </div>
  );
};

export default VaccineAdministration;
