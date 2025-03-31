import { useState, useRef } from "react";
import DownloadReport from "./DownloadReport";

interface ExportButtonProps {
  reportTitle: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ reportTitle }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  return (
    <div>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center border border-purple-400 text-purple-600 px-3 py-1.5 rounded-full text-sm font-medium"
      >
        <svg
          className="w-4 h-4 mr-2 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12h-3m0 0H9m3 0V9m0 3v3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        Export
      </button>

      <DownloadReport
        title={reportTitle}
        tableRef={tableRef}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default ExportButton;
