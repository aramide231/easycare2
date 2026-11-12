import { useState } from "react";
import { Link } from "react-router-dom";
import { listBookings, hospitalTime } from "@/api/visits";
import { useAuth } from "@/context/AuthContext";
import { LoadState, Pager, Status, VisitPermission, WorkflowNav, control, primary, secondary, useLoad } from "@/components/visits/visitWorkspace";
import { BookingForm } from "./BookingForm";

function BookingList() {
  const [draft, setDraft] = useState({ q: "", status: "", from_date: "", to_date: "" });
  const [filters, setFilters] = useState({ ...draft, page: 1 });
  const records = useLoad("bookings-" + JSON.stringify(filters), (signal) => listBookings(filters, signal));
  return <div className="space-y-5">
    <form className="rounded-xl border bg-white p-5" onSubmit={(e) => { e.preventDefault(); setFilters({ ...draft, page: 1 }); }}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-medium">Search bookings<input className={control} maxLength={100} value={draft.q} placeholder="Caller name or phone" onChange={(e) => setDraft((old) => ({ ...old, q: e.target.value }))} /></label>
        <label className="text-sm font-medium">Booking status<select aria-label="Booking status" className={control} value={draft.status} onChange={(e) => setDraft((old) => ({ ...old, status: e.target.value }))}><option value="">All statuses</option>{["booked", "confirmed", "attended", "cancelled", "no_show"].map((status) => <option key={status} value={status}>{status.replace(/_/g, " ")}</option>)}</select></label>
        <label className="text-sm font-medium">From date (Africa/Lagos)<input type="date" className={control} value={draft.from_date} onChange={(e) => setDraft((old) => ({ ...old, from_date: e.target.value }))} /></label>
        <label className="text-sm font-medium">To date (Africa/Lagos)<input type="date" className={control} value={draft.to_date} onChange={(e) => setDraft((old) => ({ ...old, to_date: e.target.value }))} /></label>
      </div><div className="mt-4 flex flex-wrap gap-3"><button className={primary}>Search bookings</button><button className={secondary} type="button" onClick={records.reload}>Refresh bookings</button></div>
    </form><LoadState {...records} />
    {records.data && <><p role="status" className="text-sm text-slate-600">{records.data.meta.total} saved bookings</p>
      {records.data.data.length === 0 ? <p className="rounded-xl border bg-white p-8 text-center">No bookings match these filters.</p> : <div className="overflow-x-auto rounded-xl border bg-white"><table className="w-full min-w-[750px] text-left text-sm"><caption className="sr-only">Saved appointments in Nigeria time</caption><thead className="bg-violet-50"><tr>{["Caller", "Phone", "Start / end (Africa/Lagos)", "Visit type", "Clinician", "Status", "Record"].map((title) => <th key={title} className="p-4 font-semibold">{title}</th>)}</tr></thead><tbody>{records.data.data.map((booking) => <tr key={booking.id} className="border-t"><td className="p-4 font-medium">{booking.first_name} {booking.last_name}</td><td className="p-4">{booking.phone}</td><td className="p-4">{hospitalTime(booking.starts_at)}<p className="mt-1 text-xs text-slate-500">to {hospitalTime(booking.ends_at)}</p></td><td className="p-4">{booking.visit_type}</td><td className="p-4">{booking.doctor_name || (booking.doctor_id ? "Clinician #" + booking.doctor_id : "Not selected")}</td><td className="p-4"><Status value={booking.status} /></td><td className="p-4"><Link className="text-[#573FD1] underline" to={"/appointments/" + booking.id}>Open booking #{booking.id}</Link></td></tr>)}</tbody></table></div>}
      <Pager meta={records.data.meta} onPage={(page) => setFilters((old) => ({ ...old, page }))} /></>}
  </div>;
}
function Board() {
  const { user } = useAuth();
  const [creating, setCreating] = useState(false);
  return <section className="space-y-5"><WorkflowNav /><h1 className="text-2xl font-bold">Appointments</h1>
    <p className="text-sm text-slate-600">Saved hospital bookings. All appointment times use Africa/Lagos.</p>
    <div className="flex max-w-md overflow-hidden rounded-xl border bg-white shadow-sm"><button className={(creating ? "flex-1 px-4 py-3 text-sm" : "flex-1 bg-[#573FD1] px-4 py-3 text-sm font-semibold text-white")} onClick={() => setCreating(false)}>View Bookings</button>{user?.permissions?.includes("appointments.create") && <button className={creating ? "flex-1 bg-[#573FD1] px-4 py-3 text-sm font-semibold text-white" : "flex-1 px-4 py-3 text-sm"} onClick={() => setCreating(true)}>Create Bookings</button>}</div>
    {creating && user?.permissions?.includes("appointments.create") ? <BookingForm onReload={() => window.location.reload()} /> : <BookingList />}
  </section>;
}
export default function Appointments() { return <VisitPermission booking><Board /></VisitPermission>; }
