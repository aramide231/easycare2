import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import FlagProfileReport from "@/pages/nurse/patient-profile/flag-profile/components/FlagProfileReport";

const SLIDE_DURATION_MS = 450;

type Props = {
  open: boolean;
  onClose: () => void;
  patientName?: string;
  patientId?: string;
  /** embedded = slides inside a relative parent (e.g. patient profile card) */
  variant?: "portal" | "embedded";
};

const FlagPatientPanel = ({
  open,
  onClose,
  patientName,
  patientId,
  variant = "portal",
}: Props) => {
  const [isRendered, setIsRendered] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsRendered(true);
      setIsVisible(false);
      let outerFrame = 0;
      let innerFrame = 0;

      outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setIsVisible(true));
      });

      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
      };
    }

    setIsVisible(false);
    const timer = window.setTimeout(
      () => setIsRendered(false),
      SLIDE_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!isRendered || variant === "embedded") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isRendered, onClose, variant]);

  useEffect(() => {
    if (!isRendered || variant !== "embedded") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isRendered, onClose, variant]);

  if (!isRendered) return null;

  const isEmbedded = variant === "embedded";
  const panelWidthClass = isEmbedded
    ? "w-[78%] min-w-[20rem] max-w-4xl"
    : "w-[min(92vw,48rem)]";

  const content = (
    <div
      className={
        isEmbedded
          ? "absolute inset-0 z-30 overflow-hidden rounded-xl"
          : "fixed inset-0 z-[110]"
      }
    >
      <button
        type="button"
        className={`absolute inset-0 transition-opacity ease-in-out ${
          isEmbedded ? "bg-black/20" : "bg-black/40"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDuration: `${SLIDE_DURATION_MS}ms` }}
        aria-label="Close flag patient panel"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Flag Patient"
        className={`absolute left-0 top-0 flex h-full flex-col border-r border-gray-200 bg-white shadow-xl ease-in-out will-change-transform ${panelWidthClass} ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transition: `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-200 px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900">Flag Patient</h2>
            {(patientName || patientId) && (
              <p className="mt-0.5 truncate text-sm text-gray-500">
                {patientName}
                {patientId ? ` · ${patientId}` : ""}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Close flag patient panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <FlagProfileReport />
        </div>
      </aside>
    </div>
  );

  if (isEmbedded) return content;

  return createPortal(content, document.body);
};

export default FlagPatientPanel;
