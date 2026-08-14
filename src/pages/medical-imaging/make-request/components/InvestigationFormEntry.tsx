import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  INVESTIGATION_FORM_DEFAULTS,
  MALARIA_PARASITE_ROWS,
  PARAMETER_TYPE_OPTIONS,
  SPECIMEN_TYPE_OPTIONS,
} from "../data/investigationFormEntryFigma";

type MalariaResultRow = {
  label: string;
  o: string;
  h: string;
};

const EMPTY_MALARIA_ROWS: MalariaResultRow[] = MALARIA_PARASITE_ROWS.map(
  (label) => ({ label, o: "", h: "" })
);

export default function InvestigationFormEntry() {
  const { user } = useAuth();
  const [specimenType, setSpecimenType] = useState("");
  const [parameterType, setParameterType] = useState("");
  const [malariaRows, setMalariaRows] =
    useState<MalariaResultRow[]>(EMPTY_MALARIA_ROWS);
  const [requestedBy, setRequestedBy] = useState("");
  const [doneBy, setDoneBy] = useState(user?.fullName ?? "");
  const [resultDateTime, setResultDateTime] = useState<Date | null>(null);

  const requestDateTime = INVESTIGATION_FORM_DEFAULTS.investigationRequestedAt;

  const updateMalariaCell = (
    index: number,
    field: "o" | "h",
    value: string
  ) => {
    setMalariaRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 45)}px`;
  };

  const handleUpload = () => {
    if (!specimenType) {
      toast.error("Select a specimen type.");
      return;
    }
    if (!parameterType) {
      toast.error("Select a parameter type.");
      return;
    }
    setResultDateTime(new Date());
    toast.success("Investigation results uploaded.");
  };

  const formatDateTimeLabel = (date: Date | null) =>
    date ? format(date, "dd-MM-yyyy / hh : mm aa") : "";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-center text-sm font-bold uppercase tracking-wide text-gray-800">
        Investigation Form Entry
      </h1>

      <div className={`${formFieldGridClass} mb-6`}>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Specimen Type
          </label>
          <p className="mb-1.5 text-xs text-gray-500">
            Select specimen type from the drop down list
          </p>
          <div className="relative">
            <select
              value={specimenType}
              onChange={(e) => setSpecimenType(e.target.value)}
              title={specimenType || undefined}
              className={`${formFieldSelectClass} min-h-[45px] pr-10`}
            >
              <option value="">-Select-</option>
              {SPECIMEN_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
          </div>
          {specimenType ? (
            <p className="mt-1.5 break-words text-xs font-medium text-gray-800">
              {specimenType}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Parameter Type
          </label>
          <p className="mb-1.5 text-xs text-gray-500">
            Select parameter type from the drop down list
          </p>
          <div className="relative">
            <select
              value={parameterType}
              onChange={(e) => setParameterType(e.target.value)}
              title={parameterType || undefined}
              className={`${formFieldSelectClass} min-h-[45px] pr-10`}
            >
              <option value="">-Select-</option>
              {PARAMETER_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
          </div>
          {parameterType ? (
            <p className="mt-1.5 break-words text-xs font-medium text-gray-800">
              {parameterType}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-800">
          Malaria Parasite Result
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 text-left font-medium" />
                <th className="min-w-[14rem] px-4 py-2 text-center font-medium">
                  O
                  <span className="mt-0.5 block text-[10px] font-normal normal-case text-gray-400">
                    Enter result
                  </span>
                </th>
                <th className="min-w-[14rem] px-4 py-2 text-center font-medium">
                  H
                  <span className="mt-0.5 block text-[10px] font-normal normal-case text-gray-400">
                    Enter result
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {malariaRows.map((row, index) => (
                <tr key={row.label} className="border-b border-gray-100 align-top">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-800">
                    {row.label}
                  </td>
                  <td className="min-w-[14rem] px-4 py-2">
                    <textarea
                      rows={1}
                      value={row.o}
                      onChange={(e) => {
                        updateMalariaCell(index, "o", e.target.value);
                        autoResizeTextarea(e.target);
                      }}
                      onInput={(e) =>
                        autoResizeTextarea(e.currentTarget)
                      }
                      className="min-h-[45px] w-full overflow-hidden break-words rounded-[8px] border-[0.5px] border-black bg-[#FAFAFA] px-3 py-2 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
                    />
                  </td>
                  <td className="min-w-[14rem] px-4 py-2">
                    <textarea
                      rows={1}
                      value={row.h}
                      onChange={(e) => {
                        updateMalariaCell(index, "h", e.target.value);
                        autoResizeTextarea(e.target);
                      }}
                      onInput={(e) =>
                        autoResizeTextarea(e.currentTarget)
                      }
                      className="min-h-[45px] w-full overflow-hidden break-words rounded-[8px] border-[0.5px] border-black bg-[#FAFAFA] px-3 py-2 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-1 focus:ring-[#573FD1]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${formFieldGridClass} mb-6`}>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Date | Time of Investigation Request
          </label>
          <input
            type="text"
            readOnly
            value={formatDateTimeLabel(requestDateTime)}
            className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Date | Time of Investigation Result
          </label>
          <input
            type="text"
            readOnly
            value={formatDateTimeLabel(resultDateTime)}
            placeholder="Captured on upload"
            className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Investigation Requested By
          </label>
          <input
            type="text"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
            placeholder="capture name of staff..."
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Medical Imaging Scientist/Technician Name
          </label>
          <input
            type="text"
            value={doneBy}
            onChange={(e) => setDoneBy(e.target.value)}
            placeholder="capture name of staff..."
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Investigation Type
          </label>
          <input
            type="text"
            readOnly
            value={INVESTIGATION_FORM_DEFAULTS.investigationType}
            className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Investigation Name
          </label>
          <input
            type="text"
            readOnly
            value={INVESTIGATION_FORM_DEFAULTS.investigationName}
            className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleUpload}
          className="min-w-[200px] rounded-lg bg-[#573FD1] px-8 py-3 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
