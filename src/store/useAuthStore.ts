import { create } from "zustand";
import type { StaffUser } from "@/types/session";
import { resetSessionData, staffAccessScope } from "@/lib/sessionScope";

interface AuthState {
  user: StaffUser | null;
  status: "checking" | "authenticated" | "guest" | "error";
  error: string | null;
  revision: number;
  scope: string | null;
  expiresAt: number | null;
  setUser: (user: StaffUser, expiresAt: number) => void;
  setError: (message: string) => void;
  clearAuth: () => void;
  lockAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null, status: "checking", error: null, revision: 0, scope: null, expiresAt: null,
  setUser: (user, expiresAt) => {
    const state = get();
    const scope = staffAccessScope(user);
    const changed = scope !== state.scope || state.status !== "authenticated";
    if (changed) resetSessionData();
    set({ user, expiresAt, scope, status: "authenticated", error: null, revision: state.revision + Number(changed) });
  },
  setError: (error) => {
    resetSessionData();
    set((state) => ({ user: null, scope: null, expiresAt: null, status: "error", error, revision: state.revision + 1 }));
  },
  clearAuth: () => {
    resetSessionData();
    set((state) => ({
      user: null, scope: null, expiresAt: null, status: "guest", error: null,
      revision: state.revision + Number(state.status !== "guest"),
    }));
  },
  lockAuth: () => {
    resetSessionData();
    set((state) => ({ user: null, scope: null, expiresAt: null, status: "checking", error: null, revision: state.revision + 1 }));
  },
}));
