import { ApiError } from "./apClient";
import { useAuthStore } from "@/store/useAuthStore";

/** One explicit submission, kept in memory until confirmed or deliberately abandoned. */
export class WriteAttempt {
  private value: string | null = null;
  private revision = -1;

  key(): string {
    const revision = useAuthStore.getState().revision;
    if (this.revision !== revision) this.reset();
    this.revision = revision;
    if (!this.value) {
      const bytes = crypto.getRandomValues(new Uint8Array(16));
      this.value = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    return this.value;
  }

  reset(): void { this.value = null; }
}

export function isUncertainWrite(error: unknown): boolean {
  return !(error instanceof ApiError) || error.status === 0 || error.status >= 500 || error.code === "invalid_response";
}

export function writeErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "The save could not be confirmed.";
  return error instanceof ApiError && error.retryAfterSeconds
    ? message + ` Wait ${error.retryAfterSeconds} seconds before trying again.`
    : message;
}
