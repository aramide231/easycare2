/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, User, SignupData } from "./types";
import { PatientData } from "@/types/patient";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  signIn: async () => null,
  signOut: () => {},
  creationOfPatient: () => {},
  updateSessionUser: () => {},
});

const SESSION_KEY = "easyCareSession";

function persistSession(user: User) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function readSession(): User | null {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as User;
    if (parsed.fullName && parsed.userRole) return parsed;
  } catch {
    localStorage.removeItem(SESSION_KEY);
  }

  return null;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUser(readSession());
    setLoading(false);
  }, []);

  const signup = async (data: SignupData) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const nextUser: User = {
      fullName,
      userRole: data.userRole,
    };

    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        ...data,
        name: fullName,
      }),
    );

    persistSession(nextUser);
    setUser(nextUser);

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  const signIn = async (
    username: string,
    password: string,
  ): Promise<User | null> => {
    const stored = localStorage.getItem("mockUser");
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    const matchesIdentity =
      parsed.email === username || parsed.username === username;
    if (!matchesIdentity || parsed.password !== password) return null;

    const nextUser: User = {
      fullName: parsed.name,
      userRole: parsed.userRole,
    };

    persistSession(nextUser);
    setUser(nextUser);
    return nextUser;
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const creationOfPatient = (data: PatientData) => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    const updated = [...stored, data];
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  const updateSessionUser = (nextUser: User) => {
    persistSession(nextUser);
    setUser(nextUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        signIn,
        signOut,
        creationOfPatient,
        updateSessionUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
