import type { StaffUser } from "@/types/session";

const resets = new Set<() => void>();
const objectUrls = new Set<string>();
const legacyKeys = ["easycare-auth", "easyCareSession", "mockUser", "easyCareDoctorProfile", "mockPatients", "patients"];

export function registerSessionCleanup(reset: () => void) {
  resets.add(reset);
  return () => { resets.delete(reset); };
}

export function clearLegacySessionData() {
  for (const name of ["localStorage", "sessionStorage"] as const) {
    try {
      const storage = window[name];
      for (const key of legacyKeys) storage.removeItem(key);
    } catch {
      // Browser storage may be disabled; identity never depends on it.
    }
  }
}

export function resetSessionData() {
  clearLegacySessionData();
  for (const url of objectUrls) URL.revokeObjectURL(url);
  objectUrls.clear();
  for (const reset of resets) reset();
}

export function createSessionObjectUrl(blob: Blob) {
  const url = URL.createObjectURL(blob);
  objectUrls.add(url);
  return url;
}

export function staffAccessScope(user: StaffUser) {
  return JSON.stringify([
    user.id, user.department?.id ?? null, user.is_active,
    user.roles.map((role) => role.code).sort(), [...user.permissions].sort(),
  ]);
}
