import { useRef } from "react";
import { X, Upload } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UploadInvestigationModal({ isOpen, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error("Select a CSV or Excel file to upload.");
      return;
    }

    toast.success(`"${file.name}" uploaded successfully.`);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Upload Investigations</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Upload a prepared CSV or Excel file to add investigation records to the
          database.
        </p>

        <label
          htmlFor="investigation-upload-input"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 hover:border-[#573FD1]/40 hover:bg-purple-50/30"
        >
          <Upload className="mb-2 h-8 w-8 text-[#573FD1]" />
          <span className="text-sm font-medium text-gray-700">
            Choose CSV or Excel file
          </span>
          <input
            id="investigation-upload-input"
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
          />
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            className="rounded-lg bg-[#573FD1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a35b8]"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
