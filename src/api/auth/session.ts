import { ApiError, apiFetch, setCsrfToken } from "@/api/client/apClient";
import { useAuthStore } from "@/store/useAuthStore";
import type { StaffSessionResponse } from "@/types/session";

let operation = 0;

export function clearLegacyIdentity() {
  for (const storage of [localStorage, sessionStorage]) {
    for (const key of ["easycare-auth", "easyCareSession", "mockUser", "easyCareDoctorProfile"]) storage.removeItem(key);
  }
}

export async function restoreSession() {
  const current = ++operation;
  try {
    const result = await apiFetch<StaffSessionResponse>("/auth/me");
    if (current !== operation) return;
    setCsrfToken(result.data.csrf_token);
    const previous = useAuthStore.getState().user;
    if (previous && previous.id !== result.data.user.id) {
      clearLegacyIdentity();
      window.location.reload();
      return;
    }
    useAuthStore.getState().setUser(result.data.user, Date.parse(result.data.expires_at));
  } catch (error) {
    if (current !== operation) return;
    if (error instanceof ApiError && error.status === 401) {
      setCsrfToken(null);
      useAuthStore.getState().clearAuth();
    } else {
      useAuthStore.getState().setError(error instanceof Error ? error.message : "Unable to verify your session.");
    }
  }
}

async function sessionMutation<T>(endpoint: string, data?: unknown): Promise<T> {
  try {
    return await apiFetch<T>(endpoint, { method: "POST", data });
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 419) throw error;
    setCsrfToken(null);
    return apiFetch<T>(endpoint, { method: "POST", data });
  }
}

export async function loginStaff(emailOrUsername: string, password: string) {
  const current = ++operation;
  const result = await sessionMutation<StaffSessionResponse>("/auth/login", {
    email_or_username: emailOrUsername, password,
  });
  if (current === operation) {
    clearLegacyIdentity();
    setCsrfToken(result.data.csrf_token);
    useAuthStore.getState().setUser(result.data.user, Date.parse(result.data.expires_at));
  }
  return result;
}

export async function logoutStaff() {
  ++operation;
  try {
    await sessionMutation<void>("/auth/logout");
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error;
  }
  setCsrfToken(null);
  clearLegacyIdentity();
  useAuthStore.getState().clearAuth();
  window.location.replace("/auth?tab=signin");
}
