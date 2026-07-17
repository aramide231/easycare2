import { useRef, useState } from "react";
import DownloadReport from "./DownloadReport";

interface ExportButtonProps {
  reportTitle: string;
  tableRef?: React.RefObject<HTMLTableElement>;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  reportTitle,
  tableRef: externalTableRef,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const internalTableRef = useRef<HTMLTableElement>(null);
  const tableRef = externalTableRef ?? internalTableRef;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center rounded-full border border-[#573FD1]/40 px-3 py-1.5 text-sm font-medium text-[#573FD1]"
      >
        <svg
          className="mr-2 h-4 w-4 text-[#573FD1]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12h-3m0 0H9m3 0V9m0 3v3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
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
