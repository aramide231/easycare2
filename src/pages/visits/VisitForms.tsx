import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "@/api/client/apClient";
import { patientName, type PatientRecord } from "@/api/patients";
import { openVisit, visitCommand, visitOptions, type Booking, type Visit, type VisitAction, type VisitInput } from "@/api/visits";
import { useAuth } from "@/context/AuthContext";
import { ClinicianPicker, CommandState, CommandSubmit, LoadState, PatientPicker, Reason, VisitPermission, WorkflowNav, control, onForm, secondary, useCommand, useLoad } from "@/components/visits/visitWorkspace";

export function OpenVisitForm({ booking, patient: linkedPatient = null, onReload }: { booking?: Booking; patient?: PatientRecord | null; onReload: () => void }) {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(linkedPatient);
  const [verified, setVerified] = useState(false);
  const [careSetting, setCareSetting] = useState("OPD");
  const [visitType, setVisitType] = useState("");
  const [reason, setReason] = useState("");
  const options = useLoad("open-visit-options", visitOptions);
  const command = useCommand((data: VisitInput, key) => openVisit(booking?.id ?? null, data, key), (response) => navigate("/visits/" + response.data.id, { replace: true, state: null }), onReload);
  const body = (): VisitInput => {
    if (!options.data || !patient || !verified) throw new ApiError("Select a registered patient and confirm that you have checked their identity.", 422, "identity_required");
    return { patient_id: patient.id, patient_version: patient.version, identity_verified: true, care_setting: careSetting,
      ...(booking ? { version: booking.version, reason } : { visit_type: visitType }) };
  };
  return <form onSubmit={(event) => onForm(event, () => command.submit(body))} className="space-y-5">
    <CommandState command={command} reload={onReload} /><LoadState {...options} />
    <fieldset disabled={command.locked || !options.data} className="space-y-4 rounded-xl border bg-white p-5">
      <legend className="px-2 text-lg font-semibold">{booking ? "Record arrival" : "Open walk-in visit"}</legend>
      {booking?.patient_id ? linkedPatient && <div className="rounded-lg border p-4"><p className="font-semibold">{patientName(linkedPatient)} - {linkedPatient.mrn}</p><p className="mt-1 text-sm">Birth date: {linkedPatient.date_of_birth ?? "Not recorded"} | Phone: {linkedPatient.phone ?? "Not recorded"}</p></div>
        : <PatientPicker value={patient} onChange={(value) => { setPatient(value); setVerified(false); }} />}
      {booking && !booking.patient_id && <p className="text-sm text-slate-600">Match the caller to the correct registered patient. Booking contact details will stay separate from the patient profile.</p>}
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Care setting<select aria-label="Care setting" required className={control} value={careSetting} onChange={(e) => setCareSetting(e.target.value)}>{options.data?.data.care_settings.map((value) => <option key={value}>{value}</option>)}</select></label>
        {!booking && <label className="text-sm font-medium">Visit type<select aria-label="Visit type" required className={control} value={visitType} onChange={(e) => setVisitType(e.target.value)}><option value="">Choose a visit type</option>{options.data?.data.visit_types.map((value) => <option key={value}>{value}</option>)}</select></label>}</div>
      <label className="flex items-start gap-3 text-sm"><input type="checkbox" required className="mt-1" checked={verified} onChange={(e) => setVerified(e.target.checked)} /><span>I checked the selected patient's identity using the hospital procedure and confirm that this is the correct patient for this visit.</span></label>
      {booking && <Reason value={reason} onChange={setReason} />}
    </fieldset><CommandSubmit command={command} disabled={!options.data} label={booking ? "Confirm arrival and open visit" : "Open walk-in visit"} />
  </form>;
}

export function VisitActionForm({ visit, action, onSaved, onReload }: { visit: Visit; action: VisitAction; onSaved: () => void; onReload: () => void }) {
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [consultationType, setConsultationType] = useState(visit.visit_type);
  const [reason, setReason] = useState("");
  const assign = action === "assign" || action === "reassign";
  const options = useLoad("assignment-options", visitOptions, assign);
  const labels = { assign: "Assign clinician", reassign: "Reassign clinician", accept: "Accept visit", complete: "Complete visit", cancel: "Cancel visit" };
  const command = useCommand((data: VisitInput, key) => visitCommand(visit.id, action, data, key), onSaved, onReload);
  const body = (): VisitInput => {
    if (assign && (!options.data || !doctorId)) throw new ApiError("Choose an active clinician before assigning this visit.", 422);
    return { version: visit.version, reason, ...(assign ? { doctor_id: doctorId!, consultation_type: consultationType } : {}),
      ...(["reassign", "accept", "complete"].includes(action) ? { assignment_id: visit.current_assignment!.id, assignment_version: visit.current_assignment!.version } : {}) };
  };
  return <form onSubmit={(event) => onForm(event, () => command.submit(body))} className="space-y-4">
    <CommandState command={command} reload={onReload} />
    <fieldset disabled={command.locked || assign && !options.data} className="space-y-4 rounded-xl border bg-white p-5"><legend className="px-2 text-lg font-semibold">{labels[action]}</legend>
      {assign && <><LoadState {...options} /><ClinicianPicker type="encounters" value={doctorId} onChange={setDoctorId} />
        <label className="block text-sm font-medium">Consultation type<select aria-label="Consultation type" required className={control} value={consultationType} onChange={(e) => setConsultationType(e.target.value)}>{!options.data?.data.visit_types.includes(consultationType) && <option value={consultationType}>{consultationType}</option>}{options.data?.data.visit_types.map((item) => <option key={item}>{item}</option>)}</select></label></>}
      {action === "complete" && <p className="text-sm text-slate-600">Confirm that this visit is finished. Completion ends your current assignment and closes the visit.</p>}
      {action === "cancel" && <p className="text-sm text-slate-600">Cancellation is available only before care has been accepted.</p>}
      <Reason value={reason} onChange={setReason} />
    </fieldset><CommandSubmit command={command} disabled={assign && !options.data} label={labels[action]} />
  </form>;
}

function WalkInContent() {
  const { user } = useAuth();
  return <section className="space-y-5"><WorkflowNav /><h1 className="text-2xl font-bold">Walk-in arrival</h1>
    {user?.permissions?.includes("encounters.arrive") && user.permissions?.includes("encounters.view_any") ? <OpenVisitForm onReload={() => window.location.reload()} /> : <p role="alert">Your account cannot open walk-in visits.</p>}
    <Link className={secondary} to="/visits">Back to saved visits</Link></section>;
}
export default function WalkIn() { return <VisitPermission><WalkInContent /></VisitPermission>; }
