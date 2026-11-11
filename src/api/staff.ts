import { apiFetch } from "@/api/client/apClient";
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
export const saveStaff = (id: number | null, data: StaffInput) => apiFetch<{ data: ManagedStaff }>(
  id === null ? "/staff-management" : "/staff-management/" + id,
  { method: id === null ? "POST" : "PATCH", data },
);
export const issueResetCode = (user: ManagedStaff, password: string) => apiFetch<{
  data: { user: ManagedStaff; reset_code: string; expires_at: string };
}>("/staff-management/" + user.id + "/password-reset", {
  method: "POST", data: { version: user.version, current_password: password, identity_verified: true },
});
