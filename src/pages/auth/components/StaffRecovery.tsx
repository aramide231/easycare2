import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { apiFetch, setCsrfToken } from "@/api/client/apClient";
import { useAuth } from "@/context/AuthContext";
import { AUTH_SIGNIN_PATH } from "@/lib/authRoutes";
import { clearLegacyIdentity, announceSessionChange } from "@/api/auth/session";
import { useAuthStore } from "@/store/useAuthStore";

export default function StaffRecovery() {
  const { user, signOut } = useAuth();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError("");
    if (password !== confirmation) { setError("The password confirmation does not match."); return; }
    if (new TextEncoder().encode(password).length > 72) { setError("The password must not exceed 72 bytes."); return; }
    setBusy(true);
    try {
      await apiFetch<void>("/auth/password/reset", {
        method: "POST", data: { username: username.trim(), token: token.trim(), password, password_confirmation: confirmation },
      });
      setCsrfToken(null); clearLegacyIdentity(); useAuthStore.getState().clearAuth();
      announceSessionChange();
      setToken(""); setPassword(""); setConfirmation(""); setDone(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to reset the password.");
      setPassword(""); setConfirmation("");
    } finally { setBusy(false); }
  };
  const control = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#573FD1]";
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
    <section className="w-full max-w-lg rounded-2xl border bg-white p-7 shadow-sm">
      <p className="text-sm font-semibold text-[#573FD1]">EasyCare</p>
      <h1 className="mt-2 text-2xl font-bold">Account recovery</h1>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {done ? <div className="mt-5 space-y-4"><p role="status">Password updated. Your previous sessions have ended.</p><Link className="text-[#573FD1] underline" to={AUTH_SIGNIN_PATH}>Sign in with your new password</Link></div>
        : user ? <div className="mt-5 space-y-4"><p>Sign out before recovering an account.</p><button disabled={busy} className="rounded-lg bg-[#573FD1] px-4 py-2 text-white" onClick={() => { setBusy(true); void signOut().catch(() => { setError("Unable to sign out. Please try again."); setBusy(false); }); }}>Sign out</button></div>
        : <form onSubmit={(event) => void submit(event)} className="mt-5 space-y-4">
          <p className="text-sm text-slate-600">Ask your hospital administrator to verify your identity and issue a reset code. Codes work once and expire after 15 minutes.</p>
          <fieldset disabled={busy} className="space-y-4">
            <label className="block text-sm font-medium">Username<input required autoComplete="username" maxLength={64} className={control} value={username} onChange={(e) => setUsername(e.target.value)} /></label>
            <label className="block text-sm font-medium">Reset code<input required autoComplete="off" spellCheck={false} minLength={48} maxLength={48} className={control + " font-mono"} value={token} onChange={(e) => setToken(e.target.value)} /></label>
            <label className="block text-sm font-medium">New password<input required type="password" autoComplete="new-password" minLength={12} maxLength={72} className={control} value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <p className="text-xs text-slate-500">Use at least 12 characters, with uppercase and lowercase letters and a number. Maximum 72 bytes.</p>
            <label className="block text-sm font-medium">Confirm new password<input required type="password" autoComplete="new-password" className={control} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} /></label>
            <button className="w-full rounded-lg bg-[#573FD1] px-4 py-3 text-sm font-medium text-white disabled:opacity-50" disabled={busy}>{busy ? "Updating password..." : "Set new password"}</button>
          </fieldset>
          <Link className="inline-block text-sm text-[#573FD1] underline" to={AUTH_SIGNIN_PATH}>Return to sign in</Link>
        </form>}
    </section>
  </main>;
}
