import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { patientId, patientOptions } from "@/api/patients";
import { assignmentHistory, getVisit, hospitalTime, visitHistory, type VisitAction } from "@/api/visits";
import { useAuth } from "@/context/AuthContext";
import { LoadState, Pager, Status, VisitPermission, WorkflowNav, primary, relatedRecord, secondary, useLoad } from "@/components/visits/visitWorkspace";
import { VisitActionForm } from "./VisitForms";

function Detail({ id }: { id: number }) {
  const { user } = useAuth();
  const record = useLoad("visit-detail-" + id, (signal) => getVisit(id, signal));
  const visit = record.data?.data;
  const [action, setAction] = useState<VisitAction | null>(null);
  const [notice, setNotice] = useState("");
  const [historyTab, setHistoryTab] = useState<"assignments" | "revisions" | null>(null);
  const [page, setPage] = useState(1);
  const options = useLoad("visit-category-options", patientOptions, !!visit);
  const assignments = useLoad("assignment-history-" + id + ":" + visit?.version + ":" + page, (signal) => relatedRecord(assignmentHistory(id, page, signal), () => { setAction(null); setHistoryTab(null); record.reload(); }), !!visit && historyTab === "assignments");
  const revisions = useLoad("visit-revisions-" + id + ":" + visit?.version + ":" + page, (signal) => relatedRecord(visitHistory(id, page, signal), () => { setAction(null); setHistoryTab(null); record.reload(); }), !!visit && historyTab === "revisions");
  const reload = () => { setAction(null); setHistoryTab(null); setNotice(""); record.reload(); };
  const saved = () => { setAction(null); setNotice("The hospital server confirmed the visit action."); record.reload(); };
  const active = visit && ["open", "in_progress"].includes(visit.status);
  const own = user?.roles?.includes("doctor") && user.permissions?.includes("encounters.progress") && visit?.current_assignment?.doctor_id === user.id;
  const manage = user?.permissions?.includes("encounters.view_any");
  const category = options.data?.data.categories.find((item) => item.id === visit?.category_id)?.name;
  const canAssign = active && manage && user?.permissions?.includes("encounters.assign");
  const canCancel = visit?.status === "open" && manage && user?.permissions?.includes("encounters.cancel");
  const canAccept = own && active && visit?.current_assignment?.status === "assigned";
  const canComplete = own && visit?.status === "in_progress" && visit.current_assignment?.status === "accepted";
  const permitted = action === "assign" || action === "reassign" ? canAssign : action === "accept" ? canAccept : action === "complete" ? canComplete : action === "cancel" ? canCancel : false;
  return <section className="space-y-5"><WorkflowNav /><div className="flex flex-wrap justify-between gap-3"><h1 className="text-2xl font-bold">Visit #{id}</h1><button className={secondary} onClick={reload}>Refresh visit</button></div>
    <LoadState {...record} />{notice && <p role="status" className="rounded-lg bg-green-50 p-4 text-green-800">{notice}</p>}
    {visit && <><div className="rounded-xl border bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">{visit.patient.first_name} {visit.patient.last_name}</h2><Link className="mt-1 inline-block text-sm text-[#573FD1] underline" to={"/patients/" + visit.patient_id}>{visit.patient.mrn} - open patient record</Link></div><Status value={visit.status} /></div>
      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">{[["Arrival (Africa/Lagos)", hospitalTime(visit.opened_at)], ["Closed (Africa/Lagos)", hospitalTime(visit.closed_at)], ["Visit type", visit.visit_type], ["Care setting", visit.care_setting], ["Category at arrival", category ?? "Category #" + visit.category_id], ["Queue state", (visit.queue ?? "Finished").replace(/_/g, " ")], ["Current clinician", visit.current_assignment ? visit.current_assignment.doctor_id === user?.id ? "You" : visit.current_assignment.doctor_name || "Clinician #" + visit.current_assignment.doctor_id : "Not assigned"], ["Consultation type", visit.current_assignment?.consultation_type ?? "Not recorded"], ["Accepted (Africa/Lagos)", hospitalTime(visit.current_assignment?.accepted_at ?? null)]].map(([label, value]) => <div key={label}><dt className="text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium">{value}</dd></div>)}</dl>
      {visit.appointment_id && user?.permissions?.includes("appointments.view") && <Link className="mt-5 inline-block text-sm text-[#573FD1] underline" to={"/appointments/" + visit.appointment_id}>Original booking #{visit.appointment_id}</Link>}
    </div>
    <div className="flex flex-wrap gap-3">{canAssign && <button className={primary} onClick={() => setAction(visit.current_assignment ? "reassign" : "assign")}>{visit.current_assignment ? "Reassign clinician" : "Assign clinician"}</button>}{canAccept && <button className={primary} onClick={() => setAction("accept")}>Accept visit</button>}{canComplete && <button className={primary} onClick={() => setAction("complete")}>Complete visit</button>}{canCancel && <button className={secondary} onClick={() => setAction("cancel")}>Cancel visit</button>}
      <button className={secondary} onClick={() => { setHistoryTab("assignments"); setPage(1); }}>Assignment history</button><button className={secondary} onClick={() => { setHistoryTab("revisions"); setPage(1); }}>Visit history</button></div>
    {action && permitted && <VisitActionForm key={action + ":" + visit.version} visit={visit} action={action} onSaved={saved} onReload={reload} />}
    {historyTab === "assignments" && <section className="space-y-4 rounded-xl border bg-white p-5"><h2 className="text-lg font-semibold">Assignment history</h2><LoadState {...assignments} />{assignments.data && <>{assignments.data.data.length === 0 && <p>No clinicians have been assigned.</p>}{assignments.data.data.map((assignment) => <article key={assignment.id} className="rounded-lg border p-4 text-sm"><div className="flex flex-wrap justify-between gap-3"><h3 className="font-semibold">{assignment.doctor_name || "Clinician #" + assignment.doctor_id} - {assignment.consultation_type}</h3><Status value={assignment.status} /></div><p className="mt-2">Assigned: {hospitalTime(assignment.assigned_at)} by staff #{assignment.assigned_by}</p><p className="mt-1">Accepted: {hospitalTime(assignment.accepted_at)}</p><p className="mt-1">Ended: {hospitalTime(assignment.ended_at)}{assignment.ended_by ? " by staff #" + assignment.ended_by : ""}</p>{assignment.end_reason && <p className="mt-3 whitespace-pre-wrap">{assignment.end_reason}</p>}</article>)}<Pager meta={assignments.data.meta} onPage={setPage} /></>}</section>}
    {historyTab === "revisions" && <section className="space-y-4 rounded-xl border bg-white p-5"><h2 className="text-lg font-semibold">Visit history</h2><LoadState {...revisions} />{revisions.data && <>{revisions.data.data.length === 0 && <p>No saved revisions are available.</p>}{revisions.data.data.map((revision) => <article key={revision.id} className="rounded-lg border p-4 text-sm"><h3 className="font-semibold">Version {revision.version} - {revision.operation}</h3><p className="mt-1 text-slate-600">{hospitalTime(revision.recorded_at)} | Staff #{revision.actor_id}</p>{revision.reason && <p className="mt-3 whitespace-pre-wrap">{revision.reason}</p>}</article>)}<Pager meta={revisions.data.meta} onPage={setPage} /></>}</section>}
    </>}
  </section>;
}
export default function VisitDetail() {
  const id = patientId(useParams().id);
  return <VisitPermission>{id ? <Detail key={id} id={id} /> : <p role="alert">A saved numeric visit ID is required.</p>}</VisitPermission>;
}
