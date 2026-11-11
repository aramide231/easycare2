import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/store/useAuthStore";
import { getRoleHomePath } from "@/lib/authRoutes";
import { ApiError } from "@/api/client/apClient";
import { patientId, type PatientPage } from "@/api/patients";
import ProfileMenu from "@/components/header/ProfileMenu";

export const patientControl = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#573FD1]";
export const patientPrimary = "inline-flex items-center justify-center rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-medium text-white disabled:opacity-50";
export const patientSecondary = "inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm disabled:opacity-50";

export function usePatientLoad<T>(key: string, load: (signal: AbortSignal) => Promise<T>, enabled = true) {
  const revision = useAuthStore((state) => state.revision);
  const [refresh, setRefresh] = useState(0);
  const scope = JSON.stringify([key, revision, refresh, enabled]);
  const loader = useRef(load);
  loader.current = load;
  const [state, setState] = useState<{ scope: string; data: T | null; error: string; loading: boolean }>({ scope: "", data: null, error: "", loading: true });
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState({ scope, data: null, error: "", loading: enabled });
    if (enabled) void loader.current(controller.signal).then((data) => {
      if (active) setState({ scope, data, error: "", loading: false });
    }).catch((cause: unknown) => {
      if (active) setState({ scope, data: null, error: cause instanceof ApiError && cause.status === 404
        ? "This record is unavailable or you do not have access to it."
        : cause instanceof Error ? cause.message : "Unable to load this patient record.", loading: false });
    });
    return () => { active = false; controller.abort(); };
  }, [scope, enabled]);
  const current = state.scope === scope ? state : { data: null, error: "", loading: enabled };
  return { ...current, reload: () => setRefresh((value) => value + 1) };
}

export function PatientPermission({ permission = "patients.view", children }: { permission?: string; children: ReactNode }) {
  const { user } = useAuth();
  return user?.permissions?.includes("patients.view") && user.permissions.includes(permission) ? children
    : <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-5">Your account does not have permission to use this patient feature.</p>;
}
export function PatientLoadState({ loading, error, reload }: { loading: boolean; error: string; reload: () => void }) {
  return loading ? <p role="status" className="p-5">Loading patient records...</p> : error ? <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
    <p>{error}</p><button className={patientSecondary + " mt-3"} onClick={reload}>Try again</button></div> : null;
}
export function PatientPager({ meta, onPage }: { meta: PatientPage["meta"]; onPage: (page: number) => void }) {
  return <nav aria-label="Patient record pages" className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
    <button className={patientSecondary} disabled={meta.current_page <= 1} onClick={() => onPage(meta.current_page - 1)}>Previous</button>
    <span>Page {meta.current_page} of {meta.last_page} · {meta.total} records</span>
    <button className={patientSecondary} disabled={meta.current_page >= meta.last_page} onClick={() => onPage(meta.current_page + 1)}>Next</button>
  </nav>;
}
export function PatientRouteRedirect({ suffix = "" }: { suffix?: string }) {
  const params = useParams();
  const id = patientId(params.id ?? params.patientId);
  return id ? <Navigate to={"/patients/" + id + suffix} replace state={null} />
    : <p role="alert" className="p-6">A saved numeric patient record ID is required. <Link className="underline" to="/patients">Search saved patients</Link></p>;
}
export default function PatientWorkspace() {
  const { user } = useAuth();
  return <div className="min-h-screen bg-[#f8f8fc] text-slate-900">
    <header className="border-b bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
      <Link to="/patients" className="text-xl font-bold text-[#573FD1]">EasyCare <span className="font-normal text-slate-600">/ Patients</span></Link>
      <div className="flex items-center gap-4"><Link className="text-sm text-[#573FD1] underline" to={getRoleHomePath(user?.userRole ?? "")}>Dashboard</Link><ProfileMenu /></div>
    </div></header>
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8"><PatientPermission><Outlet /></PatientPermission></main>
  </div>;
}
