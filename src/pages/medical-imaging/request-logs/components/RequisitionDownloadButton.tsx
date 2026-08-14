import { useRef, useState } from "react";
import DownloadReport from "@/constant/DownloadReport";

type Props = {
  reportTitle: string;
  tableRef?: React.RefObject<HTMLTableElement>;
};

export default function RequisitionDownloadButton({
  reportTitle,
  tableRef: externalTableRef,
}: Props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const internalTableRef = useRef<HTMLTableElement>(null);
  const tableRef = externalTableRef ?? internalTableRef;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Download
      </button>

      <DownloadReport
        title={reportTitle}
        tableRef={tableRef}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
