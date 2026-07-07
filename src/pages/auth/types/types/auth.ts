export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_no: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  terms_agreed: boolean;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  account_activated: boolean;
}

export interface LoginPayload {
  email_or_username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
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
    token?: string;
    user?: User;
  };
}

export interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format?: string;
}
