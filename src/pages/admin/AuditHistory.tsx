import { useEffect, useState, type FormEvent } from "react";
import { auditActions, listAuditEvents, type AuditEvent, type AuditFilters, type AuditPage } from "@/api/audit";
import { useAuth } from "@/context/AuthContext";

const blank: AuditFilters = { action: "", outcome: "", channel: "", actor_id: "", subject_type: "", subject_id: "", from: "", to: "" };
const control = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#573FD1]";
const button = "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm disabled:opacity-50";
const labels: Record<string, string> = {
  record_id: "Related record ID",
  category_id: "Patient category ID", contact_count: "Emergency contacts", contacts_changed: "Emergency contacts changed",
  duplicates_acknowledged: "Possible duplicates reviewed", contacts: "Emergency contacts", sex: "Sex", date_of_birth: "Date of birth",
  dob_estimated: "Estimated birth date", phone: "Phone", marital_status: "Marital status", religion: "Religion",
  occupation: "Occupation", state_of_origin: "State of origin", address: "Address",
  byte_size: "Size (bytes)", mime_type: "File type", checked: "Files checked", missing: "Missing files", corrupt: "Changed files", orphaned: "Files without records",
  changed_fields: "Fields changed", previous_role_codes: "Previous roles", role_codes: "Roles",
  previous_department_id: "Previous department ID", department_id: "Department ID",
  previous_is_active: "Previously active", is_active: "Active", version: "Record version",
  sessions_revoked: "Sessions revoked", permission_code: "Permission", changed: "Grant changed",
  first_name: "First name", last_name: "Last name", middle_name: "Middle name", email: "Email", staff_code: "Staff code",
};
const outcomes = { succeeded: "Succeeded", denied: "Denied", failed: "Failed" };
const outcomeStyle = { succeeded: "bg-green-50 text-green-800", denied: "bg-amber-50 text-amber-900", failed: "bg-red-50 text-red-800" };
function summaryValue(value: AuditEvent["safe_summary"][string]): string {
  if (Array.isArray(value)) return value.map((item) => labels[item] || item).join(", ") || "None";
  if (value === null) return "None";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export default function AuditHistory() {
  const { user } = useAuth();
  const canRead = user?.permissions?.includes("audit.view") ?? false;
  const [draft, setDraft] = useState<AuditFilters>(blank);
  const [query, setQuery] = useState<{ filters: AuditFilters; page: number; throughId?: number }>({ filters: blank, page: 1 });
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState<AuditPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setResult(null); setError(""); setLoading(true);
    if (!canRead) { setLoading(false); return; }
    listAuditEvents(query.filters, query.page, query.throughId, controller.signal).then((response) => {
      if (active) setResult(response);
    }).catch((cause: unknown) => {
      if (active) setError(cause instanceof Error ? cause.message : "Unable to load audit history.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [query, revision, canRead, user?.id]);

  const field = (key: keyof AuditFilters, value: string) => setDraft((old) => ({ ...old, [key]: value, ...(key === "subject_type" && !value ? { subject_id: "" } : {}) }));
  const search = (event: FormEvent) => { event.preventDefault(); setQuery({ filters: { ...draft }, page: 1 }); };
  const reset = () => { setDraft(blank); setQuery({ filters: blank, page: 1 }); };
  const refresh = () => { setQuery((old) => ({ filters: old.filters, page: 1 })); setRevision((value) => value + 1); };
  const page = (number: number) => { if (result) setQuery((old) => ({ ...old, page: number, throughId: result.through_id })); };

  if (!canRead) return <p role="alert">Your account does not have permission to review audit history.</p>;
  return <section aria-labelledby="audit-title">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div><h1 id="audit-title" className="text-2xl font-bold">Audit history</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">Review visit, appointment, patient, staff, recovery, sign-in and file activity. Times use UTC. Select Refresh to include new activity.</p></div>
      <button className={button} disabled={loading} onClick={refresh}>Refresh</button>
    </div>
    <form onSubmit={search} className="mb-6 rounded-xl border bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div><label htmlFor="audit-action" className="text-sm font-medium">Action</label><select id="audit-action" className={control} value={draft.action} onChange={(event) => field("action", event.target.value)}>
          <option value="">All actions</option>{Object.entries(auditActions).map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select></div>
        <div><label htmlFor="audit-outcome" className="text-sm font-medium">Outcome</label><select id="audit-outcome" className={control} value={draft.outcome} onChange={(event) => field("outcome", event.target.value)}>
          <option value="">All outcomes</option>{Object.entries(outcomes).map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select></div>
        <div><label htmlFor="audit-channel" className="text-sm font-medium">Source</label><select id="audit-channel" className={control} value={draft.channel} onChange={(event) => field("channel", event.target.value)}>
          <option value="">All sources</option><option value="http">Web app</option><option value="console">Server console</option></select></div>
        <label className="text-sm font-medium">Staff actor ID<input className={control} inputMode="numeric" pattern="[1-9][0-9]*" value={draft.actor_id} onChange={(event) => field("actor_id", event.target.value)} /></label>
        <div><label htmlFor="audit-subject_type" className="text-sm font-medium">Record type</label><select id="audit-subject_type" className={control} value={draft.subject_type} onChange={(event) => field("subject_type", event.target.value)}>
          <option value="">All record types</option><option value="staff">Staff account</option><option value="role">Role</option><option value="patient">Patient</option><option value="appointment">Appointment</option><option value="encounter">Visit</option><option value="clinical">Clinical record</option><option value="file">File</option><option value="audit">Audit history</option></select></div>
        <label className="text-sm font-medium">Record ID<input className={control} inputMode="numeric" pattern="[1-9][0-9]*" disabled={!draft.subject_type} value={draft.subject_id} onChange={(event) => field("subject_id", event.target.value)} /></label>
        <label className="text-sm font-medium">From date (UTC)<input className={control} type="date" value={draft.from} max={draft.to || undefined} onChange={(event) => field("from", event.target.value)} /></label>
        <label className="text-sm font-medium">To date (UTC)<input className={control} type="date" value={draft.to} min={draft.from || undefined} onChange={(event) => field("to", event.target.value)} /></label>
      </div>
      <div className="mt-4 flex gap-3"><button className="rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-medium text-white disabled:opacity-50" disabled={loading}>Apply filters</button>
        <button className={button} type="button" disabled={loading} onClick={reset}>Clear filters</button></div>
    </form>
    {loading && <p role="status">Loading audit history...</p>}
    {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"><p>{error}</p><button className="mt-2 underline" onClick={refresh}>Try again</button></div>}
    {result && <>
      <p role="status" className="mb-3 text-sm text-slate-600">{result.meta.total} matching events</p>
      {result.data.length === 0 ? <p className="rounded-xl border bg-white p-8 text-center">No audit events match these filters.</p> :
        <div className="overflow-x-auto rounded-xl border bg-white"><table className="w-full min-w-[840px] text-left text-sm">
          <caption className="sr-only">Staff and security audit events, newest first</caption>
          <thead className="bg-slate-100 text-slate-600"><tr>{["Time (UTC)", "Action", "Actor", "Record", "Outcome", "Details"].map((heading) => <th scope="col" key={heading} className="px-4 py-3 font-medium">{heading}</th>)}</tr></thead>
          <tbody>{result.data.map((event) => <tr key={event.id} className="border-t align-top">
            <td className="whitespace-nowrap px-4 py-4"><time dateTime={event.occurred_at}>{event.occurred_at.slice(0, 19).replace("T", " ")}</time><p className="mt-1 text-xs text-slate-500">Event #{event.id}</p></td>
            <td className="px-4 py-4">{auditActions[event.action] || event.action}<p className="mt-1 text-xs text-slate-500">{event.channel === "console" ? "Server console" : "Web app"}</p></td>
            <td className="px-4 py-4">{event.actor_id !== null ? "Staff #" + event.actor_id : event.channel === "console" ? "Server console" : "Unauthenticated"}</td>
            <td className="px-4 py-4">{event.subject_type === "audit" ? "Audit history" : event.subject_type === "staff" ? "Staff account" : event.subject_type === "patient" ? "Patient" : event.subject_type === "appointment" ? "Appointment" : event.subject_type === "encounter" ? "Visit" : event.subject_type === "clinical" ? "Clinical record" : event.subject_type === "file" ? "File" : "Role"}{event.subject_id !== null && " #" + event.subject_id}</td>
            <td className="px-4 py-4"><span className={"rounded-full px-2 py-1 text-xs font-medium " + outcomeStyle[event.outcome]}>{outcomes[event.outcome]}</span></td>
            <td className="max-w-xs px-4 py-4">{Object.keys(event.safe_summary).length > 0 ? <details><summary className="cursor-pointer text-[#573FD1]">View details</summary>
              <dl className="mt-3 space-y-2">{Object.entries(event.safe_summary).map(([key, value]) => <div key={key}><dt className="text-xs font-medium text-slate-500">{labels[key] || key}</dt><dd className="break-words">{summaryValue(value)}</dd></div>)}</dl></details> : <span className="text-slate-500">No additional details</span>}</td>
          </tr>)}</tbody>
        </table></div>}
      <nav aria-label="Audit history pages" className="mt-4 flex items-center justify-between gap-4">
        <button className={button} disabled={loading || result.meta.current_page <= 1} onClick={() => page(result.meta.current_page - 1)}>Previous</button>
        <span className="text-sm">Page {result.meta.current_page} of {result.meta.last_page}</span>
        <button className={button} disabled={loading || result.meta.current_page >= result.meta.last_page} onClick={() => page(result.meta.current_page + 1)}>Next</button>
      </nav>
    </>}
  </section>;
}
