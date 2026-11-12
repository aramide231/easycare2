import { ApiError, apiFetch } from "@/api/client/apClient";
import { patientId, type PatientPage } from "@/api/patients";

export const HOSPITAL_TIMEZONE = "Africa/Lagos";
export type BookingStatus = "booked" | "confirmed" | "attended" | "cancelled" | "no_show";
export type VisitStatus = "open" | "in_progress" | "closed" | "cancelled";
export type QueueState = "unassigned" | "waiting" | "in_progress";
export interface Booking {
  id: number; version: number; patient_id: number | null; doctor_id: number | null; doctor_name?: string | null; booked_by: number;
  first_name: string; last_name: string; phone: string; booking_channel: string; visit_type: string;
  specialist_name: string | null; specialist_email: string | null; starts_at: string; ends_at: string | null;
  status: BookingStatus; follow_up_of_id: number | null; created_at: string; updated_at: string;
}
export interface BookingInput {
  first_name: string; last_name: string; phone: string; booking_channel: string; visit_type: string;
  specialist_name: string | null; specialist_email: string | null; starts_at: string; ends_at: string;
  doctor_id: number | null; patient_id?: number | null; follow_up_of_id?: number;
  version?: number; reason?: string;
}
export interface Assignment {
  id: number; doctor_id: number; doctor_name?: string | null; assigned_by: number; ended_by: number | null; version: number;
  consultation_type: string; status: "assigned" | "accepted" | "completed" | "reassigned" | "cancelled";
  assigned_at: string; accepted_at: string | null; ended_at: string | null; end_reason?: string | null;
}
export interface Visit {
  id: number; version: number; patient_id: number; appointment_id: number | null; category_id: number; opened_by: number;
  visit_type: string; care_setting: string; status: VisitStatus; opened_at: string; closed_at: string | null;
  queue: QueueState | null; current_assignment: Assignment | null;
  patient: { id: number; mrn: string; first_name: string; last_name: string; version: number };
}
export interface VisitInput {
  version?: number; patient_id?: number; patient_version?: number; identity_verified?: boolean;
  care_setting?: string; visit_type?: string; reason?: string; doctor_id?: number;
  consultation_type?: string; assignment_id?: number; assignment_version?: number;
}
export type VisitAction = "assign" | "reassign" | "accept" | "complete" | "cancel";
export interface Revision {
  id: number; version: number; operation: string; actor_id: number; reason: string | null; recorded_at: string;
  snapshot: Record<string, unknown>;
}
export interface BookingOptions { timezone: string; booking_channels: string[]; visit_types: string[]; statuses: BookingStatus[]; }
export interface VisitOptions { timezone: string; care_settings: string[]; visit_types: string[]; queues: QueueState[]; }
export type Roster = PatientPage<{ id: number; name: string }>;
export type Filters = Record<string, string | number | undefined>;
const badResponse = () => new ApiError("The hospital server did not confirm this operation. Retry the same submission to confirm it.", 200, "invalid_response");
const path = (type: "appointments" | "encounters", id: number) => {
  if (!patientId(id)) throw new ApiError("Choose a valid saved record ID.", 422, "invalid_record_id");
  return "/" + type + "/" + id;
};
const query = (filters: Filters) => {
  const params = new URLSearchParams({ per_page: "20" });
  for (const [key, value] of Object.entries(filters)) if (value !== undefined && value !== "") params.set(key, String(value));
  return params.toString();
};
function validBooking(value: Booking): boolean {
  return !!value && !!patientId(value.id) && !!patientId(value.version)
    && ["booked", "confirmed", "attended", "cancelled", "no_show"].includes(value.status)
    && typeof value.first_name === "string" && typeof value.last_name === "string" && typeof value.phone === "string"
    && Number.isFinite(Date.parse(value.starts_at));
}
function validVisit(value: Visit): boolean {
  return !!value && !!patientId(value.id) && !!patientId(value.version) && !!patientId(value.patient_id)
    && value.patient?.id === value.patient_id && typeof value.patient.mrn === "string"
    && ["open", "in_progress", "closed", "cancelled"].includes(value.status)
    && Number.isFinite(Date.parse(value.opened_at));
}
export const listBookings = (filters: Filters = {}, signal?: AbortSignal) => apiFetch<PatientPage<Booking>>("/appointments?" + query(filters), { signal });
export const listVisits = (filters: Filters = {}, queues = false, signal?: AbortSignal) => apiFetch<PatientPage<Visit>>((queues ? "/queues?" : "/encounters?") + query(filters), { signal });
export async function bookingOptions(signal?: AbortSignal) {
  const result = await apiFetch<{ data: BookingOptions }>("/appointments/options", { signal });
  if (result.data?.timezone !== HOSPITAL_TIMEZONE || !Array.isArray(result.data.visit_types) || !Array.isArray(result.data.booking_channels)) throw badResponse();
  return result;
}
export async function visitOptions(signal?: AbortSignal) {
  const result = await apiFetch<{ data: VisitOptions }>("/encounters/options", { signal });
  if (result.data?.timezone !== HOSPITAL_TIMEZONE || !Array.isArray(result.data.visit_types) || !Array.isArray(result.data.care_settings)) throw badResponse();
  return result;
}
export const listClinicians = (type: "appointments" | "encounters", q: string, page: number, signal?: AbortSignal) =>
  apiFetch<Roster>("/" + type + "/clinicians?" + query({ q, page }), { signal });
