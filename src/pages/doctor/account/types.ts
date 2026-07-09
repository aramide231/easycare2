export type AccountTab = "account" | "helpdesk" | "logout";

export type DoctorProfile = {
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  altMobileNumber1: string;
  altMobileNumber2: string;
  gender: string;
  email: string;
  homeAddress: string;
  username: string;
  userRole: string;
  designation: string;
  stateCountry: string;
  registrationDate: string;
  lastLogin: string;
  lastEdited: string;
  accountCompletion: number;
  profileImageUrl: string;
};

export const DEFAULT_DOCTOR_PROFILE: DoctorProfile = {
  firstName: "Chris",
  lastName: "Doe",
  middleName: "John",
  mobileNumber: "08012345678",
  altMobileNumber1: "08087654321",
  altMobileNumber2: "",
  gender: "Male",
  email: "chris.doe@easycare.com",
  homeAddress: "2, Omega lane, Lekki, Lagos.",
  username: "ChrisDoe",
  userRole: "Consultant",
  designation: "Consultant",
  stateCountry: "Lagos, Nigeria",
  registrationDate: "31st Jan 2025",
  lastLogin: "15th July 2025",
  lastEdited: "24th Feb 2025, 13:54",
  accountCompletion: 42,
  profileImageUrl: "",
};
