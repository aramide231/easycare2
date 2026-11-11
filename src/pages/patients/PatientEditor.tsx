import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiError } from "@/api/client/apClient";
import { WriteAttempt, isUncertainWrite, writeErrorMessage } from "@/api/client/writeAttempt";
import { checkPatientDuplicates, getPatient, patientId, patientName, patientOptions, savePatient, type PatientInput, type PatientRecord, type PatientSummary } from "@/api/patients";
import { useAuth } from "@/context/AuthContext";
import { PatientLoadState, PatientPermission, patientControl, patientPrimary, patientSecondary, usePatientLoad } from "@/components/patient/patientWorkspace";

const blank: PatientInput = { first_name: "", last_name: "", middle_name: null, sex: null, date_of_birth: null, dob_estimated: false,
  email: null, phone: null, marital_status: null, religion: null, occupation: null, state_of_origin: null, address: null, contacts: [] };
const textFields = [["first_name", "First name", 64], ["last_name", "Surname", 64], ["middle_name", "Middle name", 64],
  ["email", "Email address", 191], ["phone", "Phone number", 32], ["marital_status", "Marital status", 64],
  ["religion", "Religion", 64], ["occupation", "Occupation", 191], ["state_of_origin", "State of origin", 191]] as const;
function inputFor(patient?: PatientRecord): PatientInput {
  if (!patient) return { ...blank, contacts: [] };
  return { ...Object.fromEntries(Object.keys(blank).filter((key) => key !== "contacts").map((key) => [key, patient[key as keyof PatientRecord]])),
    contacts: patient.contacts.map(({ name, relationship, phone }) => ({ name, relationship, phone })), version: patient.version } as PatientInput;
}

