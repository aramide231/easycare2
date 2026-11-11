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
