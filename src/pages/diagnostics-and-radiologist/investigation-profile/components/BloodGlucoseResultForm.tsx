import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import {
  BLOOD_GLUCOSE_INVESTIGATION_NAME,
  BLOOD_GLUCOSE_PARAMETER_OPTIONS,
  BLOOD_GLUCOSE_SPECIMEN_OPTIONS,
  BLOOD_GLUCOSE_TESTS,
  EMPTY_BLOOD_GLUCOSE_VALUES,
  OGTT_ROWS,
  type BloodGlucoseResultValues,
} from "../data/bloodGlucose";
import InvestigationDateTimePicker, {
  buildInvestigationDateTimeDefault,
} from "./InvestigationDateTimePicker";
import {
  INVESTIGATION_METADATA_HINTS,
  OGTT_FIELD_HINTS,
} from "../data/investigationFormHints";

const inputBoxClass =
  "h-11 w-20 shrink-0 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20 sm:w-24";

const ogttInputClass =
  "h-11 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

function OgttField({
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
        className={ogttInputClass}
        aria-label={ariaLabel}
      />
      <span className="shrink-0 text-[10px] italic leading-snug text-gray-500 sm:text-xs">
        {hint}
      </span>
    </div>
  );
}

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20";

const selectClass = `${fieldClass} appearance-none pr-10`;

type Props = {
  patientName: string;
  requestedByDefault?: string;
  requestDateDefault?: string;
  requestTimeDefault?: string;
  onConfirmed?: (payload: {
    specimen: string;
    parameter: string;
    values: BloodGlucoseResultValues;
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

export default function BloodGlucoseResultForm({
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
  const [values, setValues] = useState<BloodGlucoseResultValues>(
    EMPTY_BLOOD_GLUCOSE_VALUES,
  );
  const [requestDateTime, setRequestDateTime] = useState(defaultRequest);
  const [resultDateTime, setResultDateTime] = useState("");
  const [requestedBy, setRequestedBy] = useState(requestedByDefault);
  const [doneBy, setDoneBy] = useState("");

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const ogttTimeKey = (rowKey: string) => {
    if (rowKey === "fasting") return "ogttFastingTime";
    if (rowKey === "oneHr") return "ogttOneHrTime";
    return "ogttTwoHrTime";
  };

  const ogttResultKey = (rowKey: string) => {
    if (rowKey === "fasting") return "ogttFastingResult";
    if (rowKey === "oneHr") return "ogttOneHrResult";
    return "ogttTwoHrResult";
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

    const filledCount = Object.values(values).filter((v) => v.trim()).length;
    if (filledCount === 0) {
      toast.error("Enter at least one Blood Glucose result value.");
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
    toast.success("Blood Glucose result confirmed.");
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
          options={BLOOD_GLUCOSE_SPECIMEN_OPTIONS}
          placeholder="select specimen type from the drop down list"
        />
        <SelectField
          label="Parameter Type"
          value={parameter}
          onChange={setParameter}
          options={BLOOD_GLUCOSE_PARAMETER_OPTIONS}
          placeholder="select parameter type from the drop down list"
        />
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-gray-300">
        <div className="border-b border-gray-300 bg-gray-50 px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-gray-800">
          Blood Glucose Result
        </div>
        <div className="grid grid-cols-[minmax(5rem,7rem)_5rem_1fr] gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:grid-cols-[8rem_6rem_1fr] sm:gap-4">
          <span>Test</span>
          <span>Results</span>
          <span>Ref. Values</span>
        </div>
        {BLOOD_GLUCOSE_TESTS.map((test, index) => (
          <div
            key={test.key}
            className={`grid grid-cols-[minmax(5rem,7rem)_5rem_1fr] items-center gap-3 px-4 py-3 sm:grid-cols-[8rem_6rem_1fr] sm:gap-4 ${
              index < BLOOD_GLUCOSE_TESTS.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <span className="text-sm font-medium text-gray-800">{test.label}</span>
            <input
              type="text"
              inputMode="decimal"
              value={values[test.key] ?? ""}
              onChange={(e) => updateValue(test.key, e.target.value)}
              className={inputBoxClass}
              aria-label={test.label}
            />
            <span className="text-[10px] leading-snug text-gray-500 sm:text-xs">
              {test.refValues}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-gray-300">
        <div className="border-b border-gray-300 bg-gray-50 px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-gray-800">
          OGTT
        </div>
        <div className="grid grid-cols-[minmax(5rem,7rem)_1fr_1fr] gap-4 border-b border-gray-200 bg-gray-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:grid-cols-[8rem_1fr_1fr]">
          <span />
          <span>Time</span>
          <span>Result</span>
        </div>
        {OGTT_ROWS.map((row, index) => (
          <div
            key={row.key}
            className={`grid grid-cols-[minmax(5rem,7rem)_1fr_1fr] items-center gap-4 px-4 py-3 sm:grid-cols-[8rem_1fr_1fr] sm:gap-6 ${
              index < OGTT_ROWS.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <span className="text-sm font-medium text-gray-800">{row.label}</span>
            <OgttField
              value={values[ogttTimeKey(row.key)] ?? ""}
              onChange={(value) => updateValue(ogttTimeKey(row.key), value)}
              hint={OGTT_FIELD_HINTS.time}
              ariaLabel={`${row.label} time`}
            />
            <OgttField
              value={values[ogttResultKey(row.key)] ?? ""}
              onChange={(value) => updateValue(ogttResultKey(row.key), value)}
              hint={OGTT_FIELD_HINTS.result}
              ariaLabel={`${row.label} result`}
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
            value={BLOOD_GLUCOSE_INVESTIGATION_NAME}
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
