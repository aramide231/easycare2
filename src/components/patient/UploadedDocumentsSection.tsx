import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, X } from "lucide-react";
import { FaCloudUploadAlt, FaFolderOpen } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import SelectCategoryCard from "@/pages/doctor/patientProfile/components/SelectCategoryCard";

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

type PendingFile = {
  id: string;
  file: File;
  displayName: string;
  error: string | null;
};

type ActivePanel = null | "upload" | "uploaded";

type Props = {
  patientName: string;
  patientId: string;
  phoneNumber?: string;
  variant?: "doctor" | "nurse";
  /** When set, controls upload vs list panel (used by doctor profile step 3). */
  viewMode?: "upload" | "list";
  /** Hide internal Upload / Uploaded cards when parent provides category picker. */
  hidePanelPicker?: boolean;
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

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
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
  variant = "doctor",
  viewMode,
  hidePanelPicker = false,
}: Props) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!viewMode) return;
    setActivePanel(viewMode === "upload" ? "upload" : "uploaded");
  }, [viewMode]);

  const validateFile = (file: File): string | null => {
    if (!isAcceptedFile(file)) {
      return "Only JPEG, PNG, and PDF files are allowed.";
    }
    if (file.size > MAX_FILE_BYTES) {
      return "File size must not exceed 3MB.";
    }
    return null;
  };

  const addPendingFiles = (files: FileList | File[]) => {
    const nextPending: PendingFile[] = [];

    Array.from(files).forEach((file) => {
      nextPending.push({
        id: `pending-${Date.now()}-${file.name}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        displayName: file.name.replace(/\.[^.]+$/, ""),
        error: validateFile(file),
      });
    });

    if (nextPending.length > 0) {
      setPendingFiles((prev) => [...prev, ...nextPending]);
      setFileError(
        nextPending.some((item) => item.error)
          ? "Remove files highlighted in red before confirming upload."
          : null,
      );
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) addPendingFiles(files);
    e.target.value = "";
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) addPendingFiles(files);
  }, []);

  const updatePendingName = (id: string, displayName: string) => {
    setPendingFiles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, displayName } : item,
      ),
    );
    setFileError(null);
  };

  const removePendingFile = (id: string) => {
    setPendingFiles((prev) => {
      const next = prev.filter((item) => item.id !== id);
      if (next.length === 0 || next.every((item) => !item.error)) {
        setFileError(null);
      }
      return next;
    });
  };

  const clearPending = () => {
    setPendingFiles([]);
    setFileError(null);
  };

  const validPendingFiles = pendingFiles.filter((item) => !item.error);
  const hasInvalidPendingFiles = pendingFiles.some((item) => item.error);

  const handleConfirmUpload = async () => {
    if (validPendingFiles.length === 0 || hasInvalidPendingFiles) return;

    const hasEmptyName = validPendingFiles.some(
      (item) => !item.displayName.trim(),
    );
    if (hasEmptyName) {
      setFileError("Please enter a file name for each document.");
      return;
    }

    setIsUploading(true);
    setFileError(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = new Date();
    const entries: UploadedDocument[] = validPendingFiles.map((item) => ({
      id: `doc-${Date.now()}-${item.id}`,
      displayName: item.displayName.trim(),
      fileName: item.file.name,
      fileType: item.file.type,
      uploadDate: formatUploadDate(now),
      uploadTime: formatUploadTime(now),
      uploadedBy: user?.fullName ?? "Unknown User",
      objectUrl: URL.createObjectURL(item.file),
    }));

    setDocuments((prev) => [...entries, ...prev]);
    clearPending();
    setIsUploading(false);
    toast.success(
      entries.length === 1
        ? "Document uploaded successfully"
        : `${entries.length} documents uploaded successfully`,
    );
    setActivePanel("uploaded");
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
    validPendingFiles.length > 0 &&
    !hasInvalidPendingFiles &&
    validPendingFiles.every((item) => item.displayName.trim().length > 0) &&
    !isUploading;

  const uploadedLabel =
    documents.length > 0
      ? `Uploaded Documents (${documents.length})`
      : "Uploaded Documents";

  const documentCards = (
    <>
      <SelectCategoryCard
        icon={FaCloudUploadAlt}
        label="Upload Document"
        selected={activePanel === "upload"}
        onClick={() => setActivePanel("upload")}
      />
      <SelectCategoryCard
        icon={FaFolderOpen}
        label={uploadedLabel}
        selected={activePanel === "uploaded"}
        onClick={() => setActivePanel("uploaded")}
      />
    </>
  );

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT_ATTR}
        multiple
        className="hidden"
        onChange={onInputChange}
      />

      <div
        className={`mb-4 grid w-full grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-[10px] ${
          hidePanelPicker ? "hidden" : ""
        }`}
      >
        {documentCards}
      </div>

      <div className="rounded-lg border border-gray-300 p-4">
        {activePanel === null && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-sm text-gray-400">
            <p className="text-black">Document content goes here</p>
            <p>Becomes active when a box above is clicked</p>
          </div>
        )}

        {activePanel === "upload" && (
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-800">
              Upload Document
            </h3>

          <button
            type="button"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex min-h-[200px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
              isDragging
                ? "border-[#3d2ca8] bg-purple-100"
                : "border-[#573FD1] bg-gray-50 hover:border-[#3d2ca8] hover:bg-purple-50"
            }`}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
              <FaCloudUploadAlt className="text-2xl text-[#573FD1]" />
            </div>
            <p className="text-base font-semibold text-gray-800">
              Upload Documents
            </p>
            <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
              Click to browse or drag and drop one or more files here
            </p>
            <p className="mt-3 text-xs text-gray-400">
              JPEG, PNG, or PDF — max 3MB each
            </p>
          </button>

          {pendingFiles.length > 0 && (
            <div className="mt-4 space-y-3">
              {pendingFiles.map((item) => {
                const isInvalid = Boolean(item.error);
                return (
                <div
                  key={item.id}
                  className={`rounded-lg border-2 p-4 ${
                    isInvalid
                      ? "border-red-500 bg-red-50"
                      : "border-[#573FD1]/30 bg-purple-50/40"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-sm ${
                          isInvalid ? "bg-red-100" : "bg-white"
                        }`}
                      >
                        <FileText
                          className={`h-5 w-5 ${
                            isInvalid ? "text-red-600" : "text-[#573FD1]"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.file.name}
                        </p>
                        <p
                          className={`text-xs ${
                            isInvalid ? "font-medium text-red-600" : "text-gray-500"
                          }`}
                        >
                          {formatFileSize(item.file.size)}
                          {isInvalid ? ` · ${item.error}` : ""}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePendingFile(item.id)}
                      className="rounded-full p-1 text-gray-400 hover:bg-white hover:text-gray-600"
                      aria-label="Remove selected file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  {!isInvalid && (
                    <>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Enter/rename doc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.displayName}
                    onChange={(e) =>
                      updatePendingName(item.id, e.target.value)
                    }
                    placeholder="Enter a name for this document"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
                  />
                    </>
                  )}
                </div>
              );
              })}

              {fileError && (
                <p className="text-sm text-red-600">{fileError}</p>
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
                  {isUploading
                    ? "Uploading…"
                    : `Confirm (${validPendingFiles.length})`}
                </button>
              </div>
            </div>
          )}

          {fileError && pendingFiles.length === 0 && (
            <p className="mt-3 text-sm text-red-600">{fileError}</p>
          )}
          </div>
        )}

        {activePanel === "uploaded" && (
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-800">
              Uploaded Documents
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
                      No documents uploaded yet. Use Upload Document to attach
                      files.
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
                      <td className="p-3 whitespace-nowrap">
                        {doc.uploadedBy}
                      </td>
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
        )}
      </div>
    </div>
  );
};

export default UploadedDocumentsSection;
