import { useState } from "react";
import { Link } from "react-router-dom";
import { getCardHistory, getMergeRequests, getPatient, getPatientFlags, patientId, patientName, patientOptions, type MergeRequest, type PatientRecord, type RecordAction, type RecordReceipt } from "@/api/patients";
import { useAuth } from "@/context/AuthContext";
import PatientCommandForm from "@/components/patient/PatientCommandForm";
import { PatientLoadState, PatientPager, patientControl, patientSecondary, usePatientLoad } from "@/components/patient/patientWorkspace";

type ManagementProps = { patient: PatientRecord; onSaved: (receipt: RecordReceipt) => void; onReload: () => void };

function PatientFlags({ patient, onSaved, onReload }: ManagementProps) {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [resolving, setResolving] = useState<number | null>(null);
  const [type, setType] = useState("record-review");
  const flags = usePatientLoad("flags-" + patient.id + ":" + patient.version + ":" + page, (signal) => getPatientFlags(patient.id, page, signal));
  const canManage = user?.permissions?.includes("patients.flags.manage");
  return <section className="space-y-5" aria-labelledby="flags-heading"><h2 id="flags-heading" className="text-xl font-semibold">Patient flags</h2>
    {canManage && <div className="rounded-lg border bg-slate-50 p-4"><h3 className="mb-4 font-medium">Add a flag</h3><PatientCommandForm patient={patient} action="flags.store" data={{ type }} label="Save flag" onSaved={onSaved} onReload={onReload}>
      <label className="block text-sm font-medium">Flag type<select className={patientControl} value={type} onChange={(e) => setType(e.target.value)}><option value="record-review">Record review</option><option value="identity-review">Identity review</option></select></label>
    </PatientCommandForm></div>}
    <PatientLoadState {...flags} />
    {flags.data && <>{flags.data.data.length === 0 && <p className="text-sm text-slate-500">No flags recorded for this patient.</p>}
      {flags.data.data.map((flag) => <article key={flag.id} className="space-y-3 rounded-lg border p-4">
        <div className="flex flex-wrap justify-between gap-2"><h3 className="font-semibold">{flag.type.replace(/-/g, " ")}</h3><span className={"rounded-full px-2 py-1 text-xs " + (flag.resolved_at ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900")}>{flag.resolved_at ? "Resolved" : "Open"}</span></div>
        <p className="whitespace-pre-wrap break-words text-sm">{flag.reason}</p><p className="text-xs text-slate-500">Flag #{flag.id} · Staff #{flag.created_by} · {new Date(flag.created_at).toLocaleString()}</p>
        {flag.resolved_at ? <p className="whitespace-pre-wrap break-words text-sm text-slate-600">Resolution: {flag.resolution_reason} · Staff #{flag.resolved_by}</p> : canManage && (resolving === flag.id ? <>
          <PatientCommandForm patient={patient} action="flags.resolve" recordId={flag.id} label="Confirm flag resolution" onSaved={onSaved} onReload={onReload} />
          <button className={patientSecondary} onClick={() => setResolving(null)}>Cancel resolution</button></> : <button className={patientSecondary} onClick={() => setResolving(flag.id)}>Resolve flag #{flag.id}</button>)}
      </article>)}<PatientPager meta={flags.data.meta} onPage={setPage} /></>}
  </section>;
}

function PatientCards({ patient, onSaved, onReload }: ManagementProps) {
  const [category, setCategory] = useState(patient.category.id);
  const [mrn, setMrn] = useState(patient.mrn);
  const [page, setPage] = useState(1);
  const categories = usePatientLoad("card-categories", patientOptions);
  const history = usePatientLoad("cards-" + patient.id + ":" + patient.version + ":" + page, (signal) => getCardHistory(patient.id, page, signal));
  return <section className="space-y-5" aria-labelledby="card-heading"><h2 id="card-heading" className="text-xl font-semibold">Card and category</h2>
    <p className="text-sm text-slate-600">Previous card numbers remain reserved and continue to find this record.</p><PatientLoadState {...categories} />
    <PatientCommandForm patient={patient} action="cards.change" data={{ category_id: category, mrn }} label="Save card change" onSaved={onSaved} onReload={onReload} disabled={!categories.data}>
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Patient category<select aria-label="Patient category" className={patientControl} value={category} onChange={(e) => setCategory(Number(e.target.value))}>{categories.data?.data.categories.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
        <label className="text-sm font-medium">Hospital / card number<input className={patientControl} required maxLength={64} pattern="[A-Za-z0-9][A-Za-z0-9/._\-]*" value={mrn} onChange={(e) => setMrn(e.target.value)} /></label></div>
    </PatientCommandForm>
    <h3 className="font-semibold">Card history</h3><PatientLoadState {...history} />
    {history.data && <>{history.data.data.length === 0 && <p className="text-sm text-slate-500">No card changes recorded.</p>}{history.data.data.map((entry) => <article className="rounded-lg border p-4 text-sm" key={entry.id}>
      <p className="font-medium">{entry.previous_mrn} → {entry.new_mrn}</p><p className="mt-1 text-slate-600">Category #{entry.previous_category_id} → #{entry.new_category_id} · Staff #{entry.changed_by} · {new Date(entry.changed_at).toLocaleString()}</p><p className="mt-2 whitespace-pre-wrap break-words">{entry.reason}</p>
    </article>)}<PatientPager meta={history.data.meta} onPage={setPage} /></>}
  </section>;
}

function MergeRequestCard({ entry, patient, onSaved, onReload }: ManagementProps & { entry: MergeRequest }) {
  const { user } = useAuth();
  const [decision, setDecision] = useState<RecordAction | null>(null);
  const canReview = entry.requested_by !== user?.id && user?.permissions?.includes("patients.merges.approve");
  const canCancel = entry.requested_by === user?.id && user?.permissions?.includes("patients.merges.request");
  return <article className="space-y-3 rounded-lg border p-4 text-sm">
    <div className="flex flex-wrap justify-between gap-2"><h3 className="font-semibold">Merge request #{entry.id}</h3><span className="rounded-full bg-slate-100 px-2 py-1 capitalize">{entry.status}</span></div>
    <p>Source record #{entry.source_patient_id} → surviving record <Link className="text-[#573FD1] underline" to={"/patients/" + entry.target_patient_id}>#{entry.target_patient_id}</Link></p>
    <p className="text-slate-600">Requested by staff #{entry.requested_by}. Patient versions {entry.source_version} / {entry.target_version}.</p>
    {entry.reason && <p className="whitespace-pre-wrap break-words">{entry.reason}</p>}{entry.review_reason && <p className="whitespace-pre-wrap break-words">Review: {entry.review_reason}</p>}
    {entry.status === "pending" && <>
      {!decision && <div className="flex flex-wrap gap-2">{canReview && <><button className={patientSecondary} onClick={() => setDecision("merges.approve")}>Approve merge #{entry.id}</button><button className={patientSecondary} onClick={() => setDecision("merges.reject")}>Reject merge #{entry.id}</button></>}
        {canCancel && <button className={patientSecondary} onClick={() => setDecision("merges.cancel")}>Cancel merge request #{entry.id}</button>}</div>}
      {entry.requested_by === user?.id && <p className="text-xs text-slate-500">A different authorized staff member must approve or reject this request.</p>}
      {decision && <><p className="rounded-lg bg-amber-50 p-3">{decision === "merges.approve" ? "Confirm both records belong to the same person. The source will resolve to the surviving record; original records and numbers will remain in history." : "Close this request with a recorded reason."}</p>
        <PatientCommandForm patient={patient} action={decision} recordId={entry.id} data={{ request_version: entry.version }} label={decision === "merges.approve" ? "Confirm merge approval" : decision === "merges.reject" ? "Confirm merge rejection" : "Confirm request cancellation"} onSaved={onSaved} onReload={onReload} />
        <button className={patientSecondary} onClick={() => setDecision(null)}>Back to request</button></>}
    </>}
  </article>;
}

function PatientMerges({ patient, onSaved, onReload }: ManagementProps) {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [targetId, setTargetId] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);
  const target = usePatientLoad("merge-target-" + selectedId, (signal) => getPatient(selectedId!, signal), selectedId !== null);
  const requests = usePatientLoad("merges-" + patient.id + ":" + patient.version + ":" + page, (signal) => getMergeRequests(patient.id, page, signal));
  const canRequest = user?.permissions?.includes("patients.merges.request");
  const validTarget = !!target.data && target.data.data.id !== patient.id;
  return <section className="space-y-5" aria-labelledby="merge-heading"><h2 id="merge-heading" className="text-xl font-semibold">Duplicate patient merges</h2>
    <p className="text-sm text-slate-600">A request needs a second staff member's approval. Changed records require a fresh review. Resolve source flags and check family links before requesting a merge.</p>
    {canRequest && <div className="space-y-4 rounded-lg border bg-slate-50 p-4"><h3 className="font-medium">Request a merge</h3>
      <div className="flex flex-wrap items-end gap-3"><label className="text-sm font-medium">Surviving patient record ID<input className={patientControl} inputMode="numeric" value={targetId} onChange={(e) => { setTargetId(e.target.value); setSelectedId(null); setVerified(false); }} /></label>
        <button className={patientSecondary} disabled={patientId(targetId) === null} onClick={() => { setSelectedId(patientId(targetId)); setVerified(false); }}>Load surviving patient</button></div>
      <PatientLoadState {...target} />
      {target.data && <div className="rounded-lg border bg-white p-3 text-sm"><p className="font-medium">Surviving patient: {patientName(target.data.data)}</p><p>{target.data.data.mrn} · Record #{target.data.data.id} · Version {target.data.data.version}</p>
        {target.data.data.id !== selectedId && <p className="mt-2 text-amber-900">The entered record was merged. The surviving record is shown above.</p>}
        {!validTarget && <p role="alert" className="mt-2 text-red-800">Choose another patient record.</p>}</div>}
      {validTarget && <PatientCommandForm key={target.data!.data.id + ":" + target.data!.data.version} patient={patient} action="merges.request" data={{ target_patient_id: target.data!.data.id, target_version: target.data!.data.version }} label="Request independent approval" onSaved={onSaved} onReload={onReload} disabled={!verified}>
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" required checked={verified} onChange={(e) => setVerified(e.target.checked)} />I verified that this patient and the surviving record belong to the same person.</label>
      </PatientCommandForm>}
    </div>}
    <h3 className="font-semibold">Merge requests for this patient</h3><PatientLoadState {...requests} />
    {requests.data && <>{requests.data.data.length === 0 && <p className="text-sm text-slate-500">No merge requests recorded.</p>}{requests.data.data.map((entry) => <MergeRequestCard key={entry.id} entry={entry} patient={patient} onSaved={onSaved} onReload={onReload} />)}<PatientPager meta={requests.data.meta} onPage={setPage} /></>}
  </section>;
}

export default function PatientManagement(props: ManagementProps & { activeTab?: string; onTab?: (tab: string) => void }) {
  const { user } = useAuth();
  const permissions = user?.permissions ?? [];
  const tabs = [{ id: "flags", label: "Flags", allowed: permissions.includes("patients.flags.view") },
    { id: "cards", label: "Card history", allowed: permissions.includes("patients.cards.manage") },
    { id: "merges", label: "Merge review", allowed: permissions.includes("patients.merges.request") || permissions.includes("patients.merges.approve") }].filter((tab) => tab.allowed);
  const [localActive, setActive] = useState(tabs[0]?.id ?? "");
  const active = props.activeTab ?? localActive;
  if (tabs.length === 0) return null;
  return <div className="rounded-xl border bg-white p-5"><nav aria-label="Patient record management" className="mb-6 flex flex-wrap gap-2 border-b pb-4">{tabs.map((tab) => <button type="button" aria-pressed={active === tab.id} className={patientSecondary + (active === tab.id ? " border-violet-500 text-violet-800" : "")} key={tab.id} onClick={() => { setActive(tab.id); props.onTab?.(tab.id); }}>{tab.label}</button>)}</nav>
    {active === "flags" && <PatientFlags {...props} />}{active === "cards" && <PatientCards {...props} />}{active === "merges" && <PatientMerges {...props} />}
  </div>;
}
