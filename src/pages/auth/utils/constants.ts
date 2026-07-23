export const COUNTRY_PHONE_LENGTH: { [key: string]: number } = {
  us: 10,
  uk: 10,
  in: 10,
  ng: 10,
  au: 9,
};

export const USER_ROLES = ["frontdesk", "nurse", "doctor", "admin", "hmo"];

// Kept from your original code in case your API still requires them elsewhere
export const USER_DESIGNATIONS = [
  "Accountant",
  "Admin",
  "Cashier",
  "HMO",
  "IT",
  "Laboratory",
  "Matron",
  "Nursing",
  "Pharmacist",
  "Physician",
  "Protocols",
  "Receptionist",
  "Scan",
  "Specialist",
  "X-ray",
].sort();

export const USER_GENDERS = ["Male", "Female"];
