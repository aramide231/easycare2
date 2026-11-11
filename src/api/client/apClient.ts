import { useAuthStore } from "@/store/useAuthStore";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");
let csrfToken: string | null = null;
let csrfRequest: Promise<void> | null = null;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function setCsrfToken(token: string | null) {
  csrfToken = token;
}

async function fetchFromServer(url: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch {
    throw new ApiError("Unable to contact the hospital server. Please try again.", 0, "network_error");
  }
}

async function readResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    throw new ApiError("Unable to contact the hospital server. Please try again.", response.status, "invalid_response");
  }
}

async function bootstrapCsrf(): Promise<void> {
  const response = await fetchFromServer(`${BASE_URL}/auth/csrf-token`, {
    credentials: "include",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  const body = await readResponse(response);
  if (!response.ok || typeof body.data?.csrf_token !== "string") {
    throw new ApiError(body.message || "Unable to start a secure session.", response.status, body.code);
  }
  csrfToken = body.data.csrf_token;
}

interface FetchOptions extends RequestInit {
  data?: unknown;
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { data, headers: customHeaders, ...customConfig } = options;

  const method = (customConfig.method || (data !== undefined ? "POST" : "GET")).toUpperCase();
  const mutating = !["GET", "HEAD", "OPTIONS"].includes(method);
  if (mutating && !csrfToken) {
    csrfRequest ??= bootstrapCsrf().finally(() => { csrfRequest = null; });
    await csrfRequest;
  }
  const revision = useAuthStore.getState().revision;
  const headers = new Headers(customHeaders);
  headers.set("Accept", "application/json");
  if (data !== undefined) headers.set("Content-Type", "application/json");
  if (mutating && csrfToken) headers.set("X-CSRF-TOKEN", csrfToken);

  const config: RequestInit = {
    ...customConfig,
    method,
    headers,
    credentials: "include",
    cache: "no-store",
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const response = await fetchFromServer(`${BASE_URL}${endpoint}`, config);

  if (response.status === 204) {
    return {} as T;
  }

  const responseData = await readResponse(response);

  if (!response.ok) {
    if (response.status === 401 && useAuthStore.getState().revision === revision) {
      useAuthStore.getState().clearAuth();
    }
    if (response.status === 419) csrfToken = null;
    throw new ApiError(
      Object.values(responseData.errors || {}).flat()[0] as string || responseData.message || "The request failed.",
      response.status, responseData.code, responseData.errors,
    );
  }

  return responseData;
}
