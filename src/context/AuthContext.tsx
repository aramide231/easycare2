/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { AuthContextType, AuthProviderProps, User, SignupData } from "./types";
import { PatientData } from "@/types/patient";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  signIn: async () => false,
  signOut: () => {},
  creationOfPatient: () => {},
});

const DEV_NURSE_USER: User = {
  fullName: "David Sam",
  userRole: "nurse",
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Dev: skip login and go straight to nursing
  const [user, setUser] = useState<User | null>(DEV_NURSE_USER);
  const [loading, setLoading] = useState<boolean>(false);

  const signup = async (data: SignupData) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        ...data,
        name: fullName,
      })
    );

    setUser({
      fullName,
      userRole: data.userRole,
    });

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const stored = localStorage.getItem("mockUser");
    if (!stored) return false;

    const parsed = JSON.parse(stored);
    if (parsed.email === email && parsed.password === password) {
      setUser({ fullName: parsed.name, userRole: parsed.userRole });
      return true;
    }

    return false;
  };

  const signOut = () => {
    localStorage.removeItem("mockUser");
    setUser(DEV_NURSE_USER);
  };

  const creationOfPatient = (data: PatientData) => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    const updated = [...stored, data];
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, signIn, signOut, creationOfPatient }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
