import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/pages/auth/types/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Call this when login/register succeeds
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),

      // Call this on logout, or if the API returns a 401 Unauthorized
      clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "easycare-auth", // Key used in localStorage
    },
  ),
);
