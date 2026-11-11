import { useEffect, useState, type FormEvent } from "react";
import { ApiError } from "@/api/client/apClient";
import { issueResetCode, listStaff, saveStaff, staffOptions, type ManagedStaff, type StaffInput, type StaffOptions, type StaffPage } from "@/api/staff";
import { useAuth } from "@/context/AuthContext";
import { restoreSession } from "@/api/auth/session";

const control = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#573FD1]";
const primary = "rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-medium text-white disabled:opacity-50";
const secondary = "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm disabled:opacity-50";
const blank: StaffInput = {
  username: "", first_name: "", last_name: "", middle_name: null, email: null,
  staff_code: null, department_id: null, role_codes: [], is_active: true, current_password: "",
};
const textFields = [
  ["first_name", "First name"], ["last_name", "Last name"], ["middle_name", "Middle name"],
  ["email", "Email (optional)"], ["staff_code", "Staff code (optional)"],
] as const;

export default function StaffAdministration() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<StaffPage | null>(null);
  const [options, setOptions] = useState<StaffOptions | null>(null);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState<ManagedStaff | "new" | null>(null);
  const [draft, setDraft] = useState<StaffInput>(blank);
  const [busy, setBusy] = useState(false);
  const [resetTarget, setResetTarget] = useState<ManagedStaff | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [resetResult, setResetResult] = useState<{ code: string; expires: string } | null>(null);
  const canManage = user?.permissions?.includes("staff.manage") ?? false;
  const canReset = user?.permissions?.includes("staff.reset_password") ?? false;
  const self = editing !== null && editing !== "new" && editing.id === user?.id;
  const id = user?.id;

  useEffect(() => {
    let active = true;
    setLoading(true); setResult(null); setError("");
    if (!canManage) { setLoading(false); return; }
    Promise.all([listStaff(search, page), staffOptions()]).then(([staff, catalogs]) => {
      if (active) { setResult(staff); setOptions(catalogs.data); }
    }).catch((cause: unknown) => {
      if (active) setError(cause instanceof Error ? cause.message : "Unable to load staff.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, page, revision, canManage, canReset, id]);

  useEffect(() => {
    setEditing(null); setResetTarget(null); setResetResult(null);
    setDraft(blank); setResetPassword(""); setOptions(null);
  }, [id, canManage, canReset]);

  function field<K extends keyof StaffInput>(key: K, value: StaffInput[K]) {
    setDraft((old) => ({ ...old, [key]: value }));
  }
  const closePanels = () => {
    setEditing(null); setResetTarget(null); setResetResult(null);
    setDraft(blank); setResetPassword(""); setVerified(false);
  };
  const openEditor = (staff: ManagedStaff | "new") => {
    closePanels(); setNotice(""); setError(""); setEditing(staff);
    setDraft(staff === "new" ? { ...blank, role_codes: [] } : {
      first_name: staff.first_name, last_name: staff.last_name, middle_name: staff.middle_name,
      email: staff.email, staff_code: staff.staff_code, department_id: staff.department?.id ?? null,
      role_codes: staff.roles.map((role) => role.code), is_active: staff.is_active,
      version: staff.version, current_password: "",
    });
  };
  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (editing === null || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await saveStaff(editing === "new" ? null : editing.id, draft);
      setEditing(null); setDraft(blank); setRevision((value) => value + 1);
      setNotice(editing === "new"
        ? "Account created. Verify the staff member and issue a reset code so they can set their first password."
        : "Staff account updated.");
      if (response.data.id === user?.id) await restoreSession();
    } catch (cause) {
      setError(cause instanceof ApiError && cause.status === 409
        ? "This account changed while you were editing. Cancel and reload the latest record before saving."
        : cause instanceof Error ? cause.message : "Unable to save staff.");
      setDraft((value) => ({ ...value, current_password: "" }));
    } finally { setBusy(false); }
  };
  const issue = async (event: FormEvent) => {
    event.preventDefault();
    if (!resetTarget || !verified || busy) return;
    setBusy(true); setError("");
    try {
      const response = await issueResetCode(resetTarget, resetPassword);
      setResetTarget(response.data.user);
      setResetResult({ code: response.data.reset_code, expires: response.data.expires_at });
      setResetPassword(""); setRevision((value) => value + 1);
    } catch (cause) {
      setError(cause instanceof ApiError && cause.status === 409
        ? "This account changed. Close this panel and reload the latest record."
        : cause instanceof Error ? cause.message : "Unable to issue a reset code.");
      setResetPassword("");
    } finally { setBusy(false); }
  };

  if (!canManage) return <p role="alert">Your account does not have staff administration permission.</p>;
  return <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="text-sm font-medium text-[#573FD1]">STAFF ACCESS</p><h1 className="mt-1 text-3xl font-bold">Staff accounts</h1><p className="mt-2 text-sm text-slate-600">Manage hospital staff profiles, access and password recovery.</p></div>
      <button className={primary} disabled={!options || busy || loading} onClick={() => openEditor("new")}>Create staff account</button>
    </div>
    {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {notice && <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">{notice}</p>}

    {editing !== null && options && <section aria-labelledby="staff-editor-title" className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3"><h2 id="staff-editor-title" className="text-xl font-semibold">{editing === "new" ? "Create staff account" : "Edit " + editing.name}</h2><button disabled={busy} className={secondary} onClick={closePanels}>Cancel</button></div>
      <form onSubmit={(event) => void save(event)} className="space-y-5">
        <fieldset disabled={busy} className="grid gap-4 md:grid-cols-2">
          {editing === "new" && <label className="text-sm font-medium">Username<input autoComplete="off" required minLength={3} maxLength={64} pattern="[a-z0-9][a-z0-9._\-]*" className={control} value={draft.username} onChange={(e) => field("username", e.target.value)} /></label>}
          {textFields.map(([key, label]) => <label key={key} className="text-sm font-medium">{label}<input
            type={key === "email" ? "email" : "text"} required={key === "first_name" || key === "last_name"}
            maxLength={key === "email" ? 255 : 64} className={control} value={draft[key] ?? ""}
            onChange={(e) => field(key, e.target.value || (key === "first_name" || key === "last_name" ? "" : null))}
          /></label>)}
          <label className="text-sm font-medium">Department<select aria-label="Department" disabled={self} className={control} value={draft.department_id ?? ""} onChange={(e) => field("department_id", e.target.value ? Number(e.target.value) : null)}><option value="">Unassigned</option>{options.departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select></label>
        </fieldset>
        <fieldset disabled={busy || self} className="rounded-lg border p-4">
          <legend className="px-1 text-sm font-medium">Assigned roles</legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.roles.map((role) => <label key={role.code} className="flex items-center gap-2 text-sm">
            <input type="checkbox" disabled={!role.assignable} checked={draft.role_codes.includes(role.code)} onChange={(e) => field("role_codes", e.target.checked ? [...draft.role_codes, role.code] : draft.role_codes.filter((code) => code !== role.code))} />
            {role.name}{!role.assignable && " (restricted)"}
          </label>)}</div>
          <p className="mt-3 text-xs text-slate-500">No roles means no module access. Assign only the access this staff member needs.</p>
        </fieldset>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" disabled={busy || self} checked={draft.is_active} onChange={(e) => field("is_active", e.target.checked)} />Account active</label>
        {self && <p className="text-sm text-slate-600">Another administrator must change your roles, department or active status.</p>}
        <p className="text-sm text-slate-600">Changing access ends this staff member's existing sessions. Saving also invalidates any pending reset code.</p>
        <label className="block max-w-md text-sm font-medium">Your current password<input type="password" autoComplete="current-password" required disabled={busy} className={control} value={draft.current_password} onChange={(e) => field("current_password", e.target.value)} /></label>
        <button className={primary} disabled={busy}>{busy ? "Saving..." : "Save staff account"}</button>
      </form>
    </section>}

    {resetTarget && <section aria-labelledby="reset-title" className="rounded-xl border border-purple-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3"><h2 id="reset-title" className="text-xl font-semibold">Password recovery for {resetTarget.name}</h2><button disabled={busy} className={secondary} onClick={closePanels}>Close</button></div>
      {resetResult ? <div className="mt-4 space-y-3">
        <p className="text-sm">Give this code privately to the verified staff member. It is shown only in this panel and works once.</p>
        <label className="block text-sm font-medium">One-use reset code<input aria-label="One-use reset code" readOnly value={resetResult.code} className={control + " font-mono"} onFocus={(e) => e.target.select()} /></label>
        <p className="text-sm">Expires {new Date(resetResult.expires).toLocaleString()}. Use username <strong>{resetTarget.username}</strong> at <strong>/forgot-password</strong>.</p>
      </div> : <form className="mt-4 space-y-4" onSubmit={(event) => void issue(event)}>
        <p className="text-sm text-slate-600">Verify identity using the hospital procedure first. A new code expires in 15 minutes and replaces any previous code. The staff member chooses their own password.</p>
        <label className="flex items-center gap-2 text-sm"><input required type="checkbox" disabled={busy} checked={verified} onChange={(e) => setVerified(e.target.checked)} />I have verified this staff member's identity.</label>
        <label className="block max-w-md text-sm font-medium">Your current password<input required disabled={busy} type="password" autoComplete="current-password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} className={control} /></label>
        <button className={primary} disabled={busy || !verified}>{busy ? "Issuing..." : "Issue reset code"}</button>
      </form>}
    </section>}

    <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <form className="flex flex-wrap gap-3 border-b p-4" onSubmit={(event) => { event.preventDefault(); setSearch(query); setPage(1); }}>
        <label className="flex-1 text-sm"><span className="sr-only">Search staff</span><input aria-label="Search staff" placeholder="Search name or username" value={query} onChange={(e) => setQuery(e.target.value)} maxLength={100} className="w-full rounded-lg border px-3 py-2" /></label>
        <button className={secondary} disabled={loading}>Search</button>
        <button type="button" className={secondary} disabled={loading || busy} onClick={() => { closePanels(); setRevision((value) => value + 1); }}>Reload</button>
      </form>
      {loading ? <p role="status" className="p-6 text-sm text-slate-600">Loading staff...</p> : result && <>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600"><tr>{["Staff member", "Department", "Roles", "Status", "Actions"].map((heading) => <th key={heading} className="px-5 py-3 font-medium">{heading}</th>)}</tr></thead>
          <tbody className="divide-y">{result.data.map((staff) => <tr key={staff.id}>
            <td className="px-5 py-4"><p className="font-medium">{staff.name}</p><p className="text-xs text-slate-500">{staff.username}{staff.staff_code ? " / " + staff.staff_code : ""}</p></td>
            <td className="px-5 py-4">{staff.department?.name ?? "Unassigned"}</td>
            <td className="px-5 py-4">{staff.roles.map((role) => role.name).join(", ") || "No roles"}</td>
            <td className="px-5 py-4"><span className={"rounded-full px-2 py-1 text-xs " + (staff.is_active ? "bg-green-50 text-green-800" : "bg-slate-100 text-slate-600")}>{staff.is_active ? "Active" : "Inactive"}</span></td>
            <td className="px-5 py-4"><div className="flex gap-3">
              <button disabled={busy || !options} className="font-medium text-[#573FD1] disabled:opacity-50" aria-label={"Edit " + staff.username} onClick={() => openEditor(staff)}>Edit</button>
              {canReset && staff.is_active && staff.id !== user?.id && <button disabled={busy} className="text-[#573FD1]" aria-label={"Reset password for " + staff.username} onClick={() => { closePanels(); setError(""); setResetTarget(staff); }}>Reset password</button>}
            </div></td>
          </tr>)}</tbody>
        </table></div>
        {result.data.length === 0 && <p className="p-6 text-sm text-slate-600">No staff match this search.</p>}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4 text-sm">
          <span>{result.meta.total} staff account{result.meta.total === 1 ? "" : "s"} &middot; Page {result.meta.current_page} of {result.meta.last_page}</span>
          <div className="flex gap-2"><button className={secondary} disabled={page <= 1 || loading || busy} onClick={() => setPage((value) => value - 1)}>Previous</button><button className={secondary} disabled={page >= result.meta.last_page || loading || busy} onClick={() => setPage((value) => value + 1)}>Next</button></div>
        </div>
      </>}
      {!loading && !result && <p className="p-6 text-sm text-slate-600">Use Reload to try again after resolving the connection or access error.</p>}
    </section>
  </div>;
}
