import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPatient, patientId } from "@/api/patients";
import { bookingCommand, bookingHistory, getBooking, hospitalTime, type Booking } from "@/api/visits";
import { ApiError } from "@/api/client/apClient";
import { useAuth } from "@/context/AuthContext";
import { CommandState, CommandSubmit, LoadState, Pager, Reason, Status, VisitPermission, WorkflowNav, onForm, primary, relatedRecord, secondary, useCommand, useLoad } from "@/components/visits/visitWorkspace";
import { BookingForm } from "./BookingForm";
import { OpenVisitForm } from "./VisitForms";

function BookingAction({ record, action, onSaved, onReload }: { record: Booking; action: "confirm" | "cancel" | "no-show"; onSaved: () => void; onReload: () => void }) {
  const [reason, setReason] = useState("");
  const command = useCommand((data: { version: number; reason: string }, key) => bookingCommand(record.id, action, data, key), onSaved, onReload);
  const label = { confirm: "Confirm booking", cancel: "Cancel booking", "no-show": "Mark no-show" }[action];
  return <form className="space-y-4" onSubmit={(event) => onForm(event, () => command.submit(() => ({ version: record.version, reason })))}>
    <CommandState command={command} reload={onReload} /><fieldset disabled={command.locked} className="rounded-xl border bg-white p-5"><legend className="px-2 text-lg font-semibold">{label}</legend><Reason value={reason} onChange={setReason} /></fieldset><CommandSubmit command={command} label={label} />
  </form>;
}
function Content({ id }: { id: number }) {
  const { user } = useAuth();
  const record = useLoad("booking-detail-" + id, (signal) => getBooking(id, signal));
  const booking = record.data?.data;
  const [panel, setPanel] = useState("");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const history = useLoad("booking-history-" + id + ":" + booking?.version + ":" + page, (signal) => relatedRecord(bookingHistory(id, page, signal), () => { setPanel(""); record.reload(); }), !!booking && panel === "history");
  const linked = useLoad("arrival-patient-" + booking?.patient_id, async (signal) => {
    const result = await relatedRecord(getPatient(booking!.patient_id!, signal), () => { setPanel(""); record.reload(); });
    if (result.data.id !== booking!.patient_id) throw new ApiError("This identity was merged. Reload the booking before continuing.", 409);
    return result;
  }, !!booking?.patient_id && panel === "arrive");
  const reload = () => { setPanel(""); setNotice(""); record.reload(); };
  const saved = () => { setPanel(""); setNotice("The hospital server confirmed the booking change."); record.reload(); };
  const active = booking && ["booked", "confirmed"].includes(booking.status);
  const canArrive = user?.permissions?.includes("patients.view") && user.permissions?.includes("encounters.view") && user.permissions?.includes("encounters.view_any") && user.permissions?.includes("encounters.arrive");
  return <section className="space-y-5"><WorkflowNav /><div className="flex flex-wrap justify-between gap-3"><h1 className="text-2xl font-bold">Booking #{id}</h1><button className={secondary} onClick={reload}>Refresh booking</button></div>
    <LoadState {...record} />{notice && <p role="status" className="rounded-lg bg-green-50 p-4 text-green-800">{notice}</p>}
    {booking && <><div className="rounded-xl border bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">{booking.first_name} {booking.last_name}</h2><p className="mt-1 text-sm">{booking.phone}</p></div><Status value={booking.status} /></div>
      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">{[["Starts (Africa/Lagos)", hospitalTime(booking.starts_at)], ["Ends (Africa/Lagos)", hospitalTime(booking.ends_at)], ["Visit type", booking.visit_type], ["Channel", booking.booking_channel], ["Planned clinician", booking.doctor_name || (booking.doctor_id ? "Clinician #" + booking.doctor_id : "Not selected")], ["Booked by", "Staff #" + booking.booked_by], ["Specialist contact", booking.specialist_name || "Not recorded"], ["Specialist email", booking.specialist_email || "Not recorded"], ["Patient", booking.patient_id ? "Registered patient #" + booking.patient_id : "Not yet linked"]].map(([label, value]) => <div key={label}><dt className="text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium">{value}</dd></div>)}</dl>
      {booking.patient_id && user?.permissions?.includes("patients.view") && <Link className="mt-4 inline-block text-sm text-[#573FD1] underline" to={"/patients/" + booking.patient_id}>Open registered patient</Link>}
      {booking.follow_up_of_id && <Link className="ml-4 mt-4 inline-block text-sm text-[#573FD1] underline" to={"/appointments/" + booking.follow_up_of_id}>Original booking #{booking.follow_up_of_id}</Link>}
    </div>
    <div className="flex flex-wrap gap-3">
      {active && user?.permissions?.includes("appointments.update") && <><button className={secondary} onClick={() => setPanel("edit")}>Edit / reschedule</button>{booking.status === "booked" && <button className={secondary} onClick={() => setPanel("confirm")}>Confirm booking</button>}<button className={secondary} onClick={() => setPanel("cancel")}>Cancel booking</button>{booking.ends_at && Date.parse(booking.ends_at) <= Date.now() && <button className={secondary} onClick={() => setPanel("no-show")}>Mark no-show</button>}</>}
      {active && canArrive && <button className={primary} onClick={() => setPanel("arrive")}>Record arrival</button>}
      {booking.status === "attended" && booking.patient_id && user?.permissions?.includes("appointments.create") && user.permissions?.includes("patients.view") && <Link className={secondary} to={"/appointments/new?follow_up_of_id=" + booking.id}>Book follow-up</Link>}
      {booking.status === "attended" && user?.permissions?.includes("encounters.view") && user.permissions?.includes("patients.view") && <Link className={secondary} to={"/visits?patient_id=" + booking.patient_id}>Find saved visit</Link>}
      <button className={secondary} onClick={() => setPanel("history")}>Booking history</button>
    </div>
    {panel === "edit" && active && user?.permissions?.includes("appointments.update") && <BookingForm key={booking.id + ":" + booking.version} record={booking} onReload={reload} onSaved={saved} />}
    {["confirm", "cancel", "no-show"].includes(panel) && active && user?.permissions?.includes("appointments.update") && <BookingAction key={panel + booking.version} record={booking} action={panel as "confirm" | "cancel" | "no-show"} onSaved={saved} onReload={reload} />}
    {panel === "arrive" && active && canArrive && <>{booking.patient_id && <LoadState {...linked} />}{(!booking.patient_id || linked.data) && <OpenVisitForm key={booking.id + ":" + booking.version + ":" + linked.data?.data.version} booking={booking} patient={linked.data?.data} onReload={reload} />}</>}
    {panel === "history" && <section className="space-y-4 rounded-xl border bg-white p-5"><h2 className="text-lg font-semibold">Booking history</h2><LoadState {...history} />{history.data && <>{history.data.data.length === 0 && <p>No saved revisions are available.</p>}{history.data.data.map((revision) => <article className="rounded-lg border p-4 text-sm" key={revision.id}><h3 className="font-semibold">Version {revision.version} - {revision.operation.replace(/_/g, " ")}</h3><p className="mt-1 text-slate-600">{hospitalTime(revision.recorded_at)} | Staff #{revision.actor_id}</p>{revision.reason && <p className="mt-2 whitespace-pre-wrap">{revision.reason}</p>}<details className="mt-3"><summary className="cursor-pointer text-[#573FD1]">Saved booking details</summary><dl className="mt-3 grid gap-3 sm:grid-cols-2">{["first_name", "last_name", "phone", "visit_type", "booking_channel", "specialist_name", "specialist_email", "starts_at", "ends_at", "doctor_id", "patient_id", "status"].map((field) => <div key={field}><dt className="text-xs text-slate-500">{field.replace(/_/g, " ")}</dt><dd className="break-words">{field.endsWith("_at") ? hospitalTime(revision.snapshot[field] as string | null) : String(revision.snapshot[field] ?? "Not recorded")}</dd></div>)}</dl></details></article>)}<Pager meta={history.data.meta} onPage={setPage} /></>}</section>}
    </>}
  </section>;
}
export default function BookingDetail() {
  const id = patientId(useParams().id);
  return <VisitPermission booking>{id ? <Content key={id} id={id} /> : <p role="alert">A saved numeric booking ID is required.</p>}</VisitPermission>;
}
