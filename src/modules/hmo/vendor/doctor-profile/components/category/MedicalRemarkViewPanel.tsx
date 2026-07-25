import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  hasResult: boolean;
  notUploadedMessage?: string;
  children?: React.ReactNode;
};

export default function MedicalRemarkViewPanel({
  open,
  onClose,
  title,
  subtitle,
  hasResult,
  notUploadedMessage = "Results Not Uploaded Yet",
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close view panel"
        onClick={onClose}
      />
      <aside
        className="relative z-[201] flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="medical-remark-view-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="min-w-0">
            <h2
              id="medical-remark-view-title"
              className="truncate text-lg font-bold text-gray-900"
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="truncate text-sm text-gray-500">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {hasResult ? (
            children
          ) : (
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
              <p className="text-sm font-medium italic text-gray-600">
                {notUploadedMessage}
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>,
    document.body
  );
}

export function rowHasUploadedResult(row: Record<string, unknown>): boolean {
  const value = row.hasResult;
  return value === true || value === "true";
}
