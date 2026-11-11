import { useAuthStore } from "@/store/useAuthStore";
import { registerSessionCleanup } from "@/lib/sessionScope";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");
let csrfToken: string | null = null;
let csrfRequest: Promise<void> | null = null;
const requests = new Set<AbortController>();

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

export class SessionChangedError extends ApiError {
  constructor() {
    super("Your staff session changed. Reload the current record before continuing.", 0, "session_changed");
  }
}

registerSessionCleanup(() => {
  csrfToken = null;
  csrfRequest = null;
  for (const controller of requests) controller.abort();
  requests.clear();
});

export function setCsrfToken(token: string | null) {
  csrfToken = token;
}

function assertSession(revision: number) {
  if (useAuthStore.getState().revision !== revision) throw new SessionChangedError();
}

async function fetchFromServer(url: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch (cause) {
    if (options.signal?.aborted || (cause instanceof DOMException && cause.name === "AbortError")) {
      throw new ApiError("The request was cancelled.", 0, "request_cancelled");
    }
    throw new ApiError("Unable to contact the hospital server. Please try again.", 0, "network_error");
  }
}

interface ApiBody {
  data?: { csrf_token?: string };
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
}

async function readResponse(response: Response): Promise<ApiBody> {
  try {
    const body: unknown = await response.json();
    if (body === null || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid response shape");
    return body as ApiBody;
  }
  catch { throw new ApiError("The hospital server returned an unreadable response.", response.status, "invalid_response"); }
}

async function bootstrapCsrf(revision: number): Promise<void> {
  const controller = new AbortController();
  requests.add(controller);
  try {
    const response = await fetchFromServer(BASE_URL + "/auth/csrf-token", {
      credentials: "include", cache: "no-store", headers: { Accept: "application/json" }, signal: controller.signal,
    });
    const body = await readResponse(response);
    assertSession(revision);
    if (!response.ok || typeof body.data?.csrf_token !== "string") {
      throw new ApiError(body.message || "Unable to start a secure session.", response.status, body.code);
    }
    csrfToken = body.data.csrf_token;
  } finally { requests.delete(controller); }
}

interface FetchOptions extends RequestInit { data?: unknown; }

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const revision = useAuthStore.getState().revision;
  const { data, headers: customHeaders, signal, ...customConfig } = options;
  const method = (customConfig.method || (data !== undefined ? "POST" : "GET")).toUpperCase();
  const mutating = !["GET", "HEAD", "OPTIONS"].includes(method);
  const controller = new AbortController();
  const cancel = () => controller.abort();
  signal?.addEventListener("abort", cancel, { once: true });
  if (signal?.aborted) cancel();
  requests.add(controller);
  try {
    if (mutating && !csrfToken) {
      if (!csrfRequest) {
        const pending = bootstrapCsrf(revision);
        csrfRequest = pending;
        void pending.finally(() => { if (csrfRequest === pending) csrfRequest = null; }).catch(() => {});
      }
      await csrfRequest;
    }
    assertSession(revision);
    if (controller.signal.aborted) throw new ApiError("The request was cancelled.", 0, "request_cancelled");
    const headers = new Headers(customHeaders);
    headers.set("Accept", "application/json");
    if (data !== undefined) headers.set("Content-Type", "application/json");
    if (mutating && csrfToken) headers.set("X-CSRF-TOKEN", csrfToken);
    const response = await fetchFromServer(BASE_URL + endpoint, {
      ...customConfig, method, headers, credentials: "include", cache: "no-store", signal: controller.signal,
      ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
    });
    assertSession(revision);
    if (response.status === 204) return {} as T;
    const body = await readResponse(response);
    assertSession(revision);
    if (!response.ok) {
      if (response.status === 401) useAuthStore.getState().clearAuth();
      if (response.status === 419) csrfToken = null;
      throw new ApiError(
        Object.values(body.errors || {}).flat()[0] as string || body.message || "The request failed.",
        response.status, body.code, body.errors,
      );
    }
    return body as unknown as T;
  } catch (cause) {
    if (useAuthStore.getState().revision !== revision && !(cause instanceof ApiError && cause.status === 401)) {
      throw new SessionChangedError();
    }
    throw cause;
  } finally {
    requests.delete(controller);
    signal?.removeEventListener("abort", cancel);
  }
}
