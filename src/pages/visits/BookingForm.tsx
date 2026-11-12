import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ApiError } from "@/api/client/apClient";
import { getPatient, patientId, patientName, type PatientRecord } from "@/api/patients";
import { bookingOptions, getBooking, hospitalInput, hospitalInstant, saveBooking, type Booking, type BookingInput } from "@/api/visits";
import { useAuth } from "@/context/AuthContext";
import { ClinicianPicker, CommandState, CommandSubmit, LoadState, PatientPicker, Reason, VisitPermission, WorkflowNav, control, onForm, secondary, useCommand, useLoad } from "@/components/visits/visitWorkspace";

export function BookingForm({ record, source, patient: initialPatient = null, onReload, onSaved }: { record?: Booking; source?: Booking; patient?: PatientRecord | null; onReload: () => void; onSaved?: () => void }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const seed = record ?? source;
  const [patient, setPatient] = useState(initialPatient);
  const [draft, setDraft] = useState({ first_name: seed?.first_name ?? "", last_name: seed?.last_name ?? "", phone: seed?.phone ?? "",
    starts_at: record ? hospitalInput(record.starts_at) : "", ends_at: record ? hospitalInput(record.ends_at) : "",
    booking_channel: record?.booking_channel ?? "", visit_type: source ? "Follow-Up Appointment" : record?.visit_type ?? "",
    specialist_name: seed?.specialist_name ?? "", specialist_email: seed?.specialist_email ?? "", doctor_id: seed?.doctor_id ?? null as number | null });
  const [reason, setReason] = useState("");
  const options = useLoad("booking-form-options", bookingOptions);
  const command = useCommand((data: Partial<BookingInput>, key) => saveBooking(record?.id ?? null, data, key), (response) => { if (record) (onSaved ?? onReload)(); else navigate("/appointments/" + response.data.id, { replace: true, state: null }); }, onReload);
  const change = (key: keyof typeof draft, value: string | number | null) => setDraft((old) => ({ ...old, [key]: value }));
  const body = (): Partial<BookingInput> => {
    if (!options.data) throw new ApiError("Load the hospital booking options before saving.", 422);
    const data: Partial<BookingInput> = { ...draft, specialist_name: draft.specialist_name.trim() || null, specialist_email: draft.specialist_email.trim() || null,
      starts_at: record && draft.starts_at === hospitalInput(record.starts_at) ? record.starts_at : hospitalInstant(draft.starts_at),
      ends_at: record?.ends_at && draft.ends_at === hospitalInput(record.ends_at) ? record.ends_at : hospitalInstant(draft.ends_at) };
    if (!record) return { ...data, patient_id: patient?.id ?? null, ...(source ? { follow_up_of_id: source.id } : {}) };
    const changes = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== record[key as keyof Booking]));
    if (Object.keys(changes).length === 0) throw new ApiError("Change at least one booking detail before saving.", 422, "no_changes");
    return { ...changes, version: record.version, reason };
  };
  return <form onSubmit={(event) => onForm(event, () => command.submit(body))} className="space-y-5">
    <CommandState command={command} reload={onReload} /><LoadState {...options} />
    <fieldset disabled={command.locked || !options.data} className="space-y-5 rounded-xl border bg-white p-5 sm:p-6">
      <legend className="px-2 text-lg font-semibold">{record ? "Edit booking / reschedule" : source ? "Create follow-up booking" : "Create booking"}</legend>
      {!record && (source ? <p className="rounded-lg bg-violet-50 p-4 text-sm">Follow-up of booking #{source.id} for {patient ? patientName(patient) + " - " + patient.mrn : "the linked patient"}.</p>
        : user?.permissions?.includes("patients.view") ? <PatientPicker value={patient} onChange={setPatient} /> : <p className="text-sm text-slate-600">This booking will be saved before patient registration.</p>)}
      {record?.patient_id && <p className="text-sm text-slate-600">Linked patient #{record.patient_id}. The registered identity stays attached to this booking.</p>}
      {!record && patient && <button type="button" className={secondary} onClick={() => setDraft((old) => ({ ...old, first_name: patient.first_name, last_name: patient.last_name, phone: patient.phone ?? "" }))}>Use selected patient contact details</button>}
      <div className="grid gap-4 sm:grid-cols-2">
        {([['first_name', 'First name'], ['last_name', 'Surname'], ['phone', 'Phone number']] as const).map(([key, label]) => <label key={key} className="text-sm font-medium">{label}<input name={key} required maxLength={key === "phone" ? 32 : 64} type={key === "phone" ? "tel" : "text"} className={control} value={draft[key]} onChange={(e) => change(key, e.target.value)} /></label>)}
        <label className="text-sm font-medium">Booking channel<select aria-label="Booking channel" required className={control} value={draft.booking_channel} onChange={(e) => change("booking_channel", e.target.value)}><option value="">Choose a channel</option>{options.data?.data.booking_channels.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium">Visit type<select aria-label="Visit type" required className={control} value={draft.visit_type} onChange={(e) => change("visit_type", e.target.value)}><option value="">Choose a visit type</option>{options.data?.data.visit_types.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium">Start (Africa/Lagos)<input name="starts_at" type="datetime-local" required className={control} value={draft.starts_at} onChange={(e) => change("starts_at", e.target.value)} /></label>
        <label className="text-sm font-medium">End (Africa/Lagos)<input name="ends_at" type="datetime-local" required className={control} value={draft.ends_at} onChange={(e) => change("ends_at", e.target.value)} /></label>
        <label className="text-sm font-medium">Specialist contact name (optional)<input maxLength={191} className={control} value={draft.specialist_name} onChange={(e) => change("specialist_name", e.target.value)} /></label>
        <label className="text-sm font-medium">Specialist contact email (optional)<input type="email" maxLength={191} className={control} value={draft.specialist_email} onChange={(e) => change("specialist_email", e.target.value)} /></label>
      </div>
      <p className="text-xs text-slate-500">Use a country code for phone numbers, for example +2348012345678. Booking contact details are saved separately from the patient profile. Times use Nigeria time.</p>
      <ClinicianPicker type="appointments" value={draft.doctor_id} optional onChange={(id) => change("doctor_id", id)} />
      {record && <Reason value={reason} onChange={setReason} />}
    </fieldset>
    <div className="flex flex-wrap gap-3"><CommandSubmit command={command} disabled={!options.data} label={record ? "Save booking changes" : "Save booking"} /><Link className={secondary} to={record ? "/appointments/" + record.id : "/appointments"}>Back to saved bookings</Link></div>
  </form>;
}

function CreateContent() {
  const [params] = useSearchParams();
  const { user } = useAuth();
  const sourceId = patientId(params.get("follow_up_of_id"));
  const patientParam = patientId(params.get("patient_id"));
  const invalid = params.has("follow_up_of_id") && !sourceId || params.has("patient_id") && !patientParam;
  const existing = useLoad("booking-source-" + sourceId + ":" + patientParam, async (signal) => {
    const source = sourceId ? (await getBooking(sourceId, signal)).data : undefined;
    if (source && (source.status !== "attended" || !source.patient_id)) throw new ApiError("Choose an attended booking for a registered patient before creating a follow-up.", 422);
    const id = source?.patient_id ?? patientParam;
    const patient = id ? (await getPatient(id, signal)).data : null;
    if (patient && patient.id !== id) throw new ApiError("This identity was merged. Open and review the surviving patient before creating a booking.", 409);
    return { source, patient };
  }, !invalid && (sourceId !== null || patientParam !== null) && !!user?.permissions?.includes("patients.view"));
  if (!user?.permissions?.includes("appointments.create")) return <p role="alert">Your account cannot create bookings.</p>;
  if (invalid) return <p role="alert">Choose a saved numeric booking or patient ID.</p>;
  if ((sourceId || patientParam) && !user.permissions?.includes("patients.view")) return <p role="alert">Patient-view permission is required for linked bookings and follow-ups.</p>;
  return <><WorkflowNav /><h1 className="mb-5 text-2xl font-bold">{sourceId ? "Book follow-up" : "Create booking"}</h1>
    {sourceId || patientParam ? <><LoadState {...existing} />{existing.data && <BookingForm key={JSON.stringify([sourceId, existing.data.patient?.id])} {...existing.data} onReload={existing.reload} />}</>
      : <BookingForm onReload={() => window.location.reload()} />}</>;
}
export default function CreateBooking() { return <VisitPermission booking><CreateContent /></VisitPermission>; }
