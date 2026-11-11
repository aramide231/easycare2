import { apiFetch } from "@/api/client/apClient";

export const auditActions = {
  "patient.created": "Patient registered",
  "patient.updated": "Patient details updated",
  "patient.listed": "Patient registry searched",
  "patient.viewed": "Patient record viewed",
  "patient.duplicates_checked": "Patient duplicates checked",
  "command.replayed": "Previous save confirmed",
  "file.uploaded": "File uploaded",
  "file.listed": "File list viewed",
  "file.viewed": "File details viewed",
  "file.download_authorized": "File download authorized",
  "file.integrity_checked": "File integrity checked",
  "staff.created": "Staff account created",
  "staff.updated": "Staff account updated",
  "staff.recovery_issued": "Recovery code issued",
  "staff.password_reset": "Password reset",
  "role.permission_granted": "Role permission granted",
  "role.permission_revoked": "Role permission revoked",
  "auth.login": "Sign in",
  "auth.logout": "Sign out",
  "audit.viewed": "Audit history viewed",
} as const;
export interface AuditEvent {
  id: number;
  action: keyof typeof auditActions;
  outcome: "succeeded" | "denied" | "failed";
  channel: "http" | "console";
  actor_id: number | null;
  subject_type: "staff" | "role" | "audit" | "file" | "patient";
  subject_id: number | null;
  request_id: string;
  occurred_at: string;
  safe_summary: Record<string, string | number | boolean | string[] | null>;
}
export interface AuditFilters {
  action: string; outcome: string; channel: string; actor_id: string;
  subject_type: string; subject_id: string; from: string; to: string;
}
export interface AuditPage {
  data: AuditEvent[];
  through_id: number;
  meta: { current_page: number; last_page: number; total: number };
}
export function listAuditEvents(filters: AuditFilters, page: number, throughId?: number, signal?: AbortSignal) {
  const query = new URLSearchParams({ page: String(page), per_page: "20" });
  for (const [key, value] of Object.entries(filters)) if (value) query.set(key, value);
  if (throughId !== undefined) query.set("through_id", String(throughId));
  return apiFetch<AuditPage>("/audit-events?" + query, { signal });
}
