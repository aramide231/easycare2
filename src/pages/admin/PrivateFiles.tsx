import { useEffect, useRef, useState, type FormEvent } from "react";
import { downloadFile, listFiles, uploadFile, type FilePage, type PrivateFile } from "@/api/files";
import { WriteAttempt, isUncertainWrite, writeErrorMessage } from "@/api/client/writeAttempt";
import { useAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/store/useAuthStore";
import { createSessionObjectUrl, revokeSessionObjectUrl } from "@/lib/sessionScope";

const secondary = "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm disabled:opacity-50";
const size = (bytes: number) => bytes >= 1048576 ? (bytes / 1048576).toFixed(1) + " MB" : Math.max(1, Math.ceil(bytes / 1024)) + " KB";
export default function PrivateFiles() {
  const { user } = useAuth();
  const canRead = user?.permissions?.includes("files.view_own") ?? false;
  const canUpload = canRead && (user?.permissions?.includes("files.upload") ?? false);
  const [result, setResult] = useState<FilePage | null>(null);
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [selected, setSelected] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const attempt = useRef(new WriteAttempt());
  const [uncertain, setUncertain] = useState(false);
  const alive = useRef(true);
  const pending = useRef<AbortController | null>(null);
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; pending.current?.abort(); };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setResult(null); setError(""); setLoading(true);
    if (!canRead) { setLoading(false); return; }
    listFiles(page, controller.signal).then((files) => { if (active) setResult(files); })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "Unable to load your files."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [page, revision, canRead, user?.id]);
  const refresh = () => { setPage(1); setRevision((value) => value + 1); };
  const upload = async (event: FormEvent) => {
    event.preventDefault();
    if (!selected || busy || !canUpload) return;
    setError(""); setNotice("");
    if (selected.size === 0 || selected.size > 10 * 1024 * 1024) { setError("Choose a non-empty file no larger than 10 MB."); return; }
    const controller = new AbortController();
    pending.current = controller; setBusy("upload");
    try {
      await uploadFile(selected, attempt.current.key(), controller.signal);
      if (!alive.current) return;
      attempt.current.reset(); setUncertain(false);
      setSelected(null); setInputKey((value) => value + 1);
      refresh(); setNotice("File uploaded and saved privately to your account.");
    } catch (cause) {
      if (alive.current) {
        setUncertain((old) => old || isUncertainWrite(cause));
        setError(writeErrorMessage(cause));
      }
    } finally { if (alive.current) setBusy(null); pending.current = null; }
  };
  const download = async (file: PrivateFile) => {
    if (busy) return;
    setError(""); setNotice("");
    const controller = new AbortController();
    const scope = useAuthStore.getState().revision;
    pending.current = controller; setBusy("download-" + file.id);
    try {
      const blob = await downloadFile(file.id, controller.signal);
      if (!alive.current || scope !== useAuthStore.getState().revision) return;
      if (blob.size !== file.byte_size) throw new Error("The file download was incomplete. Try again.");
      const objectUrl = createSessionObjectUrl(blob);
      const link = document.createElement("a");
      link.href = objectUrl; link.download = file.original_name;
      document.body.appendChild(link);
      link.click(); link.remove();
      window.setTimeout(() => revokeSessionObjectUrl(objectUrl), 1000);
      setNotice("Download prepared: " + file.original_name);
    } catch (cause) {
      if (alive.current) { setResult(null); setError(cause instanceof Error ? cause.message : "Unable to download this file."); }
    } finally { if (alive.current) setBusy(null); pending.current = null; }
  };

  if (!canRead) return <p role="alert">Your account does not have permission to view private files.</p>;
  return <section aria-labelledby="files-title">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div>
      <h1 id="files-title" className="text-2xl font-bold">My files</h1>
      <p className="mt-2 text-sm text-slate-600">Files are private to your staff account. Only upload documents from sources you trust.</p>
    </div><button className={secondary} disabled={loading || !!busy} onClick={refresh}>Reload files</button></div>
    {canUpload && <form onSubmit={(event) => void upload(event)} className="mb-6 rounded-xl border bg-white p-5">
      <label htmlFor="private-upload" className="block text-sm font-medium">Choose a file</label>
      <p id="upload-help" className="mb-3 mt-1 text-sm text-slate-600">PDF, JPEG or PNG, up to 10 MB. Virus scanning is not configured.</p>
      <input key={inputKey} id="private-upload" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png" aria-describedby="upload-help"
        disabled={!!busy || uncertain} onChange={(event) => { attempt.current.reset(); setSelected(event.target.files?.[0] ?? null); setError(""); setNotice(""); }} className="block w-full rounded-lg border p-3 text-sm" />
      <button disabled={!selected || !!busy} className="mt-4 rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{busy === "upload" ? "Uploading..." : uncertain ? "Retry upload" : "Upload file"}</button>
    </form>}
    {uncertain && <p className="mb-4 rounded-lg bg-amber-50 p-4 text-amber-900">The upload may already be saved. Retry the same selected file to confirm it safely. Reloading this page clears the pending selection; check your file list before starting another upload.</p>}
    {notice && <p role="status" className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">{notice}</p>}
    {error && <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"><p>{error}</p><button className="mt-2 underline" disabled={!!busy} onClick={refresh}>Reload files</button></div>}
    {loading && <p role="status">Loading your files...</p>}
    {result && <><p className="mb-3 text-sm text-slate-600">{result.meta.total} {result.meta.total === 1 ? "file" : "files"}</p>
      {result.data.length === 0 ? <p className="rounded-xl border bg-white p-8 text-center">You have no uploaded files.</p> :
        <div className="overflow-x-auto rounded-xl border bg-white"><table className="w-full min-w-[700px] text-left text-sm">
          <caption className="sr-only">Files owned by your staff account, newest first</caption>
          <thead className="bg-slate-100 text-slate-600"><tr>{["File", "Size", "Uploaded (UTC)", "Virus scan", "Download"].map((label) => <th key={label} scope="col" className="px-4 py-3 font-medium">{label}</th>)}</tr></thead>
          <tbody>{result.data.map((file) => <tr key={file.id} className="border-t align-top"><td className="max-w-xs break-words px-4 py-4">{file.original_name}<p className="mt-1 text-xs text-slate-500">File #{file.id}</p></td>
            <td className="whitespace-nowrap px-4 py-4">{size(file.byte_size)}</td><td className="whitespace-nowrap px-4 py-4"><time dateTime={file.created_at}>{file.created_at.slice(0, 19).replace("T", " ")}</time></td>
            <td className="px-4 py-4">{file.scan_status === "not_scanned" ? "Not scanned" : file.scan_status === "clean" ? "Scanned" : "Unavailable"}</td>
            <td className="px-4 py-4"><button className={secondary} aria-label={"Download " + file.original_name} disabled={!!busy || !["not_scanned", "clean"].includes(file.scan_status)} onClick={() => void download(file)}>{busy === "download-" + file.id ? "Preparing..." : "Download"}</button></td></tr>)}</tbody>
        </table></div>}
      <nav aria-label="File pages" className="mt-4 flex items-center justify-between gap-4">
        <button className={secondary} disabled={!!busy || loading || result.meta.current_page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</button>
        <span className="text-sm">Page {result.meta.current_page} of {result.meta.last_page}</span>
        <button className={secondary} disabled={!!busy || loading || result.meta.current_page >= result.meta.last_page} onClick={() => setPage((value) => value + 1)}>Next</button>
      </nav></>}
  </section>;
}