export async function getBooking(id: number, signal?: AbortSignal) {
  const result = await apiFetch<{ data: Booking }>(path("appointments", id), { signal });
  if (!validBooking(result.data) || result.data.id !== id) throw badResponse();
  return result;
}
export async function getVisit(id: number, signal?: AbortSignal) {
  const result = await apiFetch<{ data: Visit }>(path("encounters", id), { signal });
  if (!validVisit(result.data) || result.data.id !== id) throw badResponse();
  return result;
}
export const bookingHistory = (id: number, page: number, signal?: AbortSignal) => apiFetch<PatientPage<Revision>>(path("appointments", id) + "/history?" + query({ page }), { signal });
export const visitHistory = (id: number, page: number, signal?: AbortSignal) => apiFetch<PatientPage<Revision>>(path("encounters", id) + "/history?" + query({ page }), { signal });
export const assignmentHistory = (id: number, page: number, signal?: AbortSignal) => apiFetch<PatientPage<Assignment>>(path("encounters", id) + "/assignments?" + query({ page }), { signal });
export async function saveBooking(id: number | null, data: Partial<BookingInput>, key: string) {
  const result = await apiFetch<{ data: Booking }>(id === null ? "/appointments" : path("appointments", id), {
    method: id === null ? "POST" : "PATCH", data, headers: { "Idempotency-Key": key },
  });
  if (!validBooking(result.data) || result.data.version !== (id === null ? 1 : (data.version ?? 0) + 1)
    || (id !== null && result.data.id !== id) || (id === null && (result.data.status !== "booked" || result.data.patient_id !== (data.patient_id ?? null)))) throw badResponse();
  for (const [field, expected] of Object.entries(data)) {
    if (field === "reason" || field === "version" || expected === undefined) continue;
    const actual = result.data[field as keyof Booking];
    if (field === "starts_at" || field === "ends_at") {
      if (Date.parse(String(actual)) !== Date.parse(String(expected))) throw badResponse();
    } else if (field === "phone") {
      const normalized = String(expected).replace(/[ ()-]/g, "");
      if (actual !== (normalized.startsWith("+") ? normalized : "+" + normalized)) throw badResponse();
    } else if (field === "specialist_email") {
      if (actual !== (typeof expected === "string" ? expected.trim().toLowerCase() || null : expected)) throw badResponse();
    } else if (actual !== (typeof expected === "string" ? expected.trim() || null : expected)) throw badResponse();
  }
  return result;
}
export async function bookingCommand(id: number, action: "confirm" | "cancel" | "no-show", data: { version: number; reason: string }, key: string) {
  const result = await apiFetch<{ data: Booking }>(path("appointments", id) + "/" + action, { method: "POST", data, headers: { "Idempotency-Key": key } });
  const status = { confirm: "confirmed", cancel: "cancelled", "no-show": "no_show" }[action];
  if (!validBooking(result.data) || result.data.id !== id || result.data.version !== data.version + 1 || result.data.status !== status) throw badResponse();
  return result;
}
export async function openVisit(bookingId: number | null, data: VisitInput, key: string) {
  const result = await apiFetch<{ data: Visit }>(bookingId === null ? "/encounters" : path("appointments", bookingId) + "/arrive", {
    method: "POST", data, headers: { "Idempotency-Key": key },
  });
  if (!validVisit(result.data) || result.data.version !== 1 || result.data.status !== "open" || result.data.current_assignment !== null
    || result.data.patient_id !== data.patient_id || result.data.appointment_id !== bookingId) throw badResponse();
  return result;
}
export async function visitCommand(id: number, action: VisitAction, data: VisitInput, key: string) {
  const result = await apiFetch<{ data: Visit }>(path("encounters", id) + "/" + action, { method: "POST", data, headers: { "Idempotency-Key": key } });
  const visit = result.data;
  if (!validVisit(visit) || visit.id !== id || visit.version !== (data.version ?? 0) + 1) throw badResponse();
  if (action === "complete" || action === "cancel") {
    if (visit.status !== (action === "complete" ? "closed" : "cancelled") || visit.current_assignment !== null) throw badResponse();
  } else {
    const assignment = visit.current_assignment;
    if (!assignment || !patientId(assignment.id) || !patientId(assignment.version)) throw badResponse();
    if (action === "accept" ? assignment.id !== data.assignment_id || assignment.version !== (data.assignment_version ?? 0) + 1
      || assignment.status !== "accepted" || visit.status !== "in_progress"
      : assignment.doctor_id !== data.doctor_id || assignment.version !== 1 || assignment.status !== "assigned"
        || action === "reassign" && assignment.id === data.assignment_id) throw badResponse();
  }
  return result;
}

/** The hospital uses Nigeria time, with an explicit +01:00 offset independent of the device clock zone. */
export function hospitalInstant(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new ApiError("Choose a valid hospital date and time.", 422, "invalid_hospital_time");
  const [, year, month, day, hour, minute] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
  if (year < 1900 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day
    || hour > 23 || minute > 59) throw new ApiError("Choose a real hospital date and time.", 422, "invalid_hospital_time");
  return value + ":00+01:00";
}
export function hospitalInput(instant: string | null): string {
  if (!instant || !Number.isFinite(Date.parse(instant))) return "";
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: HOSPITAL_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(instant));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
}
export function hospitalTime(instant: string | null): string {
  return instant && Number.isFinite(Date.parse(instant)) ? new Intl.DateTimeFormat("en-GB", { timeZone: HOSPITAL_TIMEZONE, dateStyle: "medium", timeStyle: "short" }).format(new Date(instant)) : "Not recorded";
}
