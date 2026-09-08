import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import {
  ELECTROLYTES_PARAMETER_OPTIONS,
  ELECTROLYTES_SPECIMEN_OPTIONS,
  ELECTROLYTES_UREA_INVESTIGATION_NAME,
  ELECTROLYTES_UREA_PARAMETER_ROWS,
  EMPTY_ELECTROLYTES_UREA_VALUES,
  MICRO_ALBIUM_ROWS,
  type ElectrolytesParameter,
  type ElectrolytesUreaResultValues,
} from "../data/electrolytesUrea";
import {
  INVESTIGATION_METADATA_HINTS,
  MICRO_ALBIUM_FIELD_HINTS,
} from "../data/investigationFormHints";
import InvestigationDateTimePicker, {
  buildInvestigationDateTimeDefault,
} from "./InvestigationDateTimePicker";

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const selectClass = `${fieldClass} appearance-none pr-10`;

const inputBoxClass =
  "h-11 w-20 shrink-0 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20 sm:w-24";

const dualFieldInputClass =
  "h-11 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const sectionHeaderClass =
  "border-b border-[#573FD1] bg-[#573FD1] px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white";

type Props = {
  patientName: string;
  requestedByDefault?: string;
  requestDateDefault?: string;
  requestTimeDefault?: string;
  onConfirmed?: (payload: {
    specimen: string;
    parameter: string;
    values: ElectrolytesUreaResultValues;
    requestDateTime: string;
    resultDateTime: string;
    requestedBy: string;
    doneBy: string;
  }) => void;
};

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-[13px] font-medium uppercase tracking-wide text-gray-800">
      {children}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClass}
          aria-label={label}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
          aria-hidden
        />
      </div>
    </div>
  );
}

function ParameterRow({
  param,
  value,
  onChange,
}: {
  param: ElectrolytesParameter;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <span className="w-[6.5rem] shrink-0 text-sm font-medium text-gray-800 sm:w-[8.5rem]">
        {param.label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputBoxClass}
        aria-label={param.label}
      />
      {param.refValues ? (
        <span className="min-w-0 flex-1 text-[10px] leading-snug text-gray-500 sm:text-xs">
          {param.refValues}
        </span>
      ) : null}
    </div>
  );
}

