import { create } from "zustand";
import type { StaffUser } from "@/types/session";

interface AuthState {
  user: StaffUser | null;
  status: "checking" | "authenticated" | "guest" | "error";
  error: string | null;
  revision: number;
  expiresAt: number | null;
  setUser: (user: StaffUser, expiresAt: number) => void;
  setError: (message: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "checking",
  error: null,
  revision: 0,
  expiresAt: null,
  setUser: (user, expiresAt) => set((state) => ({ user, expiresAt, status: "authenticated", error: null, revision: state.revision + 1 })),
  setError: (error) => set((state) => ({ user: null, expiresAt: null, status: "error", error, revision: state.revision + 1 })),
  clearAuth: () => set((state) => ({ user: null, expiresAt: null, status: "guest", error: null, revision: state.revision + 1 })),
}));
