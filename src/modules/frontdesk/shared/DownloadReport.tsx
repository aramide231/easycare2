import { useState } from "react";
import * as XLSX from "xlsx";

interface ExportPopupProps {
  title: string;
  tableRef: React.RefObject<HTMLTableElement>;
  isOpen: boolean;
  onClose: () => void;
}

const DownloadReport: React.FC<ExportPopupProps> = ({
  title,
  tableRef,
  isOpen,
  onClose,
}) => {
  const [format, setFormat] = useState("xls");

  const handleDownload = () => {
    if (!tableRef.current) {
      console.error("Table reference is null");
      return;
    }

    // setTimeout(() => {
    //     if (!tableRef.current) return;

    const rows = Array.from(tableRef.current.querySelectorAll("tr"));
    const tableData = rows.map((row) =>
      Array.from(row.querySelectorAll("th, td")).map(
        (cell) => (cell as HTMLElement).textContent || ""
      )
    );

    if (tableData.length === 0) {
      console.error("No data found in the table");
      return;
    }

    if (format === "csv" || format === "xls") {
      const ws = XLSX.utils.aoa_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");

      console.log("Downloading file...");
      XLSX.writeFile(
        wb,
        `${title.replace(/\s+/g, "_").toLowerCase()}.${
          format === "xls" ? "xlsx" : format
        }`
      );
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
      link.download = `${title.replace(/\s+/g, "_").toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        <div className="text-center my-4">
          <div className="text-gray-600">{title}</div>
          <p className="text-sm text-gray-500">
            Download data in your preferred format.
          </p>
        </div>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="xls">XLSX</option>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>

        <button
          onClick={handleDownload}
          className="bg-purple-600 text-white w-full py-2 mt-4 rounded-lg"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadReport;
