import { useCallback, useRef, useState } from "react";
import { Upload, FileText, Image, X } from "lucide-react";
import { useAuth } from "@doctor-shared/context/useAuth";
import { toast } from "react-toastify";
import DeleteFileConfirmModal from "./DeleteFileConfirmModal";
import DeleteFileSuccessModal from "./DeleteFileSuccessModal";

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

type PendingUpload = {
  id: string;
  file: File;
  displayName: string;
};

type Props = {
  patientName: string;
  patientId: string;
  phoneNumber?: string;
  /** When true, upload + table sit inside Step 2 (Figma attach-documents layout). */
  figmaLayout?: boolean;
  /** Figma Step 2: show only upload zone or only the files table. */
  viewMode?: "upload" | "list";
};

const SEED_DOCUMENTS: UploadedDocument[] = [
  {
    id: "doc-seed-1",
    displayName: "Abiola Adebayo Pelvic Scan",
    fileName: "pelvic-scan.pdf",
    fileType: "application/pdf",
    uploadDate: "15-Feb-2025",
    uploadTime: "10:24 AM",
    uploadedBy: "Titilayo Oluyinka",
    objectUrl: "",
  },
];

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

function getFileIcon(fileName: string, fileType: string) {
  const lower = fileName.toLowerCase();
  const isImage =
    fileType.startsWith("image/") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".png");

  if (isImage) {
    return <Image className="h-5 w-5 text-emerald-600" aria-hidden />;
  }

  return <FileText className="h-5 w-5 text-red-600" aria-hidden />;
}

