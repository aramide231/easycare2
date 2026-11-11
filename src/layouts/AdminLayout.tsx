import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const logout = async () => {
    setBusy(true);
    try { await signOut(); }
    catch { setError("Unable to sign out. Check the hospital connection and try again."); }
    finally { setBusy(false); }
  };
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
        <Link to="/admin" className="text-xl font-bold text-[#573FD1]">EasyCare <span className="ml-3 text-sm font-normal text-slate-500">Administration</span></Link>
        <div className="flex items-center gap-4 text-sm">
          <span>{user?.fullName}</span>
          <Link to="/modules" className="text-[#573FD1] underline">Modules</Link>
          <button disabled={busy} onClick={() => void logout()} className="rounded-lg border px-4 py-2 disabled:opacity-50">{busy ? "Signing out..." : "Sign out"}</button>
        </div>
      </div>
    </header>
    <nav aria-label="Administration" className="mx-auto flex max-w-7xl gap-6 px-5 pt-5 text-sm font-medium">
      {user?.permissions?.includes("staff.manage") && <Link className="text-[#573FD1] underline" to="/admin/users">Staff accounts</Link>}
      {user?.permissions?.includes("audit.view") && <Link className="text-[#573FD1] underline" to="/admin/audit">Audit history</Link>}
    </nav>
    {error && <p role="alert" className="mx-auto max-w-7xl px-5 pt-4 text-red-700">{error}</p>}
    <main className="mx-auto max-w-7xl p-5 md:p-8"><Outlet /></main>
  </div>;
}
