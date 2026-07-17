import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "easyCareSession";

export type DoctorAuthUser = {
  fullName: string;
  userRole: string;
};

export type SignupData = {
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
};

function readSessionUser(): DoctorAuthUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DoctorAuthUser;
    return parsed.fullName && parsed.userRole ? parsed : null;
  } catch {
    return null;
  }
}

function persistUser(user: DoctorAuthUser | null) {
  if (user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export function useAuth() {
  const [user, setUser] = useState<DoctorAuthUser | null>(() => readSessionUser());
  const loading = false;

  const syncSession = useCallback(() => {
    setUser(readSessionUser());
  }, []);

  useEffect(() => {
    const onFocus = () => syncSession();
    window.addEventListener("focus", onFocus);
    const interval = window.setInterval(syncSession, 750);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(interval);
    };
  }, [syncSession]);

  const signup = async (_data: SignupData) => {};

  const signIn = async (
    username: string,
    _password: string,
    selectedRole?: string
  ): Promise<boolean> => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return false;

    if (selectedRole) {
      const next = { fullName: trimmedUsername, userRole: selectedRole };
      persistUser(next);
      setUser(next);
      return true;
    }

    return false;
  };

  const signOut = () => {
    localStorage.removeItem("mockUser");
    persistUser(null);
    setUser(null);
  };

  const creationOfPatient = () => {};

  return {
    user,
    loading,
    signup,
    signIn,
    signOut,
    creationOfPatient,
  };
}
