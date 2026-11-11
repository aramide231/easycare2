import type { StaffUser, StaffSessionResponse } from "@/types/session";

export type User = StaffUser;
export type LoginResponse = StaffSessionResponse;

export interface LoginPayload {
  email_or_username?: string;
  email?: string;
  password: string;
}

export interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  user_role: string; // "frontdesk" | "nurse" | "doctor" | "admin" | ""
  phone_no: string;
  password: string;
  password_confirmation: string;
  terms_agreed?: boolean;

  //  ////////
  countryCode?: number;
  userDesignations?: string;
  userGender?: string;
}

export interface SignupResponse {
  message: string;
  data?: {
    user?: User;
  };
}

export interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format?: string;
}
