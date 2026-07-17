import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import * as XLSX from "xlsx";

interface ExportPopupProps {
  title: string;
  tableRef: React.RefObject<HTMLTableElement>;
  isOpen: boolean;
  onClose: () => void;
}

const FORMAT_OPTIONS = [
  { value: "xls", label: "XLS" },
  { value: "csv", label: "CSV" },
  { value: "json", label: "JSON" },
] as const;

const DownloadReport: React.FC<ExportPopupProps> = ({
  title,
  tableRef,
  isOpen,
  onClose,
}) => {
  const [format, setFormat] =
    useState<(typeof FORMAT_OPTIONS)[number]["value"]>("xls");

  const handleDownload = () => {
    if (!tableRef.current) return;

    const rows = Array.from(tableRef.current.querySelectorAll("tr"));
    const tableData = rows.map((row) =>
      Array.from(row.querySelectorAll("th, td")).map(
        (cell) => (cell as HTMLElement).textContent || ""
      )
    );

    if (tableData.length === 0) return;

    const fileBase = title.replace(/\s+/g, "_").toLowerCase();

    if (format === "csv" || format === "xls") {
      const ws = XLSX.utils.aoa_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      XLSX.writeFile(wb, `${fileBase}.${format === "xls" ? "xlsx" : format}`);
    } else if (format === "json") {
      const headers = tableData[0];
      const jsonData = tableData
        .slice(1)
        .map((row) =>
          Object.fromEntries(row.map((cell, i) => [headers[i], cell]))
        );

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileBase}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    onClose();
  };

  if (!isOpen) return null;

  const exportHeading = title.toLowerCase().startsWith("export")
    ? title
    : `Export all ${title}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-dialog-title"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="export-dialog-title"
            className="text-lg font-semibold text-gray-900"
          >
            Export All Data
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
            <svg
              className="h-10 w-10 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v4m0 0l-2-2m2 2l2-2"
              />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-900">{exportHeading}</p>
          <p className="mt-1 text-sm text-gray-500">
            Download your data in your favourite format.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-[7rem] flex-1">
            <select
              value={format}
              onChange={(e) =>
                setFormat(e.target.value as (typeof FORMAT_OPTIONS)[number]["value"])
              }
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-800 focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
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
            onClick={handleDownload}
            className="shrink-0 rounded-xl bg-[#573FD1] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a35b8]"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
