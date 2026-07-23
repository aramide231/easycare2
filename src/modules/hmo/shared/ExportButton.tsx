import { useState } from "react";
import DownloadReport from "./DownloadReport";

interface ExportButtonProps {
  reportTitle: string;
  tableRef?: React.RefObject<HTMLTableElement | null>;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  reportTitle,
  tableRef,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center rounded-full border border-[#573FD1] px-3 py-1.5 text-sm font-medium text-[#573FD1] transition hover:bg-purple-50"
      >
        <svg
          className="mr-2 h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Export
      </button>

      <DownloadReport
        reportTitle={reportTitle}
        tableRef={tableRef}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default ExportButton;
