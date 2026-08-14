import { ChevronDown } from "lucide-react";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  PATIENT_TYPE_OPTIONS,
  type PatientRequestForm,
} from "./requestFormOptions";

type Props = {
  value: PatientRequestForm;
  patientLoaded: boolean;
  admissionError: string;
  onFieldChange: <K extends keyof PatientRequestForm>(
    key: K,
    value: PatientRequestForm[K]
  ) => void;
  onPatientTypeChange: (patientType: string) => void;
  onUniqueIdBlur: () => void;
};

export default function RequestPatientSection({
  value,
  patientLoaded,
  admissionError,
  onFieldChange,
  onPatientTypeChange,
  onUniqueIdBlur,
}: Props) {
  const detailReadOnly = patientLoaded && !admissionError;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">
        Request (Patient Type)
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Type
        </label>
        <div className="relative">
          <select
            value={value.patientType}
            onChange={(e) => onPatientTypeChange(e.target.value)}
            className={`${formFieldSelectClass} pr-10`}
          >
            {PATIENT_TYPE_OPTIONS.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
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

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Unique ID Number
        </label>
        <input
          type="text"
          value={value.uniqueId}
          onChange={(e) => onFieldChange("uniqueId", e.target.value)}
          onBlur={onUniqueIdBlur}
          placeholder="LDWY-200"
          className={formFieldInputClass}
        />
        {admissionError ? (
          <p className="mt-1 text-sm font-medium text-red-600">
            {admissionError}
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          value={value.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          readOnly={detailReadOnly}
          placeholder="Adebayo Chiemeka"
          className={formFieldInputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          value={value.phoneNumber}
          onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
          readOnly={detailReadOnly}
          placeholder="+234 0123 456 7890"
          className={formFieldInputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={value.age}
            onChange={(e) =>
              onFieldChange("age", e.target.value.replace(/[^0-9]/g, ""))
            }
            readOnly={detailReadOnly}
            placeholder="26"
            className={formFieldInputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            value={value.gender}
            onChange={(e) => onFieldChange("gender", e.target.value)}
            readOnly={detailReadOnly}
            placeholder="Male"
            className={formFieldInputClass}
          />
        </div>
      </div>
    </div>
  );
}
