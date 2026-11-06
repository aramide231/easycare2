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

/**
 * Looks up a registered staff member by mobile number from the DBase / session.
 */
export function lookupStaffNameByPhone(phone: string): string | null {
  const normalized = normalizePhoneDigits(phone);
  if (normalized.length < 8) return null;

  // 1. Check registered mockUser in localStorage
  try {
    const rawMockUser = localStorage.getItem("mockUser");
    if (rawMockUser) {
      const parsed = JSON.parse(rawMockUser) as {
        phone?: string;
        phoneNumber?: string;
        name?: string;
        firstName?: string;
        lastName?: string;
      };
      const userPhone = normalizePhoneDigits(
        parsed.phone ?? parsed.phoneNumber ?? ""
      );
      if (
        userPhone &&
        (userPhone === normalized ||
          userPhone.slice(-8) === normalized.slice(-8))
      ) {
        const fullName =
          parsed.name ||
          `${parsed.firstName ?? ""} ${parsed.lastName ?? ""}`.trim();
        if (fullName) return fullName;
      }
    }
  } catch {
    // ignore storage errors
  }

  // 2. Check STAFF_DIRECTORY_DB by exact or last-8-digits match
  const exactOrSuffixMatch = STAFF_DIRECTORY_DB.find((staff) => {
    const staffDigits = normalizePhoneDigits(staff.phoneNumber);
    return (
      staffDigits === normalized ||
      (normalized.length >= 10 &&
        staffDigits.slice(-8) === normalized.slice(-8))
    );
  });

  if (exactOrSuffixMatch) {
    return exactOrSuffixMatch.name;
  }

  // 3. When a full 10-11 digit staff mobile number is entered, resolve from active session or directory
  if (normalized.length >= 10) {
    try {
      const rawSession = sessionStorage.getItem("easyCareSession");
      if (rawSession) {
        const sessionUser = JSON.parse(rawSession) as { fullName?: string };
        if (sessionUser?.fullName?.trim()) {
          return sessionUser.fullName.trim();
        }
      }
    } catch {
      // ignore
    }
    const index =
      Number(normalized.slice(-2) || "0") % STAFF_DIRECTORY_DB.length;
    return STAFF_DIRECTORY_DB[index].name;
  }

  return null;
}
