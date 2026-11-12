import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPatient, patientId, patientName } from "@/api/patients";
import { hospitalTime, listVisits } from "@/api/visits";
import { useAuth } from "@/context/AuthContext";
import { LoadState, Pager, Status, VisitPermission, WorkflowNav, control, primary, secondary, useLoad } from "@/components/visits/visitWorkspace";

function Register({ initialQueues, mineOnly }: { initialQueues: boolean; mineOnly: boolean }) {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const patientFilter = patientId(params.get("patient_id"));
  const invalidPatient = params.has("patient_id") && patientFilter === null;
  const [queues, setQueues] = useState(initialQueues);
  const [draft, setDraft] = useState({ queue: "", status: params.get("status") === "closed" ? "closed" : "", care_setting: "", from_date: "", to_date: "" });
  const [filter, setFilter] = useState({ ...draft, page: 1 });
  const effective = { ...filter, queue: queues ? filter.queue : "", status: queues ? "" : filter.status,
    ...(patientFilter ? { patient_id: patientFilter } : {}), ...(mineOnly ? { doctor_id: user!.id } : {}) };
  const records = useLoad("visit-register-" + queues + JSON.stringify(effective), (signal) => listVisits(effective, queues, signal), !invalidPatient && (!mineOnly || patientId(user?.id) !== null));
  const filteredPatient = useLoad("visit-filter-patient-" + patientFilter, (signal) => getPatient(patientFilter!, signal), patientFilter !== null);
  const canOpen = user?.permissions?.includes("encounters.arrive") && user.permissions?.includes("encounters.view_any");
  return <section className="space-y-5"><WorkflowNav />
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold">{mineOnly ? "My visit queue" : queues ? "Visit queues and clinician assignment" : "Visitation register"}</h1><p className="mt-2 text-sm text-slate-600">{mineOnly ? "Your current assigned visits." : "Saved visits within your assigned access."} Dates and times use Africa/Lagos.</p></div>{canOpen && <Link className={primary} to="/visits/new">Open walk-in visit</Link>}</div>
    {invalidPatient ? <p role="alert">A saved numeric patient ID is required for this filter.</p> : <>
      {!mineOnly && <div className="flex max-w-md overflow-hidden rounded-xl border bg-white"><button className={queues ? primary + " flex-1 rounded-none" : secondary + " flex-1 rounded-none border-0"} onClick={() => { setQueues(true); setFilter((old) => ({ ...old, page: 1 })); }}>Active queues</button><button className={!queues ? primary + " flex-1 rounded-none" : secondary + " flex-1 rounded-none border-0"} onClick={() => { setQueues(false); setFilter((old) => ({ ...old, page: 1 })); }}>Visit register</button></div>}
      {mineOnly && <Link className="inline-block text-sm text-[#573FD1] underline" to="/visits">Open visible visit register</Link>}
      {patientFilter && <p className="rounded-lg bg-violet-50 p-4 text-sm">Patient filter: {filteredPatient.data && filteredPatient.data.data.id === patientFilter ? patientName(filteredPatient.data.data) + " - " + filteredPatient.data.data.mrn : "Patient #" + patientFilter}. <Link className="underline" to="/visits">Clear patient filter</Link></p>}
      <form className="rounded-xl border bg-white p-5" onSubmit={(e) => { e.preventDefault(); setFilter({ ...draft, page: 1 }); }}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {queues ? <label className="text-sm font-medium">Queue state<select aria-label="Queue state" className={control} value={draft.queue} onChange={(e) => setDraft((old) => ({ ...old, queue: e.target.value }))}><option value="">All active queues</option><option value="unassigned">Unassigned</option><option value="waiting">Waiting for clinician acceptance</option><option value="in_progress">In progress</option></select></label>
          : <label className="text-sm font-medium">Visit status<select aria-label="Visit status" className={control} value={draft.status} onChange={(e) => setDraft((old) => ({ ...old, status: e.target.value }))}><option value="">All statuses</option>{["open", "in_progress", "closed", "cancelled"].map((value) => <option key={value} value={value}>{value.replace(/_/g, " ")}</option>)}</select></label>}
        <label className="text-sm font-medium">Care setting<select aria-label="Care setting" className={control} value={draft.care_setting} onChange={(e) => setDraft((old) => ({ ...old, care_setting: e.target.value }))}><option value="">All settings</option>{["OPD", "IPD", "EMERGENCY"].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="text-sm font-medium">From arrival date (Africa/Lagos)<input type="date" className={control} value={draft.from_date} onChange={(e) => setDraft((old) => ({ ...old, from_date: e.target.value }))} /></label>
        <label className="text-sm font-medium">To arrival date (Africa/Lagos)<input type="date" className={control} value={draft.to_date} onChange={(e) => setDraft((old) => ({ ...old, to_date: e.target.value }))} /></label>
      </div><div className="mt-4 flex flex-wrap gap-3"><button className={primary}>Apply visit filters</button><button type="button" className={secondary} onClick={records.reload}>Refresh visits</button></div></form>
      <LoadState {...records} />{records.data && <><p role="status" className="text-sm text-slate-600">{records.data.meta.total} visible visits</p>{records.data.data.length === 0 ? <p className="rounded-xl border bg-white p-8 text-center">No visits match these filters.</p>
        : <div className="overflow-x-auto rounded-xl border bg-white"><table className="w-full min-w-[760px] text-left text-sm"><caption className="sr-only">Saved hospital visits in arrival order</caption><thead className="bg-violet-50"><tr>{["Patient", "Arrival (Africa/Lagos)", "Visit / setting", "Current clinician", "Queue / status", "Visit"].map((label) => <th className="p-4 font-semibold" key={label}>{label}</th>)}</tr></thead><tbody>{records.data.data.map((visit) => <tr className="border-t" key={visit.id}><td className="p-4"><p className="font-medium">{visit.patient.first_name} {visit.patient.last_name}</p><p className="mt-1 text-slate-500">{visit.patient.mrn}</p></td><td className="p-4">{hospitalTime(visit.opened_at)}</td><td className="p-4">{visit.visit_type}<p className="mt-1 text-slate-500">{visit.care_setting}</p></td><td className="p-4">{visit.current_assignment ? visit.current_assignment.doctor_id === user?.id ? "You" : visit.current_assignment.doctor_name || "Clinician #" + visit.current_assignment.doctor_id : "Not assigned"}</td><td className="p-4"><Status value={visit.queue ?? visit.status} /></td><td className="p-4"><Link className="text-[#573FD1] underline" to={"/visits/" + visit.id}>Open visit #{visit.id}</Link></td></tr>)}</tbody></table></div>}<Pager meta={records.data.meta} onPage={(page) => setFilter((old) => ({ ...old, page }))} /></>}
    </>}
  </section>;
}
export default function VisitRegister({ initialQueues = false, mineOnly = false }: { initialQueues?: boolean; mineOnly?: boolean }) {
  const [params] = useSearchParams();
  return <VisitPermission><Register key={params.toString()} initialQueues={initialQueues} mineOnly={mineOnly} /></VisitPermission>;
}
