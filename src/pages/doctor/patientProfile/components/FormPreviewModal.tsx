import { X } from "lucide-react";

type SectionSummary = {
  label: string;
  count: number;
};

type Props = {
  open: boolean;
  categoryName: string;
  sections: SectionSummary[];
  onClose: () => void;
};

export default function FormPreviewModal({
  open,
  categoryName,
  sections,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="pr-8 text-lg font-semibold text-gray-900">
          Preview — {categoryName}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Sections saved in this session
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Section</th>
                <th className="px-4 py-2 font-medium">Entries</th>
              </tr>
            </thead>
            <tbody>
              {sections.length > 0 ? (
                sections.map((section) => (
                  <tr key={section.label} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-800">{section.label}</td>
                    <td className="px-4 py-3 text-gray-600">{section.count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No sections saved yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
