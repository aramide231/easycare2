export const DEPARTMENT_OPTIONS = [
  { value: "", label: "-- select department --" },
  { value: "IPD", label: "IPD" },
  { value: "OPD", label: "OPD" },
  { value: "Nursing", label: "Nursing" },
  { value: "Clinician / Doctor", label: "Clinician / Doctor" },
  { value: "Diagnostics / Lab", label: "Diagnostics / Lab" },
  { value: "Pharmacy", label: "Pharmacy" },
] as const;

export const PATIENT_TYPE_OPTIONS = [
  { value: "", label: "-- select patient type --" },
  { value: "in-patient", label: "In Patient" },
  { value: "out-patient", label: "Out Patient" },
] as const;

export type DepartmentForm = {
  department: string;
  phoneNumber: string;
  name: string;
};

export type PatientRequestForm = {
  patientType: string;
  uniqueId: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: string;
};

export const EMPTY_DEPARTMENT_FORM: DepartmentForm = {
  department: "",
  phoneNumber: "",
  name: "",
};

export const EMPTY_PATIENT_FORM: PatientRequestForm = {
  patientType: "",
  uniqueId: "",
  name: "",
  phoneNumber: "",
  age: "",
  gender: "",
};

export type StaffDirectoryEntry = {
  phoneNumber: string;
  name: string;
  department?: string;
};

export const STAFF_DIRECTORY_DB: StaffDirectoryEntry[] = [
  {
    phoneNumber: "08012345678",
    name: "Titilayo Olayinka",
    department: "Nursing",
  },
  {
    phoneNumber: "08023456789",
    name: "Dr. Easy Test",
    department: "IPD",
  },
  {
    phoneNumber: "08034567890",
    name: "Dr. Jane Doe",
    department: "OPD",
  },
  {
    phoneNumber: "09012345678",
    name: "Florence Omorogbe",
    department: "Nursing",
  },
  {
    phoneNumber: "07034567890",
    name: "Bayo Hammed",
    department: "OPD",
  },
  {
    phoneNumber: "08145678901",
    name: "Pelumi Adebayo",
    department: "IPD",
  },
  {
    phoneNumber: "0908025311",
    name: "Dr. Chibuzo Alen",
    department: "IPD",
  },
  {
    phoneNumber: "0908025312",
    name: "Nurse Grace Okafor",
    department: "Nursing",
  },
  {
    phoneNumber: "01234567890",
    name: "Titilayo Olayinka",
    department: "IPD",
  },
];

function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234") && digits.length >= 13) {
    return `0${digits.slice(3)}`;
  }
  return digits;
}

/** Demo-directory lookup only; browser storage never supplies staff identity. */
export function lookupStaffNameByPhone(phone: string): string | null {
  const normalized = normalizePhoneDigits(phone);
  if (normalized.length < 8) return null;

  return STAFF_DIRECTORY_DB.find((staff) => normalizePhoneDigits(staff.phoneNumber) === normalized)?.name ?? null;
}
