import { ReactNode } from "react";
import { PatientData } from "@/types/patient";

export interface User {
  fullName: string;
  userRole: string;
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
  signOut: () => void;
  creationOfPatient: (patient: PatientData) => void;
}

export type AuthProviderProps = { children: ReactNode };
