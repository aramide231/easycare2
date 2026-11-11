import { ApiError, apiFetch } from "@/api/client/apClient";

export interface PatientCategory { id: number; code: string; name: string; }
export interface PatientContact { id?: number; name: string; relationship: string; phone: string; priority?: number; }
export interface PatientSummary {
  id: number; mrn: string; first_name: string; middle_name: string | null; last_name: string;
  sex: string | null; date_of_birth: string | null; dob_estimated: boolean; category: PatientCategory;
  version: number; created_at: string; updated_at: string;
}
export interface PatientRecord extends PatientSummary {
  email: string | null; phone: string | null; marital_status: string | null; religion: string | null;
  occupation: string | null; state_of_origin: string | null; address: string | null;
  life_status: string; deceased_at: string | null; created_by: number; contacts: PatientContact[];
  identifiers: { identifier: string; kind: string; retired_at: string | null }[];
}
export interface PatientInput {
  first_name: string; last_name: string; middle_name: string | null; sex: string | null;
  date_of_birth: string | null; dob_estimated: boolean; email: string | null; phone: string | null;
  marital_status: string | null; religion: string | null; occupation: string | null;
  state_of_origin: string | null; address: string | null; contacts: PatientContact[];
  mrn?: string; category_id?: number; version?: number; acknowledged_duplicate_ids?: number[];
}
export interface PatientPage<T = PatientSummary> {
  data: T[]; meta: { current_page: number; last_page: number; total: number };
}
export interface PatientFilters { q?: string; mrn?: string; category_id?: string; date_of_birth?: string; page?: number; }
export interface PatientFlag {
  id: number; type: string; reason: string; created_by: number; created_at: string;
  resolved_by: number | null; resolution_reason: string | null; resolved_at: string | null;
}
export interface CardHistory {
  id: number; previous_category_id: number; new_category_id: number; previous_mrn: string; new_mrn: string;
  reason: string; changed_by: number; changed_at: string;
}
export interface MergeRequest {
  id: number; source_patient_id: number; target_patient_id: number; source_version: number; target_version: number;
  requested_by: number; status: "pending" | "approved" | "rejected" | "cancelled"; version: number;
  reviewed_by: number | null; reviewed_at: string | null; reason?: string; review_reason?: string | null;
}
export interface PatientAccess { id: number; version: number; access_status: "active" | "restricted" | "merged"; }
export type RecordAction = "flags.store" | "flags.resolve" | "cards.change" | "access.restrict" | "access.restore"
  | "merges.request" | "merges.approve" | "merges.reject" | "merges.cancel";
export interface RecordReceipt { id: number; version: number; operation: RecordAction; record_id: number; }
export interface RecordInput {
  version: number; reason: string; current_password?: string; type?: string; mrn?: string; category_id?: number;
  target_patient_id?: number; target_version?: number; request_version?: number;
}

export function patientId(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (!/^[1-9][0-9]*$/.test(String(value))) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}
export const patientName = (patient: Pick<PatientSummary, "first_name" | "middle_name" | "last_name">) =>
  [patient.first_name, patient.middle_name, patient.last_name].filter(Boolean).join(" ");
const invalid = () => new ApiError("The hospital server did not confirm this patient operation. Retry the same submission to confirm it.", 200, "invalid_response");
const idPath = (id: number) => {
  if (patientId(id) === null) throw new ApiError("Choose a valid patient record ID.", 422, "invalid_patient_id");
  return "/patients/" + id;
};
export const patientOptions = (signal?: AbortSignal) => apiFetch<{ data: { categories: PatientCategory[] } }>("/patients/options", { signal });
export const listPatients = (filters: PatientFilters = {}, signal?: AbortSignal) => {
  const query = new URLSearchParams({ per_page: "20", sort: "last_name" });
  for (const [key, value] of Object.entries(filters)) if (value !== undefined && value !== "") query.set(key, String(value));
  return apiFetch<PatientPage>("/patients?" + query, { signal });
};
export async function getPatient(id: number, signal?: AbortSignal) {
  const result = await apiFetch<{ data: PatientRecord; meta: { requested_id: number; canonical_id: number } }>(idPath(id), { signal });
  if (!patientId(result?.data?.id) || !patientId(result.data.version) || result.meta?.requested_id !== id || result.meta.canonical_id !== result.data.id) throw invalid();
  return result;
}
export function checkPatientDuplicates(data: PatientInput, excludeId?: number, signal?: AbortSignal) {
  return apiFetch<{ data: PatientSummary[]; meta: { has_more: boolean } }>("/patients/duplicate-check", {
    method: "POST", signal, data: { first_name: data.first_name, last_name: data.last_name,
      date_of_birth: data.date_of_birth, phone: data.phone, ...(excludeId ? { exclude_id: excludeId } : {}) },
  });
}
export async function savePatient(id: number | null, data: PatientInput, key: string) {
  const result = await apiFetch<{ data: PatientRecord }>(id === null ? "/patients" : idPath(id), {
    method: id === null ? "POST" : "PATCH", data, headers: { "Idempotency-Key": key },
  });
  if (!patientId(result?.data?.id) || result.data.version !== (id === null ? 1 : (data.version ?? 0) + 1)
    || (id !== null && result.data.id !== id) || (id === null && result.data.mrn !== data.mrn?.trim().toUpperCase())) throw invalid();
  return result;
}
export const getPatientFlags = (id: number, page: number, signal?: AbortSignal) => apiFetch<PatientPage<PatientFlag>>(idPath(id) + "/flags?page=" + page, { signal });
export const getCardHistory = (id: number, page: number, signal?: AbortSignal) => apiFetch<PatientPage<CardHistory>>(idPath(id) + "/card-history?page=" + page, { signal });
export const getMergeRequests = (id: number, page: number, signal?: AbortSignal) => apiFetch<PatientPage<MergeRequest>>(idPath(id) + "/merge-requests?page=" + page, { signal });
export async function getPatientAccess(id: number, signal?: AbortSignal) {
  const result = await apiFetch<{ data: PatientAccess }>(idPath(id) + "/access-state", { signal });
  if (result?.data?.id !== id || !patientId(result.data.version) || !["active", "restricted", "merged"].includes(result.data.access_status)) throw invalid();
  return result;
}

export async function patientCommand(id: number, action: RecordAction, data: RecordInput, key: string, recordId?: number) {
  const nested = ["flags.resolve", "merges.approve", "merges.reject", "merges.cancel"].includes(action);
  if (nested && patientId(recordId) === null) throw new ApiError("Choose a valid management record.", 422, "invalid_record_id");
  const suffix = action === "flags.store" ? "/flags" : action === "flags.resolve" ? "/flags/" + recordId + "/resolve"
    : action === "cards.change" ? "/card" : action.startsWith("access.") ? "/access/" + action.split(".")[1]
      : action === "merges.request" ? "/merge-requests" : "/merge-requests/" + recordId + "/" + action.split(".")[1];
  const result = await apiFetch<{ data: RecordReceipt }>(idPath(id) + suffix, { method: "POST", data, headers: { "Idempotency-Key": key } });
  if (result?.data?.id !== id || result.data.version !== data.version + 1 || result.data.operation !== action
    || !patientId(result.data.record_id) || (nested && result.data.record_id !== recordId)) throw invalid();
  return result;
}
