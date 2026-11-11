/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import type { AuthContextType, AuthProviderProps, User } from "./types";
import { clearLegacyIdentity, loginStaff, logoutStaff, restoreSession } from "@/api/auth/session";
import { useAuthStore } from "@/store/useAuthStore";
import { ROLE_HOME_PATHS } from "@/lib/authRoutes";
import type { StaffUser } from "@/types/session";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  signIn: async () => null,
  signOut: async () => {},
  creationOfPatient: () => {},
  updateSessionUser: () => {},
  sessionError: null,
  retrySession: async () => {},
});

function displayUser(staff: StaffUser): User {
  const roles = staff.roles.map((role) => role.code);
  return {
    id: staff.id,
    fullName: staff.name,
    userRole: roles.find((role) => role in ROLE_HOME_PATHS) || "",
    roles,
    permissions: staff.permissions,
  };
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const staff = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);
  const sessionError = useAuthStore((state) => state.error);
  const user = staff ? displayUser(staff) : null;
  const loading = status === "checking";

  useEffect(() => {
    clearLegacyIdentity();
    void restoreSession();
    let lastInteraction = Date.now();
    let lastVerification = Date.now();
    const interact = () => { lastInteraction = Date.now(); };
    const refresh = () => {
      if (document.visibilityState === "visible" && useAuthStore.getState().status === "authenticated") {
        lastVerification = Date.now();
        void restoreSession();
      }
    };
    const checkSession = () => {
      const { expiresAt } = useAuthStore.getState();
      const activeRecently = Date.now() - lastInteraction < 60_000;
      if ((expiresAt !== null && Date.now() >= expiresAt) || (activeRecently && Date.now() - lastVerification >= 60_000)) refresh();
    };
    document.addEventListener("pointerdown", interact);
    document.addEventListener("keydown", interact);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    const interval = window.setInterval(checkSession, 15_000);
    return () => {
      document.removeEventListener("pointerdown", interact);
      document.removeEventListener("keydown", interact);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
      window.clearInterval(interval);
    };
  }, []);

  const signup = async () => {
    throw new Error("Contact your hospital administrator to request a staff account.");
  };

  const signIn = async (
    username: string,
    password: string,
  ): Promise<User | null> => {
    const result = await loginStaff(username, password);
    return displayUser(result.data.user);
  };

  const signOut = async () => {
    await logoutStaff();
  };

  const creationOfPatient = () => {
    throw new Error("Patient registration is not connected to the backend yet.");
  };

  const updateSessionUser = () => {
    void restoreSession();
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
        sessionError,
        retrySession: restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
