import { ApiError, apiFetch, setCsrfToken, SessionChangedError } from "@/api/client/apClient";
import { useAuthStore } from "@/store/useAuthStore";
import { clearLegacySessionData } from "@/lib/sessionScope";
import type { StaffSessionResponse } from "@/types/session";

let operation = 0;
const eventKey = "easycare.session.changed";
const listeners = new Set<() => void>();
let channel: BroadcastChannel | null = null;
let lastEvent = "";

export const clearLegacyIdentity = clearLegacySessionData;

function receiveEvent(value: unknown) {
  if (typeof value !== "string" || value === lastEvent) return;
  lastEvent = value;
  for (const listener of listeners) listener();
}

export function watchSessionChanges(listener: () => void) {
  listeners.add(listener);
  try {
    channel ??= new BroadcastChannel(eventKey);
    channel.onmessage = (event: MessageEvent<unknown>) => receiveEvent(event.data);
  } catch { channel = null; }
  const onStorage = (event: StorageEvent) => {
    if (event.key === eventKey && event.newValue) receiveEvent(event.newValue);
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    if (listeners.size === 0) { channel?.close(); channel = null; }
  };
}

export function announceSessionChange() {
  const event = crypto.randomUUID();
  lastEvent = event;
  try { channel?.postMessage(event); } catch { /* The server remains the authority. */ }
  try {
    localStorage.setItem(eventKey, event);
    localStorage.removeItem(eventKey);
  } catch { /* Storage is optional; focus also rechecks the server. */ }
}

function applySession(result: StaffSessionResponse) {
  const data = result?.data;
  if (!data?.user || !Number.isInteger(data.user.id) || data.user.id <= 0 || data.user.is_active !== true
    || !Array.isArray(data.user.roles) || !Array.isArray(data.user.permissions)
    || !data.user.roles.every((role) => typeof role.code === "string")
    || !data.user.permissions.every((permission) => typeof permission === "string")
    || typeof data.csrf_token !== "string" || !Number.isFinite(Date.parse(data.expires_at))
    || Date.parse(data.expires_at) <= Date.now()) {
    throw new ApiError("The hospital server returned an invalid staff session.", 0, "invalid_session");
  }
  useAuthStore.getState().setUser(data.user, Date.parse(data.expires_at));
  setCsrfToken(data.csrf_token);
}

export async function restoreSession(blocking = false) {
  const current = ++operation;
  if (blocking) useAuthStore.getState().lockAuth();
  try {
    const result = await apiFetch<StaffSessionResponse>("/auth/me");
    if (current !== operation) return;
    applySession(result);
  } catch (cause) {
    if (current !== operation || cause instanceof SessionChangedError) return;
    if (cause instanceof ApiError && cause.status === 401) useAuthStore.getState().clearAuth();
    else useAuthStore.getState().setError(cause instanceof Error ? cause.message : "Unable to verify your session.");
  }
}

async function sessionMutation<T>(endpoint: string, data?: unknown): Promise<T> {
  try { return await apiFetch<T>(endpoint, { method: "POST", data }); }
  catch (cause) {
    if (!(cause instanceof ApiError) || cause.status !== 419) throw cause;
    setCsrfToken(null);
    return apiFetch<T>(endpoint, { method: "POST", data });
  }
}

export async function loginStaff(emailOrUsername: string, password: string) {
  const current = ++operation;
  const result = await sessionMutation<StaffSessionResponse>("/auth/login", {
    email_or_username: emailOrUsername, password,
  });
  if (current !== operation) throw new SessionChangedError();
  applySession(result);
  announceSessionChange();
  return result;
}

export async function logoutStaff() {
  const current = ++operation;
  try { await sessionMutation<void>("/auth/logout"); }
  catch (cause) {
    if (!(cause instanceof ApiError) || cause.status !== 401) throw cause;
  }
  if (current !== operation) throw new SessionChangedError();
  useAuthStore.getState().clearAuth();
  announceSessionChange();
  window.location.replace("/auth?tab=signin");
}
