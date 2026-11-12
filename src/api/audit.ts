import { apiFetch } from "@/api/client/apClient";

export const auditActions = {
  "appointment.attended": "Appointment arrival recorded",
  "encounter.opened": "Visit opened",
  "encounter.assigned": "Clinician assigned",
  "encounter.reassigned": "Clinician reassigned",
  "encounter.accepted": "Visit accepted by clinician",
  "encounter.completed": "Visit completed",
  "encounter.cancelled": "Visit cancelled",
  "encounter.listed": "Visit queues searched",
  "encounter.viewed": "Visit viewed",
  "encounter.history_viewed": "Visit history viewed",
  "appointment.created": "Appointment booked",
  "appointment.updated": "Booking details updated",
  "appointment.rescheduled": "Appointment rescheduled",
  "appointment.confirmed": "Appointment confirmed",
  "appointment.cancelled": "Appointment cancelled",
  "appointment.no_show": "Appointment marked no-show",
  "appointment.listed": "Bookings searched",
  "appointment.viewed": "Booking viewed",
  "appointment.history_viewed": "Booking history viewed",
  "patient.created": "Patient registered",
  "patient.updated": "Patient details updated",
  "patient.listed": "Patient registry searched",
  "patient.viewed": "Patient record viewed",
  "patient.duplicates_checked": "Patient duplicates checked",
  "patient.flagged": "Patient flag added",
  "patient.flag_resolved": "Patient flag resolved",
  "patient.flags_viewed": "Patient flags viewed",
  "patient.card_changed": "Patient card changed",
  "patient.card_history_viewed": "Patient card history viewed",
  "patient.access_restricted": "Patient access restricted",
  "patient.access_restored": "Patient access restored",
  "patient.access_state_viewed": "Patient access state viewed",
  "patient.merge_requested": "Patient merge requested",
  "patient.merge_approved": "Patient merge approved",
  "patient.merge_rejected": "Patient merge rejected",
  "patient.merge_cancelled": "Patient merge cancelled",
  "patient.merge_requests_viewed": "Patient merge requests viewed",
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
  subject_type: "staff" | "role" | "audit" | "file" | "patient" | "appointment" | "encounter";
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
