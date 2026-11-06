import { ChevronDown } from "lucide-react";
import {
  formFieldInputClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  DEPARTMENT_OPTIONS,
  STAFF_DIRECTORY_DB,
  lookupStaffNameByPhone,
  type DepartmentForm,
} from "./requestFormOptions";

type Props = {
  value: DepartmentForm;
  onChange: <K extends keyof DepartmentForm>(
    key: K,
    value: DepartmentForm[K]
  ) => void;
};

export default function RequestDepartmentSection({ value, onChange }: Props) {
  const handlePhoneChange = (rawValue: string) => {
    const sanitized = rawValue.replace(/[^0-9+\s-]/g, "");
    onChange("phoneNumber", sanitized);

    const matchedStaffName = lookupStaffNameByPhone(sanitized);
    if (matchedStaffName) {
      onChange("name", matchedStaffName);
    } else if (!sanitized.trim()) {
      onChange("name", "");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">
        Request (Department)
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Department
        </label>
        <div className="relative">
          <select
            value={value.department}
            onChange={(e) => onChange("department", e.target.value)}
            className={`${formFieldSelectClass} pr-10`}
          >
            {DEPARTMENT_OPTIONS.map((option) => (
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
          Phone Number (Staff Mobile)
        </label>
        <input
          type="tel"
          inputMode="numeric"
          list="staff-mobile-directory"
          value={value.phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="Enter staff mobile number (e.g. 08012345678)"
          className={formFieldInputClass}
        />
        <datalist id="staff-mobile-directory">
          {STAFF_DIRECTORY_DB.map((staff) => (
            <option
              key={staff.phoneNumber}
              value={staff.phoneNumber}
              label={staff.name}
            />
          ))}
        </datalist>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Name
        </label>
        <textarea
          rows={4}
          value={value.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Auto-loads staff name when mobile number is entered"
          className={formFieldTextareaClass}
        />
      </div>
    </div>
  );
}
