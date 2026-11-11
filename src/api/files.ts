import { ApiError, apiFetch } from "@/api/client/apClient";

export interface PrivateFile {
  id: number;
  original_name: string;
  mime_type: string;
  byte_size: number;
  scan_status: string;
  uploaded_by: number;
  created_at: string;
}
export interface FilePage {
  data: PrivateFile[];
  meta: { current_page: number; last_page: number; total: number };
}
export const listFiles = (page: number, signal?: AbortSignal) => apiFetch<FilePage>(
  "/files?" + new URLSearchParams({ page: String(page), per_page: "20" }), { signal },
);
export async function uploadFile(file: File, key: string, signal?: AbortSignal) {
  const data = new FormData();
  data.set("file", file);
  const result = await apiFetch<{ data: PrivateFile }>("/files", { method: "POST", data, signal, headers: { "Idempotency-Key": key } });
  if (!Number.isSafeInteger(result?.data?.id) || result.data.id < 1 || result.data.byte_size !== file.size) {
    throw new ApiError("The hospital server did not confirm the saved file. Retry this same upload.", 200, "invalid_response");
  }
  return result;
}
export const downloadFile = (id: number, signal?: AbortSignal) => apiFetch<Blob>(
  "/files/" + id + "/download", { responseType: "blob", signal },
);
