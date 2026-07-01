import { useAuthStore } from "@/store/useAuthStore";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

interface FetchOptions extends RequestInit {
  data?: unknown; //Used this for passing POST/PUT body data
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { data, headers: customHeaders, ...customConfig } = options;

  // Retrieve the token directly from Zustand state outside of React
  const token = useAuthStore.getState().token;

  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };

  const config: RequestInit = {
    method: data ? "POST" : "GET",
    headers,
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 204) {
    return {} as T;
  }

  const responseData = await response.json();

  if (!response.ok) {
    // Automatically clear Zustand state if the token expires or is invalid
    if (response.status === 401) {
      useAuthStore.getState().clearAuth();
      // Optional: Force a hard redirect to the login page
      // window.location.href = '/login';
    }

    const errorMessage =
      responseData?.message || "An unexpected error occurred";
    throw new Error(errorMessage);
  }

  return responseData;
}
