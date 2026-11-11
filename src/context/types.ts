import { ReactNode } from "react";
import { PatientData } from "@/types/patient";

export interface User {
  id?: number;
  fullName: string;
  userRole: string;
  roles?: string[];
  permissions?: string[];
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userRole: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  countryCode: number;
  userDesignations: string;
  userGender: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (data: SignupData) => Promise<void>;
  signIn: (username: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  creationOfPatient: (patient: PatientData) => void;
  updateSessionUser: (user: User) => void;
  sessionError: string | null;
  retrySession: () => Promise<void>;
}

export type AuthProviderProps = { children: ReactNode };
