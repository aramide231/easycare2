import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AUTH_SIGNIN_PATH } from "@/lib/authRoutes";

export default function AccountAccess({ recovery = false }: { recovery?: boolean }) {
  const { user, signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const logout = async () => {
    setBusy(true);
    try { await signOut(); }
    catch { setError("Unable to sign out. Check your connection and try again."); }
    finally { setBusy(false); }
  };
  return <main className="mx-auto max-w-lg p-10 text-center">
    <h1 className="text-xl font-bold">{recovery ? "Account recovery" : "Staff access pending"}</h1>
    <p className="my-4">{recovery ? "Contact your hospital administrator for password recovery." : "Your account has no assigned module. Contact your hospital administrator to arrange access."}</p>
    {error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
    {user ? <button disabled={busy} className="rounded bg-purple-700 px-5 py-3 text-white" onClick={() => void logout()}>{busy ? "Signing out..." : "Sign out"}</button>
      : <Link className="text-purple-700 underline" to={AUTH_SIGNIN_PATH}>Return to sign in</Link>}
  </main>;
}
