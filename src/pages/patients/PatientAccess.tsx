import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPatientAccess, patientId, type RecordReceipt } from "@/api/patients";
import { useAuth } from "@/context/AuthContext";
import PatientCommandForm from "@/components/patient/PatientCommandForm";
import { PatientLoadState, PatientPermission, patientControl, patientPrimary, usePatientLoad } from "@/components/patient/patientWorkspace";

export default function PatientAccess() {
  const [params] = useSearchParams();
  const [input, setInput] = useState(params.get("id") ?? "");
  const [selected, setSelected] = useState<number | null>(() => patientId(params.get("id")));
  const [notice, setNotice] = useState<{ id: number; message: string } | null>(null);
  const { user } = useAuth();
  const allowed = !!user?.permissions?.includes("patients.view") && !!user.permissions.includes("patients.access.manage");
  const result = usePatientLoad("patient-access-" + selected, (signal) => getPatientAccess(selected!, signal), selected !== null && allowed);
  const saved = (receipt: RecordReceipt) => { setNotice({ id: receipt.id, message: receipt.operation === "access.restrict" ? "Patient access restricted." : "Patient access restored." }); result.reload(); };
  const load = (event: FormEvent) => { event.preventDefault(); setNotice(null); const id = patientId(input); if (id === selected) result.reload(); else setSelected(id); };
  return <PatientPermission permission="patients.access.manage"><section className="mx-auto max-w-2xl space-y-5">
    <Link className="text-sm text-[#573FD1] underline" to="/patients">Back to patients</Link><h1 className="text-3xl font-bold">Manage patient access</h1>
    <p className="text-sm text-slate-600">Use a known patient record ID to restrict or restore access. Restricted patient details stay hidden.</p>
    <form onSubmit={load} className="flex flex-wrap items-end gap-3 rounded-xl border bg-white p-5"><label className="flex-1 text-sm font-medium">Patient record ID<input required inputMode="numeric" pattern="[1-9][0-9]*" className={patientControl} value={input} onChange={(e) => { setInput(e.target.value); setSelected(null); setNotice(null); }} /></label><button className={patientPrimary} disabled={patientId(input) === null}>Load access state</button></form>
    <PatientLoadState {...result} />{notice?.id === selected && <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">{notice.message}</p>}
    {result.data && <section className="space-y-5 rounded-xl border bg-white p-5"><div><h2 className="text-xl font-semibold">Patient record #{result.data.data.id}</h2><p className="mt-2 capitalize">Access: <strong>{result.data.data.access_status}</strong></p><p className="mt-1 text-xs text-slate-500">Version {result.data.data.version}</p></div>
      {result.data.data.access_status === "merged" ? <p className="text-sm text-slate-600">A merged source cannot be restored. Use the surviving patient's record.</p>
        : <PatientCommandForm key={result.data.data.id + ":" + result.data.data.version} patient={result.data.data} action={result.data.data.access_status === "active" ? "access.restrict" : "access.restore"} label={result.data.data.access_status === "active" ? "Restrict patient access" : "Restore patient access"} onSaved={saved} onReload={result.reload} />}
    </section>}
  </section></PatientPermission>;
}
