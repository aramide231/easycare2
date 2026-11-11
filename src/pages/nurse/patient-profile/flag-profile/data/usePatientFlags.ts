import { useSyncExternalStore } from "react";
import { registerSessionCleanup } from "@/lib/sessionScope";
import { buildMockFlagReports, type FlagReport } from "./mockFlagReports";

// Session data follows the patient between dashboard and profile views.
const byPatient = new Map<string, FlagReport[]>();
const listeners = new Set<() => void>();

registerSessionCleanup(() => { byPatient.clear(); });

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getOrSeedReports(patientId: string): FlagReport[] {
  const key = patientId || "default";
  let existing = byPatient.get(key);
  if (!existing) {
    existing = buildMockFlagReports();
    byPatient.set(key, existing);
  }
  return existing;
}

export function usePatientFlags(patientId: string) {
  const snapshot = () => getOrSeedReports(patientId);
  const reports = useSyncExternalStore(subscribe, snapshot, snapshot);

  function setReports(update: (previous: FlagReport[]) => FlagReport[]) {
    const key = patientId || "default";
    byPatient.set(key, update(getOrSeedReports(key)));
    listeners.forEach((listener) => listener());
  }

  return { reports, setReports };
}
