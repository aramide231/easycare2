import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getPatient, patientId, patientName, type RecordReceipt } from "@/api/patients";
import { useAuth } from "@/context/AuthContext";
import { PatientLoadState, PatientPermission, patientSecondary, usePatientLoad } from "@/components/patient/patientWorkspace";
import PatientManagement from "./PatientManagement";

export default function PatientProfile({ historyOnly = false }: { historyOnly?: boolean }) {
  const { id } = useParams();
  const recordId = patientId(id);
  const { user } = useAuth();
  const allowed = !!user?.permissions?.includes("patients.view");
  const record = usePatientLoad("profile-" + recordId, (signal) => getPatient(recordId!, signal), recordId !== null && allowed);
  const [notice, setNotice] = useState<{ id: number; message: string } | null>(null);
  const [management, setManagement] = useState<{ id: number; tab: string } | null>(null);
  const patient = record.data?.data;
  const saved = (receipt: RecordReceipt) => {
    setNotice({ id: receipt.id, message: "Patient change saved. Record version " + receipt.version + "." }); record.reload();
  };
  if (patient && patient.id !== recordId) return <Navigate to={"/patients/" + patient.id + (historyOnly ? "/history" : "")} replace state={null} />;
  return <PatientPermission><section className="space-y-5">
    <Link className="text-sm text-[#573FD1] underline" to="/patients">Back to patients</Link>
    {recordId === null ? <p role="alert">A saved numeric patient record ID is required.</p> : <PatientLoadState {...record} />}
    {notice?.id === recordId && <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">{notice.message}</p>}
    {patient && <>
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border bg-white p-6">
        <div className="flex min-w-0 items-center gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl font-semibold text-violet-800" aria-hidden="true">{patient.first_name.slice(0, 1)}{patient.last_name.slice(0, 1)}</div>
          <div className="min-w-0"><h1 className="break-words text-2xl font-bold">{patientName(patient)}</h1><p className="mt-1 break-words text-sm text-slate-600">{patient.mrn} · Record #{patient.id} · {patient.category.name}</p><p className="mt-1 text-xs text-slate-500">Version {patient.version}</p></div></div>
        <div className="flex flex-wrap gap-2"><button className={patientSecondary} onClick={record.reload}>Refresh patient</button>
          {user?.permissions?.includes("patients.update") && <Link className={patientSecondary} to={"/patients/" + patient.id + "/edit"}>Edit patient</Link>}
          {user?.permissions?.includes("patients.access.manage") && <Link className={patientSecondary} to={"/patients/access?id=" + patient.id}>Manage patient access</Link>}</div>
      </div>
      {historyOnly ? <div className="rounded-xl border bg-white p-6"><h2 className="text-xl font-semibold">Clinical history</h2><p className="mt-3 text-sm text-slate-600">Clinical history is not available yet.</p><Link className="mt-4 inline-block text-[#573FD1] underline" to={"/patients/" + patient.id}>Return to patient details</Link></div> : <>
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]"><section className="rounded-xl border bg-white p-6"><h2 className="mb-5 text-xl font-semibold">Personal information</h2>
          <dl className="grid gap-5 text-sm sm:grid-cols-2">{([["Date of birth", patient.date_of_birth ? patient.date_of_birth + (patient.dob_estimated ? " (estimated)" : "") : null], ["Sex", patient.sex], ["Phone", patient.phone], ["Email", patient.email], ["Marital status", patient.marital_status], ["Religion", patient.religion], ["Occupation", patient.occupation], ["State of origin", patient.state_of_origin], ["Address", patient.address]] as const).map(([label, value]) => <div key={label}><dt className="text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words font-medium">{value || "Not recorded"}</dd></div>)}</dl>
        </section><section className="rounded-xl border bg-white p-6"><h2 className="mb-5 text-xl font-semibold">Emergency contacts</h2>{patient.contacts.length === 0 ? <p className="text-sm text-slate-500">No contacts recorded.</p> : patient.contacts.map((contact, index) => <div key={contact.id ?? index} className="mb-4 border-b pb-4 text-sm"><p className="font-medium">{contact.name}</p><p className="mt-1 text-slate-600">{contact.relationship}</p><p className="mt-1">{contact.phone}</p></div>)}</section></div>
        <PatientManagement key={patient.id + ":" + patient.version} patient={patient} onSaved={saved} onReload={record.reload}
          activeTab={management?.id === patient.id ? management.tab : undefined} onTab={(tab) => setManagement({ id: patient.id, tab })} />
        <div className="rounded-xl border bg-white p-5 text-sm text-slate-600">Clinical records, insurance coverage and patient photos will become available as those services are introduced.</div>
      </>}
    </>}
  </section></PatientPermission>;
}