const DoctorUploadedDocumentsSection = ({
  patientName,
  patientId,
  phoneNumber,
  figmaLayout = false,
  viewMode,
}: Props) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>(SEED_DOCUMENTS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showUploadPanel, setShowUploadPanel] = useState(!figmaLayout);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [docToDelete, setDocToDelete] = useState<UploadedDocument | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const showUploadZone =
    !figmaLayout || viewMode === "upload" || (!viewMode && showUploadPanel);
  const showFileTable =
    !figmaLayout || viewMode === "list" || !viewMode;

  const validateFile = (file: File): string | null => {
    if (!isAcceptedFile(file)) {
      return "Only JPEG, PNG, and PDF files are allowed.";
    }
    if (file.size > MAX_FILE_BYTES) {
      return "File size must not exceed 3MB.";
    }
    return null;
  };

  const handleFilesSelect = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    const nextPending: PendingUpload[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
        return;
      }

      nextPending.push({
        id: `pending-${file.name}-${Date.now()}-${Math.random()}`,
        file,
        displayName: file.name.replace(/\.[^.]+$/, ""),
      });
    });

    if (errors.length > 0) {
      setFileError(errors.join(" "));
    } else {
      setFileError(null);
    }

    if (nextPending.length > 0) {
      setPendingUploads((prev) => [...prev, ...nextPending]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFilesSelect(e.target.files);
    }
    e.target.value = "";
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFilesSelect(e.dataTransfer.files);
    }
  }, []);

  const clearPending = () => {
    setPendingUploads([]);
    setFileError(null);
  };

  const removePending = (id: string) => {
    setPendingUploads((prev) => prev.filter((item) => item.id !== id));
  };

  const updatePendingName = (id: string, displayName: string) => {
    setPendingUploads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, displayName } : item))
    );
  };

  const handleConfirmUpload = async () => {
    if (pendingUploads.length === 0) return;

    const missingName = pendingUploads.find((item) => !item.displayName.trim());
    if (missingName) {
      setFileError("Please enter a name for each file.");
      return;
    }

    setIsUploading(true);
    setFileError(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = new Date();
    const newEntries: UploadedDocument[] = pendingUploads.map((item) => ({
      id: `doc-${item.id}`,
      displayName: item.displayName.trim(),
      fileName: item.file.name,
      fileType: item.file.type,
      uploadDate: formatUploadDate(now),
      uploadTime: formatUploadTime(now),
      uploadedBy: user?.fullName ?? "Unknown User",
      objectUrl: URL.createObjectURL(item.file),
    }));

    setDocuments((prev) => [...newEntries, ...prev]);
    clearPending();
    setIsUploading(false);
    toast.success(
      newEntries.length === 1
        ? "Document uploaded successfully"
        : `${newEntries.length} documents uploaded successfully`
    );
  };

  const confirmDelete = () => {
    if (!docToDelete) return;

    if (docToDelete.objectUrl) {
      URL.revokeObjectURL(docToDelete.objectUrl);
    }

    setDocuments((prev) => prev.filter((d) => d.id !== docToDelete.id));
    setDocToDelete(null);
    setShowDeleteSuccess(true);
  };

  const handleView = (doc: UploadedDocument) => {
    if (!doc.objectUrl) {
      toast.info("Preview not available for this sample file.");
      return;
    }
    window.open(doc.objectUrl, "_blank", "noopener,noreferrer");
  };

  const canConfirm =
    pendingUploads.length > 0 &&
    pendingUploads.every((item) => item.displayName.trim().length > 0) &&
    !isUploading;

  const allSelected =
    documents.length > 0 && selectedIds.size === documents.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(documents.map((doc) => doc.id)));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const uploadZone = (
    <>
      {pendingUploads.length === 0 ? (
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
            Upload Documents
          </p>
          <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
            Click to browse or drag and drop one or more files here
          </p>
          <p className="mt-3 text-xs text-gray-400">
            JPEG, PNG, or PDF — max 3MB each
          </p>
        </button>
      ) : (
        <div className="rounded-xl border border-[#573FD1]/30 bg-purple-50/40 p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-gray-800">
              {pendingUploads.length} file
              {pendingUploads.length === 1 ? "" : "s"} selected
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-medium text-[#573FD1] hover:underline"
            >
              Add more files
            </button>
          </div>

          <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
            {pendingUploads.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-white bg-white p-3 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                  {getFileIcon(item.file.name, item.file.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(item.file.size / 1024).toFixed(1)} KB
                  </p>
                  <input
                    type="text"
                    value={item.displayName}
                    onChange={(e) =>
                      updatePendingName(item.id, e.target.value)
                    }
                    placeholder="Enter a name for this document"
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePending(item.id)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  aria-label={`Remove ${item.file.name}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

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
              {isUploading
                ? "Uploading…"
                : `Upload ${pendingUploads.length} file${
                    pendingUploads.length === 1 ? "" : "s"
                  }`}
            </button>
          </div>
        </div>
      )}

      {fileError && pendingUploads.length === 0 && (
        <p className="text-sm text-red-600">{fileError}</p>
      )}
    </>
  );

  return (
    <>
      <div className="flex flex-col gap-6">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT_ATTR}
          multiple
          className="hidden"
          onChange={onInputChange}
        />

        {figmaLayout && !viewMode && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowUploadPanel((prev) => !prev)}
              className="rounded-lg border border-[#573FD1] bg-white px-4 py-2 text-sm font-medium text-[#573FD1] hover:bg-purple-50"
            >
              {showUploadPanel ? "Hide upload" : "Upload document"}
            </button>
          </div>
        )}

        {showUploadZone && uploadZone}

        {showFileTable && (
          <div>
            {!figmaLayout && (
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Uploaded Files
                {documents.length > 0 && (
                  <span className="ml-2 font-normal text-gray-500">
                    ({documents.length})
                  </span>
                )}
              </h3>
            )}

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="w-10 p-3">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        aria-label="Select all documents"
                        className="h-4 w-4 rounded border-gray-300 text-[#573FD1] focus:ring-[#573FD1]"
                      />
                    </th>
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
                        colSpan={5}
                        className="bg-gray-50 px-4 py-10 text-center text-sm text-gray-500"
                      >
                        No documents uploaded yet.
                        {figmaLayout && viewMode === "upload"
                          ? " Upload files in the Upload Files category."
                          : figmaLayout
                            ? " Use Upload Files to attach documents."
                            : " Use the box above to attach files."}
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc) => (
                      <tr
                        key={doc.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(doc.id)}
                            onChange={() => toggleSelect(doc.id)}
                            aria-label={`Select ${doc.displayName}`}
                            className="h-4 w-4 rounded border-gray-300 text-[#573FD1] focus:ring-[#573FD1]"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100">
                              {getFileIcon(doc.fileName, doc.fileType)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {doc.displayName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {doc.fileName} · {patientId}
                                {phoneNumber ? ` | ${phoneNumber}` : ""}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {doc.uploadDate} {doc.uploadTime}
                        </td>
                        <td className="p-3 whitespace-nowrap">{doc.uploadedBy}</td>
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleView(doc)}
                              className="rounded bg-green-100 px-2.5 py-1 text-xs font-medium uppercase text-green-700 hover:bg-green-200"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => setDocToDelete(doc)}
                              className="rounded bg-red-100 px-2.5 py-1 text-xs font-medium uppercase text-red-700 hover:bg-red-200"
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

      <DeleteFileConfirmModal
        open={Boolean(docToDelete)}
        onCancel={() => setDocToDelete(null)}
        onConfirm={confirmDelete}
      />

      <DeleteFileSuccessModal
        open={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </>
  );
};

export default DoctorUploadedDocumentsSection;
