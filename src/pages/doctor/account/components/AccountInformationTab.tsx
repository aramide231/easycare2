import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import type { DoctorProfile } from "../types";

type Props = {
  profile: DoctorProfile;
  onChange: (patch: Partial<DoctorProfile>) => void;
  columns?: 2 | 3;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-gray-700">
        {label}
      </span>
      {children}
    </label>
  );
}

const AccountInformationTab = ({
  profile,
  onChange,
  columns = 3,
}: Props) => {
  const gridClass =
    columns === 3
      ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      : formFieldGridClass;

  return (
    <div className={gridClass}>
      <Field label="First Name / Surname">
        <input
          className={formFieldInputClass}
          value={profile.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
        />
      </Field>
      <Field label="Middle Name">
        <input
          className={formFieldInputClass}
          value={profile.middleName}
          onChange={(e) => onChange({ middleName: e.target.value })}
        />
      </Field>
      <Field label="Last Name">
        <input
          className={formFieldInputClass}
          value={profile.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
        />
      </Field>
      <Field label="Gender">
        <select
          className={formFieldSelectClass}
          value={profile.gender}
          onChange={(e) => onChange({ gender: e.target.value })}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </Field>
      {columns === 2 && (
        <Field label="Mobile Number">
          <input
            className={formFieldInputClass}
            value={profile.mobileNumber}
            onChange={(e) => onChange({ mobileNumber: e.target.value })}
          />
        </Field>
      )}
      <Field label="Alt. Mobile Number">
        <input
          className={formFieldInputClass}
          value={profile.altMobileNumber1}
          onChange={(e) => onChange({ altMobileNumber1: e.target.value })}
        />
      </Field>
      <Field label="Alt. Mobile Number">
        <input
          className={formFieldInputClass}
          value={profile.altMobileNumber2}
          onChange={(e) => onChange({ altMobileNumber2: e.target.value })}
        />
      </Field>
      <Field label="Home Address">
        <input
          className={formFieldInputClass}
          value={profile.homeAddress}
          onChange={(e) => onChange({ homeAddress: e.target.value })}
        />
      </Field>
      <Field label="Email Address">
        <input
          type="email"
          className={formFieldInputClass}
          value={profile.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </Field>
      <Field label="Registration Date">
        <input
          readOnly
          className={formFieldInputClass}
          value={profile.registrationDate}
        />
      </Field>
      <Field label="Username">
        <input
          className={formFieldInputClass}
          value={profile.username}
          onChange={(e) => onChange({ username: e.target.value })}
        />
      </Field>
      <Field label="User Role">
        <select
          className={formFieldSelectClass}
          value={profile.userRole}
          onChange={(e) =>
            onChange({ userRole: e.target.value, designation: e.target.value })
          }
        >
          <option value="Consultant">Consultant</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Receptionist">Receptionist</option>
        </select>
      </Field>
      <Field label="Designation">
        <input
          className={formFieldInputClass}
          value={profile.designation}
          onChange={(e) => onChange({ designation: e.target.value })}
        />
      </Field>
      <Field label="State / Country">
        <input
          className={formFieldInputClass}
          value={profile.stateCountry}
          onChange={(e) => onChange({ stateCountry: e.target.value })}
        />
      </Field>
      <Field label="Password">
        <input
          type="password"
          className={formFieldInputClass}
          defaultValue="********"
          placeholder="Enter password"
        />
      </Field>
      <Field label="Confirm Password">
        <input
          type="password"
          className={formFieldInputClass}
          defaultValue="********"
          placeholder="Confirm password"
        />
      </Field>
    </div>
  );
};

export default AccountInformationTab;
