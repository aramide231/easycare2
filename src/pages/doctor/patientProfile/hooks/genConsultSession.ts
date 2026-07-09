import { useSyncExternalStore } from "react";
import type { GenConsultPatientTypeId } from "../config/genConsultPatientTypes";
import {
  isAdmittedInPatientType,
  resolveGenConsultRecordPatientType,
  shouldShowGenConsultConsultationType,
} from "../config/genConsultPatientTypes";

export const GEN_CONSULT_STRICT_SECTIONS = [
  "PRESENTING COMPLAINTS",
  "PHYSICAL EXAMINATION",
  "DIAGNOSIS",
] as const;

type GenConsultSession = {
  active: boolean;
  patientTypeId: GenConsultPatientTypeId | null;
  consultationTypeId: string | null;
};

let session: GenConsultSession = {
  active: false,
  patientTypeId: null,
  consultationTypeId: null,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return session;
}

export function setGenConsultModeActive(active: boolean) {
  if (!active) {
    session = {
      active: false,
      patientTypeId: null,
      consultationTypeId: null,
    };
  } else {
    session = { ...session, active: true };
  }
  emit();
}

export function setGenConsultPatientType(
  patientTypeId: GenConsultPatientTypeId | null
) {
  const showConsultation = shouldShowGenConsultConsultationType(patientTypeId);
  session = {
    ...session,
    patientTypeId,
    consultationTypeId: showConsultation ? session.consultationTypeId : null,
  };
  emit();
}

export function setGenConsultConsultationType(consultationTypeId: string | null) {
  session = { ...session, consultationTypeId };
  emit();
}

export function useGenConsultSession() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function getGenConsultRecordPatientType(): string {
  if (!session.active) return "IN-PATIENT";
  return resolveGenConsultRecordPatientType(session.patientTypeId);
}

export function isGenConsultSessionReady(): boolean {
  if (!session.active || !session.patientTypeId) return false;
  if (shouldShowGenConsultConsultationType(session.patientTypeId)) {
    return Boolean(session.consultationTypeId);
  }
  return true;
}

export function requiresStrictGenConsultSections(): boolean {
  return (
    session.active &&
    shouldShowGenConsultConsultationType(session.patientTypeId) &&
    Boolean(session.consultationTypeId)
  );
}

export function isCasualGenConsultPatientType(): boolean {
  if (!session.active || !session.patientTypeId) return false;
  return !shouldShowGenConsultConsultationType(session.patientTypeId);
}

export function shouldSkipQueueCheckForGenConsult(): boolean {
  return isAdmittedInPatientType(session.patientTypeId);
}
