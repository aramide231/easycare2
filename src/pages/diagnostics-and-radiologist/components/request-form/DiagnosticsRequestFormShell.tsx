import type { ReactNode } from "react";
import RequestDepartmentSection from "./RequestDepartmentSection";
import RequestPatientSection from "./RequestPatientSection";
import type { DepartmentForm } from "./requestFormOptions";
import type { PatientRequestForm } from "./requestFormOptions";

type Props = {
  title: string;
  departmentForm: DepartmentForm;
  onDepartmentChange: <K extends keyof DepartmentForm>(
    key: K,
    value: DepartmentForm[K]
  ) => void;
  patientForm: PatientRequestForm;
  patientLoaded: boolean;
  admissionError: string;
  onPatientFieldChange: <K extends keyof PatientRequestForm>(
    key: K,
    value: PatientRequestForm[K]
  ) => void;
  onPatientTypeChange: (patientType: string) => void;
  onUniqueIdBlur: () => void;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
};

export default function DiagnosticsRequestFormShell({
  title,
  departmentForm,
  onDepartmentChange,
  patientForm,
  patientLoaded,
  admissionError,
  onPatientFieldChange,
  onPatientTypeChange,
  onUniqueIdBlur,
  children,
  onSubmit,
  submitLabel = "Submit",
}: Props) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-xl font-bold text-gray-800">{title}</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RequestDepartmentSection
          value={departmentForm}
          onChange={onDepartmentChange}
        />
        <RequestPatientSection
          value={patientForm}
          patientLoaded={patientLoaded}
          admissionError={admissionError}
          onFieldChange={onPatientFieldChange}
          onPatientTypeChange={onPatientTypeChange}
          onUniqueIdBlur={onUniqueIdBlur}
        />
      </div>

      {children}

      <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-lg bg-[#573FD1] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
