import { ApiError, apiFetch } from "@/api/client/apClient";
import type { StaffUser } from "@/types/session";

export interface ManagedStaff extends StaffUser {
  version: number;
  last_login_at: string | null;
  created_at: string;
}
export interface StaffOptions {
  departments: { id: number; code: string; name: string }[];
  roles: { code: string; name: string; assignable: boolean }[];
}
export interface StaffPage {
  data: ManagedStaff[];
  meta: { current_page: number; last_page: number; total: number };
}
export interface StaffInput {
  username?: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string | null;
  staff_code: string | null;
  department_id: number | null;
  role_codes: string[];
  is_active: boolean;
  current_password: string;
  version?: number;
}
export const listStaff = (q: string, page: number) => apiFetch<StaffPage>(
  "/staff-management?" + new URLSearchParams({ q, page: String(page), per_page: "20" }),
);
export const staffOptions = () => apiFetch<{ data: StaffOptions }>("/staff-management/options");
export async function saveStaff(id: number | null, data: StaffInput, key: string) {
  const result = await apiFetch<{ data: ManagedStaff }>(
    id === null ? "/staff-management" : "/staff-management/" + id,
    { method: id === null ? "POST" : "PATCH", data, headers: { "Idempotency-Key": key } },
  );
  if (!Number.isSafeInteger(result?.data?.id) || result.data.id < 1 ||
      !Number.isSafeInteger(result.data.version) || result.data.version < 1 ||
      (id !== null && result.data.id !== id)) {
    throw new ApiError("The hospital server did not confirm the saved staff record. Retry this same submission.", 200, "invalid_response");
  }
  return result;
}

export async function issueResetCode(user: ManagedStaff, password: string, key: string) {
  const result = await apiFetch<{
    data: { user: ManagedStaff; reset_code: string; expires_at: string };
  }>("/staff-management/" + user.id + "/password-reset", {
    method: "POST", headers: { "Idempotency-Key": key },
    data: { version: user.version, current_password: password, identity_verified: true },
  });
  if (result?.data?.user?.id !== user.id || !/^[0-9a-f]{48}$/.test(result.data.reset_code ?? "") ||
      !Number.isFinite(Date.parse(result.data.expires_at))) {
    throw new ApiError("The recovery response could not be confirmed. Check the previous issuance before requesting a replacement.", 200, "invalid_response");
  }
  return result;
}
