import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import PatientRegistry from "@/pages/patients/PatientRegistry";

export default function PatientSearchModal({ open, onClose, initialQuery = "" }: {
  open: boolean; onClose: () => void; initialQuery?: string; anchorRef: RefObject<HTMLElement | null>;
}) {
  const navigate = useNavigate();
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    element?.showModal();
    const cancel = (event: Event) => { event.preventDefault(); close.current(); };
    element?.addEventListener("cancel", cancel);
    return () => { element?.removeEventListener("cancel", cancel); element?.close(); previous?.focus(); };
  }, [open]);
  if (!open) return null;
  return createPortal(<dialog ref={dialog} aria-label="Search saved patients" className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-2xl border bg-white p-5 shadow-xl backdrop:bg-black/40">
    <div className="mb-5 flex justify-end"><button className="rounded-lg border px-4 py-2 text-sm" onClick={onClose}>Close patient search</button></div>
    <PatientRegistry initialQuery={initialQuery} onSelect={(id) => { onClose(); navigate("/patients/" + id, { state: null }); }} />
  </dialog>, document.body);
}
