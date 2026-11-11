import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ApiError } from "@/api/client/apClient";
import { WriteAttempt, isUncertainWrite, writeErrorMessage } from "@/api/client/writeAttempt";
import { patientCommand, type RecordAction, type RecordInput, type RecordReceipt } from "@/api/patients";
import { patientControl, patientPrimary, patientSecondary } from "./patientWorkspace";

export default function PatientCommandForm({ patient, action, recordId, data = {}, label, children, onSaved, onReload, disabled = false }: {
  patient: { id: number; version: number }; action: RecordAction; recordId?: number;
  data?: Omit<Partial<RecordInput>, "reason" | "current_password" | "version">; label: string; children?: ReactNode;
  onSaved: (receipt: RecordReceipt) => void; onReload: () => void; disabled?: boolean;
}) {
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState("");
  const attempt = useRef(new WriteAttempt());
  const pending = useRef<RecordInput | null>(null);
  const active = useRef(true);
  const passwordRequired = !action.startsWith("flags.");
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy || blocked || disabled) return;
    setBusy(true); setError("");
    try {
      const body = uncertain && pending.current ? pending.current : { ...data, version: patient.version, reason };
      pending.current = body;
      const response = await patientCommand(patient.id, action, { ...body, ...(passwordRequired ? { current_password: password } : {}) }, attempt.current.key(), recordId);
      if (!active.current) return;
      attempt.current.reset(); pending.current = null; setUncertain(false); setPassword(""); setReason("");
      onSaved(response.data);
    } catch (cause) {
      if (!active.current) return;
      setError(writeErrorMessage(cause));
      setUncertain((old) => old || isUncertainWrite(cause));
      if (cause instanceof ApiError && ["version_conflict", "idempotency_outdated", "idempotency_expired", "idempotency_conflict", "merge_already_reviewed", "flag_already_resolved"].includes(cause.code ?? "")) setBlocked(true);
      setPassword("");
    } finally { if (active.current) setBusy(false); }
  };
  return <form onSubmit={(event) => void submit(event)} className="space-y-4" onChange={() => { if (!uncertain) attempt.current.reset(); }}>
    {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {uncertain && <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">The change may have completed. Retry this same operation to confirm it. If you leave, check the latest saved record before submitting again.</p>}
    <fieldset disabled={busy || uncertain || blocked} className="space-y-4">
      {children}
      <label className="block text-sm font-medium">Reason *<textarea name="reason" required minLength={5} maxLength={2000} rows={3} className={patientControl} value={reason} onChange={(e) => setReason(e.target.value)} /></label>
    </fieldset>
    {passwordRequired && <label className="block text-sm font-medium">Your current password *<input name="current_password" type="password" required autoComplete="current-password" maxLength={1024} disabled={busy || blocked} className={patientControl} value={password} onChange={(e) => setPassword(e.target.value)} /></label>}
    <div className="flex flex-wrap gap-3"><button className={patientPrimary} disabled={busy || blocked || disabled}>{busy ? "Saving..." : uncertain ? "Retry same operation" : label}</button>
      {blocked && <button type="button" className={patientSecondary} onClick={onReload}>Reload latest patient</button>}</div>
  </form>;
}