function DualHintField({
  value,
  onChange,
  hint,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  hint: string;
  ariaLabel: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={dualFieldInputClass}
        aria-label={ariaLabel}
      />
      {hint ? (
        <span className="shrink-0 text-[10px] italic leading-snug text-gray-500 sm:text-xs">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export default function ElectrolytesUreaResultForm({
  patientName,
  requestedByDefault = "",
  requestDateDefault = "",
  requestTimeDefault = "",
  onConfirmed,
}: Props) {
  const defaultRequest = buildInvestigationDateTimeDefault(
    requestDateDefault,
    requestTimeDefault,
  );

  const [specimen, setSpecimen] = useState("");
  const [parameter, setParameter] = useState("");
  const [values, setValues] = useState<ElectrolytesUreaResultValues>(
    EMPTY_ELECTROLYTES_UREA_VALUES,
  );
  const [requestDateTime, setRequestDateTime] = useState(defaultRequest);
  const [resultDateTime, setResultDateTime] = useState("");
  const [requestedBy, setRequestedBy] = useState(requestedByDefault);
  const [doneBy, setDoneBy] = useState("");

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = () => {
    if (!specimen) {
      toast.error("Select a specimen type.");
      return;
    }
    if (!parameter) {
      toast.error("Select a parameter type.");
      return;
    }
    if (!requestDateTime.trim()) {
      toast.error("Enter date and time of investigation request.");
      return;
    }
    if (!resultDateTime.trim()) {
      toast.error("Enter date and time of investigation result.");
      return;
    }
    if (!requestedBy.trim() || !doneBy.trim()) {
      toast.error("Enter investigation requested by and done by.");
      return;
    }

    const filledCount = Object.values(values).filter((value) => value.trim())
      .length;
    if (filledCount === 0) {
      toast.error("Enter at least one Electrolytes & UREA result value.");
      return;
    }

    onConfirmed?.({
      specimen,
      parameter,
      values,
      requestDateTime: requestDateTime.trim(),
      resultDateTime: resultDateTime.trim(),
      requestedBy: requestedBy.trim(),
      doneBy: doneBy.trim(),
    });
    toast.success("Electrolytes & UREA result confirmed.");
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-5 xl:p-6">
      <p className="sr-only">Result entry for {patientName}</p>

      <h1 className="mb-6 text-lg font-bold uppercase tracking-wide text-gray-800 sm:text-xl">
        Medical Imaging Form Entry
      </h1>

      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        <SelectField
          label="Specimen Type"
          value={specimen}
          onChange={setSpecimen}
          options={ELECTROLYTES_SPECIMEN_OPTIONS}
          placeholder="select specimen type from the drop down list"
        />
        <SelectField
          label="Parameter Type"
          value={parameter}
          onChange={setParameter}
          options={ELECTROLYTES_PARAMETER_OPTIONS}
          placeholder="select parameter type from the drop down list"
        />
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-gray-300">
        <div className={sectionHeaderClass}>Electrolytes & UREA Test</div>
        <div className="space-y-3 p-4">
          {ELECTROLYTES_UREA_PARAMETER_ROWS.map((row) => (
            <div
              key={`${row.left.key}-${row.right.key}`}
              className="grid grid-cols-1 gap-x-8 gap-y-3 xl:grid-cols-2 xl:gap-x-12"
            >
              <ParameterRow
                param={row.left}
                value={values[row.left.key] ?? ""}
                onChange={(value) => updateValue(row.left.key, value)}
              />
              <ParameterRow
                param={row.right}
                value={values[row.right.key] ?? ""}
                onChange={(value) => updateValue(row.right.key, value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-gray-300">
        <div className={sectionHeaderClass}>Micro Albium</div>
        <div className="grid grid-cols-[minmax(6rem,8rem)_1fr_1fr] gap-4 border-b border-gray-200 bg-gray-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:grid-cols-[9rem_1fr_1fr]">
          <span />
          <span>Time / Result</span>
          <span>Range</span>
        </div>
        {MICRO_ALBIUM_ROWS.map((row, index) => (
          <div
            key={row.key}
            className={`grid grid-cols-[minmax(6rem,8rem)_1fr_1fr] items-start gap-4 px-4 py-3 sm:grid-cols-[9rem_1fr_1fr] sm:gap-6 ${
              index < MICRO_ALBIUM_ROWS.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <span className="pt-2.5 text-sm font-medium text-gray-800">
              {row.label}
            </span>
            <div className="min-w-0 space-y-1">
              <DualHintField
                value={values[row.primaryKey] ?? ""}
                onChange={(value) => updateValue(row.primaryKey, value)}
                hint={row.primaryHint}
                ariaLabel={`${row.label} ${row.primaryHint || "result"}`}
              />
              {row.primaryRefValues ? (
                <span className="block text-[10px] leading-snug text-gray-500 sm:text-xs">
                  {row.primaryRefValues}
                </span>
              ) : null}
            </div>
            <DualHintField
              value={values[row.rangeKey] ?? ""}
              onChange={(value) => updateValue(row.rangeKey, value)}
              hint={MICRO_ALBIUM_FIELD_HINTS.range}
              ariaLabel={`${row.label} range`}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        <InvestigationDateTimePicker
          label="Date | Time Of Investigation Request"
          value={requestDateTime}
          onChange={setRequestDateTime}
          defaultDate={requestDateDefault}
          defaultTime={requestTimeDefault}
          hintText={INVESTIGATION_METADATA_HINTS.requestDateTime}
        />
        <InvestigationDateTimePicker
          label="Date | Time Of Investigation Result"
          value={resultDateTime}
          onChange={setResultDateTime}
          hintText={INVESTIGATION_METADATA_HINTS.resultDateTime}
        />
        <div className="min-w-0 flex-1">
          <FieldLabel>Investigation Requested By</FieldLabel>
          <input
            type="text"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
            className={fieldClass}
            aria-label="Investigation requested by"
          />
          <span className="mt-1 block text-[10px] italic leading-snug text-gray-500 sm:text-xs">
            {INVESTIGATION_METADATA_HINTS.requestedBy}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <FieldLabel>Investigation Done By</FieldLabel>
          <input
            type="text"
            value={doneBy}
            onChange={(e) => setDoneBy(e.target.value)}
            className={fieldClass}
            aria-label="Investigation done by"
          />
          <span className="mt-1 block text-[10px] italic leading-snug text-gray-500 sm:text-xs">
            {INVESTIGATION_METADATA_HINTS.doneBy}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <FieldLabel>Investigation Type</FieldLabel>
          <input
            type="text"
            value="Laboratory"
            readOnly
            className={`${fieldClass} bg-gray-50 text-gray-700`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <FieldLabel>Investigation Name</FieldLabel>
          <input
            type="text"
            value={ELECTROLYTES_UREA_INVESTIGATION_NAME}
            readOnly
            className={`${fieldClass} bg-gray-50 text-gray-700`}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={handleConfirm}
          className="h-[45px] min-w-[175px] rounded-lg bg-[#573FD1] px-10 text-[15px] font-semibold tracking-[-0.3px] text-white transition hover:bg-[#4a35b8]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
