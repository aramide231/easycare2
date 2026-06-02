import { useCallback, useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const MAX_FILE_BYTES = 3 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ACCEPT_ATTR = ".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf";

export type UploadedDocument = {
  id: string;
  displayName: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  uploadTime: string;
  uploadedBy: string;
  objectUrl: string;
};

type Props = {
  patientName: string;
  patientId: string;
  phoneNumber?: string;
};

function formatUploadDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatUploadTime(date: Date) {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function isAcceptedFile(file: File) {
  const lower = file.name.toLowerCase();
  const byType = ACCEPTED_TYPES.includes(file.type);
  const byExt =
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".pdf");
  return byType || byExt;
}

const UploadedDocumentsSection = ({
  patientName,
  patientId,
  phoneNumber,
}: Props) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!isAcceptedFile(file)) {
      return "Only JPEG, PNG, and PDF files are allowed.";
    }
    if (file.size > MAX_FILE_BYTES) {
      return "File size must not exceed 3MB.";
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setPendingFile(null);
      return;
    }
    setFileError(null);
    setPendingFile(file);
    const baseName = file.name.replace(/\.[^.]+$/, "");
    setFileName(baseName);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    e.target.value = "";
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, []);

  const clearPending = () => {
    setPendingFile(null);
    setFileName("");
    setFileError(null);
  };

  const handleConfirmUpload = async () => {
    if (!pendingFile) return;
    if (!fileName.trim()) {
      setFileError("Please enter a file name.");
      return;
    }

    setIsUploading(true);
    setFileError(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = new Date();
    const objectUrl = URL.createObjectURL(pendingFile);
    const entry: UploadedDocument = {
      id: `doc-${Date.now()}`,
      displayName: fileName.trim(),
      fileName: pendingFile.name,
      fileType: pendingFile.type,
      uploadDate: formatUploadDate(now),
      uploadTime: formatUploadTime(now),
      uploadedBy: user?.fullName ?? "Unknown User",
      objectUrl,
    };

    setDocuments((prev) => [entry, ...prev]);
    clearPending();
    setIsUploading(false);
    toast.success("Document uploaded successfully");
  };

  const handleDelete = (doc: UploadedDocument) => {
    URL.revokeObjectURL(doc.objectUrl);
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    toast.info("Document removed");
  };

  const handleView = (doc: UploadedDocument) => {
    window.open(doc.objectUrl, "_blank", "noopener,noreferrer");
  };

  const canConfirm =
    pendingFile && fileName.trim().length > 0 && !isUploading;

  return (
    <div className="flex flex-col gap-6">
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="hidden"
        onChange={onInputChange}
      />

      {!pendingFile ? (
        <button
          type="button"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex min-h-[200px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
            isDragging
              ? "border-[#573FD1] bg-purple-50"
              : "border-gray-300 bg-gray-50/80 hover:border-[#573FD1] hover:bg-purple-50/50"
          }`}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
            <Upload className="h-7 w-7 text-[#573FD1]" strokeWidth={1.75} />
          </div>
          <p className="text-base font-semibold text-gray-800">
            Upload Document
          </p>
          <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
            Click to browse or drag and drop your file here
          </p>
          <p className="mt-3 text-xs text-gray-400">
            JPEG, PNG, or PDF — max 3MB
          </p>
        </button>
      ) : (
        <div className="rounded-xl border border-[#573FD1]/30 bg-purple-50/40 p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
                <FileText className="h-6 w-6 text-[#573FD1]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {pendingFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(pendingFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearPending}
              className="rounded-full p-1 text-gray-400 hover:bg-white hover:text-gray-600"
              aria-label="Remove selected file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            File Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
              setFileError(null);
            }}
            placeholder="Enter a name for this document"
            className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
          />

          {fileError && (
            <p className="mb-3 text-sm text-red-600">{fileError}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={clearPending}
              className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canConfirm}
              onClick={handleConfirmUpload}
              className="flex-1 rounded-lg bg-[#573FD1] py-3 text-sm font-medium text-white hover:bg-[#4a35b8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? "Uploading…" : "Confirm"}
            </button>
          </div>
        </div>
      )}

      {fileError && !pendingFile && (
        <p className="text-sm text-red-600">{fileError}</p>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Uploaded Files
          {documents.length > 0 && (
            <span className="ml-2 font-normal text-gray-500">
              ({documents.length})
            </span>
          )}
        </h3>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="p-3 font-medium">Document</th>
                <th className="p-3 font-medium">Date Uploaded</th>
                <th className="p-3 font-medium">Uploaded By</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="bg-gray-50 px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No documents uploaded yet. Use the box above to attach a
                    file.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {doc.displayName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {patientName} · {patientId}
                          {phoneNumber ? ` | ${phoneNumber}` : ""}
                        </span>
                        <span className="text-xs text-gray-400">
                          {doc.fileName}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span>{doc.uploadDate}</span>
                        <span className="text-xs text-gray-500">
                          {doc.uploadTime}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">{doc.uploadedBy}</td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleView(doc)}
                          className="rounded px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(doc)}
                          className="rounded px-2.5 py-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadedDocumentsSection;
