import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import {
  EMPTY_HAEMATOLOGY_VALUES,
  HAEMATOLOGY_CBC_PARAMETER_ROWS,
  HAEMATOLOGY_INVESTIGATION_NAME,
  HAEMATOLOGY_PARAMETER_OPTIONS,
  HAEMATOLOGY_SPECIMEN_OPTIONS,
  type HaematologyParameter,
  type HaematologyResultValues,
} from "../data/haematologyCbc";
import InvestigationDateTimePicker, {
  buildInvestigationDateTimeDefault,
} from "./InvestigationDateTimePicker";
import { INVESTIGATION_METADATA_HINTS } from "../data/investigationFormHints";

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
    values: HaematologyResultValues;
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

const inputBoxClass =
  "h-11 w-20 shrink-0 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]/20 sm:w-24";

function ParameterRow({
  param,
  value,
  onChange,
}: {
  param: HaematologyParameter;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <span className="w-[6.5rem] shrink-0 text-sm font-medium text-gray-800 sm:w-[7.5rem]">
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
      <span className="min-w-0 flex-1 text-[10px] leading-snug text-gray-500 sm:text-xs">
        {param.refValues}
      </span>
    </div>
  );
}

export default function HaematologyCbcResultForm({
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
  const [values, setValues] = useState<HaematologyResultValues>(
    EMPTY_HAEMATOLOGY_VALUES,
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

    const filledCount = Object.values(values).filter((v) => v.trim()).length;
    if (filledCount === 0) {
      toast.error("Enter at least one Haematology /CBC result value.");
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
    toast.success("Haematology /CBC result confirmed.");
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
          options={HAEMATOLOGY_SPECIMEN_OPTIONS}
          placeholder="select specimen type from the drop down list"
        />
        <SelectField
          label="Parameter Type"
          value={parameter}
          onChange={setParameter}
          options={HAEMATOLOGY_PARAMETER_OPTIONS}
          placeholder="select parameter type from the drop down list"
        />
      </div>

      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-800">
        Haematology /CBC Result
      </h2>

      <div className="space-y-3">
        {HAEMATOLOGY_CBC_PARAMETER_ROWS.map((row) => (
          <div key={`${row.left.key}-${row.right.key}`}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 xl:grid-cols-2 xl:gap-x-12">
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
            {row.gapAfter ? <div className="h-4" aria-hidden /> : null}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
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
            value={HAEMATOLOGY_INVESTIGATION_NAME}
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
