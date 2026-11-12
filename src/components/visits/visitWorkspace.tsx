import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import { restoreSession } from "@/api/auth/session";
import { ApiError } from "@/api/client/apClient";
import { WriteAttempt, isUncertainWrite, writeErrorMessage } from "@/api/client/writeAttempt";
import { getPatient, listPatients, patientName, type PatientPage, type PatientRecord } from "@/api/patients";
import { listClinicians } from "@/api/visits";
import { patientControl, patientPrimary, patientSecondary, PatientPager, usePatientLoad } from "@/components/patient/patientWorkspace";
import { useAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/store/useAuthStore";
import { getRoleHomePath } from "@/lib/authRoutes";
import ProfileMenu from "@/components/header/ProfileMenu";

export { patientControl as control, patientPrimary as primary, patientSecondary as secondary, usePatientLoad as useLoad };
export function Pager({ meta, onPage }: { meta: PatientPage["meta"]; onPage: (page: number) => void }) {
  return <nav aria-label="Saved record pages" className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"><button className={patientSecondary} disabled={meta.current_page <= 1} onClick={() => onPage(meta.current_page - 1)}>Previous</button><span>Page {meta.current_page} of {meta.last_page} | {meta.total} records</span><button className={patientSecondary} disabled={meta.current_page >= meta.last_page} onClick={() => onPage(meta.current_page + 1)}>Next</button></nav>;
}
export async function relatedRecord<T>(request: Promise<T>, unavailable: () => void): Promise<T> {
  try { return await request; }
  catch (cause) {
    if (cause instanceof ApiError && [403, 404].includes(cause.status)) {
      unavailable();
      if (cause.status === 403) void restoreSession(true);
    }
    throw cause;
  }
}
export function VisitPermission({ booking = false, children }: { booking?: boolean; children: ReactNode }) {
  const { user } = useAuth();
  const revision = useAuthStore((state) => state.revision);
  const allowed = booking ? user?.permissions?.includes("appointments.view")
    : user?.permissions?.includes("encounters.view") && user.permissions?.includes("patients.view");
  return allowed ? <Fragment key={revision}>{children}</Fragment> : <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-5">Your account does not have permission to use this {booking ? "booking" : "visit"} feature.</p>;
}
export function WorkflowNav() {
  const { user } = useAuth();
  return <nav aria-label="Bookings and visits" className="mb-6 flex flex-wrap gap-3 text-sm text-[#573FD1]">
    {user?.permissions?.includes("appointments.view") && <Link className="underline" to="/appointments">Bookings</Link>}
    {user?.permissions?.includes("encounters.view") && user.permissions?.includes("patients.view") && <Link className="underline" to="/visits">Visits and queues</Link>}
    {user?.permissions?.includes("patients.view") && <Link className="underline" to="/patients">Patient registry</Link>}
  </nav>;
}
export default function VisitWorkspace() {
  const { user } = useAuth();
  return <div className="min-h-screen bg-[#f8f8fc] text-slate-900">
    <header className="border-b bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
      <Link to={getRoleHomePath(user?.userRole ?? "")} className="text-xl font-bold text-[#573FD1]">EasyCare <span className="font-normal text-slate-600">/ Bookings and visits</span></Link>
      <div className="flex items-center gap-4"><Link className="text-sm text-[#573FD1] underline" to={getRoleHomePath(user?.userRole ?? "")}>Dashboard</Link><ProfileMenu /></div>
    </div></header><main className="mx-auto max-w-7xl px-4 py-6 sm:px-8"><Outlet /></main>
  </div>;
}
export function LoadState({ loading, error, reload }: { loading: boolean; error: string; reload: () => void }) {
  return loading ? <p role="status" className="py-5">Loading saved records...</p> : error ? <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"><p>{error}</p><button className={patientSecondary + " mt-3"} onClick={reload}>Try again</button></div> : null;
}
export function Status({ value }: { value: string | null }) {
  return <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-800">{(value ?? "Finished").replace(/_/g, " ")}</span>;
}

/** A form keeps one immutable submission in memory until the server confirms it. */
export function useCommand<TInput, TOutput>(send: (input: TInput, key: string) => Promise<TOutput>, onSaved: (output: TOutput) => void, onUnavailable?: () => void) {
  const attempt = useRef(new WriteAttempt());
  const pending = useRef<TInput | null>(null);
  const active = useRef(true);
  const sending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  useEffect(() => { active.current = true; return () => { active.current = false; pending.current = null; attempt.current.reset(); }; }, []);
  const submit = async (makeInput: () => TInput) => {
    if (sending.current || blocked) return;
    sending.current = true; setBusy(true); setError(""); setErrors({});
    let started = false;
    try {
      const body = uncertain ? pending.current : makeInput();
      if (body === null) return;
      pending.current = structuredClone(body); started = true;
      const result = await send(pending.current, attempt.current.key());
      if (!active.current) return;
      pending.current = null; attempt.current.reset(); setUncertain(false); onSaved(result);
    } catch (cause) {
      if (!active.current) return;
      setError(writeErrorMessage(cause)); setErrors(cause instanceof ApiError ? cause.errors ?? {} : {});
      const unknown = uncertain || started && isUncertainWrite(cause);
      setUncertain(unknown);
      if (cause instanceof ApiError && cause.status === 409) setBlocked(true);
      if (cause instanceof ApiError && [401, 403, 404].includes(cause.status)) {
        pending.current = null; attempt.current.reset(); setUncertain(false); setBlocked(true);
        onUnavailable?.();
        if (cause.status === 403) void restoreSession(true);
      } else if (!unknown) { pending.current = null; attempt.current.reset(); }
    } finally { sending.current = false; if (active.current) setBusy(false); }
  };
  return { busy, uncertain, blocked, error, errors, locked: busy || uncertain || blocked, submit };
}
export function CommandState({ command, reload }: { command: { uncertain: boolean; blocked: boolean; error: string; errors: Record<string, string[]> }; reload: () => void }) {
  return <>
    {command.error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"><p>{command.error}</p>{Object.entries(command.errors).map(([field, messages]) => <p className="mt-1 text-sm" key={field}>{field.replace(/_/g, " ")}: {messages.join(" ")}</p>)}</div>}
    {command.uncertain && <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 p-4">The save may have completed. Retry the unchanged submission to confirm it. Leaving or refreshing discards this retry; check saved records before starting another submission.</p>}
    {command.blocked && <div role="alert" className="rounded-lg border bg-white p-4"><p>This action cannot continue. Reload and review the latest saved record and your access before submitting again.</p><button className={patientSecondary + " mt-3"} onClick={reload}>Reload latest record</button></div>}
  </>;
}
export function CommandSubmit({ command, label, disabled = false }: { command: { busy: boolean; uncertain: boolean; blocked: boolean }; label: string; disabled?: boolean }) {
  return <button className={patientPrimary} disabled={disabled || command.busy || command.blocked}>{command.busy ? "Saving..." : command.uncertain ? "Retry same submission" : label}</button>;
}

export function PatientPicker({ value, onChange }: { value: PatientRecord | null; onChange: (patient: PatientRecord | null) => void }) {
  const [term, setTerm] = useState("");
  const [mode, setMode] = useState("q");
  const [search, setSearch] = useState<{ q?: string; mrn?: string; page: number } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const results = usePatientLoad("visit-patient-picker-" + JSON.stringify(search), (signal) => listPatients(search!, signal), search !== null && value === null);
  const choose = async (id: number) => {
    setBusy(true); setError("");
    try {
      const result = await getPatient(id);
      if (!mounted.current) return;
      if (result.data.id !== id) { setError("This patient was merged. Search again and review the surviving record before selecting it."); return; }
      onChange(result.data);
    } catch (cause) { if (mounted.current) setError(cause instanceof Error ? cause.message : "Unable to load this patient."); }
    finally { if (mounted.current) setBusy(false); }
  };
  return <div className="space-y-3 break-words rounded-lg border p-4">
    <h3 className="font-semibold">Registered patient</h3>
    {value ? <div><p className="font-medium">{patientName(value)} - {value.mrn}</p><p className="mt-1 text-sm text-slate-600">Birth date: {value.date_of_birth ?? "Not recorded"} | Phone: {value.phone ?? "Not recorded"}</p><button type="button" className={patientSecondary + " mt-3"} onClick={() => { onChange(null); setSearch(null); }}>Choose another patient</button></div>
      : <><div className="grid gap-3 sm:grid-cols-[150px_1fr_auto]">
        <label className="text-sm">Find patient by<select aria-label="Find patient by" className={patientControl} value={mode} onChange={(e) => setMode(e.target.value)}><option value="q">Name / phone</option><option value="mrn">Card number</option></select></label>
        <label className="text-sm">Patient search<input className={patientControl} value={term} maxLength={100} onChange={(e) => setTerm(e.target.value)} /></label>
        <button type="button" className={patientSecondary + " self-end"} disabled={busy || !term.trim()} onClick={() => { setError(""); setSearch({ [mode]: term.trim(), page: 1 }); }}>Search patients</button></div>
        <LoadState {...results} />{search && results.data && <><p className="text-sm text-slate-600">{results.data.meta.total} matching patients</p>{results.data.data.map((patient) => <button type="button" key={patient.id} disabled={busy} onClick={() => void choose(patient.id)} className="block w-full rounded-lg border p-3 text-left text-sm hover:bg-violet-50 disabled:opacity-50"><strong>{patientName(patient)}</strong> - {patient.mrn}<span className="block text-slate-600">Birth date: {patient.date_of_birth ?? "Not recorded"}</span></button>)}<PatientPager meta={results.data.meta} onPage={(page) => setSearch((old) => ({ ...old, page }))} /></>}
        <Link className="inline-block text-sm text-[#573FD1] underline" to="/patients/register" target="_blank" rel="noreferrer">Register a new patient in another tab</Link>
      </>}
    {busy && <p role="status">Loading selected patient...</p>}{error && <p role="alert" className="text-sm text-red-800">{error}</p>}
  </div>;
}
export function ClinicianPicker({ type, value, onChange, optional = false }: { type: "appointments" | "encounters"; value: number | null; onChange: (id: number | null) => void; optional?: boolean }) {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState({ q: "", page: 1 });
  const list = usePatientLoad("roster-" + type + JSON.stringify(query), (signal) => listClinicians(type, query.q, query.page, signal));
  return <div className="space-y-3 rounded-lg border p-4">
    <div className="flex flex-wrap items-end gap-3"><label className="flex-1 text-sm">Find clinician<input className={patientControl} value={draft} maxLength={100} onChange={(e) => setDraft(e.target.value)} /></label><button type="button" className={patientSecondary} onClick={() => setQuery({ q: draft.trim(), page: 1 })}>Search clinicians</button></div>
    <LoadState {...list} />
    <label className="block text-sm font-medium">{type === "appointments" ? "Planned clinician" : "Assign clinician"}<select aria-label={type === "appointments" ? "Planned clinician" : "Assign clinician"} className={patientControl} required={!optional} value={value ?? ""} onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}>
      <option value="">{optional ? "No clinician selected" : "Choose a clinician"}</option>
      {value !== null && !list.data?.data.some((item) => item.id === value) && <option value={value}>Selected clinician #{value} - search to review</option>}
      {list.data?.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
    </select></label>{list.data && <Pager meta={list.data.meta} onPage={(page) => setQuery((old) => ({ ...old, page }))} />}
  </div>;
}
export function Reason({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-medium">Reason<textarea required minLength={5} maxLength={2000} className={patientControl} rows={3} value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}
export function onForm(event: FormEvent, submit: () => Promise<void>) { event.preventDefault(); void submit(); }
