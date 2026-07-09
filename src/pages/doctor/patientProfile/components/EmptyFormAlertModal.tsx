type Props = {
  open: boolean;
  action: "preview" | "submit";
  unfilledSections: string[];
  onClose: () => void;
};

const EmptyFormAlertModal = ({
  open,
  action,
  unfilledSections,
  onClose,
}: Props) => {
  if (!open) return null;

  const message =
    action === "preview"
      ? "Please fill in and save all sections before previewing."
      : "Please fill in and save all sections before submitting.";

  const hasPartialProgress = unfilledSections.length > 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="empty-form-alert-title"
    >
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-8 py-6 text-center">
          <h2
            id="empty-form-alert-title"
            className="text-xl font-semibold text-gray-900"
          >
            Incomplete Form
          </h2>
          <p className="mt-2 text-base text-gray-600">{message}</p>
        </div>

        {hasPartialProgress && (
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <p className="text-sm font-medium text-gray-700">
              {unfilledSections.length === 1
                ? "1 section still needs to be completed:"
                : `${unfilledSections.length} sections still need to be completed:`}
            </p>
            <ul className="mt-4 space-y-2">
              {unfilledSections.map((section) => (
                <li
                  key={section}
                  className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm font-medium text-amber-900"
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-gray-200 px-8 py-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-[#573FD1] px-4 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#4a35b8]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyFormAlertModal;
