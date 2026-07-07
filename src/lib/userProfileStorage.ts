export type StoredUserProfile = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  username: string;
  userRole: string;
  phoneNumber: string;
  password: string;
  userDesignations: string;
  userGender: string;
  stateCountry: string;
  staffId: string;
  registrationDate: string;
  lastEdited: string;
  profileImage: string | null;
  name?: string;
};

const MOCK_USER_KEY = "mockUser";

export const DEFAULT_PROFILE: StoredUserProfile = {
  firstName: "John",
  lastName: "Doe",
  middleName: "Ipsum",
  email: "johndoe@hospital.com",
  username: "johndoe",
  userRole: "nurse",
  phoneNumber: "09013976991",
  password: "password123",
  userDesignations: "Nurse",
  userGender: "Male",
  stateCountry: "Lagos, Nigeria",
  staffId: "P-2025001",
  registrationDate: "31/01/2025",
  lastEdited: "12th July 2025",
  profileImage: null,
};

export function readStoredUserProfile(
  fallbackRole = "nurse",
): StoredUserProfile {
  try {
    const stored = localStorage.getItem(MOCK_USER_KEY);
    if (!stored) {
      return { ...DEFAULT_PROFILE, userRole: fallbackRole };
    }

    const parsed = JSON.parse(stored) as Partial<StoredUserProfile>;
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      userRole: parsed.userRole ?? fallbackRole,
      userDesignations:
        parsed.userDesignations ??
        capitalizeRole(parsed.userRole ?? fallbackRole),
    };
  } catch {
    return { ...DEFAULT_PROFILE, userRole: fallbackRole };
  }
}

export function writeStoredUserProfile(profile: StoredUserProfile) {
  localStorage.setItem(MOCK_USER_KEY, JSON.stringify(profile));
}

function capitalizeRole(role: string) {
  if (!role) return "Nurse";
  return role.charAt(0).toUpperCase() + role.slice(1);
}
