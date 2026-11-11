import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { listPatients, patientName, patientOptions, type PatientFilters } from "@/api/patients";
import { useAuth } from "@/context/AuthContext";
import { PatientLoadState, PatientPager, PatientPermission, patientControl, patientPrimary, patientSecondary, usePatientLoad } from "@/components/patient/patientWorkspace";

export default function PatientRegistry({ initialQuery = "", onSelect }: { initialQuery?: string; onSelect?: (id: number) => void }) {
  const { user } = useAuth();
  const allowed = user?.permissions?.includes("patients.view") ?? false;
  const [draft, setDraft] = useState({ search: initialQuery, mode: "q", category_id: "", date_of_birth: "" });
  const [filters, setFilters] = useState<PatientFilters>({ q: initialQuery, page: 1 });
  const result = usePatientLoad(JSON.stringify(["patients", filters]), (signal) => listPatients(filters, signal), allowed);
  const options = usePatientLoad("patient-categories", patientOptions, allowed);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setFilters({ [draft.mode]: draft.search.trim(), category_id: draft.category_id, date_of_birth: draft.date_of_birth, page: 1 });
  };
  const select = (id: number) => { onSelect?.(id); };
  return <PatientPermission><section className="space-y-5" aria-labelledby="patient-registry-title">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="text-sm font-medium text-[#573FD1]">PATIENT RECORDS</p><h1 id="patient-registry-title" className="mt-1 text-3xl font-bold">Patients</h1>
        <p className="mt-2 text-sm text-slate-600">Search saved hospital records and open a patient's profile.</p></div>
      {!onSelect && <div className="flex flex-wrap gap-2">{user?.permissions?.includes("patients.access.manage") && <Link className={patientSecondary} to="/patients/access">Manage access</Link>}
        {user?.permissions?.includes("patients.create") && <Link className={patientPrimary} to="/patients/register">Register patient</Link>}</div>}
    </div>
    <form onSubmit={submit} className="rounded-xl border bg-white p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_2fr_1fr_1fr]">
        <label className="text-sm font-medium">Search by<select aria-label="Search by" className={patientControl} value={draft.mode} onChange={(e) => setDraft({ ...draft, mode: e.target.value })}>
          <option value="q">Name or phone</option><option value="mrn">Exact card number</option></select></label>
        <label className="text-sm font-medium">Search patients<input className={patientControl} maxLength={draft.mode === "mrn" ? 64 : 100} placeholder={draft.mode === "mrn" ? "Current or previous card number" : "Name or telephone number"} value={draft.search} onChange={(e) => setDraft({ ...draft, search: e.target.value })} /></label>
        <label className="text-sm font-medium">Patient category<select aria-label="Patient category" className={patientControl} value={draft.category_id} onChange={(e) => setDraft({ ...draft, category_id: e.target.value })}>
          <option value="">All categories</option>{options.data?.data.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
        <label className="text-sm font-medium">Date of birth<input className={patientControl} type="date" value={draft.date_of_birth} onChange={(e) => setDraft({ ...draft, date_of_birth: e.target.value })} /></label>
      </div>
      <div className="mt-4 flex flex-wrap gap-3"><button className={patientPrimary}>Search</button>
        <button type="button" className={patientSecondary} onClick={() => { setDraft({ search: "", mode: "q", category_id: "", date_of_birth: "" }); setFilters({ page: 1 }); }}>Clear filters</button>
        <button type="button" className={patientSecondary} onClick={result.reload}>Refresh records</button></div>
    </form>
    <PatientLoadState {...result} />
    {options.error && <p role="alert" className="text-sm text-red-800">Categories could not be loaded. <button className="underline" onClick={options.reload}>Retry categories</button></p>}
    {result.data && <>
      <p role="status" className="text-sm text-slate-600">{result.data.meta.total} matching patients</p>
      {result.data.data.length === 0 ? <p className="rounded-xl border bg-white p-8 text-center">No saved patients match this search.</p> :
        <div className="overflow-x-auto rounded-xl border bg-white"><table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Saved patients</caption><thead className="bg-slate-50 text-slate-600"><tr>{["Patient", "Card number", "Category", "Date of birth", ""].map((name, index) => <th className="px-5 py-4" key={index} scope="col">{name}</th>)}</tr></thead>
          <tbody>{result.data.data.map((patient) => <tr key={patient.id} className="border-t">
            <td className="px-5 py-4 font-medium">{patientName(patient)}<span className="mt-1 block text-xs font-normal text-slate-500">Record #{patient.id}</span></td>
            <td className="px-5 py-4">{patient.mrn}</td><td className="px-5 py-4"><span className="rounded-full bg-violet-50 px-2 py-1 text-violet-800">{patient.category.name}</span></td>
            <td className="px-5 py-4">{patient.date_of_birth || "Not recorded"}{patient.dob_estimated && " (estimated)"}</td>
            <td className="px-5 py-4">{onSelect ? <button className={patientSecondary} onClick={() => select(patient.id)}>Select patient</button> : <Link className="font-medium text-[#573FD1] underline" to={"/patients/" + patient.id}>Open profile</Link>}</td>
          </tr>)}</tbody></table></div>}
      <PatientPager meta={result.data.meta} onPage={(page) => setFilters({ ...filters, page })} />
    </>}
  </section></PatientPermission>;
}
