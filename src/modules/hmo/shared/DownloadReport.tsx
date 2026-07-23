import { useEffect, useState } from "react";
import { ChevronDown, FileDown, X } from "lucide-react";
import * as XLSX from "xlsx";
import ExportOtpModal from "./ExportOtpModal";
import ExportDownloadSuccessModal from "./ExportDownloadSuccessModal";

interface ExportPopupProps {
  reportTitle: string;
  tableRef?: React.RefObject<HTMLTableElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

const FORMAT_OPTIONS = [
  { value: "xls", label: "Excel", extension: "xlsx" },
  { value: "csv", label: "CSV", extension: "csv" },
] as const;

function getExportHeading(reportTitle: string) {
  const trimmed = reportTitle.trim();
  if (/^export/i.test(trimmed)) return trimmed;
  return `Export all ${trimmed}`;
}

const DownloadReport: React.FC<ExportPopupProps> = ({
  reportTitle,
  tableRef,
  isOpen,
  onClose,
}) => {
  const [format, setFormat] =
    useState<(typeof FORMAT_OPTIONS)[number]["value"]>("xls");
  const [showOtp, setShowOtp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowOtp(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowOtp(false);
    setShowSuccess(false);
    onClose();
  };

  const performDownload = () => {
    if (!tableRef?.current) {
      console.error("Table reference is null");
      return;
    }

    const rows = Array.from(tableRef.current.querySelectorAll("tr"));
    const tableData = rows.map((row) =>
      Array.from(row.querySelectorAll("th, td")).map(
        (cell) => (cell as HTMLElement).textContent?.trim() || "",
      ),
    );

    if (tableData.length === 0) {
      console.error("No data found in the table");
      return;
    }

    const fileBase = getExportHeading(reportTitle)
      .replace(/\s+/g, "_")
      .toLowerCase();

    const selectedFormat =
      FORMAT_OPTIONS.find((option) => option.value === format) ??
      FORMAT_OPTIONS[0];

    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${fileBase}.${selectedFormat.extension}`);

    setShowOtp(false);
    setShowSuccess(true);
  };

  const handleDownloadClick = () => {
    setShowOtp(true);
  };

  const formatLabel =
    FORMAT_OPTIONS.find((option) => option.value === format)?.label ?? "XLS";

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {isOpen && !showSuccess && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 ${
          showOtp ? "pointer-events-none" : ""
        }`}
        onClick={showOtp ? undefined : handleClose}
        role="presentation"
      >
        <div
          className={`w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl ${
            showOtp ? "blur-sm" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="export-dialog-title"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2
              id="export-dialog-title"
              className="text-lg font-bold text-gray-900"
            >
              Export All Data
            </h2>
            <button
              type="button"
              onClick={handleClose}
              disabled={showOtp}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col items-center px-6 py-8 text-center">
            <FileDown className="h-14 w-14 text-gray-700" strokeWidth={1.5} />
            <h3 className="mt-5 text-base font-bold text-gray-900">
              {getExportHeading(reportTitle)}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Download your data in your favourite format.
            </p>
          </div>

          <div className="flex gap-3 px-6 pb-6">
            <div className="relative shrink-0">
              <select
                value={format}
                onChange={(e) =>
                  setFormat(
                    e.target.value as (typeof FORMAT_OPTIONS)[number]["value"],
                  )
                }
                disabled={showOtp}
                className="appearance-none rounded-lg border border-[#573FD1] bg-[#EDE9FE] py-2.5 pl-4 pr-10 text-sm font-medium text-[#573FD1] outline-none focus:ring-2 focus:ring-[#573FD1]/30 disabled:opacity-50"
                aria-label="Export format"
              >
                {FORMAT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>

            <button
              type="button"
              onClick={handleDownloadClick}
              disabled={showOtp}
              className="flex-1 rounded-lg bg-[#573FD1] py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      )}

      <ExportOtpModal
        isOpen={showOtp}
        onClose={() => setShowOtp(false)}
        onVerified={performDownload}
      />

      <ExportDownloadSuccessModal
        reportTitle={getExportHeading(reportTitle)}
        formatLabel={formatLabel}
        open={showSuccess}
        onDismiss={handleClose}
      />
    </>
  );
};

export default DownloadReport;