function PatientEditorForm({ record }: { record?: PatientRecord }) {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<PatientInput>(() => inputFor(record));
  const [busy, setBusy] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [review, setReview] = useState<{ patients: PatientSummary[]; hasMore: boolean } | null>(null);
  const [acknowledged, setAcknowledged] = useState<number[]>([]);
  const [saved, setSaved] = useState<PatientRecord | null>(null);
  const attempt = useRef(new WriteAttempt());
  const pending = useRef<PatientInput | null>(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const options = usePatientLoad("editor-categories", patientOptions, !record);
  const change = <K extends keyof PatientInput>(key: K, value: PatientInput[K]) => {
    if (uncertain || busy) return;
    attempt.current.reset(); setReview(null); setAcknowledged([]); setErrors({}); setError("");
    setDraft((old) => ({ ...old, [key]: value }));
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy || blocked) return;
    setBusy(true); setError(""); setErrors({});
    let writing = uncertain;
    try {
      let body = pending.current;
      if (!uncertain) {
        body = { ...draft, ...(record ? { version: record.version } : {}), contacts: draft.contacts.map(({ name, relationship, phone }) => ({ name, relationship, phone })) };
        const duplicates = await checkPatientDuplicates(body, record?.id);
        if (!mounted.current) return;
        const ids = duplicates.data.map((patient) => patient.id).sort((a, b) => a - b);
        if (duplicates.meta.has_more || ids.length > 0 && (review === null || JSON.stringify(ids) !== JSON.stringify([...acknowledged].sort((a, b) => a - b)))) {
          setReview({ patients: duplicates.data, hasMore: duplicates.meta.has_more }); setAcknowledged([]); return;
        }
        body.acknowledged_duplicate_ids = ids;
        pending.current = body;
      }
      if (!body) return;
      writing = true;
      const response = await savePatient(record?.id ?? null, body, attempt.current.key());
      if (!mounted.current) return;
      attempt.current.reset(); pending.current = null; setUncertain(false);
      if (record) navigate("/patients/" + response.data.id, { replace: true, state: null });
      else { setDraft({ ...blank, contacts: [] }); setReview(null); setSaved(response.data); }
    } catch (cause) {
      if (!mounted.current) return;
      setError(writeErrorMessage(cause));
      setErrors(cause instanceof ApiError ? cause.errors ?? {} : {});
      setUncertain((old) => old || writing && isUncertainWrite(cause));
      if (cause instanceof ApiError && ["version_conflict", "idempotency_outdated", "idempotency_expired", "idempotency_conflict"].includes(cause.code ?? "")) setBlocked(true);
      if (cause instanceof ApiError && cause.code === "duplicate_review_required") { setReview(null); setAcknowledged([]); }
    } finally { if (mounted.current) setBusy(false); }
  };
  if (saved) return <section className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 text-center">
    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-800" aria-hidden="true">✓</div>
    <h1 className="text-2xl font-bold">Patient registered</h1><p role="status" className="mt-3">{patientName(saved)} has been saved with card number <strong>{saved.mrn}</strong>.</p>
    <div className="mt-6 flex flex-wrap justify-center gap-3"><Link className={patientPrimary} to={"/patients/" + saved.id}>Open patient record</Link><Link className={patientSecondary} to="/patients">Return to patients</Link>
      <button className={patientSecondary} onClick={() => { setSaved(null); setError(""); }}>Register another patient</button></div>
  </section>;
  return <section className="mx-auto max-w-4xl space-y-5">
    <Link className="text-sm text-[#573FD1] underline" to={record ? "/patients/" + record.id : "/patients"}>Back to {record ? "patient profile" : "patients"}</Link>
    <div><h1 className="text-3xl font-bold">{record ? "Edit patient" : "Register patient"}</h1><p className="mt-2 text-sm text-slate-600">{record ? "Update the saved demographics and emergency contacts." : "Enter the hospital card number and patient details to create a saved profile."}</p></div>
    {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"><p>{error}</p>{Object.entries(errors).map(([field, messages]) => <p key={field} className="mt-1 text-sm">{field.replace(/_/g, " ")}: {messages.join(" ")}</p>)}</div>}
    {uncertain && <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 p-4">The save may have completed. Retry this unchanged submission to confirm it. Leaving this page discards the retry key; check the saved records before registering again.</p>}
    {blocked && <p role="alert" className="rounded-lg border p-4">Reload and review the latest saved record before making another change. <button className="underline" onClick={() => window.location.reload()}>Reload latest record</button></p>}
    <form onSubmit={(event) => void submit(event)} className="space-y-5">
      <fieldset disabled={busy || uncertain || blocked} className="rounded-xl border bg-white p-5">
        <legend className="px-2 text-lg font-semibold">Patient information</legend><div className="grid gap-4 sm:grid-cols-2">
          {textFields.map(([key, label, max]) => <label key={key} className="text-sm font-medium">{label}{key === "first_name" || key === "last_name" ? " *" : ""}<input name={key} type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} required={key === "first_name" || key === "last_name"} maxLength={max} className={patientControl} value={draft[key] ?? ""} onChange={(e) => change(key, e.target.value || (key === "first_name" || key === "last_name" ? "" : null))} /></label>)}
          <label className="text-sm font-medium">Sex<select name="sex" className={patientControl} value={draft.sex ?? ""} onChange={(e) => change("sex", e.target.value || null)}><option value="">Not recorded</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></label>
          <label className="text-sm font-medium">Date of birth<input name="date_of_birth" type="date" className={patientControl} value={draft.date_of_birth ?? ""} onChange={(e) => change("date_of_birth", e.target.value || null)} /></label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.dob_estimated} onChange={(e) => change("dob_estimated", e.target.checked)} />Date of birth is estimated</label>
          <label className="text-sm font-medium sm:col-span-2">Home address<textarea name="address" maxLength={2000} rows={3} className={patientControl} value={draft.address ?? ""} onChange={(e) => change("address", e.target.value || null)} /></label>
        </div><p className="mt-3 text-xs text-slate-500">Use country codes for phone numbers, for example +2348012345678. Leave unknown details blank.</p>
      </fieldset>
      {!record && <fieldset disabled={busy || uncertain || blocked} className="rounded-xl border bg-white p-5"><legend className="px-2 text-lg font-semibold">Card and category</legend>
        <PatientLoadState {...options} /><div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Hospital / card number *<input name="mrn" required maxLength={64} pattern="[A-Za-z0-9][A-Za-z0-9/._\-]*" className={patientControl} value={draft.mrn ?? ""} onChange={(e) => change("mrn", e.target.value)} /></label>
          <label className="text-sm font-medium">Patient category *<select name="category_id" required className={patientControl} value={draft.category_id ?? ""} onChange={(e) => change("category_id", Number(e.target.value))}><option value="">Choose a category</option>{options.data?.data.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
        </div><p className="mt-3 text-xs text-slate-500">Choose the category for this record. Insurance policies and patient photos are not collected on this form.</p></fieldset>}
      <fieldset disabled={busy || uncertain || blocked} className="rounded-xl border bg-white p-5"><legend className="px-2 text-lg font-semibold">Emergency / next-of-kin contacts</legend>
        {draft.contacts.length === 0 && <p className="mb-4 text-sm text-slate-500">No contacts added.</p>}
        {draft.contacts.map((contact, index) => <div key={index} className="mb-4 grid items-end gap-3 rounded-lg border p-4 sm:grid-cols-3">
          {(["name", "relationship", "phone"] as const).map((key) => <label className="text-sm font-medium" key={key}>Contact {index + 1} {key}<input name={"contacts." + index + "." + key} required maxLength={key === "name" ? 191 : key === "relationship" ? 64 : 32} type={key === "phone" ? "tel" : "text"} className={patientControl} value={contact[key]} onChange={(e) => change("contacts", draft.contacts.map((item, i) => i === index ? { ...item, [key]: e.target.value } : item))} /></label>)}
          <button type="button" className={patientSecondary} onClick={() => change("contacts", draft.contacts.filter((_, i) => i !== index))}>Remove contact {index + 1}</button></div>)}
        <button type="button" className={patientSecondary} disabled={draft.contacts.length >= 10} onClick={() => change("contacts", [...draft.contacts, { name: "", relationship: "", phone: "" }])}>Add emergency contact</button>
      </fieldset>
      {review && <fieldset disabled={busy || uncertain || blocked} className="rounded-xl border border-amber-300 bg-amber-50 p-5"><legend className="px-2 text-lg font-semibold">Review possible duplicates</legend>
        <p className="mb-4 text-sm">Check these saved records before creating or editing a separate patient. Acknowledging them does not merge records.</p>
        {review.patients.map((patient) => <label key={patient.id} className="mb-3 flex items-start gap-3 rounded-lg bg-white p-3 text-sm"><input type="checkbox" className="mt-1" checked={acknowledged.includes(patient.id)} onChange={(e) => setAcknowledged((ids) => e.target.checked ? [...ids, patient.id] : ids.filter((id) => id !== patient.id))} /><span>I reviewed {patientName(patient)} · {patient.mrn} · {patient.date_of_birth ?? "Birth date not recorded"} and confirm this is a separate record. <Link className="text-[#573FD1] underline" target="_blank" rel="noreferrer" to={"/patients/" + patient.id}>Open record</Link></span></label>)}
        {review.hasMore && <p role="alert">More than twenty possible matches were found. Correct or narrow the identifying details before saving.</p>}
      </fieldset>}
      <div className="flex flex-wrap gap-3"><button className={patientPrimary} disabled={busy || blocked || !record && !options.data || !!review && (review.hasMore || acknowledged.length !== review.patients.length)}>{busy ? "Checking and saving..." : uncertain ? "Retry same submission" : review ? "Save after duplicate review" : record ? "Save patient changes" : "Register patient"}</button>
        <Link className={patientSecondary} to={record ? "/patients/" + record.id : "/patients"}>{uncertain ? "Leave and check saved records" : "Cancel"}</Link></div>
    </form>
  </section>;
}

export default function PatientEditor({ editing = false }: { editing?: boolean }) {
  const { id } = useParams();
  const parsedId = patientId(id);
  const { user } = useAuth();
  const permission = editing ? "patients.update" : "patients.create";
  const enabled = !!user?.permissions?.includes("patients.view") && !!user.permissions.includes(permission);
  const existing = usePatientLoad("edit-patient-" + parsedId, (signal) => getPatient(parsedId!, signal), editing && parsedId !== null && enabled);
  return <PatientPermission permission={permission}>{editing ? parsedId === null ? <p role="alert">A saved numeric patient record ID is required.</p>
    : <><PatientLoadState {...existing} />{existing.data && (existing.data.data.id !== parsedId
      ? <p role="alert">This record was merged. <Link className="underline" to={"/patients/" + existing.data.data.id}>Open the surviving patient</Link> before starting a new edit.</p>
      : <PatientEditorForm key={parsedId + ":" + existing.data.data.version} record={existing.data.data} />)}</>
    : <PatientEditorForm />}</PatientPermission>;
}
